/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('FAQController',function($scope,requestHandler,Flash){

    $scope.activeClass = {faq:'active'};

    $scope.doGetAllFAQ=function(){
        requestHandler.getRequest("admin/getFAQList","").then(function(response){

            $scope.faqList=response.data.Faq_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doAddFAQ=function() {
        requestHandler.postRequest("admin/insertorupdateFAQList/",$scope.faq).then(function (response) {
            $scope.doGetAllFAQ();
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doUpdateFAQ=function(id){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal-edit").fadeIn(600);
            $(".common_model").show();
        });

        requestHandler.getRequest("admin/getFAQListById/"+id,"").then(function(response){
            $scope.faq=response.data.Faq_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#modal-edit").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#modal-edit").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.doEnableDisable=function(id){
        requestHandler.postRequest("admin/disableFAQList/",{'faqid':id}).then(function(response){

            $scope.doGetAllFAQ();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetFAQByID=function(id){
        requestHandler.getRequest("admin/getFAQListById/"+id,"").then(function(response){
            $scope.faq=response.data.Faq_Data;
            },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //Initial Load
    $scope.doGetAllFAQ();

});