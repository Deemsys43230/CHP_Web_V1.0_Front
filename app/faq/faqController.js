/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('FAQController',function($scope,requestHandler,Flash){

    $scope.activeClass = {faq:'active'};

    $scope.doGetAllFAQ=function(){
        $scope.loaded=true;

        requestHandler.getRequest("admin/getFAQList","").then(function(response){
            $scope.faqList=response.data.Faq_Data;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.reset=function(){
        $scope.faq={};
        $scope.faqAddForm.$setPristine();
        $scope.faqEditForm.$setPristine();
    };

    var original="";

    $scope.doAddFAQ=function() {

        $scope.loaded=true;
        requestHandler.postRequest("admin/insertorupdateFAQList/",$scope.faq).then(function (response) {
            $scope.doGetAllFAQ();
            successMessage(Flash,"Successfully Added");
            $scope.loaded=false;
            $scope.paginationLoad=true;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doUpdateFAQ=function(){

        requestHandler.putRequest("admin/insertorupdateFAQList/",$scope.faq).then(function(response){
            $scope.doGetAllFAQ();
            successMessage(Flash,"Successfully Updated");
            $scope.reset();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doEnableDisable=function(id){

        $scope.loaded=true;
        requestHandler.postRequest("admin/disableFAQList/",{'faqid':id}).then(function(response){
            $scope.loaded=false;
            $scope.doGetAllFAQ();
            successMessage(Flash,"Successfully Updated");
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetFAQByID=function(id){

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal-edit").fadeIn(600);
            $(".common_model").show();
        });

        $scope.modalloaded=true;
        $scope.reset();
        requestHandler.getRequest("admin/getFAQListById/"+id,"").then(function(response){
            original=angular.copy(response.data.Faq_Data);
            $scope.faq=response.data.Faq_Data;
            $scope.modalloaded=false;
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

    $scope.isClean=function(){
        return angular.equals(original, $scope.faq);
    };

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetAllFAQ();
    };

});

adminApp.controller('FAQViewController',function($scope,requestHandler,Flash,$routeParams){

    $scope.activeClass = {faq:'active'};

    $scope.doGetFAQByID=function(){
        $scope.modalloaded=true;
        requestHandler.getRequest("admin/getFAQListById/"+$routeParams.id,"").then(function(response){
            $scope.faq=response.data.Faq_Data;
            $scope.modalloaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //Display FAQ On load
    $scope.doGetFAQByID();
});

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('FAQUserController',function($scope,requestHandler,Flash){

    // To display FAQ as user
    $scope.doGetUserFAQ=function(){

        requestHandler.getRequest("getFAQListByUser/", "").then(function(response){

            $scope.userfaqlist=response.data.Faq_Data;
            console.log($scope.userfaqlist);
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // To display the user FAQ list on load
    $scope.doGetUserFAQ();

});



