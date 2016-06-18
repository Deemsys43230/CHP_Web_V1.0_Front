var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','ngTouch','ngPercentDisplay','userDashboardServiceModule','angular-svg-round-progress','ui.bootstrap','angular-nicescroll']);

userApp.controller('UserDashboardController',function($scope,$window,requestHandler,Flash,UserDashboardService,$interval,roundProgressService,limitToFilter,$timeout) {
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
    $scope.showExercise=0;

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
        $scope.selectedFood="";
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
        $scope.selectedExercise="";
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


    //On Select suggested foods
    $scope.suggestedFoodByAdmin=function(foodid){
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
    $scope.foodSelected=function(){
        $scope.isNew=true;
        $scope.title= "Add Food";
        var getFoodDetailPromise=UserDashboardService.doGetSelectedFoodDetails($scope.selectedFood.foodid);
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
                $scope.userFood.servings=parseFloat(result.measureid.servings);
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
        $scope.userFood.addeddate=document.getElementById("main-start-date").value;
        $scope.userFood.servings=parseFloat($scope.userFood.servings);

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
        $scope.userFood.servings=parseFloat($scope.userFood.servings);
        var foodInsertPromise=UserDashboardService.doUpdateUserFood($scope.userFood);
        foodInsertPromise.then(function(){
            var date = document.getElementById("main-start-date").value;
            $scope.loadFoodDiary(date);
            $scope.doGetIntakeBruntByDate(date);
            $scope.goGetDailyIntakeGraph(date);
            $scope.goGetSessionGraph($scope.storedSessionId);
            $scope.doGetHistoryReport();
        });

    };

    //Delete User Food
    $scope.doDeleteUserFood= function (userFoodId) {
        $scope.loaded=true;
        var foodDeletePromise=UserDashboardService.doDeleteUserFood(userFoodId);
        foodDeletePromise.then(function(){
            var date = document.getElementById("main-start-date").value;
            $scope.loadFoodDiary(date);
            $scope.doGetIntakeBruntByDate(date);
            $scope.goGetDailyIntakeGraph(date);
            $scope.goGetSessionGraph($scope.storedSessionId);
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
        $scope.suggest={};
        $scope.suggest.session = $scope.userFood.sessionid;
        requestHandler.postRequest("user/getUserFoodSuggestions/",$scope.suggest).then(function(response){
            $scope.adminSuggestedFood = response.data.foodSuggestion;
        });
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

       // alert(searchStr.length);
        if(searchStr.length >=3){
            $scope.loadingFoods=true;
            if($scope.foodSearchResult.length==0){

                $scope.loadingFoods=true;
               // alert("if");
            }
            var userFoodDiaryDetailPromise=UserDashboardService.searchFood(searchStr,$scope.userFood.sessionid);
            return userFoodDiaryDetailPromise.then(function(result){
                var foods = [];
                $scope.foodSearchResult=result;
                $scope.loadingFoods=false;
                return $scope.foodSearchResult;
            });
        }
        else{
            $('.dropdown-menu').animate({
                scrollTop: 0
            }, 0);
            return {};
        }

    };

    //TO get user demography details
    $scope.doGetDemograph=function(){
        var userDemographyPromise=UserDashboardService.doGetDemographyDetails();
        userDemographyPromise.then(function(result){
            $scope.demography = result;

            if(!$scope.userProfile){
                var userDetailPromise=UserDashboardService.doGetUserDetails();
                userDetailPromise.then(function(result){
                    $scope.userProfile=result;
                    $scope.userProfileImage=$scope.userProfile.imageurl+"?decache="+Math.random();
                    var dividevalue=2;
                    if($scope.userProfile.gender==1){
                        dividevalue=4;
                    }
                    $scope.idealWeight = ($scope.demography.height - 100 -(($scope.demography.height -150)/dividevalue));

                    if($scope.demography.weight < $scope.idealWeight){
                        $scope.upweight =1;
                        $scope.idealWeightlevel = $scope.demography.weight/$scope.idealWeight;
                        $scope.idealWeightlevel = ($scope.idealWeightlevel*100)/2;
                        $scope.balanceweight = $scope.idealWeight - $scope.demography.weight;
                        $scope.balanceweight = $scope.balanceweight.toFixed(2);
                    }
                    else if($scope.demography.weight > $scope.idealWeight){
                        $scope.upweight =0;
                        $scope.idealWeightlevel = $scope.idealWeight/$scope.demography.weight;
                        $scope.idealWeightlevel = 100-($scope.idealWeightlevel*100)/2;
                        $scope.balanceweight =  $scope.demography.weight - $scope.idealWeight ;
                        $scope.balanceweight = $scope.balanceweight.toFixed(2);
                    }else{
                        $scope.upweight =2;
                        $scope.idealWeightlevel = 1;
                        $scope.idealWeightlevel = ($scope.idealWeightlevel*100)/2;
                    }

                    $window.idealWeightlevel = $scope.idealWeightlevel.toFixed(2);
                    setTimeout(viewWeightGraph(),1000);
                });
            }
            else{
                var dividevalue=2;
                if($scope.userProfile.gender==1){
                    dividevalue=4;
                }
                $scope.idealWeight = ($scope.demography.height - 100 -(($scope.demography.height -150)/dividevalue));

                if($scope.demography.weight < $scope.idealWeight){
                    $scope.upweight =1;
                    $scope.idealWeightlevel = $scope.demography.weight/$scope.idealWeight;
                    $scope.idealWeightlevel = ($scope.idealWeightlevel*100)/2;
                    $scope.balanceweight = $scope.idealWeight - $scope.demography.weight;
                    $scope.balanceweight = $scope.balanceweight.toFixed(2);
                }
                else if($scope.demography.weight > $scope.idealWeight){
                    $scope.upweight =0;
                    $scope.idealWeightlevel = $scope.idealWeight/$scope.demography.weight;
                    $scope.idealWeightlevel = 100-($scope.idealWeightlevel*100)/2;
                    $scope.balanceweight =  $scope.demography.weight - $scope.idealWeight ;
                    $scope.balanceweight = $scope.balanceweight.toFixed(2);
                }else{
                    $scope.upweight =2;
                    $scope.idealWeightlevel = 1;
                    $scope.idealWeightlevel = ($scope.idealWeightlevel*100)/2;
                }

                $window.idealWeightlevel = $scope.idealWeightlevel.toFixed(2);
                viewWeightGraph();
            }

        });
    };
    $scope.doGetDemograph();

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
        if(searchStr.length>=3){
            $scope.loadingExercise=true;
            if($scope.exerciseSearchResult.length==0){
                $scope.loadingExercise=true;
            }
            var userExerciseDiaryDetailPromise=UserDashboardService.searchExercise(searchStr);
            return userExerciseDiaryDetailPromise.then(function(result){
                $scope.exerciseSearchResult=result;
                $scope.loadingExercise=false;
                return $scope.exerciseSearchResult;
            });
        }
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

    //On Select frequent exercise
    $scope.suggestedExerciseByAdmin=function(exerciseid){
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
    $scope.exerciseSelected=function(){
        $scope.isNew=true;
        $scope.title= "Add Exercise";
        var getExerciseDetailPromise=UserDashboardService.doGetSelectedExerciseDetails($scope.selectedExercise.exerciseid);
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

        requestHandler.getRequest("user/getUserExerciseSuggestions/","").then(function(response){
            $scope.adminSuggestedExercise = response.data.exerciseSuggestion;
        });
    };
    //Insert User Exercise
    $scope.doInsertUserExercise=function(){
        //Set values according to the api calls
        $scope.userExercise.exerciseid=$scope.userSelectedExerciseDetails.exerciseid;
        $scope.userExercise.date=document.getElementById("main-start-date").value;
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
            var date = document.getElementById("main-start-date").value;
            $scope.loadExerciseDiary(date);
            $scope.doGetIntakeBruntByDate(date);
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
                /* $.each($scope.userSelectedExerciseDetails.type.levels, function(index,value) {
                 if(value.levelid == result.User_exercise_data.Level.levelid){
                 $scope.userExercise.levelid = value;
                 originallevel=angular.copy(value);
                 }
                 });*/
                $scope.userExercise.workoutvalue=parseInt(result.workoutvalue);
                originaltiming = parseInt(result.workoutvalue);
                $scope.current=$scope.caloriesSpent=result.calories;
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
            var date = document.getElementById("main-start-date").value;
            $scope.loadExerciseDiary(date);
            $scope.doGetIntakeBruntByDate(date);
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
            $scope.current=$scope.caloriesSpent=$scope.userSelectedExerciseDetails.MET*$scope.demography.weight*($scope.userExercise.workoutvalue/60);

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
        setTimeout("viewWeightGraph();", 10);
    };

    $scope.cancelUpdate=function(){
        $scope.goal = {
            status: 'view-goal'
        };
    };

    $scope.doGetWeightGoal=function(){
        requestHandler.getRequest("user/getWeightGoal/","").then(function(response){

            if(response.data.Response_status==0){
                $scope.updateGoal=0;
                $scope.targetText='Period';
                $window.singlePicker = false;
                $window.minimumDate = new Date();
            }
            else{
                $scope.goalDetails=response.data.Weight_Goal;
                $scope.updateGoal=1;

                var dateCompare = $scope.goalDetails.startdate.slice(6,10)+'-'+$scope.goalDetails.startdate.slice(3,5)+'-'+$scope.goalDetails.startdate.slice(0,2);
                var date1 = selectedDate.slice(6,10)+'-'+selectedDate.slice(3,5)+'-'+selectedDate.slice(0,2);
                var date2 = $scope.goalDetails.enddate.slice(6,10)+'-'+$scope.goalDetails.enddate.slice(3,5)+'-'+$scope.goalDetails.enddate.slice(0,2);


                var date1_ms;

                if (new Date(dateCompare).getTime() > new Date(date1).getTime()) {
                    date1_ms = new Date(dateCompare).getTime();
                    $scope.viewGraphButton=false;
                }
                else{
                    date1_ms = new Date(date1).getTime();
                    $scope.viewGraphButton=true;
                }

                // The number of milliseconds in one day
                var ONE_DAY = 1000 * 60 * 60 * 24;

                // Convert both dates to milliseconds
                var date2_ms = new Date(date2).getTime();

                // Calculate the difference in milliseconds
                var difference_ms = date2_ms - date1_ms;

                // Convert back to days
                $scope.remainingDates = Math.round(difference_ms/ONE_DAY);
                if($scope.remainingDates<0){
                    $scope.remainingDates=0;
                    $scope.goalExpired=1;
                    var dateinitial = new Date(dateCompare).getTime();
                    var diff_ms = date2_ms - dateinitial;
                    $scope.targetDays = Math.round(diff_ms/ONE_DAY);

                    var weightLogPromise=UserDashboardService.doGetAchievedWeight($scope.goalDetails.enddate);
                    weightLogPromise.then(function(result){
                        $scope.achievedWeight = result;
                        var targetWeightLossOrGain=0;
                        var achievedWeightLossOrGain=0;
                        var compare=0;
                        if($scope.goalDetails.targetweight>$scope.goalDetails.initialweight){
                            targetWeightLossOrGain = $scope.goalDetails.targetweight-$scope.goalDetails.initialweight;
                            achievedWeightLossOrGain = $scope.achievedWeight-$scope.goalDetails.initialweight;
                            if(achievedWeightLossOrGain<=0){
                                $scope.achieveStatus=0;
                            }
                            else{
                                compare = achievedWeightLossOrGain/targetWeightLossOrGain;
                                if(compare==1){
                                    $scope.achieveStatus=2;
                                }else if(0.6>=compare<1&&compare<1.4){
                                    $scope.achieveStatus=1;
                                }else $scope.achieveStatus=0;
                            }
                        }
                        else{
                            targetWeightLossOrGain = $scope.goalDetails.initialweight - $scope.goalDetails.targetweight;
                            achievedWeightLossOrGain = $scope.goalDetails.initialweight - $scope.achievedWeight;
                            if(achievedWeightLossOrGain<=0){
                                $scope.achieveStatus=0;
                            }
                            else{
                                compare = achievedWeightLossOrGain/targetWeightLossOrGain;
                                if(compare==1){
                                    $scope.achieveStatus=2;
                                }else if(0.6>=compare<1&&compare<1.4){
                                    $scope.achieveStatus=1;
                                }else $scope.achieveStatus=0;
                            }
                        }

                    });
                }
                else{
                    $scope.goalExpired=0;
                }

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
        $scope.setGoalDetails.targetweight=parseFloat(document.getElementById("target").value);
        $scope.setGoalDetails.initialweight=$scope.demography.weight;

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
        requestHandler.postRequest("user/insertWeightGoal/",$scope.setGoalDetails).then(function(response){
            $scope.doGetWeightGoal();
            $scope.doInsertOrUpdateWeightLog(selectedDate,parseFloat($scope.setGoalDetails.initialweight));
        },function(){
            errorMessage(Flash, "Please try again later!");
        });
    };

    $scope.doGetWeightLog=function(date){

        var weightLogPromise=UserDashboardService.doGetWeightLogDetails(date);
        weightLogPromise.then(function(result){
            var weightlogdetails=result.Weight_logs;
            if(!weightlogdetails.weight){
                $scope.originalWeight="";
                $("#weightLog").val('');
            }
            else{
                $scope.weightlog=$scope.originalWeight=weightlogdetails.weight;
                $("#weightLog").val(weightlogdetails.weight);
            }
        });
    };

    $scope.weightLogEntry=function(){
        $scope.weightUpdateText="Updating...";
        $scope.spinner=true;
        $scope.doInsertOrUpdateWeightLog($("#weight-log-date").val(),parseFloat($("#weightLog").val()));
    };

    //TO Insert weight Goal Log
    $scope.doInsertOrUpdateWeightLog=function(date,weight){
        requestHandler.postRequest("user/weightlogInsertorUpdate/",{"date":date,"weight":weight}).then(function(response){
            if(date==selectedDate && $scope.updateGoal==1){
                $window.currentweight = weight;
                refreshGraph();
                $scope.updateAverageGainSpent(date);
            }
            $scope.spinner=false;
            $scope.weightUpdateText="Update Weight";
            $scope.doGetWeightLog(date);
            $scope.doGetDemograph();
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };



    $scope.isCleanWeight=function(){
        return angular.equals(parseFloat($("#weightLog").val()), parseFloat($scope.originalWeight));
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
        $scope.originalUpdateGoalWeight={
            endDate:$scope.goalDetails.enddate,
            weight:$scope.goalDetails.targetweight
        };
        var startformat = $scope.goalDetails.startdate.slice(6,10)+','+$scope.goalDetails.startdate.slice(3,5)+','+$scope.goalDetails.startdate.slice(0,2);
        var currentformat = selectedDate.slice(6,10)+','+selectedDate.slice(3,5)+','+selectedDate.slice(0,2);
        $window.goalStartDate = $scope.goalDetails.startdate;
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

    $scope.isCleanUpdateGoal=function(){
        var endDate = document.getElementById("end").value;
        if(endDate==""){
            endDate = $scope.goalDetails.enddate;
        }
        var newUpdateGoal={
            endDate:endDate,
            weight:parseFloat(document.getElementById("target").value)
        };
        return angular.equals($scope.originalUpdateGoalWeight,newUpdateGoal);
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
        $scope.setGoalDetails.targetweight=parseFloat(document.getElementById("target").value);
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

            $scope.averageIntake=Math.round($scope.calorieGraph.averagecalorieintake);
            $scope.averageSpent=Math.round($scope.calorieGraph.averagecalorieburnt);

            $scope.currentGain=$scope.calorieGraph.intakecalorie;
            $scope.currentGain=$scope.currentGain.toFixed(2);

            if($scope.averageIntake<$scope.calorieGraph.intakecalorie){
                $scope.currentGainColour="red";
            }else $scope.currentGainColour="limegreen";

            $scope.currentSpent=$scope.calorieGraph.burntcalorie;
            $scope.currentSpent=$scope.currentSpent.toFixed(2);

            if($scope.averageSpent<$scope.calorieGraph.burntcalorie){
                $scope.currentSpentColour="red";
            }else $scope.currentSpentColour="orange";

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

    $scope.updateAverageGainSpent = function(date){
        requestHandler.postRequest("user/getTotalCalorieDetailForDate/",{"date":date}).then(function(response){
            $scope.averageIntake=Math.round(response.data.Calorie_Graph.averagecalorieintake);
            $scope.averageSpent=Math.round(response.data.Calorie_Graph.averagecalorieburnt);
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
                    categories: ['Protein', 'Fat', 'Carbs', 'Fibre'],
                    labels: {
                        style: {
                            fontSize:'9px',
                            fontWeight:'normal'
                        },
                        useHTML: true,
                        formatter: function() {
                            if(this.value == "Protein")
                                return this.value+'<br/><img class="hidden-md" src="../../images/i-protein.jpg"/>';
                            else if(this.value == "Fat")
                                return '&nbsp;&nbsp;'+this.value+'&nbsp;&nbsp;'+'<br/><img class="hidden-md" src="../../images/i-fats.jpg"/>';
                            else if(this.value == "Carbs")
                                return this.value+'<br/><img class="hidden-md" src="../../images/i-carbs.jpg"/>';
                            else if(this.value == "Fibre")
                                return '&nbsp;'+this.value+'&nbsp;'+'<br/><img class="hidden-md" src="../../images/i-fibre.jpg"/>';
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
                legend:{enabled:true},
                series: [{
                    type: 'column',
                    name:'Units',
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
                            name: 'Carbs',
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
        var date=document.getElementById("main-start-date").value;
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
                        categories: ['Protein', 'Fat', 'Carbs', 'Fibre'],
                        labels: {
                            useHTML: true,
                            formatter: function() {
                                if(this.value == "Protein")
                                    return this.value+'<br/><img src="../../images/i-protein.jpg"/>';
                                else if(this.value == "Fat")
                                    return '&nbsp;&nbsp;'+this.value+'&nbsp;&nbsp;'+'<br/><img src="../../images/i-fats.jpg"/>';
                                else if(this.value == "Carbs")
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
                                name: 'Carbs',
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

            //To get frequently asked exercise
            var advicePromise=UserDashboardService.getCoachIndividualDetail(response.data.Coach_Advice);

            var adviceCoachList=[];

            $.each(advicePromise, function(index,value) {
                adviceCoachList.push(value.coachid);
            });

            requestHandler.getRequest("user/getmyCoachList/", "").then(function(response){
                $scope.coachlist=response.data.getmyCoachList;
                $.each($scope.coachlist, function(index,coach) {
                    if(adviceCoachList.indexOf(coach.userid)==-1){
                        var addCoach={};
                        addCoach.coachid=coach.userid;
                        addCoach.coachname=coach.name;
                        addCoach.coachimage=coach.imageurl;
                        addCoach.description="";
                        advicePromise.push(addCoach);
                    }
                });

                var emptyCoach=[{coachid: "n1",coachname: ""},{coachid: "n2",coachname: ""},{coachid: "n3",coachname: ""},{coachid: "n4",coachname: ""}];

                if(advicePromise.length<3){
                    for(i=advicePromise.length;i<3;i++){
                        advicePromise.push(emptyCoach[i]);
                    }
                }
                else{
                    advicePromise.push(emptyCoach[0]);
                }
                $scope.coachadvice =advicePromise;
                $scope.usercoachadvicedetails=$scope.coachadvice[0];

                coachAdviceCarousel();
            });

        },function(){
            console.log("Please try again later!");
        });
    };

    $scope.setCoachDeatails=function(mycoachadvice){
        $scope.usercoachadvicedetails=mycoachadvice;
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
                titles.yaxis="Calories (cal)";
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
                titles.yaxis="Calories (cal)";
                titles.color='red';
                $scope.drawHistoryGraph(historyReport,titles);
            });
        }
        else if($scope.historyType==3){
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
                titles.yaxis="Minutes";
                titles.color='blue';
                $scope.drawHistoryGraph(historyReport,titles);
            });
        }else{
            requestHandler.postRequest("/user/getWeightLogGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                $scope.historyRecord=response.data.Weight_logs;
                $.each($scope.historyRecord, function(index,value) {
                    var history = [];
                    var date = value.date.split("/");
                    history.push(monthNames[(date[1]-1)]+' '+date[0]);
                    history.push(parseFloat(value.weight));
                    historyReport.push(history);
                });
                titles.title="Weight Log Graph ( "+startDate+" - "+endDate+" )";
                titles.name="Weight Log";
                titles.suffix=" Kgs";
                titles.yaxis="Weight (Kgs)";
                titles.color='#f8ba01';
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
    $scope.todayDate = selectedDate;
    $scope.selectedDate = selectedDate;
    $window.goalStartDate = $window.goalEndDate = selectedDate;

    //Initialize
    $scope.initialLoadFoodAndExercise=function(date){
        $scope.loadFoodDiary(date);
        $scope.loadExerciseDiary(date);
        $scope.doGetIntakeBruntByDate(date);
        $scope.goGetDailyIntakeGraph(date);
        $scope.doGetWeightGoal();
        $scope.doGetWeightLog(date);
        $scope.goGetSessionGraph($scope.storedSessionId);
    };

    $scope.initialLoadFoodAndExercise(selectedDate);
    $scope.doGetCoachAdvices();

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
            'top': $scope.isSemi ? 'auto' : '52%',
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

}).constant('uibdatepickerPopupConfig', {
    datepickerPopup: "dd/MM/yyyy",
    closeOnDateSelection: true,
    appendToBody: true,
    showButtonBar: false
}).constant('uibDatepickerConfig', {
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
            historygraph: '='
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
        }
    }
});

userApp.directive('heightFoodBind', function() {
    return {
        link: function($scope, $element) {
            $scope.$watch(function() {
                setTimeout(function(){
                    var selectclass = $('.food');
                    if ($element.height()>parseInt($('.food_scrollbar').css('height'))) {
                        selectclass.css({"paddingRight":"15px"});
                    } else {
                        selectclass.css({"paddingRight":"3px"});
                    }
                }, 500);
            });
        }
    }
});

userApp.directive('heightExerciseBind', function() {
    return {
        link: function($scope, $element) {
            $scope.$watch(function() {
                setTimeout(function(){
                    var selectclass = $('.exercise');
                    if ($element.height()>parseInt($('.exercise-height').css('height'))) {
                        selectclass.css({"paddingRight":"15px"});
                    } else {
                        selectclass.css({"paddingRight":"3px"});
                    }
                }, 500);
            });
        }
    }
});

userApp.directive('shouldFocus', function(){
    return {
        restrict: 'A',
        link: function(scope,element,attrs){
            scope.$watch(attrs.shouldFocus,function(newVal,oldVal){
                if (newVal) {
                    element[0].scrollIntoView(false);
                }
            });
        }
    };
});

