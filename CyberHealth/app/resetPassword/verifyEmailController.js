/**
 * Created by Deemsys on 9/19/2015.
 */
var verifyEmailApp = angular.module('verifyEmailApp', ['ngRoute','requestModule','flash','ngAnimate']);

verifyEmailApp.controller('VerifyEmailController',['$scope','requestHandler','Flash','$location','$rootScope','$window','$routeParams',function($scope,requestHandler,Flash,$location,$rootScope,$window,$routeParams){
      function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
    }


    $scope.verifyToken=function(){
        $scope.response=2;
        requestHandler.postRequest("validateEmailToken/",{"emailToken":get("token")}).then(function(response){
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
    //Check Token
    $scope.init=function(){
       $scope.verifyToken();
    };

    $scope.init();
}]);
