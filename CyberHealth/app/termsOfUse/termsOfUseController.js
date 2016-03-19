var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","summernote"]);adminApp.controller("TermsOfUseController",["$scope","requestHandler","Flash","$location","siteMenuService",function(a,b,c,d,e){a.siteMenuList=e,$.each(a.siteMenuList,function(a,b){b.href==d.path().substr(1)?b.active="active":b.active=""}),a.options={height:250};var f="";a.doGetTermsOfUse=function(){a.loaded=!0,b.getRequest("getLegalByName/Termsofuse/","").then(function(b){f=angular.copy(b.data.Legal_Data),a.terms=b.data.Legal_Data,a.loaded=!1},function(){errorMessage(c,"Please try again later!")})},a.doUpdateTermsOfUse=function(){b.putRequest("admin/updateLegal/",a.terms).then(function(b){a.doGetTermsOfUse(),successMessage(c,"Successfully Updated")},function(){errorMessage(c,"Please try again later!")})},a.isClean=function(){return angular.equals(f,a.terms)},a.doGetTermsOfUse()}]),adminApp.controller("TermsOfUseCommonController",["$scope","requestHandler","Flash",function(a,b,c){a.doGetUserTermsOfUse=function(){b.getRequest("getLegalByAll/Termsofuse/","").then(function(b){a.userterms=b.data.Legal_Data},function(){errorMessage(c,"Please try again later!")})},a.doGetUserTermsOfUse()}]),adminApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]);var commonApp=angular.module("commonApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);commonApp.controller("TermsOfUseCommonController",["$scope","requestHandler","Flash",function(a,b,c){a.doGetUserTermsOfUse=function(){b.getRequest("getLegalByAll/Termsofuse/","").then(function(b){a.userterms=b.data.Legal_Data},function(){errorMessage(c,"Please try again later!")})},a.doGetUserTermsOfUse()}]),commonApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]);var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);userApp.controller("TermsOfUseCommonController",["$scope","requestHandler","Flash",function(a,b,c){a.doGetUserTermsOfUse=function(){b.getRequest("getLegalByAll/Termsofuse/","").then(function(b){a.userterms=b.data.Legal_Data},function(){errorMessage(c,"Please try again later!")})},a.doGetUserTermsOfUse()}]),userApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]);var coachApp=angular.module("coachApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);coachApp.controller("TermsOfUseCommonController",["$scope","requestHandler","Flash",function(a,b,c){a.doGetUserTermsOfUse=function(){b.getRequest("getLegalByAll/Termsofuse/","").then(function(b){a.userterms=b.data.Legal_Data},function(){errorMessage(c,"Please try again later!")})},a.doGetUserTermsOfUse()}]),coachApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]);