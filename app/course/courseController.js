/**
 * Created by user on 14/12/15.
 */

var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash']);

userApp.controller('CourseController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    requestHandler.getRequest("user/getMyCourseList/","").then(function(response) {
        $scope.myCourseList = response.data.published_Course;
    },function(){
        errorMessage(Flash,"Please try again later!")
    });

}]);

var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','summernote']);

coachApp.controller('CourseController',function($scope,requestHandler,Flash,$routeParams,$location) {

    if(!$routeParams.id){
        if(!$routeParams.sectionId){
            $scope.loaded=true;
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
                $scope.getAllSections();
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        };

        $scope.getAllSections=function(){
            requestHandler.postRequest("coach/getCourseSections/",{"courseid":$routeParams.id}).then(function(response) {
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
                        $scope.getAllSections();
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

    $scope.sendCourseToReview=function(){
        requestHandler.postRequest("coach/sendCourseForReview/",{"courseid":$routeParams.id}).then(function(response) {
            successMessage(Flash,"Course Sent for Review!");
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
            requestHandler.postRequest("coach/insertCourseSection/",$scope.sectionDetails).then(function(response) {
                $location.path("courseSection/"+response.data.CourseSection.sectionid);
                successMessage(Flash,"Section Successfully Added!")
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
            $scope.originalCourseDetails = $scope.courseDetails;
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
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    }

    $scope.doUpdateSection = function(){

        var sectionUpdate={};
        sectionUpdate.sectionid = $scope.sectionDetails.sectionid;
        sectionUpdate.sectiontitle = $scope.sectionDetails.sectiontitle;
        sectionUpdate.sectioncontent = $scope.sectionDetails.sectioncontent;

        requestHandler.putRequest("coach/updateCourseSection/",sectionUpdate).then(function(response) {
            $location.path("courseSection/"+response.data.CourseSection.sectionid);
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
