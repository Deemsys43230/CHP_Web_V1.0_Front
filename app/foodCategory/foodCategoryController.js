var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('FoodCategoryController',function($scope,requestHandler,Flash) {
    $scope.activeClass = {category:'active'};

    $scope.doGetAllFoodCategory=function(){
        $scope.loaded=true;

        requestHandler.getRequest("admin/getFoodCategory/","").then(function(response){
            $scope.foodCategoryList=response.data.Food_Category;
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doAddFoodCategory=function(){
        $scope.loaded=true;
        requestHandler.postRequest("admin/insertFoodCategory/",$scope.foodCategory).then(function (response) {

            $scope.doGetAllFoodCategory();
            successMessage(Flash,"Successfully Added");
            $scope.loaded=false;
            $scope.paginationLoad=true;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doEnableDisableFoodCategory=function(id){
        $scope.loaded=true;
        requestHandler.putRequest("admin/enableOrDisableCategoryStatus/",{'categoryid':id}).then(function(response){
            $scope.loaded=false;
            $scope.doGetAllFoodCategory();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doDeleteFoodCategory = function(id){
        $scope.loaded=true;
        requestHandler.deleteRequest("admin/deleteFoodCategory/",{'categoryid':id}).then(function(response){
            $scope.loaded=false;

            if(response.data.Response_status==0){
                $scope.doGetAllFoodCategory();
                errorMessage(Flash,"Having&nbsp;foods&nbsp;can't&nbsp;delete");
            }
            if(response.data.Response_status==1){
                $scope.doGetAllFoodCategory();
                successMessage(Flash,"Successfully Updated");
            }

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.reset=function(){
        $scope.foodCategory={};
        $scope.foodCategoryAddForm.$setPristine();
        //$scope.foodCategoryEditForm.$setPristine();
    };
    $scope.doGetAllFoodCategory();


});
