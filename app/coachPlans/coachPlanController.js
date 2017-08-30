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
           console.log($scope.foodlist);
           $scope.foodlist=[];
           $.each($scope.foodlist, function(index,value){
             $scope.foodlist.push({
             	"day": value.day,
             	"foodname": value.foodname,
             	"measurecount": value.measurecount,
             	"foodmeasurename": value.foodmeasurename,
             	"foodsessioname": value.foodsessioname
             })
           });
          
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
     
};

$scope.plansViewInit=function(){
   $scope.doViewCoachPlans();
};

}]);	