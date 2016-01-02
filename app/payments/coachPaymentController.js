var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('CoachPaymentController',function($scope,requestHandler,Flash,$routeParams) {

    // To display Course list by user
    $scope.doGetMyCourseListByUser=function(){
        requestHandler.getRequest("coach/getCourseList/","").then(function(response) {
            $scope.myCourseList = response.data.course.course_list;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetMyStudentListByCourse=function(){
        requestHandler.getRequest("coach/getCourseList/","").then(function(response) {
            $scope.studentList = response.data.course.course_list;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // To display Coach list by user
    $scope.doGetMyStudentListByCoach=function(){
        requestHandler.getRequest("coach/getCourseList/","").then(function(response) {
            $scope.subscribedList = response.data.course.course_list;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.courseListInit=function(){
        $scope.doGetMyCourseListByUser();
    };

    $scope.studentListInit=function(){
        $scope.doGetMyStudentListByCourse();
    };

    $scope.studentSubscriptionList=function(){
        $scope.doGetMyStudentListByCoach();
    };

});


// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);