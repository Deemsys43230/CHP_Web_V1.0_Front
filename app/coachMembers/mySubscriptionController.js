var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('MySubscriptionController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {
    
    $scope.activeClass.sub='active';

    //Do Get Coach Active plans
    $scope.doGetCoachIsActivePlan= function(){
    	requestHandler.getRequest("coach/isSubscriptionActive/","").then(function(responce){
    		$scope.coachActivePlan=responce.data.subscription;
    	});
    };

    //Do get Coach Subscribed plan
    $scope.doGetSubscribedPlan=function(){
    	requestHandler.getRequest("coach/getsubscriptionhistory/","").then(function(responce){
    		$scope.subscriptionPlanHistory = responce.data.history;
            $scope.loaded=false;
            $scope.paginationLoad=true;
    	});
    };

    $scope.init=function(){
    	$scope.doGetCoachIsActivePlan();
    	$scope.doGetSubscribedPlan();
    };

    $scope.init();

}]);