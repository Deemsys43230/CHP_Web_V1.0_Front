function successMessage(a,b){return a.dismiss(),a.create("success",b,"alert"),$("html, body").animate({scrollTop:0},600),!1}function errorMessage(a,b){return a.dismiss(),a.create("danger",b,"custom-class"),$("html, body").animate({scrollTop:0},600),!1}var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","ngAnimate","flash","feedbackServiceModule"]);userApp.config(["$routeProvider","$ocLazyLoadProvider","$httpProvider",function(a,b,c){b.config({debug:!1,events:!0}),c.defaults.withCredentials=!0,c.interceptors.push(["$q","$location","$injector","$cookies","$window",function(a,b,c,d,e){return{request:function(a){return a.headers["X-CSRFToken"]=d.get("X-CSRFToken"),a},response:function(a){return a},responseError:function(b){switch(b.status){case 400:break;case 401:alert("restricted");case 403:e.location.href="../../#/home/logout";break;case 500:}return a.reject(b)}}}]),a.when("/dashboard",{templateUrl:"views/dashboard.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../css/custom-inputs.css","../../css/vertical_tab.css","../../plugin/popup/style.css","../../css/ngPercentageCircle.css","../../app/userDashboard/ngPercentageCircle.js","../../app/userDashboard/userDashboardService.js","../../app/userDashboard/userDashboardController.js","../../plugin/dateRange/daterangepicker.css","../../plugin/dateRange/daterangepicker.js","../../css/horizon-swiper.min.css","../../css/horizon-theme.min.css","../../js/horizon-swiper.min.js"]})}]},controller:"UserDashboardController"}).when("/register",{templateUrl:"views/register.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../css/custom-inputs.css","../../plugin/datepicker/bootstrap-datepicker.js","../../plugin/datepicker/datepicker.css"]})}]}}).when("/my-courses",{templateUrl:"views/courses-my.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/course/courseController.js"]})}]},controller:"CourseController"}).when("/courses",{templateUrl:"views/courses.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/course/courseController.js"]})}]},controller:"CourseController"}).when("/course-view/:id",{templateUrl:"views/course-view.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../plugin/popup/style.css","../../app/course/courseController.js"]})}]},controller:"CourseController"}).when("/course-detail/:id",{templateUrl:"views/course-details.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../plugin/popup/style.css","../../app/course/courseController.js"]})}]},controller:"CourseController"}).when("/course-category/:id",{templateUrl:"views/course-category.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/course/courseController.js"]})}]},controller:"CourseController"}).when("/mycourse-category/:id",{templateUrl:"views/mycourses-category.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/course/courseController.js"]})}]},controller:"CourseController"}).when("/payments",{templateUrl:"views/payments.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../plugin/popup/style.css","../../app/payments/userPaymentController.js"]})}]},controller:"UserPaymentController"}).when("/coach-payments",{templateUrl:"views/payments-coach.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../plugin/popup/style.css","../../app/payments/userPaymentController.js"]})}]},controller:"UserPaymentController"}).when("/paymentDetails/:id",{templateUrl:"views/payment-details.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/payments/userPaymentController.js"]})}]},controller:"UserPaymentController"}).when("/paymentCoachDetails/:id",{templateUrl:"views/payment-coach-details.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/payments/userPaymentController.js"]})}]},controller:"UserPaymentController"}).when("/payment-settings",{templateUrl:"views/payment-settings.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/payments/userPaymentController.js"]})}]},controller:"UserPaymentController"}).when("/coach",{templateUrl:"views/coach.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/userCoach/userCoachController.js"]})}]},controller:"UserCoachController"}).when("/coach-search",{templateUrl:"views/coach-search.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../plugin/vertical-carousel/vertical-carousel.js","../../angular/angular-utils-pagination/dirPagination.js","../../app/userCoach/userCoachController.js"]})}]},controller:"UserCoachController"}).when("/coach-view/:id",{templateUrl:"views/coach-user-view.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../plugin/vertical-carousel/vertical-carousel.js","../../angular/angular-utils-pagination/dirPagination.js","../../app/userCoach/userCoachController.js","../../plugin/popup/style.css"]})}]},controller:"UserCoachController"}).when("/thanksSubscribePage/:id/:month",{templateUrl:"views/thanks-page.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/thanksPage/thanksPageController.js"]})}]},controller:"ThanksSubscribePageController"}).when("/thanksEnrollPage/:id",{templateUrl:"views/thanks-page.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/thanksPage/thanksPageController.js"]})}]},controller:"ThanksEnrollPageController"}).when("/friends",{templateUrl:"views/friends.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/friends/friendsController.js","../../app/friends/friendsService.js"]})}]},controller:"FriendsController"}).when("/contact",{templateUrl:"../common/contact.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/settings/basicInfoController.js","https://maps.googleapis.com/maps/api/js"]})}]},controller:"ContactUsDetailsController"}).when("/profile",{templateUrl:"views/profile.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../plugin/popup/style.css","../../css/profile-image-upload.css","../../js/image-upload.js","../../app/userProfile/userProfileController.js"]})}]},controller:"UserProfileController"}).when("/demography",{templateUrl:"views/demography.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../css/custom-inputs.css","../../plugin/popup/style.css","../../app/demography/demographyController.js"]})}]},controller:"DemographyController"}).when("/nutrients",{templateUrl:"views/nutrients.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/demography/demographyController.js"]})}]},controller:"DemographyController"}).when("/forums",{templateUrl:"views/forums.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/forums/forumsController.js","../../angular/angular-utils-pagination/dirPagination.js"]})}]},controller:"ForumsUserController"}).when("/add-forum",{templateUrl:"views/forum-add.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/forums/forumsController.js"]})}]},controller:"ForumsUserController"}).when("/edit-forum/:id",{templateUrl:"views/forum-add.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/forums/forumsController.js"]})}]},controller:"ForumsUserEditController"}).when("/forum-details/:id",{templateUrl:"views/forum-details.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/forums/forumsController.js"]})}]},controller:"ForumsUserController"}).when("/group-goal",{templateUrl:"views/group-goal.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../plugin/popup/style.css","../../app/goal/goalController.js","../../angular/angular-utils-pagination/dirPagination.js","../../plugin/dateRange/daterangepicker.css","../../plugin/dateRange/daterangepicker.js"]})}]},controller:"GoalController"}).when("/group-goal-request",{templateUrl:"views/group-goal-request.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/goal/goalController.js","../../angular/angular-utils-pagination/dirPagination.js"]})}]},controller:"GoalController"}).when("/group-goal-view/:id",{templateUrl:"views/group-goal-view.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../plugin/popup/style.css","../../angular/angular-utils-pagination/dirPagination.js","../../app/goal/goalController.js"]})}]},controller:"GoalController",request:0}).when("/group-goal-request/:id",{templateUrl:"views/group-goal-view.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../plugin/popup/style.css","../../app/goal/goalController.js"]})}]},controller:"GoalController",request:1}).when("/faq",{templateUrl:"../common/faq.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/faq/faqController.js"]})}]},controller:"FAQCommonController"}).when("/instructions",{templateUrl:"../common/instruction.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/instruction/instructionController.js"]})}]},controller:"InstructionCommonController"}).when("/terms-of-use",{templateUrl:"../common/termsofuse.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/termsOfUse/termsOfUseController.js"]})}]},controller:"TermsOfUseCommonController"}).when("/policy",{templateUrl:"../common/privacypolicy.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"userApp",files:["../../app/privacyPolicy/privacyPolicyController.js"]})}]},controller:"PrivacyPolicyCommonController"}).otherwise({redirectTo:"/dashboard"})}]),userApp.controller("UserInitialController",["$scope","requestHandler","$location","Flash","FeedbackService","$timeout","$rootScope",function(a,b,c,d,e,f,g){a.hideValue=1,b.getRequest("getUserId/","").then(function(b){a.username=b.data.User_Profile.name,a.userProfile=b.data.User_Profile,a.demo=b.data.demography,0==a.userProfile.isProfileUpdated&&0==a.demo.demoUpdatedstatus?g.checkPath=0:1==a.userProfile.isProfileUpdated&&0==a.demo.demoUpdatedstatus?g.checkPath=1:1==a.userProfile.isProfileUpdated&&1==a.demo.demoUpdatedstatus&&(g.checkPath=2)}),a.socialMedia=function(){$("html, body").animate({scrollTop:0},600),$(function(){$("#lean_overlay").fadeTo(1e3),$("#social-modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#social-modal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#social-modal").hide(),$("#lean_overlay").hide()})},a.$watch("checkPath",function(){a.popupOpen(g.checkPath)}),a.$on("$routeChangeStart",function(b,d){a.activeClass={};var e=c.url().substr(1);a.activeClass[e]="active",a.popupOpen(g.checkPath)}),a.popupOpen=function(a){$("html, body").animate({scrollTop:0},600),0==a?($(function(){$("#lean_overlay").fadeTo(1e3),$("#review-modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#review-modal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#review-modal").hide(),$("#lean_overlay").hide()}),c.path("profile")):1==a&&($(function(){$("#lean_overlay").fadeTo(1e3),$("#review-modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#review-modal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#review-modal").hide(),$("#lean_overlay").hide()}),c.path("demography"))},a.getSocialMediaDetails=function(){b.getRequest("contactus/","").then(function(b){a.commonDetails=b.data.Contactus[0],a.address=a.commonDetails.streetaddress+", "+a.commonDetails.state+", "+a.commonDetails.city+", "+a.commonDetails.zipcode,a.hideValue=0})},a.getSocialMediaDetails(),a.isFeedback=!1,a.addUserFeedback=function(){a.userFeedback=e.addUserFeedback(a.feedback),a.userFeedback.then(function(b){a.isFeedback=!0,a.feedback={},a.feedbackForm.$setPristine(),a.getFeedback()}),f(function(){a.isFeedback=!1,$("#feedback_button").click()},2e3)},a.getFeedback=function(){b.getRequest("getUserId/","").then(function(b){a.feedback={},a.feedback.name=b.data.User_Profile.name,a.feedback.emailId=b.data.User_Profile.emailid})}}]),userApp.controller("UserLogoutController",["$cookies","$scope","$window",function(a,b,c){b.doLogout=function(){a.remove("X-CSRFToken",{path:"/"}),a.put("sessionid",void 0),c.location.href="../../#/home"}}]),userApp.directive("validateFloat",function(){var a=/^\-?\d+((\.)\d+)?$/;return{require:"ngModel",restrict:"",link:function(b,c,d,e){e.$validators.validateFloat=function(b){return e.$isEmpty(b)||a.test(b)}}}}),userApp.directive("foodexists",["$q","$timeout","requestHandler",function(a,b,c){return{restrict:"A",require:"ngModel",scope:{foodid:"="},link:function(d,e,f,g){g.$asyncValidators.foodexists=function(e){var f=a.defer();return b(function(){var a=d.foodid;c.postRequest("user/searchFoodnamebyUser/",{foodname:e,foodid:a}).then(function(a){0==a.data.Response_status?f.resolve():f.reject()})},10),f.promise}}}}]),userApp.directive("exerciseexists",["$q","$timeout","requestHandler",function(a,b,c){return{restrict:"A",require:"ngModel",scope:{exerciseid:"="},link:function(d,e,f,g){g.$asyncValidators.exerciseexists=function(e){var f=a.defer();return b(function(){var a=d.exerciseid;c.postRequest("user/searchExercisebnamebyUser/",{exercisename:e,exerciseid:a}).then(function(a){0==a.data.Response_status?f.resolve():f.reject()})},10),f.promise}}}}]),userApp.directive("validateFloat1",function(){var a=/^\s*(?=.*[1-9])\d*(?:\.\d{0,8})?\s*$/;return{require:"ngModel",restrict:"",link:function(b,c,d,e){e.$validators.validateFloat1=function(b){return e.$isEmpty(b)||a.test(b)}}}}),userApp.directive("block",function(){return{restrict:"A",link:function(a,b,c,d){b.on("keydown",function(a){if(64==a.which||16==a.which)a.preventDefault();else if(a.which>=48&&a.which<=57)a.preventDefault();else if(a.which>=96&&a.which<=105)a.preventDefault();else{if(!([8,13,27,37,38,39,40].indexOf(a.which)>-1))return a.preventDefault(),!1;a.preventDefault()}})}}}),userApp.directive("validateEmail",function(){var a=/^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,5})$/;return{require:"ngModel",restrict:"",link:function(b,c,d,e){e&&e.$validators.email&&(e.$validators.email=function(b){return e.$isEmpty(b)||a.test(b)})}}}),userApp.directive("focusMe",["$timeout","$parse",function(a,b){return{link:function(c,d,e){var f=b(e.focusMe);c.$watch(f,function(b){b===!0&&a(function(){d[0].focus()})}),d.bind("blur",function(){c.$apply(f.assign(c,!1))})}}}]),userApp.factory("myGoogleAnalytics",["$rootScope","$window","$location",function(a,b,c){var d={};return d.sendPageview=function(){b.ga&&(b.ga("set","page",c.path()),b.ga("send","pageview"))},a.$on("$viewContentLoaded",d.sendPageview),d}]).run(["myGoogleAnalytics",function(a){}]);