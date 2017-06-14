/**
 * Created by Deemsys on 8/6/17.
 */

var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('ExerciseLevelController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
//For active class
    $scope.activeClass = {exerciselevel:'active'};
    var original ="";

  //Get All Exercise Level List
    $scope.doGetAllExerciseLevel=function(){

        $scope.loaded=true;
        requestHandler.getRequest("admin/listofLevels/","").then(function(response){
            $scope.exerciseLevelList=response.data.ExerciseLevel_Data;
            $scope.loaded=false;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };



    // Search Exercise Level
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });

    //To Add Exercise Level
    $scope.doAddExerciseLevel=function(){
        $scope.loaded=true;


        requestHandler.postRequest("admin/insertorupdateExerciseLevel/",$scope.exerciseLevel).then(function (response) {
            if(response.data.Response_status==0){
                errorMessage(Flash,"Exercise&nbsp;Level&nbsp;already&nbsp;exists");
            }
            else if(response.data.Response_status==1){
                $scope.doGetAllExerciseLevel();
                successMessage(Flash,"Exercise Level Successfully Added");
                $scope.loaded=false;
                $scope.paginationLoad=true;
            }

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };


    //To get exercise category detail using levelId
    $scope.doEditExerciseLevel=function(id){
        $scope.isNew = false;
        $scope.title = "Edit Exercise Level";
        $scope.exerciseLevelAddForm.$setPristine();

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#exerciseLevel").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $scope.loaded=true;
        requestHandler.postRequest("admin/getLevelDetail/",{'levelid':id}).then(function(response){
            original=angular.copy(response.data.ExerciseLevel_Data);
            $scope.exerciseLevel=response.data.ExerciseLevel_Data;

            $scope.loaded=false;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#exerciseLevel").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#exerciseLevel").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
    };

//TO Update exercise Level
    $scope.doUpdateExerciseCategory=function(){
        $scope.loaded=true;

        delete $scope.exerciseLevel.status;
        requestHandler.postRequest("admin/insertorupdateExerciseLevel/",$scope.exerciseLevel).then(function (response) {
            $scope.loaded=false;
            $scope.paginationLoad=true;
            if(response.data.Response_status==0){
                $scope.doGetAllExerciseLevel();
                errorMessage(Flash,"Exercise already used, can't updated!")
            }
            if(response.data.Response_status==1){
                $scope.doGetAllExerciseLevel();
                successMessage(Flash,"Exercise Level Successfully Updated");
            }
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });

    };
    //To enable or disable exercise Level
    $scope.doEnableDisableExerciseLevel=function(id){

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }

        $scope.loaded=true;
        requestHandler.postRequest("admin/enableordisableLevel/",{'levelid':id}).then(function(response){
            $scope.loaded=false;
            if(response.data.Response_status==0){
                $scope.doGetAllExerciseLevel();
                errorMessage(Flash,"Exercise Level mapped, can't disable!")
            }
            if(response.data.Response_status==1){
                $scope.doGetAllExerciseLevel();
                successMessage(Flash,"Exercise Level Successfully Updated");
            }
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };
    //To delete exercise level
    $scope.doDeleteExerciseLevel = function(id){

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }

        $scope.loaded=true;
        requestHandler.postRequest("admin/deleteLevel/",{'levelid':id}).then(function(response){
            $scope.loaded=false;

            if(response.data.Response_status==0){
                $scope.doGetAllExerciseLevel();
                errorMessage(Flash,"Exercise Level mapped, can't delete!");
            }
            if(response.data.Response_status==1){
                successMessage(Flash,"Exercise Level Successfully Deleted");
                $scope.doGetAllExerciseLevel();
            }

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.reset=function(){
        $scope.exerciseLevel={};
        $scope.exerciseLevel.levelname="";
        $scope.title = "Add Exercise Level";
        $scope.isNew = true;
        $scope.exerciseLevelAddForm.$setPristine();
        $(function(){
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });
    };

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetAllExerciseLevel();
    };

    $scope.init();

    $scope.isClean=function(){
        return angular.equals(original, $scope.exerciseLevel);
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

