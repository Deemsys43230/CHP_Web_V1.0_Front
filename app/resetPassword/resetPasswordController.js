/**
 * Created by Deemsys on 9/19/2015.
 */
var commonApp = angular.module('commonApp', ['requestModule','flash','ngAnimate']);

commonApp.controller('ResetPasswordController',['$scope','requestHandler','Flash','$location','$rootScope',function($scope,requestHandler,Flash,$location,$rootScope){

    console.log($rootScope.emailId);
    $scope.resetPassword=function(){

    };

}]);

/*
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
});*/
