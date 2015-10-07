/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('SocialMediaSettingsController',function($scope,requestHandler,Flash){
    var original="";
    $scope.activeClass = {social:'active'};

    $scope.doGetSocialMedia= function () {
        requestHandler.getRequest("admin/getappdetails","").then(function(response){
            original=angular.copy(response.data.App_settings[0]);
             $scope.socialMedia=response.data.App_settings[0];
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    $scope.doUpdateSocialMedia=function(){
        requestHandler.putRequest("admin/updateSocialURLDetails",$scope.socialMedia).then(function(response){
            original=angular.copy($scope.socialMedia);
            successMessage(Flash,"Successfully Updated!");
        },function(){
            errorMessage(Flash,"Please try again later");
        });
    };

    $scope.doGetSocialMedia_isClean=function(){
        console.log(angular.equals(original, $scope.socialMedia));
        return angular.equals(original, $scope.socialMedia);
    };

    $scope.doGetSocialMedia();

});
