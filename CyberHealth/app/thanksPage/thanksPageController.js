var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","requestModule"]);userApp.controller("ThanksSubscribePageController",["$scope","requestHandler","$location","$routeParams",function(a,b,c,d){var e=c.search();if(a.completed=!1,a.transactionSucceed=!0,a.enroll="SUBSCRIPTION",a.thanksEnroll="WE HAVE PROCESSING WITH YOUR SUBSCRIPTION",a.countDownTimer=function(a,b){function c(){$("#countmesg").html("You will be redirecting to the "+b+" page in "+d+" seconds."),d--,d<0&&(clearInterval(e),window.location=a,d=0)}var d=5,e=setInterval(function(){c()},1e3)},$.isEmptyObject(e))a.completed=!0,a.transactionSucceed=!0,a.urlPage=b.paymentURL()+"/#/coachView/"+d.id,a.countDownTimer(a.urlPage,"course");else{var f={};f.accesskey=e.accesskey,a.doExcecutePayment=function(c){b.postRequest("user/executePayByToken/",c).then(function(c){0==c.data.Response_status?(a.completed=!0,a.transactionSucceed=!1,a.urlPage=b.paymentURL()+"/#/coach-search",a.countDownTimer(a.urlPage,"coach search")):(a.thanksEnroll="YOUR SUBSCRIPTION WAS SUCCESSFULLY COMPLETED",a.transactionSucceed=!0,a.completed=!0,a.urlPage=b.paymentURL()+"/#/coach-view/"+d.id,a.countDownTimer(a.urlPage,"coach view"))},function(){a.completed=!0,a.transactionSucceed=!1,a.urlPage=b.paymentURL()+"/#/coachSearch",a.countDownTimer(a.urlPage,"coach search")})},a.doExcecutePayment(f)}}]),userApp.controller("ThanksEnrollPageController",["$scope","requestHandler","$location","$window","$routeParams",function(a,b,c,d,e){var f=c.search();if(a.completed=!1,a.transactionSucceed=!0,a.enroll="ENROLLMENT",a.thanksEnroll="WE HAVE PROCESSING WITH YOUR ENROLLMENT",a.countDownTimer=function(a,b){function c(){$("#countmesg").html("You will be redirecting to the "+b+" page in "+d+" seconds."),d--,d<0&&(clearInterval(e),window.location=a,d=0)}var d=5,e=setInterval(function(){c()},1e3)},$.isEmptyObject(f))a.completed=!0,a.transactionSucceed=!0,a.urlPage=b.paymentURL()+"/#/course-detail/"+e.id,a.countDownTimer(a.urlPage,"course");else{var g={};g.accesskey=f.accesskey,a.doExcecutePayment=function(c){b.postRequest("user/executePayByToken/",c).then(function(c){0==c.data.Response_status?(a.completed=!0,a.transactionSucceed=!1,a.urlPage=b.paymentURL()+"/#/courses",a.countDownTimer(a.urlPage,"course search")):(a.thanksEnroll="YOU HAVE SUCCESSFULLY ENROLLED THIS COURSE",a.transactionSucceed=!0,a.completed=!0,a.urlPage=b.paymentURL()+"/#/course-detail/"+e.id,a.countDownTimer(a.urlPage,"course"))},function(){a.completed=!0,a.transactionSucceed=!1,a.urlPage=b.paymentURL()+"/#/courses",a.countDownTimer(a.urlPage,"course search")})},a.doExcecutePayment(g)}}]);