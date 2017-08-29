var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','ngAnimate','flash','feedbackServiceModule']);

coachApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

    function($routeProvider,$ocLazyLoadProvider,$httpProvider) {
        $ocLazyLoadProvider.config({
            debug:false,
            events:true
        });

        //Do For Cross Orgin Management
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push(['$q','$location','$injector','$cookies','$window',"$rootScope",function ($q, $location,$injector,$cookies,$window,$rootScope) {

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
                            //alert("Your session has been expired.Please login again!!!");
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
                            name:'coachApp',
                            files:[
                                '../../app/dashboard/coachDashboardController.js'
                            ]
                        })
                    }]
                },
                controller:'CoachDashboardController'
            }).
            when('/profile', {
                templateUrl: 'views/profile.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/profile-image-upload.css',
                                '../../js/image-upload.js',
                                '../../app/coachProfile/coachProfileController.js'
                            ]
                        })
                    }]
                },
                controller:'CoachProfileController'
            }).
             when('/coach-invitations', {
                templateUrl: 'views/coach-invitations.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachMembers/coachInvitationsController.js'
                            ]
                        })
                    }]
                },
                controller:'CoachInvitationController'
            }).
             when('/coach-invitations-view:id',{
                templateUrl: 'views/coach-invitations-view.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                 '../../plugin/popup/style.css',
                                 '../../app/coachMembers/coachInvitationsController.js'
                            ]
                        })
                    }]
                },
                controller:'CoachInvitationController'
             }).
             when('/coach-subscription', {
                templateUrl: 'views/coach-subscription.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachMembers/coachSubscriptionController.js',
                                'https://checkout.razorpay.com/v1/checkout.js'
                            ]
                        })
                    }]
                },
                controller:'CoachSubscriptionController'
            }).
            when('/subscription', {
                templateUrl: 'views/coach-subscription-plan.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachMembers/subscriptionController.js',
                                'https://checkout.razorpay.com/v1/checkout.js'
                            ]
                        })
                    }]
                },
                controller:'SubscriptionController'
            }).
            when('/subscription-razor-payments/:payid', {
                templateUrl: 'views/payment-success.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachMembers/subscriptionThanksController.js'
                            ]
                        })
                    }]
                },
                controller:'ThanksRazorSubscribePageController'
            }).
            when('/subscription-payments', {
                templateUrl: 'views/payment-success.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachMembers/subscriptionThanksController.js'
                            ]
                        })
                    }]
                },
                controller:'AuthorizeThanksSubscribePageController'
            }).            
            when('/my-members', {
                templateUrl: 'views/member.html',
                resolve: {
                    check:["$location","$rootScope",function($location,$rootScope){
                        if(!$rootScope.isSubscriptionActive)
                            $location.path("subscription");
                    }],
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachMembers/coachMembersController.js',
                                 '../../css/custom-inputs.css'
                            ]
                        })
                    }]
                },
                controller:'CoachMembersController'
            }).
            when('/coach-invitations', {
                templateUrl: 'views/coach-invitations.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachInvitations/coachInvitationController.js'
                            ]
                        })
                    }]
                },
                controller:'CoachInvitationController'
            }).
           /* when('/member-view/:id', {
                templateUrl: 'views/member-view.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachMembers/coachMembersController.js'
                            ]
                        })
                    }]
                },
                controller:'MembersViewController'
            }).*/
            when('/forums', {
                templateUrl: '../user/views/forums.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../app/forums/forumsController.js',
                                '../../angular/angular-utils-pagination/dirPagination.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsCoachController'
            }).
            when('/add-forum', {
                templateUrl: '../user/views/forum-add.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsCoachController'
            }).
            when('/edit-forum/:id', {
                templateUrl: '../user/views/forum-add.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsCoachEditController'
            }).
            when('/forum-details/:id', {
                templateUrl: '../user/views/forum-details.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/forums/forumsController.js'
                            ]
                        })
                    }]
                },
                controller:'ForumsCoachController'
            }).
            when('/advices', {
                templateUrl: 'views/advices.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../app/coachAdvice/coachAdviceController.js'
                            ]
                        })
                    }]
                },
                controller:'CoachAdviceController'
            }).
            when('/course', {
                templateUrl: 'views/course.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
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
                            name:'coachApp',
                            files:[
                                '../../app/course/courseController.js',
                                '../../plugin/popup/style.css'
                            ]
                        })
                    }]
                },
                controller:'CourseController'
            }).
            when('/course-section/:sectionId', {
                templateUrl: 'views/course-section.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../app/course/courseController.js',
                                '../../plugin/popup/style.css'
                            ]
                        })
                    }]
                },
                controller:'CourseController'
            }).
            when('/course-section-edit/:sectionId', {
                templateUrl: 'views/course-section-add-edit.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../app/course/courseController.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css'
                            ]
                        })
                    }]
                },
                controller:'CourseEditController'
            }).
            when('/course-section-add/:courseId', {
                templateUrl: 'views/course-section-add-edit.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../app/course/courseController.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css'
                            ]
                        })
                    }]
                },
                controller:'CourseEditController'
            }).
            when('/course-edit/:id', {
                templateUrl: 'views/course-add-edit.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/course-image-upload.css',
                                '../../js/image-upload.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/course/courseController.js'
                            ]
                        })
                    }]
                },
                controller:'CourseEditController'
            }).
            when('/course-add', {
                templateUrl: 'views/course-add-edit.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/course-image-upload.css',
                                '../../js/image-upload.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../app/course/courseController.js'
                            ]
                        })
                    }]
                },
                controller:'CourseEditController'
            }).
            when('/payments', {
                templateUrl: 'views/payments.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/payments/coachPaymentController.js'
                            ]
                        })
                    }]
                },
                controller: 'CoachPaymentController'
            }).
            when('/subscribers-list/:id', {
                templateUrl: 'views/payment-subscribers-list.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/payments/coachPaymentController.js',
                                '../../angular/angular-ui-bootstarp.js',
                                '../../plugin/popup/style.css'
                            ]
                        })
                    }]
                },
                controller: 'CoachPaymentController'
            }).
            when('/subscribers-payments', {
                templateUrl: 'views/payment-subscription.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../angular/angular-ui-bootstarp.js',
                                '../../app/payments/coachPaymentController.js'
                            ]
                        })
                    }]
                },
                controller: 'CoachPaymentController'
            }).
            when('/subscription-details/:id', {
                templateUrl: 'views/payment-subscription-details.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/payments/coachPaymentController.js'
                            ]
                        })
                    }]
                },
                controller: 'CoachPaymentController'
            }).
            when('/payment-settings', {
                templateUrl: 'views/payment-settings.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachPaymentSettings/coachPaymentSettings.js'
                            ]
                        })
                    }]
                },
                controller: 'CoachPaymentSettingsController'
            }).
            when('/settings', {
                templateUrl: 'views/coach-settings.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachSettings/coachSettingsController.js'
                            ]
                        })
                    }]
                },
                controller: 'CoachSettingsController'
            }).
            when('/subscription-panel', {
                templateUrl: 'views/payment-subscription-panel.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../css/custom-inputs.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachPaymentSettings/coachSubscriptionSettings.js'
                            ]
                        })
                    }]
                },
                controller: 'CoachSubscriptionController'
            }).
            when('/contact', {
                templateUrl: '../common/contact.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                'https://maps.googleapis.com/maps/api/js',
                                '../../app/settings/basicInfoController.js'
                            ]
                        })
                    }]
                },
                controller:'ContactUsDetailsController'
            }).
            when('/aboutus', {
                templateUrl: '../common/about.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/instruction/instructionController.js'
                            ]
                        })
                    }]
                },
                controller:'InstructionCommonController'

            }).
            when('/faq', {
                templateUrl: '../common/faq.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
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
                            name:'coachApp',
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
                            name:'coachApp',
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
                            name:'coachApp',
                            files:[
                                '../../app/privacyPolicy/privacyPolicyController.js'
                            ]
                        })
                    }]
                },
                controller:'PrivacyPolicyCommonController'
            }).
            when('/events', {
                templateUrl: 'views/events.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachEvent/eventController.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js',
                            ]
                        })
                    }]
                },
                controller:'EventController'
            }).
            when('/event-add', {
                templateUrl: 'views/event-add.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachEvent/eventController.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js'
                            ]
                        })
                    }]
                },
                controller:'EventController'
            }).
            when('/event-edit/:id', {
                templateUrl: 'views/event-add.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachEvent/eventController.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js'
                            ]
                        })
                    }]
                },
                controller:'EventEditController'
            }).
            when('/event-view/:id', {
                templateUrl: 'views/event-view.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'coachApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/coachEvent/eventController.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js'
                            ]
                        })
                    }]
                },
                controller:'EventEditController'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);

//Initial Controller for Username
coachApp.controller("CoachInitialController",['$scope','requestHandler','$location','FeedbackService','Flash','$timeout','$rootScope',function($scope,requestHandler,$location,FeedbackService,Flash,$timeout,$rootScope){
    $scope.hideValue=1;
    requestHandler.getRequest("getUserId/","").then(function(response){
        $scope.username=response.data.User_Profile.name;
        $scope.isProfileUpdated=response.data.User_Profile.isProfileUpdated;
        if($scope.isProfileUpdated==0){
            $location.path("/profile");
            $rootScope.isProfileUpdated=false;
        }
    });

    requestHandler.getRequest("/coach/isSubscriptionActive/","").then(function(response){
            if(response.data.isActive==1){
                $rootScope.isSubscriptionActive=true;
                $scope.membersPageNavigateLink="#my-members";
            }
            else{   
                $rootScope.isSubscriptionActive=false;
                $scope.membersPageNavigateLink="#subscription";
            }

    });

    $scope.$on('$routeChangeStart', function(next, current) {
        $scope.activeClass={};
        var page = $location.url().substr(1);
        page=page.split('-');
        var currentPage=page[0];
        $scope.activeClass[currentPage]='active';
        if($scope.isProfileUpdated==0){
            if(!$rootScope.isProfileUpdated){
                 $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#coach-profile-alert-modal").fadeIn(600);
                $(".common_model").show();
            });

            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#coach-profile-alert-modal").hide();
                $("#lean_overlay").hide();
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#coach-profile-alert-modal").hide();
                $("#lean_overlay").hide();
            });
            $location.path("/profile");
            }           
        }
            
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
            $scope.feedback={};
            $scope.feedbackForm.$setPristine();
            $scope.getFeedback();
        });
        $timeout(function () {
            $scope.isFeedback=false;
            $("#feedback_button").click();
        },2000);
    };

    $scope.getFeedback=function(){
        requestHandler.getRequest("getUserId/","").then(function(response){
            $scope.feedback={};
            $scope.feedback.name=response.data.User_Profile.name;
            $scope.feedback.emailId=response.data.User_Profile.emailid;
        });
    };
    $scope.getCoachNotifiaction = function(){
        requestHandler.getRequest("coach/notifications/","").then(function(response){
            $scope.notification = response.data.notifications;

            var notifications = $scope.notification;

            $scope.allNotifications = notifications.length;
            $scope.coachNotification = [];

            $.each($scope.notification,function(index,value){
                $scope.coachNotification.push(value);
            });


        });
    };


    //Initalize the get functions
    $scope.init=function(){
        $scope.getCoachNotifiaction();
    };

    $scope.init();

}]);

//Controller For Logout
coachApp.controller("LogoutController",['$cookies','$scope','$window','requestHandler',function($cookies,$scope,$window,requestHandler){

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

coachApp.directive('block', function () {
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

//Check For FLoat Validation
coachApp.directive('validateFloat', function() {
    var FLOAT_REGEXP = /^\-?\d+((\.)\d+)?$/;
    //var FLOAT_REGEXP = /^[1-9]+((\.)\d+)?$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the Float Number validator
            ctrl.$validators.validateFloat = function(modelValue) {
                return  ctrl.$isEmpty(modelValue) || FLOAT_REGEXP.test(modelValue);
            };

        }
    };
});

coachApp.directive('isNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope) {
            scope.$watch('subscriptionDetail.onemonth_amount', function(newValue,oldValue) {
               var arr = String(newValue).split("");
                if (arr.length === 0) return;
                //if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                alert(newValue);
                if(newValue!== undefined){
                 if (isNaN(newValue)) {
                    scope.subscriptionDetail.onemonth_amount = oldValue;
                }
                }
            });

        }
    }
});

//Check For FLoat Validation greater than 0
coachApp.directive('validateFloat1', function() {
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

coachApp.directive('validNumber', function() {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            if(!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function(val) {
                if (angular.isUndefined(val)) {
                    var val ='';

                }
            ngModelCtrl.$validators.max = function(val) {
                    return val <= 90;
                };

                ngModelCtrl.$validators.zero = function(val) {
                    return val != 0;
                };



               var clean = val.replace(/[^-0-9\.]/g, '');
                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if(!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean =negativeCheck[0] + '-' + negativeCheck[1];
                    if(negativeCheck[0].length > 0) {
                        clean =negativeCheck[0];
                    }

                }

                if(!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0,2);
                    clean =decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function(event) {
                if(event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});

coachApp.directive('validFloatnumber', function() {

    var FLOAT_REGEXP = /^\s*(?=.*[1-9])\d*(?:\.\d{0,8})?\s*$/;

    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            if(!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function(val) {
                if (angular.isUndefined(val)) {
                    var val ='';

                }


                ngModelCtrl.$validators.validateFloat1 = function(val) {
                    return  ngModelCtrl.$isEmpty(val) || FLOAT_REGEXP.test(val);
                };

                var clean = val.replace(/[^-0-9\.]/g, '');
                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if(!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean =negativeCheck[0] + '-' + negativeCheck[1];
                    if(negativeCheck[0].length > 0) {
                        clean =negativeCheck[0];
                    }

                }

                if(!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0,2);
                    clean =decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function(event) {
                if(event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});


coachApp.directive('validFloatnumberzero', function() {

    var FLOAT_REGEXP = /^\s*(?=.*[0-9])\d*(?:\.\d{0,8})?\s*$/;

    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            if(!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function(val) {
                if (angular.isUndefined(val)) {
                    var val ='';

                }


                ngModelCtrl.$validators.validateFloat1 = function(val) {
                    return  ngModelCtrl.$isEmpty(val) || FLOAT_REGEXP.test(val);
                };

                var clean = val.replace(/[^-0-9\.]/g, '');
                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if(!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean =negativeCheck[0] + '-' + negativeCheck[1];
                    if(negativeCheck[0].length > 0) {
                        clean =negativeCheck[0];
                    }

                }

                if(!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0,2);
                    clean =decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function(event) {
                if(event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});



//Check For Only Alphabets with space
coachApp.directive('validateAlphaWithSpace', function() {
    var ALPHA_WITH_SPACE = /^ *([a-zA-Z]+ ?)+ *$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the Integer validator
            ctrl.$validators.validateAlphaWithSpace = function(modelValue) {
                return  ctrl.$isEmpty(modelValue) || ALPHA_WITH_SPACE.test(modelValue);
            };
        }
    };
});


//Check for Email Validation
coachApp.directive('validateEmail', function() {
    var EMAIL_ID = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,5})$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the Integer validator
            ctrl.$validators.validateEmail = function(modelValue) {
                return  ctrl.$isEmpty(modelValue) || EMAIL_ID.test(modelValue);
            };
        }
    };
});


//Check For PhoneNumber Validation
coachApp.directive('validatePhoneNumber', function() {
    var USA_MOB_EXPR = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    var USA_MOB_EXPR_NOSPACE = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    var USA_MOB_EXPR_NO = /^[0-9]{10}$/;
    return {
        require : 'ngModel',
        restrict : '',
        link : function(scope, elm, attrs, ngModel) {
            ngModel.$validators.validatePhoneNumber = function(modelValue) {
                if (modelValue == "" || modelValue == undefined) {
                    return true;
                } else {
                    return USA_MOB_EXPR_NO.test(modelValue);
                }

            };
        }
    };
});


//Check For Email Validation
coachApp.directive('validateEmail', function() {
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

coachApp.factory('myGoogleAnalytics', [
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


//Check for All Charactor  Validation
coachApp.directive('validateAllCharacters', function() {
    var ALL_CHARACTERS = /^[a-zA-Z0-9?=.*!@#$%^&*_\-\S\s]+$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the Integer validator
            ctrl.$validators.validateEmail = function(modelValue) {
                return  ctrl.$isEmpty(modelValue) || ALL_CHARACTERS .test(modelValue);
            };
        }
    };
});


//Check for Email Already Exists
coachApp.directive("emailexists",['$q', '$timeout','requestHandler', function ($q, $timeout,requestHandler) {

    var CheckEmailExists = function (isNew) {

        var returnvalue;
        if(isNew===1)
            returnvalue=true;
        else
            returnvalue=false;

        return returnvalue;
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
//for restricting keypress event two digit after (dot)
function validateFloatKeyPress1(el, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot
    if(number.length>1 && charCode == 46){
        return false;
    }
    // for backspace issue in firefox
    if(charCode== 8){
        return true;
    }
    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
        return false;
    }
    return true;
}
function getSelectionStart(o) {
    if (o.createTextRange) {
        var r = document.selection.createRange().duplicate()
        r.moveEnd('character', o.value.length)
        if (r.text == '') return o.value.length
        return o.value.lastIndexOf(r.text)
    } else return o.selectionStart
}


