var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);adminApp.controller("SocialMediaSettingsController",["$scope","requestHandler","Flash","siteMenuService","$location",function(a,b,c,d,e){var f="";a.siteMenuList=d,$.each(a.siteMenuList,function(a,b){b.href==e.path().substr(1)?b.active="active":b.active=""}),a.doGetSocialMedia=function(){b.getRequest("admin/getappdetails","").then(function(b){f=angular.copy(b.data.App_settings[0]),a.socialMedia=b.data.App_settings[0]},function(a){errorMessage(c,"Please Try again later")})},a.doUpdateSocialMedia=function(){b.putRequest("admin/updateSocialURLDetails",a.socialMedia).then(function(b){f=angular.copy(a.socialMedia),successMessage(c,"Successfully Updated!")},function(){errorMessage(c,"Please try again later")})},a.doGetSocialMedia_isClean=function(){return angular.equals(f,a.socialMedia)},a.doGetSocialMedia()}]);