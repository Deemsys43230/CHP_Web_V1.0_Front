var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination"]);userApp.controller("UserPaymentController",function(e,a,t){e.sortcoursenameicon="fa fa-caret-down",e.sortcategoryicon="fa fa-caret-down",e.sortauthoricon="fa fa-caret-down",e.sortpruchasedonicon="fa fa-caret-down",e.sortamounticon="fa fa-caret-down",e.sortcoachnameicon="fa fa-caret-down",e.sortcoachemailicon="fa fa-caret-down",e.sortenrollicon="fa fa-caret-down",e.sortpayicon="fa fa-caret-down",e.sortCourseName=function(){e.sortKey="coursename",e.reverse=!e.reverse,"fa fa-caret-down"==e.sortcoursenameicon?e.sortcoursenameicon="fa fa-caret-up":e.sortcoursenameicon="fa fa-caret-down"},e.sortCategoryName=function(){e.sortKey="categoryname",e.reverse=!e.reverse,"fa fa-caret-down"==e.sortcategoryicon?e.sortcategoryicon="fa fa-caret-up":e.sortcategoryicon="fa fa-caret-down"},e.sortAuthorName=function(){e.sortKey="ownername",e.reverse=!e.reverse,"fa fa-caret-down"==e.sortauthoricon?e.sortauthoricon="fa fa-caret-up":e.sortauthoricon="fa fa-caret-down"},e.sortPurchaseDate=function(){e.sortKey="purchasedon",e.reverse=!e.reverse,"fa fa-caret-down"==e.sortpruchasedonicon?e.sortpruchasedonicon="fa fa-caret-up":e.sortpruchasedonicon="fa fa-caret-down"},e.sortAmount=function(){e.sortKey="purchaseamount",e.reverse=!e.reverse,"fa fa-caret-down"==e.sortamounticon?e.sortamounticon="fa fa-caret-up":e.sortamounticon="fa fa-caret-down"},e.sortCoachName=function(){e.sortKey="coachname",e.reverse=!e.reverse,"fa fa-caret-down"==e.sortcoachnameicon?e.sortcoachnameicon="fa fa-caret-up":e.sortcoachnameicon="fa fa-caret-down"},e.sortCoachEmail=function(){e.sortKey="coachemailid",e.reverse=!e.reverse,"fa fa-caret-down"==e.sortcoachemailicon?e.sortcoachemailicon="fa fa-caret-up":e.sortcoachemailicon="fa fa-caret-down"},e.sortEnrolled=function(){e.sortKey="coachEnrollStatus",e.reverse=!e.reverse,"fa fa-caret-down"==e.sortenrollicon?e.sortenrollicon="fa fa-caret-up":e.sortenrollicon="fa fa-caret-down"},e.sortPay=function(){e.sortKey="purchaseamount",e.reverse=!e.reverse,"fa fa-caret-down"==e.sortpayicon?e.sortpayicon="fa fa-caret-up":e.sortpayicon="fa fa-caret-down"},e.doGetMyCourseListByUser=function(){a.getRequest("user/getMyCoursePurchaseList/","").then(function(a){e.usercourselist=a.data.courselist},function(){errorMessage(t,"Please try again later!")})},e.doViewPaymentDetails=function(o){$(function(){$("#lean_overlay").fadeTo(1e3),$("#paymentView").fadeIn(600),$(".common_model").show()}),e.loaded=!0,a.postRequest("inwardPaymentDetail/",{inwardid:o}).then(function(a){e.paymentDetails=a.data.InwardDetails,e.loaded=!1},function(){errorMessage(t,"Please try again later!")}),$(".modal_close").click(function(){$(".common_model").hide(),$("#paymentView").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#paymentView").hide(),$("#lean_overlay").hide()})},e.doGetMyCoachListByUser=function(){a.getRequest("user/getmySubscribedCoachList/","").then(function(a){e.usercoachlist=a.data.coachlist},function(){errorMessage(t,"Please try again later!")})};var o="";e.doGetPaypalDetails=function(){a.getRequest("getUserSettings/","").then(function(a){o=angular.copy(a.data.User_Settings[0]),e.paypalDetails=a.data.User_Settings[0]},function(){errorMessage(t,"Please Try again later")})},e.doUpdatePaypalDetails=function(){a.putRequest("updateUserSettings/",e.paypalDetails).then(function(){successMessage(t,"Successfully Updated!"),e.getSettingDetails()},function(){errorMessage(t,"Please try again later")})},e.isCleanPaypalSettings=function(){return angular.equals(o,e.paypalDetails)},e.doGetCurrencyCode=function(){a.getRequest("getCurrencyCode/","").then(function(a){e.currencycodeData=a.data.CurrencyCode_Data},function(){errorMessage(t,"Please Try again later")})},e.getSettingDetails=function(){e.doGetCurrencyCode(),e.doGetPaypalDetails()},e.courseListInit=function(){e.doGetMyCourseListByUser()},e.paymentDetails=function(){e.getPaymentDetails()},e.coachListInit=function(){e.doGetMyCoachListByUser()},e.coachPaymentDetails=function(){e.getCoachPaymentDetails()},$(".show-list-search").click(function(){$(".search-list-form").toggle(300),$(".search-list-form input").focus()})}),userApp.filter("trusted",["$sce",function(e){return function(a){return e.trustAsResourceUrl(a)}}]),userApp.filter("startsWithLetterCourse",function(){return function(e,a){var t=[],o=new RegExp(a,"i");if(e)for(var r=0;r<e.length;r++){var n=e[r];(o.test(n.coursename)||o.test(n.categoryname)||o.test(n.ownername)||o.test(n.purchaseamount)||o.test(n.inwardid))&&t.push(n)}else;return t}}),userApp.filter("startsWithLetterCoach",function(){return function(e,a){var t=[],o=new RegExp(a,"i");if(e)for(var r=0;r<e.length;r++){var n=e[r];(o.test(n.coachname)||o.test(n.coachemailid)||o.test(n.coachEnrollStatus)||o.test(n.purchaseamount)||o.test(n.inwardid))&&t.push(n)}else;return t}});