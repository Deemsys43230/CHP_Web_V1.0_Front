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

    //Update User Food to diary
    userDashboardServiceObj.doUpdateUserFood=function(userFood){
        return requestHandler.putRequest("user/editUserFood/",userFood).then(function (response) {
            return response;
        }, function () {
            errorMessage(Flash, "Please try again later!");
        });
    };


    //Delete User Food to diary
    userDashboardServiceObj.doDeleteUserFood=function(userFoodId){
        return requestHandler.postRequest("user/deleteUserFood/",{"userfoodid":userFoodId}).then(function (response) {
            return response;
        }, function () {
            errorMessage(Flash, "Please try again later!");
        });
    };

    //Get User Food Details
    userDashboardServiceObj.doGetUserFoodDetails=function(userFoodId){

        console.log(userFoodId);
        return requestHandler.postRequest("user/getFoodDetails/",{"userfoodid":userFoodId}).then(function (response) {
            return response.data.FoodDetails;
        }, function () {
            errorMessage(Flash, "Please try again later!");
        });
    };

    //Get User Details
    userDashboardServiceObj.doGetUserDetails=function(){
        return requestHandler.getRequest("getUserId/","").then(function(response){
            userProfile=response.data.User_Profile;
            userProfile.imageurl=userProfile.imageurl.substring(userProfile.imageurl.indexOf("/") + 14, userProfile.imageurl.length)
            userProfile.imageurl=userProfile.imageurl+"?decache="+Math.random();

            //For Age calculation
            var today = new Date();
            if(userProfile.dob == null){
                userProfile.age = "-";
            }
            if(userProfile.dob !=null){
            var birthDate = new Date(userProfile.dob);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            userProfile.age = age;
            }
            return userProfile;
        });
    };

    //Get User Demography Details
    userDashboardServiceObj.doGetDemographyDetails=function(){
        return requestHandler.getRequest("user/getDemography/","").then(function(response) {
            return response.data.Demography_Data[0];
        });
    };

    //Frequently Added Foods
    userDashboardServiceObj.doGetFrequentlyAdded=function(){
        return requestHandler.getRequest("user/userFrequentlyaskedFoods/","").then(function(response) {
            return response.data.FoodDataList;
        });
    };

    //Add Suggested Food
    userDashboardServiceObj.doAddSuggestedFood=function(foodSuggest){
        return requestHandler.postRequest("user/insertFoodSuggestion/",foodSuggest).then(function (response) {
            return response;
        });
    }


 return userDashboardServiceObj;

});








