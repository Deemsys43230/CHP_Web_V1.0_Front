/**
 * Created by Deemsys on 9/19/2015.
 */
var verifyEmailApp = angular.module('verifyEmailApp', ['ngRoute','requestModule','flash','ngAnimate']);

verifyEmailApp.controller('VerifyEmailController',['$scope','requestHandler','Flash','$location','$rootScope','$window','$routeParams',function($scope,requestHandler,Flash,$location,$rootScope,$window,$routeParams){

    var queryString = window.location.search;
    var token = queryString.substring(1, queryString.length);
    //Validate Email Account
    $scope.verifyToken=function(){
        requestHandler.postRequest("validateEmailToken//",{"emailToken":token}).then(function(response){
            if(response.data.Response_status==1){
                $scope.response=1;
            }
            else if(response.data.Response_status==2){
                $scope.response=2;
            }
            else if(response.data.Response_status==3){
                $scope.response=3;
            }
        });

    };

    $scope.init=function(){
       $scope.verifyToken();
    };

    $scope.init();
}]);
