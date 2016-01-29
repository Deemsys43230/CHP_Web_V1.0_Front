var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('ExerciseTypeController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash,$location) {

    $scope.activeClass = {exercisetype:'active'};
    var original ="";

    $scope.doGetAllExerciseType=function(){

        $scope.loaded=true;
        requestHandler.getRequest("admin/listofTypes/","").then(function(response){
            $scope.exerciseTypeList=response.data.ExerciseType_Data;
            $scope.loaded=false;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };



    // Search Exercise Type
    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });


    $scope.doAddExerciseType=function(){
        $scope.loaded=true;


        requestHandler.postRequest("admin/insertorupdateExerciseType/",$scope.exerciseType).then(function (response) {
            if(response.data.Response_status==0){
                errorMessage(Flash,"Exercise&nbsp;Type&nbsp;already&nbsp;exists");
            }
            else if(response.data.Response_status==1){
                $scope.doGetAllExerciseType();
                successMessage(Flash,"Exercise Type Successfully Added");
                $scope.loaded=false;
                $scope.paginationLoad=true;
            }

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doViewExerciseType=function(id){
        $scope.title = "View Exercise Type";

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#exerciseTypeView").fadeIn(600);
            $(".common_model").show();
        });

        $scope.loaded=true;
        requestHandler.postRequest("admin/gettypeIndividualDetail/",{'typeid':id}).then(function(response){
            $scope.exerciseType=response.data.IndividualtypeData;
            $scope.loaded=false;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#exerciseTypeView").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#exerciseTypeView").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.doEditExerciseType=function(id){
        $scope.isNew = false;
        $scope.title = "Edit Exercise Type";
        $scope.nameAlreadyExist=false;

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#exerciseType").fadeIn(600);
            $(".common_model").show();
        });

        $scope.loaded=true;
        requestHandler.postRequest("admin/getTypeDetail/",{'typeid':id}).then(function(response){
            original=angular.copy(response.data.ExerciseType_Data);
            $scope.exerciseType=response.data.ExerciseType_Data;

            $scope.loaded=false;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#exerciseType").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#exerciseType").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.doUpdateExerciseType=function(){
        $scope.loaded=true;

delete $scope.exerciseType.status;
        requestHandler.postRequest("admin/insertorupdateExerciseType/",$scope.exerciseType).then(function (response) {
            $scope.loaded=false;
            $scope.paginationLoad=true;
            if(response.data.Response_status==0){
                $scope.doGetAllExerciseType();
                errorMessage(Flash,"Exercise already used, can't updated!")
            }
            if(response.data.Response_status==1){
                $scope.doGetAllExerciseType();
                successMessage(Flash,"Exercise Type Successfully Updated");
            }
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });

    };

    $scope.doEnableDisableExerciseType=function(id){

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }

        $scope.loaded=true;
        requestHandler.postRequest("admin/enableordisableExerciseType/",{'typeid':id}).then(function(response){
            $scope.loaded=false;
            if(response.data.Response_status==0){
                $scope.doGetAllExerciseType();
                errorMessage(Flash,"Exercise Type Paired with other exercise!")
            }
            if(response.data.Response_status==1){
                $scope.doGetAllExerciseType();
                successMessage(Flash,"Exercise Type Successfully Updated");
            }
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doDeleteExerciseType = function(id){

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }

        $scope.loaded=true;
        requestHandler.postRequest("admin/deleteExerciseTypeAndLevel/",{'typeid':id}).then(function(response){
            $scope.loaded=false;

            if(response.data.Response_status==0){
                $scope.doGetAllExerciseType();
                errorMessage(Flash,"Exercise already used, can't delete!");
            }
            if(response.data.Response_status==1){
                 successMessage(Flash,"Exercise Type Successfully Deleted");
                $scope.doGetAllExerciseType();
               // $location.path("exerciseType");
            }

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.reset=function(){
        $scope.exerciseType={};
        $scope.inputs = [{
            "levelname": ""
            }
        ];
        $scope.title = "Add Exercise Type";
        $scope.isNew = true;
        $scope.exerciseTypeAddForm.$setPristine();
        $(function(){
            $(".common_model").show();
        });
        $scope.nameAlreadyExist=false;
    };

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetAllExerciseType();
    };

    $scope.init();

    $scope.isClean=function(){
        return angular.equals(original, $scope.exerciseType);
    };


    $scope.verifyDuplicate = function() {
       // alert("hi");
        var sorted, i ;
        //console.log("normal",$scope.inputs);
        sorted = $scope.inputs.concat().sort(function (a, b) {
            if (a.levelname > b.levelname) return 1;
            if (a.levelname < b.levelname) return -1;
            return 0;
        });
       //console.log("sorted",sorted);
        for(i = 0; i < $scope.inputs.length; i++) {
            sorted[i].isDuplicate = ((sorted[i-1] && sorted[i-1].levelname == sorted[i].levelname) || (sorted[i+1] && sorted[i+1].levelname == sorted[i].levelname));
            $scope.error=sorted[i].isDuplicate;
        }
  };

}]);
