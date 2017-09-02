var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ngPercentDisplay','angular-svg-round-progress','userDashboardServiceModule','angularUtils.directives.dirPagination','ui.bootstrap']);

coachApp.controller('CoachMealPlanController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
$scope.activeClass.advices='active';

$scope.doGetCoachPlanList=function(){
  $scope.loaded=true;
	$scope.coachPlanPagination={
						"limit":$scope.pagination.itemsPerPage,
						"offset":($scope.pagination.pageNumber-1)*$scope.pagination.itemsPerPage
					};

   requestHandler.postRequest("coach/myplans/",$scope.coachPlanPagination).then(function(response){
     $scope.coachPlanList= response.data;
     $scope.loaded=false;
   	 $scope.paginationLoad=true;
   },function(){
      errorMessage(Flash,"Please try again later!")
  });
};

$scope.init=function(){
	$scope.paginationLoad=false;
	$scope.pagination={"itemsPerPage":4,"pageNumber":1};
	
};

$scope.$watch("pagination.pageNumber",function(){
	$scope.doGetCoachPlanList();
});

}]);

coachApp.controller('ViewCoachPlanController',['$scope','requestHandler','Flash','$routeParams','UserDashboardService','roundProgressService',function($scope,requestHandler,Flash,$routeParams,UserDashboardService,roundProgressService) {

$scope.doViewCoachPlans=function(){
  $scope.coachPlanId= $routeParams.id;
         requestHandler.getRequest("coach/plandetail/"+$scope.coachPlanId+"/", "").then(function(response){
            $scope.plan= response.data.plan;
            //First We need to group up days
            $scope.plandetail=response.data.plan.plandetail;
           
            //Initialize
            $scope.mealPlanDetailList=[];

            //create array of days
            for(var i=1;i<=$scope.plandetail.plandays;i++)
            {
              $scope.mealPlanDetailList.push(
                  {
                    "day":"Day "+i,
                    "dayId":i,
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
          
          Object.keys($scope.plan).forEach(function(key){
              $.each($scope.plan[key].foods,function(index,value){
                $scope.mealPlanDetailList[value.day-1].foods[value.foodsessionid-1].foodItems.push(value);
              });
              // console.log($scope.mealPlanDetailList);
          });
          
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
     
};

$scope.doCoachAddFood=function(planDay,foodSessionId){
    $scope.isNew=true;
    $scope.title="Add Food";
    $scope.addFood=false;
    $scope.planDay= planDay;
    $scope.foodSessionId=foodSessionId;
 
    $(function(){
        $("#lean_overlay").fadeTo(1000);
        $("#add-food-modal").fadeIn(600);
        $(".user_register").show();

    });
    $(".modal_close").click(function(){
        $(".user_register").hide();
        $("#add-food-modal").hide();
        $("#lean_overlay").hide();
        $scope.resetdata();
    });

    $("#lean_overlay").click(function(){
        $(".user_register").hide();
        $("#add-food-modal").hide();
        $("#lean_overlay").hide();
       $scope.resetdata();
    });
    $scope.selectedFood="";
    
};

$scope.resetdata=function(){
    $scope.selectedFood="";
    $scope.FoodAddForm.$setPristine();
    $scope.userSelectedFoodDetails={};
};

//Search Function for food
$scope.inputChanged = function(searchStr) {

    if(searchStr.length >=3){
        $scope.loadingFoods=true;
        if($scope.foodSearchResult.length==0){

            $scope.loadingFoods=true;
        }
        var userFoodDiaryDetailPromise=UserDashboardService.searchFoodByCoach(searchStr);
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
    $scope.isNew=true;
    $scope.title= "Add Food";
    $scope.selectedFoodParam={'foodid': $scope.selectedFood.foodid};
    requestHandler.postRequest("coach/getFoodDetailByCoach/", $scope.selectedFoodParam).then(function(response){
        $scope.addFood=true;
        $scope.userSelectedFoodDetails= response.data.Food_Data;
        
    }, function(){
          errorMessage(Flash,"Please try again later!");
    });
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
$scope.doInsertFoodPlanByCoach=function(){
    //Set values according to the api calls
    $scope.userFood.planid= $routeParams.id;
    $scope.userFood.day= $scope.userFood.day;
    $scope.userFood.foodsessionid= $scope.userFood.foodsessionid;
    $scope.userFood.foodid=$scope.userSelectedFoodDetails.foodid;
    $scope.userFood.foodmeasureid=$scope.userFood.measure.measureid;
    
    requestHandler.postRequest("coach/insertorupdatefoodplan/",$scope.userfood).then(function(response){
        if(response.data.Response_status==1){
          successMessage(Flash,"Successfully Added");
          $scope.doViewCoachPlans();
        }
    }, function(){
          errorMessage(Flash,"Please try again later!");
    });

};

$scope.doDeleteFoodItemFromPlan=function(id){
  if(confirm("Are you sure you want to delete food item?")){
    $scope.deleteFoodItemParam={'id':id};
    requestHandler.postRequest("coach/deletefoodplan/",$scope.deleteFoodItemParam).then(function(response){
       if(response.data.Response_status==1){
          successMessage(Flash,"Successfully Deleted");
          $scope.doViewCoachPlans();
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
  $scope.foodSearchResult = [];
  $scope.doViewCoachPlans();
};

$scope.plansViewInit();

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

coachApp.controller('CoachWorkoutPlanController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
$scope.activeClass.advices='active';

$scope.doGetCoachWorkoutPlanList=function(){

  $scope.coachWorkoutPlanPagination={
            "limit":$scope.pagination.itemsPerPage,
            "offset":($scope.pagination.pageNumber-1)*$scope.pagination.itemsPerPage
          };

   requestHandler.postRequest("coach/myplans/",$scope.coachWorkoutPlanPagination).then(function(response){
     $scope.coachWorkoutPlanList= response.data;
     $scope.paginationLoad=true;
   });
};

$scope.init=function(){
  $scope.paginationLoad=false;
  $scope.pagination={"itemsPerPage":4,"pageNumber":1};
  
};

$scope.$watch("pagination.pageNumber",function(){
  $scope.doGetCoachWorkoutPlanList();
});

$scope.init();

}]);
