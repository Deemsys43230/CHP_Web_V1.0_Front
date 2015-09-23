/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('ServerSettingsController',function($scope,requestHandler,Flash){
    var original="";
    $scope.activeClass = {sever:'active'};

    $scope.doGetServerSettings= function () {
        requestHandler.getRequest("admin/getappdetails","").then(function(response){
            original=angular.copy(response.data.App_settings[0]);
             $scope.serverSettings=response.data.App_settings[0];
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    $scope.doUpdateServerSettings=function(){
        requestHandler.putRequest("admin/updateEmailDetails",$scope.serverSettings).then(function(response){
            successMessage(Flash,"Successfully Updated!");
        },function(){
            errorMessage(Flash,"Please try again later");
        });
    };

    $scope.doGetServerSettings_isClean=function(){
        return angular.equals(original, $scope.serverSettings);
    };

    $scope.doGetServerSettings();

});
