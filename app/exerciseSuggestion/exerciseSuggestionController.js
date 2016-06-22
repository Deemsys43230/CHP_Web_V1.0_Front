var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('ExerciseSuggestionController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
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

    // Search exercise suggestion
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });

    $scope.doApproveExerciseSuggestion=function(id){
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
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
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
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

}]);

adminApp.controller('ExerciseSuggestionDetailViewController',['$scope','requestHandler','Flash','$routeParams','$sce',function($scope,requestHandler,Flash,$routeParams,$sce) {
    $scope.activeClass = {exercisesuggestion: 'active'};

    //Exercise Detail View Suggestion
    $scope.doViewSuggestion= function () {
        $scope.loaded = true;
        requestHandler.postRequest("admin/getExerciseSuggestionDetail/",{'suggestionid':$routeParams.id}).then(function(response){
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.Exercise_Suggestion_Data.user_imageurl+"?decache="+Math.random());
            $scope.viewExerciseSuggestionDetails = response.data.Exercise_Suggestion_Data;
            //View the image in ng-src for view testimonials

            $scope.loaded = false;
            $scope.paginationLoad = true;

        },  function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doViewSuggestion();

}]);