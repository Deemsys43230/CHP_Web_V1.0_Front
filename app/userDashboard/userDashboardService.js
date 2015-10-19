/**
 * Created by Deemsys on 10/19/2015.
 */
var adminApp=angular.module('userDashboardServiceModule',['requestModule']);

adminApp.factory("UserDashboardService",function(requestHandler){

    var userDashboardServiceObj={};

    //Get Categories
    userDashboardServiceObj.doGetCategories= function () {
        return requestHandler.getRequest("admin/getFoodCategoryByStatus","").then(function(response){
            return response.data.Food_Category;
        },function(response){
            alert("Not able to pull Food Measure List");
        })
    };
    //End Get Food Categories

    //Get Food by date
    userDashboardServiceObj.getFoodDiary=function(date){
        return requestHandler.postRequest("user/getFoodbyDate/",{"addeddate":date}).then(function (response) {
            return response.data.MyFoodData;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    userDashboardServiceObj.searchFood=function(searchStr){
        return requestHandler.postRequest("searchFoodListByUser/",{"foodname":searchStr}).then(function (response) {
            var searchResponse=response.data.Food_Data;
            $.each(searchResponse, function(index,value){
                value.foodImagePath=value.foodImagePath+"150x150.jpg";
            });
            return searchResponse;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    }

    //On Select Food From list
    userDashboardServiceObj.doGetSelectedFoodDetails= function (foodid) {
        return requestHandler.postRequest("user/getFoodDetailByUser/",{"foodid":foodid}).then(function (response) {
            var userSelectedFoodDetails=response.data.Food_Data;
            $.each(userSelectedFoodDetails, function(index,value){
                value.foodImagePath=value.foodImagePath+"200x200.jpg";
            });
            return userSelectedFoodDetails;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    //Insert User Food to diary
    userDashboardServiceObj.doInsertUserFood=function(userFood){
        return requestHandler.postRequest("user/usersaveFoodtoDiary/",userFood).then(function (response) {
            return response;
        }, function () {
            errorMessage(Flash, "Please try again later!");
        });
    };

    //Insert User Food to diary
    userDashboardServiceObj.doDeleteUserFood=function(userFoodId){
        return requestHandler.postRequest("user/deleteUserFood/",{"userfoodid":userFoodId}).then(function (response) {
            return response;
        }, function () {
            errorMessage(Flash, "Please try again later!");
        });
    };

    return userDashboardServiceObj;

});








