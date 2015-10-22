var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','ngTouch', 'angucomplete-alt','ngPercentDisplay','userDashboardServiceModule','ngDatepicker']);

userApp.controller('UserDashboardController',function($scope,requestHandler,Flash,UserDashboardService) {
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
           $scope.resetdata();
        });

        $("#lean_overlay").click(function(){
            $(".user_register").hide();
            $("#modal-add-food").hide();
            $("#lean_overlay").hide();
           $scope.resetdata();
        });
    };

    //On Select frequent foods
    $scope.frequentFood=function(foodid){
        $scope.isNew=true;
        $scope.title= "Add Food";
       // alert(foodid);
        var getFoodDetailPromise=UserDashboardService.doGetSelectedFoodDetails(foodid);
        getFoodDetailPromise.then(function(result){
            $scope.userSelectedFoodDetails=result;
            $scope.doUserAddFood();
        });
    };

    //On Select search function
    $scope.foodSelected=function(selected){
        $scope.isNew=true;
        $scope.title= "Add Food";
        var getFoodDetailPromise=UserDashboardService.doGetSelectedFoodDetails(selected.description.foodid);
        getFoodDetailPromise.then(function(result){
            $scope.userSelectedFoodDetails=result;
            $scope.doUserAddFood();
        });
    };

    //On Select edit foods
    $scope.doEditUserFood=function(foodid,userfoodid){
        $scope.isNew=false;
        $scope.title= "Edit Food";
        var getFoodDetailForEditPromise=UserDashboardService.doGetSelectedFoodDetails(foodid);
        getFoodDetailForEditPromise.then(function(result){
            $scope.userSelectedFoodDetails=result;
            //console.log(result);
            var getUserFoodDetailsPromise=UserDashboardService.doGetUserFoodDetails(userfoodid);
            getUserFoodDetailsPromise.then(function(result){
               // console.log(result);
                $scope.userFood.userfoodid=result.userfoodid;
                $scope.userFood.foodid=result.foodid;
                $scope.userFood.measure=result.measureid;
                $scope.userFood.servings=parseInt(result.measureid.servings);
                $scope.caloriesIntake=result.measureid.calories;

                $scope.doUserAddFood();
           });

        });
    };


    $scope.doCalculateCalories=function(measureid){

        if($scope.userFood.servings==0){
            $scope.caloriesIntake=0;
        }
        if(!$scope.userFood.servings>0){
            $scope.caloriesIntake=0;
        }
        else{
            $scope.caloriesIntake=$scope.userFood.measure.calories*$scope.userFood.servings;
        }

    };

    //Insert User Food
    $scope.doInsertUserFood=function(){
        //Set values according to the api calls
        $scope.userFood.foodid=$scope.userSelectedFoodDetails.foodid;
        $scope.userFood.measureid=$scope.userFood.measure.measureid;
        $scope.userFood.addeddate=selectedDate;
        $scope.userFood.servings=parseInt($scope.userFood.servings);

        var foodInsertPromise=UserDashboardService.doInsertUserFood($scope.userFood);
        foodInsertPromise.then(function(){
            $scope.loadFoodDiary(selectedDate);
        });

};

    //Update User Food
    $scope.doUpdateUserFood=function(){
        //Set values according to the api calls
        $scope.userFood.userfoodid= $scope.userFood.userfoodid;
        $scope.userFood.foodid= $scope.userFood.foodid;
        $scope.userFood.measureid=$scope.userFood.measure.measureid;
        $scope.userFood.servings=parseInt($scope.userFood.servings);

        var foodInsertPromise=UserDashboardService.doUpdateUserFood($scope.userFood);
        foodInsertPromise.then(function(){
            $scope.loadFoodDiary(selectedDate);
        });

    };

    //Delete User Food
    $scope.doDeleteUserFood= function (userFoodId) {
        var foodDeletePromise=UserDashboardService.doDeleteUserFood(userFoodId);
        foodDeletePromise.then(function(){
            $scope.loadFoodDiary(selectedDate);
        });
    };

    //On load Food Diary
    $scope.loadFoodDiary=function(selectedDate){
       // alert(selectedDate);
        var userFoodDiaryDetailPromise=UserDashboardService.getFoodDiary(selectedDate);
        userFoodDiaryDetailPromise.then(function(result){
            $scope.userFoodDiaryDataAll=result;
            $scope.loadSessionDetails();
        });
    };


    //Load Details Based on session
    $scope.loadSessionDetails=function(){
        switch(parseInt($scope.userFood.sessionid)){
            case 1:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.BreakFast;
                break;
            case 2:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Brunch;
                break;
            case 3:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Lunch;
                break;
            case 4:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Evening;
                break;
            case 5: $scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Dinner;
                break;
            default :break;
        }
    };

    //Search Function
     $scope.inputChanged = function(searchStr) {
         var userFoodDiaryDetailPromise=UserDashboardService.searchFood(searchStr);
         userFoodDiaryDetailPromise.then(function(result){
             $scope.foodSearchResult=result;
         });
    };

    // To get User Basic details
    var userDetailPromise=UserDashboardService.doGetUserDetails();
    userDetailPromise.then(function(result){
        $scope.userProfile=result;
    });


    //TO get user demography details
    var userDemographyPromise=UserDashboardService.doGetDemographyDetails();
    userDemographyPromise.then(function(result){
        $scope.demography = result;
    });


    //To get frequently asked foods
    var frequentFoodPromise=UserDashboardService.doGetFrequentlyAdded();
    frequentFoodPromise.then(function(result){
        $scope.frequentFoodList =result;
    });


    // Insert suggest food
    $scope.doAddSuggestFood=function(){

        var insertSuggestedFoodPromise=UserDashboardService.doAddSuggestedFood($scope.foodSuggest);

        insertSuggestedFoodPromise.then(function(result){
            successMessage(Flash,"Thanks&nbsp;for&nbsp;the&nbspsuggestion!!");
           $scope.resetdata();
        },function(){
            errorMessage(Flash, "Please try again later!");
        })

    };

    //Clear suggest food model values
    $scope.resetdata=function(){
        $scope.foodSuggest={};
        $scope.foodSuggestForm.$setPristine();
        $scope.userFood.measure="";
        $scope.userFood.servings=[];
        $scope.FoodAddForm.$setPristine();
        $scope.caloriesIntake=0;
    };

//To Display current date
    var selectedDate = new Date();
    var dd = selectedDate.getDate();
    var mm = selectedDate.getMonth()+1; //January is 0!

    var yyyy = selectedDate.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    var selectedDate = dd+'/'+mm+'/'+yyyy;

    //Initialize

    $scope.loadFoodDiary(selectedDate);

});



// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
