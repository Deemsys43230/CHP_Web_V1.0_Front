var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination"]);adminApp.controller("VendorSettingsController",["$scope","requestHandler","Flash","siteMenuService","$location",function(a,b,c,d,e){a.siteMenuList=d,$.each(a.siteMenuList,function(a,b){b.href==e.path().substr(1)?b.active="active":b.active=""}),a.doGetWearableVendorList=function(){a.loaded=!0,b.getRequest("admin/getWearableVendorList/","").then(function(b){a.vendorlist=b.data.vendorlist,a.loaded=!1,a.paginationLoad=!0},function(){errorMessage(c,"Please try again later!")})},a.init=function(){a.paginationLoad=!1,a.doGetWearableVendorList()}}]),adminApp.controller("VendorEditSettingsController",["$scope","requestHandler","Flash","siteMenuService","$location","$routeParams",function(a,b,c,d,e,f){a.siteMenuList=d,$.each(a.siteMenuList,function(a,b){b.href==e.path().substr(1)?b.active="active":b.active=""}),a.doGetWearableVendor=function(){b.postRequest("admin/getWearableVendordDetail/",{vendorid:f.id}).then(function(b){a.vendor=b.data.vendorlist},function(){errorMessage(c,"Please try again later!")})},a.doUpdateWearableVendor=function(){b.putRequest("admin/updateWearableVendor/",a.vendor).then(function(a){successMessage(c,"Successfully Updated"),e.path("vendor-settings")},function(){errorMessage(c,"Please try again later!")})},a.doGetWearableVendor()}]);