var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','countTo']);

coachApp.controller('CoachDashboardController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
    $scope.countFrom = 0;
    //Get Coach List
    $scope.doGetCoachDashboardCount=function(){
        requestHandler.getRequest("getStatistics/","").then(function(response){
            $scope.coachCountList=response.data.Stats;
            $scope.myMemberCount = $scope.coachCountList.subscriptioncount;
            $scope.myCourseCount = $scope.coachCountList.publishedcourses;
            $scope.myPayCount = $scope.coachCountList.totalincome

        });
    };


    //Check for Active Subscription
    $scope.doNavigateToMembersList=function(){
        requestHandler.getRequest("/coach/isSubscriptionActive/","").then(function(response){
            if(response.data.Response_status==1)
                $location.path("my-members");
            else
                $location.path("subscription");
        });
    };

    $scope.doGetCoachDashboardCount();

}]);