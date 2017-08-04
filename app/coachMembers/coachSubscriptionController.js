/**
 * Created by Deemsys on 3/19/2016.
 */
var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

coachApp.controller('CoachSubscriptionController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {
    $scope.activeClass.coach='active';

    $scope.planId = $routeParams.id;


    // Get Coach is Subscription Active
    $scope.doGetCoachSubscription = function() {
      requestHandler.getRequest("coach/isSubscriptionActive/","").then(function(response){
        $scope.responseStatus = response.data;
        if (response.data.Response_status == 1) {
          $location.path('my-members');
        };
      },function() {
        errorMessage(Flash,"Please try again later!");
      });
    };

    $scope.doGetPricingPlans = function() {
      requestHandler.getRequest("getactivePricingPlans/","").then(function(response){
          $scope.pricingPlanDetails = response.data.PricingPlans;
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


    //Alert Payment Model
  /*  $scope.paymentModel=function(Id){
        $scope.PlanChoiceId = Id;
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#select-payment-modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#select-payment-modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#select-payment-modal").hide();
            $("#lean_overlay").hide();
        });

        //Scroll to top after model opens
        $('html, body').animate({scrollTop: '0px'}, 500);

    };
*/
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
      alert("ok");
    };

    $scope.init = function() {
      $scope.doGetPricingPlans();
      $scope.doGetCoachSubscription();
    };

    $scope.init();


}]);