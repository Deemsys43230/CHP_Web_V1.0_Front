/**
 * Created by Deemsys on 1/8/17.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote','angularUtils.directives.dirPagination']);
adminApp.controller('PricingPlanController',['$scope','requestHandler','Flash','$location','siteMenuService',function($scope,requestHandler,Flash,$location,siteMenuService) {
    $scope.isNew=true;
    $scope.submitContent=false;
    $scope.contentBtnTxt="Add Pricing Plan";
    $scope.title='Add Pricing Plan';
    $scope.siteMenuList = siteMenuService;

    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""

    });


    // To display Pricingplan admin view
    $scope.doGetPricingPlan=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getPricingPlans/", "").then(function(response){
            $scope.pricingplanlist=response.data.PricingPlans;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //To add coach pricingplan
    $scope.doAddCoachPricingPlan=function(){
        requestHandler.postRequest("admin/insertorupdatePricingPlan/",$scope.pricingplan).then(function(response){
            successMessage(Flash,"Successfully Added");
            $location.path("pricing-plan-list");
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
        $scope.submitContent=true;
        $scope.contentBtnTxt="Submitting...";

    };

//To Enable or Disable plan
    $scope.doEnableDisablePricingPlan=function(id){
        requestHandler.postRequest("admin/enableordisablePricingPlan/",{"id":id}).then(function(response){
            $scope.doGetPricingPlan();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

//To delete Pricing Plan
    $scope.deletePricingPlan=function(id){
        var confirmDelete=confirm("Are you sure you want to delete the Pricing Plan?");
        if(confirmDelete==true){
            requestHandler.postRequest("admin/deletePricingPlan/",{"id":id}).then(function(response){
                $scope.doGetPricingPlan();
                successMessage(Flash,"Successfully Deleted");
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        }

    };
    $scope.doGetPricingPlan();

}]);

adminApp.controller('PricingPlanEditController',['$scope','requestHandler','Flash','$location','$routeParams','siteMenuService',function($scope,requestHandler,Flash,$location,$routeParams,siteMenuService) {
    $scope.isNew=false;
    $scope.submitContent=false;

    $scope.contentBtnTxt="Save Changes";

    $scope.siteMenuList = siteMenuService;

    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""

    });
    $scope.title='Edit Pricing Plan';



    //To display pricing plan details based on
       $scope.doGetPricingPlanByID=function(id){
        requestHandler.getRequest("getPricingPlandetail/"+$routeParams.id,"").then(function(response){
            $scope.pricingplan=response.data.pricingplan;
          },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };



    //To update Pricing Plan
    $scope.doUpdatePricingPlan = function(id){

        requestHandler.postRequest("admin/insertorupdatePricingPlan/",$scope.pricingplan).then(function(response){
            successMessage(Flash,"Successfully Updated");
            $location.path("pricing-plan-list");

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });

        $scope.submitContent=true;
        $scope.contentBtnTxt="Submitting...";
    };

    $scope.doGetPricingPlanByID();


}]);
