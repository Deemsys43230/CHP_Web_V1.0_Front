var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','ngTouch', 'angucomplete-alt','ngPercentDisplay']);

userApp.controller('UserDashboardController',function($scope,requestHandler,Flash) {
    $scope.foodSearchResult = [];
    $scope.userFood={};
    $scope.userFood.sessionid=1;
    $scope.servings=0;
    $scope.caloriesIntake=0;

    $scope.doUserAddFood=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal-add-food").fadeIn(600);
            $(".user_register").show();
        });
        $(".modal_close").click(function(){
            $(".user_register").hide();
            $("#modal-add-food").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".user_register").hide();
            $("#modal-add-food").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.doGetSelectedFoodDetails= function (foodid) {
        requestHandler.postRequest("user/getFoodDetailByUser/",{"foodid":foodid}).then(function (response) {
            $scope.userSelectedFoodDetails=response.data.Food_Data;

            $.each($scope.userSelectedFoodDetails, function(index,value){
                value.foodImagePath=value.foodImagePath+"200x200.jpg";
            });

            console.log($scope.userSelectedFoodDetails);

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };


    $scope.foodSelected=function(selected){
        $scope.doGetSelectedFoodDetails(selected.description.foodid);
        $scope.doUserAddFood();
    };


    $scope.doCalculateCalories=function(measureid){
        if($scope.userFood.servings==0){
            $scope.caloriesIntake=0;
        }else{
            $scope.caloriesIntake=$scope.userFood.measure.calories*$scope.userFood.servings;
        }

    };


    $scope.doInsertUserFood=function(){

        $scope.userFood.foodid=$scope.userSelectedFoodDetails.foodid;
        $scope.userFood.measureid=$scope.userFood.measure.measureid;
        $scope.userFood.addeddate="17/10/2015";

        $scope.userFood.servings=parseInt($scope.userFood.servings);

        requestHandler.postRequest("user/usersaveFoodtoDiary/",$scope.userFood).then(function (response) {
            $scope.getFoodDiary();
        }, function () {
            errorMessage(Flash, "Please try again later!");
        });
    };

    $scope.deleteUserFood= function (userFoodId) {
        alert(userFoodId);
        requestHandler.postRequest("user/deleteUserFood/",{"userfoodid":userFoodId}).then(function (response) {
            $scope.getFoodDiary();
        }, function () {
            errorMessage(Flash, "Please try again later!");
        });
    };

    $scope.getFoodDiary=function(){

        requestHandler.postRequest("user/getFoodbyDate/",{"addeddate":"17/10/2015"}).then(function (response) {
            $scope.userFoodDiaryDataAll=response.data.MyFoodData;

            switch($scope.userFood.sessionid){
                case 1:$scope.getBreakfast();
                    break;
                case 2:$scope.getBrunch();
                    break;
                case 3:$scope.getLunch();
                    break;
                case 4:$scope.getSnacks();
                    break;
                case 5:$scope.getDinner();
                    break;
                default : break;

            }


        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.getBreakfast=function(){
        $scope.userFood.sessionid=1;
        $scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.BreakFast;
    };

    $scope.getBrunch=function(){
        $scope.userFood.sessionid=2;
        $scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Brunch;
    };

    $scope.getLunch=function(){
        $scope.userFood.sessionid=3;
        $scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Lunch;
    };

    $scope.getSnacks=function(){
        $scope.userFood.sessionid=4;
        $scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Evening;
    };

    $scope.getDinner=function(){
        $scope.userFood.sessionid=5;
        $scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Dinner;
    };

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
    };

    $scope.getFoodDiary();

});
