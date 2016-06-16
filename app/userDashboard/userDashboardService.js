/**
 * Created by Deemsys on 10/19/2015.
 */
var adminApp=angular.module('userDashboardServiceModule',['requestModule']);

adminApp.factory("UserDashboardService",['requestHandler',function(requestHandler){

    var userDashboardServiceObj={};

    //Get Categories
    userDashboardServiceObj.doGetCategories= function () {
        return requestHandler.getRequest("admin/getFoodCategoryByStatus","").then(function(response){
            return response.data.Food_Category;
        },function(response){
            console.log("Not able to pull Food Measure List");
        })
    };
    //End Get Food Categories

    //Get Food by date
    userDashboardServiceObj.getFoodDiary=function(date){
        return requestHandler.postRequest("user/getFoodbyDate/",{"addeddate":date}).then(function (response) {
            return response.data.MyFoodData;
        }, function () {
            console.log("Please try again later!")
        });
    };

    userDashboardServiceObj.searchFoodByAdmin=function(searchStr,session){

        return requestHandler.postRequest("searchFoodListByAdmin/",{"foodname":searchStr,"foodsession":session}).then(function (response) {
            var searchResponse=response.data.Food_Data;
            return searchResponse.slice(0,50);
        }, function () {
            console.log("Please try again later!")
        });
    };

    userDashboardServiceObj.searchFood=function(searchStr,session){

        return requestHandler.postRequest("searchFoodListByUser/",{"foodname":searchStr,"foodsession":session}).then(function (response) {
            var searchResponse=response.data.Food_Data;
            return searchResponse.slice(0,50);
        }, function () {
            console.log("Please try again later!")
        });
    };

    //On Select Food From list
    userDashboardServiceObj.doGetSelectedFoodDetails= function (foodid) {
        return requestHandler.postRequest("user/getFoodDetailByUser/",{"foodid":foodid}).then(function (response) {
            var userSelectedFoodDetails=response.data.Food_Data;
            $.each(userSelectedFoodDetails, function(index,value){
                value.foodImagePath=value.foodImagePath+"50x50.jpg";
            });
            return userSelectedFoodDetails;
        }, function () {
            console.log("Please try again later!")
        });
    };

    //Insert User Food to diary
    userDashboardServiceObj.doInsertUserFood=function(userFood){
        return requestHandler.postRequest("user/usersaveFoodtoDiary/",userFood).then(function (response) {
            return response;
        }, function () {
            console.log("Please try again later!");
        });
    };

    //Update User Food to diary
    userDashboardServiceObj.doUpdateUserFood=function(userFood){
        return requestHandler.putRequest("user/editUserFood/",userFood).then(function (response) {
            return response;
        }, function () {
            console.log("Please try again later!");
        });
    };


    //Delete User Food to diary
    userDashboardServiceObj.doDeleteUserFood=function(userFoodId){
        return requestHandler.postRequest("user/deleteUserFood/",{"userfoodid":userFoodId}).then(function (response) {
            return response;
        }, function () {
            console.log("Please try again later!");
        });
    };

    //Get User Food Details
    userDashboardServiceObj.doGetUserFoodDetails=function(userFoodId){

        return requestHandler.postRequest("user/getFoodDetails/",{"userfoodid":userFoodId}).then(function (response) {
            return response.data.FoodDetails;
        }, function () {
            console.log("Please try again later!");
        });
    };

    //Get User Details
    userDashboardServiceObj.doGetUserDetails=function(){
        return requestHandler.getRequest("getUserId/","").then(function(response){
            userProfile=response.data.User_Profile;

            //For Age calculation
            var today = new Date();
            if(userProfile.dob == null){
                userProfile.age = "-";
            }
            if(userProfile.dob !=null){
                //Age Calculation starts
                var birthDate = userProfile.dob;
                var birthdatearray = birthDate.split("/");
                var newdate = birthdatearray[1] + '/' + birthdatearray[0] + '/' + birthdatearray[2];
                birthDate = new Date(newdate);
                 var age = today.getFullYear() - birthDate.getFullYear();
                 var m = today.getMonth() - birthDate.getMonth();
                 if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                     age--;
                  }
                //Age caluclation ends
            userProfile.age = age;
            }
            return userProfile;
        });
    };

    //Get User Demography Details
    userDashboardServiceObj.doGetDemographyDetails=function(){
        return requestHandler.getRequest("user/getDemography/","").then(function(response) {
            return response.data.Demography_Data;
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
    };

    //Add Suggested Exercise
    userDashboardServiceObj.doAddSuggestedExercise=function(exerciseSuggest){
        return requestHandler.postRequest("user/insertExerciseSuggestion/",exerciseSuggest).then(function (response) {
            return response;
        });
    };

    userDashboardServiceObj.searchExerciseByAdmin=function(searchStr){
        return requestHandler.postRequest("admin/searchExercisebyAdmin/",{"exercisename":searchStr}).then(function (response) {
            var exerciseSearchResponse=response.data.exercisesData;
            return exerciseSearchResponse.slice(0,50);
        }, function () {
            console.log("Please try again later!")
        });
    };

    userDashboardServiceObj.searchExercise=function(searchStr){
        return requestHandler.postRequest("user/searchExercisebyUser/",{"exercisename":searchStr}).then(function (response) {
            var exerciseSearchResponse=response.data.exercisesData;
            return exerciseSearchResponse.slice(0,50);
        }, function () {
            console.log("Please try again later!")
        });
    };

    //On Select Exercise From list
    userDashboardServiceObj.doGetSelectedExerciseDetails= function (exerciseid) {
        return requestHandler.postRequest("user/getExerciseDetailByuser/",{"exerciseid":exerciseid}).then(function (response) {
            var userSelectedExerciseDetails=response.data.ExerciseDetail;

            $.each(userSelectedExerciseDetails, function(index,value){
                value.imageurl=value.imageurl+"/50x50.jpg";
            });

            return userSelectedExerciseDetails;
        }, function () {
            console.log("Please try again later!")
        });
    };

    //Get Exercise by date
    userDashboardServiceObj.getExerciseDiary=function(date){
        return requestHandler.postRequest("user/getListOfExerciseByDate/",{"date":date}).then(function (response) {
            return response.data.ExerciseData;
        }, function () {
            console.log("Please try again later!")
        });
    };

    //Insert User Exercise to diary
    userDashboardServiceObj.doInsertUserExercise=function(userExercise){
        return requestHandler.postRequest("user/insertUserExercise/",userExercise).then(function (response) {
            return response;
        }, function () {
            console.log("Please try again later!");
        });
    };

    //Delete User Exercise to diary
    userDashboardServiceObj.doDeleteUserExercise=function(userExerciseId){
        return requestHandler.postRequest("user/deleteUserExercise/",{"userexercisemapid":userExerciseId}).then(function (response) {
            return response;
        }, function () {
            console.log("Please try again later!");
        });
    };

    //Get User exercise Details
    userDashboardServiceObj.doGetUserExerciseDetails=function(userExerciseId){

        return requestHandler.postRequest("user/getSavedExerciseDetailByUUID/",{"userexercisemapid":userExerciseId}).then(function (response) {
            return response.data.ExerciseData;
        }, function () {
            console.log("Please try again later!");
        });
    };

    //Update User Exercise to diary
    userDashboardServiceObj.doUpdateUserExercise=function(userExercise){
        return requestHandler.postRequest("user/updateUserExerciseByUUID/",userExercise).then(function (response) {
            return response;
        }, function () {
            console.log("Please try again later!");
        });
    };

    //Frequently Added Exercise
    userDashboardServiceObj.doGetFrequentlyUsedExercise=function(){
        return requestHandler.getRequest("user/userFrequentlyaskedExercise/","").then(function(response) {
            return response.data.ExerciseDataList;
        });
    };

    //Frequently Added Exercise
    userDashboardServiceObj.doGetWeightLogDetails=function(date){
        return requestHandler.postRequest("user/getWeightLogByDate/",{"date":date}).then(function(response) {
            return response.data;
        });
    };

    //Get Coach Details
    userDashboardServiceObj.getCoachIndividualDetail=function(coachadvice){
        var coachadvicedetails = coachadvice;
        $.each(coachadvicedetails,function(index,value){
            requestHandler.getRequest("getCoachIndividualDetailbyUser/"+value.coachid, "").then(function(response){
                value.coachname = response.data.getCoachIndividualDetail.name;
                value.coachimage = response.data.getCoachIndividualDetail.imageurl;
            });
        });
        return coachadvicedetails;
    };

    userDashboardServiceObj.doGetAchievedWeight=function(date){
        var achievedWeightPromise = userDashboardServiceObj.doGetWeightLogDetails(date);
        return achievedWeightPromise.then(function(result){
            if(result.Response_status==0){
                var loopDate="";
                var dateValue = date.slice(0,2);
                if(dateValue=='01'){
                    dateValue='31';
                    var monthValue = date.slice(3,5);
                    if(monthValue=='01'){
                        monthValue='12';
                        var yearValue=date.slice(6,10);
                        yearValue = yearValue-1;
                        loopDate=dateValue+"/"+monthValue+"/"+yearValue;
                    }
                    else{
                        monthValue = monthValue-1;
                        loopDate=dateValue+"/"+monthValue+"/"+date.slice(6,10);
                    }
                }
                else{
                    dateValue =dateValue-1;
                    loopDate=dateValue+"/"+date.slice(3,5)+"/"+date.slice(6,10);
                }
                return userDashboardServiceObj.doGetAchievedWeight(loopDate);
            }
            else{
                return result.Weight_logs.weight;
            }
        });

        /*var temp = $filter('date')(new Date("10/02/2015"), "dd/mm/yyyy");
        temp.setDate(temp.getDate()-1);
        alert(temp);*/
    };


    return userDashboardServiceObj;

}]);








