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

            $scope.sectionDetail = response.data.course[0];

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.courseSectionDetails =function(id){
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

