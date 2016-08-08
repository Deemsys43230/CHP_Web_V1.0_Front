var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination"]);userApp.controller("UserPaymentController",["$scope","requestHandler","Flash","$routeParams",function(a,b,c,d){a.sortcoursenameicon="fa fa-caret-down",a.sortcategoryicon="fa fa-caret-down",a.sortauthoricon="fa fa-caret-down",a.sortpruchasedonicon="fa fa-caret-down",a.sortamounticon="fa fa-caret-down",a.sortcoachnameicon="fa fa-caret-down",a.sortcoachemailicon="fa fa-caret-down",a.sortenrollicon="fa fa-caret-down",a.sortpayicon="fa fa-caret-down",a.sortCourseName=function(){a.sortKey="coursename",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortcoursenameicon?a.sortcoursenameicon="fa fa-caret-up":a.sortcoursenameicon="fa fa-caret-down"},a.sortCategoryName=function(){a.sortKey="categoryname",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortcategoryicon?a.sortcategoryicon="fa fa-caret-up":a.sortcategoryicon="fa fa-caret-down"},a.sortAuthorName=function(){a.sortKey="ownername",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortauthoricon?a.sortauthoricon="fa fa-caret-up":a.sortauthoricon="fa fa-caret-down"},a.sortPurchaseDate=function(){a.sortKey="purchasedon",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortpruchasedonicon?a.sortpruchasedonicon="fa fa-caret-up":a.sortpruchasedonicon="fa fa-caret-down"},a.sortAmount=function(){a.sortKey="purchaseamount",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortamounticon?a.sortamounticon="fa fa-caret-up":a.sortamounticon="fa fa-caret-down"},a.sortCoachName=function(){a.sortKey="coachname",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortcoachnameicon?a.sortcoachnameicon="fa fa-caret-up":a.sortcoachnameicon="fa fa-caret-down"},a.sortCoachEmail=function(){a.sortKey="coachemailid",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortcoachemailicon?a.sortcoachemailicon="fa fa-caret-up":a.sortcoachemailicon="fa fa-caret-down"},a.sortEnrolled=function(){a.sortKey="coachEnrollStatus",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortenrollicon?a.sortenrollicon="fa fa-caret-up":a.sortenrollicon="fa fa-caret-down"},a.sortPay=function(){a.sortKey="purchaseamount",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortpayicon?a.sortpayicon="fa fa-caret-up":a.sortpayicon="fa fa-caret-down"},a.doGetMyCourseListByUser=function(){b.getRequest("user/getMyCoursePurchaseList/","").then(function(b){a.usercourselist=b.data.courselist},function(){errorMessage(c,"Please try again later!")})},a.doViewPaymentDetails=function(d){$(function(){$("#lean_overlay").fadeTo(1e3),$("#paymentView").fadeIn(600),$(".common_model").show()}),a.loaded=!0,b.postRequest("inwardPaymentDetail/",{inwardid:d}).then(function(b){a.paymentDetails=b.data.InwardDetails,a.loaded=!1},function(){errorMessage(c,"Please try again later!")}),$(".modal_close").click(function(){$(".common_model").hide(),$("#paymentView").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#paymentView").hide(),$("#lean_overlay").hide()})},a.doGetMyCoachListByUser=function(){b.getRequest("user/getmySubscribedCoachList/","").then(function(b){a.usercoachlist=b.data.coachlist},function(){errorMessage(c,"Please try again later!")})};var e="";a.doGetPaypalDetails=function(){b.getRequest("getUserSettings/","").then(function(b){e=angular.copy(b.data.User_Settings[0]),a.paypalDetails=b.data.User_Settings[0]},function(a){errorMessage(c,"Please Try again later")})},a.doUpdatePaypalDetails=function(){b.putRequest("updateUserSettings/",a.paypalDetails).then(function(b){0==b.data.Response_status?errorMessage(c,"Invalid paypal emailId!!!"):1==b.data.Response_status&&(successMessage(c,"Successfully Updated!"),a.getSettingDetails())},function(){errorMessage(c,"Please try again later")})},a.isCleanPaypalSettings=function(){return angular.equals(e,a.paypalDetails)},a.doGetCurrencyCode=function(){b.getRequest("getCurrencyCode/","").then(function(b){a.currencycodeData=b.data.CurrencyCode_Data},function(a){errorMessage(c,"Please Try again later")})},a.getSettingDetails=function(){a.doGetCurrencyCode(),a.doGetPaypalDetails()},a.courseListInit=function(){a.doGetMyCourseListByUser()},a.paymentDetails=function(){a.getPaymentDetails()},a.coachListInit=function(){a.doGetMyCoachListByUser()},a.coachPaymentDetails=function(){a.getCoachPaymentDetails()},$(".show-list-search").click(function(){$(".search-list-form").toggle(300),$(".search-list-form input").focus()})}]),userApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),userApp.filter("startsWithLetterCourse",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.coursename)||d.test(f.categoryname)||d.test(f.ownername)||d.test(f.purchaseamount)||d.test(f.inwardid))&&c.push(f)}else;return c}}),userApp.filter("startsWithLetterCoach",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.coachname)||d.test(f.coachemailid)||d.test(f.coachEnrollStatus)||d.test(f.purchaseamount)||d.test(f.inwardid))&&c.push(f)}else;return c}});