var coachApp=angular.module("coachApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);coachApp.controller("CoachPaymentSettingsController",["$scope","requestHandler","Flash","$location",function(a,b,c,d){a.activeClass={paymentSettings:"active"};var e="";a.doGetCurrencyCode=function(){b.getRequest("getCurrencyCode/","").then(function(b){a.currencycodeData=b.data.CurrencyCode_Data},function(a){errorMessage(c,"Please Try again later")})},a.doGetPaypalDetails=function(){b.getRequest("getUserSettings/","").then(function(b){e=angular.copy(b.data.User_Settings[0]),a.paypalDetails=b.data.User_Settings[0],console.log(a.paypalDetails)},function(a){errorMessage(c,"Please Try again later")})},a.doUpdatePaypalDetails=function(){b.putRequest("updateUserSettings/",a.paypalDetails).then(function(b){0==b.data.Response_status?errorMessage(c,"Invalid paypal emailId!!!"):0==b.data.Response_status&&(successMessage(c,"Successfully Updated!"),a.getSettingDetails())},function(){errorMessage(c,"Please try again later")})},a.getSettingDetails=function(){a.doGetCurrencyCode(),a.doGetPaypalDetails()},a.isCleanPaypalSettings=function(){return angular.equals(e,a.paypalDetails)},a.getSettingDetails()}]);