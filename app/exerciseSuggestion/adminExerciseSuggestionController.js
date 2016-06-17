var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','ui.bootstrap','userDashboardServiceModule']);

adminApp.controller('AdminExerciseSuggestionController',['$scope','requestHandler','Flash','UserDashboardService',function($scope,requestHandler,Flash,UserDashboardService) {
    $scope.activeClass = {adminexercisesuggestion: 'active'};
    $scope.exerciseSearchResult = [];
    $scope.userExercise={};
    //Search Function for exercise
    $scope.inputChangedExercise = function(searchStr) {
        if(searchStr.length>=3){
            $scope.loadingExercise=true;
            if($scope.exerciseSearchResult.length==0){
                $scope.loadingExercise=true;
            }
            var userExerciseDiaryDetailPromise=UserDashboardService.searchExerciseByAdmin(searchStr);
            return userExerciseDiaryDetailPromise.then(function(result){
                $scope.exerciseSearchResult=result;
                $scope.loadingExercise=false;
                return $scope.exerciseSearchResult;
            });
        }
    };

    $scope.exerciseChoices={};
    $scope.exerciseSelected=function(){
        $scope.isAddExercise=false;
        $scope.exerciseChoices.exerciseid = $scope.selectedExercise.exerciseid;
    };

    $scope.getSuggestedExercise=function(){

        delete $scope.exerciseChoices.exerciseid;
        $scope.exerciseChoices.activitytype=parseInt($scope.exerciseChoices.activitytype);
        $scope.exerciseChoices.patienttype=parseInt($scope.exerciseChoices.patienttype);
        requestHandler.postRequest("admin/getAdminExerciseSuggestions/",$scope.exerciseChoices).then(function(response){

            $scope.exerciseSuggestedList=response.data.exerciseSuggestion;
            $scope.exerciseChoices.activitytype=$scope.exerciseChoices.activitytype.toString();
            $scope.exerciseChoices.patienttype=$scope.exerciseChoices.patienttype.toString();

        });

    };

    $scope.addSuggestExercise=function(){
        $scope.exerciseChoices.activitytype=parseInt($scope.exerciseChoices.activitytype);
        $scope.exerciseChoices.patienttype=parseInt($scope.exerciseChoices.patienttype);

        requestHandler.postRequest("admin/addAdminExerciseSuggestions/",$scope.exerciseChoices).then(function(response){
            successMessage(Flash,"Successfully Added!!");
            $scope.selectedExercise="";
            $scope.isAddExercise=true;
            $scope.getSuggestedExercise();
            $scope.exerciseChoices.activitytype=$scope.exerciseChoices.activitytype.toString();
            $scope.exerciseChoices.patienttype=$scope.exerciseChoices.patienttype.toString();
        });
    };

    $scope.removeSuggestExercise=function(id){
        $scope.exerciseChoices.activitytype=parseInt($scope.exerciseChoices.activitytype);
        $scope.exerciseChoices.patienttype=parseInt($scope.exerciseChoices.patienttype);

        $scope.exerciseChoices.exerciseid = id;
        requestHandler.postRequest("admin/deleteAdminExerciseSuggestions/",$scope.exerciseChoices).then(function(response){
            successMessage(Flash,"Successfully Removed!!");
            $scope.getSuggestedExercise();
            $scope.exerciseChoices.activitytype=$scope.exerciseChoices.activitytype.toString();
            $scope.exerciseChoices.patienttype=$scope.exerciseChoices.patienttype.toString();
        });
    };

    $scope.init=function(){
        $scope.getSuggestedExercise();
        $scope.isAddExercise=true;
    };

    $scope.init();

}]);