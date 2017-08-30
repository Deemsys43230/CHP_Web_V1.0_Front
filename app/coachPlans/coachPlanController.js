var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('CoachPlanController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
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
            $scope.foodlist= response.data.plan.foodlist;
            
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
            console.log($scope.mealPlanDetailList[2]);

            //We need to group up the food
            $.each($scope.foodlist,function(index,value){
              $scope.mealPlanDetailList[value.day-1].foods[value.foodsessionid-1].foodItems.push(value);
            });

            console.log($scope.mealPlanDetailList);
          
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
     
};

$scope.plansViewInit=function(){
   $scope.doViewCoachPlans();
};

}]);	