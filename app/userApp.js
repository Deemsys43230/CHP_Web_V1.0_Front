var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','ngAnimate','flash','feedbackServiceModule','angularUtils.directives.dirPagination']);

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
                fromGoal:false,

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
                                '../../app/foodMeasure/foodMeasureService.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js',
                                '../../css/horizon-swiper.min.css',
                                '../../css/horizon-theme.min.css',
                                '../../js/horizon-swiper.min.js',
                                '../../css/stepProgressBar.css'
                            ]
                        })}]},
                controller:'UserDashboardController'
            }).

        when('/menu', {
            templateUrl: 'dashboardmenu/index.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'userApp',
                        files:[
                            '../../css/custom-inputs.css',
                            '../../css/vertical_tab.css',
                            '../../plugin/popup/style.css',
                            '../../app/userKeyDetails/userKeyDetailsController.js'

                        ]
                    })}]},
            controller:'UserKeyDetailsController'
        }).
        when('/viewMyMealPlan', {
            templateUrl: 'views/view-my-meal-plan.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'userApp',
                        files:[
                            '../../css/custom-inputs.css',
                            '../../css/vertical_tab.css',
                            '../../plugin/popup/style.css',
                            '../../app/viewMyMealPlan/viewMyMealPlanController.js'
                        ]
                    })}]},
            controller:'ViewMyMealPlanController'
        }).
        when('/user-dashboard', {
            templateUrl: 'views/user-dashboard.html',
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
                            '../../css/horizon-swiper.min.css',
                            '../../css/horizon-theme.min.css',
                            '../../js/horizon-swiper.min.js',
                            '../../css/stepProgressBar.css',
                            '../../app/userMainDashboard/userMainDashboardController.js'
                        ]
                    })}]},
            controller:'UserMainDashboardController'
        }).
            when('/individualGoal', {
                templateUrl: 'views/dashboard.html',
                fromGoal:true,
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
                                '../../app/foodMeasure/foodMeasureService.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js',
                                '../../css/horizon-swiper.min.css',
                                '../../css/horizon-theme.min.css',
                                '../../js/horizon-swiper.min.js'
                            ]
                        })}]},
                controller:'UserDashboardController'
            }).
            when('/connectDevice', {
                templateUrl: 'views/dashboard.html',
                fromDevice:true,
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
                                '../../app/foodMeasure/foodMeasureService.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../app/foodMeasure/foodMeasureService.js',
                                '../../plugin/dateRange/daterangepicker.js',
                                '../../css/horizon-swiper.min.css',
                                '../../css/horizon-theme.min.css',
                                '../../js/horizon-swiper.min.js'
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
            when('/mycourse-category/:id', {
                templateUrl: 'views/mycourses-category.html',
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
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/countryState/countryStateService.js',
                                '../../css/custom-inputs.css',
                                '../../app/userCoach/userCoachController.js'
                            ]
                        })
                    }]
                },
                controller: 'UserCoachController'
            }).
            when('/coach-search', {
                templateUrl: 'views/coach-search.html',
                coachInvitations:false,
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/countryState/countryStateService.js',
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
                                '../../app/countryState/countryStateService.js',
                                '../../app/userCoach/userCoachController.js',
                                '../../plugin/popup/style.css'

                            ]
                        })
                    }]
                },
                controller: 'UserCoachController'
            }).
            when('/coach-invitations', {
                templateUrl: 'views/coach-invitations-view.html',
                coachInvitations:true,
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/countryState/countryStateService.js',
                                '../../app/userCoach/userCoachController.js'
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
                                '../../plugin/popup/style.css',
                                  '../../app/countryState/countryStateService.js',
                                '../../app/friends/friendsController.js',
                                '../../app/friends/friendsService.js',
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
            when('/profile', {
                templateUrl: 'views/profile.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/popup/style.css',
                                '../../css/profile-image-upload.css',
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
                                '../../plugin/popup/style.css',
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
        when('/healthy-tips', {
            templateUrl: 'views/user-healthy-tips.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'userApp',
                        files:[
                            '../../app/userHealthyTips/userHealthyTipsController.js'
                        ]
                    })
                }]
            },
            controller:'UserHealthyTipsListController'
        }).
        when('/useful-videos', {
            templateUrl: '../common/useful-videos.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'userApp',
                        files:[
                            '../../app/usefulVideos/usefulVideosController.js'
                        ]
                    })
                }]
            },
            controller:'UserVideosController'
        }).

        when('/disease-control-tips', {
            templateUrl: 'views/user-disease-control-tips.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'userApp',
                        files:[
                            '../../angular/angular-utils-pagination/dirPagination.js',
                            '../../app/userDiseaseControlTips/userDiseaseControlTipsController.js'
                        ]
                    })
                }]
            },
            controller:'UserDiseaseControlTipsListController'
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
            when('/medications', {
                templateUrl: 'views/medications.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../css/custom-inputs.css',
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/medication/userMedicationController.js'
                            ]
                        })
                    }]
                },
                controller:'UserMedicationController'
            }).
            when('/document-upload', {
                templateUrl: 'views/medication-document-upload.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../css/custom-inputs.css',
                                '../../plugin/popup/style.css',
                                '../../css/ngPercentageCircle.css',
                                '../../app/userDashboard/ngPercentageCircle.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/medication/userMedicationController.js',
                                '../../css/profile-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        })
                    }]
                },
                controller:'UserMedicationDocumentUploadController'
            }).
        when('/meal-plans', {
            templateUrl: 'views/user-meal-plans.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'userApp',
                        files:[
                            '../../app/userDashboard/userDashboardService.js',
                            '../../app/userMealPlans/userMealPlanController.js',
                            '../../plugin/popup/style.css',
                            '../../css/ngPercentageCircle.css',
                            '../../app/userDashboard/ngPercentageCircle.js',
                            '../../app/foodMeasure/foodMeasureService.js',
                            '../../angular/angular-utils-pagination/dirPagination.js'

                        ]
                    })
                }]
            },
            controller:'UserMealPlanController'
        }).
        when('/meal-plans-view/:id', {
            templateUrl: 'views/user-meal-plan-view.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'userApp',
                        files:[
                            '../../app/userDashboard/userDashboardService.js',
                            '../../app/userMealPlans/userMealPlanController.js',
                            '../../plugin/popup/style.css',
                            '../../css/ngPercentageCircle.css',
                            '../../app/userDashboard/ngPercentageCircle.js',
                            '../../app/foodMeasure/foodMeasureService.js',
                            '../../angular/angular-utils-pagination/dirPagination.js'

                        ]
                    })
                }]
            },
            controller:'ViewUserMealPlanController'
        }).
        when('/assigned-plans-view/', {
            templateUrl: 'views/user-assigned-meal-plan-view.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'userApp',
                        files:[
                            '../../app/userAssignedMealPlans/userAssignedMealPlans.js',
                            '../../plugin/popup/style.css',
                            '../../css/ngPercentageCircle.css',
                            '../../app/userDashboard/ngPercentageCircle.js',
                            '../../angular/angular-utils-pagination/dirPagination.js'

                        ]
                    })
                }]
            },
            controller:'UserAssignedMealPlansController'
        }).
        when('/doctor-appointment/', {
            templateUrl: 'views/user-doctor-appointment.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'userApp',
                        files:[
                            '../../plugin/popup/style.css',
                            '../../plugin/vertical-carousel/vertical-carousel.js',
                            '../../app/userDoctorAppointment/userDoctorAppointmentController.js',
                            '../../angular/angular-utils-pagination/dirPagination.js',
                            '../../plugin/dateRange/daterangepicker.css',
                            '../../plugin/dateRange/daterangepicker.js'

                        ]
                    })
                }]
            },
            controller:'UserDoctorAppointment'
        }).
            when('/faq', {
                templateUrl: '../common/FAQ.html',
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
                redirectTo: '/menu'
            });
}]);

//Initial Controller for Username
userApp.controller("UserInitialController",['$scope','requestHandler','$location','Flash','FeedbackService','$timeout','$rootScope',function($scope,requestHandler,$location,Flash,FeedbackService,$timeout,$rootScope){
    $scope.hideValue=1;

    requestHandler.getRequest("getUserId/","").then(function(response){
        $scope.username=response.data.User_Profile.name;
        $scope.userProfile=response.data.User_Profile;
        console.log($scope.userProfile);
        $scope.demo = response.data.demography;
        if($scope.demo.userPlanType==1){
            $scope.userPlanText="Maintain Weight"
        }
        else if($scope.demo.userPlanType==2){
            $scope.userPlanText="Weight Loss"
        }
        else if($scope.demo.userPlanType==3){
            $scope.userPlanText="Weight Gain"
        }
        else if($scope.demo.userPlanType==4){
            $scope.userPlanText="No Plan"
        }
        $scope.emailNotifications= response.data.Login;
        $scope.currentUserEmailId= $scope.emailNotifications.email;
        if($scope.emailNotifications.isemailvalidated==0){
            $scope.allNotifications=1;
            $scope.description="Please Verify Your Email id";
        }
        else {
            $scope.allNotifications=0;
        }
        if($scope.userProfile.isProfileUpdated==0 && $scope.demo.demoUpdatedstatus==0) {
            $rootScope.checkPath =0;
        }
        else if($scope.userProfile.isProfileUpdated==1 && $scope.demo.demoUpdatedstatus==0) {
            $rootScope.checkPath=1;
        }
        else if($scope.userProfile.isProfileUpdated==1 && $scope.demo.demoUpdatedstatus==1) {
            $rootScope.checkPath=2;
        }
    });

    //to resend verification email link
    $scope.emailVerificationRequest=function() {
        requestHandler.postRequest("verifyEmailId/", {"emailid": $scope.currentUserEmailId}).then(function (response) {
            console.log(response.data);
            if (response.data.Response_status==1) {
                $(function(){
                        $("#lean_overlay").fadeTo(1000);
                        $("#emailVerificationAlert").fadeIn(600);
                        $(".common_model").show();
                        $(".popupHeader").show();
                        $(".popupBody").show();
                    });

                    $(".modal_close").click(function(){
                        $(".common_model").hide();
                        $("#emailVerificationAlert").hide();
                        $("#lean_overlay").hide();
                        $(".popupHeader").hide();
                        $(".popupBody").hide();
                    });

                    $("#lean_overlay").click(function(){
                        $(".common_model").hide();
                        $("#emailVerificationAlert").hide();
                        $("#lean_overlay").hide();
                        $(".popupHeader").hide();
                        $(".popupBody").hide();
                });
            }
        });
    };

    $scope.socialMedia=function(){
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#social-modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#social-modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#social-modal").hide();
            $("#lean_overlay").hide();
        });
    };

    requestHandler.getRequest("user/keydetails/", "").then(function (response) {
        $scope.userKeyDetails=response.data;
        if($scope.userKeyDetails.diabeticstatus==1) {
            $rootScope.isDiabetic=1;
        }
        else {
            $rootScope.isDiabetic=2;
        }
    });


  $scope.$watch('checkPath', function() {

        $scope.popupOpen($rootScope.checkPath);
    });

    $scope.$on('$routeChangeStart', function(next, current) {
       /* alert("rootchanges");*/

        $scope.activeClass={};
        var currentPage = $location.url().substr(1);
        $scope.activeClass[currentPage]='active';
        $scope.popupOpen($rootScope.checkPath);
    });

    $scope.popupOpen=function(pathVar){
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        if(pathVar==0){
           $location.path("profile");
           $rootScope.$on( "$routeChangeStart", function() {
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#review-modal").fadeIn(600);
                $(".common_model").show();
            });

            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#review-modal").hide();
                $("#lean_overlay").hide();
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#review-modal").hide();
                $("#lean_overlay").hide();
            });
           });
        }
        else if (pathVar==1){
           $location.path("demography");
           $rootScope.$on( "$routeChangeStart", function() {
                $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#review-modal").fadeIn(600);
                $(".common_model").show();
            });

           $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#review-modal").hide();
                $("#lean_overlay").hide();
           });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#review-modal").hide();
                $("#lean_overlay").hide();
            });
        });
        }
        else if(pathVar==2){
            //to hide empty alert while redirecting to dashboard page
            $(function(){
                $("#lean_overlay").hide();
                $("#review-modal").hide();
                $(".common_model").hide();
                $(".popupContainer").hide();
            });

            $(".modal_close").click(function(){
                $("#review-modal").hide();
                $(".common_model").hide();
                $("#lean_overlay").hide();
            });

            $("#lean_overlay").click(function(){
                $("#review-modal").hide();
                $(".common_model").hide();
                $("#lean_overlay").hide();
            });
               // $location.path("dashboard");
        }
    };

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

}]);

//Controller For Logout
userApp.controller("UserLogoutController",['$cookies','$scope','$window',function($cookies,$scope,$window){

    $scope.doLogout=function(){
        document.cookie = "X-CSRFToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //$cookies.remove("X-CSRFToken",{path: '/'});
       // $cookies.remove("X-CSRFToken",{path: '/'});
        $cookies.put('sessionid',undefined);
        $window.location.href="../../#/home";
    };

}]);


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
//Check For FLoat Validation
userApp.directive('validateOnlyNumbers', function() {
    var NUMBER_REGEXP = /^[0-9]+$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.validateOnlyNumbers = function(modelValue) {
                return  ctrl.$isEmpty(modelValue) || NUMBER_REGEXP.test(modelValue);
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

//Check for Email Validation
userApp.directive('validateEmail', function() {
    var EMAIL_ID =/^\S+@(([a-zA-Z0-9]{2}([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6})$/;

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

//Check For Only Alphabets with space
userApp.directive('validateAlphaWithSpace', function() {
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
userApp.directive('validateEmail', function() {
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

//Check for All Charactor  Validation
userApp.directive('validateAllCharacters', function() {
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

//Check For PhoneNumber Validation
userApp.directive('validatePhoneNumber', function() {
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


//Check for Number is greater than zero Validation
userApp.directive('validateZero', function() {
    var NUMBER = /^(0*[1-9][0-9]*([\.\,][0-9]+)?|0+[\.\,][0-9]*[1-9][0-9]*)$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the Integer validator
            ctrl.$validators.validateZero = function(modelValue) {
                return  ctrl.$isEmpty(modelValue) || NUMBER.test(modelValue);
            };
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

userApp.directive('validDecimalnumber', function() {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            if(!ngModelCtrl) {
                return;
            }

            var val;
            ngModelCtrl.$parsers.push(function(val) {
                if (angular.isUndefined(val)) {
                    val = '';
                }

                var clean = val.replace(/[^0-9\.]/g, '');
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
                    decimalCheck[1] = decimalCheck[1].slice(0,1);
                    clean =decimalCheck[0] + '.' + decimalCheck[1];
                }
                var firstcharzero = val.slice(0,1);
                var firstchardot = val.slice(0,1);
                var input = val.indexOf(' ');
                var inputs = val.indexOf('.');
                var lastval = val.charAt(val.length-1);



                if(firstcharzero==0){
                    clean=val.substr(1);
                }


                if(firstchardot=='.'){
                    clean=val.substr(1);
                }

                if(input==-1 && inputs!=-1 && val.length==3){
                    clean=val;
                }
                else if(input==-1 && inputs==-1 && val.length>3){
                    clean=val.slice(0,3);
                }


                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();

                }
                return clean;
            });

            element.bind('keydown', function(e) {

                if(event.keyCode === 32 && event.which ===32) {
                    event.preventDefault();
                }
            });
        }
    };
});

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


userApp.filter('startsWithLetter', function () {
    return function (items, searchHistory) {
        var filtered = [];
        var letterMatch = new RegExp(searchHistory, 'i');
        if (!items) {
        } else {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.firstname)||letterMatch.test(item.lastname)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});

// Cookie Accept Directive
userApp.directive('consent', ['$cookies','$timeout', function ($cookies,$timeout) {
  return {
    scope: {},
    template:
     '<div style="position: relative; z-index: 1000" ng-show="showData">'+
      '<div style="background: #555; position: fixed; bottom: 0; left: 0; right: 0;height: 50px;padding-top:12px;text-align: center;" ng-hide="consent()">'+
      '<span style="font-size: 14px;color:white;">This website uses cookies to ensure you get best user experience</span>&nbsp;&nbsp;<a href="" ng-click="consent(true)" class="btn cookie-policy-button">OK</a>'+
      '</div>'+
      '</div>',
    controller: ['$cookies','$scope','$timeout', function ($cookies,$scope,$timeout) {
        $scope.showData=false;
      var _consent = $cookies.get('consent');
      $scope.consent = function (consent) {
        if (consent === undefined) {
          return _consent;
        } else if (consent) {
          $cookies.put('consent', true);
          _consent = true;        
        }
      };
      $timeout(function(){
        $scope.showData=true;
      },60000);
    }]
  };
}]);


//for restricting keypress event one digit after (dot)
function validateFloatKeyPress(el, evt) {
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
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 0)){
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