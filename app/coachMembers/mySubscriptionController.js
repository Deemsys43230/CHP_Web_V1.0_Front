var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('MySubscriptionController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {
    
    $scope.activeClass.sub='active';

    //Do Get Coach Active plans
    $scope.doGetCoachIsActivePlan= function(){

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

    	requestHandler.getRequest("coach/isSubscriptionActive/","").then(function(response){
    		$scope.currentActivePlan=response.data.subscription;
            var enddate=$scope.currentActivePlan.enddate; //actual plan end date
            var firstValue = selectedDate.split('/');               // Current date
            var secondValue =enddate.split('/');
            var firstDate=new Date();
            firstDate.setFullYear(firstValue[2],(firstValue[1] - 1 ),firstValue[0]);
            var secondDate=new Date();
            secondDate.setFullYear(secondValue[2],(secondValue[1] - 1 ),secondValue[0]);
            if(response.data.isActive==1 && firstDate < secondDate){
                $scope.subscriptionStatus=true;
            }
            else {
                $scope.subscriptionStatus=false;
            }
    	});
    };

    //Do get Coach Subscribed plan
    $scope.doGetSubscribedPlan=function(){
    	requestHandler.getRequest("coach/getsubscriptionhistory/","").then(function(response){
            $scope.totalcountINR = response.data.totalspendingsINR;
            $scope.totalcountUSD = response.data.totalspendingsUSD;
    		$scope.subscriptionPlanHistory = response.data;
            $scope.loaded=false;
            $scope.paginationLoad=true;
    	});
    };

    $scope.init=function(){

    	$scope.doGetCoachIsActivePlan();
    	$scope.doGetSubscribedPlan();
    };

    $scope.init();

}]);