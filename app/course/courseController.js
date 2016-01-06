/**
 * Created by user on 14/12/15.
 */

var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash']);
userApp.controller('CourseController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {

    $scope.mycourselist = function(){
        $scope.loaded=true;
        requestHandler.getRequest("user/getMyCourseList/","").then(function(response) {
            $scope.myCourseList = response.data.published_Course;
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.courseDetails =function(){
        $scope.loaded=true;
        requestHandler.postRequest("courseDetail/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.courseDetails = response.data.coursedetail;
            $scope.courseDetails.role= "user";
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.courseSectionList =function(){
        requestHandler.postRequest("getSectionList/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.sectionList = response.data.course;
            console.log($scope.sectionList);

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.courseSectionDetails =function(){

        requestHandler.postRequest("user/sectionDetail/",{"sectionid":$routeParams.id}).then(function(response) {
            $scope.sectionDetail = response.data.sectiondetail;
            console.log($scope.sectionDetail);


            requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
                $scope.sectionList = response.data.course;
                $.each($scope.sectionList,function(index,value){
                    if(value.sectionid == $routeParams.id){
                        $scope.currentIndex = index;
                        $scope.sectionno = index + 1;
                    }
                    if($scope.sectionList.length === 1){
                        $scope.nextdisable = true;
                    }

                });

            });
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.courseSectionDetailsbyId =function(id){
        requestHandler.postRequest("user/sectionDetail/",{"sectionid":id}).then(function(response) {
            $scope.sectionDetail = response.data.sectiondetail;
            $.each($scope.sectionList,function(index,value){
                if(value.sectionid == id){
                    $scope.currentIndex = index;
                    $scope.sectionno = index + 1;
                }
            });
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.courselist = function(){
        requestHandler.postRequest("getPublishedCourse/",{"offset":0}).then(function(response) {
            $scope.courseList = response.data.published_Course;
            $('#callCarousel').hide();
            callCarousel();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doEnrollCourse = function(course){
        requestHandler.postRequest("user/enrollCourse/",{"courseid":course}).then(function(response){
            $location.path("myCourses");
            successMessage(Flash,"Successfully Enrolled");
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.checkenroll = function(){
       // alert("Please enroll the course to view details!!!");

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#enrollmodal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#enrollmodal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#enrollmodal").hide();
            $("#lean_overlay").hide();
        });
    };


    $scope.nextdisable = false;
    $scope.prevdisable = true;

    $scope.getNextIndex = function() {
        requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
            $scope.sectionList = response.data.course;
            console.log("length",$scope.sectionList.length);


            console.log("curr",$scope.currentIndex);
            var nextIndex = $scope.currentIndex+1;
            console.log("Index value",nextIndex);
            $scope.sectionno = nextIndex + 1;
            if( nextIndex === $scope.sectionList.length -1){

                //move to start if at list end
                console.log("Entered If");
                $scope.nextdisable = true;
                console.log($scope.nextdisable);
            }

            $scope.sectionList=response.data.course[nextIndex];
            requestHandler.postRequest("user/sectionDetail/",{"sectionid":$scope.sectionList.sectionid}).then(function(response) {
                $scope.sectionDetail = response.data.sectiondetail;
                console.log($scope.sectionDetail);

                requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
                    $scope.sectionList = response.data.course;
                });
            });
            $scope.currentIndex= nextIndex;
            console.log("Newcurr",$scope.currentIndex);
            $scope.prevdisable=false;

        });

    }

    $scope.getPreviousIndex = function() {

        requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
            $scope.sectionList = response.data.course;
            console.log("length",$scope.sectionList.length);

            console.log("curr",$scope.currentIndex);
            var prevIndex = $scope.currentIndex-1;
            $scope.sectionno = prevIndex +1;
            console.log("Index value",prevIndex);
            if( prevIndex === 0 ){
                //move to start if at list end
                console.log("Entered If");
                $scope.prevdisable = true;
            }
            $scope.sectionList=response.data.course[prevIndex];
            requestHandler.postRequest("user/sectionDetail/",{"sectionid":$scope.sectionList.sectionid}).then(function(response) {
                $scope.sectionDetail = response.data.sectiondetail;
                console.log($scope.sectionDetail);

                requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
                    $scope.sectionList = response.data.course;
                });
            });
            $scope.currentIndex= prevIndex;
            console.log("Newcurr",$scope.currentIndex);
            $scope.nextdisable=false;

        });
    }

    $scope.courseinit=function(){
        $scope.courselist();
    }

    $scope.mycourselist();

    $scope.viewinit=function(){
        $scope.courseDetails();
        $scope.courseSectionList();
    };


}]);

// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

// html filter (render text as html)
userApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','angularUtils.directives.dirPagination']);
adminApp.controller('CourseAdminController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {

    $scope.courselist = function(){
        requestHandler.postRequest("getPublishedCourse/",{"offset":0}).then(function(response) {
            $scope.courseList = response.data.published_Course;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.courseDetails =function(){
        requestHandler.postRequest("courseDetail/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.courseDetails = response.data.coursedetail;
            $scope.courseDetails.role= "admin";
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.courseSectionList =function(){
        requestHandler.postRequest("getSectionList/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.sectionList = response.data.course;
            console.log($scope.sectionList);

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.courseSectionDetails =function(){

        requestHandler.postRequest("admin/getSectionDetail/",{"sectionid":$routeParams.id}).then(function(response) {
            $scope.sectionDetail = response.data['Section Detail'];
            console.log($scope.sectionDetail);
            $scope.sectionno=1;

            requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
                $scope.sectionList = response.data.course;
                $.each($scope.sectionList,function(index,value){
                    if(value.sectionid == $routeParams.id){
                        $scope.currentIndex = index;
                        $scope.sectionno = index + 1;
                    }
                    if($scope.sectionList.length === 1){
                        $scope.nextdisable = true;
                    }

                });
            });
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.courseSectionDetailsbyId =function(id){
        requestHandler.postRequest("admin/getSectionDetail/",{"sectionid":id}).then(function(response) {
            $scope.sectionDetail = response.data['Section Detail'];
            $.each($scope.sectionList,function(index,value){
                if(value.sectionid == id){
                    $scope.currentIndex = index;
                    $scope.sectionno = index + 1;
                }
            });
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    var currentIndex = 0;
    $scope.nextdisable = false;
    $scope.prevdisable = true;

    $scope.getNextIndex = function() {
        requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
            $scope.sectionList = response.data.course;
            console.log("length",$scope.sectionList.length);
            console.log("curr",currentIndex);
            var nextIndex = currentIndex+1;
            console.log("Index value",nextIndex);
            $scope.sectionno = nextIndex +1;
            if( nextIndex === $scope.sectionList.length -1) {

                //move to start if at list end
                console.log("Entered If");
                $scope.nextdisable = true;
                console.log($scope.nextdisable);
            }

            $scope.sectionList=response.data.course[nextIndex];
            requestHandler.postRequest("admin/getSectionDetail/",{"sectionid":$scope.sectionList.sectionid}).then(function(response) {
                $scope.sectionDetail = response.data['Section Detail'];
                console.log($scope.sectionDetail);

                requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
                    $scope.sectionList = response.data.course;
                });
            });
            currentIndex= nextIndex;
            console.log("Newcurr",currentIndex);
            $scope.prevdisable=false;

        });

    };

    $scope.getPreviousIndex = function() {

        requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
            $scope.sectionList = response.data.course;
            console.log("length",$scope.sectionList.length);

            console.log("curr",currentIndex);
            var prevIndex = currentIndex-1;
            console.log("Index value",prevIndex);
            $scope.sectionno = prevIndex +1;
            if( prevIndex === 0 ){
                //move to start if at list end
                console.log("Entered If");
                $scope.prevdisable = true;
            }
            $scope.sectionList=response.data.course[prevIndex];
            requestHandler.postRequest("admin/getSectionDetail/",{"sectionid":$scope.sectionList.sectionid}).then(function(response) {
                $scope.sectionDetail = response.data['Section Detail'];
                console.log($scope.sectionDetail);

                requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
                    $scope.sectionList = response.data.course;
                });
            });
            currentIndex= prevIndex;
            $scope.nextdisable=false;

        });
    };

    $scope.pendingcourselist = function(){
        requestHandler.getRequest("admin/listOfPendingCourses/","").then(function(response) {
            $scope.pendingCourseList = response.data.pendingcourses;
            $scope.page = "pending";
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doAcceptCourse = function(course){
         requestHandler.postRequest("admin/publishCourse/",{"courseid":course}).then(function(response){

                if($scope.page == 'pending'){
                    $scope.pendingcourselist();
                    successMessage(Flash,"Successfully Published");
                }
                else{
                    $location.path('coursePending');
                    successMessage(Flash,"Successfully Published");
                }
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
    };


    $scope.doRejectCourse = function(course){
        requestHandler.postRequest("admin/rejectCourse/",{"courseid":course}).then(function(response){
            if($scope.page == 'pending'){
                $scope.pendingcourselist();
                successMessage(Flash,"Successfully Rejected");
            }
            else{
               $location.path('coursePending');
                successMessage(Flash,"Successfully Rejected");
            }
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.viewinit = function(){
        $scope.courseDetails();
        $scope.courseSectionList();
    };

    $scope.courselist();

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').fadeIn(300);
        $('.search-list-form input').focus();
    });

    $('.search-list-form input').focusout(function() {
        $('.search-list-form').fadeOut(300);
        $scope.coursesearch="";
    });

    $scope.modal =function(courseid){

        $scope.courseid = courseid;

        $("html, body").animate({
            scrollTop: 0
        }, 600);

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $(".modalRejectCourse").fadeIn(600);
            $(".common_model").show();
        });


        $(".modal_close").click(function(){
            $(".common_model").hide();
            $(".modalRejectCourse").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $(".modalRejectCourse").hide();
            $("#lean_overlay").hide();
        });

    };

    $scope.acceptModal=function(courseid){

        $scope.courseid = courseid;
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });
    };

}]);

// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

adminApp.filter('startsWithLetter', function () {
    alert("hi");
    return function (items, coursesearch) {
        var filtered = [];
        var letterMatch = new RegExp(coursesearch, 'i');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (letterMatch.test(item.coursename) ) {
                filtered.push(item);
            }
        }
        return filtered;
    };
});

// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','summernote']);

coachApp.controller('CourseController',function($scope,requestHandler,Flash,$routeParams,$location) {

    if(!$routeParams.id){
        if(!$routeParams.sectionId){
           // $scope.loaded=true;
            requestHandler.getRequest("coach/getCourseList/","").then(function(response) {
                $scope.myCourseList = response.data.course.course_list;
                $.each($scope.myCourseList,function(index,value){
                    value.promoimage = value.promoimage+"?decache="+Math.random();
                });
                $scope.loaded=false;
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        }
    }
    else{
        $scope.loaded=true;

        $scope.getCourseDetails=function(){
            requestHandler.postRequest("coach/getCourseDetail/",{"courseid":$routeParams.id}).then(function(response) {
                $scope.courseDetails = response.data['Course details'];
                $scope.courseDetails.promoimage = $scope.courseDetails.promoimage+"?decache="+Math.random();
                $scope.getAllSections($scope.courseDetails.courseid);
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        };

        $scope.getAllSections=function(id){
            requestHandler.postRequest("coach/getCourseSections/",{"courseid":id}).then(function(response) {
                $scope.courseSections = response.data.CourseSections.sections;
                $scope.loaded=false;
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        };

        $scope.getCourseDetails();

        if($scope.courseSections!=0){
            var table = document.getElementById("table1");
            RowSorter('table[attr-sample=thetable]', {
                handler: 'td.sorter',
                stickFirstRow : true,
                stickLastRow  : false,
                onDragStart: function(tbody, row, index)
                {
                    log('start index is ' + index);
                },
                onDrop: function(tbody, row, new_index, old_index)
                {
                    $scope.loaded=true;
                    $scope.sortSectionIdlist = [];
                    $scope.sortSectionIdUnlist = [];
                    var pickIndex = old_index+1;
                    var dropIndex = new_index+1;
                    if(pickIndex<dropIndex){
                        $.each($scope.courseSections,function(index,value){
                            if(value.sequenceno<pickIndex)
                            $scope.sortSectionIdlist.push(value.sectionid);
                            else if(pickIndex<=value.sequenceno && value.sequenceno<dropIndex)
                            $scope.sortSectionIdlist.push($scope.courseSections[index+1].sectionid);
                            else if(value.sequenceno==dropIndex)
                            $scope.sortSectionIdlist.push($scope.courseSections[pickIndex-1].sectionid);
                            else
                            $scope.sortSectionIdlist.push(value.sectionid);
                        });
                    }
                    else{
                        $.each($scope.courseSections,function(index,value){
                            $scope.sortSectionIdUnlist.push(value.sectionid);
                            if(value.sequenceno<dropIndex)
                                $scope.sortSectionIdlist.push(value.sectionid);
                            else if(dropIndex<value.sequenceno && value.sequenceno<=pickIndex)
                                $scope.sortSectionIdlist.push($scope.courseSections[index-1].sectionid);
                            else if(value.sequenceno==dropIndex)
                             $scope.sortSectionIdlist.push($scope.courseSections[pickIndex-1].sectionid);
                             else
                             $scope.sortSectionIdlist.push(value.sectionid);
                        });
                    }
                    requestHandler.postRequest("coach/swapCourseSection/",{"sectionidList":$scope.sortSectionIdlist,"courseid":$routeParams.id}).then(function(response) {
                        successMessage(Flash,"Sections Sorted Successfully!");
                        $scope.getAllSections($routeParams.id);
                    },function(){
                        errorMessage(Flash,"Please try again later!")
                    });
                }
            });
        }
    }

    if(!$routeParams.sectionId){
    }
    else{
        requestHandler.postRequest("coach/detailCourseSection/",{"sectionid":$routeParams.sectionId}).then(function(response) {
            $scope.sectionDetails = response.data.CourseSectionDetail;
            requestHandler.postRequest("coach/getCourseSections/",{"courseid":$scope.sectionDetails.courseid}).then(function(response) {
                $scope.courseSections = response.data.CourseSections.sections;
                $scope.sectionLength=$scope.courseSections.length;
            });

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    }

    $scope.changeSection=function(sectionId){
        requestHandler.postRequest("coach/detailCourseSection/",{"sectionid":sectionId}).then(function(response) {
            $scope.sectionDetails = response.data.CourseSectionDetail;
        });
        $("body").animate({ scrollTop: 0 }, 600);
    };

    $scope.nextSection=function(sequenceNo){
        $.each($scope.courseSections,function($index,value){
            if(value.sequenceno==(sequenceNo+1)){
                $scope.changeSection(value.sectionid);
            }
        })
    };

    $scope.prevSection=function(sequenceNo){
        $.each($scope.courseSections,function($index,value){
            if(value.sequenceno==(sequenceNo-1)){
                $scope.changeSection(value.sectionid);
            }
        })
    };

    $scope.doDeleteCourse = function(){
        requestHandler.postRequest("coach/deleteCourse/",{"courseid":$routeParams.id}).then(function(response) {
            $location.path("course");
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.sendCourseToReview=function(id){
        requestHandler.postRequest("coach/sendCourseForReview/",{"courseid":id}).then(function(response) {
            successMessage(Flash,"Course Sent for Review!");
            if(!$routeParams.id){
                $location.path("courseView/"+id);
            }
            else $scope.getCourseDetails();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.deleteSection=function(){
        requestHandler.deleteRequest("coach/deleteCourseSection/",{"sectionid":$scope.deleteSectionId}).then(function(response) {
            successMessage(Flash,"Section Deleted Successfully!");
            $scope.getCourseDetails();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.reviewModel=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#review-modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#review-modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#review-modal").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.sectionDeleteModel=function(id){

        $scope.deleteSectionId=id;

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#section-modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#section-modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#section-modal").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.deleteModel=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });
    };

});

coachApp.controller('CourseEditController',function($scope,requestHandler,Flash,$routeParams,$location) {

    $scope.courseDetails = {};
    var originalSectionDetails={};

    if(!$routeParams.courseId){
    }
    else{
        $scope.SectionTitle="Add Section";
        $scope.sectionDetails = {};
        $scope.isAdd=1;
        $scope.sectionDetails.courseid=parseInt($routeParams.courseId);

        //summer note
        $scope.options = {
            height: 300
        };

        $scope.addSection=function(){
            $scope.loaded=true;
            requestHandler.postRequest("coach/insertCourseSection/",$scope.sectionDetails).then(function(response) {
                $location.path("courseSection/"+response.data.CourseSection.sectionid);
                $scope.loaded=false;
                successMessage(Flash,"Section Successfully Added!");
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        };
    }

    if(!$routeParams.id){
        if(!$routeParams.courseId){
            if(!$routeParams.sectionId){
                $scope.isAdd=1;
                $scope.CourseTitle="Add Course";

                //summer note
                $scope.options = {
                    height: 300
                };

                $scope.courseDetails.categoryid=1;
                $scope.courseDetails.promoimage = "../../images/no-course.jpg";

                $('.image-editor').cropit({
                    imageState: {
                        src: "../../images/no-course.jpg"
                    }
                });

                requestHandler.getRequest("getCoursecategory/","").then(function(response) {
                    $scope.options = response.data.coursecategory;
                },function(){
                    errorMessage(Flash,"Please try again later!")
                });
            }
        }
    }
    else{
        $scope.isAdd=0;
        $scope.CourseTitle="Edit Course";

        //summer note
        $scope.options = {
            height: 200,
            airMode: true,
            toolbar: [
                ["font", ["bold", "italic", "underline", "clear"]],
                ["para", ["ul", "ol", "paragraph"]]
            ]
        };

        requestHandler.postRequest("coach/getCourseDetail/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.courseDetails = response.data['Course details'];
            $scope.originalCourseDetails = angular.copy($scope.courseDetails);
            $scope.courseDetails.promoimage = $scope.courseDetails.promoimage+"?decache="+Math.random();
            $('.image-editor').cropit({
                imageState: {
                    src: $scope.courseDetails.promoimage+"?decache="+Math.random()
                }
            });
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        requestHandler.getRequest("getCoursecategory/","").then(function(response) {
            $scope.options = response.data.coursecategory;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    }

    //To Enable the update button if changes occur.
    $scope.isCleanCourse = function() {
        console.log(angular.equals ($scope.originalCourseDetails, $scope.courseDetails));
        return angular.equals ($scope.originalCourseDetails, $scope.courseDetails);

    };

    $scope.doUpdateImage = function(){
        if($scope.isAdd==0){
            var courseUpdate={};
            courseUpdate.coursename = $scope.originalCourseDetails.coursename;
            courseUpdate.coursesubtitle = $scope.originalCourseDetails.coursesubtitle;
            courseUpdate.coursedescription = $scope.originalCourseDetails.coursedescription;
            courseUpdate.price = $scope.originalCourseDetails.price;
            courseUpdate.categoryid = $scope.originalCourseDetails.categoryid;
            courseUpdate.courseid = $scope.originalCourseDetails.courseid;
            courseUpdate.promoimage = $('.image-editor').cropit('export');
            requestHandler.putRequest("coach/updateCourse/",courseUpdate).then(function(response) {
                $scope.imageUpdatedDetails = response.data.Course;
                $scope.courseDetails.promoimage = $scope.imageUpdatedDetails.promoimage+"?decache="+Math.random();
                $('.image-editor').cropit({
                    imageState: {
                        src: $scope.courseDetails.promoimage+"?decache="+Math.random()
                    }
                });
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        }
        else{
            $scope.courseDetails.promoimage = $('.image-editor').cropit('export');
        }

    };

    $scope.doAddCourse=function(){
        if($scope.courseDetails.promoimage==='../../images/no-course.jpg'){
            $scope.convertImgToBase64($scope.courseDetails.promoimage, function(base64Img){
                $scope.courseDetails.promoimage=base64Img;
                requestHandler.postRequest("coach/insertCourse/",$scope.courseDetails).then(function(response) {
                    $location.path("courseView/"+response.data.Course.courseid);
                },function(){
                    errorMessage(Flash,"Please try again later!")
                });
            });
        }
        else{
            requestHandler.postRequest("coach/insertCourse/",$scope.courseDetails).then(function(response) {
                $location.path("courseView/"+response.data.Course.courseid);
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        }
    };

    // Function to convert image url to base64
    $scope.convertImgToBase64=function(url, callback, outputFormat){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this,0,0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/jpg');
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    };

    $scope.doUpdateCourse = function(){

        $scope.courseDetails.promoimage=requestHandler.convertUrl($scope.courseDetails.promoimage);
        $scope.convertImgToBase64($scope.courseDetails.promoimage, function(base64Img){
            //Convert Image to base64
            var courseUpdate={};
            courseUpdate.coursename = $scope.courseDetails.coursename;
            courseUpdate.coursesubtitle = $scope.courseDetails.coursesubtitle;
            courseUpdate.coursedescription = $scope.courseDetails.coursedescription;
            courseUpdate.price = $scope.courseDetails.price;
            courseUpdate.categoryid = $scope.courseDetails.categoryid;
            courseUpdate.courseid = $scope.courseDetails.courseid;
            courseUpdate.promoimage = base64Img;

            requestHandler.putRequest("coach/updateCourse/",courseUpdate).then(function(response) {
                $location.path("courseView/"+response.data.Course.courseid);
                successMessage(Flash,"Course Updated Successfully!");
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        });

    };

    if(!$routeParams.sectionId){
    }
    else{
        $scope.loaded=true;
        $scope.SectionTitle="Edit Section";
        $scope.isAdd=0;

        //summer note
        $scope.options = {
            height: 300
        };

        requestHandler.postRequest("coach/detailCourseSection/",{"sectionid":$routeParams.sectionId}).then(function(response) {
            $scope.sectionDetails = response.data.CourseSectionDetail;
            $scope.originalSectionDetails = angular.copy($scope.sectionDetails);
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    }

    //To Enable the update button if changes occur.
    $scope.isClean = function() {
        return angular.equals ($scope.originalSectionDetails, $scope.sectionDetails);
    };

    $scope.doUpdateSection = function(){

        $scope.loaded=true;

        var sectionUpdate={};
        sectionUpdate.sectionid = $scope.sectionDetails.sectionid;
        sectionUpdate.sectiontitle = $scope.sectionDetails.sectiontitle;
        sectionUpdate.sectioncontent = $scope.sectionDetails.sectioncontent;

        requestHandler.putRequest("coach/updateCourseSection/",sectionUpdate).then(function(response) {
            $location.path("courseSection/"+response.data.CourseSection.sectionid);
            $scope.loaded=false;
            successMessage(Flash,"Section Updated Successfully!");
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.openCourseImageModel=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });
    };

});

// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

// html filter (render text as html)
coachApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
