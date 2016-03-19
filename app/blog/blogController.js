/**
 * Created by Deemsys on 3/19/2016.
 */
var commonApp= angular.module('commonApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

commonApp.controller('BlogController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.blog='active';
}]);

var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

userApp.controller('BlogController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.blog='active';
}]);

var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

coachApp.controller('BlogController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.blog='active';
}]);

var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

adminApp.controller('BlogController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.blog='active';
}]);