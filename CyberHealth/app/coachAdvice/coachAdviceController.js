var coachApp=angular.module("coachApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);coachApp.controller("CoachAdviceController",["$scope","requestHandler","Flash",function(a,b,c){var d="";a.doGetCoachMyAdvice=function(){b.getRequest("coach/getCoachAdvicesByCoach/","").then(function(b){d=angular.copy(b.data.User_Settings),a.myadvice=b.data.User_Settings},function(){errorMessage(c,"Please try again later!")})},a.doInsertOrUpdateMyAdvice=function(){b.postRequest("coach/insertorupdatecoachadvices/",a.myadvice).then(function(b){console.log(b),a.doGetCoachMyAdvice(),successMessage(c,"Successfully Updated")},function(){errorMessage(c,"Please try again later!")})},a.doEnableDisableMyAdvice=function(){b.putRequest("coach/updateCoachAdvicesStatus/","").then(function(b){a.doGetCoachMyAdvice(),successMessage(c,"Successfully Updated")},function(){errorMessage(c,"Please try again later!")})},a.isClean=function(){return angular.equals(d,a.myadvice)},a.doGetCoachMyAdvice()}]);