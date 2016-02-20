var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('FoodCategoryController',function($scope,requestHandler,Flash) {
    $scope.activeClass = {category:'active'};
    $scope.isNew = true;
    $scope.title = "Add Category";
    var original ="";

    $scope.doGetAllFoodCategory=function(){
        $scope.loaded=true;

        requestHandler.getRequest("admin/getFoodCategory/","").then(function(response){
            $scope.foodCategoryList=response.data.Food_Category;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    // Search food category
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });

    $scope.doAddFoodCategory=function(){
        $scope.loaded=true;
        requestHandler.postRequest("admin/checkCategoryNameExists/",$scope.foodCategory).then(function(response){
            if(response.data.Response_status == 1){
                errorMessage(Flash,"Category&nbsp;already&nbsp;exists");
                $scope.loaded=false;
            }
            else if(response.data.Response_status == 0){
                requestHandler.postRequest("admin/insertFoodCategory/",$scope.foodCategory).then(function (response) {

                    $scope.doGetAllFoodCategory();
                    successMessage(Flash,"Successfully Added");
                    $scope.loaded=false;
                    $scope.paginationLoad=true;
                }, function () {
                    errorMessage(Flash, "Please try again later!")
                });
            }
        });

    };

    $scope.doEditFoodCategory=function(id){
        $scope.isNew = false;
        $scope.title = "Edit Category";
        $scope.foodCategoryAddForm.$setPristine();

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#category").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $scope.loaded=true;
        requestHandler.postRequest("admin/getfoodCategorybyId/",{'categoryid':id}).then(function(response){
            original=angular.copy(response.data.Food_Category);
            $scope.foodCategory=response.data.Food_Category;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#category").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#category").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
  };

    $scope.doUpdateFoodCategory=function(){
        $scope.loaded=true;
        requestHandler.postRequest("admin/checkCategoryNameExists/",$scope.foodCategory).then(function(response){
            if(response.data.Response_status==0){
                requestHandler.putRequest("admin/editFoodCategory/",$scope.foodCategory).then(function (response) {
                    $scope.doGetAllFoodCategory();
                    successMessage(Flash,"Successfully Updated");
                    $scope.loaded=false;
                    $scope.paginationLoad=true;
                }, function () {
                    errorMessage(Flash, "Please try again later!");
                });
            }
            else if(response.data.Response_status==1){
                errorMessage(Flash, "Category&nbsp;already&nbsp;exists");
                $scope.loaded=false;
            }

        });


    };

    $scope.doEnableDisableFoodCategory=function(id){
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
        $scope.loaded=true;
        requestHandler.putRequest("admin/enableOrDisableCategoryStatus/",{'categoryid':id}).then(function(response){
            $scope.loaded=false;
            if(response.data.Response_status==0){
            $scope.doGetAllFoodCategory();
            errorMessage(Flash,"Category&nbsp;Paired&nbsp;with&nbsp;other&nbsp;food")
            }
            if(response.data.Response_status==1){
                $scope.doGetAllFoodCategory();
            successMessage(Flash,"Successfully Updated");
            }
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doDeleteFoodCategory = function(id){
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
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
        $scope.foodCategory.categoryname="";
        //$scope.foodCategoryEditForm.$setPristine();
        $scope.title = "Add Category";
        $scope.isNew = true;

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
        }

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#category").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#category").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#category").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
    };

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetAllFoodCategory();
    };

    $scope.isClean=function(){
        return angular.equals(original, $scope.foodCategory);
    }

});