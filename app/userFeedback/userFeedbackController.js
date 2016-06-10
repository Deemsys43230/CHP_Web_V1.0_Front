var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','ui.bootstrap']);

adminApp.controller('UserFeedbackController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {

    $scope.getUserFeedBackDetails= function(){

        $scope.userFeedbackList="";
    };

    $scope.removeUserFeedBackDetails=function(){

    };

    $scope.init=function(){
        $scope.getUserFeedBackDetails();
    };

    $scope.init();

}]);