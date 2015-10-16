var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

    function($routeProvider,$ocLazyLoadProvider,$httpProvider) {
        $ocLazyLoadProvider.config({
            debug:false,
            events:true
        });

        //Do For Cross Orgin Management
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push(['$q','$location','$injector','$cookies',function ($q, $location,$injector,$cookies) {

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
                            alert("yes !");
                            alert("Get out");
                            $location.path("/login");
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
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/profile', {
                templateUrl: 'views/profile.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/date-picker/moment.js',
                                '../../plugin/date-picker/pikaday.css',
                                '../../plugin/date-picker/pikaday.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../css/profile-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        })
                    }
                }
            }).
            when('/site', {
                templateUrl: 'views/site-FAQ.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../app/faq/faqController.js'
                            ]
                        })
                    }
                },
                controller:'FAQController'
            }).
            when('/viewFAQ/:id', {
                templateUrl: 'views/site-view-FAQ.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../app/faq/faqController.js'
                            ]
                        })
                    }
                },
                controller:'FAQViewController'
            }).
            when('/instruction', {
                templateUrl: 'views/site-instruction.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/instruction/instructionController.js'
                            ]
                        })
                    }
                },
                controller:'InstructionController'
            }).
            when('/privacyPolicy', {
                templateUrl: 'views/site-policy.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/privacyPolicy/privacyPolicyController.js'
                            ]
                        })
                    }
                },
                controller:'PrivacyPolicyController'
            }).
            when('/termsOfUse', {
                templateUrl: 'views/site-termsofuse.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/termsOfUse/termsOfUseController.js'
                            ]
                        })
                    }
                },
                controller:'TermsOfUseController'
            }).
            when('/latestNews', {
                templateUrl: 'views/site-news.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }
                },
                controller:'LatestNewsController'
            }).
            when('/addLatestNews', {
                templateUrl: 'views/site-add-or-edit-news.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }
                },
                controller:'LatestNewsController'
            }).
            when('/editLatestNews/:id', {
                templateUrl: 'views/site-add-or-edit-news.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }
                },
                controller:'LatestNewsEditController'
            }).
            when('/viewLatestNews/:id', {
                templateUrl: 'views/site-view-news.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }
                },
                controller:'LatestNewsEditController'
            }).
            when('/testimonials', {
                templateUrl: 'views/site-testimonials.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/testimonial/testimonialController.js',
                                '../../css/testimonial-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        })
                    }
                },
                controller:'TestimonialController'
            }).
            when('/addTestimonial', {
                templateUrl: 'views/site-add-or-edit-testimonial.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../app/testimonial/testimonialController.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../css/testimonial-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        })
                    }
                },
                controller:'TestimonialController'
            }).
            when('/editTestimonial/:id', {
                templateUrl: 'views/site-add-or-edit-testimonial.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../app/testimonial/testimonialController.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../css/testimonial-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        })
                    }
                },
                controller:'TestimonialEditController'
            }).
            when('/viewTestimonial/:id', {
                templateUrl: 'views/site-view-testimonial.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                },
                controller:'TestimonialEditController'
            }).
            when('/member', {
                templateUrl: 'views/member.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/member-view', {
                templateUrl: 'views/member-view.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/member-edit', {
                templateUrl: 'views/member-edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/coach', {
                templateUrl: 'views/coach.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/popup/style.css',
                                '../../app/coach/coachController.js'
                            ]
                        })
                    }
                },
                controller:"CoachController"
            }).
            when('/coach-view/:id', {
                templateUrl: 'views/coach-view.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/jquery.raty-2.4.5/js/jquery.min.js',
                                '../../plugin/jquery.raty-2.4.5/js/jquery.raty.min.js',
                                '../../js/bootstrap.min.js',
                                '../../css/profile-image-upload.css',
                                '../../js/image-upload.js',

                                '../../app/coach/coachController.js'
                            ]
                        })
                    }
                },
                controller:"CoachViewController"
            }).
            when('/coach-edit', {
                templateUrl: 'views/coach-edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../css/profile-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        })
                    }
                }
            }).
            when('/settings', {
                templateUrl: 'views/settings-contact.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../app/settings/basicInfoController.js'
                            ]
                        })
                    }
                },
                controller:'ContactUsController'
            }).
            when('/mobileApp', {
                templateUrl: 'views/settings-mobile-app.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../js/bootstrap.min.js',
                                '../../app/settings/mobileAppSettingsController.js'
                            ]
                        })
                    }
                },
                controller:'MobileAppSettingsController'
            }).
            when('/paypalSettings', {
                templateUrl: 'views/settings-paypal.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../js/bootstrap.min.js',
                                '../../app/settings/paypalController.js'
                            ]
                        })
                    }
                },
                controller:'PaypalSettingsController'
            }).
            when('/socialMediaSettings', {
                templateUrl: 'views/settings-socialmedia.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../js/bootstrap.min.js',
                                '../../app/settings/socialMediaController.js'
                            ]
                        })
                    }
                },
                controller:'SocialMediaSettingsController'
            }).
            when('/serverSettings', {
                templateUrl: 'views/settings-server.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../js/bootstrap.min.js',
                                '../../app/settings/serverController.js'
                            ]
                        })
                    }
                },
                controller:'ServerSettingsController'
            }).
            when('/food', {
                templateUrl: 'views/food.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../js/category-select.js',
                                '../../app/food/foodService.js',
                                '../../app/food/foodController.js'
                            ]
                        })
                    }
                },
                controller:'FoodController'
            }).
            when('/food-edit/:id', {
                templateUrl: 'views/food-add-or-edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
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
                    }
                },
                controller:'FoodDetailsEditController',
                title:'Edit Food',
                type:2, //For Update type=1
                isNew:false

            }).
            when('/food-view/:id', {
                templateUrl: 'views/food-view.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../app/food/foodService.js',
                                '../../app/food/foodController.js'
                            ]
                        })
                    }
                },
                controller:'FoodDetailsViewController'
            }).
            when('/addFood', {
                templateUrl: 'views/food-add-or-edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
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
                    }
                },
                controller:'FoodDetailsEditController',
                title:'Add Food',
                type:1,//For Add type=1
                isNew:true
            }).
            when('/uploadFood', {
                templateUrl: 'views/upload-food.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/file-upload/angular-file-upload.min.js',
                                '../../app/food/foodController.js'
                            ]
                        })
                    }
                },
                controller:'FoodController'
            }).
            when('/foodCategory', {
                templateUrl: 'views/food-category.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/foodCategory/foodCategoryController.js'
                            ]
                        })
                    }
                },
                controller:'FoodCategoryController'
            }).
            when('/foodMeasure', {
                templateUrl: 'views/food-Measure.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../app/food/foodMeasure.js'
                            ]
                        })
                    }
                },
                controller:'FoodMeasureController'
            }).
            when('/foodSuggestion', {
                templateUrl: 'views/food-Suggestion.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/foodSuggestion/foodSuggestionController.js'
                            ]
                        })
                    }
                },
                controller:'FoodSuggestionController'
            }).
            when('/course', {
                templateUrl: 'views/course.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/createCourse', {
                templateUrl: 'views/create-course.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../plugin/text-editor/text-editor-bootstarp.js',
                                'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.5.0/summernote.css',
                                '../../plugin/text-editor/summernote.js'
                            ]
                        })
                    }
                }
            }).
          /*  when('/FAQ', {
                templateUrl: '../../views/common/FAQ.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../app/faq/faqController.js'
                            ]
                        })
                    }
                },
                controller:'FAQAdminController'
            }).
            when('/instructions', {
                templateUrl: '../../views/common/instruction.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../app/instruction/instructionController.js'
                            ]
                        })
                    }
                },
                controller:'InstructionAdminController'
            }).
            when('/termsofuse', {
                templateUrl: '../../views/common/termsofuse.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../app/termsOfUse/termsOfUseController.js'
                            ]
                        })
                    }
                },
                controller:'TermsOfUseAdminController'
            }).
            when('/policy', {
                templateUrl: '../../views/common/privacypolicy.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../app/privacyPolicy/privacyPolicyController.js'
                            ]
                        })
                    }
                },
                controller:'PrivacyPolicyAdminController'
            }).*/
            otherwise({
                redirectTo: '/dashboard'
            });
}]);

//Initial Controller for Username
adminApp.controller("InitialController",function($scope,requestHandler){
    requestHandler.getRequest("getUserId/","").then(function(response){
        $scope.username=response.data.User_Profile.name;
    });
});

//Controller For Logout
adminApp.controller("LogoutController",['$cookies','$scope','$window',function($cookies,$scope,$window,requestHandler){

    $scope.doLogout=function(){


        $cookies.remove("X-CSRFToken",{path: '/'});
        $cookies.put('sessionid',undefined);
        $window.location.href="../../#/index";
    };

}]);

//Email Already Exists
adminApp.directive("emailexists", function ($q, $timeout,requestHandler) {

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
});

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
    var EMAIL_REGEXP = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5})$/;

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
            console.log(ngModel);
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
adminApp.directive("foodNameExists", function ($q, $timeout,requestHandler) {

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
});


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
                console.log('minRequired', minRequired);
                console.log('checkedCount', checkedCount);
                var minRequiredValidity = checkedCount >= minRequired;
                angular.forEach(ngModels, function(ngModel) {
                    ngModel.$setValidity('checkboxGroup-minRequired', minRequiredValidity, self);
                });
            };

            self.register = function(ngModel) {
                ngModels.push(ngModel);
            };

            self.deregister = function(ngModel) {
                var index = this.ngModels.indexOf(ngModel);
                if ( index != -1 ) {
                    this.ngModels.splice(index, 1);
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