var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ngPercentDisplay','angular-svg-round-progress','angularUtils.directives.dirPagination','ui.bootstrap']);

userApp.controller('UserAssignedMealPlansController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.mealPlans = 'active';
    $scope.mealPagination={"itemsPerPage":5,"pageNumber":1};
    //Food Meal Plan
    $scope.doGetAssignedMealPlans=function(){
        $scope.mealplan={planDetailView:false};
        $scope.loaded=true;
        $scope.getAssignedMealPlanParams={
            "limit":$scope.mealPagination.itemsPerPage,
            "offset":($scope.mealPagination.pageNumber-1)*$scope.mealPagination.itemsPerPage,
            "plantype": 1
        };
        requestHandler.postRequest("user/getmyassignedmealplans/",$scope.getAssignedMealPlanParams).then(function(response){
            $scope.myAssignedMealPlanList=response.data;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        }, function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //Load Food Meal Plan Details
    $scope.doLoadMealPlanDetails=function(mapId){
        $scope.currentPlanDetail=mapId;
        $scope.mealplan={planDetailView:true};

        requestHandler.postRequest("getplandetail/",{"mapid":mapId}).then(function(response){
            //First We need to group up days
            $scope.mealplandetail=response.data.plandetail;

            //Initialize
            $scope.mealPlanDetailList=[];

            //create array of days
            for(var i=1;i<=$scope.mealplandetail.plandays;i++)
            {
                $scope.mealPlanDetailList.push(
                    {
                        "day":"Day "+i,
                        "dayId":i,
                        "date": "dd/mm/yyyy",
                        "totalCalories":0,
                        "consumedCalories":0,
                        "foods":[
                            {"sessionId":1,"sessionName":"BreakFast","foodItems":[]},
                            {"sessionId":2,"sessionName":"Brunch","foodItems":[]},
                            {"sessionId":3,"sessionName":"Lunch","foodItems":[]},
                            {"sessionId":4,"sessionName":"Snacks","foodItems":[]},
                            {"sessionId":5,"sessionName":"Dinner","foodItems":[]}
                        ]
                    }
                );
            }

            // Group Json object of plan
            $.each($scope.mealplandetail, function (key, obj) {
                if(key.substring(0,3)=="day"){
                    $scope.mealPlanDetailList[key.substring(3)-1].totalCalories=(obj.actualcalories).toFixed(2);
                    $scope.mealPlanDetailList[key.substring(3)-1].consumedCalories=(obj.consumedcalories).toFixed(2);
                    $scope.mealPlanDetailList[key.substring(3)-1].date= obj.date;
                    $.each(obj.foods, function (index, value) {
                        value.calorieintake=value.calorieintake.toFixed(2);
                        $scope.mealPlanDetailList[value.day-1].foods[value.foodsessionid-1].foodItems.push(value);
                    });
                }
            });

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };
    // Set or Unset Food Consumed By User
    $scope.doSetUnsetFoodItemConsumed= function(foodplanid,date){
        $scope.getFoodItemConsumedParam={'id':foodplanid, 'date':date};
        requestHandler.postRequest("user/setorunsetfoodplan/", $scope.getFoodItemConsumedParam).then(function(response){
            if(response.data.Response_status==1){
                $scope.doLoadMealPlanDetails($scope.currentPlanDetail);
                $(function(){
                    $(".common_model").hide();
                    $("#view-meal-item").hide();
                    $("#lean_overlay").hide();
                });
                successMessage(Flash,"Successfully Updated!");
            }else if(response.data.Response_status==2){
                $scope.doLoadMealPlanDetails($scope.currentPlanDetail);
                $(function(){
                    $(".common_model").hide();
                    $("#view-meal-item").hide();
                    $("#lean_overlay").hide();
                });
                errorMessage(Flash,"Food log for future date is not allowed.");
            }
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
    }

    $scope.doViewFoodItemFromMealPlan=function(foodplanid,date){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#view-meal-item").fadeIn(600);
            $(".common_model").show();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            $scope.shouldBeOpen = true;
        });

        $scope.getFoodPlanItemParam={'id':foodplanid, 'date':date};
        requestHandler.postRequest("user/getfooditemdetail/", $scope.getFoodPlanItemParam).then(function(response){
            $scope.foodPlanItemDetails= response.data.plandetail;
            $scope.assignedPlanRoundedValue= $scope.foodPlanItemDetails.calorieintake.toFixed(2);
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#view-meal-item").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#view-meal-item").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

    }

    $scope.init=function() {
        $scope.doGetAssignedMealPlans();
        $scope.paginationLoad=false;
    };

    $scope.$watch("mealPagination.pageNumber",function(){
        $scope.doGetAssignedMealPlans();
    });
    $scope.init();

}]);