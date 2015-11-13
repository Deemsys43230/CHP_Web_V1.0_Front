
var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

userApp.controller('FriendsController',function($scope,requestHandler,Flash){

    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.data = [];
    $scope.numberOfPages=function(){
        return Math.ceil($scope.data.length/$scope.pageSize);
    };
    $scope.numberOfData=function(){
        return $scope.data.length;
    };
    for (var i=0; i<45; i++) {
        $scope.data.push("Item "+i);
    }

});

userApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});



