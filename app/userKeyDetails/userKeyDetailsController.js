var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule']);
userApp.controller('UserKeyDetailsController',['$scope','requestHandler','$rootScope','$location',function($scope,requestHandler,$rootScope,$location) {

    $rootScope.isMenuShow=2;
    //to redirect to particular controller
    $scope.menuUrlChange=function(tabid){
        $rootScope.isMenuClicked=tabid;
        $location.path('/dashboard');
    };

    $scope.doGetUserKeyDetails=function() {
        requestHandler.getRequest("user/keydetails/", "").then(function (response) {
            $scope.userKeyDetails=response.data;
            console.log($scope.userKeyDetails.todaysappointments);

        });
    }
    $scope.init=function () {
        $scope.doGetUserKeyDetails();
    }
    $scope.init();

}]);