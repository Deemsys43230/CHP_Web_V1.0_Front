var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','countTo']);

coachApp.controller('CoachDashboardController',function($scope,requestHandler,Flash) {
    $scope.countFrom = 0;
    //Get Coach List
    $scope.doGetCoachDashboardCount=function(){
        requestHandler.getRequest("getStatistics/","").then(function(response){
            $scope.coachCountList=response.data.Stats;
            $scope.myMemberCount = $scope.coachCountList.membercount;
            $scope.myCourseCount = $scope.coachCountList.publishedcourses;
            $scope.myPayCount = $scope.coachCountList.totalincome

        });
    };


    $scope.doGetCoachDashboardCount();

});