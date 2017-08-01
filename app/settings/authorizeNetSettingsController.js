/**
 * Created by Deemsys on 21/7/17.
 */

var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('AuthorizeNetSettingsController',['$scope','requestHandler','Flash','siteMenuService','$location',function($scope,requestHandler,Flash,siteMenuService,$location){
    var original="";

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });

    //For Disable button while Submitting the page
    $scope.submitContent=false;
    $scope.contentBtnTxt="Save Changes";

    //To get Authorize Settings

    $scope.doGetAuthorizeSettings= function () {
        requestHandler.getRequest("admin/getauthorizedetails/","").then(function(response){

            $scope.authorizeSettings=response.data;

            if($scope.authorizeSettings.authorizetype==null){
                $scope.authorizeSettings.authorizetype="1";
            }else{
                $scope.authorizeSettings.authorizetype=$scope.authorizeSettings.authorizetype.toString();
            }
            original=angular.copy($scope.authorizeSettings);
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    //To Update Authorize Settings
    $scope.doUpdateAuthorizeSettings=function(){
        $scope.submitContent=true;
        $scope.contentBtnTxt="Submitting...";
        $scope.authorizeSettings.authorizetype=parseInt($scope.authorizeSettings.authorizetype);
        requestHandler.postRequest("admin/updateauthorizenet/",$scope.authorizeSettings).then(function(response){
            $scope.doGetAuthorizeSettings();
            successMessage(Flash,"Successfully Updated!");
            $scope.submitContent=false;
            $scope.contentBtnTxt="Save Changes";
        },function(){
            errorMessage(Flash,"Please try again later");
        });
    };

   //To clean Authorize settings Value
    $scope.doGetAuthorizeSettings_isClean=function(){
        return angular.equals(original, $scope.razorSettings);
    };

  //T0 init()  the Getsettings page while loading the page
    $scope.doGetAuthorizeSettings();

}]);
