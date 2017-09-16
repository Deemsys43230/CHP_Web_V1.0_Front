var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll']);

coachApp.controller('coachTrainingExpiredController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {

$scope.activeClass.my='active';
	$scope.doGetExpiringTraining = function(){
		$scope.param={
            "limit":$scope.trainingPagination.itemsPerPage,
            "offset":($scope.trainingPagination.pageNumber-1)*$scope.trainingPagination.itemsPerPage
        };
		requestHandler.postRequest("coach/expiringTrainingPlans/",$scope.param).then(function(response){
			$scope.expiringDetails = response.data;
            $scope.clientuserid =  $scope.expiringDetails.history;
		});
	};

    $scope.$watch("trainingPagination.pageNumber",function(){
        $scope.doGetExpiringTraining();
    });

	//Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.trainingPagination={"itemsPerPage":9,"pageNumber":1};
    };

    $scope.init();

}]);