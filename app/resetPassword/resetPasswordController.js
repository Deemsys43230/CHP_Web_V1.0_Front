/**
 * Created by Deemsys on 9/19/2015.
 */
var passwordApp = angular.module('passwordApp', ['ngRoute','requestModule','flash','ngAnimate']);

passwordApp.controller('ResetPasswordController',['$scope','requestHandler','Flash','$location','$rootScope','$window','$routeParams',function($scope,requestHandler,Flash,$location,$rootScope,$window,$routeParams){


    $scope.resetPassword=function(){
       console.log($scope.reset.newPassword);

        requestHandler.postRequest("resetNewPassword/",{"passwordToken":token,"password":$scope.reset.newPassword}).then(function(response){
            if(response.data.Response_status==1){
                //$window.location.href="../../#/home/password";
                $scope.showSuccessDiv=true;
                $scope.newpassword="";
                $scope.confirmPassword="";
                $scope.resetPasswordForm.$setPristine();
            }
        });

    };
    var queryString = window.location.search;
    var token = queryString.substring(1, queryString.length);
    $scope.verifyToken=function(){


        requestHandler.postRequest("checkToken/",{"passwordToken":token}).then(function(response){
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
       $scope.showSuccessDiv=false;
    };

    $scope.init();
}]);


// Compare Confirm Password
passwordApp.directive('compareTo',function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {

                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});
