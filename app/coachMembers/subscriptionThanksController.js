var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule']);
coachApp.controller('ThanksRazorSubscribePageController',['$scope','requestHandler','$location','$routeParams',function($scope,requestHandler,$location,$routeParams) {
    
	
	
	//For Insert Order  Razor payment
    $scope.doGetSubscirbeInsertRazor = function() {
      requestHandler.postRequest("coach/subscribenowrazorpayment/",{'paymentid':$routeParams.payid}).then(function(response){
        // $scope.SubscriptionInsertDetails = response.data;
        if (response.data.Response_status == 1) {
            
            window.setTimeout(function(){
                $scope.paymentSuccess = true;
                $scope.displayMessage="Payment Successfull!";
            },5000);
            window.setTimeout(function(){
                window.location.href="#/my-members"; 
            },10000);
       
        };

      });
    };

    //Initialize
    $scope.init=function(){
    	$scope.displayMessage="WE ARE PROCESSING YOUR PAYMENT";
    	$scope.doGetSubscirbeInsertRazor();
    };

    $scope.init();
}]);


coachApp.controller('AuthorizeThanksSubscribePageController',['$scope','requestHandler','$location','$routeParams',function($scope,requestHandler,$location,$routeParams) {

        $scope.paymentSuccessAuthorizeNet=function(){
            window.setTimeout(function(){
                window.location.href="#/my-members";  
            },5000); 
        };

        $scope.init = function() {
            $scope.paymentSuccess = true;
            $scope.displayMessage="PAYMENT SUCCESSFULL!";
             $scope.paymentSuccessAuthorizeNet();
        };

        $scope.init();
}]);