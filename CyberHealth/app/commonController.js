var commonApp=angular.module("commonApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);commonApp.controller("CommonController",["$scope","requestHandler","Flash","$routeParams","$sce","$rootScope","$timeout","$window",function(a,b,c,d,e,f,g,h){a.countFrom=0,h.emi=0,"password"==d.id&&($(function(){$(".popupContainer").addClass("left-36"),$("#lean_overlay").fadeTo(1e3),$("#modal").fadeIn(600),$(".reset_password").hide(),$(".user_register").hide(),$(".secret_question").hide(),$(".user_register1").hide(),$(".user_login").show(),$(".new_password_form").hide(),$(".header_title").text("Login")}),successMessage(c,"Reset Password Successfull! Please Login")),"logout"==d.id&&($(function(){$("#lean_overlay").fadeTo(1e3),$("#section-modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#section-modal").hide(),$("#lean_overlay").hide()}),$(".relogin").click(function(){$("#section-modal").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#section-modal").hide(),$("#lean_overlay").hide()})),a.doGetNewsByUser=function(){b.getRequest("getLatestNewsByUser/","").then(function(b){a.usernewslist=b.data.News,newscarousel()},function(){errorMessage(c,"Please try again later!")})},a.doGetTestimonialsByUser=function(){b.getRequest("getTestimonialListByUser/","").then(function(b){a.usertestimoniallist=b.data.Testimonials},function(){errorMessage(c,"Please try again later!")})},a.doGetDashboardCount=function(){b.getRequest("getStatistics/","").then(function(b){a.adminCountList=b.data.Stats,a.memberCount=a.adminCountList.membercount,a.exerciseCount=a.adminCountList.exercisecount,a.foodCount=a.adminCountList.foodcount,a.courseCount=a.adminCountList.publishedcourses})},a.showForm=!0,a.calculateEMI=function(){a.showForm=!1;var b=12*a.feet+1*a.inches;a.emiValue=(703*a.weight/(b*b)).toFixed(2),h.emi=a.emiValue,callGraph()},a.returnToCalculate=function(){a.showForm=!0},g(function(){a.doGetNewsByUser(),a.doGetTestimonialsByUser(),a.doGetDashboardCount()})}]),commonApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),commonApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),commonApp.filter("toSec",function(){return function(a){dateArgs=a.match(/\d{2,4}/g),year=dateArgs[2],month=parseInt(dateArgs[1])-1,day=dateArgs[0],hour=dateArgs[3],minutes=dateArgs[4];var b=new Date(year,month,day,hour,minutes).getTime();return b||""}});