var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('ExerciseSuggestionController',function($scope,requestHandler,Flash) {
    $scope.activeClass = {exercisesuggestion: 'active'};

    $scope.doGetAllExerciseSuggestion = function () {
        $scope.loaded = true;

        requestHandler.getRequest("admin/getExerciseSuggestion/", "").then(function (response) {
            $scope.exerciseSuggestionList = response.data.Exercise_Suggestion_Data;
            $scope.loaded = false;
            $scope.paginationLoad = true;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doApproveExerciseSuggestion=function(id){
        $scope.loaded=true;
        requestHandler.postRequest("admin/approveExerciseSuggestion/",{'suggestionid':id}).then(function(response){
            $scope.loaded=false;
            $scope.doGetAllExerciseSuggestion();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doRejectExerciseSuggestion=function(id){
        $scope.loaded=true;
        requestHandler.postRequest("admin/rejectExerciseSuggestion/",{'suggestionid':id}).then(function(response){
            $scope.loaded=false;
            $scope.doGetAllExerciseSuggestion();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //Initial Load
    $scope.init = function () {
        $scope.paginationLoad = false;
        $scope.doGetAllExerciseSuggestion();
    };

});