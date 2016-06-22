var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','ngAnimate','flash','feedbackServiceModule']);

userApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

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
                            $window.location.href="../../#/home/logout";

                          // $location.path("/login");
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
                            name:'userApp',
                            files:[
                                '../../css/custom-inputs.css',
                                '../../css/vertical_tab.css',
                                '../../plugin/popup/style.css',
                                '../../css/ngPercentageCircle.css',
                                '../../app/userDashboard/ngPercentageCircle.js',
                                '../../app/userDashboard/userDashboardService.js',
                                '../../app/userDashboard/userDashboardController.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js'
                            ]
                        })}]},
                controller:'UserDashboardController'
            }).
            when('/register', {
                templateUrl: 'views/register.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../css/custom-inputs.css',
                                '../../plugin/datepicker/bootstrap-datepicker.js',
                                '../../plugin/datepicker/datepicker.css'
                            ]
                        })
                    }]
                }
            }).
            when('/my-courses', {
                templateUrl: 'views/courses-my.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/course/courseController.js'
                            ]
                        })
                    }]
                },
                controller:'CourseController'
            }).
            when('/courses', {
                templateUrl: 'views/courses.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/course/courseController.js'
                            ]
                        })
                    }]
                },
                controller:'CourseController'
            }).
            when('/course-view/:id', {
                templateUrl: 'views/course-view.html',
                resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'userApp',
                        files:[
                            '../../angular/angular-utils-pagination/dirPagination.js',
                            '../../plugin/popup/style.css',
                            '../../app/course/courseController.js'
                        ]
                    })
                }]
            },
            controller:'CourseController'
            }).
            when('/course-detail/:id', {
                templateUrl: 'views/course-details.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../plugin/popup/style.css',
                                '../../app/course/courseController.js'
                            ]
                        })
                    }]
                },
                controller:'CourseController'
            }).
            when('/course-category/:id', {
                templateUrl: 'views/course-category.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/course/courseController.js'
                            ]
                        })
                    }]
                },
                controller:'CourseController'
            }).
            when('/payments', {
                templateUrl: 'views/payments.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../plugin/popup/style.css',
                                '../../app/payments/userPaymentController.js'
                            ]
                        })
                    }]
                },
                controller: 'UserPaymentController'
            }).
            when('/coach-payments', {
                templateUrl: 'views/payments-coach.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../plugin/popup/style.css',
                                '../../app/payments/userPaymentController.js'
                            ]
                        })
                    }]
                },
                controller: 'UserPaymentController'
            }).
            when('/paymentDetails/:id', {
                templateUrl: 'views/payment-details.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/payments/userPaymentController.js'
                            ]
                        })
                    }]
                },
                controller: 'UserPaymentController'
            }).
            when('/paymentCoachDetails/:id', {
                templateUrl: 'views/payment-coach-details.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/payments/userPaymentController.js'
                            ]
                        })
                    }]
                },
                controller: 'UserPaymentController'
            }).
            when('/payment-settings', {
                templateUrl: 'views/payment-settings.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/payments/userPaymentController.js'
                            ]
                        })
                    }]
                },
                controller: 'UserPaymentController'
            }).
            when('/coach', {
                templateUrl: 'views/coach.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/userCoach/userCoachController.js'
                            ]
                        })
                    }]
                },
                controller: 'UserCoachController'
            }).
            when('/coach-search', {
                templateUrl: 'views/coach-search.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/userCoach/userCoachController.js'
                            ]
                        })
                    }]
                },
                controller: 'UserCoachController'
            }).
            when('/coach-view/:id', {
                templateUrl: 'views/coach-user-view.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/userCoach/userCoachController.js',
                                '../../plugin/popup/style.css'
                            ]
                        })
                    }]
                },
                controller: 'UserCoachController'
            }).
            when('/thanksSubscribePage/:id/:month', {
                templateUrl: 'views/thanks-page.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/thanksPage/thanksPageController.js'
                            ]
                        })
                    }]
                },
                controller: 'ThanksSubscribePageController'
            }).
            when('/thanksEnrollPage/:id', {
                templateUrl: 'views/thanks-page.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/thanksPage/thanksPageController.js'
                            ]
                        })
                    }]
                },
                controller: 'ThanksEnrollPageController'
            }).
            when('/friends', {
                templateUrl: 'views/friends.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/friends/friendsController.js',
                                '../../app/friends/friendsService.js'
                            ]
                        })
                    }]
                },
                controller: 'FriendsController'
            }).
            /*when('/portfolio', {
                templateUrl: '../common/portfolio.html'
            }).
            when('/singleProject', {
                templateUrl: '../common/single-project.html'
            }).
            when('/blog', {
                templateUrl: '../common/blog.html'
            }).*/
            when('/contact', {
                templateUrl: '../common/contact.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/settings/basicInfoController.js',
                                'https://maps.googleapis.com/maps/api/js'
                            ]
                        })
                    }]
                },
                controller:'ContactUsDetailsController'
            }).
            when('/profile', {
                templateUrl: 'views/profile.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/profile-image-upload.css',
                                '../../js/image-upload.js',
                                '../../app/userProfile/userProfileController.js'
                            ]
                        })
                    }]
                },
                controller:'UserProfileController'
            }).
            when('/demography', {
                templateUrl: 'views/demography.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../css/custom-inputs.css',
                                '../../app/demography/demographyController.js'
                            ]
                        })
                    }]
                },
                controller:'DemographyController'
            }).
            when('/nutrients', {
                templateUrl: 'views/nutrients.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/demography/demographyController.js'
                            ]
                        })
                    }]
                },
                controller:'DemographyController'
            }).
            when('/forums', {
                templateUrl: 'views/forums.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[

                                '../../app/forums/forumsController.js',
                                '../../angular/angular-utils-pagination/dirPagination.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsUserController'
            }).
            when('/add-forum', {
                templateUrl: 'views/forum-add.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsUserController'
            }).
            when('/edit-forum/:id', {
                templateUrl: 'views/forum-add.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsUserEditController'
            }).
            when('/forum-details/:id', {
                templateUrl: 'views/forum-details.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsUserController'
            }).
            when('/group-goal', {
                templateUrl: 'views/group-goal.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../app/goal/goalController.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js'
                            ]
                        })
                    }]
                },
                controller:'GoalController'
            }).
            when('/group-goal-request', {
                templateUrl: 'views/group-goal-request.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/goal/goalController.js',
                                '../../angular/angular-utils-pagination/dirPagination.js'
                            ]
                        })
                    }]
                },
                controller:'GoalController'
            }).
            when('/group-goal-view/:id', {
                templateUrl: 'views/group-goal-view.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/goal/goalController.js'
                            ]
                        })
                    }]
                },
                controller:'GoalController',
                request:0
            }).
            when('/group-goal-request/:id', {
                templateUrl: 'views/group-goal-view.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../app/goal/goalController.js'
                            ]
                        })
                    }]
                },
                controller:'GoalController',
                request:1
            }).
            when('/faq', {
                templateUrl: '../common/faq.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/faq/faqController.js'
                            ]
                        })
                    }]
                },
                controller:'FAQCommonController'
            }).
            when('/instructions', {
                templateUrl: '../common/instruction.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/instruction/instructionController.js'
                            ]
                        })
                    }]
                },
                controller:'InstructionCommonController'
            }).
            when('/terms-of-use', {
                templateUrl: '../common/termsofuse.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
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
                            name:'userApp',
                            files:[
                                '../../app/privacyPolicy/privacyPolicyController.js'
                            ]
                        })
                    }]
                },
                controller:'PrivacyPolicyCommonController'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
}]);

//Initial Controller for Username
userApp.controller("UserInitialController",['$scope','requestHandler','$location','Flash','FeedbackService','$timeout',function($scope,requestHandler,$location,Flash,FeedbackService,$timeout){
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
            $scope.hideValue=0;
        });
    };

    $scope.getSocialMediaDetails();
    $scope.isFeedback=false;
    $scope.addUserFeedback=function(){
        $scope.userFeedback= FeedbackService.addUserFeedback($scope.feedback);

        $scope.userFeedback.then(function(result){
            $scope.isFeedback=true;
            successMessage(Flash,"Thanks for your feedback!");
            $scope.feedback={};
            $scope.feedbackForm.$setPristine();
        });

        $timeout(function () {
            if($('#form').css('left')=='0px'){
                $("#feedback-form").slideToggle(800);
                $('#form').animate({left:'-300px'},  500);
            }else{
                $('#form').animate({left:'0'},  500);
                $("#feedback-form").slideToggle(300);
            }
        },2000);
    };

}]);

//Controller For Logout
userApp.controller("UserLogoutController",['$cookies','$scope','$window',function($cookies,$scope,$window){

    $scope.doLogout=function(){

        $cookies.remove("X-CSRFToken",{path: '/'});
        $cookies.put('sessionid',undefined);
        $window.location.href="../../#/home";
    };

}]);


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

//Check For FLoat Validation
userApp.directive('validateFloat', function() {
    var FLOAT_REGEXP = /^\-?\d+((\.)\d+)?$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the email validator
            ctrl.$validators.validateFloat = function(modelValue) {
                return  ctrl.$isEmpty(modelValue) || FLOAT_REGEXP.test(modelValue);
            };

        }
    };
});

//Food Already Exists
userApp.directive("foodexists",['$q','$timeout','requestHandler', function ($q, $timeout,requestHandler) {

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
                    var sendRequest=requestHandler.postRequest("user/searchFoodnamebyUser/",{"foodname":modelValue,"foodid":foodid}).then(function(response){

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
userApp.directive("exerciseexists",['$q','$timeout','requestHandler', function ($q, $timeout,requestHandler) {

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
                    var sendRequest=requestHandler.postRequest("user/searchExercisebnamebyUser/",{"exercisename":modelValue,"exerciseid":exerciseid}).then(function(response){

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


//Check For FLoat Validation greater than 0
userApp.directive('validateFloat1', function() {
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

userApp.directive('block', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                if (event.which == 64 || event.which == 16) {
                    // to allow numbers
                    event.preventDefault();
                } else if (event.which >= 48 && event.which <= 57) {
                    // to allow numbers
                    event.preventDefault();
                } else if (event.which >= 96 && event.which <= 105) {
                    // to allow numpad number
                    event.preventDefault();
                } else if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                    // to allow backspace, enter, escape, arrows
                    event.preventDefault();
                } else {
                    event.preventDefault();
                    // to stop others
                    return false;
                }
            });
        }
    }
});

//Check For Email Validation
userApp.directive('validateEmail', function() {
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

userApp.directive('focusMe',['$timeout','$parse', function($timeout, $parse) {
    return {
        //scope: true,   // optionally create a child scope
        link: function(scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function(value) {
                if(value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
            // to address @blesh's comment, set attribute value to 'false'
            // on blur event:
            element.bind('blur', function() {
                scope.$apply(model.assign(scope, false));
            });
        }
    };
}]);

userApp.factory('myGoogleAnalytics', [
        '$rootScope', '$window', '$location',
        function ($rootScope, $window, $location) {

            var myGoogleAnalytics = {};

            /**
             * Set the page to the current location path
             * and then send a pageview to log path change.
             */
            myGoogleAnalytics.sendPageview = function() {
                if ($window.ga) {
                    $window.ga('set', 'page', $location.path());
                    $window.ga('send', 'pageview');
                }
            };

            // subscribe to events
            $rootScope.$on('$viewContentLoaded', myGoogleAnalytics.sendPageview);

            return myGoogleAnalytics;
        }
    ]).run(['myGoogleAnalytics',
        function(myGoogleAnalytics) {
            // inject self
        }
    ]);