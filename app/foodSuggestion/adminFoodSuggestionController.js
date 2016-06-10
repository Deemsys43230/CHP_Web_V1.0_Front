var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('AdminFoodSuggestionController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass = {adminfoodsuggestion: 'active'};

    $scope.getSuggestedFood=function(){

        $scope.foodSuggestedList="";
        /* requestHandler.getRequest("admin/getExerciseSuggestion/", "").then(function (response) {
         $scope.exerciseSuggestionList = response.data.Exercise_Suggestion_Data;
         $scope.loaded = false;
         $scope.paginationLoad = true;
         }, function () {
         errorMessage(Flash, "Please try again later!")
         });*/
    };

    $scope.addSuggestFood=function(){

    };

    $scope.removeSuggestFood=function(id){

        /*$scope.loaded=true;
         requestHandler.postRequest("admin/rejectExerciseSuggestion/",{'suggestionid':id}).then(function(response){
         $scope.loaded=false;
         $scope.doGetAllExerciseSuggestion();
         successMessage(Flash,"Successfully Updated");

         },function(){
         errorMessage(Flash,"Please try again later!")
         });*/
    };

    $scope.init=function(){
        $scope.getSuggestedFood();
    };

    $scope.init();
}]);

