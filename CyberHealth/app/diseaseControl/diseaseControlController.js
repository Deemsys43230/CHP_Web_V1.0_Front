var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","summernote","angularUtils.directives.dirPagination"]);adminApp.controller("DiseaseControlController",["$scope","requestHandler","Flash","$location","siteMenuService",function(a,b,c,d,e){a.isNew=!0,a.siteMenuList=e,$.each(a.siteMenuList,function(a,b){b.href==d.path().substr(1)?b.active="active":b.active=""}),a.title="Add DiseaseControl Tips",a.options={height:250}}]),adminApp.controller("DiseaseControlEditController",["$scope","requestHandler","Flash","$location","siteMenuService",function(a,b,c,d,e){a.isNew=!0,a.siteMenuList=e,$.each(a.siteMenuList,function(a,b){b.href==d.path().substr(1)?b.active="active":b.active=""}),a.title="Edit DiseaseControl Tips",a.options={height:250}}]);