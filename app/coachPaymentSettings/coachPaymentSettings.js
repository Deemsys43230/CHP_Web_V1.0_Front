/**
 * Created by user on 26-09-2015.
 */

var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

coachApp.controller('CoachPaymentSettingsController',function($scope,requestHandler,Flash,$location) {
//sidebar menu active class
    $scope.activeClass = {paymentSettings:'active'};
    var original="";
      $scope.doGetCurrencyCode = function(){
        requestHandler.getRequest("getCurrencyCode/","").then(function(response){
            $scope.currencycodeData=response.data.CurrencyCode_Data;
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });
    };

    $scope.doGetPaypalDetails = function(){
        requestHandler.getRequest("getUserSettings/","").then(function(response){
            original = angular.copy(response.data.User_Settings[0]);
            $scope.paypalDetails=response.data.User_Settings[0];

        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };


    $scope.doUpdatePaypalDetails=function(){
        requestHandler.putRequest("updateUserSettings/",$scope.paypalDetails).then(function(response){

            successMessage(Flash,"Successfully Updated!");
        },function(){
            errorMessage(Flash,"Please try again later");
        });
    };



    $scope.getSettingDetails = function(){
        $scope.doGetCurrencyCode();
        $scope.doGetPaypalDetails();
    };

    $scope.isCleanPaypalSettings=function(){
        return angular.equals(original, $scope.paypalDetails);
    };

    $scope.getSettingDetails();
});