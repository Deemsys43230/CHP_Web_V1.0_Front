function successMessage(a,b){return a.dismiss(),a.create("success",b,"alert"),$("html, body").animate({scrollTop:0},600),!1}function errorMessage(a,b){return a.dismiss(),a.create("danger",b,"custom-class"),$("html, body").animate({scrollTop:0},600),!1}var coachApp=angular.module("coachApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","ngAnimate"]);coachApp.config(["$routeProvider","$ocLazyLoadProvider","$httpProvider",function(a,b,c){b.config({debug:!1,events:!0}),c.defaults.withCredentials=!0,c.interceptors.push(["$q","$location","$injector","$cookies","$window",function(a,b,c,d,e){return{request:function(a){return a.headers["X-CSRFToken"]=d.get("X-CSRFToken"),a},response:function(a){return a},responseError:function(b){switch(b.status){case 400:break;case 401:alert("restricted");case 403:e.location.href="../../#/home/logout";break;case 500:}return a.reject(b)}}}]),a.when("/dashboard",{templateUrl:"views/dashboard.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/dashboard/coachDashboardController.js"]})}]},controller:"CoachDashboardController"}).when("/profile",{templateUrl:"views/profile.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../plugin/popup/style.css","../../css/profile-image-upload.css","../../js/image-upload.js","../../app/coachProfile/coachProfileController.js"]})}]},controller:"CoachProfileController"}).when("/my-members",{templateUrl:"views/member.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../plugin/popup/style.css","../../angular/angular-utils-pagination/dirPagination.js","../../app/coachMembers/coachMembersController.js"]})}]},controller:"CoachMembersController"}).when("/member-view/:id",{templateUrl:"views/member-view.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../plugin/popup/style.css","../../angular/angular-utils-pagination/dirPagination.js","../../app/coachMembers/coachMembersController.js"]})}]},controller:"MembersViewController"}).when("/forums",{templateUrl:"../user/views/forums.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/forums/forumsController.js","../../angular/angular-utils-pagination/dirPagination.js"]})}]},controller:"ForumsCoachController"}).when("/add-forum",{templateUrl:"../user/views/forum-add.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/forums/forumsController.js"]})}]},controller:"ForumsCoachController"}).when("/edit-forum/:id",{templateUrl:"../user/views/forum-add.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/forums/forumsController.js"]})}]},controller:"ForumsCoachEditController"}).when("/forum-details/:id",{templateUrl:"../user/views/forum-details.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/forums/forumsController.js"]})}]},controller:"ForumsCoachController"}).when("/advices",{templateUrl:"views/advices.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/coachAdvice/coachAdviceController.js"]})}]},controller:"CoachAdviceController"}).when("/course",{templateUrl:"views/course.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/course/courseController.js"]})}]},controller:"CourseController"}).when("/course-view/:id",{templateUrl:"views/course-view.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/course/courseController.js","../../plugin/popup/style.css"]})}]},controller:"CourseController"}).when("/course-section/:sectionId",{templateUrl:"views/course-section.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/course/courseController.js","../../plugin/popup/style.css"]})}]},controller:"CourseController"}).when("/course-section-edit/:sectionId",{templateUrl:"views/course-section-add-edit.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/course/courseController.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css"]})}]},controller:"CourseEditController"}).when("/course-section-add/:courseId",{templateUrl:"views/course-section-add-edit.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/course/courseController.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css"]})}]},controller:"CourseEditController"}).when("/course-edit/:id",{templateUrl:"views/course-add-edit.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../plugin/popup/style.css","../../css/course-image-upload.css","../../js/image-upload.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css","../../app/course/courseController.js"]})}]},controller:"CourseEditController"}).when("/course-add",{templateUrl:"views/course-add-edit.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../plugin/popup/style.css","../../css/course-image-upload.css","../../js/image-upload.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css","../../app/course/courseController.js"]})}]},controller:"CourseEditController"}).when("/payments",{templateUrl:"views/payments.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/payments/coachPaymentController.js"]})}]},controller:"CoachPaymentController"}).when("/subscribers-list/:id",{templateUrl:"views/payment-subscribers-list.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/payments/coachPaymentController.js","../../angular/angular-ui-bootstarp.js","../../plugin/popup/style.css"]})}]},controller:"CoachPaymentController"}).when("/subscribers-payments",{templateUrl:"views/payment-subscription.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../angular/angular-ui-bootstarp.js","../../app/payments/coachPaymentController.js"]})}]},controller:"CoachPaymentController"}).when("/subscription-details/:id",{templateUrl:"views/payment-subscription-details.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/payments/coachPaymentController.js"]})}]},controller:"CoachPaymentController"}).when("/payment-settings",{templateUrl:"views/payment-settings.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../angular/angular-utils-pagination/dirPagination.js","../../app/coachPaymentSettings/coachPaymentSettings.js"]})}]},controller:"CoachPaymentSettingsController"}).when("/subscription-panel",{templateUrl:"views/payment-subscription-panel.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../css/custom-inputs.css","../../angular/angular-utils-pagination/dirPagination.js","../../app/coachPaymentSettings/coachSubscriptionSettings.js"]})}]},controller:"CoachSubscriptionController"}).when("/contact",{templateUrl:"../common/contact.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["https://maps.googleapis.com/maps/api/js","../../app/settings/basicInfoController.js"]})}]},controller:"ContactUsDetailsController"}).when("/faq",{templateUrl:"../common/faq.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/faq/faqController.js"]})}]},controller:"FAQCommonController"}).when("/instructions",{templateUrl:"../common/instruction.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/instruction/instructionController.js"]})}]},controller:"InstructionCommonController"}).when("/terms-of-use",{templateUrl:"../common/termsofuse.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/termsOfUse/termsOfUseController.js"]})}]},controller:"TermsOfUseCommonController"}).when("/policy",{templateUrl:"../common/privacypolicy.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"coachApp",files:["../../app/privacyPolicy/privacyPolicyController.js"]})}]},controller:"PrivacyPolicyCommonController"}).otherwise({redirectTo:"/dashboard"})}]),coachApp.controller("CoachInitialController",["$scope","requestHandler","$location",function(a,b,c){a.hideValue=1,b.getRequest("getUserId/","").then(function(b){a.username=b.data.User_Profile.name}),a.$on("$routeChangeStart",function(b,d){a.activeClass={};var e=c.url().substr(1);e=e.split("-");var f=e[0];a.activeClass[f]="active"}),a.getSocialMediaDetails=function(){b.getRequest("contactus/","").then(function(b){a.commonDetails=b.data.Contactus[0],a.address=a.commonDetails.streetaddress+", "+a.commonDetails.state+", "+a.commonDetails.city+", "+a.commonDetails.zipcode,a.hideValue=0})},a.getSocialMediaDetails()}]),coachApp.controller("LogoutController",["$cookies","$scope","$window","requestHandler",function(a,b,c,d){b.doLogout=function(){a.remove("X-CSRFToken",{path:"/"}),a.put("sessionid",void 0),c.location.href="../../#/home"}}]),coachApp.directive("block",function(){return{restrict:"A",link:function(a,b,c,d){b.on("keydown",function(a){if(64==a.which||16==a.which)a.preventDefault();else if(a.which>=48&&a.which<=57)a.preventDefault();else if(a.which>=96&&a.which<=105)a.preventDefault();else{if(!([8,13,27,37,38,39,40].indexOf(a.which)>-1))return a.preventDefault(),!1;a.preventDefault()}})}}}),coachApp.directive("validateFloat",function(){var a=/^\-?\d+((\.)\d+)?$/;return{require:"ngModel",restrict:"",link:function(b,c,d,e){e.$validators.validateFloat=function(b){return e.$isEmpty(b)||a.test(b)}}}}),coachApp.directive("isNumber",function(){return{require:"ngModel",link:function(a){a.$watch("subscriptionDetail.onemonth_amount",function(b,c){var d=String(b).split("");0!==d.length&&(2===d.length&&"-."===b||(alert(b),void 0!==b&&isNaN(b)&&(a.subscriptionDetail.onemonth_amount=c)))})}}}),coachApp.directive("validateFloat1",function(){var a=/^\s*(?=.*[1-9])\d*(?:\.\d{0,8})?\s*$/;return{require:"ngModel",restrict:"",link:function(b,c,d,e){e.$validators.validateFloat1=function(b){return e.$isEmpty(b)||a.test(b)}}}}),coachApp.directive("validNumber",function(){return{require:"?ngModel",link:function(a,b,c,d){d&&(d.$parsers.push(function(a){if(angular.isUndefined(a))var a="";d.$validators.max=function(a){return 90>=a},d.$validators.zero=function(a){return 0!=a};var b=a.replace(/[^-0-9\.]/g,""),c=b.split("-"),e=b.split(".");return angular.isUndefined(c[1])||(c[1]=c[1].slice(0,c[1].length),b=c[0]+"-"+c[1],c[0].length>0&&(b=c[0])),angular.isUndefined(e[1])||(e[1]=e[1].slice(0,2),b=e[0]+"."+e[1]),a!==b&&(d.$setViewValue(b),d.$render()),b}),b.bind("keypress",function(a){32===a.keyCode&&a.preventDefault()}))}}}),coachApp.directive("validFloatnumber",function(){var a=/^\s*(?=.*[1-9])\d*(?:\.\d{0,8})?\s*$/;return{require:"?ngModel",link:function(b,c,d,e){e&&(e.$parsers.push(function(b){if(angular.isUndefined(b))var b="";e.$validators.validateFloat1=function(b){return e.$isEmpty(b)||a.test(b)};var c=b.replace(/[^-0-9\.]/g,""),d=c.split("-"),f=c.split(".");return angular.isUndefined(d[1])||(d[1]=d[1].slice(0,d[1].length),c=d[0]+"-"+d[1],d[0].length>0&&(c=d[0])),angular.isUndefined(f[1])||(f[1]=f[1].slice(0,2),c=f[0]+"."+f[1]),b!==c&&(e.$setViewValue(c),e.$render()),c}),c.bind("keypress",function(a){32===a.keyCode&&a.preventDefault()}))}}}),coachApp.directive("validFloatnumberzero",function(){var a=/^\s*(?=.*[0-9])\d*(?:\.\d{0,8})?\s*$/;return{require:"?ngModel",link:function(b,c,d,e){e&&(e.$parsers.push(function(b){if(angular.isUndefined(b))var b="";e.$validators.validateFloat1=function(b){return e.$isEmpty(b)||a.test(b)};var c=b.replace(/[^-0-9\.]/g,""),d=c.split("-"),f=c.split(".");return angular.isUndefined(d[1])||(d[1]=d[1].slice(0,d[1].length),c=d[0]+"-"+d[1],d[0].length>0&&(c=d[0])),angular.isUndefined(f[1])||(f[1]=f[1].slice(0,2),c=f[0]+"."+f[1]),b!==c&&(e.$setViewValue(c),e.$render()),c}),c.bind("keypress",function(a){32===a.keyCode&&a.preventDefault()}))}}}),coachApp.directive("validateEmail",function(){var a=/^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,5})$/;return{require:"ngModel",restrict:"",link:function(b,c,d,e){e&&e.$validators.email&&(e.$validators.email=function(b){return e.$isEmpty(b)||a.test(b)})}}}),coachApp.factory("myGoogleAnalytics",["$rootScope","$window","$location",function(a,b,c){var d={};return d.sendPageview=function(){b.ga&&(b.ga("set","page",c.path()),b.ga("send","pageview"))},a.$on("$viewContentLoaded",d.sendPageview),d}]).run(["myGoogleAnalytics",function(a){}]);