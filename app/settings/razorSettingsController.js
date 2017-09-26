/**
 * Created by Deemsys on 21/7/17.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('RazorSettingsController',['$scope','requestHandler','Flash','siteMenuService','$location',function($scope,requestHandler,Flash,siteMenuService,$location){
    var original="";

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.id==6){
            value.active = "active";
        }
        else value.active = ""
    });
    //For Disable button while Submitting the page
    $scope.submitContent=false;
    $scope.contentBtnTxt="Save Changes";

    //To get Razor PaymentSettings
    $scope.doGetRazorSettings= function () {
        requestHandler.getRequest("admin/getrazorpaydetails/","").then(function(response){

            $scope.razorSettings=response.data;

            if($scope.razorSettings.razortype==null){
                $scope.razorSettings.razortype="1";
            }else{
                $scope.razorSettings.razortype=$scope.razorSettings.razortype.toString();
            }
            original=angular.copy($scope.razorSettings);
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

  // To Update Razor PaymentSettings
    $scope.doUpdateRazorSettings=function(){
        $scope.submitContent=true;
        $scope.contentBtnTxt="Submitting...";
        $scope.razorSettings.razortype=parseInt($scope.razorSettings.razortype);
        console.log($scope.razorSettings);
        requestHandler.postRequest("admin/updaterazorpay/",$scope.razorSettings).then(function(response){
            if(response.data.Response_status!="0"){
                 $scope.doGetRazorSettings();
                successMessage(Flash,"Successfully Updated!");
            }else{
                errorMessage(Flash,"Please&nbsp;provide&nbsp;valid&nbsp;data")
            }
               
            $scope.submitContent=false;
            $scope.contentBtnTxt="Save Changes";
    },function(){
            errorMessage(Flash,"Please try again later");
        });

    };

    // To clean razor payment
    $scope.doGetRazorSettings_isClean=function(){
        return angular.equals(original, $scope.razorSettings);
    };

  //To init() the Getsettings page while loading the page
    $scope.doGetRazorSettings();

}]);