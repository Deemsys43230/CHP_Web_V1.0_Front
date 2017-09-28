var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

coachApp.controller('CoachAdviceController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    $scope.activeClass.assessments='active';
    var original="";
    $scope.doGetCoachMyAdvice=function(){
        requestHandler.getRequest("coach/getquote/", "").then(function(response){

            original=angular.copy(response.data.quote);
            $scope.myadvice=response.data.quote;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doInsertOrUpdateMyAdvice=function(){

        requestHandler.postRequest("coach/updatequote/",$scope.myadvice).then(function(response){
            $scope.doGetCoachMyAdvice();
            successMessage(Flash,"Successfully Updated");
        }, function () {
            errorMessage(Flash, "Please try again later!")

        });
    };

    $scope.doEnableDisableMyAdvice=function(){

        requestHandler.getRequest("coach/enableordisablequote/","").then(function(response){

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

