var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','ngAnimate']);

coachApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

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
                            name:'coachApp',
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
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../css/profile-image-upload.css',
                                '../../js/image-upload.js',
                                '../../app/coachProfile/coachProfileController.js'
                            ]
                        })
                    }
                },
                controller:'CoachProfileController'
            }).
            when('/mymembers', {
                templateUrl: 'views/member.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachMembers/coachMembersController.js'
                            ]
                        })
                    }
                },
                controller:'CoachMembersController'
            }).
            when('/memberView/:id', {
                templateUrl: 'views/member-view.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/popup/style.css',
                                '../../app/coachMembers/coachMembersController.js'
                            ]
                        })
                    }
                },
                controller:'MembersViewController'
            }).
            when('/forums', {
                templateUrl: '../user/views/forums.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[

                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }
                },
                controller:'ForumsCoachController'
            }).
            when('/addforum', {
                templateUrl: '../user/views/forum-add.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }
                },
                controller:'ForumsCoachController'
            }).
            when('/editForum/:id', {
                templateUrl: '../user/views/forum-add.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }
                },
                controller:'ForumsCoachEditController'
            }).
            when('/forumDetails/:id', {
                templateUrl: '../user/views/forum-details.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }
                },
                controller:'ForumsCoachController'
            }).
            when('/advices', {
                templateUrl: 'views/advices.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../app/coachAdvice/coachAdviceController.js'
                            ]
                        })
                    }
                },
                controller:'CoachAdviceController'
            }).
            when('/course', {
                templateUrl: 'views/course.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
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
                            name:'coachApp',
                            files:[
                                '../../app/course/courseController.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js'
                            ]
                        })
                    }
                },
                controller:'CourseController'
            }).
            when('/courseSection/:sectionId', {
                templateUrl: 'views/course-section.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../app/course/courseController.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js'
                            ]
                        })
                    }
                },
                controller:'CourseController'
            }).
            when('/courseSectionEdit/:sectionId', {
                templateUrl: 'views/course-section-add-edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../app/course/courseController.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css'
                            ]
                        })
                    }
                },
                controller:'CourseEditController'
            }).
            when('/courseSectionAdd/:courseId', {
                templateUrl: 'views/course-section-add-edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../app/course/courseController.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css'
                            ]
                        })
                    }
                },
                controller:'CourseEditController'
            }).
            when('/courseEdit/:id', {
                templateUrl: 'views/course-add-edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../css/course-image-upload.css',
                                '../../js/image-upload.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/course/courseController.js'
                            ]
                        })
                    }
                },
                controller:'CourseEditController'
            }).
            when('/courseAdd', {
                templateUrl: 'views/course-add-edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../css/course-image-upload.css',
                                '../../js/image-upload.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/course/courseController.js'
                            ]
                        })
                    }
                },
                controller:'CourseEditController'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);

//Initial Controller for Username
coachApp.controller("CoachInitialController",function($scope,requestHandler){
    requestHandler.getRequest("getUserId/","").then(function(response){
        $scope.username=response.data.User_Profile.name;
    });
});

//Controller For Logout
coachApp.controller("LogoutController",['$cookies','$scope','$window',function($cookies,$scope,$window,requestHandler){

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