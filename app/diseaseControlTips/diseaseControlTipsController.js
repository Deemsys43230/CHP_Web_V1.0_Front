/**
 * Created by Deemsys on 3/19/2016.
 */
var commonApp= angular.module('commonApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

commonApp.controller('diseaseControlTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.disease='active';
}]);

var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

userApp.controller('diseaseControlTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.disease='active';
}]);

var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

coachApp.controller('diseaseControlTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.disease='active';
}]);

var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

adminApp.controller('diseaseControlTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.disease='active';
}]);

commonApp.controller('DiseaseControlTipsListController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
    setTimeout(function(){
        if(!$location.search().id){}
        else{
            var searchId="#"+$location.search().id;
            var offset = $(searchId).offset().top-75;
            $("html, body").animate({ scrollTop: offset }, "slow");
        }
    }, 300);

    $scope.focusToIndividualTips=function(id){
        var searchId="#"+id;
        var offset = $(searchId).offset().top-75;
        $("html, body").animate({ scrollTop: offset }, "slow");
    };
}]);