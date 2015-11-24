
var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','friendsServiceModule']);

userApp.controller('FriendsController',function($scope,requestHandler,Flash,FriendsService){

    //Initialize search
    $scope.friendsearch="";

    //My Friends Pagination starts
    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.myFriendsList.length/$scope.pageSize);
    };
    //My Friends Pagination ends

    //Requested Friends Pagination starts
    $scope.currentPage1 = 0;
    $scope.pageSize1 = 8;
    $scope.numberOfPages1=function(){
        return Math.ceil($scope.requestedFriendsList.length/$scope.pageSize1);
    };
    //Requested Friends Pagination ends


    $scope.myFriends=function(){
        $scope.loaded=true;
        var getMyFriendsPromise=FriendsService.doGetMyFriends();
        getMyFriendsPromise.then(function(result){
            $scope.myFriendsList=result;
            $scope.loaded=false;
        });
    };

    $scope.requestedFriends=function(){

        var getRequestedFriendsPromise=FriendsService.doGetFriendRequest();
        getRequestedFriendsPromise.then(function(result){
            $scope.requestedFriendsList=result;
        });
    };

    $scope.searchFriends=function(){
        var getSearchFriendsPromise=FriendsService.doSearchFriends($scope.friendsearch);
        getSearchFriendsPromise.then(function(result){
            $scope.searchFriendsList=result;
        });
    };

    $scope.inviteFriends=function(id){
        var inviteFriendsPromise = FriendsService.doInviteFriends(id);
        inviteFriendsPromise.then(function(result){
            if(result.data.Response_status ==1){
                successMessage(Flash,"Request&nbsp;Sent");
                $scope.searchFriends('');
                $scope.initialLoad();
            }
           else if(result.data.Response_status == 0){
                errorMessage(Flash,"Already Request Sent");
            }
        })
    };

    $scope.acceptFriends=function(id){
        var acceptFriendsPromise = FriendsService.doAcceptFriends(id);
        acceptFriendsPromise.then(function(result){
            if(result.data.Response_status ==1){
                successMessage(Flash,"Request&nbsp;Accepted");
                $scope.initialLoad();
            }
            else if(result.data.Response_status == 0){
                errorMessage(Flash,"No Friends found");
            }
        })
    };

    $scope.denyFriends=function(id){
        var denyFriendsPromise = FriendsService.doDenyFriends(id);
        denyFriendsPromise.then(function(result){
            if(result.data.Response_status ==1){
                successMessage(Flash,"Request&nbsp;Rejected");
                $scope.initialLoad();
            }
            else if(result.data.Response_status == 0){
                errorMessage(Flash,"No friends found");
            }
        })
    };

    //Onload
    $scope.initialLoad=function(){
        $scope.myFriends();
        $scope.requestedFriends();
        $scope.searchFriends();
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



