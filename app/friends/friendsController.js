
var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','friendsServiceModule']);

userApp.controller('FriendsController',function($scope,requestHandler,Flash,FriendsService){

    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.myFriendsList.length/$scope.pageSize);
    };
    $scope.numberOfData=function(){
        return $scope.myFriendsList.length;
    };



    //On Select frequent foods
    $scope.myFriends=function(){

        var getMyFriendsPromise=FriendsService.doGetMyFriends();
        getMyFriendsPromise.then(function(result){
            $scope.myFriendsList=result;
        });
    };

    $scope.requestedFriends=function(){

        var getRequestedFriendsPromise=FriendsService.doGetFriendRequest();
        getRequestedFriendsPromise.then(function(result){
            $scope.requestedFriendsList=result;
        });
    };

    $scope.searchFriends=function(name){

        var getSearchFriendsPromise=FriendsService.doSearchFriends(name);
        getSearchFriendsPromise.then(function(result){
            $scope.searchFriendsList=result;
        });
    };

    //Onload
    $scope.initialLoad=function(){
        $scope.myFriends();
        $scope.requestedFriends();
        $scope.searchFriends('A');
    };

    $scope.initialLoad();

});

userApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);



