function successMessage(e,o){return e.create("success",o,"alert"),$("html, body").animate({scrollTop:0},600),!1}function errorMessage(e,o){return e.create("danger",o,"custom-class"),$("html, body").animate({scrollTop:0},600),!1}var commonApp=angular.module("commonApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","ngCookies"]);commonApp.config(["$routeProvider","$ocLazyLoadProvider","$httpProvider",function(e,o,r){o.config({debug:!1,events:!0}),r.defaults.withCredentials=!0,r.interceptors.push(["$q","$location","$injector","$cookies",function(e,o,r,t){return{request:function(e){return e.headers["X-CSRFToken"]=t.get("X-CSRFToken"),e},response:function(e){return e},responseError:function(r){switch(r.status){case 400:break;case 401:alert("restricted");break;case 403:o.path("/login");break;case 500:}return e.reject(r)}}}]),e.when("/index",{templateUrl:"../common/index.html",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"commonApp",files:["../../plugin/vertical-carousel/vertical-carousel.js","../../plugin/vertical-carousel/vertical-carousel.css","../../app/commonController.js"]})}]},controller:"CommonController"}).when("/howItWork",{templateUrl:"../common/how-it-work.html"}).when("/aboutUs",{templateUrl:"../common/about.html"}).when("/portfolio",{templateUrl:"../common/portfolio.html"}).when("/singleProject",{templateUrl:"../common/single-project.html"}).when("/blog",{templateUrl:"../common/blog.html"}).when("/singleBlog1",{templateUrl:"../common/single-blog1.html"}).when("/singleBlog2",{templateUrl:"../common/single-blog2.html"}).when("/contact",{templateUrl:"../common/contact.html",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"commonApp",files:["../../app/settings/basicInfoController.js"]})}]},controller:"ContactUsDetailsController"}).when("/testimonials/:id",{templateUrl:"../common/testimonial.html",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"commonApp",files:["../../plugin/vertical-carousel/vertical-carousel.js","../../plugin/vertical-carousel/vertical-carousel.css","../../app/testimonial/testimonialController.js"]})}]},controller:"TestimonialUserController"}).when("/news",{templateUrl:"../common/news.html",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"commonApp",files:["../../plugin/vertical-carousel/vertical-carousel.js","../../plugin/vertical-carousel/vertical-carousel.css","../../app/latestNews/latestNewsController.js"]})}]},controller:"NewsUserController"}).when("/news/:id",{templateUrl:"../common/news.html",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"commonApp",files:["../../plugin/vertical-carousel/vertical-carousel.js","../../plugin/vertical-carousel/vertical-carousel.css","../../app/latestNews/latestNewsController.js"]})}]},controller:"NewsUserController"}).when("/FAQ",{templateUrl:"../common/FAQ.html",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"commonApp",files:["../../app/faq/faqController.js"]})}]},controller:"FAQCommonController"}).when("/instructions",{templateUrl:"../common/instruction.html",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"commonApp",files:["../../app/instruction/instructionController.js"]})}]},controller:"InstructionCommonController"}).when("/termsofuse",{templateUrl:"../common/termsofuse.html",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"commonApp",files:["../../app/termsOfUse/termsOfUseController.js"]})}]},controller:"TermsOfUseCommonController"}).when("/policy",{templateUrl:"../common/privacypolicy.html",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"commonApp",files:["../../app/privacyPolicy/privacyPolicyController.js"]})}]},controller:"PrivacyPolicyCommonController"}).when("/usefulVideos",{templateUrl:"../common/useful-videos.html",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"commonApp",files:["../../app/usefulVideos/usefulVideosController.js"]})}]},controller:"UsefulVideosController"}).otherwise({redirectTo:"/index"})}]),commonApp.controller("LoginController",["$scope","requestHandler","Flash","$window","$location",function(e,o,r,t,s){e.$on("$routeChangeStart",function(){e.activeClass={};var o=s.url().substr(1);e.activeClass[o]="active"}),e.reset=function(){e.loginForm.$setPristine(),e.forgotPasswordForm.$setPristine(),e.registerForm.$setPristine(),e.registerForm2.$setPristine(),e.username="",e.password="",e.emailid="",e.secretAnswer="",e.confirmpassword="",e.userForm={},e.userForm={emailid:""}},e.getSocialMediaDetails=function(){o.getRequest("contactus/","").then(function(o){e.commonDetails=o.data.Contactus[0]})},e.getSocialMediaDetails(),e.doLogin=function(){o.loginRequest(e.username,e.password).then(function(s){0===s.data.Response_status&&errorMessage(r,"Incorrect Username/Password"),"User not allowed"===s.data.Response_status&&errorMessage(r,"Your Account has been disabled!<br/>Please Contact Administrator."),""===s.data.Response_status&&(successMessage(r,"Login Successful!"),o.getRequest("getUserId/","").then(function(o){console.log("Role:"+o.data.Login.roleid),3==o.data.Login.roleid?(console.log("Role:"+o.data.User_Profile.isProfileUpdated),0==o.data.User_Profile.isProfileUpdated?t.location.href="../user/#/profile":t.location.href="../user/#/dashboard"):2==o.data.Login.roleid?(console.log("Role:"+o.data.User_Profile.isProfileUpdated),0==o.data.User_Profile.isProfileUpdated?t.location.href="../coach/#/profile":t.location.href="../coach/#/dashboard"):1==o.data.Login.roleid&&(e.reset(),t.location.href="../superadmin/#/dashboard")}))})},e.register=function(){e.userForm.role="3",""==e.userForm.secretquestion&&(delete e.userForm.secretquestion,delete e.userForm.secretanswer),""==e.userForm.secretanswer&&(delete e.userForm.secretquestion,delete e.userForm.secretanswer),o.postRequest("registerUser/",e.userForm).then(function(o){console.log(e.userForm),console.log(o.data.Response),0===o.data.Response?errorMessage(r,"Something went wrong! Please Try again later!"):($(".reset_password").hide(),$(".user_register").hide(),$(".secret_question").hide(),$(".user_register1").hide(),$(".user_login").show(),$(".header_title").text("Login"),successMessage(r,"Registration Successful!"),e.reset())})},e.doForgotPassword=function(){o.postRequest("getSecretQuestion/",{emailid:e.emailid}).then(function(o){0==o.data.Response_status&&errorMessage(r,"Email ID doesn't Exist!"),"User not allowed"==o.data.Response_status?errorMessage(r,"Your Account has been disabled!<br/>Please Contact Administrator."):1==o.data.Response_status?($(".user_login").hide(),$(".reset_password").hide(),$(".user_register").hide(),$(".secret_question").show(),$(".header_title").text("Register"),e.secretQuestion=o.data.secretquestion):2==o.data.Response_status?($(".reset_password").hide(),$(".user_register").hide(),$(".secret_question").hide(),$(".user_register1").hide(),$(".user_login").show(),$(".header_title").text("Login"),successMessage(r,"Please check your Email<br/>to reset the password!"),e.emailid="",e.forgotPasswordForm.$setPristine()):"User not allowed"==o.data.Response_status&&errorMessage(r,"Email ID not allowed!")})},e.checkIfEnterKeyWasPressedForLogin=function(o){var r=o.which||o.keyCode;13===r&&null!=e.username&&null!=e.password&&e.doLogin()},e.doSecretAnswerCheck=function(){o.postRequest("forgotPassword/",{emailid:e.emailid,secretanswer:e.secretAnswer}).then(function(e){0==e.data.Response_status?errorMessage(r,"Incorrect Secret Answer!"):1==e.data.Response_status&&($(".reset_password").hide(),$(".user_register").hide(),$(".secret_question").hide(),$(".user_register1").hide(),$(".user_login").show(),$(".header_title").text("Login"),successMessage(r,"Please check your registered email!!"))})}}]),commonApp.directive("replace",function(){return{require:"ngModel",scope:{regex:"@replace","with":"@with"},link:function(e,o,r,t){t.$parsers.push(function(o){if(o){var r=new RegExp(e.regex),s=o.replace(r,e["with"]);return s!==o&&(t.$setViewValue(s),t.$render()),s}})}}}),commonApp.directive("compareTo",function(){return{require:"ngModel",scope:{otherModelValue:"=compareTo"},link:function(e,o,r,t){t.$validators.compareTo=function(o){return o==e.otherModelValue},e.$watch("otherModelValue",function(){t.$validate()})}}}),commonApp.directive("emailexists",["$q","$timeout","requestHandler",function(e,o,r){var t=function(e){var o;return o=1===e?!0:!1};return{restrict:"A",require:"ngModel",link:function(s,n,l,a){a.$asyncValidators.emailexists=function(s){var n=e.defer();return o(function(){var e,o=r.postRequest("checkEmailExist/",{emailid:s}).then(function(o){e=o.data.Response_status});o.then(function(){t(e)?n.resolve():n.reject()}),e=!1},10),n.promise}}}}]),commonApp.directive("validateEmail",function(){var e=/^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,5})$/;return{require:"ngModel",restrict:"",link:function(o,r,t,s){s&&s.$validators.email&&(s.$validators.email=function(o){return s.$isEmpty(o)||e.test(o)})}}}),commonApp.directive("validateUrl",function(){var e=/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;return{require:"ngModel",restrict:"",link:function(o,r,t,s){s.$validators.validateUrl=function(o){return e.test(o)}}}});