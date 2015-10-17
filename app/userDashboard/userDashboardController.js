var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','ngTouch', 'angucomplete-alt']);

userApp.controller('UserDashboardController',function($scope,requestHandler,Flash) {
    $scope.foodSearchResult = [];

    $scope.foodSelected=function(selected){
        requestHandler.postRequest("user/getFoodDetailByUser/",{"foodid":selected.description.foodid}).then(function (response) {
            $scope.userSelectedFoodDetails=response.data.Food_Data;

            $.each($scope.userSelectedFoodDetails, function(index,value){
                value.foodImagePath=value.foodImagePath+"200x200.jpg";
            });

            console.log($scope.userSelectedFoodDetails);

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.getFoodDiary=function(){

        requestHandler.postRequest("user/getFoodbyDate/",{"addeddate":"17/10/2015"}).then(function (response) {
            $scope.userFoodDiaryDataAll=response.data.MyFoodData;
            $scope.getBreakfast();
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.getBreakfast=function(){
           $scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.BreakFast;
        $.each($scope.userFoodDiaryData, function(index,value){
            value.foodImagePath=value.foodImagePath.substring(value.foodImagePath.indexOf("/") + 14,value.foodImagePath.length)+"200x200.jpg";
        });

    }


    $scope.getBrunch=function(){
        $scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Brunch;
        $.each($scope.userFoodDiaryData, function(index,value){
            value.foodImagePath=value.foodImagePath.substring(value.foodImagePath.indexOf("/") + 14,value.foodImagePath.length)+"200x200.jpg";
        });

    }

     $scope.inputChanged = function(str) {
        requestHandler.postRequest("searchFoodListByUser/",{"foodname":str}).then(function (response) {
           $scope.searchResponse=response.data.Food_Data;

            $.each($scope.searchResponse, function(index,value){
                value.foodImagePath=value.foodImagePath+"150x150.jpg";
            });

            $scope.foodSearchResult=$scope.searchResponse;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    }

    $scope.getFoodDiary();

});
