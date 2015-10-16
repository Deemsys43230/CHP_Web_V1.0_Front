/**
 * Created by Deemsys on 09-Oct-15.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate'/*,'angularFileUpload'*/]);
adminApp.controller('FoodMeasureController',function($scope,requestHandler,Flash) {
    $scope.activeClass = {measure:'active'};

    //Reset Scope
    $scope.reset=function(){
        $scope.list={};
    };

    //View All Measure
    $scope.doViewAllFoodMeasure=function(){
        $scope.loaded=true;
        $scope.reset();
        requestHandler.getRequest("admin/viewAllfoodMeasure/", "").then(function(response){
            $scope.measureList=response.data.viewAllfoodMeasure;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },  function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //Add Measure
    $scope.doAddMeasure=function(){
            requestHandler.postRequest("admin/insertfoodMeasure/",$scope.list).then(function(response){
            $scope.doViewAllFoodMeasure();
            successMessage(Flash,"Successfully Added");
        },  function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    //Enable or Disable Measure
    $scope.doEnableDisable= function (id) {
        alert(id);
            requestHandler.postRequest("admin/enableordisableFoodMeasure/",{'measureid':id}).then(function(response){
            $scope.doViewAllFoodMeasure();
            successMessage(Flash,"Successfully Done");
        },  function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    //Delete Food Measure
    $scope.doDeleteFoodMeasure=function(id){
            requestHandler.deleteRequest("",{'measureid':id}).then(function(response){
            $scope.doViewAllFoodMeasure();
            successMessage(Flash,"Deleted Successfully");
        },  function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    //Initial Load//Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doViewAllFoodMeasure();
    };

});