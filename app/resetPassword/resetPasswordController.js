/**
 * Created by Deemsys on 9/19/2015.
 */
var passwordApp = angular.module('passwordApp', ['requestModule','flash','ngAnimate']);

passwordApp.controller('ResetPasswordController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location){

    $scope.resetPassword=function(){

    };

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