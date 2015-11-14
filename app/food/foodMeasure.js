/**
 * Created by Deemsys on 09-Oct-15.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate'/*,'angularFileUpload'*/]);
adminApp.controller('FoodMeasureController',function($scope,requestHandler,Flash) {
    $scope.activeClass = {measure:'active'};
    $scope.isNew = true;
    $scope.title = "Add Measure";
var original ="";
    //Reset Scope
    $scope.reset=function(){
        $scope.list={};
        $scope.measureForm.$setPristine();
        $scope.list.measurename="";

    };

    //View All Measure
    $scope.doViewAllFoodMeasure=function(){
        $scope.loaded=true;
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
                if(response.data.Response_status==0){
                    errorMessage(Flash,"Measure&nbsp;already&nbsp;exists");
                }
                else if(response.data.Response_status==1){
                    $scope.doViewAllFoodMeasure();
                    successMessage(Flash,"Successfully Added");
                }

        });
    };

    $scope.doEditFoodMeasure=function(id){
        $scope.isNew = false;
        $scope.title = "Edit Measure";

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#measure").fadeIn(600);
            $(".common_model").show();
        });

        $scope.loaded=true;
        requestHandler.postRequest("admin/getfoodMeasurebyId/",{'measureid':id}).then(function(response){
            original=angular.copy(response.data.Food_Measure);
            $scope.list=response.data.Food_Measure;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#measure").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#measure").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.doUpdateMeasure=function(){
        requestHandler.putRequest("admin/updatefoodMeasure/",$scope.list).then(function(response){
            if(response.data.Response_status==0){
                $scope.doViewAllFoodMeasure();
                errorMessage(Flash,"Measure&nbsp;mapped&nbsp;with&nbsp;food");
            }
            if(response.data.Response_status==1){
            $scope.doViewAllFoodMeasure();
            successMessage(Flash,"Successfully Added");
            }
        },  function () {
            errorMessage(Flash, "Please try again later!")
        });

    };

    //Enable or Disable Measure
    $scope.doEnableDisable= function (id) {
       requestHandler.postRequest("admin/enableordisableFoodMeasure/",{'measureid':id}).then(function(response){
           if(response.data.Response_status==0){
               $scope.doViewAllFoodMeasure();
               errorMessage(Flash,"Measure&nbsp;used&nbsp;by&nbsp;food");
           }
           if(response.data.Response_status==1){
            $scope.doViewAllFoodMeasure();
            successMessage(Flash,"Successfully Done");
           }
        },  function () {
            errorMessage(Flash, "Please try again later!")
        });
    };



    //Initial Load//Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doViewAllFoodMeasure();
    };

    $scope.isClean =function()
    {
        return angular.equals(original, $scope.list);
    };
});