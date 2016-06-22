/**
 * Created by Deemsys on 9/19/2015.
 */
var passwordApp = angular.module('passwordApp', ['requestModule','flash','ngAnimate']);

passwordApp.controller('ResetPasswordController',['$scope','requestHandler','Flash','$location','$rootScope','$window',function($scope,requestHandler,Flash,$location,$rootScope,$window){


    $scope.resetPassword=function(){
        $scope.reset.newpassword;
        $window.location.href="../../#/home/password";
        $scope.newpassword="";
        $scope.confirmPassword="";
        $scope.resetPasswordForm.$setPristine();
    };

    $scope.verifyToken=function(){
        $scope.response=1;
    };

    $scope.init=function(){
       $scope.verifyToken();
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
