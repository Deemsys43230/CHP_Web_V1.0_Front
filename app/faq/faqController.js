/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('FAQController',['$scope','requestHandler','Flash','siteMenuService',function($scope,requestHandler,Flash,siteMenuService){

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.id==4){
            value.active = "active";
        }
        else value.active = ""
    });

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
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
        }
        $scope.faqsearch="";
        $scope.loaded=true;
        requestHandler.postRequest("admin/insertorupdateFAQList/",$scope.faq).then(function (response) {
            $scope.doGetAllFAQ();
            successMessage(Flash,"Successfully Added");
            $scope.reset();
            $scope.loaded=false;
            $scope.paginationLoad=true;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doUpdateFAQ=function(){
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
        requestHandler.putRequest("admin/insertorupdateFAQList/",$scope.faq).then(function(response){
            $scope.doGetAllFAQ();
            successMessage(Flash,"Successfully Updated");
            $scope.reset();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doEnableDisable=function(id){
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
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

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $scope.pagenumber="";
        $('.search-list-form input').focus();
    });

}]);

adminApp.controller('FAQViewController',['$scope','requestHandler','Flash','$routeParams','siteMenuService',function($scope,requestHandler,Flash,$routeParams,siteMenuService){

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.id==4){
            value.active = "active";
        }
        else value.active = ""
    });

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
}]);

adminApp.controller('FAQCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash){

    // To display FAQ as user
    $scope.doGetUserFAQ=function(){
        $scope.loaded=true;
        requestHandler.getRequest("getFAQListByUser/", "").then(function(response){
            $scope.userfaqlist=response.data.Faq_Data;
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // To display the user FAQ list on load
    $scope.doGetUserFAQ();

}]);

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('FAQCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash){

    // To display FAQ as user
    $scope.doGetUserFAQ=function(){
        $scope.loaded=true;
        requestHandler.getRequest("getFAQListByUser/", "").then(function(response){
            $scope.userfaqlist=response.data.Faq_Data;
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // To display the user FAQ list on load
    $scope.doGetUserFAQ();

}]);

var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

userApp.controller('FAQCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash){

    // To display FAQ as user
    $scope.doGetUserFAQ=function(){
        $scope.loaded=true;
        requestHandler.getRequest("getFAQListByUser/", "").then(function(response){
            $scope.userfaqlist=response.data.Faq_Data;
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // To display the user FAQ list on load
    $scope.doGetUserFAQ();

}]);


var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

coachApp.controller('FAQCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash){

    // To display FAQ as user
    $scope.doGetUserFAQ=function(){
        $scope.loaded=true;
        requestHandler.getRequest("getFAQListByUser/", "").then(function(response){
            $scope.userfaqlist=response.data.Faq_Data;
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // To display the user FAQ list on load
    $scope.doGetUserFAQ();

}]);

adminApp.filter('startsWithLetterFood', function () {

    return function (items, faqsearch) {
        var filtered = [];
        var letterMatch = new RegExp(faqsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.question) || letterMatch.test(item.answer)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});



