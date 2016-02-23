/**
 * Created by user on 26-09-2015.
 */

var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

coachApp.controller('CoachSubscriptionController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
//sidebar menu active class
    $scope.activeClass = {subscriptionPanel:'active'};

    /*$("#threemonth").prop('required',false);
    $("#sixmonth").prop('required',false);*/


    var original="";
    $scope.doGetCoachSubscriptionDetails = function(){

        requestHandler.getRequest("coachSubscriptionDetail/","").then(function(response){

            $scope.subscriptionDetail=response.data['Coach Subscription Detail'][0];
            if($scope.subscriptionDetail.onemonth_amount==0){
                $scope.subscriptionDetail.onemonth_amount="";
            }

            $scope.subscriptionDetail.onemonth_amount=$scope.subscriptionDetail.onemonth_amount.toString();

            if($scope.subscriptionDetail.threemonth_percentage!=null){

               $scope.subscriptionDetail.threemonth_percentage=$scope.subscriptionDetail.threemonth_percentage.toString();
               $scope.disablethreemonth=true;
            }

            if($scope.subscriptionDetail.sixmonth_percentage!= null){

               $scope.subscriptionDetail.sixmonth_percentage=$scope.subscriptionDetail.sixmonth_percentage.toString();
                 $scope.disablesixmonth=true;
            }


            $scope.doCalculatesubscription();
            original=angular.copy($scope.subscriptionDetail);

        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    $scope.doUpdateSubscriptionDetails=function(){

       requestHandler.putRequest("updateSubscriptionDetailByCoach/",$scope.subscriptionDetail).then(function(response){

            successMessage(Flash,"Successfully Updated!");
            $scope.doGetCoachSubscriptionDetails();
        },function(){
            errorMessage(Flash,"Please try again later");
        });
    };

    $scope.doCalculatesubscription=function(){
        if ($scope.subscriptionDetail.onemonth_amount === undefined || $scope.subscriptionDetail.threemonth_percentage === undefined) {

            $scope.totalthreemonthamount = 0;
            $scope.percentagethreemonthamount = 0;
        } else {
            $scope.totalthreemonthamount = $scope.subscriptionDetail.onemonth_amount * 3;
            $scope.totalthreemonthamount =  $scope.totalthreemonthamount.toFixed(2);
            $scope.percentagethreemonthamount = ($scope.subscriptionDetail.onemonth_amount * 3) - ($scope.subscriptionDetail.onemonth_amount * 3 * $scope.subscriptionDetail.threemonth_percentage) / 100;
            $scope.percentagethreemonthamount = $scope.percentagethreemonthamount.toFixed(2);
        }

        if ($scope.subscriptionDetail.onemonth_amount === undefined || $scope.subscriptionDetail.sixmonth_percentage === undefined) {
            $scope.totalsixmonthamount = 0;
            $scope.percentagesixmonthamount = 0;
        } else {
            $scope.totalsixmonthamount = $scope.subscriptionDetail.onemonth_amount * 6;
            $scope.totalsixmonthamount = $scope.totalsixmonthamount.toFixed(2);
            $scope.percentagesixmonthamount = ($scope.subscriptionDetail.onemonth_amount * 6) - ($scope.subscriptionDetail.onemonth_amount * 6 * $scope.subscriptionDetail.sixmonth_percentage) / 100;
            $scope.percentagesixmonthamount =  $scope.percentagesixmonthamount.toFixed(2);
        }



    };

    $scope.doClearValue = function(){
        if($scope.disablethreemonth==false){
            $scope.subscriptionDetail.threemonth_percentage=null;
            $scope.percentagethreemonthamount=$scope.totalthreemonthamount;

        }
        if($scope.disablesixmonth==false){
            $scope.subscriptionDetail.sixmonth_percentage=null;
            $scope.percentagesixmonthamount=$scope.totalsixmonthamount;
        }

    }

    $scope.isCleanSubscriptionDetails=function(){
        return angular.equals(original, $scope.subscriptionDetail);
    };



    $scope.doGetCoachSubscriptionDetails();


}]);

