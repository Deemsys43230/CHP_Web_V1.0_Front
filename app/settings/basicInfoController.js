/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('ContactUsController',function($scope,requestHandler,Flash){

    $scope.activeClass = {basic:'active'};

    //This
    var original="";
    $scope.doGetContactUs= function () {
        requestHandler.getRequest("admin/getappdetails/","").then(function(response){
            original=angular.copy(response.data.App_settings[0]);
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

    $scope.doGetContactUs_isClean=function(){
        return angular.equals(original, $scope.contactUs);
    };
    $scope.doGetContactUs();

});

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);
commonApp.controller('ContactUsDetailsController',function($scope,requestHandler,Flash) {

    // To Get the Contact Us details
    $scope.doGetContactUsDetails= function () {
        requestHandler.getRequest("contactus/","").then(function(response){
            $scope.contactUsDetails=response.data.Contactus[0];
            console.log($scope.contactUsDetails);
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    //Display Contact Us details on load
    $scope.doGetContactUsDetails();

});