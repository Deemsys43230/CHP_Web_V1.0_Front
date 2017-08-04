var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('IndividualCoachSubscriptionController',['$scope','requestHandler','Flash','coachMenuService','$location','$routeParams',function($scope,requestHandler,Flash,coachMenuService,$location,$routeParams) {

	// For coach management side menu
    $scope.coachMenuList = coachMenuService;
    $.each($scope.coachMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });
	 //Get Admin Side Coach Subscriptions
    $scope.doGetCoachSubscriptions=function(){
        $scope.loaded=true;

        $scope.params={
			"limit":$scope.pagination.itemsPerPage,
			"offset":($scope.pagination.pageNumber-1)*$scope.pagination.itemsPerPage,
			"coachid":$routeParams.id,
			"searchname":""
		};
        requestHandler.postRequest("admin/individualcoachsubscriptions/",$scope.params).then(function(response){
            $scope.subscriptionHistoryList=response.data;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
    };

    //Initialize
    $scope.init=function(){        
        $scope.pagination={"itemsPerPage":10,"pageNumber":1};  
    }

    $scope.$watch("pagination.pageNumber",function(){
            $scope.doGetCoachSubscriptions();
    });

}]);

//All Coach Subscriptions
adminApp.controller('CoachSubscriptionController',['$scope','requestHandler','Flash','coachMenuService','$location','$routeParams',function($scope,requestHandler,Flash,coachMenuService,$location,$routeParams) {

    // For coach management side menu
    $scope.coachMenuList = coachMenuService;
    $.each($scope.coachMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });


     //Get Admin Side Coach Subscriptions
    $scope.doGetAllCoachSubscriptions=function(){
        $scope.loaded=true;

        $scope.params={
            "limit":$scope.pagination.itemsPerPage,
            "offset":($scope.pagination.pageNumber-1)*$scope.pagination.itemsPerPage,
            "coachid":$routeParams.id,
            "searchname":""
        };
        if($scope.showOnlyExpiring){
            requestHandler.postRequest("admin/expiringsubscriptions/",$scope.params).then(function(response){
            $scope.subscriptionHistoryList=response.data;
            $scope.loaded=false;
            $scope.paginationLoad=true;
         });
        }else{
            requestHandler.postRequest("admin/getallsubscriptions/",$scope.params).then(function(response){
            $scope.subscriptionHistoryList=response.data;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
        }
     
    };

    //Initialize
    $scope.init=function(){        
        $scope.pagination={"itemsPerPage":10,"pageNumber":1};  
        $scope.showOnlyExpiring=false;
    }

    $scope.$watch("pagination.pageNumber",function(){
            $scope.doGetAllCoachSubscriptions();
    });

}]);