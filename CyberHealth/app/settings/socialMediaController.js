var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);adminApp.controller("SocialMediaSettingsController",["$scope","requestHandler","Flash","siteMenuService","$location",function(e,a,t,i,n){var s="";e.siteMenuList=i,$.each(e.siteMenuList,function(e,a){a.href==n.path().substr(1)?a.active="active":a.active=""}),e.doGetSocialMedia=function(){a.getRequest("admin/getappdetails","").then(function(a){s=angular.copy(a.data.App_settings[0]),e.socialMedia=a.data.App_settings[0]},function(){errorMessage(t,"Please Try again later")})},e.doUpdateSocialMedia=function(){a.putRequest("admin/updateSocialURLDetails",e.socialMedia).then(function(){s=angular.copy(e.socialMedia),successMessage(t,"Successfully Updated!")},function(){errorMessage(t,"Please try again later")})},e.doGetSocialMedia_isClean=function(){return angular.equals(s,e.socialMedia)},e.doGetSocialMedia()}]);