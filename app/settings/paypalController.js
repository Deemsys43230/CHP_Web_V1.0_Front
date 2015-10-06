/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('PaypalSettingsController',function($scope,requestHandler,Flash){
    var original="";
    $scope.activeClass = {paypal:'active'};

    $scope.doGetPaypalSettings= function () {
        requestHandler.getRequest("admin/getappdetails","").then(function(response){
            original=angular.copy(response.data.App_settings[0]);
             $scope.paypalSettings=response.data.App_settings[0];
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    $scope.doUpdatePaypalSettings=function(){
        requestHandler.putRequest("admin/updatePayPalDetails",$scope.paypalSettings).then(function(response){
            successMessage(Flash,"Successfully Updated!");
        },function(){
            errorMessage(Flash,"Please try again later");
        });
    };

    $scope.doGetPaypalSettings_isClean=function(){
        console.log(angular.equals(original, $scope.paypalSettings));
        return angular.equals(original, $scope.paypalSettings);
    };

    $scope.doGetPaypalSettings();

});
