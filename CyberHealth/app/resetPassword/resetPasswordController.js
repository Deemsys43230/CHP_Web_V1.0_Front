var passwordApp=angular.module("passwordApp",["ngRoute","requestModule","flash","ngAnimate"]);passwordApp.controller("ResetPasswordController",["$scope","requestHandler","Flash","$location","$rootScope","$window","$routeParams",function(a,b,c,d,e,f,g){a.resetPassword=function(){console.log(a.reset.newPassword),b.postRequest("resetNewPassword/",{passwordToken:i,password:a.reset.newPassword}).then(function(b){1==b.data.Response_status&&(f.location.href="../../#/home/password",a.newpassword="",a.confirmPassword="",a.resetPasswordForm.$setPristine())})};var h=window.location.search,i=h.substring(1,h.length);a.verifyToken=function(){b.postRequest("checkToken/",{passwordToken:i}).then(function(b){1==b.data.Response_status?a.response=1:2==b.data.Response_status?a.response=2:3==b.data.Response_status&&(a.response=3)})},a.init=function(){a.verifyToken()},a.init()}]),passwordApp.directive("compareTo",function(){return{require:"ngModel",scope:{otherModelValue:"=compareTo"},link:function(a,b,c,d){d.$validators.compareTo=function(b){return b==a.otherModelValue},a.$watch("otherModelValue",function(){d.$validate()})}}});