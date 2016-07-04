/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('PaypalSettingsController',['$scope','requestHandler','Flash','siteMenuService','$location',function($scope,requestHandler,Flash,siteMenuService,$location){
    var original="";

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });

    $scope.doGetPaypalSettings= function () {
        requestHandler.getRequest("admin/getappdetails/","").then(function(response){

            $scope.paypalSettings=response.data.App_settings[0];

            if($scope.paypalSettings.paypaltype==null){
                $scope.paypalSettings.paypaltype="1";
            }else{
                $scope.paypalSettings.paypaltype=$scope.paypalSettings.paypaltype.toString();
            }
            $scope.paypalSettings.adminPassword="";
            $scope.paypalSettings.coursepurchaseshare = $scope.paypalSettings.coursepurchaseshare.toString();
            $scope.paypalSettings.coachsubscribeshare = $scope.paypalSettings.coachsubscribeshare.toString();
            original=angular.copy($scope.paypalSettings);
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    $scope.doUpdatePaypalSettings=function(){
        $scope.paypalSettings.paypaltype=parseInt($scope.paypalSettings.paypaltype);
        requestHandler.putRequest("admin/updatePayPalDetails",$scope.paypalSettings).then(function(response){
            if(response.data.Response_status=="1"){
                $scope.doGetPaypalSettings();
                $scope.confirmPasswordForm.$setPristine();
                successMessage(Flash,"Successfully Updated!");
            }else{
                $scope.paypalSettings.adminPassword="";
                $scope.confirmPasswordForm.$setPristine();
                errorMessage(Flash,"Invalid data provided");
            }

        },function(){
            $scope.paypalSettings.adminPassword="";
            $scope.confirmPasswordForm.$setPristine();
            errorMessage(Flash,"Please try again later");
        });
    };

    $scope.doGetPaypalSettings_isClean=function(){
        return angular.equals(original, $scope.paypalSettings);
    };

    $scope.doGetPaypalSettings();

}]);
