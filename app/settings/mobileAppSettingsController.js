/**
 * Created by Deemsys on 9/18/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller("MobileAppSettingsController",['$scope','requestHandler','Flash','siteMenuService','$location',function($scope,requestHandler,Flash,siteMenuService,$location){

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });

    var mobileInfoWindows_original="";
    var mobileInfoAndroid_original="";
    var mobileInfoIos_original="";

    $scope.copyOrginal_Ios=function(mobileInfoIos){
        $scope.mobileInfoIos=mobileInfoIos;
        $scope.mobileInfoIos.buildnumber = $scope.mobileInfoIos.buildnumber.toString();
        $scope.mobileInfoIos.version = $scope.mobileInfoIos.version.toString();
        mobileInfoIos_original=angular.copy($scope.mobileInfoIos);
    };

    $scope.copyOrginal_Android=function(mobileInfoAndroid){
        $scope.mobileInfoAndroid=mobileInfoAndroid;
        $scope.mobileInfoAndroid.buildnumber = $scope.mobileInfoAndroid.buildnumber.toString();
        $scope.mobileInfoAndroid.version = $scope.mobileInfoAndroid.version.toString();
        mobileInfoAndroid_original=angular.copy($scope.mobileInfoAndroid);
    };

    $scope.copyOrginal_Windows=function(mobileInfoWindows){
        $scope.mobileInfoWindows=mobileInfoWindows;
        $scope.mobileInfoWindows.buildnumber = $scope.mobileInfoWindows.buildnumber.toString();
        $scope.mobileInfoWindows.version = $scope.mobileInfoWindows.version.toString();
        mobileInfoWindows_original=angular.copy($scope.mobileInfoWindows);
    };

    $scope.collectDetails= function () {
        requestHandler.getRequest("admin/getmobileinfo","").then(function(response){

            $scope.mobileInfoWindows=response.data.Mobile_Info[2];
            $scope.mobileInfoAndroid=response.data.Mobile_Info[0];
            $scope.mobileInfoIos=response.data.Mobile_Info[1];

            $scope.copyOrginal_Ios($scope.mobileInfoIos);
            $scope.copyOrginal_Android($scope.mobileInfoAndroid);
            $scope.copyOrginal_Windows($scope.mobileInfoWindows);




        },function(response){
            errorMessage(Flash,"Please try again after some time!")
        });

    };

    $scope.doUpdateIos=function(){
        requestHandler.putRequest("admin/updatemobileinfo",$scope.mobileInfoIos).then(function(response){
            $scope.mobileInfoIos=response.data.Mobile_Info;
            $scope.copyOrginal_Ios($scope.mobileInfoIos);
            successMessage(Flash,"Successfully updated!");
        },function(response){
            errorMessage(Flash,"Please try again after some time!")
        });
    };

    $scope.doUpdateAndroid=function(){
        requestHandler.putRequest("admin/updatemobileinfo",$scope.mobileInfoAndroid).then(function(response){
            $scope.mobileInfoAndroid=response.data.Mobile_Info;
            $scope.copyOrginal_Android($scope.mobileInfoAndroid);
            successMessage(Flash,"Successfully updated!");
        },function(response){
            errorMessage(Flash,"Please try again after some time!")
        });
    };


    $scope.doUpdateWindows= function () {
        requestHandler.putRequest("admin/updatemobileinfo",$scope.mobileInfoWindows).then(function(response){
            $scope.mobileInfoWindows=response.data.Mobile_Info;
            $scope.copyOrginal_Windows($scope.mobileInfoWindows);
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
    };

    $scope.mobileInfoIos_isClean=function(){
        return angular.equals(mobileInfoIos_original, $scope.mobileInfoIos);
    };

    $scope.collectDetails();
}]);
