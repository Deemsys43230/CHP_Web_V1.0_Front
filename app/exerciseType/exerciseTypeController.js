var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('ExerciseTypeController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    $scope.activeClass = {exercisetype:'active'};
    var original ="";

    $scope.doGetAllExerciseType=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/listofTypes/","").then(function(response){
            $scope.exerciseTypeList=response.data.Typelist;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    // Search Exercise Type
    $('.show-list-search').click(function() {
        $('.search-list-form').fadeIn(300);
        $('.search-list-form input').focus();
    });

    $('.search-list-form input').focusout(function() {
        $('.search-list-form').fadeOut(300);
        $scope.categorysearch="";
    });

    $scope.addInput = function(){
        $scope.inputs.push({field:''});
    };

    $scope.removeInput = function(index){
        $scope.inputs.splice(index,1);
    };

    $scope.doAddExerciseType=function(){
        $scope.loaded=true;

        var exerciseTypeObj={};
        var levelArray=new Array();

        $.each($scope.inputs, function(index,value) {
            levelArray.push(value.levelname);
        });

        exerciseTypeObj.typename=$scope.exerciseType.typename;
        exerciseTypeObj.levelname=levelArray;

        console.log(exerciseTypeObj);

        requestHandler.postRequest("admin/insertorupdateExerciseTypeAndLevel/",exerciseTypeObj).then(function (response) {
            $scope.doGetAllExerciseType();
            successMessage(Flash,"Successfully Added");
            $scope.loaded=false;
            $scope.paginationLoad=true;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doEditExerciseType=function(id){
        $scope.isNew = false;
        $scope.title = "Edit Exercise Type";

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#exerciseType").fadeIn(600);
            $(".common_model").show();
        });

        $scope.loaded=true;
        requestHandler.postRequest("admin/gettypeIndividualDetail/",{'typeid':id}).then(function(response){
            original=angular.copy(response.data.IndividualtypeData);
            $scope.exerciseType=response.data.IndividualtypeData;

            $scope.inputs = $scope.exerciseType.levels;
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

        var exerciseTypeObj={};
        var levelArray=new Array();

        $.each($scope.inputs, function(index,value) {
            levelArray.push(value.levelname);
        });

        exerciseTypeObj.typename=$scope.exerciseType.typename;
        exerciseTypeObj.levelname=levelArray;
        exerciseTypeObj.typeid=$scope.exerciseType.typeid;

        requestHandler.putRequest("admin/insertorupdateExerciseTypeAndLevel/",exerciseTypeObj).then(function (response) {
            $scope.doGetAllExerciseType();
            successMessage(Flash,"Successfully Updated");
            $scope.loaded=false;
            $scope.paginationLoad=true;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });

    };

    $scope.doEnableDisableExerciseType=function(id){
        $scope.loaded=true;
        requestHandler.postRequest("admin/enableordisableExerciseType/",{'typeid':id}).then(function(response){
            $scope.loaded=false;
            if(response.data.Response_status==0){
                $scope.doGetAllExerciseType();
                errorMessage(Flash,"Exercise Type Paired with other exercise!")
            }
            if(response.data.Response_status==1){
                $scope.doGetAllExerciseType();
                successMessage(Flash,"Successfully Updated");
            }
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doDeleteExerciseType = function(id){
        $scope.loaded=true;
        requestHandler.postRequest("admin/deleteExerciseTypeAndLevel/",{'typeid':id}).then(function(response){
            $scope.loaded=false;

            if(response.data.Response_status==0){
                $scope.doGetAllExerciseType();
                errorMessage(Flash,"Paired with other exercise, can't delete!");
            }
            if(response.data.Response_status==1){
                $scope.doGetAllExerciseType();
                successMessage(Flash,"Successfully Updated");
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

}]);
