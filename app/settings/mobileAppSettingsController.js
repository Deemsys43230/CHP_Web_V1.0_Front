/**
 * Created by Deemsys on 9/18/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller("MobileAppSettingsController",function($scope,requestHandler,Flash){

    $scope.activeClass = {mobileApp:'active'};

    var mobileInfoWindows_original="";
    var mobileInfoAndroid_original="";
    var mobileInfoIos_original="";
    $scope.collectDetails= function () {
      requestHandler.getRequest("admin/getmobileinfo","").then(function(response){

          mobileInfoWindows_original=angular.copy(response.data.Mobile_Info[0]);
          $scope.mobileInfoWindows=response.data.Mobile_Info[0];

          mobileInfoAndroid_original=angular.copy(response.data.Mobile_Info[1]);
          $scope.mobileInfoAndroid=response.data.Mobile_Info[1];

          mobileInfoIos_original=angular.copy(response.data.Mobile_Info[2]);
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

    $scope.mobileInfoWindows_isClean=function(){
            return angular.equals(mobileInfoWindows_original, $scope.mobileInfoWindows);
        };

    $scope.mobileInfoAndroid_isClean=function(){
            return angular.equals(mobileInfoAndroid_original, $scope.mobileInfoAndroid);
        }

    $scope.mobileInfoIos_isClean=function(){
            return angular.equals(mobileInfoIos_original, $scope.mobileInfoIos);
    };

    $scope.collectDetails();
});
