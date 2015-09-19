/**
 * Created by Deemsys on 9/18/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller("MobileAppSettingsController",function($scope,requestHandler,Flash){



    $scope.collectDetails= function () {
      requestHandler.getRequest("admin/getmobileinfo","").then(function(response){
          $scope.mobileInfoWindows=response.data.Mobile_Info[0];
          $scope.mobileInfoAndroid=response.data.Mobile_Info[1];
          $scope.mobileInfoIos=response.data.Mobile_Info[2];
      },function(response){
          errorMessage(Flash,"Please try again after some time!")
      });

    };

    $scope.doUpdateIos=function(){
        requestHandler.putRequest("admin/updatemobileinfo",$scope.mobileInfoIos).then(function(response){
            $scope.mobileInfoIos=response.data.Mobile_Info;
            successMessage(Flash,"Successfully updated!");
        },function(response){
            errorMessage(Flash,"Please try again after some time!")
        });
    };

    $scope.doUpdateAndroid=function(){
        requestHandler.putRequest("admin/updatemobileinfo",$scope.mobileInfoAndroid).then(function(response){
            $scope.mobileInfoAndroid=response.data.Mobile_Info;
            successMessage(Flash,"Successfully updated!");
        },function(response){
            errorMessage(Flash,"Please try again after some time!")
        });
    };


    $scope.doUpdateWindows= function () {
        requestHandler.putRequest("admin/updatemobileinfo",$scope.mobileInfoWindows).then(function(response){
            $scope.mobileInfoWindows=response.data.Mobile_Info;
            successMessage(Flash,"Successfully updated!");
        },function(response){
           errorMessage(Flash,"Please try again after some time!")
        });
    };

    $scope.collectDetails();
});
