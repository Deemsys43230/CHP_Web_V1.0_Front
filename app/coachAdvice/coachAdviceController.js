var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

coachApp.controller('CoachAdviceController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {


    var original="";
    $scope.doGetCoachMyAdvice=function(){
        requestHandler.getRequest("coach/getCoachAdvicesByCoach/", "").then(function(response){

            original=angular.copy(response.data.User_Settings);
            $scope.myadvice=response.data.User_Settings;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doInsertOrUpdateMyAdvice=function(){

        requestHandler.postRequest("coach/insertorupdatecoachadvices/",$scope.myadvice).then(function(response){
            console.log(response);
            $scope.doGetCoachMyAdvice();
            successMessage(Flash,"Successfully Updated");
        }, function () {
            errorMessage(Flash, "Please try again later!")

        });
    };

    $scope.doEnableDisableMyAdvice=function(){

        requestHandler.putRequest("coach/updateCoachAdvicesStatus/","").then(function(response){

            $scope.doGetCoachMyAdvice();
            successMessage(Flash,"Successfully Updated");
        }, function () {
            errorMessage(Flash, "Please try again later!")

        });
    };

    $scope.isClean=function(){
        return angular.equals(original, $scope.myadvice);
    };

    // Display Terms of Use details On Page Load
    $scope.doGetCoachMyAdvice();

}]);

