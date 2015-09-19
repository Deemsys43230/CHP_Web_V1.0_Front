/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('ContactUsController',function($scope,requestHandler,Flash){

    //This
    $scope.doGetContactUs= function () {
        requestHandler.getRequest("admin/getappdetails/","").then(function(response){
             $scope.contactUs=response.data.App_settings[0];
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    $scope.doUpdateContactUs=function(){
        requestHandler.putRequest("admin/updateAddressDetails",$scope.contactUs).then(function(response){
            successMessage(Flash,"Successfully Updated!");
        },function(){
            errorMessage(Flash,"Please try again later");
        });
    };

    $scope.doGetContactUs();

});
