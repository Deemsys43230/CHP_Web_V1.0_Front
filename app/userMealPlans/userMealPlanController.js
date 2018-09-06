var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ngPercentDisplay','angular-svg-round-progress','angularUtils.directives.dirPagination','userDashboardServiceModule','ui.bootstrap']);

userApp.controller('UserMealPlanController',['$scope','requestHandler','Flash','$rootScope',function($scope,requestHandler,Flash,$rootScope) {
    $rootScope.isMenuShow=1;
    $scope.activeClass.mealPlans='active';

    $scope.doGetUserMealPlanList=function(){
        $scope.loaded=true;
        $scope.userMealPlanPagination={
            "limit": $scope.mealPagination.itemsPerPage,
            "offset":($scope.mealPagination.pageNumber-1)*$scope.mealPagination.itemsPerPage,
            "plantype": 1
        };

        requestHandler.postRequest("user/myplans/",$scope.userMealPlanPagination).then(function(response){
            $scope.userMealPlanList= response.data;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };


    // user Add Meal Plan
    $scope.userAssignMealPlan=function(){
        $scope.userMealPlan={};
        $scope.userMealPlan.planname="";
        $scope.userMealPlan.plandays="";
        $scope.userMealPlan.description="";
        $scope.userMealPlanForm.$setPristine();
        $scope.changeDays=false;
        $scope.isNew = true;
        $scope.title = "Add Meal Plan";

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#usermealPlan").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#usermealPlan").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#usermealPlan").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

    };
    //user add meal plan
    $scope.doAddMealPlanByUser=function(){
        requestHandler.postRequest("user/insertorupdatemealplan/",$scope.userMealPlan).then(function(response){
            $scope.doGetUserMealPlanList();
            successMessage(Flash,"Successfully Added");
            $scope.loaded=false;
            $scope.paginationLoad=true;
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.doEditUserMealPlan=function(id){
        $scope.isNew = false;
        $scope.title = "Edit Meal Plan";
        $scope.changeDays=true;
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#usermealPlan").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        requestHandler.getRequest("user/plandetail/"+id+"/", "").then(function(response){
            if(response.data.plan.plandetail.canedit==1){
                $scope.changeDays=false;
            }
        });

        $.each($scope.userMealPlanList.plans,function(index,value){
            if(value.id==id){
                $scope.userMealPlan=angular.copy(value);
                $scope.original= angular.copy($scope.userMealPlan);
            }
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#usermealPlan").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#usermealPlan").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
    };

    $scope.isClean=function(){
        return angular.equals($scope.original, $scope.userMealPlan);
    };

    $scope.doDeleteUserMealPlan=function(id){
        if(confirm("Are you sure you want to delete?")){
            requestHandler.postRequest("user/deleteplan/",{'id':id}).then(function(response){
                if(response.data.Response_status==1){
                    successMessage(Flash,"Successfully Deleted");
                    $scope.doGetUserMealPlanList();
                }else if(response.data.Response_status==0){
                    errorMessage(Flash,"Meal Plan already Assigned");
                }
            }, function(){
                errorMessage(Flash,"Please try again later!");
            });
        }
    };

    $scope.doAssignedMealPlanToHimself=function(id,userId){
        $scope.assignedMealPlanParams={
            "planid":id,
            "userid":userId
        };
            requestHandler.postRequest("user/assignplan/",$scope.assignedMealPlanParams).then(function(response){
                if(response.data.Response_status==1){
                    successMessage(Flash,"Successfully Assigned");
                    $scope.doGetUserMealPlanList();
                }else if(response.data.Response_status==2){
                    errorMessage(Flash,"Plan days does not have enough food");
                }
            }, function(){
                errorMessage(Flash,"Please try again later!");
            });

    };

    $scope.init=function(){
        $scope.original={};
        $scope.paginationLoad=false;
        $scope.mealPagination={"itemsPerPage":5,"pageNumber":1};

    };

    $scope.$watch("mealPagination.pageNumber",function(){
        $scope.doGetUserMealPlanList();
    });

}]);

userApp.controller('ViewUserMealPlanController',['$scope','requestHandler','Flash','$routeParams','UserDashboardService','roundProgressService',function($scope,requestHandler,Flash,$routeParams,UserDashboardService,roundProgressService) {
    $scope.activeClass.mealPlans='active';
    $scope.doViewUserMealPlans=function(){
        $scope.userMealPlanId= $routeParams.id;
        requestHandler.getRequest("user/plandetail/"+$scope.userMealPlanId+"/", "").then(function(response){
            $scope.plan= response.data.plan;
            //First We need to group up days
            $scope.plandetail=response.data.plan.plandetail;

            //Initialize
            $scope.userMealPlanDetailList=[];

            //create array of days
            for(var i=1;i<=$scope.plandetail.plandays;i++)
            {
                $scope.userMealPlanDetailList.push(
                    {
                        "day":"Day "+i,
                        "dayId":i,
                        "totalCalories":0,
                        "foods":[
                            {"sessionId":1,"sessionName":"BreakFast","foodItems":[]},
                            {"sessionId":2,"sessionName":"Brunch","foodItems":[]},
                            {"sessionId":3,"sessionName":"Lunch","foodItems":[]},
                            {"sessionId":4,"sessionName":"Snacks","foodItems":[]},
                            {"sessionId":5,"sessionName":"Dinner","foodItems":[]},
                        ]
                    }
                );
            }

            // Group Json object of plan
            $.each($scope.plan, function (key, obj) {
                if(key!='plandetail'){
                    $scope.userMealPlanDetailList[key.substring(3)-1].totalCalories=(obj.actualcalories).toFixed(2);
                    $.each(obj.foods, function (index, value) {
                        value.calorieintake= value.calorieintake.toFixed(2);
                        $scope.userMealPlanDetailList[value.day-1].foods[value.foodsessionid-1].foodItems.push(value);
                    });
                }
            });

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

//Initialize Modal Popup after ng-repeat
    $scope.doIntializeLeanModal=function()
    {
        $(".modal_trigger_food").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });
        $(function(){
            $(".user_register").show();
        });
    }

    $scope.doUserAddFood=function(planDay,foodSessionId){

        $scope.userFood={};
        $scope.userFood.day= planDay;
        $scope.userFood.foodsessionid=foodSessionId;
        $scope.userFood.isoptional= 0;
        $scope.addFood=false;
        $scope.showSearch=true;
        $scope.isNew=true;
        $scope.title="Add Food";

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal-add-food").fadeIn(600);
            $(".user_register").show();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
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

    $scope.doEditFoodItemFromPlan=function(id){
        $scope.userFood={};
        $scope.addFood=true;
        $scope.showSearch=false;
        $scope.isNew=false;
        $scope.title="Edit Food";

        requestHandler.postRequest("user/foodplandetail/",{"id":id}).then(function(response){
            $scope.userSelectedFoodDetails=response.data.fooddetail;
            $scope.userSavedFoodDetails=response.data.savedfoodplan;
            $.each($scope.userSelectedFoodDetails.measure,function(index,value){
                if(value.measureid==$scope.userSavedFoodDetails.foodmeasureid){
                    $scope.userFood.measure=value;
                    $scope.originalmeasure = angular.copy(value);
                }
            });

            $scope.userFood.measurecount=parseFloat($scope.userSavedFoodDetails.measurecount);
            $scope.originalmeasurecount = angular.copy($scope.userSavedFoodDetails.measurecount);
            $scope.userFood.id=$scope.userSavedFoodDetails.id;
            $scope.userFood.foodsessionid=$scope.userSavedFoodDetails.foodsessionid;
            $scope.userFood.day=$scope.userSavedFoodDetails.day;
            $scope.userFood.isoptional= $scope.userSavedFoodDetails.isoptional;
            $scope.originalisoptional= angular.copy($scope.userSavedFoodDetails.isoptional);
            $scope.doCalculateCalories();
            $scope.userFood.calorieintake=$scope.caloriesIntake;

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
        });
    };

    $scope.resetdata=function(){
        $scope.userFood={};
        $scope.userFood.measure="";
        $scope.userFood.measurecount=[];
        $scope.selectedFood="";
        $scope.FoodAddForm.$setPristine();
        $scope.current=$scope.caloriesIntake=0;
        $scope.max = 100;
        $scope.userSelectedFoodDetails={};
    };

    $scope.isCleanFood=function(){
        return angular.equals($scope.originalmeasure, $scope.userFood.measure)&& angular.equals($scope.originalmeasurecount, $scope.userFood.measurecount) && angular.equals($scope.originalisoptional, $scope.userFood.isoptional);
    };

// View Food Meal Item Plan Details
    $scope.doViewUserFoodItemFromPlan=function(foodid){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#view-meal-item").fadeIn(600);
            $(".common_model").show();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            $scope.shouldBeOpen = true;
        });

        $scope.getFoodPlanItemParam={'id':foodid};
        requestHandler.postRequest("user/foodplandetail/", $scope.getFoodPlanItemParam).then(function(response){
            $scope.foodPlanItemDetails= response.data.savedfoodplan;
           $scope.foodCalorieRoundedValue=$scope.foodPlanItemDetails.calorieintake.toFixed(2);
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
    };

//Search Function for food
    $scope.inputChanged = function(searchStr) {

        if(searchStr.length >=1){
            $scope.loadingFoods=true;
            if($scope.foodSearchResult.length==0){

                $scope.loadingFoods=true;
            }
            var userFoodDiaryDetailPromise=UserDashboardService.searchFoodByUser(searchStr);
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

    $scope.foodSelected=function(){
        $scope.selectedFoodParam={'foodid': $scope.selectedFood.foodid};
        requestHandler.postRequest("user/getFoodDetailByUser/", $scope.selectedFoodParam).then(function(response){
            $scope.addFood=true;
            $scope.userSelectedFoodDetails= response.data.Food_Data;

        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

//Calories caluclation for food
    $scope.doCalculateCalories=function(){
        if($scope.userFood.measurecount==0){
            $scope.current=$scope.caloriesIntake=0;
        }
        if(!$scope.userFood.measurecount>0){
            $scope.current=$scope.caloriesIntake=0;
        }
        else{
            $scope.current=$scope.caloriesIntake=$scope.userFood.measure.calories*$scope.userFood.measurecount;
            $scope.current=$scope.current.toFixed(2);
            if(($scope.current.length-3)>2) $scope.max=100+((String($scope.current|0).slice(0, -2))*100);
            else $scope.max=100;
        }
    };

//To Check maximum food value
    $scope.maxfoodvalue=false;
    $scope.maxFoodValueCheck = function(value){
        if(value<=999.99){
            $scope.maxfoodvalue=false;
        }
        else if(value >999.99){
            $scope.maxfoodvalue=true;
        }

    };

//Insert User Food
    $scope.doInsertFoodPlanByUser=function(){
        //Set values according to the api calls
        $scope.userFood.planid= $routeParams.id;
        $scope.userFood.foodid=$scope.userSelectedFoodDetails.foodid;
        $scope.userFood.foodmeasureid=$scope.userFood.measure.measureid;
        $scope.userFood.calorieintake=$scope.caloriesIntake;

        console.log($scope.userFood);
        requestHandler.postRequest("user/insertorupdatefoodplan/",$scope.userFood).then(function(response){
            if(response.data.Response_status==1){
                successMessage(Flash,"Successfully Added");
                $scope.doViewUserMealPlans();
            }
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });

    };

    $scope.doDeleteFoodItemFromPlan=function(id){
        if(confirm("Are you sure you want to delete food item?")){
            $scope.deleteFoodItemParam={'id':id};
            requestHandler.postRequest("user/deletefoodplan/",$scope.deleteFoodItemParam).then(function(response){
                if(response.data.Response_status==1){
                    successMessage(Flash,"Successfully Deleted");
                    $scope.doViewUserMealPlans();
                }
            }, function(){
                errorMessage(Flash,"Please try again later!");
            });
        }
    };

    $scope.plansViewInit=function(){
        $scope.userFood={};
        $scope.current=$scope.caloriesIntake=0;
        $scope.max=100;
        $scope.originalmeasure={};
        $scope.originalmeasurecount={};
        $scope.originalisoptional={};
        $scope.foodSearchResult = [];
        $scope.doViewUserMealPlans();

    };

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
}]);

