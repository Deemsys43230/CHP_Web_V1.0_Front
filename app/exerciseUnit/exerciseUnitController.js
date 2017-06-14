/**
 * Created by Deemsys on 9/6/17.
 */


var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('ExerciseUnitController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
//For active class
    $scope.activeClass = {exerciseunit:'active'};
    var original ="";

    //Get All Exercise Unit List
    $scope.doGetAllExerciseUnit=function(){

        $scope.loaded=true;
        requestHandler.getRequest("admin/getexerciseunits/","").then(function(response){
            $scope.exerciseUnitList=response.data.units;
            $scope.loaded=false;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };



    // Search Exercise Unit
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });


    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetAllExerciseUnit();
    };

    $scope.init();


}]);

