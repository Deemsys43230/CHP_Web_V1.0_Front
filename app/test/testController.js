var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash']);
userApp.controller('CourseController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {



    $scope.mycourselist = function(){
    requestHandler.getRequest("user/getMyCourseList/","").then(function(response) {
        $scope.myCourseList = response.data.published_Course;
        console.log($scope.myCourseList);
    },function(){
        errorMessage(Flash,"Please try again later!")
    });
    };

    $scope.courseDetails =function(){
        requestHandler.postRequest("courseDetail/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.courseDetails = response.data.coursedetail;
            $scope.courseDetails.role= "user";
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

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doEnrollCourse = function(course){
        requestHandler.postRequest("user/enrollCourse/",{"courseid":course}).then(function(response){
            $location.path("courseDetail/"+course);
            successMessage(Flash,"Successfully Enrolled");
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.checkenroll = function(){
       alert("Please enroll the course to view details!!!");
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
            if( nextIndex === $scope.sectionList.length -1){

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

    }

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
            console.log("Newcurr",currentIndex);
            $scope.nextdisable=false;

        });
    }

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
                $location.path("courseDetail/"+course);
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
                $location.path("courseDetail/"+course);
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
}]);

// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);