/**
 * Created by Deemsys on 21/7/17.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('RazorSettingsController',['$scope','requestHandler','Flash','siteMenuService','$location',function($scope,requestHandler,Flash,siteMenuService,$location){
    var original="";

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });


}]);