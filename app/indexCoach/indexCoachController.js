/**
 * Created by Deemsys on 3/19/2016.
 */
var commonApp= angular.module('commonApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

commonApp.controller('CoachController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {
    $scope.activeClass.coach='active';

    $scope.planId = $routeParams.id;

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
    };

    $scope.init();
}]);