/**
 * Created by Deemsys on 3/19/2016.
 */
var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

coachApp.controller('CoachSubscriptionController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {
    $scope.activeClass.coach='active';

    $scope.planId = $routeParams.id;


    // Get Coach is Subscription Active
    $scope.doGetCoachSubscription = function() {
      requestHandler.getRequest("coach/isSubscriptionActive/","").then(function(response){
        $scope.responseStatus = response.data;
        if (response.data.Response_status == 0) {
          console.log("ok");
        } else{
          $location.path('my-members');
        }

      });
    }


    //Get Coach Details
    $scope.doGetCoachDetails=function(){
        $scope.coach.planchoice = $scope.planId;
        requestHandler.postRequest("placecoachinterest/",$scope.coach).then(function(response){
           successMessage(Flash,"Successfully Registered");
          $scope.coach={};
         $scope.coachDetailsForm.$setPristine();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetPricingPlans = function() {
      requestHandler.getRequest("getactivePricingPlans/","").then(function(response){
          $scope.pricingPlanDetails = response.data.PricingPlans;
          console.log($scope.pricingPlanDetails);
      });
    };

    //For USA and metric button 
    $scope.units=1;
    $scope.test=function(unitVar){
       if(unitVar=='mUnit'){
        $scope.units=1;
       }
       else if(unitVar){
        $scope.units=2;
       }
    };

    $scope.init = function() {
      $scope.doGetPricingPlans();
      $scope.doGetCoachSubscription();
    };

    $scope.init();
}]);