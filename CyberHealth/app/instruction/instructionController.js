var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","summernote"]);adminApp.controller("InstructionController",["$scope","requestHandler","Flash","$location","siteMenuService",function(t,e,n,o,r){t.siteMenuList=r,$.each(t.siteMenuList,function(t,e){e.href==o.path().substr(1)?e.active="active":e.active=""});var s="";t.options={height:250},t.doGetInstruction=function(){t.loaded=!0,e.getRequest("getLegalByName/Instructions/","").then(function(e){s=angular.copy(e.data.Legal_Data),t.instructions=e.data.Legal_Data,t.loaded=!1},function(){errorMessage(n,"Please try again later!")})},t.doUpdateInstructions=function(){e.putRequest("admin/updateLegal/",t.instructions).then(function(e){console.log(e),t.doGetInstruction(),successMessage(n,"Successfully Updated")},function(){errorMessage(n,"Please try again later!")})},t.isClean=function(){return angular.equals(s,t.instructions)},t.doGetInstruction()}]),adminApp.controller("InstructionCommonController",["$scope","requestHandler","Flash",function(t,e,n){t.doGetUserInstruction=function(){e.getRequest("getLegalByAll/Instructions/","").then(function(e){t.userinstructions=e.data.Legal_Data},function(){errorMessage(n,"Please try again later!")})},t.doGetUserInstruction()}]),adminApp.filter("html",["$sce",function(t){return function(e){return t.trustAsHtml(e)}}]);var commonApp=angular.module("commonApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);commonApp.controller("InstructionCommonController",["$scope","requestHandler","Flash",function(t,e,n){t.doGetUserInstruction=function(){e.getRequest("getLegalByAll/Instructions/","").then(function(e){t.userinstructions=e.data.Legal_Data},function(){errorMessage(n,"Please try again later!")})},t.doGetUserInstruction()}]),commonApp.filter("html",["$sce",function(t){return function(e){return t.trustAsHtml(e)}}]);var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);userApp.controller("InstructionCommonController",["$scope","requestHandler","Flash",function(t,e,n){t.doGetUserInstruction=function(){e.getRequest("getLegalByAll/Instructions/","").then(function(e){t.userinstructions=e.data.Legal_Data},function(){errorMessage(n,"Please try again later!")})},t.doGetUserInstruction()}]),userApp.filter("html",["$sce",function(t){return function(e){return t.trustAsHtml(e)}}]);var coachApp=angular.module("coachApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);coachApp.controller("InstructionCommonController",["$scope","requestHandler","Flash",function(t,e,n){t.doGetUserInstruction=function(){e.getRequest("getLegalByAll/Instructions/","").then(function(e){t.userinstructions=e.data.Legal_Data},function(){errorMessage(n,"Please try again later!")})},t.doGetUserInstruction()}]),coachApp.filter("html",["$sce",function(t){return function(e){return t.trustAsHtml(e)}}]);