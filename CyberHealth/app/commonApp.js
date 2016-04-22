function successMessage(a,b){return a.create("success",b,"alert"),$("html, body").animate({scrollTop:0},600),!1}function errorMessage(a,b){return a.create("danger",b,"custom-class"),$("html, body").animate({scrollTop:0},600),!1}var commonApp=angular.module("commonApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","ngCookies"]);commonApp.config(["$routeProvider","$ocLazyLoadProvider","$httpProvider",function(a,b,c){b.config({debug:!1,events:!0}),c.defaults.withCredentials=!0,c.interceptors.push(["$q","$location","$injector","$cookies",function(a,b,c,d){return{request:function(a){return a.headers["X-CSRFToken"]=d.get("X-CSRFToken"),a},response:function(a){return a},responseError:function(c){switch(c.status){case 400:break;case 401:alert("restricted");break;case 403:b.path("/login");break;case 500:}return a.reject(c)}}}]),a.when("/home",{templateUrl:"views/common/index.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["plugin/vertical-carousel/vertical-carousel.js","app/commonController.js"]})}]},controller:"CommonController"}).when("/home/:id",{templateUrl:"views/common/index.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["plugin/vertical-carousel/vertical-carousel.js","app/commonController.js"]})}]},controller:"CommonController"}).when("/how-it-work",{templateUrl:"../common/how-it-work.html"}).when("/aboutus",{templateUrl:"../common/about.html"}).when("/portfolio",{templateUrl:"../common/portfolio.html"}).when("/singleProject",{templateUrl:"../common/single-project.html"}).when("/blog",{templateUrl:"../common/blog.html"}).when("/single-blog1",{templateUrl:"../common/single-blog1.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/blog/blogController.js"]})}]},controller:"BlogController"}).when("/single-blog2",{templateUrl:"../common/single-blog2.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/blog/blogController.js"]})}]},controller:"BlogController"}).when("/contact",{templateUrl:"../common/contact.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/settings/basicInfoController.js","https://maps.googleapis.com/maps/api/js"]})}]},controller:"ContactUsDetailsController"}).when("/testimonials/:id",{templateUrl:"../common/testimonial.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../plugin/vertical-carousel/vertical-carousel.js","../../app/testimonial/testimonialController.js"]})}]},controller:"TestimonialUserController"}).when("/news",{templateUrl:"../common/news.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../plugin/vertical-carousel/vertical-carousel.js","../../app/latestNews/latestNewsController.js"]})}]},controller:"NewsUserController"}).when("/news/:id",{templateUrl:"../common/news.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../plugin/vertical-carousel/vertical-carousel.js","../../app/latestNews/latestNewsController.js"]})}]},controller:"NewsUserController"}).when("/faq",{templateUrl:"../common/FAQ.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/faq/faqController.js"]})}]},controller:"FAQCommonController"}).when("/instructions",{templateUrl:"../common/instruction.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/instruction/instructionController.js"]})}]},controller:"InstructionCommonController"}).when("/terms-of-use",{templateUrl:"../common/termsofuse.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/termsOfUse/termsOfUseController.js"]})}]},controller:"TermsOfUseCommonController"}).when("/policy",{templateUrl:"../common/privacypolicy.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/privacyPolicy/privacyPolicyController.js"]})}]},controller:"PrivacyPolicyCommonController"}).when("/useful-videos",{templateUrl:"../common/useful-videos.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/usefulVideos/usefulVideosController.js"]})}]},controller:"UsefulVideosController"}).when("/healthy-tips",{templateUrl:"../common/healthy-tips.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsListController"}).when("/healthy-tips-1",{templateUrl:"../common/healthy-tips-1.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-2",{templateUrl:"../common/healthy-tips-2.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-3",{templateUrl:"../common/healthy-tips-3.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-4",{templateUrl:"../common/healthy-tips-4.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-5",{templateUrl:"../common/healthy-tips-5.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-6",{templateUrl:"../common/healthy-tips-6.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-7",{templateUrl:"../common/healthy-tips-7.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-8",{templateUrl:"../common/healthy-tips-8.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-9",{templateUrl:"../common/healthy-tips-9.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-10",{templateUrl:"../common/healthy-tips-10.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-11",{templateUrl:"../common/healthy-tips-11.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-12",{templateUrl:"../common/healthy-tips-12.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-13",{templateUrl:"../common/healthy-tips-13.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).when("/healthy-tips-14",{templateUrl:"../common/healthy-tips-14.html",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"commonApp",files:["../../app/healthyTips/healthyTipsController.js"]})}]},controller:"HealthyTipsController"}).otherwise({redirectTo:"/home"})}]),commonApp.controller("LoginController",["$scope","requestHandler","Flash","$window","$location","$element",function(a,b,c,d,e,f){a.hideValue=1,a.getSocialMediaDetails=function(){b.getRequest("contactus/","").then(function(b){a.commonDetails=b.data.Contactus[0],a.address=a.commonDetails.streetaddress+", "+a.commonDetails.state+", "+a.commonDetails.city+", "+a.commonDetails.zipcode,a.hideValue=0})},a.init=function(){a.getSocialMediaDetails()},a.$on("$routeChangeStart",function(b,c){a.activeClass={};var d=e.url().substr(1);d=d.split("-");var f=d[0];a.activeClass[f]="active"}),a.reset=function(){var b=f.find("form").eq(0).controller("form");b.$setPristine();var c=f.find("form").eq(1).controller("form");c.$setPristine();var d=f.find("form").eq(2).controller("form");d.$setPristine();var e=f.find("form").eq(3).controller("form");e.$setPristine();var g=f.find("form").eq(4).controller("form");g.$setPristine(),a.username="",a.password="",a.emailid="",a.secretAnswer="",a.confirmpassword="",a.userForm={},a.userForm={emailid:""}},a.doLogin=function(){b.loginRequest(a.username,a.password).then(function(e){0===e.data.Response_status&&errorMessage(c,"Incorrect Username/Password"),"User not allowed"===e.data.Response_status&&errorMessage(c,"Your Account has been disabled!<br/>Please Contact Administrator."),""===e.data.Response_status&&(successMessage(c,"Login Successful!"),b.getRequest("getUserId/","").then(function(c){3==c.data.Login.roleid?0==c.data.User_Profile.isProfileUpdated?d.location.href=b.domainURL()+"views/user/#/profile":d.location.href=b.domainURL()+"views/user/#/dashboard":2==c.data.Login.roleid?0==c.data.User_Profile.isProfileUpdated?d.location.href=b.domainURL()+"views/coach/#/profile":d.location.href=b.domainURL()+"views/coach/#/dashboard":1==c.data.Login.roleid&&(a.reset(),d.location.href=b.domainURL()+"views/superadmin/#/dashboard")}))})},a.register=function(){a.userForm.role="3",""==a.userForm.secretquestion&&(delete a.userForm.secretquestion,delete a.userForm.secretanswer),""==a.userForm.secretanswer&&(delete a.userForm.secretquestion,delete a.userForm.secretanswer),b.postRequest("registerUser/",a.userForm).then(function(b){0===b.data.Response?errorMessage(c,"Something went wrong! Please Try again later!"):($(".reset_password").hide(),$(".user_register").hide(),$(".secret_question").hide(),$(".user_register1").hide(),$(".user_login").show(),$(".header_title").text("Login"),successMessage(c,"Registration Successful!"),a.reset())})},a.doForgotPassword=function(){b.postRequest("getSecretQuestion/",{emailid:a.emailid}).then(function(b){0==b.data.Response_status&&errorMessage(c,"Email ID doesn't Exist!"),"User not allowed"==b.data.Response_status?errorMessage(c,"Your Account has been disabled!<br/>Please Contact Administrator."):1==b.data.Response_status?($(".user_login").hide(),$(".reset_password").hide(),$(".user_register").hide(),$(".secret_question").show(),$(".header_title").text("Register"),a.secretQuestion=b.data.secretquestion):2==b.data.Response_status?($(".reset_password").hide(),$(".user_register").hide(),$(".secret_question").hide(),$(".user_register1").hide(),$(".user_login").show(),$(".header_title").text("Login"),successMessage(c,"Please check your Email<br/>to reset the password!"),a.emailid="",a.forgotPasswordForm.$setPristine()):"User not allowed"==b.data.Response_status&&errorMessage(c,"Email ID not allowed!")})},a.checkIfEnterKeyWasPressedForLogin=function(b){var c=b.which||b.keyCode;13===c&&null!=a.username&&null!=a.password&&a.doLogin()},a.doSecretAnswerCheck=function(){b.postRequest("forgotPassword/",{emailid:a.emailid,secretanswer:a.secretAnswer}).then(function(a){0==a.data.Response_status?errorMessage(c,"Incorrect Secret Answer!"):1==a.data.Response_status&&($(".reset_password").hide(),$(".user_register").hide(),$(".secret_question").hide(),$(".user_register1").hide(),$(".user_login").show(),$(".header_title").text("Login"),successMessage(c,"Please check your registered email!!"))})}}]),commonApp.directive("replace",function(){return{require:"ngModel",scope:{regex:"@replace","with":"@with"},link:function(a,b,c,d){d.$parsers.push(function(b){if(b){var c=new RegExp(a.regex),e=b.replace(c,a["with"]);return e!==b&&(d.$setViewValue(e),d.$render()),e}})}}}),commonApp.directive("compareTo",function(){return{require:"ngModel",scope:{otherModelValue:"=compareTo"},link:function(a,b,c,d){d.$validators.compareTo=function(b){return b==a.otherModelValue},a.$watch("otherModelValue",function(){d.$validate()})}}}),commonApp.directive("emailexists",["$q","$timeout","requestHandler",function(a,b,c){var d=function(a){var b;return b=1===a};return{restrict:"A",require:"ngModel",link:function(e,f,g,h){h.$asyncValidators.emailexists=function(e){var f=a.defer();return b(function(){var a,b=c.postRequest("checkEmailExist/",{emailid:e}).then(function(b){a=b.data.Response_status});b.then(function(){d(a)?f.resolve():f.reject()}),a=!1},10),f.promise}}}}]),commonApp.directive("validateEmail",function(){var a=/^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,5})$/;return{require:"ngModel",restrict:"",link:function(b,c,d,e){e&&e.$validators.email&&(e.$validators.email=function(b){return e.$isEmpty(b)||a.test(b)})}}}),commonApp.directive("validateUrl",function(){var a=/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;return{require:"ngModel",restrict:"",link:function(b,c,d,e){e.$validators.validateUrl=function(b){return a.test(b)}}}}),commonApp.factory("myGoogleAnalytics",["$rootScope","$window","$location",function(a,b,c){var d={};return d.sendPageview=function(){b.ga&&(b.ga("set","page",c.path()),b.ga("send","pageview"))},a.$on("$viewContentLoaded",d.sendPageview),d}]).run(["myGoogleAnalytics",function(a){}]);