var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash']);
userApp.controller('CourseController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {



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
            });
        },function(){
            errorMessage(Flash,"Please try again later!")
        });



    };

    $scope.courseSectionDetailsbyId =function(id){
        requestHandler.postRequest("user/sectionDetail/",{"sectionid":id}).then(function(response) {
            $scope.sectionDetail = response.data.sectiondetail;
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
            successMessage(Flash,"Successfully Enrolled");
            $location.path("courseDetail/"+course);
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.checkenroll = function(){
       alert("Please enroll the course to view details!!!");
    }

    $scope.getNextCategoryIndex = function(currentIndex) {
        var nextIndex = currentIndex+1;

        return nextIndex;
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

