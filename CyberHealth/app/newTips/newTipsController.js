var commonApp=angular.module("commonApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","flash","ngAnimate"]);commonApp.controller("NewTipsController",["$scope","requestHandler","Flash",function(a,b,c){a.activeClass["new"]="active"}]);var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","flash","ngAnimate"]);userApp.controller("NewTipsController",["$scope","requestHandler","Flash",function(a,b,c){a.activeClass["new"]="active"}]);var coachApp=angular.module("coachApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","flash","ngAnimate"]);coachApp.controller("NewTipsController",["$scope","requestHandler","Flash",function(a,b,c){a.activeClass["new"]="active"}]);var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","flash","ngAnimate"]);adminApp.controller("NewTipsController",["$scope","requestHandler","Flash",function(a,b,c){a.activeClass["new"]="active"}]),commonApp.controller("NewTipsListController",["$scope","requestHandler","Flash","$location",function(a,b,c,d){setTimeout(function(){if(d.search().id){var a="#"+d.search().id,b=$(a).offset().top-75;$("html, body").animate({scrollTop:b},"slow")}else;},300),a.focusToIndividualTips=function(a){var b="#"+a,c=$(b).offset().top-75;$("html, body").animate({scrollTop:c},"slow")}}]);