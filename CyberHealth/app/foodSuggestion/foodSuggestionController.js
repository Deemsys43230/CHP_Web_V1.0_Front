var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination"]);adminApp.controller("FoodSuggestionController",["$scope","requestHandler","Flash",function(a,b,c){a.activeClass={suggestion:"active"},a.doGetAllFoodSuggestion=function(){a.loaded=!0,b.getRequest("admin/getFoodSuggestion/","").then(function(b){a.foodSuggestionList=b.data.Food_Suggestion_Data,a.loaded=!1,a.paginationLoad=!0},function(){errorMessage(c,"Please try again later!")})},a.clearText=function(){a.suggestionsearch.foodname=""},$(".show-list-search").click(function(){$(".search-list-form").toggle(300),$(".search-list-form input").focus()}),a.doApproveFoodSuggestion=function(d){"none"!=$(".search-list-form").css("display")&&($(".search-list-form").hide(),$(".search-list-form").show(2400)),a.loaded=!0,b.postRequest("admin/approveFoodSuggestion/",{suggestionid:d}).then(function(b){a.loaded=!1,a.doGetAllFoodSuggestion(),successMessage(c,"Successfully Updated")},function(){errorMessage(c,"Please try again later!")})},a.doRejectFoodSuggestion=function(d){"none"!=$(".search-list-form").css("display")&&($(".search-list-form").hide(),$(".search-list-form").show(2400)),a.loaded=!0,b.postRequest("admin/rejectFoodSuggestion/",{suggestionid:d}).then(function(b){a.loaded=!1,a.doGetAllFoodSuggestion(),successMessage(c,"Successfully Updated")},function(){errorMessage(c,"Please try again later!")})},a.init=function(){a.paginationLoad=!1,a.doGetAllFoodSuggestion()}}]),adminApp.controller("FoodSuggestionViewController",["$scope","requestHandler","Flash","$routeParams","$sce",function(a,b,c,d,e){a.activeClass={suggestion:"active"},a.doViewFoodSuggestion=function(){a.loaded=!0,b.postRequest("admin/getFoodSuggestionDetail/",{suggestionid:d.id}).then(function(b){a.myImgSrc=e.trustAsResourceUrl(b.data.Food_Suggestion_Data.user_imageurl+"?decache="+Math.random()),a.viewFoodSuggestionDetails=b.data.Food_Suggestion_Data,a.loaded=!1,a.paginationLoad=!0},function(){errorMessage(c,"Please try again later!")})},a.doViewFoodSuggestion()}]);