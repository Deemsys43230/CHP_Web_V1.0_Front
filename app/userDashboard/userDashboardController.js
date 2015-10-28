var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','ngTouch', 'angucomplete-alt','ngPercentDisplay','userDashboardServiceModule','ngDatepicker','angular-svg-round-progress']);

userApp.controller('UserDashboardController',function($scope,requestHandler,Flash,UserDashboardService,$interval,roundProgressService) {
    $scope.foodSearchResult = [];
    $scope.userFood={};
    $scope.userFood.sessionid=1;
    $scope.servings=0;
    $scope.current=$scope.caloriesIntake=0;
    $scope.max=100;
    $scope.exerciseSearchResult = [];
    $scope.userExercise={};
    $scope.caloriesSpent=0;
    $scope.workoutvalue=0;

    //Modal Popup to add user food
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

    //Modal Popup to add user exercise
    $scope.doUserAddExercise=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal-add-exercise").fadeIn(600);
            $(".user_register").show();

        });
        $(".modal_close").click(function(){
            $(".user_register").hide();
            $("#modal-add-exercise").hide();
            $("#lean_overlay").hide();
           $scope.resetexercisedata();
        });

        $("#lean_overlay").click(function(){
            $(".user_register").hide();
            $("#modal-add-exercise").hide();
            $("#lean_overlay").hide();
            $scope.resetexercisedata();
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
                $scope.current=$scope.caloriesIntake=result.measureid.calories;


                $scope.doUserAddFood();
           });

        });
    };

    //Calories caluclation for food
    $scope.doCalculateCalories=function(){

        $scope.currentColor =   '#66E066';

        if($scope.userFood.servings==0){
            $scope.current=$scope.caloriesIntake=0;
        }
        if(!$scope.userFood.servings>0){
            $scope.current=$scope.caloriesIntake=0;
        }
        else{
            $scope.current=$scope.caloriesIntake=$scope.userFood.measure.calories*$scope.userFood.servings;
            $scope.current=$scope.current.toFixed(2);
            if(($scope.current.length-3)>2) $scope.max=$scope.max+((String($scope.current|0).slice(0, -2))*100);
            else $scope.max=100;
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

    //Search Function for food
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

    // Insert suggest exercise
    $scope.doAddSuggestExercise=function(){
        var insertSuggestedExercisePromise=UserDashboardService.doAddSuggestedExercise($scope.exerciseSuggest);

        insertSuggestedExercisePromise.then(function(result){
            successMessage(Flash,"Thanks&nbsp;for&nbsp;the&nbspsuggestion!!");
           $scope.resetexercisedata();
        },function(){
            errorMessage(Flash, "Please try again later!");
        })

    };

    //Search Function for exercise
    $scope.inputChangedExercise = function(searchStr) {
        var userExerciseDiaryDetailPromise=UserDashboardService.searchExercise(searchStr);
        userExerciseDiaryDetailPromise.then(function(result){
            $scope.exerciseSearchResult=result;
        });
    };

    //On Select search exercise function
    $scope.exerciseSelected=function(selected){
        $scope.isNew=true;
        $scope.title= "Add Exercise";
        var getExerciseDetailPromise=UserDashboardService.doGetSelectedExerciseDetails(selected.description.exerciseid);
        getExerciseDetailPromise.then(function(result){
            $scope.userSelectedExerciseDetails=result;
           //   console.log($scope.userSelectedExerciseDetails);
            $scope.doUserAddExercise ();
        });
    };

    //On load Exercise Diary
    $scope.loadExerciseDiary=function(selectedDate){
        // alert(selectedDate);
        var userExerciseDiaryDetailPromise=UserDashboardService.getExerciseDiary(selectedDate);
        userExerciseDiaryDetailPromise.then(function(result){
            $scope.userExerciseDiaryDataAll=result;
        });
    };

    //Insert User Exercise
    $scope.doInsertUserExercise=function(){
        //Set values according to the api calls
        //alert(selectedDate);
        $scope.userExercise.exerciseid=$scope.userSelectedExerciseDetails.exerciseid;
        $scope.userExercise.levelid=$scope.userExercise.levelid.levelid;
        $scope.userExercise.date=selectedDate;
        $scope.userExercise.workoutvalue=parseInt($scope.userExercise.workoutvalue);

        var exerciseInsertPromise=UserDashboardService.doInsertUserExercise($scope.userExercise);
        exerciseInsertPromise.then(function(){
            $scope.loadExerciseDiary(selectedDate);
        });

    };

    //Delete User Exercise
    $scope.doDeleteUserExercise= function (userExerciseId) {
        var exerciseDeletePromise=UserDashboardService.doDeleteUserExercise(userExerciseId);
        exerciseDeletePromise.then(function(){
            $scope.loadExerciseDiary(selectedDate);
        });
    };

    //Calories caluclation for exercose
    $scope.doCalculateCaloriesExercise=function(){

        $scope.currentColor =   '#FF5C33';

        if($scope.userExercise.workoutvalue==0){
            $scope.current=$scope.caloriesSpent=0;
        }
        if(!$scope.userExercise.workoutvalue>0){
            $scope.current=$scope.caloriesSpent=0;
        }
        else{
            $scope.current=$scope.caloriesSpent=$scope.userExercise.levelid.calories*$scope.userExercise.workoutvalue;
            $scope.current=$scope.current.toFixed(2);
            if(($scope.current.length-3)>2) $scope.max=$scope.max+((String($scope.current|0).slice(0, -2))*100);
            else $scope.max=100;
        }

    };

    //Clear suggest food model values
    $scope.resetdata=function(){
        $scope.foodSuggest={};
        $scope.foodSuggestForm.$setPristine();
        $scope.userFood.measure="";
        $scope.userFood.servings=[];
        $scope.FoodAddForm.$setPristine();
        $scope.current=$scope.caloriesIntake=0;
        $scope.max = 100;
    };

    //Clear suggest exercise model values
    $scope.resetexercisedata=function(){
        $scope.exerciseSuggest={};
        $scope.exerciseSuggestForm.$setPristine();
        $scope.userExercise.levelid="";
        $scope.userExercise.workoutvalue="";
        $scope.ExerciseAddForm.$setPristine();
        $scope.current=$scope.caloriesSpent=0;
        $scope.max = 100;
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

    $scope.loadFoodAndExercise=function(selectedDate){
        $scope.loadFoodDiary(selectedDate);
        $scope.loadExerciseDiary(selectedDate);
    };

    $scope.loadFoodAndExercise(selectedDate);


    //circle round
    $scope.offset =         0;
    $scope.timerCurrent =   0;
    $scope.uploadCurrent =  0;
    $scope.stroke =         12;
    $scope.radius =         70;
    $scope.isSemi =         false;
    $scope.rounded =        false;
    $scope.responsive =     false;
    $scope.clockwise =      true;
    $scope.bgColor =        '#eaeaea';
    $scope.duration =       1000;
    $scope.currentAnimation = 'easeOutCubic';

    $scope.animations = [];

    angular.forEach(roundProgressService.animations, function(value, key){
        $scope.animations.push(key);
    });

    $scope.getStyle = function(){
        var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

        return {
            'top': $scope.isSemi ? 'auto' : '50%',
            'bottom': $scope.isSemi ? '5%' : 'auto',
            'left': '50%',
            'transform': transform,
            '-moz-transform': transform,
            '-webkit-transform': transform,
            'font-size': $scope.radius/3.5 + 'px'
        };
    };

    $scope.getColor = function(){
        return $scope.gradient ? 'url(#gradient)' : $scope.currentColor;
    };

    var getPadded = function(val){
        return val < 10 ? ('0' + val) : val;
    };

});

// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
