/**
 * Created by Deemsys on 3/19/2016.
 */
var commonApp= angular.module('commonApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

commonApp.controller('HealthyTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.healthy='active';
}]);

var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

userApp.controller('HealthyTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.healthy='active';
}]);

var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

coachApp.controller('HealthyTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.healthy='active';
}]);

var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

adminApp.controller('HealthyTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.healthy='active';
}]);