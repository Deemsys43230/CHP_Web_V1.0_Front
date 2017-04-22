var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","summernote"]);adminApp.controller("InstructionController",["$scope","requestHandler","Flash","$location","siteMenuService",function(a,b,c,d,e){a.siteMenuList=e,$.each(a.siteMenuList,function(a,b){b.href==d.path().substr(1)?b.active="active":b.active=""});var f="";a.options={height:250},a.doGetInstruction=function(){a.loaded=!0,b.getRequest("getLegalByName/Aboutus/","").then(function(b){f=angular.copy(b.data.Legal_Data),a.instructions=b.data.Legal_Data,a.loaded=!1},function(){errorMessage(c,"Please try again later!")})},a.doUpdateInstructions=function(){b.putRequest("admin/updateLegal/",a.instructions).then(function(b){a.doGetInstruction(),successMessage(c,"Successfully Updated")},function(){errorMessage(c,"Please try again later!")})},a.isClean=function(){return angular.equals(f,a.instructions)},a.doGetInstruction()}]),adminApp.controller("InstructionCommonController",["$scope","requestHandler","Flash",function(a,b,c){a.doGetUserInstruction=function(){b.getRequest("getLegalByAll/Aboutus/","").then(function(b){a.userinstructions=b.data.Legal_Data},function(){errorMessage(c,"Please try again later!")})},a.doGetUserInstruction()}]),adminApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]);var commonApp=angular.module("commonApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);commonApp.controller("InstructionCommonController",["$scope","requestHandler","Flash",function(a,b,c){a.doGetUserInstruction=function(){b.getRequest("getLegalByAll/Aboutus/","").then(function(b){a.userinstructions=b.data.Legal_Data},function(){errorMessage(c,"Please try again later!")})},a.doGetUserInstruction()}]),commonApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]);var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);userApp.controller("InstructionCommonController",["$scope","requestHandler","Flash",function(a,b,c){a.doGetUserInstruction=function(){b.getRequest("getLegalByAll/Aboutus/","").then(function(b){a.userinstructions=b.data.Legal_Data},function(){errorMessage(c,"Please try again later!")})},a.doGetUserInstruction()}]),userApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]);var coachApp=angular.module("coachApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);coachApp.controller("InstructionCommonController",["$scope","requestHandler","Flash",function(a,b,c){a.doGetUserInstruction=function(){b.getRequest("getLegalByAll/Aboutus/","").then(function(b){a.userinstructions=b.data.Legal_Data},function(){errorMessage(c,"Please try again later!")})},a.doGetUserInstruction()}]),coachApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]);