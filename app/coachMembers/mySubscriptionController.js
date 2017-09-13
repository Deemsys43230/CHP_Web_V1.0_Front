var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('MySubscriptionController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {
    
    $scope.activeClass.sub='active';

    //Do Get Coach Active plans
    $scope.doGetCoachIsActivePlan= function(){
    	requestHandler.getRequest("coach/isSubscriptionActive/","").then(function(response){
    		$scope.coachActivePlan=response.data.subscription;
            if(response.data.isActive==1){
                $scope.subscriptionStatus=true;
            }
            else{
                $scope.subscriptionStatus=false;
            }
    	});
    };

    //Do get Coach Subscribed plan
    $scope.doGetSubscribedPlan=function(){
    	requestHandler.getRequest("coach/getsubscriptionhistory/","").then(function(response){
            $scope.totalcountINR = response.data.totalspendingsINR;
            $scope.totalcountUSD = response.data.totalspendingsUSD;
    		$scope.subscriptionPlanHistory = response.data;
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