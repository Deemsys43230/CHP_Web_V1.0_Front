/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('SocialMediaSettingsController',function($scope,requestHandler,Flash){

    $scope.doGetSocialMedia= function () {
        requestHandler.getRequest("admin/getappdetails","").then(function(response){
             $scope.socialMedia=response.data.App_settings[0];
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    $scope.doUpdateSocialMedia=function(){
        requestHandler.putRequest("admin/updateSocialURLDetails",$scope.socialMedia).then(function(response){
            successMessage(Flash,"Successfully Updated!");
        },function(){
            errorMessage(Flash,"Please try again later");
        });
    };

    $scope.doGetSocialMedia();

});
