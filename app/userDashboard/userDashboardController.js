var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','ngTouch', 'angucomplete-alt','ngPercentDisplay','userDashboardServiceModule','ui.bootstrap','angular-svg-round-progress']);

userApp.controller('UserDashboardController',function($scope,$window,requestHandler,Flash,UserDashboardService,$interval,roundProgressService,limitToFilter) {
    $scope.foodSearchResult = [];
    $scope.userFood={};
    $scope.userFood.sessionid=1;
    $scope.graphSessionId='1';
    $scope.servings=0;
    $scope.current=$scope.caloriesIntake=0;
    $scope.max=$scope.gainGraphMax=100;
    $scope.exerciseSearchResult = [];
    $scope.userExercise={};
    $scope.caloriesSpent=0;
    $scope.workoutvalue=0;
    $window.singlePicker = false;
    $window.minimumDate = new Date();
    $scope.weightUpdateText="Update Weight";
    $scope.graphs=1;
    $scope.historyReport=0;
    $scope.historyType=1;

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
        $scope.loaded=true;
        var getFoodDetailPromise=UserDashboardService.doGetSelectedFoodDetails(foodid);
        getFoodDetailPromise.then(function(result){
            $scope.userSelectedFoodDetails=result;
            $scope.loaded=false;
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
    var originalmeasure="";
    var originalservings="";
    //On Select edit foods
    $scope.doEditUserFood=function(foodid,userfoodid){

        $scope.isNew=false;
        $scope.title= "Edit Food";
        $scope.loaded=true;
        var getFoodDetailForEditPromise=UserDashboardService.doGetSelectedFoodDetails(foodid);
        getFoodDetailForEditPromise.then(function(result){
            $scope.userSelectedFoodDetails=result;
            var getUserFoodDetailsPromise=UserDashboardService.doGetUserFoodDetails(userfoodid);
            getUserFoodDetailsPromise.then(function(result){

                $scope.userFood.userfoodid=result.userfoodid;
                $scope.userFood.foodid=result.foodid;
                //  $scope.userFood.measure=result.measureid;
                $.each($scope.userSelectedFoodDetails.measureid, function(index,value) {
                    if(value.measureid == result.measureid.measureid){
                        $scope.userFood.measure = value;
                        originalmeasure = angular.copy(value);
                    }
                });
                $scope.userFood.servings=parseInt(result.measureid.servings);
                originalservings = angular.copy(result.measureid.servings);
                $scope.current=$scope.caloriesIntake=result.measureid.calories;
                $scope.current=$scope.current.toFixed(2);
                if(($scope.current.length-3)>2) $scope.max=100+((String($scope.current|0).slice(0, -2))*100);
                else $scope.max=100;
                $scope.loaded=false;
                $scope.doUserAddFood();
            });
        });
    };

    $scope.isCleanFood=function(){
        return angular.equals(originalmeasure, $scope.userFood.measure)&& angular.equals(originalservings, $scope.userFood.servings);
    };
    //Calories caluclation for food
    $scope.doCalculateCalories=function(){
        if($scope.userFood.servings==0){
            $scope.current=$scope.caloriesIntake=0;
        }
        if(!$scope.userFood.servings>0){
            $scope.current=$scope.caloriesIntake=0;
        }
        else{
            $scope.current=$scope.caloriesIntake=$scope.userFood.measure.calories*$scope.userFood.servings;
            $scope.current=$scope.current.toFixed(2);
            if(($scope.current.length-3)>2) $scope.max=100+((String($scope.current|0).slice(0, -2))*100);
            else $scope.max=100;
        }
    };

    //Insert User Food
    $scope.doInsertUserFood=function(){
        //Set values according to the api calls
        $scope.userFood.foodid=$scope.userSelectedFoodDetails.foodid;
        $scope.userFood.measureid=$scope.userFood.measure.measureid;
        if($scope.selectedDate==selectedDate){
            $scope.userFood.addeddate=$scope.selectedDate;
        }
        else
        {
            $scope.userFood.addeddate=$scope.selectedDate.format("dd/mm/yyyy");
        }

        $scope.userFood.servings=parseInt($scope.userFood.servings);

        var foodInsertPromise=UserDashboardService.doInsertUserFood($scope.userFood);
        foodInsertPromise.then(function(){
            $scope.loadFoodDiary( $scope.userFood.addeddate);
            $scope.doGetIntakeBruntByDate( $scope.userFood.addeddate);
            $scope.goGetDailyIntakeGraph($scope.userFood.addeddate);
            $scope.goGetSessionGraph($scope.storedSessionId);
            $scope.doGetHistoryReport();
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
            if($scope.selectedDate==selectedDate){
                $scope.loadFoodDiary($scope.selectedDate);
                $scope.doGetIntakeBruntByDate($scope.selectedDate);
                $scope.goGetDailyIntakeGraph($scope.selectedDate);
                $scope.goGetSessionGraph($scope.storedSessionId);
            }
            else
            {
                $scope.loadFoodDiary($scope.selectedDate.format("dd/mm/yyyy"));
                $scope.doGetIntakeBruntByDate($scope.selectedDate.format("dd/mm/yyyy"));
                $scope.goGetDailyIntakeGraph($scope.selectedDate.format("dd/mm/yyyy"));
                $scope.goGetSessionGraph($scope.storedSessionId);
            }
            $scope.doGetHistoryReport();
        });

    };

    //Delete User Food
    $scope.doDeleteUserFood= function (userFoodId) {
        $scope.loaded=true;
        var foodDeletePromise=UserDashboardService.doDeleteUserFood(userFoodId);
        foodDeletePromise.then(function(){
            if($scope.selectedDate==selectedDate){
                $scope.loadFoodDiary($scope.selectedDate);
                $scope.doGetIntakeBruntByDate($scope.selectedDate);
                $scope.goGetDailyIntakeGraph($scope.selectedDate);
                $scope.goGetSessionGraph($scope.storedSessionId);
            }
            else{
                $scope.loadFoodDiary($scope.selectedDate.format("dd/mm/yyyy"));
                $scope.doGetIntakeBruntByDate($scope.selectedDate.format("dd/mm/yyyy"));
                $scope.goGetDailyIntakeGraph($scope.selectedDate.format("dd/mm/yyyy"));
                $scope.goGetSessionGraph($scope.storedSessionId);
            }
            $scope.doGetHistoryReport();
        });
    };

    //On load Food Diary
    $scope.loadFoodDiary=function(selectedDate){
        $scope.loaded=true;
        var userFoodDiaryDetailPromise=UserDashboardService.getFoodDiary(selectedDate);
        userFoodDiaryDetailPromise.then(function(result){
            $scope.userFoodDiaryDataAll=result;
            $scope.loadSessionDetails();
            $scope.loadSessionFood();
            $scope.loaded=false;
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

        requestHandler.postRequest("user/searchFoodnamebyUser/",{"foodname":$scope.foodSuggest.foodname}).then(function(response){
           if(response.data.Response_status==0){
               var insertSuggestedFoodPromise=UserDashboardService.doAddSuggestedFood($scope.foodSuggest);

               insertSuggestedFoodPromise.then(function(result){
                   successMessage(Flash,"Thanks&nbsp;for&nbsp;the&nbspsuggestion!!");
                   $scope.resetdata();
               },function(){
                   errorMessage(Flash, "Please try again later!");
               });
           }
            else if(response.data.Response_status==1){
               errorMessage(Flash,"Food&nbsp;already&nbsp;exists");
               $scope.resetdata();
           }
        });

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

    //On Select frequent exercise
    $scope.frequentExercise=function(exerciseid){
        $scope.isNew=true;
        $scope.title= "Add Exercise";
        $scope.loaded=true;
        var getExerciseDetailPromise=UserDashboardService.doGetSelectedExerciseDetails(exerciseid);
        getExerciseDetailPromise.then(function(result){
            $scope.userSelectedExerciseDetails=result;
            $scope.loaded=false;
            $scope.doUserAddExercise();
        });
    };

    //On Select search exercise function
    $scope.exerciseSelected=function(selected){
        $scope.isNew=true;
        $scope.title= "Add Exercise";
        var getExerciseDetailPromise=UserDashboardService.doGetSelectedExerciseDetails(selected.description.exerciseid);
        getExerciseDetailPromise.then(function(result){
            $scope.userSelectedExerciseDetails=result;
            $scope.doUserAddExercise ();
        });
    };

    //On load Exercise Diary
    $scope.loadExerciseDiary=function(selectedDate){
        $scope.loaded=true;
        var userExerciseDiaryDetailPromise=UserDashboardService.getExerciseDiary(selectedDate);
        userExerciseDiaryDetailPromise.then(function(result){
            $scope.userExerciseDiaryDataAll=result;
            $scope.loaded=false;
        });
    };
    //Insert User Exercise
    $scope.doInsertUserExercise=function(){
        //Set values according to the api calls
        //alert(selectedDate);
        $scope.userExercise.exerciseid=$scope.userSelectedExerciseDetails.exerciseid;
        $scope.userExercise.levelid=$scope.userExercise.levelid.levelid;

        if($scope.selectedDate==selectedDate){
            $scope.userExercise.date=$scope.selectedDate;
        }
        else
        {
            $scope.userExercise.date=$scope.selectedDate.format("dd/mm/yyyy");
        }
         $scope.userExercise.workoutvalue=parseInt($scope.userExercise.workoutvalue);

        var exerciseInsertPromise=UserDashboardService.doInsertUserExercise($scope.userExercise);
        exerciseInsertPromise.then(function(){
            $scope.loadExerciseDiary($scope.userExercise.date);
            $scope.doGetIntakeBruntByDate($scope.userExercise.date);
            $scope.doGetHistoryReport();
        });

    };

    //Delete User Exercise
    $scope.doDeleteUserExercise= function (userExerciseId) {
        $scope.loaded=true;
        var exerciseDeletePromise=UserDashboardService.doDeleteUserExercise(userExerciseId);
        exerciseDeletePromise.then(function(){
            if($scope.selectedDate==selectedDate){
                $scope.loadExerciseDiary($scope.selectedDate);
                $scope.doGetIntakeBruntByDate($scope.selectedDate);
            }
            else{
                $scope.loadExerciseDiary($scope.selectedDate.format("dd/mm/yyyy"));
                $scope.doGetIntakeBruntByDate($scope.selectedDate.format("dd/mm/yyyy"));
            }
            $scope.doGetHistoryReport();
        });
    };
    var originallevel="";
    var originaltiming="";
    //On Select edit exercise
    $scope.doEditUserExercise=function(exerciseid,userexercisemapid){

        $scope.isNew=false;
        $scope.title= "Edit Exercise";
        $scope.loaded=true;
        var getExerciseDetailForEditPromise=UserDashboardService.doGetSelectedExerciseDetails(exerciseid);
        getExerciseDetailForEditPromise.then(function(result){


            $scope.userSelectedExerciseDetails=result;
            var getUserExerciseDetailsPromise=UserDashboardService.doGetUserExerciseDetails(userexercisemapid);
            getUserExerciseDetailsPromise.then(function(result){
                $scope.userExercise.userexercisemapid=userexercisemapid;
                $scope.userExercise.exerciseid=exerciseid;
                //$scope.userExercise.levelid=result.User_exercise_data.Level;
                $.each($scope.userSelectedExerciseDetails.type.levels, function(index,value) {
                    if(value.levelid == result.User_exercise_data.Level.levelid){
                        $scope.userExercise.levelid = value;
                        originallevel=angular.copy(value);
                    }
                });
                $scope.userExercise.workoutvalue=parseInt(result.User_exercise_data.Level.workoutvalue);
                originaltiming = parseInt(result.User_exercise_data.Level.workoutvalue);
                $scope.current=$scope.caloriesSpent=result.User_exercise_data.Level.calories;
                $scope.current=$scope.current.toFixed(2);
                if(($scope.current.length-3)>2) $scope.max=100+((String($scope.current|0).slice(0, -2))*100);
                else $scope.max=100;
                $scope.loaded=false;
                $scope.doUserAddExercise();
            });

        });
    };

    $scope.isCleanExercise=function(){
        return angular.equals(originallevel, $scope.userExercise.levelid)&& angular.equals(originaltiming, $scope.userExercise.workoutvalue);
    };

    //Update User Exercise
    $scope.doUpdateUserExercise=function(){
        //Set values according to the api calls
        if($scope.userExercise.date!=null){
            delete $scope.userExercise.date;
        }

        $scope.userExercise.userexercisemapid= $scope.userExercise.userexercisemapid;
        $scope.userExercise.exerciseid= $scope.userExercise.exerciseid;
        $scope.userExercise.levelid=$scope.userExercise.levelid.levelid;
        $scope.userExercise.workoutvalue=parseInt($scope.userExercise.workoutvalue);

        var exerciseInsertPromise=UserDashboardService.doUpdateUserExercise($scope.userExercise);
        exerciseInsertPromise.then(function(){
            if($scope.selectedDate==selectedDate){
                $scope.loadExerciseDiary($scope.selectedDate);
                $scope.doGetIntakeBruntByDate($scope.selectedDate);
            }
            else
            {
                $scope.loadExerciseDiary($scope.selectedDate.format("dd/mm/yyyy"));
                $scope.doGetIntakeBruntByDate($scope.selectedDate.format("dd/mm/yyyy"));
            }
            $scope.doGetHistoryReport();
        });

    };


    //To get frequently asked exercise
    var frequentExercisePromise=UserDashboardService.doGetFrequentlyUsedExercise();
    frequentExercisePromise.then(function(result){
        $scope.frequentExerciseList =result;
    });

    //Calories caluclation for exercose
    $scope.doCalculateCaloriesExercise=function(){
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
        $scope.userSelectedFoodDetails={};

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
        $scope.userSelectedExerciseDetails={};

    };

    //Weight and Set Goal
    $scope.goal = {
        status: 'set-goal'
    };

    $scope.graph = {
        status: 'goal'
    };

    $scope.viewGoal=function(){
        $scope.doGetWeightGoal();
        $scope.graph = {
            status: 'goal'
        };
    };

    $scope.cancelUpdate=function(){
        $scope.goal = {
            status: 'view-goal'
        };
    };

    $scope.doGetWeightGoal=function(){
        requestHandler.getRequest("user/getWeightGoal/","").then(function(response){
            $scope.weightlog=$scope.demography.weight;
            $scope.originalWeight=$scope.demography.weight;
            if(response.data.Response_status==0){
                $scope.updateGoal=0;
                $scope.targetText='Period';
                $window.singlePicker = false;
                $window.minimumDate = new Date();
            }
            else{
                $scope.goalDetails=response.data.Weight_Goal;
                $scope.updateGoal=1;

                var dateCompare = $scope.goalDetails.startdate.slice(6,10)+','+$scope.goalDetails.startdate.slice(3,5)+','+$scope.goalDetails.startdate.slice(0,2);
                var date1 = selectedDate.slice(6,10)+','+selectedDate.slice(3,5)+','+selectedDate.slice(0,2);
                var date2 = $scope.goalDetails.enddate.slice(6,10)+','+$scope.goalDetails.enddate.slice(3,5)+','+$scope.goalDetails.enddate.slice(0,2);

                var date1_ms;
                if (new Date(dateCompare).getTime() >= new Date(date1).getTime()) {
                    date1_ms = new Date(dateCompare).getTime();
                }
                else{
                    date1_ms = new Date(date1).getTime();
                }

                // The number of milliseconds in one day
                var ONE_DAY = 1000 * 60 * 60 * 24;

                // Convert both dates to milliseconds
                var date2_ms = new Date(date2).getTime();

                // Calculate the difference in milliseconds
                var difference_ms = Math.abs(date1_ms - date2_ms);

                // Convert back to days
                $scope.remainingDates = Math.round(difference_ms/ONE_DAY);

                $window.currentweight = $scope.demography.weight;
                $window.targetweight = $scope.goalDetails.targetweight;
                $scope.goal = {
                    status: 'view-goal'
                };
            }
        });

    };

    $scope.setGoal=function(){
        $scope.setGoalDetails={};
        $scope.setGoalDetails.startdate=document.getElementById("start").value;
        $scope.setGoalDetails.enddate=document.getElementById("end").value;
        $scope.setGoalDetails.targetweight=parseInt(document.getElementById("target").value);
        if($scope.setGoalDetails.startdate==''){
            $scope.setGoalDetails.startdate = $scope.setGoalDetails.enddate = selectedDate;
        }
        if($scope.demography.weight!=""){
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#goal-confirmation").fadeIn(600);
                $(".common_model").show();

            });
            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#goal-confirmation").hide();
                $("#lean_overlay").hide();
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#goal-confirmation").hide();
                $("#lean_overlay").hide();
            });
        }
    };

    $scope.setGoalConfirmation=function(){
        $scope.setGoalDetails.initialweight=parseInt($scope.demography.weight);

        requestHandler.postRequest("user/insertWeightGoal/",$scope.setGoalDetails).then(function(response){
            $scope.doGetWeightGoal();
        },function(){
            errorMessage(Flash, "Please try again later!");
        });
    };


    //TO Insert weight Goal Log
    $scope.doInsertOrUpdateWeightLog=function(){
        $scope.weightLogDate=$("#weight-log-date").val();
        $scope.weightUpdateText="Updating...";
        $scope.spinner=true;

        requestHandler.getRequest("user/getWeightGoal/","").then(function(response){

            /*if(response.data.Response_status==0){
                requestHandler.postRequest("user/weightlogInsertorUpdate/",{"date":$scope.weightLogDate,"weight":$scope.weightlog}).then(function(response){
                    $scope.spinner=false;
                    $scope.weightUpdateText="Update Weight";
                }, function () {
                    errorMessage(Flash, "Please try again later!")
                });
            }
            else{
                var currentWeight=document.getElementById('weightLog').value;
                $scope.weightDiff = (currentWeight - $scope.originalWeight).toFixed(2);
                if($scope.weightDiff==0.00){
                    $scope.weightUpdated=0;
                }
                else if($scope.weightDiff>0){
                    $scope.weightIncrease=0;
                    $scope.weightUpdated=1;
                }
                else{
                    $scope.weightDiff = $scope.weightDiff*(-1);
                    $scope.weightIncrease=1;
                    $scope.weightUpdated=1;
                }
*/
                requestHandler.postRequest("user/weightlogInsertorUpdate/",{"date":$scope.weightLogDate,"weight":$scope.weightlog}).then(function(response){

                    successMessage(Flash, "Successfully Updated!");
                    $scope.weightlog=response.data.Weight_Goal.weight;
                    $scope.spinner=false;
                    $scope.weightUpdateText="Update Weight";
                    $window.currentweight=response.data.Weight_Goal.weight;
                   // $scope.doGetWeightLogGraph();
                }, function () {
                    errorMessage(Flash, "Please try again later!")
                });
            /*}*/
        });
    };



    $scope.doGetWeightLogGraph=function(){
        $scope.graph = {
            status: 'goal-graph'
        };
        var monthNames= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        requestHandler.postRequest("user/getWeightLogGraph/",{"startdate":$scope.goalDetails.startdate.toString(),"enddate":$scope.goalDetails.enddate.toString()}).then(function(response){
            $scope.weightlogGraph=response.data.Weight_logs;
            var weightLogs = [];
            $.each($scope.weightlogGraph, function(index,value) {
                var weightLog = [];
                var date = value.date.split("/");
                weightLog.push(monthNames[(date[1]-1)]+' '+date[0]);
                weightLog.push(value.weight);
                weightLogs.push(weightLog);
            });
            $scope.weightGraphValue = weightLogs;
            $scope.weightGraph = limitToFilter($scope.weightGraphValue, 30);
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.deteteGoal=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#goal-delete-confirmation").fadeIn(600);
            $(".common_model").show();

        });
        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#goal-delete-confirmation").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#goal-delete-confirmation").hide();
            $("#lean_overlay").hide();
        });
    };

    //To Delete Goal
    $scope.doDeleteGoal=function(){
        requestHandler.deleteRequest("user/deleteWeightGoal/","").then(function(response){
            $scope.weight='';
            $scope.updateGoal=0;
            $window.goalStartDate = $window.goalEndDate = selectedDate;
            $window.minimumDate = new Date();
            $scope.targetText='Period';
            $window.singlePicker = false;
            $scope.goal = {
                status: 'set-goal'
            };

        },function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    //To Update Goal Details
    $scope.updateGoalDetails=function(){
        $scope.targetText = 'End Date';
        $window.singlePicker = true;
        var startformat = $scope.goalDetails.startdate.slice(6,10)+','+$scope.goalDetails.startdate.slice(3,5)+','+$scope.goalDetails.startdate.slice(0,2);
        var currentformat = selectedDate.slice(6,10)+','+selectedDate.slice(3,5)+','+selectedDate.slice(0,2);
        $window.goalStartDate = $scope.goalDetails.startdate;
        $window.goalEndDate = $scope.goalDetails.enddate;
        $window.goalEndDate = $scope.goalDetails.enddate;
        $scope.weight = $scope.goalDetails.targetweight;
        if (new Date(startformat).getTime() >= new Date(currentformat).getTime()) {
            $window.minimumDate = $scope.goalDetails.startdate;
        }
        else{
            $window.minimumDate = new Date();
        }
        $scope.goal = {
            status: 'set-goal'
        };
    };

    //To Do Update Goal
    $scope.doUpdateGoal=function(){
        $scope.setGoalDetails={};
        $scope.setGoalDetails.startdate=$scope.goalDetails.startdate;
        if(document.getElementById("start").value==''){
            $scope.setGoalDetails.enddate=$scope.goalDetails.enddate;
        }
        else{
            $scope.setGoalDetails.enddate=document.getElementById("start").value;
        }
        $scope.setGoalDetails.targetweight=parseInt(document.getElementById("target").value);
        $scope.setGoalDetails.initialweight=$scope.goalDetails.initialweight;

        requestHandler.putRequest("user/updateWeightGoal/",$scope.setGoalDetails).then(function(response){
            $scope.doGetWeightGoal();
        },function(){
            errorMessage(Flash, "Please try again later!");
        });
    };

    // Get Calories Brunt And Intake deatils by date
    $scope.doGetIntakeBruntByDate = function(date){
        requestHandler.postRequest("user/getTotalCalorieDetailForDate/",{"date":date}).then(function(response){
            $scope.calorieGraph=response.data.Calorie_Graph;

            if($scope.calorieGraph.intakecalorie=="") $scope.calorieGraph.intakecalorie=0;
            if($scope.calorieGraph.burntcalorie=="") $scope.calorieGraph.burntcalorie=0;

            $scope.currentGain=$scope.calorieGraph.intakecalorie;
            $scope.currentGain=$scope.currentGain.toFixed(2);
            /*if(($scope.currentGain.length-3)>2) $scope.gainGraphMax=100+((String($scope.currentGain|0).slice(0, -2))*100);
            else $scope.gainGraphMax=100;*/

            if($scope.calorieGraph.averagecalorieintake<$scope.calorieGraph.intakecalorie){
                $scope.currentGainColour="red";
            }else $scope.currentGainColour="limegreen";

            $scope.currentSpent=$scope.calorieGraph.burntcalorie;
            $scope.currentSpent=$scope.currentSpent.toFixed(2);
            /*if(($scope.currentSpent.length-3)>2) $scope.spentGraphMax=100+((String($scope.currentSpent|0).slice(0, -2))*100);
            else $scope.spentGraphMax=100;*/
            $scope.currentSpentColour="orange";

            var gainedCalories;
            var spentCalories;
            if($scope.calorieGraph.intakecalorie>$scope.calorieGraph.burntcalorie)
                spentCalories = parseFloat(($scope.calorieGraph.intakecalorie - $scope.calorieGraph.burntcalorie).toFixed(2));
            else spentCalories =0;
            if($scope.calorieGraph.intakecalorie<$scope.calorieGraph.burntcalorie)
                gainedCalories = parseFloat(($scope.calorieGraph.burntcalorie - $scope.calorieGraph.intakecalorie).toFixed(2));
            else gainedCalories =0;
            if($scope.calorieGraph.intakecalorie==$scope.calorieGraph.burntcalorie){
                gainedCalories =0;
                spentCalories =0;
            }

            $('#gainVsSpent').highcharts({

                chart: {
                    type: 'column'
                },

                xAxis: {
                    categories: ['Compare <br/> <small>(calories)</small>']
                },

                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: ''
                    }
                },

                credits:{enabled:false},
                exporting:{enabled:false},
                legend:{enabled:false},
                title:{text:''},

                tooltip: {
                    enabled:true,
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    borderWidth:1,
                    shadow:true,
                    style:{fontSize:'10px',padding:5,zIndex:10000},
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>'
                    }
                },

                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },

                series: [{
                    name: 'Spent',
                    data: [gainedCalories],
                    color: '#eee',
                    stack: 'male'
                },{
                    name: 'Intake',
                    data: [$scope.calorieGraph.intakecalorie],
                    color: 'limegreen',
                    stack: 'male'
                }, {
                    name: 'Gained',
                    color: '#eee',
                    data: [spentCalories],
                    stack: 'female'
                },{
                    name: 'Brunt',
                    data: [$scope.calorieGraph.burntcalorie],
                    color: 'red',
                    stack: 'female'
                }]
            });

        },function(){
            errorMessage(Flash, "Please try again later!");
        });
    };

    $scope.goGetDailyIntakeGraph = function(date){
        requestHandler.postRequest("user/dailyCalorieGraph/",{"date":date}).then(function(response){
            $scope.calorieIntakeGraph=response.data.dailyCalorieGraph;
            if($scope.calorieIntakeGraph.averagefat=="") $scope.calorieIntakeGraph.averagefat=0;
            if($scope.calorieIntakeGraph.fat=="") $scope.calorieIntakeGraph.fat=0;
            if($scope.calorieIntakeGraph.averageprotein=="") $scope.calorieIntakeGraph.averageprotein=0;
            if($scope.calorieIntakeGraph.protein=="") $scope.calorieIntakeGraph.protein=0;
            if($scope.calorieIntakeGraph.averagefibre=="") $scope.calorieIntakeGraph.averagefibre=0;
            if($scope.calorieIntakeGraph.fibre=="") $scope.calorieIntakeGraph.fibre=0;
            if($scope.calorieIntakeGraph.averagecarbo=="") $scope.calorieIntakeGraph.averagecarbo=0;
            if($scope.calorieIntakeGraph.carbo=="") $scope.calorieIntakeGraph.carbo=0;

            $('#dailyIntake').highcharts({
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Protein', 'Fat', 'Carbo', 'Fibre'],
                    labels: {
                        style: {
                            fontSize:'9px',
                            fontWeight:'normal'
                        }
                        /*useHTML: true,
                        formatter: function() {
                            if(this.value == "Protein")
                                return this.value+'<br/><img src="../../images/test.jpg"/>';
                            else if(this.value == "Fat")
                                return this.value+'<br/><img src="../../images/test.jpg"/>';
                            else if(this.value == "Carbo")
                                return this.value+'<br/><img src="../../images/test.jpg"/>';
                            else if(this.value == "Fibre")
                                return this.value+'<br/><img src="http://highcharts.com/demo/gfx/sun.png"/>';
                            else
                                return this.value;
                        }*/
                    }
                },
                tooltip:{
                    enabled:true,
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    borderWidth:1,
                    shadow:true,
                    style:{fontSize:'10px',padding:5,zIndex:10000},
                    formatter:false
                },
                yAxis:{
                    title: {
                        text: null
                    },
                    labels:{
                        style:{
                            fontSize:'10px'
                        }
                    }
                },
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                legend:{enabled:false},
                series: [{
                    type: 'column',
                    showInLegend:false,
                    name:'Unit',
                    data: [
                        {
                            name: 'Protein',
                            color: 'limegreen',
                            y: parseFloat($scope.calorieIntakeGraph.protein)
                        }, {
                            name: 'Fat',
                            color: 'red',
                            y: parseFloat($scope.calorieIntakeGraph.fat)
                        }, {
                            name: 'Carbo',
                            color: 'orange',
                            y: parseFloat($scope.calorieIntakeGraph.carbo)
                        }, {
                            name: 'Fibre',
                            color: '#ffcc00',
                            y: parseFloat($scope.calorieIntakeGraph.fibre)
                        }]
                },  {
                    type: 'spline',
                    name: 'Average',
                    showInLegend:true,
                    data: [
                        parseFloat($scope.calorieIntakeGraph.averageprotein),
                        parseFloat($scope.calorieIntakeGraph.averagefat),
                        parseFloat($scope.calorieIntakeGraph.averagecarbo),
                        parseFloat($scope.calorieIntakeGraph.averagefibre)],
                    marker: {
                        lineWidth: 1,
                        lineColor: Highcharts.getOptions().colors[1],
                        fillColor: 'white'
                    }
                }]
            });

        },function(){
            errorMessage(Flash, "Please try again later!");
        });
    };

    $scope.graphOne=function(){
        $scope.graphs=1;
    };

    $scope.graphTwo=function(){
        $scope.graphs=2;
    };

    $scope.loadSessionFood=function(){
        switch(parseInt($scope.graphSessionId)){
            case 1:$scope.userSessionFoods=$scope.userFoodDiaryDataAll.BreakFast;
                break;
            case 2:$scope.userSessionFoods=$scope.userFoodDiaryDataAll.Brunch;
                break;
            case 3:$scope.userSessionFoods=$scope.userFoodDiaryDataAll.Lunch;
                break;
            case 4:$scope.userSessionFoods=$scope.userFoodDiaryDataAll.Evening;
                break;
            case 5: $scope.userSessionFoods=$scope.userFoodDiaryDataAll.Dinner;
                break;
            default :break;
        }
        $scope.goGetSessionGraph($scope.graphSessionId);
    };

    $scope.goGetSessionGraph = function(id){
        $scope.loaded=true;
        var date;
        if($scope.selectedDate==selectedDate){
            date = $scope.selectedDate;
        }
        else{
            date = $scope.selectedDate.format("dd/mm/yyyy");
        }
        $scope.storedSessionId = id;

        if(!$scope.storedSessionId){}
        else{
            requestHandler.postRequest("user/getDailyCalorieGraphWithSession/",{"date":date,"sessionid":id}).then(function(response){
                $scope.calorieIntakeGraph=response.data.Calorie_Graph;
                $scope.graphResponse=response.data.Response_status;
                if($scope.calorieIntakeGraph.fat=="") $scope.calorieIntakeGraph.fat=0;
                if($scope.calorieIntakeGraph.protein=="") $scope.calorieIntakeGraph.protein=0;
                if($scope.calorieIntakeGraph.fibre=="") $scope.calorieIntakeGraph.fibre=0;
                if($scope.calorieIntakeGraph.carbo=="") $scope.calorieIntakeGraph.carbo=0;

                $scope.totalUnits = $scope.calorieIntakeGraph.fat+$scope.calorieIntakeGraph.protein+$scope.calorieIntakeGraph.fibre+$scope.calorieIntakeGraph.carbo;

                $('#sessionGraph').highcharts({
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['Protein', 'Fat', 'Carbo', 'Fibre'],
                        labels: {
                            useHTML: true,
                             formatter: function() {
                             if(this.value == "Protein")
                             return this.value+'<br/><img src="../../images/i-protein.jpg"/>';
                             else if(this.value == "Fat")
                             return '&nbsp;&nbsp;'+this.value+'&nbsp;&nbsp;'+'<br/><img src="../../images/i-fats.jpg"/>';
                             else if(this.value == "Carbo")
                             return this.value+'<br/><img src="../../images/i-carbs.jpg"/>';
                             else if(this.value == "Fibre")
                             return this.value+'<br/><img src="../../images/i-fibre.jpg"/>';
                             else
                             return this.value;
                             }
                        }
                    },
                    tooltip:{
                        enabled:true,
                        backgroundColor:'rgba(255, 255, 255, 1)',
                        borderWidth:1,
                        shadow:true,
                        style:{fontSize:'10px',padding:5,zIndex:500},
                        formatter:false
                    },
                    yAxis:{
                        title: {
                            text: null
                        },
                        min: 0, max: $scope.totalUnits,
                        labels:{
                            style:{
                                fontSize:'10px'
                            }
                        }
                    },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    legend:{enabled:false},
                    series: [{
                        type: 'column',
                        showInLegend:false,
                        name:'Unit',
                        data: [
                            {
                                name: 'Protein',
                                color: 'limegreen',
                                y: parseFloat($scope.calorieIntakeGraph.protein)
                            }, {
                                name: 'Fat',
                                color: 'red',
                                y: parseFloat($scope.calorieIntakeGraph.fat)
                            }, {
                                name: 'Carbo',
                                color: 'orange',
                                y: parseFloat($scope.calorieIntakeGraph.carbo)
                            }, {
                                name: 'Fibre',
                                color: '#ffcc00',
                                y: parseFloat($scope.calorieIntakeGraph.fibre)
                            }]
                    }]
                });
                $scope.loaded=false;

            },function(){
                errorMessage(Flash, "Please try again later!");
            });
        }
    };

    $scope.doGetCoachAdvices = function(){
        requestHandler.getRequest("user/getCoachAdvicesByUser/", "").then(function(response){
            $scope.coachadvice=response.data.Coach_Advice;

            $.each($scope.coachadvice,function(index,value){
            requestHandler.getRequest("getCoachIndividualDetailbyUser/"+value.coachid, "").then(function(response){

                $scope.usercoachdetails=response.data.getCoachIndividualDetail;
                value.coachname = $scope.usercoachdetails.name;
                value.coachimage = $scope.usercoachdetails.imageurl;
            });

            });


        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.getHistory=function(){
        $scope.historyReport=1;
        if($('#history-start').val()=='') $scope.isHistoryEmpty=1;
        else $scope.isHistoryEmpty=0;
    };

    $scope.otherThanHistory=function(){
        $scope.historyReport=0;
    };

    $scope.setHistoryType=function(id){
        $scope.historyType=id;
        if($('#history-start').val()==''){}
        else $scope.doGetHistoryReport();
    };

    $scope.doGetHistoryReport=function(){
        $scope.isHistoryEmpty=0;
        $scope.loaded=true;
        var startDate;
        var endDate;
        if($('#history-start').val()==''){
            startDate = endDate = selectedDate;
        }
        else{
            startDate = $('#history-start').val();
            endDate = $('#history-end').val();
        }
        var monthNames= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var historyReport = [];
        var titles={};
        if($scope.historyType==1){
            requestHandler.postRequest("user/calorieGraphbyDates/", {"fromdate":startDate,"todate":endDate}).then(function(response){
                $scope.historyRecord=response.data.calorieGraphbyDates;
                $.each($scope.historyRecord, function(index,value) {
                    var history = [];
                    var date = value.date.split("/");
                    history.push(monthNames[(date[1]-1)]+' '+date[0]);
                    history.push(parseFloat(value.calorie));
                    historyReport.push(history);
                });
                titles.title="Calories Intaken Graph ( "+startDate+" - "+endDate+" )";
                titles.name="Calories Gained";
                titles.suffix=" cals";
                titles.yaxis="Calories (cals)";
                titles.color='limegreen';
                $scope.drawHistoryGraph(historyReport,titles);
            });
        }
        else if($scope.historyType==2){
            requestHandler.postRequest("user/getCalorieBurntGraphByDates/", {"fromdate":startDate,"todate":endDate}).then(function(response){
                $scope.historyRecord=response.data.CalorieBurntGraphbyDates;
                $.each($scope.historyRecord, function(index,value) {
                    var history = [];
                    var date = value.date.split("/");
                    history.push(monthNames[(date[1]-1)]+' '+date[0]);
                    history.push(parseFloat(value.calorie));
                    historyReport.push(history);
                });
                titles.title="Calories Brunt Graph ( "+startDate+" - "+endDate+" )";
                titles.name="Calories Burned";
                titles.suffix=" cals";
                titles.yaxis="Calories (cals)";
                titles.color='red';
                $scope.drawHistoryGraph(historyReport,titles);
            });
        }
        else{
            requestHandler.postRequest("user/getExerciseMinutesUsingDates/", {"fromdate":startDate,"todate":endDate}).then(function(response){
                $scope.historyRecord=response.data.ExerciseMinutesUsingDates;
                $.each($scope.historyRecord, function(index,value) {
                    var history = [];
                    var date = value.date.split("/");
                    history.push(monthNames[(date[1]-1)]+' '+date[0]);
                    history.push(parseFloat(value.workoutvalue));
                    historyReport.push(history);
                });
                titles.title="Exercise Minutes Graph ( "+startDate+" - "+endDate+" )";
                titles.name="Exercise Minutes";
                titles.suffix=" mints";
                titles.yaxis="Minutes (mints)";
                titles.color='blue';
                $scope.drawHistoryGraph(historyReport,titles);
            });
        }
    };

    $scope.drawHistoryGraph=function(data,titles){
        $scope.loaded=false;
        $('#historyGraph').highcharts({
            title: {
                text: titles.title
            },
            xAxis: {
                categories: []
            },
            tooltip:{
                enabled:true,
                backgroundColor:'rgba(255, 255, 255, 1)',
                borderWidth:1,
                shadow:true,
                style:{fontSize:'10px',padding:5,zIndex:500},
                formatter:false,
                valueSuffix: titles.suffix
            },
            yAxis: {
                title: {
                    text: titles.yaxis
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color:titles.color
                }]
            },
            colors: [
                titles.color
            ],
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            legend:{enabled:false},
            series: [ {
                name: titles.name,
                data: data
            }]
        });
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
    selectedDate = dd+'/'+mm+'/'+yyyy;
    $scope.weightLogDate = selectedDate;
    $scope.selectedDate = selectedDate;
    $scope.todayDate = selectedDate;
    $window.goalStartDate = $window.goalEndDate = selectedDate;

    //Initialize
    $scope.initialLoadFoodAndExercise=function(){
        if($scope.selectedDate==selectedDate){

            /*alert("1");*/

            $scope.loadFoodDiary($scope.selectedDate);
            $scope.loadExerciseDiary($scope.selectedDate);
            $scope.doGetIntakeBruntByDate($scope.selectedDate);
            $scope.goGetDailyIntakeGraph($scope.selectedDate);
        }
        else{

            /*alert("2");*/

            $scope.loadFoodDiary($scope.selectedDate.format("dd/mm/yyyy"));
            $scope.loadExerciseDiary($scope.selectedDate.format("dd/mm/yyyy"));
            $scope.doGetIntakeBruntByDate($scope.selectedDate.format("dd/mm/yyyy"));
            $scope.goGetDailyIntakeGraph($scope.selectedDate.format("dd/mm/yyyy"));
        }
        $scope.doGetWeightGoal();
        $scope.doGetCoachAdvices();
        $scope.goGetSessionGraph($scope.storedSessionId);
    };

    $scope.initialLoadFoodAndExercise();

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
    $scope.bgColor =        '#ddd';
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
            '-webkit-transform': transform
        };
    };

    var getPadded = function(val){
        return val < 10 ? ('0' + val) : val;
    };

    //Date Picker
    $scope.prevent=function(){
        event.preventDefault();
    };

    /*$scope.dpOpened = {
        opened: false,
        opened1: false
    };

    $scope.open = function ($event,opened) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.dpOpened[opened] = true;
    };*/

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.format = "dd/MM/yyyy";

    var dateFormat = function () {
        var    token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;

            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date;
            if (isNaN(date)) throw SyntaxError("invalid date");

            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var    _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d:    d,
                    dd:   pad(d),
                    ddd:  dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m:    m + 1,
                    mm:   pad(m + 1),
                    mmm:  dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy:   String(y).slice(2),
                    yyyy: y,
                    h:    H % 12 || 12,
                    hh:   pad(H % 12 || 12),
                    H:    H,
                    HH:   pad(H),
                    M:    M,
                    MM:   pad(M),
                    s:    s,
                    ss:   pad(s),
                    l:    pad(L, 3),
                    L:    pad(L > 99 ? Math.round(L / 10) : L),
                    t:    H < 12 ? "a"  : "p",
                    tt:   H < 12 ? "am" : "pm",
                    T:    H < 12 ? "A"  : "P",
                    TT:   H < 12 ? "AM" : "PM",
                    Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();

    // Some common format strings
    dateFormat.masks = {
        "default":      "ddd mmm dd yyyy HH:MM:ss",
        shortDate:      "m/d/yy",
        mediumDate:     "mmm d, yyyy",
        longDate:       "mmmm d, yyyy",
        fullDate:       "dddd, mmmm d, yyyy",
        shortTime:      "h:MM TT",
        mediumTime:     "h:MM:ss TT",
        longTime:       "h:MM:ss TT Z",
        isoDate:        "yyyy-mm-dd",
        isoTime:        "HH:MM:ss",
        isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };

    // For convenience...
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };

}).constant('datepickerPopupConfig', {
    datepickerPopup: "dd/MM/yyyy",
    closeOnDateSelection: true,
    appendToBody: false,
    showButtonBar: false
}).constant('datepickerConfig', {
    formatDay: 'dd',
    formatMonth: 'MMMM',
    formatYear: 'yyyy',
    formatDayHeader: 'EEE',
    formatDayTitle: 'MMMM yyyy',
    formatMonthTitle: 'yyyy',
    datepickerMode: 'day',
    minMode: 'day',
    maxMode: 'year',
    showWeeks: false,
    startingDay: 0,
    yearRange: 20,
    minDate: null,// mm/dd/yyyy
    maxDate: new Date()// mm/dd/yyyy
});

// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

/*userApp.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});*/

// Graph chart
userApp.directive('hcGraph', function () {
    return {
        restrict: 'C',
        replace: true,
        scope: {
            graph: '='
        },
        controller: function ($scope, $element, $attrs) {
        },
        template: '<div id="graph-container" style="margin: 0 auto;height: 300px">not working</div>',
        link: function (scope, element, attrs) {
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'graph-container',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Goal Graph',
                    x: -20 //center
                },
                subtitle: {
                    text: '',
                    x: -20
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: 'Weight (Kgs)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#f8ba01'
                    }]
                },
                tooltip: {
                    valueSuffix: 'Kgs'
                },

                colors: [
                    '#f8ba01'
                ],
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0,
                    x: 80,
                    y: 0
                },
                series: [ {
                    name: 'Weight',
                    data: []
                }],
                exporting: {
                enabled: false
                },
                credits: {
                    enabled: false
                }
            });
            scope.$watch("graph", function (newValue) {
                chart.series[0].setData(newValue, true);
            }, true);

        }
    }
});

// Graph chart
userApp.directive('historyGraph', function () {
    return {
        restrict: 'C',
        replace: true,
        scope: {
            historygraph: '=',
            test:'='
        },
        controller: function ($scope, $element, $attrs) {
        },
        template: '<div id="graph-container" style="height: 400px;width: 67%">not working</div>',
        link: function (scope, element, attrs) {
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'graph-container',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: scope.test,
                    x: -20 //center
                },
                subtitle: {
                    text: '',
                    x: -20
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: 'Weight (Kgs)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#ff0066'
                    }]
                },
                tooltip: {
                    valueSuffix: 'Kgs'
                },

                colors: [
                    '#ff0066'
                ],
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0,
                    x: 80,
                    y: 0
                },
                series: [ {
                    name: 'Weight',
                    data: []
                }],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                }
            });
            scope.$watch("historygraph", function (newValue) {
                chart.series[0].setData(newValue, true);
            }, true);
            scope.$watch("test", function (newValue) {
                chart.title.setData(newValue, true);
            }, true);

        }
    }
});


