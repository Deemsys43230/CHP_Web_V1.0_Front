var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','ngAnimate']);

adminApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

    function($routeProvider,$ocLazyLoadProvider,$httpProvider) {
        $ocLazyLoadProvider.config({
            debug:false,
            events:true
        });

        //Do For Cross Orgin Management
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push(['$q','$location','$injector','$cookies','$window',function ($q, $location,$injector,$cookies,$window) {

            return {

                'request': function(request) {
                    request.headers['X-CSRFToken']=$cookies.get('X-CSRFToken');
                    return request;
                },
                'response': function (response) {
                    return response;
                },
                'responseError': function (rejection) {
                    switch (rejection.status) {
                        case 400: {
                            break;
                        }
                        case 401:{
                            alert("restricted");
                        }
                        case 403: {
                            // alert("Your session has been expired.Please login again!!!");
                            /*$window.location.href="../../views/home/#/index?session=logout";*/
                            $window.location.href="../../#/home/logout";
                            //$location.path("/login");
                            break;
                        }
                        case 500: {
                            break;
                        }
                        default : {
                            break;
                        }
                    }
                    return $q.reject(rejection);
                }
            };
        }]);
        $routeProvider.
            when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/dashboard/adminDashboardController.js'
                            ]
                        })
                    }]
                },
                controller:'AdminDashboardController'
            }).
            when('/profile', {
                templateUrl: 'views/profile.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/profile-image-upload.css',
                                '../../css/password.css',
                                '../../js/image-upload.js',
                                '../../app/adminProfile/adminProfileController.js'
                            ]
                        })
                    }]
                },
                controller:'AdminProfileController'
            }).
            when('/site', {
                templateUrl: 'views/site-FAQ.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/faq/faqController.js'
                            ]
                        })
                    }]
                },
                controller:'FAQController'
            }).
            when('/view-faq/:id', {
                templateUrl: 'views/site-view-FAQ.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/faq/faqController.js'
                            ]
                        })
                    }]
                },
                controller:'FAQViewController'
            }).
            when('/instruction', {
                templateUrl: 'views/site-instruction.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/instruction/instructionController.js'
                            ]
                        })
                    }]
                },
                controller:'InstructionController'
            }).
            when('/privacy-policy', {
                templateUrl: 'views/site-policy.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/privacyPolicy/privacyPolicyController.js'
                            ]
                        })
                    }]
                },
                controller:'PrivacyPolicyController'
            }).
            when('/terms-of-use-edit', {
                templateUrl: 'views/site-termsofuse.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/termsOfUse/termsOfUseController.js'
                            ]
                        })
                    }]
                },
                controller:'TermsOfUseController'
            }).
            when('/latest-news', {
                templateUrl: 'views/site-news.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }]
                },
                controller:'LatestNewsController'
            }).
            when('/add-latest-news', {
                templateUrl: 'views/site-add-or-edit-news.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }]
                },
                controller:'LatestNewsController'
            }).
            when('/edit-latest-news/:id', {
                templateUrl: 'views/site-add-or-edit-news.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }]
                },
                controller:'LatestNewsEditController'
            }).
            when('/view-latest-news/:id', {
                templateUrl: 'views/site-view-news.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }]
                },
                controller:'LatestNewsEditController'
            }).
            when('/forums', {
                templateUrl: 'views/site-forums.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsController'
            }).
            when('/view-forum/:id', {
                templateUrl: 'views/site-view-forum.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsEditController'
            }).
            when('/edit-forum/:id', {
                templateUrl: 'views/site-add-or-edit-forum.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsEditController'
            }).
            when('/add-forum', {
                templateUrl: 'views/site-add-or-edit-forum.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsController'
            }).
            when('/testimonials', {
                templateUrl: 'views/site-testimonials.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/testimonial/testimonialController.js',
                                '../../css/testimonial-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        })
                    }]
                },
                controller:'TestimonialController'
            }).
            when('/add-testimonial', {
                templateUrl: 'views/site-add-or-edit-testimonial.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/testimonial/testimonialController.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../css/testimonial-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        })
                    }]
                },
                controller:'TestimonialController'
            }).
            when('/edit-testimonial/:id', {
                templateUrl: 'views/site-add-or-edit-testimonial.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/testimonial/testimonialController.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../css/testimonial-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        })
                    }]
                },
                controller:'TestimonialEditController'
            }).
            when('/view-testimonial/:id', {
                templateUrl: 'views/site-view-testimonial.html',
                controller:'TestimonialEditController'
            }).
            when('/member', {
                templateUrl: 'views/member.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/member/memberController.js'
                            ]
                        })
                    }]
                },
                controller:'MemberController'
            }).
            when('/member-view/:id', {
                templateUrl: 'views/member-view.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/member/memberController.js'
                            ]
                        })
                    }]
                },
                controller:'MemberController'
            }).

            when('/coach', {
                templateUrl: 'views/coach.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coach/coachController.js'
                            ]
                        })
                    }]
                },
                controller:"CoachController"
            }).
            when('/coach-view/:id', {
                templateUrl: 'views/coach-view.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../css/profile-image-upload.css',
                                '../../js/image-upload.js',
                                '../../app/coach/coachController.js'
                            ]
                        })
                    }]
                },
                controller:"CoachViewController"
            }).
            when('/coach-edit', {
                templateUrl: 'views/coach-edit.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/profile-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        })
                    }]
                },
                controller:'CoachViewController'
            }).
            when('/exercise', {
                templateUrl: 'views/exercise.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/category-select.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/exercise/exerciseService.js',
                                '../../app/exercise/exerciseController.js'
                            ]
                        })
                    }]
                },
                controller:'ExerciseController'
            }).
            when('/exercise-view/:id', {
                templateUrl: 'views/exercise-view.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/exercise/exerciseController.js'
                            ]
                        })
                    }]
                },
                controller:'ExerciseViewController'
            }).
            when('/exercise-edit/:id', {
                templateUrl: 'views/exercise-add-or-edit.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/food-image-upload.css',
                                '../../js/image-upload.js',
                                '../../js/category-select.js',
                                '../../css/multiSelect.css',
                                '../../css/category-select.css',
                                '../../css/category-select-bootstrap.css',
                                '../../app/exercise/exerciseService.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/exercise/exerciseController.js'
                            ]
                        })
                    }]
                },
                controller:'ExerciseEditController',
                title:'Edit Exercise',
                type:2, //For Update type=1
                isNew:false
            }).
            when('/exercise-add', {
                templateUrl: 'views/exercise-add-or-edit.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/food-image-upload.css',
                                '../../js/category-select.js',
                                '../../css/multiSelect.css',
                                '../../css/category-select.css',
                                '../../css/category-select-bootstrap.css',
                                '../../app/exercise/exerciseService.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/exercise/exerciseController.js'
                            ]
                        })
                    }]
                },
                controller:'ExerciseEditController',
                title:'Add Exercise',
                type:1,//For Add type=1
                isNew:true
            }).
            when('/exercise-add/:id', {
                templateUrl: 'views/exercise-add-or-edit.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/food-image-upload.css',
                                '../../js/image-upload.js',
                                '../../js/category-select.js',
                                '../../css/multiSelect.css',
                                '../../css/category-select.css',
                                '../../css/category-select-bootstrap.css',
                                '../../app/exercise/exerciseService.js',
                                '../../app/exercise/exerciseController.js'
                            ]
                        })
                    }]
                },
                controller:'ExerciseEditController',
                title:'Add Exercise',
                type:1,//For Add type=1
                isNew:true
            }).
            when('/exercise-type', {
                templateUrl: 'views/exercise-type.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/exerciseType/exerciseTypeController.js'
                            ]
                        })
                    }]
                },
                controller:'ExerciseTypeController'
            }).
            when('/settings', {
                templateUrl: 'views/settings-contact.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/settings/basicInfoController.js'
                            ]
                        })
                    }]
                },
                controller:'ContactUsController'
            }).
            when('/mobile-app', {
                templateUrl: 'views/settings-mobile-app.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../app/settings/mobileAppSettingsController.js'
                            ]
                        })
                    }]
                },
                controller:'MobileAppSettingsController'
            }).
            when('/paypal-settings', {
                templateUrl: 'views/settings-paypal.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../app/settings/paypalController.js'
                            ]
                        })
                    }]
                },
                controller:'PaypalSettingsController'
            }).
            when('/social-media-settings', {
                templateUrl: 'views/settings-socialmedia.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../app/settings/socialMediaController.js'
                            ]
                        })
                    }]
                },
                controller:'SocialMediaSettingsController'
            }).
            when('/server-settings', {
                templateUrl: 'views/settings-server.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../app/settings/serverController.js'
                            ]
                        })
                    }]
                },
                controller:'ServerSettingsController'
            }).
            when('/food', {
                templateUrl: 'views/food.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/category-select.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/food/foodService.js',
                                '../../app/food/foodController.js'
                            ]
                        })
                    }]
                },
                controller:'FoodController'
            }).
            when('/food-edit/:id', {
                templateUrl: 'views/food-add-or-edit.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[

                                '../../plugin/popup/style.css',
                                '../../css/food-image-upload.css',
                                '../../js/image-upload.js',
                                '../../js/category-select.js',
                                '../../css/custom-inputs.css',
                                'https://cdn.rawgit.com/angular-ui/ui-select/master/dist/select.min.js',
                                '../../css/multiSelect.css',
                                '../../css/category-select.css',
                                '../../css/category-select-bootstrap.css',
                                '../../app/food/foodService.js',
                                '../../app/food/foodController.js'
                            ]
                        })
                    }]
                },
                controller:'FoodDetailsEditController',
                title:'Edit Food',
                type:2, //For Update type=1
                isNew:false

            }).
            when('/food-view/:id', {
                templateUrl: 'views/food-view.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../app/food/foodService.js',
                                '../../app/food/foodController.js'
                            ]
                        })
                    }]
                },
                controller:'FoodDetailsViewController'
            }).
            when('/add-food', {
                templateUrl: 'views/food-add-or-edit.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/food-image-upload.css',
                                '../../js/category-select.js',
                                '../../css/multiSelect.css',
                                '../../css/category-select.css',
                                '../../css/category-select-bootstrap.css',
                                '../../css/custom-inputs.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/food/foodService.js',
                                '../../app/food/foodController.js'
                            ]
                        })
                    }]
                },
                controller:'FoodDetailsEditController',
                title:'Add Food',
                type:1,//For Add type=1
                isNew:true
            }).
            when('/add-food/:id', {
                templateUrl: 'views/food-add-or-edit.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/food-image-upload.css',
                                '../../js/image-upload.js',
                                '../../css/custom-inputs.css',
                                '../../js/category-select.js',
                                '../../css/multiSelect.css',
                                '../../css/category-select.css',
                                '../../css/category-select-bootstrap.css',
                                '../../app/food/foodService.js',
                                '../../app/food/foodController.js'
                            ]
                        })
                    }]
                },
                controller:'FoodDetailsEditController',
                title:'Add Food',
                type:1,//For Add type=1
                isNew:true
            }).
            when('/upload-food', {
                templateUrl: 'views/upload-food.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/file-upload/angular-file-upload.min.js',
                                '../../app/food/foodController.js'
                            ]
                        })
                    }]
                },
                controller:'FoodController'
            }).
            when('/food-category', {
                templateUrl: 'views/food-category.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/foodCategory/foodCategoryController.js'
                            ]
                        })
                    }]
                },
                controller:'FoodCategoryController'
            }).
            when('/food-measure', {
                templateUrl: 'views/food-Measure.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/food/foodMeasure.js'
                            ]
                        })
                    }]
                },
                controller:'FoodMeasureController'
            }).
            when('/food-suggestion', {
                templateUrl: 'views/food-Suggestion.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/foodSuggestion/foodSuggestionController.js'
                            ]
                        })
                    }]
                },
                controller:'FoodSuggestionController'
            }).
            when('/food-suggestion-detail/:id', {
                templateUrl: 'views/food-view-suggestion.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/foodSuggestion/foodSuggestionController.js'
                            ]
                        })
                    }]
                },
                controller:'FoodSuggestionViewController'
            }).
            when('/exercise-suggestion', {
                templateUrl: 'views/exercise-suggestion.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/exerciseSuggestion/exerciseSuggestionController.js'
                            ]
                        })
                    }]
                },
                controller:'ExerciseSuggestionController'
            }).
            when('/exercise-suggestion-detail/:id', {
                templateUrl: 'views/exercise-view-suggestion.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/exerciseSuggestion/exerciseSuggestionController.js'
                            ]
                        })
                    }]
                },
                controller:'ExerciseSuggestionDetailViewController'
            }).
            when('/course', {
                templateUrl: 'views/course.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/course/courseController.js',
                                '../../angular/angular-utils-pagination/dirPagination.js'
                            ]
                        })
                    }]
                },
                controller:'CourseAdminController'
            }).
            when('/course-pending', {
                templateUrl: 'views/course-pending.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/course/courseController.js'
                            ]
                        })
                    }]
                },
                controller:'CourseAdminController'
            }).

            when('/course-detail/:id', {
                templateUrl: '../user/views/course-details.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../app/course/courseController.js'
                            ]
                        })
                    }]
                },
                controller:'CourseAdminController'
            }).
            when('/course-view/:id', {
                templateUrl: '../user/views/course-view.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/course/courseController.js'
                            ]
                        })
                    }]
                },
                controller:'CourseAdminController'
            }).
            when('/payments', {
                templateUrl: 'views/payments.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../angular/angular-ui-bootstarp.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/payments/adminPaymentController.js'
                            ]
                        })
                    }]
                },
                controller:'AdminPaymentController'
            }).
            when('/course-subscribers-list/:id', {
                templateUrl: 'views/payments-course-subscribers.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-ui-bootstarp.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/payments/adminPaymentController.js'
                            ]
                        })
                    }]
                },
                controller:'AdminPaymentController'
            }).
            when('/course-subscriber-details/:id', {
                templateUrl: 'views/payments-course-subscriber-details.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../angular/angular-ui-bootstarp.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/payments/adminPaymentController.js'
                            ]
                        })
                    }]
                },
                controller:'AdminPaymentController'
            }).
            when('/coach-subscriber-details/:id', {
                templateUrl: 'views/payments-coach-subscriber-details.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../angular/angular-ui-bootstarp.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/payments/adminPaymentController.js'
                            ]
                        })
                    }]
                },
                controller:'AdminPaymentController'
            }).
            when('/coach-payment', {
                templateUrl: 'views/payments-coach.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../angular/angular-ui-bootstarp.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/payments/adminPaymentController.js'
                            ]
                        })
                    }]
                },
                controller:'AdminPaymentController'
            }).
            when('/coach-subscribers-list/:id', {
                templateUrl: 'views/payments-coach-subscribers.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-ui-bootstarp.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/payments/adminPaymentController.js'
                            ]
                        })
                    }]
                },
                controller:'AdminPaymentController'
            }).
            when('/faq', {
                templateUrl: '../common/faq.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/faq/faqController.js'
                            ]
                        })
                    }]
                },
                controller:'FAQCommonController'
            }).
            when('/instructions', {
                templateUrl: '../../views/common/instruction.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/instruction/instructionController.js'
                            ]
                        })
                    }]
                },
                controller:'InstructionCommonController'
            }).
            when('/terms-of-use', {
                templateUrl: '../../views/common/termsofuse.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/termsOfUse/termsOfUseController.js'
                            ]
                        })
                    }]
                },
                controller:'TermsOfUseCommonController'
            }).
            when('/policy', {
                templateUrl: '../common/privacypolicy.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/privacyPolicy/privacyPolicyController.js'
                            ]
                        })
                    }]
                },
                controller:'PrivacyPolicyCommonController'
            }).
            when('/contact', {
                templateUrl: '../common/contact.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                'https://maps.googleapis.com/maps/api/js',
                                '../../app/settings/basicInfoController.js'
                            ]
                        })
                    }]
                },
                controller:'ContactUsController'
            }).
            when('/portfolio', {
                templateUrl: '../common/portfolio.html'
            }).
            when('/singleProject', {
                templateUrl: '../common/single-project.html'
            }).
            when('/blog', {
                templateUrl: '../common/blog.html'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);
//Initial Controller for Username
adminApp.controller("InitialController",['$scope','requestHandler','$location',function($scope,requestHandler,$location){
    $scope.hideValue=1;

    requestHandler.getRequest("getUserId/","").then(function(response){
        $scope.username=response.data.User_Profile.name;
    });

    $scope.$on('$routeChangeStart', function(next, current) {
        $scope.activeClass={};
        var currentPage = $location.url().substr(1);
        $scope.activeClass[currentPage]='active';
    });

    $scope.getSocialMediaDetails=function(){
        requestHandler.getRequest("contactus/","").then(function(response){
            $scope.commonDetails = response.data.Contactus[0];
            $scope.address=$scope.commonDetails.streetaddress+', '+$scope.commonDetails.state+', '+$scope.commonDetails.city+', '+$scope.commonDetails.zipcode;
            $scope.contactUsDetails=$scope.commonDetails;
            $scope.hideValue=0;
        });
    };

    $scope.getSocialMediaDetails();
}]);

//Controller For Logout
adminApp.controller("LogoutController",['$cookies','$scope','$window','requestHandler',function($cookies,$scope,$window,requestHandler){

    $scope.doLogout=function(){
        $cookies.remove("X-CSRFToken",{path: '/'});
        $cookies.put('sessionid',undefined);
        $window.location.href="../../#/home";
    };

}]);

//Email Already Exists
adminApp.directive("emailexists",['$q','$timeout','requestHandler', function ($q, $timeout,requestHandler) {

    var CheckEmailExists = function (isNew) {

        if(isNew===1)
            return true;
        else
            return false;
    };

    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.emailexists = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var isNew;
                    var sendRequest=requestHandler.postRequest("checkEmailExist/",{"emailid":modelValue}).then(function(response){
                        isNew=response.data.Response_status;
                    });

                    sendRequest.then(function(){

                        if (CheckEmailExists(isNew)){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        }
                    });
                    isNew = false;
                }, 10);

                return defer.promise;
            }
        }
    };
}]);

/*//Category Already Exists
adminApp.directive("categoryexists", function ($q, $timeout,requestHandler) {

      return {
        restrict: "A",
        require: "ngModel",

        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.categoryexists = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var sendRequest=requestHandler.postRequest("admin/checkCategoryNameExists/",{"categoryname":modelValue}).then(function(response){
                        alert(response.data.Response_status);
                        if (response.data.Response_status==0){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        }
                    });

                }, 10);

                return defer.promise;
            }
        }
    };
});*/

//Category Already Exists
adminApp.directive("categoryexists",['$q','$timeout','requestHandler', function ($q, $timeout,requestHandler) {

    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            "categoryid" : "="
        },
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.categoryexists = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var categoryid = scope.categoryid;
                    var sendRequest=requestHandler.postRequest("admin/checkCategoryNameExists/",{"categoryname":modelValue,"categoryid":categoryid}).then(function(response){
                        if (response.data.Response_status==0){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        }
                    });

                }, 10);

                return defer.promise;
            }
        }
    };
}]);


//Category Already Exists
adminApp.directive("measureexists", ['$q','$timeout','requestHandler', function ($q, $timeout,requestHandler) {

    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            "measureid" : "="
        },
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.measureexists = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var measureid = scope.measureid;
                    var sendRequest=requestHandler.postRequest("admin/checkMeasureNameExists/",{"measurename":modelValue,"measureid":measureid}).then(function(response){
                        if (response.data.Response_status==0){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        }
                    });

                }, 10);

                return defer.promise;
            }
        }
    };
}]);

//Food Already Exists
adminApp.directive("foodexists",['$q','$timeout','requestHandler', function ($q, $timeout,requestHandler) {

    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            "foodid" : "="
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$asyncValidators.foodexists = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var foodid = scope.foodid;
                    var sendRequest=requestHandler.postRequest("admin/checkFoodNameExists/",{"foodname":modelValue,"foodid":foodid}).then(function(response){

                        if (response.data.Response_status==0){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        }
                    });

                }, 10);

                return defer.promise;
            }
        }
    };
}]);

//Exercise Already Exists
adminApp.directive("exerciseexists",['$q','$timeout','requestHandler', function ($q, $timeout,requestHandler) {

    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            "exerciseid" : "="
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$asyncValidators.exerciseexists = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var exerciseid = scope.exerciseid;
                    var sendRequest=requestHandler.postRequest("admin/checkExerciseNameExists/",{"exercisename":modelValue,"exerciseid":exerciseid}).then(function(response){

                        if (response.data.Response_status==0){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        }
                    });

                }, 10);

                return defer.promise;
            }
        }
    };
}]);

//Exercise type name Already Exists
adminApp.directive("typenameexists",['$q','$timeout','requestHandler', function ($q, $timeout,requestHandler) {

    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            "typeid" : "="

        },
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.typenameexists = function (modelValue) {
                var defer = $q.defer();

                $timeout(function () {
                    var typeid = scope.typeid;
                    var sendRequest=requestHandler.postRequest("admin/checkTypeName/",{"typename":modelValue,"typeid":typeid}).then(function(response){

                        if (response.data.Response_status==0){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        }
                    });

                }, 10);

                return defer.promise;
            }
        }
    };
}]);


// Compare Confirm Password
adminApp.directive('compareTo',function() {

    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});



//To Display success message
//For User Messages
function successMessage(Flash,message){
    Flash.dismiss();
    Flash.create('success', message, 'alert');
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
}

function errorMessage(Flash,message){
    Flash.dismiss();
    Flash.create('danger', message, 'custom-class');
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
}

//Check For Email Validation
adminApp.directive('validateEmail', function() {
    var EMAIL_REGEXP = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,5})$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the email validator
            if (ctrl && ctrl.$validators.email) {

                // this will overwrite the default Angular email validator
                ctrl.$validators.email = function(modelValue) {
                    return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                };
            }
        }
    };
});



//Check For URL Validation
adminApp.directive('validateUrl', function() {
   
    var URL_REGEXP = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ngModel) {
            // only apply the validator if ngModel is present and Angular has added the email validator
            ngModel.$validators.validateUrl = function(modelValue) {
                    return URL_REGEXP.test(modelValue);
                };

        }
    };
});

//Check For URL Validation
adminApp.directive('validateNumber', function() {
    var NUM_REGEXP = /^\d+$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ngModel) {
            // only apply the validator if ngModel is present and Angular has added the email validator
            ngModel.$validators.validateNumber = function(modelValue) {
                return NUM_REGEXP.test(modelValue);
            };

            elm.bind('keypress', function(event) {
                if(event.keyCode === 32) {
                    event.preventDefault();
                }
            });

        }
    };
});

//ui-select required validation
adminApp.directive('uiSelectRequired', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ngModel) {
           // console.log(ngModel);
            ngModel.$validators.uiSelectRequired = function(modelValue, viewValue) {
               /* return modelValue && modelValue.length;*/
                var determineVal;
                if (angular.isArray(modelValue)) {
                    determineVal = modelValue;
                } else if (angular.isArray(viewValue)) {
                    determineVal = viewValue;
                } else {
                    return false;
                }

                return determineVal.length > 0;
            };
        }
    };
});

adminApp.directive('checkRequired', function(){
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$validators.checkRequired = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                var match = scope.$eval(attrs.ngTrueValue) || true;
                return value && match === value;
            };
        }
    };
});

//Check for Email Already Exists
adminApp.directive("foodNameExists",['$q','$timeout','requestHandler', function ($q, $timeout,requestHandler) {

    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.foodNameExists = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var sendRequest=requestHandler.postRequest("admin/searchFoodnamebyAdmin/",{"foodname":modelValue}).then(function(response){
                        return response.data.Response_status;
                    });

                    sendRequest.then(function(result){
                        if (result=="0"){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        }
                    });
                    isNewFood = false;
                }, 10);

                return defer.promise;
            }
        }
    };
}]);


adminApp.directive('checkboxGroup', function() {
    return {
        restrict: 'E',
        controller: function($scope, $attrs) {
            var self = this;
            var ngModels = [];
            var minRequired;
            self.validate = function() {
                var checkedCount = 0;
                angular.forEach(ngModels, function(ngModel) {
                    if ( ngModel.$modelValue ) {
                        checkedCount++;
                    }
                });
              //  console.log('minRequired', minRequired);
              //  console.log('checkedCount', checkedCount);
                var minRequiredValidity = checkedCount >= minRequired;
                angular.forEach(ngModels, function(ngModel) {
                    ngModel.$setValidity('checkboxGroup-minRequired', minRequiredValidity, self);
                });
            };

            self.register = function(ngModel) {
                ngModels.push(ngModel);
            };

            self.deregister = function(ngModel) {
                if(!this.ngModels){}
                else{
                    var index = this.ngModels.indexOf(ngModel);
                    if ( index != -1 ) {
                        this.ngModels.splice(index, 1);
                    }
                }
            };

            $scope.$watch($attrs.minRequired, function(value) {
                minRequired = parseInt(value, 10);
                self.validate();
            });
        }
    };
});

adminApp.directive('input', function() {
    return {
        restrict: 'E',
        require: ['?^checkboxGroup','?ngModel'],
        link: function(scope, element, attrs, controllers) {
            var checkboxGroup = controllers[0];
            var ngModel = controllers[1];
            if ( attrs.type=='checkbox' && checkboxGroup && ngModel ) {
                checkboxGroup.register(ngModel);
                scope.$watch(function() { return ngModel.$modelValue; }, checkboxGroup.validate );
                // In case we are adding and removing checkboxes dynamically we need to tidy up after outselves.
                scope.$on('$destroy', function() { checkboxGroup.deregister(ngModel); });
            }
        }
    };
});

//Float Validation

//Check For FLoat Validation
adminApp.directive('validateFloat', function() {
    //alert("hi");
   var FLOAT_REGEXP = /^\-?\d+((\.)\d+)?$/;
    //var FLOAT_REGEXP = /^[1-9]+((\.)\d+)?$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the Float Number validator
            ctrl.$validators.validateFloat = function(modelValue) {
               // alert(modelValue);
                return  ctrl.$isEmpty(modelValue) || FLOAT_REGEXP.test(modelValue);
            };

        }
    };
});

//Check For FLoat Validation greater than 0
adminApp.directive('validateFloat1', function() {
    // var FLOAT_REGEXP = /^\-?\d+((\.)\d+)?$/;
    var FLOAT_REGEXP = /^\s*(?=.*[1-9])\d*(?:\.\d{0,8})?\s*$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the Float Number validator
            ctrl.$validators.validateFloat1 = function(modelValue) {
                return  ctrl.$isEmpty(modelValue) || FLOAT_REGEXP.test(modelValue);
            };

        }
    };
});

//Check For Integer Validation
adminApp.directive('validateInteger', function() {
    var INTEGER_REGEXP = /^\-?\d*$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the Integer validator
            ctrl.$validators.validateInteger = function(modelValue) {
                return  ctrl.$isEmpty(modelValue) || INTEGER_REGEXP.test(modelValue);
            };
        }
    };
});

adminApp.filter('startsWithLetter', function () {
    return function (items, searchMenu) {
        var filtered = [];
        var letterMatch = new RegExp(searchMenu, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.name)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});

adminApp.factory("siteMenuService", function () {

    var site =[
        {
            "id":4,
            "name": "FAQ List",
            "icon": "question-circle",
            "href": "site",
            "active": ""
        },
        {
            "name": "Instruction",
            "icon": "exclamation-circle",
            "href": "instruction",
            "active": ""
        },
        {
            "name": "Privacy Policy",
            "icon": "pencil",
            "href": "privacy-policy",
            "active": ""
        },
        {
            "name": "Terms Of Use",
            "icon": "file-text",
            "href": "terms-of-use-edit",
            "active": ""
        },
        {
            "id":3,
            "name": "Testimonials",
            "icon": "comment",
            "href": "testimonials",
            "active": ""
        },
        {
            "id":2,
            "name": "Latest News",
            "icon": "newspaper-o",
            "href": "latest-news",
            "active": ""
        },
        {
            "id":1,
            "name": "Forums",
            "icon": "comments",
            "href": "forums",
            "active": ""
        },
        {
            "name": "Address Info",
            "icon": "map-marker",
            "href": "settings",
            "active": ""
        },
        {
            "name": "Mobile App",
            "icon": "tablet",
            "href": "mobile-app",
            "active": ""
        },
        {
            "name": "Payment Info",
            "icon": "dollar",
            "href": "paypal-settings",
            "active": ""
        },
        {
            "name": "Server",
            "icon": "server",
            "href": "server-settings",
            "active": ""
        },
        {
            "name": "Social Media",
            "icon": "connectdevelop",
            "href": "social-media-settings",
            "active": ""
        }
    ];

    return site;
});

adminApp.directive('focusMe',['$timeout','$parse', function($timeout, $parse) {
    return {
        //scope: true,   // optionally create a child scope
        link: function(scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function(value) {
                console.log('value=',value);
                if(value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
            // to address @blesh's comment, set attribute value to 'false'
            // on blur event:
            element.bind('blur', function() {
                console.log('blur');
                scope.$apply(model.assign(scope, false));
            });
        }
    };
}]);