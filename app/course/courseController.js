/**
 * Created by user on 14/12/15.
 */

var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','angularUtils.directives.dirPagination']);
userApp.controller('CourseController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {

    $scope.entrolling="Enroll course";
    $scope.enrollButtonStatus=false;
    $scope.activeClass.myCourses='active';
    $scope.coursereview = {ratinglevel:1};
    $scope.averageRate=0.1;

    $scope.mycourselist = function(){
       $scope.loaded=true;
        requestHandler.getRequest("user/getMyCourseList/","").then(function(response) {
            $scope.myCourseList = response.data.published_Course;
            $scope.loaded=false;
            $scope.formatMyCourseByCategory();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
 };

    $scope.formatMyCourseByCategory=function(){

        requestHandler.getRequest("getCoursecategory/","").then(function(response){
            $scope.allCategory=$scope.allCategoryCourses=response.data.coursecategory;
            $.each($scope.allCategory,function(index,category){
                category.courses=[];
                $.each($scope.myCourseList,function(index,courses){
                    if(category.categoryid==courses.categoryid)
                    category.courses.push(courses);
                });
                if(index==($scope.allCategory.length)-1){
                    callCarousel();
                    window.setTimeout(function() {
                        $scope.$apply(function() {
                            $scope.loaded=false;
                        });
                    }, 900);
                }
            });
            console.log($scope.allCategory);
        });

    };


    $scope.courseDetails =function(){
        $scope.loaded=true;
        requestHandler.postRequest("courseDetail/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.courseDetails = response.data.coursedetail;
            $scope.courseDetails.role= "user";
            $scope.loaded=false;

            //Load Rating and reviews
            $scope.getCourseRatingAndReview();

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    //Ratings and Reviews
    $scope.getCourseRatingAndReview=function(){
        $scope.ratingReviewParam={
            "limit":2,
            "offset":0
        };
        requestHandler.postRequest("getCourseRatingsandReviews/"+parseInt($routeParams.id)+"/",$scope.ratingReviewParam).then(function(response) {
            $scope.courseReviews=response.data;
            $scope.averageRate=$scope.courseReviews.averageratings;
             $scope.totalRatings = response.data.totalrecords;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    }
    //Insert Rate and Reviews
    $scope.doInsertRatingAndReviews=function(){
        $scope.coursereview.review_coach=$scope.courseDetails.ownerid;
        $scope.coursereview.review_course=parseInt($routeParams.id);
        requestHandler.postRequest("/user/insertRatingsandReviews/",$scope.coursereview).then(function(response) {
           successMessage(Flash,"Successfully Reviewed!");
           $scope.getCourseRatingAndReview();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    }


    $scope.courseSectionList =function(){
        requestHandler.postRequest("getSectionList/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.sectionList = response.data.course;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.courseSectionDetails =function(){

        requestHandler.postRequest("user/sectionDetail/",{"sectionid":$routeParams.id}).then(function(response) {
            $scope.sectionDetail = response.data.sectiondetail;
            requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
                $scope.sectionList = response.data.course;
                $.each($scope.sectionList,function(index,value){
                    value.sequenceno=index + 1;
                    /*if(value.sectionid == $routeParams.id){
                        $scope.currentIndex = index;
                        $scope.sectionno = index + 1;
                    }
                    if($scope.sectionList.length === 1){
                        $scope.nextdisable = true;
                    }*/
                });

            });
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.courseSectionDetailsbyId =function(id){
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        requestHandler.postRequest("user/sectionDetail/",{"sectionid":id}).then(function(response) {
            $scope.sectionDetail = response.data.sectiondetail;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.courselist = function(){
        /*requestHandler.postRequest("getPublishedCourse/",{"offset":0,"limit":10}).then(function(response) {
         $scope.courseList = response.data.published_Course;
         $('#callCarousel').hide();
         callCarousel();
         },function(){
         errorMessage(Flash,"Please try again later!")
         });*/

        requestHandler.postRequest("getPublishedCourse/",{"offset":0,"limit":1}).then(function(response) {
            $scope.showCourseSearch=response.data.published_Course.length;
        },function(){
            errorMessage(Flash,"Please try again later!");
        });

        $('#callCarousel').hide();
        $scope.loaded=true;

        requestHandler.getRequest("getCoursecategory/","").then(function(response){
            $scope.allCategory=$scope.allCategoryCourses=response.data.coursecategory;
            $.each($scope.allCategory,function(index,courses){
                requestHandler.postRequest("searchPublishedCourse/",{"categoryid":courses.categoryid,"coursename":"","ownername":""}).then(function(response){
                    $scope.allCategoryCourses[index].categoryCourses=response.data.published_Course;
                    if(index==($scope.allCategory.length)-1){
                        callCarousel();
                        window.setTimeout(function() {
                            $scope.$apply(function() {
                                $scope.loaded=false;
                            });
                        }, 900);
                    }
                });
            });
        });
    };

    $scope.categoryCourseList=function(){
        requestHandler.postRequest("searchPublishedCourse/",{"categoryid":$routeParams.id,"coursename":"","ownername":""}).then(function(response){
            $scope.categoryCourses=response.data.published_Course;
            $scope.paginationLoad=true;
        });
    };

    $scope.MycourseCategory=function(){
        $scope.categoryMycourses=[];
        requestHandler.getRequest("user/getMyCourseList/","").then(function(response) {
            $scope.myCourseList = response.data.published_Course;
        $.each($scope.myCourseList,function(index,courses){
            if(courses.categoryid==$routeParams.id)
                $scope.categoryMycourses.push(courses);
        });
            console.log("mycar",$scope.categoryMycourses);
        });
    };

    //to get current user email id
    $scope.doGetProfile=function(){
        requestHandler.getRequest("getUserId/","").then(function(response) {
            $scope.userProfile = response.data.User_Profile;
            $scope.currentUserEmailId= $scope.userProfile.emailid;
        });
    };

    //User email id verification
    $scope.userEmailidVerifivationAlert=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#email-verification").fadeIn(600);
            $(".common_model").show();

        });
        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#email-verification").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#email-verification").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.doEnrollCourse = function(course){
        $scope.entrolling="We are processing your request";
        $scope.enrollButtonStatus=true;
        requestHandler.postRequest("user/enrollCourse/",{"courseid":course,"returnUrl":requestHandler.paymentURL()+"/#/thanksEnrollPage/"+course,"cancelUrl":requestHandler.paymentURL()+"/#/course-detail/"+course}).then(function(response){
            if(response.data.Response_status==1){
                if(response.data.transactionStatus==1){
                  window.location=response.data.approveURL ;
                }
                else if(response.data.transactionStatus==2){
                  window.location=requestHandler.paymentURL()+"/#/thanksEnrollPage/"+course;
                }
            }
            else if(response.data.Response_status==2){
                $scope.userEmailidVerifivationAlert();
            }
            else {
                errorMessage(Flash,response.data.Error);
                $scope.entrolling="Enroll course";
                $scope.enrollButtonStatus=false;
            }
            // successMessage(Flash,"Successfully Enrolled");
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    //to resend verification email link
    $scope.emailVerificationRequest=function() {
        requestHandler.postRequest("verifyEmailId/", {"emailid": $scope.currentUserEmailId}).then(function (response) {
            if (response.data.Response_status == 2) {
                $(".common_model").hide();
                $("#email-verification").hide();
                $("#lean_overlay").hide();
                errorMessage(Flash, "Email ID doesn't Exist!");
                $scope.entrolling="Enroll course";
                $scope.enrollButtonStatus=false;
            }
            else if (response.data.Response_status == 1) {
                $(".common_model").hide();
                $("#email-verification").hide();
                $("#lean_overlay").hide();
                successMessage(Flash, "Please check your Email!");
                $scope.entrolling="Enroll course";
                $scope.enrollButtonStatus=false;
            }
        });
    };

    $scope.checkenroll = function(){
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

    $scope.getNextIndex = function(currentSequence) {
        $.each($scope.sectionList,function(index,value){
            if(value.sequenceno==(currentSequence+1)){
                $scope.courseSectionDetailsbyId(value.sectionid);
            }
        });

    };

    $scope.getPreviousIndex = function(currentSequence) {
        $.each($scope.sectionList,function(index,value){
            if(value.sequenceno==(currentSequence-1)){
                $scope.courseSectionDetailsbyId(value.sectionid);
            }
        });
    };

    $scope.courseinit=function(){
        $scope.courselist();
    };

    $scope.mycourseinit=function(){
        $scope.mycourselist();
    };

    $scope.categorycourseinit=function(){
        $scope.paginationLoad=false;
        $scope.categoryCourseList();
    };

    $scope.categorymycourseinit=function(){
        $scope.paginationLoad=false;
        $scope.MycourseCategory();
    };

    $scope.viewinit=function(){
        $scope.courseDetails();
        $scope.courseSectionList();
        $scope.doGetProfile();
    };

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });


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

userApp.filter('startsWithLetterCourse', function () {

    return function (items, courseSearch) {
        var filtered = [];
        var letterMatch = new RegExp(courseSearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.ownername) || letterMatch.test(item.coursename) ) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});


var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','angularUtils.directives.dirPagination']);
adminApp.controller('CourseAdminController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {

    $scope.courselist = function(){
        requestHandler.postRequest("getPublishedCourse/",{"offset":0,"limit":10}).then(function(response) {
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
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };


    //Ratings and Reviews
    $scope.getCourseRatingAndReview=function(){
        $scope.coursereview = {ratinglevel:1};
        $scope.averageRate=0.1;
        $scope.ratingReviewParam={
            "limit":2,
            "offset":0
        };
        requestHandler.postRequest("getCourseRatingsandReviews/"+parseInt($routeParams.id)+"/",$scope.ratingReviewParam).then(function(response) {
            $scope.courseReviews=response.data;
            console.log($scope.courseReviews);
            $scope.averageRate=$scope.courseReviews.averageratings;
            $scope.totalRatings = response.data.totalrecords;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    }

    $scope.courseSectionDetails =function(){

        requestHandler.postRequest("admin/getSectionDetail/",{"sectionid":$routeParams.id}).then(function(response) {
            $scope.sectionDetail = response.data['Section Detail'];
            requestHandler.postRequest("getSectionList/",{"courseid":$scope.sectionDetail.courseid}).then(function(response) {
                $scope.sectionList = response.data.course;
                $scope.sectionLength=$scope.sectionList.length;
                $.each($scope.sectionList,function(index,value){
                    value.sequenceno=index + 1;
                });
            });
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.courseSectionDetailsbyId =function(id){
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        requestHandler.postRequest("admin/getSectionDetail/",{"sectionid":id}).then(function(response) {
            $scope.sectionDetail = response.data['Section Detail'];
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.getNextIndex = function(currentSequence) {
        $.each($scope.sectionList,function(index,value){
            if(value.sequenceno==(currentSequence+1)){
                $scope.courseSectionDetailsbyId(value.sectionid);
            }
        });

    };

    $scope.getPreviousIndex = function(currentSequence) {
        $.each($scope.sectionList,function(index,value){
            if(value.sequenceno==(currentSequence-1)){
                $scope.courseSectionDetailsbyId(value.sectionid);
            }
        });
    };

    $scope.pendingcourselist = function(){
        requestHandler.getRequest("admin/listOfPendingCourses/","").then(function(response) {
            $scope.pendingCourseList = response.data.pendingcourses;
            $scope.pendingCount = [$scope.pendingCourseList.length];
            $scope.page = "pending";
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doAcceptCourse = function(course){
         requestHandler.postRequest("admin/publishCourse/",{"courseid":course}).then(function(response){

                $scope.pendingcourselist();
                $location.path('course-pending');
                successMessage(Flash,"Successfully Published");

            },function(){
                errorMessage(Flash,"Please try again later!")
            });
    };


    $scope.doRejectCourse = function(course){
        requestHandler.postRequest("admin/rejectCourse/",{"courseid":course,"comments":$scope.comments}).then(function(response){
                $scope.pendingcourselist();
                $location.path('course-pending');
                successMessage(Flash,"Successfully Rejected");
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // doChangeAutoReviewSetting Auto Review Admin Course
    $scope.doChangeAutoReviewSetting=function(){
        requestHandler.getRequest("admin/canreview/","").then(function(response){
            // canAutoReview=1
            if(response.data.Response_status==1){
                successMessage(Flash,"Successfully Updated");
            }else{
                errorMessage(Flash,"Please try again later!");
            }
        });   
    };

    $scope.getCourseCanReviewSetting=function(){
         requestHandler.getRequest("admin/getappdetails/","").then(function(response){
            $scope.canReview=response.data.App_settings[0].canautoreview;
         });
    };

    $scope.viewinit = function(){
        $scope.courseDetails();
        $scope.courseSectionList();
        $scope.getCourseRatingAndReview();

    };

    $scope.publishedCourses=function(){
    $scope.courselist();
    $scope.getCourseCanReviewSetting();
    $scope.pendingcourselist();

    };

    $scope.resetrejectdata= function(){
        $scope.comments={};
        $scope.comments="";
        $scope.courseRejectForm.$setPristine();
    };

    $scope.publishedCourses();

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
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
            $scope.resetrejectdata();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $(".modalRejectCourse").hide();
            $("#lean_overlay").hide();
            $scope.resetrejectdata();
        });

    };

    $scope.acceptModal=function(courseid){
        $scope.courseid = courseid;

        $("html, body").animate({
            scrollTop: 0
        }, 600);

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $(".modalAcceptCourse").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $(".modalAcceptCourse").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $(".modalAcceptCourse").hide();
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



// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

adminApp.filter('startsWithLetterCourse', function () {

    return function (items, coursesearch) {
        var filtered = [];
        var letterMatch = new RegExp(coursesearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.coursename) || letterMatch.test(item.coursesubtitle) || letterMatch.test(item.categoryname) || letterMatch.test(item.ownername) || letterMatch.test(item.price) || letterMatch.test(item.enrollcount) || letterMatch.test(item.createdon) || letterMatch.test(item.publishedon)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});

adminApp.filter('startsWithLetterPending', function () {

    return function (items, pendingcoursesearch) {
        var filtered = [];
        var letterMatch = new RegExp(pendingcoursesearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.coursename) || letterMatch.test(item.coursesubtitle) || letterMatch.test(item.categoryname) || letterMatch.test(item.ownername) || letterMatch.test(item.price) || letterMatch.test(item.createdon) || letterMatch.test(item.reviewdate)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});



var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','summernote']);

coachApp.controller('CourseController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {

    if(!$routeParams.id){
        if(!$routeParams.sectionId){
           // $scope.loaded=true;
            requestHandler.getRequest("coach/getCourseList/","").then(function(response) {
                $scope.courselength = response.data.course;
                if( $scope.courselength.length===0){
                    $scope.myCourseList= "";
                }
                else{
                    $scope.myCourseList=response.data.course.course_list;
                }

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

        //Ratings and Reviews
        $scope.getCourseRatingAndReview=function(){

            $scope.coursereview = {ratinglevel:1};
            $scope.averageRate=0.1;
            $scope.ratingReviewParam={
                "limit":2,
                "offset":0
            };
            requestHandler.postRequest("getCourseRatingsandReviews/"+parseInt($routeParams.id)+"/",$scope.ratingReviewParam).then(function(response) {
                $scope.courseReviews=response.data;
                $scope.averageRate=$scope.courseReviews.averageratings;
                $scope.totalRatings = response.data.totalrecords;
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        }

        $scope.getCourseDetails();
        $scope.getCourseRatingAndReview();




        if($scope.courseSections!=0){
           RowSorter('table[attr-sample=thetable]', {
            /*    var sorter = $('#table1').rowSorter({*/
                handler: 'td.sorter',
                stickFirstRow : true,
                stickLastRow  : false,
                onDragStart: function(tbody, row, index)
                {
                    console.log("drag", tbody , row, index);
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
                $location.path("course-view/"+id);
            }
            else $scope.getCourseDetails();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.deleteSection=function(id){

        requestHandler.deleteRequest("coach/deleteCourseSection/",{"sectionid":$scope.deleteSectionId}).then(function(response) {

            if($routeParams.sectionId == $scope.deleteSectionId){

                $location.path("course-view/"+id);
            }
            else if($routeParams.sectionId != $scope.deleteSectionId){

                $scope.getCourseDetails();
            }

            successMessage(Flash,"Section Deleted Successfully!");


        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.reviewModel=function(){
        requestHandler.getRequest("getUserId/","").then(function(response){
            $scope.response=response.data.Login.status;
            console.log($scope.response);
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
        });
    };

    $scope.sectionDeleteModel=function(id){

        $("html, body").animate({
            scrollTop: 0
        }, 600);

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

    $scope.checkBrowser=function(){
    if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#browser-modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#browser-modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#browser-modal").hide();
            $("#lean_overlay").hide();
        });
    }
        else{
        $location.path("course-add");
    }
    };

    if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
        $scope.browser = 1;
    }
    else{
        $scope.browser = 0;
    }


}]);

coachApp.controller('CourseEditController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {

    $scope.courseDetails = {};
    var originalSectionDetails={};

    $scope.isCancel = $routeParams.cancelvalue;

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
                $location.path("course-section/"+response.data.CourseSection.sectionid);
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
            $scope.courseDetails.promoimage = $scope.courseDetails.promoimage+"?decache="+Math.random();
            $scope.originalCourseDetails = angular.copy($scope.courseDetails);
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
                $scope.loaded=true;
                requestHandler.postRequest("coach/insertCourse/",$scope.courseDetails).then(function(response) {
                    $scope.loaded=false;
                    $location.path("course-view/"+response.data.Course.courseid);
                },function(){
                    errorMessage(Flash,"Please try again later!")
                });
            });
        }
        else{
            $scope.loaded=true;
            requestHandler.postRequest("coach/insertCourse/",$scope.courseDetails).then(function(response) {
                $scope.loaded=false;
                $location.path("course-view/"+response.data.Course.courseid);
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

            var courseUpdate={};
            courseUpdate.coursename = $scope.courseDetails.coursename;
            courseUpdate.coursesubtitle = $scope.courseDetails.coursesubtitle;
            courseUpdate.coursedescription = $scope.courseDetails.coursedescription;
            courseUpdate.price = $scope.courseDetails.price;
            courseUpdate.categoryid = $scope.courseDetails.categoryid;
            courseUpdate.courseid = $scope.courseDetails.courseid;
           // courseUpdate.promoimage = base64Img;

            requestHandler.putRequest("coach/updateCourse/",courseUpdate).then(function(response) {
                $location.path("course-view/"+response.data.Course.courseid);
                successMessage(Flash,"Course Updated Successfully!");
            },function(){
                errorMessage(Flash,"Please try again later!")
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
            $location.path("course-section/"+response.data.CourseSection.sectionid);
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


    //TO check Maximum digits validation for course price
    $scope.maxPriceValue=false;
    $scope.maxPriceValueCheck = function(price){
        if(price<= 99999.99){
            $scope.maxPriceValue=false;
        }
        else if(price> 99999.99){
            $scope.maxPriceValue=true;
        }

    }
}]);

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

coachApp.directive('summernoteRequired', function () {
    return {
        require: 'ngModel',
        restrict: '',
        link: function (scope, elm, attrs, ngModel) {
            // only apply the validator if ngModel is present and Angular has added the email validator
            ngModel.$validators.summernoteRequired = function (modelValue) {
                if(modelValue==undefined || modelValue==""|| modelValue=="<p><br></p>" || modelValue=="<br>"){
                    return false;
                }
                else{
                    return true;
                }
               // return URL_REGEXP.test(modelValue);
            };
        }
    };
});

userApp.directive("starRating", function() {
    return {
        restrict : "EA",
        template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
            "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
            "    <i class='fa fa-star'></i>" + //&#9733
            "  </li>" +
            "</ul>",
        scope : {
            ratingValue : "=ngModel",
            max : "=?", //optional: default is 5
            readonly: "=?"
        },
        link : function(scope, elem, attrs) {
            if (scope.max == undefined) { scope.max = 5; }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled : (i < scope.ratingValue.ratinglevel)
                    });
                }
            };
            scope.toggle = function(index) {
                if (scope.readonly == undefined || scope.readonly == false){
                    scope.ratingValue.ratinglevel = index + 1;
                    scope.onRatingSelected({
                        ratinglevel: index + 1
                    });
                }
            };
            scope.$watch("ratingValue.ratinglevel", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});



userApp.directive("averageStarRating", function() {
    return {
        restrict : "EA",
        template : "<div class='average-rating-container'>" +
            "  <ul class='rating background' class='readonly'>" +
            "    <li ng-repeat='star in stars' class='star'>" +
            "      <i class='fa fa-star'></i>" + //&#9733
            "    </li>" +
            "  </ul>" +
            "  <ul class='rating foreground' class='readonly' ng-attr-style='width:{{filledInStarsContainerWidth}}%'>" +
            "    <li ng-repeat='star in stars' class='star filled'>" +
            "      <i class='fa fa-star'></i>" + //&#9733
            "    </li>" +
            "  </ul>" +
            "</div>",
        scope : {
            averageRatingValue : "=ngModel",
            max : "=?" //optional: default is 5
        },
        link : function(scope, elem, attrs) {
            if (scope.max == undefined) { scope.max = 5; }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({});
                }
                var starContainerMaxWidth = 76; //%
                scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
            }
            scope.$watch("averageRatingValue", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});

//Course Search Filter
userApp.filter('startsWithLetterCourse', function () {

    return function (items, coursesearch) {
        var filtered = [];
        var letterMatch = new RegExp(coursesearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.coursename) || letterMatch.test(item.categoryname)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});


//For rating and reviews in adminside
adminApp.directive("starRating", function() {
    return {
        restrict : "EA",
        template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
            "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
            "    <i class='fa fa-star'></i>" + //&#9733
            "  </li>" +
            "</ul>",
        scope : {
            ratingValue : "=ngModel",
            max : "=?", //optional: default is 5
            readonly: "=?"
        },
        link : function(scope, elem, attrs) {
            if (scope.max == undefined) { scope.max = 5; }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled : (i < scope.ratingValue.ratinglevel)
                    });
                }
            };
            scope.toggle = function(index) {
                if (scope.readonly == undefined || scope.readonly == false){
                    scope.ratingValue.ratinglevel = index + 1;
                    scope.onRatingSelected({
                        ratinglevel: index + 1
                    });
                }
            };
            scope.$watch("ratingValue.ratinglevel", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});



adminApp.directive("averageStarRating", function() {
    return {
        restrict : "EA",
        template : "<div class='average-rating-container'>" +
            "  <ul class='rating background' class='readonly'>" +
            "    <li ng-repeat='star in stars' class='star'>" +
            "      <i class='fa fa-star'></i>" + //&#9733
            "    </li>" +
            "  </ul>" +
            "  <ul class='rating foreground' class='readonly' ng-attr-style='width:{{filledInStarsContainerWidth}}%'>" +
            "    <li ng-repeat='star in stars' class='star filled'>" +
            "      <i class='fa fa-star'></i>" + //&#9733
            "    </li>" +
            "  </ul>" +
            "</div>",
        scope : {
            averageRatingValue : "=ngModel",
            max : "=?" //optional: default is 5
        },
        link : function(scope, elem, attrs) {
            if (scope.max == undefined) { scope.max = 5; }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({});
                }
                var starContainerMaxWidth = 76; //%
                scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
            }
            scope.$watch("averageRatingValue", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});

//For rating and reviews in coach
coachApp.directive("starRating", function() {
    return {
        restrict : "EA",
        template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
            "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
            "    <i class='fa fa-star'></i>" + //&#9733
            "  </li>" +
            "</ul>",
        scope : {
            ratingValue : "=ngModel",
            max : "=?", //optional: default is 5
            readonly: "=?"
        },
        link : function(scope, elem, attrs) {
            if (scope.max == undefined) { scope.max = 5; }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled : (i < scope.ratingValue.ratinglevel)
                    });
                }
            };
            scope.toggle = function(index) {
                if (scope.readonly == undefined || scope.readonly == false){
                    scope.ratingValue.ratinglevel = index + 1;
                    scope.onRatingSelected({
                        ratinglevel: index + 1
                    });
                }
            };
            scope.$watch("ratingValue.ratinglevel", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});



coachApp.directive("averageStarRating", function() {
    return {
        restrict : "EA",
        template : "<div class='average-rating-container'>" +
            "  <ul class='rating background' class='readonly'>" +
            "    <li ng-repeat='star in stars' class='star'>" +
            "      <i class='fa fa-star'></i>" + //&#9733
            "    </li>" +
            "  </ul>" +
            "  <ul class='rating foreground' class='readonly' ng-attr-style='width:{{filledInStarsContainerWidth}}%'>" +
            "    <li ng-repeat='star in stars' class='star filled'>" +
            "      <i class='fa fa-star'></i>" + //&#9733
            "    </li>" +
            "  </ul>" +
            "</div>",
        scope : {
            averageRatingValue : "=ngModel",
            max : "=?" //optional: default is 5
        },
        link : function(scope, elem, attrs) {
            if (scope.max == undefined) { scope.max = 5; }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({});
                }
                var starContainerMaxWidth = 76; //%
                scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
            }
            scope.$watch("averageRatingValue", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});
