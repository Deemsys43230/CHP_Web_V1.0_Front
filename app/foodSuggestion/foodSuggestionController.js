var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('FoodSuggestionController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
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

    // Search food suggestion
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });

    $scope.doApproveFoodSuggestion=function(id){
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
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
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
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

}]);

adminApp.controller('FoodSuggestionViewController',['$scope','requestHandler','Flash','$routeParams','$sce',function($scope,requestHandler,Flash,$routeParams,$sce) {
    $scope.activeClass = {suggestion: 'active'};

    //Exercise Detail View Suggestion
    $scope.doViewFoodSuggestion= function () {
        $scope.loaded = true;
        requestHandler.postRequest("admin/getFoodSuggestionDetail/",{'suggestionid':$routeParams.id}).then(function(response){
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.Food_Suggestion_Data.user_imageurl+"?decache="+Math.random());
            $scope.viewFoodSuggestionDetails = response.data.Food_Suggestion_Data;
            //View the image in ng-src for view testimonials

            $scope.loaded = false;
            $scope.paginationLoad = true;

        },  function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doViewFoodSuggestion();

}]);