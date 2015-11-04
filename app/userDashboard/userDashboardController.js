var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','ngTouch', 'angucomplete-alt','ngPercentDisplay','userDashboardServiceModule','ui.bootstrap','angular-svg-round-progress']);

userApp.controller('UserDashboardController',function($scope,requestHandler,Flash,UserDashboardService,$interval,roundProgressService,limitToFilter) {
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
                console.log(result);
                $scope.userFood.userfoodid=result.userfoodid;
                $scope.userFood.foodid=result.foodid;
                $scope.userFood.measure=result.measureid;
                $scope.userFood.servings=parseInt(result.measureid.servings);
                $scope.current=$scope.caloriesIntake=result.measureid.calories;
                $scope.currentColor =   '#66E066';
                $scope.current=$scope.current.toFixed(2);
                if(($scope.current.length-3)>2) $scope.max=100+((String($scope.current|0).slice(0, -2))*100);
                else $scope.max=100;
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
            if(($scope.current.length-3)>2) $scope.max=100+((String($scope.current|0).slice(0, -2))*100);
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
        $scope.loaded=true;
        var userFoodDiaryDetailPromise=UserDashboardService.getFoodDiary(selectedDate);
        userFoodDiaryDetailPromise.then(function(result){
            $scope.userFoodDiaryDataAll=result;
            $scope.loadSessionDetails();
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
        // alert(foodid);
        var getExerciseDetailPromise=UserDashboardService.doGetSelectedExerciseDetails(exerciseid);
        getExerciseDetailPromise.then(function(result){
            $scope.userSelectedExerciseDetails=result;
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

    //On Select edit exercise
    $scope.doEditUserExercise=function(exerciseid,userexercisemapid){

        $scope.isNew=false;
        $scope.title= "Edit Exercise";
        var getExerciseDetailForEditPromise=UserDashboardService.doGetSelectedExerciseDetails(exerciseid);
        getExerciseDetailForEditPromise.then(function(result){
            $scope.userSelectedExerciseDetails=result;
           // console.log(result);
            var getUserExerciseDetailsPromise=UserDashboardService.doGetUserExerciseDetails(userexercisemapid);
            getUserExerciseDetailsPromise.then(function(result){
                console.log(result);
                $scope.userExercise.userexercisemapid=userexercisemapid;
                $scope.userExercise.exerciseid=exerciseid;
                $scope.userExercise.levelid=result.User_exercise_data.Level;
                $scope.userExercise.workoutvalue=parseInt(result.User_exercise_data.Level.workoutvalue);

                $scope.current=$scope.caloriesSpent=result.User_exercise_data.Level.calories;
                 $scope.currentColor =   '#66E066';
                 $scope.current=$scope.current.toFixed(2);
                 if(($scope.current.length-3)>2) $scope.max=100+((String($scope.current|0).slice(0, -2))*100);
                 else $scope.max=100;
                 $scope.doUserAddExercise();
            });

        });
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
            $scope.loadExerciseDiary(selectedDate);
        });

    };


    //To get frequently asked exercise
    var frequentExercisePromise=UserDashboardService.doGetFrequentlyUsedExercise();
    frequentExercisePromise.then(function(result){
        $scope.frequentExerciseList =result;
    });

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
            console.log("calories",$scope.userExercise.levelid.calories);
            console.log("workout",$scope.userExercise.workoutvalue);
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

    //Weight and Set Goal
    $scope.goal = {
        status: 'set-goal'
    };

    $scope.graph = {
        status: 'goal'
    };

    $scope.viewGraph=function(){
        $scope.graph = {
            status: 'goal-graph'
        };
    };

    $scope.viewGoal=function(){
        $scope.graph = {
            status: 'goal'
        };
    };

    $scope.setGoal=function(){
        $scope.goal = {
            status: 'view-goal'
        };
    };

    $scope.changegoal1=function(){
        $scope.goal = {
            status: 'set-goal'
        };
    };

    //bar chart values
    $scope.weightValue = [
        ['Current Weight', 59.5]
    ];
    $scope.weightTrack = limitToFilter($scope.weightValue, 2);
    //end bar chart values

    //weight Graph
    $scope.weightGraphValue = [
        ['nov-1', 58],
        ['nov-2', 58],
        ['nov-3', 58.2],
        ['nov-4', 58],
        ['nov-5', 58.5],
        ['nov-6', 58.7],
        ['nov-7', 59],
        ['nov-8', 58.7],
        ['nov-9', 59.2],
        ['nov-10', 59.3],
        ['nov-11', 59.5]
    ];

    $scope.weightGraph = limitToFilter($scope.weightGraphValue, 30);
    //end weight Graph


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
    $scope.selectedDate = selectedDate;

    //Initialize
    $scope.loadFoodAndExercise=function(){
        $scope.loadFoodDiary($scope.selectedDate.format("dd/mm/yyyy"));
        $scope.loadExerciseDiary($scope.selectedDate.format("dd/mm/yyyy"));
    };

    $scope.initialLoadFoodAndExercise=function(selectedDate){
        $scope.loadFoodDiary(selectedDate);
        $scope.loadExerciseDiary(selectedDate);
    };

    $scope.initialLoadFoodAndExercise(selectedDate);

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

    //Date Picker
    $scope.prevent=function(){
        event.preventDefault();
    };

    $scope.change=function(){
        $scope.userProfile.dob=$scope.selectedDate.format("dd/mm/yyyy");
    };

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

// bar chart
userApp.directive('hcBar', function () {
        return {
            restrict: 'C',
            replace: true,
            scope: {
                items: '='
            },
            controller: function ($scope, $element, $attrs) {
            },
            template: '<div id="chart-container" style="margin: 10px 0 0 0;height:60px">not working</div>',
            link: function (scope, element, attrs) {
                var chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'chart-container'
                    },
                    title: {
                        text: ''
                    },
                    yAxis: {
                        min: 58,
                        max: 60,
                        title: {
                            text: '',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' Kgs'
                    },
                    colors: [
                        '#f8ba01'
                    ],
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -50,
                        y: 80,
                        floating: true
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        type: 'bar',
                        name: ' '
                    }],
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                scope.$watch("items", function (newValue) {
                    chart.series[0].setData(newValue, true);
                }, true);

            }
        }
    });

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
