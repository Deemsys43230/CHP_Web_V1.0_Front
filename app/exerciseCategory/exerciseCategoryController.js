
/**
 * Created by Deemsys on 8/6/17.
 */

var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('ExerciseCategoryController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
//For active class
    $scope.activeClass = {exercisecategory:'active'};
    var original ="";

//Get All Exercise Category List
    $scope.doGetAllExerciseCategory=function(){

        $scope.loaded=true;
        requestHandler.getRequest("admin/listofCategories/","").then(function(response){
            $scope.exerciseCategoryList=response.data.Category;
            $scope.loaded=false;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };



    // Search Exercise Category
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });

   //To Add Exercise Category
    $scope.doAddExerciseCategory=function(){
        $scope.loaded=true;


        requestHandler.postRequest("admin/insertorupdateExerciseCategory/",$scope.exerciseCategory).then(function (response) {
            if(response.data.Response_status==0){
                errorMessage(Flash,"Exercise&nbsp;Category&nbsp;already&nbsp;exists");
            }
            else if(response.data.Response_status==1){
                $scope.doGetAllExerciseCategory();
                successMessage(Flash,"Exercise Category Successfully Added");
                $scope.loaded=false;
                $scope.paginationLoad=true;
            }

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doViewExerciseCategory=function(id){
        $scope.title = "View Exercise Category";

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#exerciseCategoryView").fadeIn(600);
            $(".common_model").show();
        });

        $scope.loaded=true;
        requestHandler.postRequest("admin/getCategoryDetail/",{'categoryid':id}).then(function(response){
            $scope.exerciseCategory=response.data.IndividualtypeData;
            $scope.loaded=false;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#exerciseCategoryView").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#exerciseCategoryView").hide();
            $("#lean_overlay").hide();
        });
    };


 //To get exercise category detail using categoryId
    $scope.doEditExerciseCategory=function(id){
        $scope.isNew = false;
        $scope.title = "Edit Exercise Category";
        $scope.exerciseCategoryAddForm.$setPristine();

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#exerciseCategory").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $scope.loaded=true;
        requestHandler.postRequest("admin/getCategoryDetail/",{'categoryid':id}).then(function(response){
            original=angular.copy(response.data.Category);
            $scope.exerciseCategory=response.data.Category;

            $scope.loaded=false;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#exerciseCategory").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#exerciseCategory").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
    };
//TO Update exercise Category
    $scope.doUpdateExerciseCategory=function(){
        $scope.loaded=true;

        delete $scope.exerciseCategory.status;
        requestHandler.postRequest("admin/insertorupdateExerciseCategory/",$scope.exerciseCategory).then(function (response) {
            $scope.loaded=false;
            $scope.paginationLoad=true;
            if(response.data.Response_status==0){
                $scope.doGetAllExerciseCategory();
                errorMessage(Flash,"Exercise already used, can't updated!")
            }
            if(response.data.Response_status==1){
                $scope.doGetAllExerciseCategory();
                successMessage(Flash,"Exercise Category Successfully Updated");
            }
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });

    };
  //To enable or disable exercise Category
    $scope.doEnableDisableExerciseCategory=function(id){

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }

        $scope.loaded=true;
        requestHandler.postRequest("admin/enableordisableCategory/",{'categoryid':id}).then(function(response){
            $scope.loaded=false;
            if(response.data.Response_status==0){
                $scope.doGetAllExerciseCategory();
                errorMessage(Flash,"Exercise Category mapped, can't disable!")
            }
            if(response.data.Response_status==1){
                $scope.doGetAllExerciseCategory();
                successMessage(Flash,"Exercise Category Successfully Updated");
            }
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };
  //To delete exercise category
    $scope.doDeleteExerciseCategory = function(id){

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }

        $scope.loaded=true;
        requestHandler.postRequest("admin/deleteCategory/",{'categoryid':id}).then(function(response){
            $scope.loaded=false;

            if(response.data.Response_status==0){
                $scope.doGetAllExerciseCategory();
                errorMessage(Flash,"Exercise category mapped, can't delete!");
            }
            if(response.data.Response_status==1){
                successMessage(Flash,"Exercise Category Successfully Deleted");
                $scope.doGetAllExerciseCategory();
            }

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.reset=function(){
        $scope.exerciseCategory={};
        $scope.exerciseCategory.categoryname="";
        $scope.title = "Add Exercise Category";
        $scope.isNew = true;
        $scope.exerciseCategoryAddForm.$setPristine();
        $(function(){
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });
    };

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetAllExerciseCategory();
    };

    $scope.init();

    $scope.isClean=function(){
        return angular.equals(original, $scope.exerciseCategory);
    };


    $scope.verifyDuplicate = function() {
        var sorted, i ;
        sorted = $scope.inputs.concat().sort(function (a, b) {
            if (a.levelname > b.levelname) return 1;
            if (a.levelname < b.levelname) return -1;
            return 0;
        });
        for(i = 0; i < $scope.inputs.length; i++) {
            sorted[i].isDuplicate = ((sorted[i-1] && sorted[i-1].levelname == sorted[i].levelname) || (sorted[i+1] && sorted[i+1].levelname == sorted[i].levelname));
            $scope.error=sorted[i].isDuplicate;
        }
    };

}]);

