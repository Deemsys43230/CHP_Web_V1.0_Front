var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('IndividualCoachSubscriptionController',['$scope','requestHandler','Flash','coachMenuService','$location','$routeParams',function($scope,requestHandler,Flash,coachMenuService,$location,$routeParams) {

	// For coach management side menu
    $scope.coachMenuList = coachMenuService;
    $.each($scope.coachMenuList,function(index,value){
        if(value.id==2){
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
        if(value.id==3){
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

adminApp.controller('CoachSubscriptionViewController',['$scope','requestHandler','Flash','coachMenuService','$location','$routeParams',function($scope,requestHandler,Flash,coachMenuService,$location,$routeParams) {

    $scope.processMenu=true;
    //Fro Menu active and back button   
   if($routeParams.from=="coach-list"){
        $scope.selectedMenuId=2;
        $scope.backTo="#coach";
    }else if($routeParams.from=="subscription-list"){
        $scope.selectedMenuId=3;
        $scope.backTo="#coach-subscriptions";
    }else if($routeParams.from=="coach-payments"){
        $scope.processMenu=false;
        $scope.backTo="#coach-payment";
    }else if($routeParams.from=="failed-payments"){
        $scope.processMenu=false;
        $scope.backTo="#failed-payment";
    }

    // For coach management side menu
    if($scope.processMenu){
    $scope.coachMenuList = coachMenuService;
    $.each($scope.coachMenuList,function(index,value){
        if(value.id==$scope.selectedMenuId){
            value.active = "active";
        }
        else value.active = ""
    });
    }
   

//For admin subscription detail
/*    $scope.params={
        "paymentid":$routeParams.id
    };*/
    $scope.doViewAdminSubscriptionsDetails=function(){
        $scope.loaded=true;
        requestHandler.postRequest("admin/adminsubscriptiondetail/",{"paymentid":$routeParams.id}).then(function(response){
            $scope.subscriptionHistory=response.data.subscriptionhistory;
            $scope.paymentHistory=response.data.paymenthistory;
            $scope.loaded=false;
        });
    };
    //Initialize
        $scope.doViewAdminSubscriptionsDetails();

}]);
