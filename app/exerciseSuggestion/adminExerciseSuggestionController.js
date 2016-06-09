var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('AdminExerciseSuggestionController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass = {adminexercisesuggestion: 'active'};



}]);