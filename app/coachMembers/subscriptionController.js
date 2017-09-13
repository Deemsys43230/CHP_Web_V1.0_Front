var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

coachApp.controller('SubscriptionController',['$scope','requestHandler','Flash','$routeParams','$timeout','$location',function($scope,requestHandler,Flash,$routeParams,$timeout,$location){
    
    $scope.activeClass.sub='active';

    $scope.doGetPricingPlans = function() {

      requestHandler.getRequest("getactivePricingPlans/","").then(function(response){
          $scope.pricingPlanDetails = response.data.PricingPlans;
          requestHandler.getRequest("/coach/isSubscriptionActive/","").then(function(response){
              $scope.currentActivePlan=response.data;
              $.each($scope.pricingPlanDetails,function(index,value){
                if(value.id==$scope.currentActivePlan.subscription.planchoice){
                  if($scope.currentActivePlan.isActive==1){
                    value.currentActivePlan=true;                    
                    value.isActive=true;
                  }else{
                    value.isActive=false;
                  }
                }else{
                  value.currentActivePlan=false;
                }
              });
          });
       });
    };

    //For USA and metric button 
    $scope.units=1;
    $scope.test=function(unitVar){
       if(unitVar=='mUnit'){
        $scope.units=1;
       }
       else if(unitVar){
        $scope.units=2;
       }
    };


    //For Subscription create Order Razor Payment

    $scope.doGetSubscirbeCreateRazor = function(Id) {
    $scope.PlanChoiceId = Id;
   requestHandler.postRequest("coach/subscribenowrazor/",{'planchoiceid':$scope.PlanChoiceId}).then(function(response){
        $scope.subscriptionOrderDetails = response.data.orderdetail;

        var options = {
        "key": $scope.subscriptionOrderDetails.key,
        "name": $scope.subscriptionOrderDetails.name,
        "description": $scope.subscriptionOrderDetails.description,
        "image": $scope.subscriptionOrderDetails.image,
        "order_id":$scope.subscriptionOrderDetails.orderid,
        "handler": function (response){
            $scope.razorPaymentId = response.razorpay_payment_id;   
            $scope.paymentSuccess($scope.razorPaymentId);
            console.log($scope.razorPaymentId);
        },
        "notes": {
            "planchoiceid": $scope.PlanChoiceId
        },
        "theme": {
            "color": "#f8ba01"
        }
      };

      //Lets Call Razor Pay
        var rzpay = new Razorpay(options);
        rzpay.open();

      },function(){
          errorMessage(Flash,"Please try again later!")
      });   

    };


    //Authorize.net Payment Model
    $scope.authorizePaymentModel=function(Id,DiscountPrice){
      $scope.PlanChoiceId = Id;
      $scope.PlanChoicePriceUSD = DiscountPrice;
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#authorize-details-modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#authorize-details-modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#authorize-details-modal").hide();
            $("#lean_overlay").hide();
        });

        //Scroll to top after model opens
        $('html, body').animate({scrollTop: '0px'}, 500);
    };

    // For Post Coach Card Details for authorize .net payment
     $scope.doGetSubscirbeCreateAuthorizeNet = function() {

        $scope.authorize.planchoiceid =$scope.PlanChoiceId;
        $scope.authorize.expirationDate = $scope.authorize.expirationDate_mm+$scope.authorize.expirationDate_yy.toString().substr(-2);
        requestHandler.postRequest("coach/subscribenowauthorizenet/",$scope.authorize).then(function(response){

          if(response.data.Response_status == 0){
            errorMessage(Flash,"The transaction was unsuccessful.");
          }else{
             $(".common_model").hide();
            $("#authorize-details-modal").hide();
            $("#lean_overlay").hide();
            window.location.href="#/subscription-payments";
            $scope.authorize={};
            $scope.cardDetailsForm.$setPristine();
          }
      });  
    };


    $scope.paymentSuccess=function(razorPaymentId){
      window.location.href="#/subscription-razor-payments/"+razorPaymentId;
    };

    $scope.init = function() {
    
      $scope.doGetPricingPlans();
        
    };


  $scope.init();
     //$scope.doGetPricingPlans();

}]);


