var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","countTo"]);adminApp.controller("AdminDashboardController",["$scope","requestHandler","Flash",function(a,b,c){a.countFrom=0,a.doGetAdminDashboardCount=function(){b.getRequest("getStatistics/","").then(function(b){a.adminCountList=b.data.Stats,a.memberCount=a.adminCountList.membercount,a.coachCount=a.adminCountList.coachcount,a.exerciseCount=a.adminCountList.exercisecount,a.foodCount=a.adminCountList.foodcount,a.courseCount=a.adminCountList.publishedcourses,a.payCount=a.adminCountList.totalincome})},a.doGetAdminDashboardCount()}]);