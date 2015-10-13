var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('FoodSuggestionController',function($scope,requestHandler,Flash) {
    $scope.activeClass = {suggestion: 'active'};

    $scope.doGetAllFoodSuggestion = function () {
        $scope.loaded = true;

        requestHandler.getRequest("admin/getFoodSuggestion/", "").then(function (response) {
            $scope.foodSuggestionList = response.data.Food_Suggestion_Data;
            $scope.loaded = false;
            $scope.paginationLoad = true;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doApproveFoodSuggestion=function(id){
        $scope.loaded=true;
        requestHandler.postRequest("admin/approveFoodSuggestion/",{'suggestionid':id}).then(function(response){
            $scope.loaded=false;
            $scope.doGetAllFoodSuggestion();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doRejectFoodSuggestion=function(id){
        $scope.loaded=true;
        requestHandler.postRequest("admin/rejectFoodSuggestion/",{'suggestionid':id}).then(function(response){
            $scope.loaded=false;
            $scope.doGetAllFoodSuggestion();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //Initial Load
    $scope.init = function () {
        $scope.paginationLoad = false;
        $scope.doGetAllFoodSuggestion();
    };

});