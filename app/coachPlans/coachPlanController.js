var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ngPercentDisplay','angularUtils.directives.dirPagination','ui.bootstrap']);

coachApp.controller('CoachMealPlanController',['$scope','requestHandler','Flash','roundProgressService',function($scope,requestHandler,Flash,roundProgressService) {
$scope.activeClass.advices='active';

$scope.doGetCoachPlanList=function(){

	$scope.coachPlanPagination={
						"limit":$scope.pagination.itemsPerPage,
						"offset":($scope.pagination.pageNumber-1)*$scope.pagination.itemsPerPage
					};

   requestHandler.postRequest("coach/myplans/",$scope.coachPlanPagination).then(function(response){
     $scope.coachPlanList= response.data;
   	 $scope.paginationLoad=true;
   });
};

$scope.init=function(){
	$scope.paginationLoad=false;
	$scope.pagination={"itemsPerPage":4,"pageNumber":1};
	
};

$scope.$watch("pagination.pageNumber",function(){
	$scope.doGetCoachPlanList();
});

$scope.init();

}]);

coachApp.controller('ViewCoachPlanController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {

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

$scope.doCoachAddFood=function(){
    $scope.isNew=true;
    $scope.title="Add Food";
    $scope.addFood=false;
    $scope.foodSelected();
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

        requestHandler.postRequest("coach/searchFoodListByCoach/",{'foodname':"idli"}).then(function(response){
          $scope.foodSearchResult= response.data.foods;
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
    $scope.addFood=true;
    requestHandler.postRequest("coach/getFoodDetailByCoach/", {'foodid':'512'}).then(function(response){
        $scope.userSelectedFoodDetails= response.data.Food_Data;
        $scope.addFood=true;
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
