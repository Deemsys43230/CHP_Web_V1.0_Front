
var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','friendsServiceModule']);

userApp.controller('FriendsController',function($scope,requestHandler,Flash,FriendsService){

    //My Friends Pagination starts
    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.myFriendsList.length/$scope.pageSize);
    };
    $scope.numberOfData=function(){
        return $scope.myFriendsList.length;
    };
    //My Friends Pagination ends

    //Requested Friends Pagination starts
    $scope.currentPage1 = 0;
    $scope.pageSize1 = 8;
    $scope.numberOfPages1=function(){
        return Math.ceil($scope.requestedFriendsList.length/$scope.pageSize1);
    };
    $scope.numberOfData1=function(){
        return $scope.requestedFriendsList.length;
    };
    //Requested Friends Pagination ends


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

    $scope.inviteFriends=function(id){
        var inviteFriendsPromise = FriendsService.doInviteFriends(id);
        inviteFriendsPromise.then(function(result){
            if(result.data.Response_status ==1){
                successMessage(Flash,"Friend&nbsp;Request&nbsp;Sent");
                $scope.searchFriends(name);
            }
           else if(result.data.Response_status = 0){
                errorMessage(Flash,"Already Request Sent");
            }
        })
    }

    //Onload
    $scope.initialLoad=function(){
        $scope.myFriends();
        $scope.requestedFriends();
        $scope.searchFriends('');
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



