var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','countTo']);

adminApp.controller('AdminDashboardController',['$scope','requestHandler',function($scope,requestHandler) {
    $scope.countFrom = 0;
    //Get Coach List
    $scope.doGetAdminDashboardCount=function(){
        requestHandler.getRequest("getStatistics/","").then(function(response){
            $scope.adminCountList=response.data.Stats;
            $scope.memberCount = $scope.adminCountList.membercount;
            $scope.coachCount = $scope.adminCountList.coachcount;
            $scope.exerciseCount = $scope.adminCountList.exercisecount;
            $scope.foodCount = $scope.adminCountList.foodcount;
            $scope.courseCount = $scope.adminCountList.publishedcourses;
            $scope.payCount = $scope.adminCountList.totalincome;

        });
    };


    $scope.doGetAdminDashboardCount();

}]);