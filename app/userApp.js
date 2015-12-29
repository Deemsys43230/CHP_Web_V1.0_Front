var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','ngAnimate','flash']);

userApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

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
                            name:'userApp',
                            files:[
                                '../../css/custom-inputs.css',
                                '../../css/vertical_tab.css',
                                '../../css/custom-inputs.css',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
 								'../../css/augucomplete.css',
                                '../../css/ngPercentageCircle.css',
                                '../../app/userDashboard/ngPercentageCircle.js',
                                '../../js/augucomplete-alt.js',
                                '../../app/userDashboard/userDashboardService.js',
                                '../../app/userDashboard/userDashboardController.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js'
                            ]
                        })}},
                controller:'UserDashboardController'
            }).
            when('/register', {
                templateUrl: 'views/register.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../css/custom-inputs.css',
                                '../../plugin/datepicker/bootstrap-datepicker.js',
                                '../../plugin/datepicker/datepicker.css'
                            ]
                        })
                    }
                }
            }).
            when('/myCourses', {
                templateUrl: 'views/courses-my.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/course/courseController.js'
                            ]
                        })
                    }
                },
                controller:'CourseController'
            }).
            when('/courses', {
                templateUrl: 'views/courses.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/course/courseController.js'
                            ]
                        })
                    }
                },
                controller:'CourseController'
            }).
            when('/courseView/:id', {
                templateUrl: 'views/course-view.html',
                resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'userApp',
                    files:[

                        '../../plugin/popup/style.css',
                        '../../plugin/popup/jquery.leanModal.min.js',
                        '../../app/course/courseController.js'
                    ]
                })
            }
        },
        controller:'CourseController'
            }).
            when('/courseDetail/:id', {
                templateUrl: 'views/course-details.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[

                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../app/course/courseController.js'
                            ]
                        })
                    }
                },
                controller:'CourseController'
            }).
            when('/courseCategory', {
                templateUrl: 'views/course-category.html'
            }).
            when('/coach', {
                templateUrl: 'views/coach.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/userCoach/userCoachController.js'
                            ]
                        })
                    }
                },
                controller: 'UserCoachController'
            }).
            when('/coachSearch', {
                templateUrl: 'views/coach-search.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../plugin/vertical-carousel/vertical-carousel.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/userCoach/userCoachController.js'
                            ]
                        })
                    }
                },
                controller: 'UserCoachController'
            }).
            when('/coachView/:id', {
                templateUrl: 'views/coach-user-view.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../plugin/vertical-carousel/vertical-carousel.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/userCoach/userCoachController.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js'
                            ]
                        })
                    }
                },
                controller: 'UserCoachController'
            }).
            when('/friends', {
                templateUrl: 'views/friends.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/friends/friendsController.js',
                                '../../app/friends/friendsService.js'
                            ]
                        })
                    }
                },
                controller: 'FriendsController'
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
            when('/contact', {
                templateUrl: '../common/contact.html'
            }).
            when('/profile', {
                templateUrl: 'views/profile.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../css/profile-image-upload.css',
                                '../../js/image-upload.js',
                                '../../app/userProfile/userProfileController.js'
                            ]
                        })
                    }
                },
                controller:'UserProfileController'
            }).
            when('/demography', {
                templateUrl: 'views/demography.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/demography/demographyController.js'
                            ]
                        })
                    }
                },
                controller:'DemographyController'
            }).
            when('/nutrients', {
                templateUrl: 'views/nutrients.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/demography/demographyController.js'
                            ]
                        })
                    }
                },
                controller:'DemographyController'
            }).
            when('/forums', {
                templateUrl: 'views/forums.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[

                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }
                },
                controller:'ForumsUserController'
            }).
            when('/addforum', {
                templateUrl: 'views/forum-add.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }
                },
                controller:'ForumsUserController'
            }).
            when('/editForum/:id', {
                templateUrl: 'views/forum-add.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }
                },
                controller:'ForumsUserEditController'
            }).
            when('/forumDetails/:id', {
                templateUrl: 'views/forum-details.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }
                },
                controller:'ForumsUserController'
            }).
            when('/groupGoal', {
                templateUrl: 'views/group-goal.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../app/goal/goalController.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js'
                            ]
                        })
                    }
                },
                controller:'GoalController'
            }).
            when('/groupGoalRequest', {
                templateUrl: 'views/group-goal-request.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../app/goal/goalController.js',
                                '../../angular/angular-utils-pagination/dirPagination.js'
                            ]
                        })
                    }
                },
                controller:'GoalController'
            }).
            when('/groupGoalView/:id', {
                templateUrl: 'views/group-goal-view.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../app/goal/goalController.js'
                            ]
                        })
                    }
                },
                controller:'GoalController',
                request:0
            }).
            when('/groupGoalRequest/:id', {
                templateUrl: 'views/group-goal-view.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../app/goal/goalController.js'
                            ]
                        })
                    }
                },
                controller:'GoalController',
                request:1
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
}]);

//Initial Controller for Username
userApp.controller("UserInitialController",function($scope,requestHandler){
    requestHandler.getRequest("getUserId/","").then(function(response){
        $scope.username=response.data.User_Profile.name;
    });
});

//Controller For Logout
userApp.controller("UserLogoutController",['$cookies','$scope','$window',function($cookies,$scope,$window){

    $scope.doLogout=function(){

        $cookies.remove("X-CSRFToken",{path: '/'});
        $cookies.put('sessionid',undefined);
        $window.location.href="../../#/index";
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
userApp.directive("foodexists", function ($q, $timeout,requestHandler) {

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
});


//Food Already Exists
userApp.directive("exerciseexists", function ($q, $timeout,requestHandler) {

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
});


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