function successMessage(e,o){return e.dismiss(),e.create("success",o,"alert"),$("html, body").animate({scrollTop:0},600),!1}function errorMessage(e,o){return e.dismiss(),e.create("danger",o,"custom-class"),$("html, body").animate({scrollTop:0},600),!1}var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","ngAnimate","angularUtils.directives.dirPagination"]);adminApp.config(["$routeProvider","$ocLazyLoadProvider","$httpProvider",function(e,o,t){o.config({debug:!1,events:!0}),t.defaults.withCredentials=!0,t.interceptors.push(["$q","$location","$injector","$cookies","$window",function(e,o,t,s,r){return{request:function(e){return e.headers["X-CSRFToken"]=s.get("X-CSRFToken"),e},response:function(e){return e},responseError:function(o){switch(o.status){case 400:break;case 401:alert("restricted");case 403:r.location.href="../../views/home/#/index?session=logout";break;case 500:}return e.reject(o)}}}]),e.when("/dashboard",{templateUrl:"views/dashboard.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/dashboard/adminDashboardController.js"]})}},controller:"AdminDashboardController"}).when("/profile",{templateUrl:"views/profile.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../css/profile-image-upload.css","../../css/password.css","../../js/image-upload.js","../../app/adminProfile/adminProfileController.js"]})}},controller:"AdminProfileController"}).when("/site",{templateUrl:"views/site-FAQ.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../app/faq/faqController.js"]})}},controller:"FAQController"}).when("/viewFAQ/:id",{templateUrl:"views/site-view-FAQ.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/faq/faqController.js"]})}},controller:"FAQViewController"}).when("/instruction",{templateUrl:"views/site-instruction.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css","../../app/instruction/instructionController.js"]})}},controller:"InstructionController"}).when("/privacyPolicy",{templateUrl:"views/site-policy.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../js/summernote.js","../../plugin/text-editor/summernote.css","../../app/privacyPolicy/privacyPolicyController.js"]})}},controller:"PrivacyPolicyController"}).when("/termsOfUse",{templateUrl:"views/site-termsofuse.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css","../../app/termsOfUse/termsOfUseController.js"]})}},controller:"TermsOfUseController"}).when("/latestNews",{templateUrl:"views/site-news.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../angular/angular-utils-pagination/dirPagination.js","../../app/latestNews/latestNewsController.js"]})}},controller:"LatestNewsController"}).when("/addLatestNews",{templateUrl:"views/site-add-or-edit-news.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css","../../app/latestNews/latestNewsController.js"]})}},controller:"LatestNewsController"}).when("/editLatestNews/:id",{templateUrl:"views/site-add-or-edit-news.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css","../../app/latestNews/latestNewsController.js"]})}},controller:"LatestNewsEditController"}).when("/viewLatestNews/:id",{templateUrl:"views/site-view-news.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../app/latestNews/latestNewsController.js"]})}},controller:"LatestNewsEditController"}).when("/forums",{templateUrl:"views/site-forums.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../angular/angular-utils-pagination/dirPagination.js","../../app/forums/forumsController.js"]})}},controller:"ForumsController"}).when("/viewForum/:id",{templateUrl:"views/site-view-forum.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../app/forums/forumsController.js"]})}},controller:"ForumsEditController"}).when("/editForum/:id",{templateUrl:"views/site-add-or-edit-forum.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css","../../app/forums/forumsController.js"]})}},controller:"ForumsEditController"}).when("/addForum",{templateUrl:"views/site-add-or-edit-forum.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css","../../app/forums/forumsController.js"]})}},controller:"ForumsController"}).when("/testimonials",{templateUrl:"views/site-testimonials.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../angular/angular-utils-pagination/dirPagination.js","../../app/testimonial/testimonialController.js","../../css/testimonial-image-upload.css","../../js/image-upload.js"]})}},controller:"TestimonialController"}).when("/addTestimonial",{templateUrl:"views/site-add-or-edit-testimonial.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/testimonial/testimonialController.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css","../../css/testimonial-image-upload.css","../../js/image-upload.js"]})}},controller:"TestimonialController"}).when("/editTestimonial/:id",{templateUrl:"views/site-add-or-edit-testimonial.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/testimonial/testimonialController.js","../../plugin/text-editor/summernote.js","../../plugin/text-editor/summernote.css","../../css/testimonial-image-upload.css","../../js/image-upload.js"]})}},controller:"TestimonialEditController"}).when("/viewTestimonial/:id",{templateUrl:"views/site-view-testimonial.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js"]})}},controller:"TestimonialEditController"}).when("/member",{templateUrl:"views/member.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/member/memberController.js"]})}},controller:"MemberController"}).when("/member-view/:id",{templateUrl:"views/member-view.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/member/memberController.js"]})}},controller:"MemberController"}).when("/coach",{templateUrl:"views/coach.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../app/coach/coachController.js"]})}},controller:"CoachController"}).when("/coach-view/:id",{templateUrl:"views/coach-view.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../css/profile-image-upload.css","../../js/image-upload.js","../../app/coach/coachController.js"]})}},controller:"CoachViewController"}).when("/coach-edit",{templateUrl:"views/coach-edit.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../css/profile-image-upload.css","../../js/image-upload.js"]})}},controller:"CoachViewController"}).when("/exercise",{templateUrl:"views/exercise.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../js/category-select.js","../../app/exercise/exerciseService.js","../../app/exercise/exerciseController.js"]})}},controller:"ExerciseController"}).when("/exercise-view/:id",{templateUrl:"views/exercise-view.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/exercise/exerciseController.js"]})}},controller:"ExerciseViewController"}).when("/exercise-edit/:id",{templateUrl:"views/exercise-add-or-edit.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../css/food-image-upload.css","../../js/image-upload.js","../../js/category-select.js","../../css/multiSelect.css","../../css/category-select.css","../../css/category-select-bootstrap.css","../../app/exercise/exerciseService.js","../../app/exercise/exerciseController.js"]})}},controller:"ExerciseEditController",title:"Edit Exercise",type:2,isNew:!1}).when("/exercise-add",{templateUrl:"views/exercise-add-or-edit.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../css/food-image-upload.css","../../js/image-upload.js","../../js/category-select.js","../../css/multiSelect.css","../../css/category-select.css","../../css/category-select-bootstrap.css","../../app/exercise/exerciseService.js","../../app/exercise/exerciseController.js"]})}},controller:"ExerciseEditController",title:"Add Exercise",type:1,isNew:!0}).when("/exercise-add/:id",{templateUrl:"views/exercise-add-or-edit.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../css/food-image-upload.css","../../js/image-upload.js","../../js/category-select.js","../../css/multiSelect.css","../../css/category-select.css","../../css/category-select-bootstrap.css","../../app/exercise/exerciseService.js","../../app/exercise/exerciseController.js"]})}},controller:"ExerciseEditController",title:"Add Exercise",type:1,isNew:!0}).when("/exerciseType",{templateUrl:"views/exercise-type.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../angular/angular-utils-pagination/dirPagination.js","../../app/exerciseType/exerciseTypeController.js"]})}},controller:"ExerciseTypeController"}).when("/settings",{templateUrl:"views/settings-contact.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/settings/basicInfoController.js"]})}},controller:"ContactUsController"}).when("/mobileApp",{templateUrl:"views/settings-mobile-app.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/settings/mobileAppSettingsController.js"]})}},controller:"MobileAppSettingsController"}).when("/paypalSettings",{templateUrl:"views/settings-paypal.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/settings/paypalController.js"]})}},controller:"PaypalSettingsController"}).when("/socialMediaSettings",{templateUrl:"views/settings-socialmedia.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/settings/socialMediaController.js"]})}},controller:"SocialMediaSettingsController"}).when("/serverSettings",{templateUrl:"views/settings-server.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/settings/serverController.js"]})}},controller:"ServerSettingsController"}).when("/food",{templateUrl:"views/food.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../js/category-select.js","../../app/food/foodService.js","../../app/food/foodController.js"]})}},controller:"FoodController"}).when("/food-edit/:id",{templateUrl:"views/food-add-or-edit.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../css/food-image-upload.css","../../js/image-upload.js","../../css/custom-inputs.css","https://cdn.rawgit.com/angular-ui/ui-select/master/dist/select.min.js","../../css/multiSelect.css","../../css/category-select.css","../../css/category-select-bootstrap.css","../../app/food/foodService.js","../../app/food/foodController.js"]})}},controller:"FoodDetailsEditController",title:"Edit Food",type:2,isNew:!1}).when("/food-view/:id",{templateUrl:"views/food-view.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../app/food/foodService.js","../../app/food/foodController.js"]})}},controller:"FoodDetailsViewController"}).when("/addFood",{templateUrl:"views/food-add-or-edit.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../css/food-image-upload.css","../../js/image-upload.js","../../css/custom-inputs.css","../../js/category-select.js","../../css/multiSelect.css","../../css/category-select.css","../../css/category-select-bootstrap.css","../../app/food/foodService.js","../../app/food/foodController.js"]})}},controller:"FoodDetailsEditController",title:"Add Food",type:1,isNew:!0}).when("/addFood/:id",{templateUrl:"views/food-add-or-edit.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../css/food-image-upload.css","../../js/image-upload.js","../../css/custom-inputs.css","../../js/category-select.js","../../css/multiSelect.css","../../css/category-select.css","../../css/category-select-bootstrap.css","../../app/food/foodService.js","../../app/food/foodController.js"]})}},controller:"FoodDetailsEditController",title:"Add Food",type:1,isNew:!0}).when("/uploadFood",{templateUrl:"views/upload-food.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/file-upload/angular-file-upload.min.js","../../app/food/foodController.js"]})}},controller:"FoodController"}).when("/foodCategory",{templateUrl:"views/food-category.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../angular/angular-utils-pagination/dirPagination.js","../../app/foodCategory/foodCategoryController.js"]})}},controller:"FoodCategoryController"}).when("/foodMeasure",{templateUrl:"views/food-Measure.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../app/food/foodMeasure.js"]})}},controller:"FoodMeasureController"}).when("/foodSuggestion",{templateUrl:"views/food-Suggestion.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../angular/angular-utils-pagination/dirPagination.js","../../app/foodSuggestion/foodSuggestionController.js"]})}},controller:"FoodSuggestionController"}).when("/foodSuggestionDetail/:id",{templateUrl:"views/food-view-suggestion.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../angular/angular-utils-pagination/dirPagination.js","../../app/foodSuggestion/foodSuggestionController.js"]})}},controller:"FoodSuggestionViewController"}).when("/exerciseSuggestion",{templateUrl:"views/exercise-suggestion.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../angular/angular-utils-pagination/dirPagination.js","../../app/exerciseSuggestion/exerciseSuggestionController.js"]})}},controller:"ExerciseSuggestionController"}).when("/exerciseSuggestionDetail/:id",{templateUrl:"views/exercise-view-suggestion.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../angular/angular-utils-pagination/dirPagination.js","../../app/exerciseSuggestion/exerciseSuggestionController.js"]})}},controller:"ExerciseSuggestionDetailViewController"}).when("/course",{templateUrl:"views/course.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/course/courseController.js","../../angular/angular-utils-pagination/dirPagination.js"]})}},controller:"CourseAdminController"}).when("/coursePending",{templateUrl:"views/course-pending.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../angular/angular-utils-pagination/dirPagination.js","../../app/course/courseController.js"]})}},controller:"CourseAdminController"}).when("/courseDetail/:id",{templateUrl:"../user/views/course-details.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../plugin/popup/jquery.leanModal.min.js","../../app/course/courseController.js"]})}},controller:"CourseAdminController"}).when("/courseView/:id",{templateUrl:"../user/views/course-view.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/course/courseController.js"]})}},controller:"CourseAdminController"}).when("/payments",{templateUrl:"views/payments.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../angular/angular-ui-bootstarp.js","../../app/payments/adminPaymentController.js"]})}},controller:"AdminPaymentController"}).when("/courseSubscribersList/:id",{templateUrl:"views/payments-course-subscribers.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../angular/angular-ui-bootstarp.js","../../plugin/popup/jquery.leanModal.min.js","../../app/payments/adminPaymentController.js"]})}},controller:"AdminPaymentController"}).when("/courseSubscriberDetails/:id",{templateUrl:"views/payments-course-subscriber-details.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../angular/angular-ui-bootstarp.js","../../app/payments/adminPaymentController.js"]})}},controller:"AdminPaymentController"}).when("/coachSubscriberDetails/:id",{templateUrl:"views/payments-coach-subscriber-details.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../angular/angular-ui-bootstarp.js","../../app/payments/adminPaymentController.js"]})}},controller:"AdminPaymentController"}).when("/coachPayment",{templateUrl:"views/payments-coach.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../angular/angular-ui-bootstarp.js","../../angular/angular-utils-pagination/dirPagination.js","../../app/payments/adminPaymentController.js"]})}},controller:"AdminPaymentController"}).when("/coachSubscribersList/:id",{templateUrl:"views/payments-coach-subscribers.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../plugin/popup/style.css","../../angular/angular-ui-bootstarp.js","../../plugin/popup/jquery.leanModal.min.js","../../app/payments/adminPaymentController.js"]})}},controller:"AdminPaymentController"}).when("/FAQ",{templateUrl:"../common/FAQ.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/faq/faqController.js"]})}},controller:"FAQCommonController"}).when("/instructions",{templateUrl:"../../views/common/instruction.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/instruction/instructionController.js"]})}},controller:"InstructionCommonController"}).when("/termsofuse",{templateUrl:"../../views/common/termsofuse.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/termsOfUse/termsOfUseController.js"]})}},controller:"TermsOfUseCommonController"}).when("/policy",{templateUrl:"../common/privacypolicy.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/privacyPolicy/privacyPolicyController.js"]})}},controller:"PrivacyPolicyCommonController"}).when("/contact",{templateUrl:"../common/contact.html",resolve:{loadMyFiles:function(e){return e.load({name:"adminApp",files:["../../js/bootstrap.min.js","../../app/settings/basicInfoController.js"]})}},controller:"ContactUsController"}).when("/portfolio",{templateUrl:"../common/portfolio.html"}).when("/singleProject",{templateUrl:"../common/single-project.html"}).when("/blog",{templateUrl:"../common/blog.html"}).otherwise({redirectTo:"/dashboard"})}]),adminApp.controller("InitialController",function(e,o,t){o.getRequest("getUserId/","").then(function(o){e.username=o.data.User_Profile.name}),e.$on("$routeChangeStart",function(){e.activeClass={};var o=t.url().substr(1);e.activeClass[o]="active"}),e.getSocialMediaDetails=function(){o.getRequest("contactus/","").then(function(o){e.commonDetails=o.data.Contactus[0],e.contactUsDetails=e.commonDetails})},e.getSocialMediaDetails()}),adminApp.controller("LogoutController",["$cookies","$scope","$window",function(e,o,t){o.doLogout=function(){e.remove("X-CSRFToken",{path:"/"}),e.put("sessionid",void 0),t.location.href="../../#/index"}}]),adminApp.directive("emailexists",function(e,o,t){var s=function(e){return 1===e?!0:!1};return{restrict:"A",require:"ngModel",link:function(r,n,i,l){l.$asyncValidators.emailexists=function(r){var n=e.defer();return o(function(){var e,o=t.postRequest("checkEmailExist/",{emailid:r}).then(function(o){e=o.data.Response_status});o.then(function(){s(e)?n.resolve():n.reject()}),e=!1},10),n.promise}}}}),adminApp.directive("categoryexists",function(e,o,t){return{restrict:"A",require:"ngModel",scope:{categoryid:"="},link:function(s,r,n,i){i.$asyncValidators.categoryexists=function(r){var n=e.defer();return o(function(){var e=s.categoryid;t.postRequest("admin/checkCategoryNameExists/",{categoryname:r,categoryid:e}).then(function(e){0==e.data.Response_status?n.resolve():n.reject()})},10),n.promise}}}}),adminApp.directive("measureexists",function(e,o,t){return{restrict:"A",require:"ngModel",scope:{measureid:"="},link:function(s,r,n,i){i.$asyncValidators.measureexists=function(r){var n=e.defer();return o(function(){var e=s.measureid;t.postRequest("admin/checkMeasureNameExists/",{measurename:r,measureid:e}).then(function(e){0==e.data.Response_status?n.resolve():n.reject()})},10),n.promise}}}}),adminApp.directive("foodexists",function(e,o,t){return{restrict:"A",require:"ngModel",scope:{foodid:"="},link:function(s,r,n,i){i.$asyncValidators.foodexists=function(r){var n=e.defer();return o(function(){var e=s.foodid;t.postRequest("admin/checkFoodNameExists/",{foodname:r,foodid:e}).then(function(e){0==e.data.Response_status?n.resolve():n.reject()})},10),n.promise}}}}),adminApp.directive("exerciseexists",function(e,o,t){return{restrict:"A",require:"ngModel",scope:{exerciseid:"="},link:function(s,r,n,i){i.$asyncValidators.exerciseexists=function(r){var n=e.defer();return o(function(){var e=s.exerciseid;t.postRequest("admin/checkExerciseNameExists/",{exercisename:r,exerciseid:e}).then(function(e){0==e.data.Response_status?n.resolve():n.reject()})},10),n.promise}}}}),adminApp.directive("typenameexists",function(e,o,t){return{restrict:"A",require:"ngModel",scope:{typeid:"="},link:function(s,r,n,i){i.$asyncValidators.typenameexists=function(r){var n=e.defer();return o(function(){var e=s.typeid;t.postRequest("admin/checkTypeName/",{typename:r,typeid:e}).then(function(e){0==e.data.Response_status?n.resolve():n.reject()})},10),n.promise}}}}),adminApp.directive("compareTo",function(){return{require:"ngModel",scope:{otherModelValue:"=compareTo"},link:function(e,o,t,s){s.$validators.compareTo=function(o){return o==e.otherModelValue},e.$watch("otherModelValue",function(){s.$validate()})}}}),adminApp.directive("validateEmail",function(){var e=/^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,5})$/;return{require:"ngModel",restrict:"",link:function(o,t,s,r){r&&r.$validators.email&&(r.$validators.email=function(o){return r.$isEmpty(o)||e.test(o)})}}}),adminApp.directive("validateUrl",function(){var e=/^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;return{require:"ngModel",restrict:"",link:function(o,t,s,r){r.$validators.validateUrl=function(o){return e.test(o)}}}}),adminApp.directive("validateNumber",function(){var e=/^\d+$/;return{require:"ngModel",restrict:"",link:function(o,t,s,r){r.$validators.validateNumber=function(o){return e.test(o)},t.bind("keypress",function(e){32===e.keyCode&&e.preventDefault()})}}}),adminApp.directive("uiSelectRequired",function(){return{require:"ngModel",link:function(e,o,t,s){s.$validators.uiSelectRequired=function(e,o){var t;if(angular.isArray(e))t=e;else{if(!angular.isArray(o))return!1;t=o}return t.length>0}}}}),adminApp.directive("checkRequired",function(){return{require:"ngModel",restrict:"A",link:function(e,o,t,s){s.$validators.checkRequired=function(o,s){var r=o||s,n=e.$eval(t.ngTrueValue)||!0;return r&&n===r}}}}),adminApp.directive("foodNameExists",function(e,o,t){return{restrict:"A",require:"ngModel",link:function(s,r,n,i){i.$asyncValidators.foodNameExists=function(s){var r=e.defer();return o(function(){var e=t.postRequest("admin/searchFoodnamebyAdmin/",{foodname:s}).then(function(e){return e.data.Response_status});e.then(function(e){"0"==e?r.resolve():r.reject()}),isNewFood=!1},10),r.promise}}}}),adminApp.directive("checkboxGroup",function(){return{restrict:"E",controller:function(e,o){var t,s=this,r=[];s.validate=function(){var e=0;angular.forEach(r,function(o){o.$modelValue&&e++});var o=e>=t;angular.forEach(r,function(e){e.$setValidity("checkboxGroup-minRequired",o,s)})},s.register=function(e){r.push(e)},s.deregister=function(e){if(this.ngModels){var o=this.ngModels.indexOf(e);-1!=o&&this.ngModels.splice(o,1)}else;},e.$watch(o.minRequired,function(e){t=parseInt(e,10),s.validate()})}}}),adminApp.directive("input",function(){return{restrict:"E",require:["?^checkboxGroup","?ngModel"],link:function(e,o,t,s){var r=s[0],n=s[1];"checkbox"==t.type&&r&&n&&(r.register(n),e.$watch(function(){return n.$modelValue},r.validate),e.$on("$destroy",function(){r.deregister(n)}))}}}),adminApp.directive("validateFloat",function(){var e=/^\-?\d+((\.)\d+)?$/;return{require:"ngModel",restrict:"",link:function(o,t,s,r){r.$validators.validateFloat=function(o){return r.$isEmpty(o)||e.test(o)}}}}),adminApp.directive("validateFloat1",function(){var e=/^\s*(?=.*[1-9])\d*(?:\.\d{0,8})?\s*$/;return{require:"ngModel",restrict:"",link:function(o,t,s,r){r.$validators.validateFloat1=function(o){return r.$isEmpty(o)||e.test(o)}}}}),adminApp.directive("validateInteger",function(){var e=/^\-?\d*$/;return{require:"ngModel",restrict:"",link:function(o,t,s,r){r.$validators.validateInteger=function(o){return r.$isEmpty(o)||e.test(o)}}}}),adminApp.filter("startsWithLetter",function(){return function(e,o){var t=[],s=new RegExp(o,"i");if(e)for(var r=0;r<e.length;r++){var n=e[r];s.test(n.name)&&t.push(n)}else;return t}}),adminApp.factory("siteMenuService",function(){var e=[{id:4,name:"FAQ List",icon:"question-circle",href:"site",active:""},{name:"Instruction",icon:"exclamation-circle",href:"instruction",active:""},{name:"Privacy Policy",icon:"pencil",href:"privacyPolicy",active:""},{name:"Terms Of Use",icon:"file-text",href:"termsOfUse",active:""},{id:3,name:"Testimonials",icon:"comment",href:"testimonials",active:""},{id:2,name:"Latest News",icon:"newspaper-o",href:"latestNews",active:""},{id:1,name:"Forums",icon:"comments",href:"forums",active:""},{name:"Address Info",icon:"map-marker",href:"settings",active:""},{name:"Mobile App",icon:"tablet",href:"mobileApp",active:""},{name:"Payment Info",icon:"dollar",href:"paypalSettings",active:""},{name:"Server",icon:"server",href:"serverSettings",active:""},{name:"Social Media",icon:"connectdevelop",href:"socialMediaSettings",active:""}];return e}),adminApp.directive("focusMe",function(e,o){return{link:function(t,s,r){var n=o(r.focusMe);t.$watch(n,function(o){console.log("value=",o),o===!0&&e(function(){s[0].focus()})}),s.bind("blur",function(){console.log("blur"),t.$apply(n.assign(t,!1))})}}});