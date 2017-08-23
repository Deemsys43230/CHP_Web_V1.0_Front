var adminApp = angular.module('adminApp', [
    'ngRoute',
    'oc.lazyLoad',
    'ngCookies',
    'requestModule',
    'ngAnimate'
  ]);
adminApp.config([
  '$routeProvider',
  '$ocLazyLoadProvider',
  '$httpProvider',
  function ($routeProvider, $ocLazyLoadProvider, $httpProvider) {
    $ocLazyLoadProvider.config({
      debug: false,
      events: true
    });
    //Do For Cross Orgin Management
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      '$injector',
      '$cookies',
      '$window',
      function ($q, $location, $injector, $cookies, $window) {
        return {
          'request': function (request) {
            request.headers['X-CSRFToken'] = $cookies.get('X-CSRFToken');
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
            case 401: {
                alert('restricted');
              }
            case 403: {
                // alert("Your session has been expired.Please login again!!!");
                /*$window.location.href="../../views/home/#/index?session=logout";*/
                $window.location.href = '../../#/home/logout';
                //$location.path("/login");
                break;
              }
            case 500: {
                break;
              }
            default: {
                break;
              }
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
    $routeProvider.when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../app/dashboard/adminDashboardController.js']
            });
          }
        ]
      },
      controller: 'AdminDashboardController'
    }).when('/profile', {
      templateUrl: 'views/profile.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../css/profile-image-upload.css',
                '../../css/password.css',
                '../../js/image-upload.js',
                '../../app/adminProfile/adminProfileController.js'
              ]
            });
          }
        ]
      },
      controller: 'AdminProfileController'
    }).when('/site', {
      templateUrl: 'views/site-FAQ.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/faq/faqController.js'
              ]
            });
          }
        ]
      },
      controller: 'FAQController'
    }).when('/view-faq/:id', {
      templateUrl: 'views/site-view-FAQ.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../angular/angular-utils-pagination/dirPagination.js','../../app/faq/faqController.js']
            });
          }
        ]
      },
      controller: 'FAQViewController'
    }).when('/about-us', {
      templateUrl: 'views/site-instruction.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/text-editor/summernote.js',
                '../../plugin/text-editor/summernote.css',
                '../../app/instruction/instructionController.js'
              ]
            });
          }
        ]
      },
      controller: 'InstructionController'
    }).when('/privacy-policy', {
      templateUrl: 'views/site-policy.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/text-editor/summernote.js',
                '../../plugin/text-editor/summernote.css',
                '../../app/privacyPolicy/privacyPolicyController.js'
              ]
            });
          }
        ]
      },
      controller: 'PrivacyPolicyController'
    }).when('/terms-of-use-edit', {
      templateUrl: 'views/site-termsofuse.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/text-editor/summernote.js',
                '../../plugin/text-editor/summernote.css',
                '../../app/termsOfUse/termsOfUseController.js'
              ]
            });
          }
        ]
      },
      controller: 'TermsOfUseController'
    }).when('/latest-news', {
      templateUrl: 'views/site-news.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/latestNews/latestNewsController.js'
              ]
            });
          }
        ]
      },
      controller: 'LatestNewsController'
    }).when('/add-latest-news', {
      templateUrl: 'views/site-add-or-edit-news.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../plugin/text-editor/summernote.js',
                '../../plugin/text-editor/summernote.css',
                '../../app/latestNews/latestNewsController.js'
              ]
            });
          }
        ]
      },
      controller: 'LatestNewsController'
    }).when('/edit-latest-news/:id', {
      templateUrl: 'views/site-add-or-edit-news.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../plugin/text-editor/summernote.js',
                '../../plugin/text-editor/summernote.css',
                '../../app/latestNews/latestNewsController.js'
              ]
            });
          }
        ]
      },
      controller: 'LatestNewsEditController'
    }).when('/view-latest-news/:id', {
      templateUrl: 'views/site-view-news.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../angular/angular-utils-pagination/dirPagination.js','../../app/latestNews/latestNewsController.js']
            });
          }
        ]
      },
      controller: 'LatestNewsEditController'
    }).when('/forums', {
      templateUrl: 'views/site-forums.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/forums/forumsController.js'
              ]
            });
          }
        ]
      },
      controller: 'ForumsController'
    }).when('/view-forum/:id', {
      templateUrl: 'views/site-view-forum.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/forums/forumsController.js'
              ]
            });
          }
        ]
      },
      controller: 'ForumsEditController'
    }).when('/edit-forum/:id', {
      templateUrl: 'views/site-add-or-edit-forum.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../angular/angular-utils-pagination/dirPagination.js','../../app/forums/forumsController.js']
            });
          }
        ]
      },
      controller: 'ForumsEditController'
    }).when('/add-forum', {
      templateUrl: 'views/site-add-or-edit-forum.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../angular/angular-utils-pagination/dirPagination.js','../../app/forums/forumsController.js']
            });
          }
        ]
      },
      controller: 'ForumsController'
    }).when('/pricing-plan-list', {
            templateUrl: 'views/pricing-plan-list.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/pricingPlan/pricingPlanController.js'
                            ]
                        });
                    }
                ]
            },
            controller: 'PricingPlanController'
        })
        .when('/add-pricing-plan', {
            templateUrl: 'views/add-edit-pricing-plan.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/pricingPlan/pricingPlanController.js'
                            ]
                        });
                    }
                ]
            },
            controller: 'PricingPlanController'
        }).when('/edit-pricing-plan/:id', {
            templateUrl: 'views/add-edit-pricing-plan.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/pricingPlan/pricingPlanController.js'
                            ]
                        });
                    }
                ]
            },
            controller: 'PricingPlanEditController'
        }).when('/view-pricing-plan/:id', {
            templateUrl: 'views/view-pricing-plan.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/pricingPlan/pricingPlanController.js'
                            ]
                        });
                    }
                ]
            },
            controller: 'PricingPlanEditController'
        }).when('/testimonials', {
      templateUrl: 'views/site-testimonials.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/testimonial/testimonialController.js',
                '../../css/testimonial-image-upload.css',
                '../../js/image-upload.js'
              ]
            });
          }
        ]
      },
      controller: 'TestimonialController'
    }).when('/add-testimonial', {
      templateUrl: 'views/site-add-or-edit-testimonial.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/testimonial/testimonialController.js',
                '../../plugin/text-editor/summernote.js',
                '../../plugin/text-editor/summernote.css',
                '../../css/testimonial-image-upload.css',
                '../../js/image-upload.js'
              ]
            });
          }
        ]
      },
      controller: 'TestimonialController'
    }).when('/edit-testimonial/:id', {
      templateUrl: 'views/site-add-or-edit-testimonial.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/testimonial/testimonialController.js',
                '../../plugin/text-editor/summernote.js',
                '../../plugin/text-editor/summernote.css',
                '../../css/testimonial-image-upload.css',
                '../../js/image-upload.js'
              ]
            });
          }
        ]
      },
      controller: 'TestimonialEditController'
    }).when('/view-testimonial/:id', {
      templateUrl: 'views/site-view-testimonial.html',
        resolve: {
            loadMyFiles: [
                '$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'adminApp',
                        files: [
                            '../../angular/angular-utils-pagination/dirPagination.js',
                            '../../app/testimonial/testimonialController.js',
                            '../../css/testimonial-image-upload.css',
                            '../../js/image-upload.js'
                        ]
                    });
                }
            ]
        },
      controller: 'TestimonialEditController'
    }).when('/articles', {
      templateUrl: 'views/site-articles.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/article/articleController.js',
                '../../css/testimonial-image-upload.css',
                '../../js/image-upload.js'
              ]
            });
          }
        ]
      },
      controller: 'ArticleController'
    }).when('/add-article', {
      templateUrl: 'views/site-add-or-edit-article.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/article/articleController.js',
                '../../plugin/text-editor/summernote.js',
                '../../plugin/text-editor/summernote.css',
                '../../css/testimonial-image-upload.css',
                '../../js/image-upload.js'
              ]
            });
          }
        ]
      },
      controller: 'ArticleController'
    }).when('/edit-article/:id', {
      templateUrl: 'views/site-add-or-edit-article.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/article/articleController.js',
                '../../plugin/text-editor/summernote.js',
                '../../plugin/text-editor/summernote.css',
                '../../css/testimonial-image-upload.css',
                '../../js/image-upload.js'
              ]
            });
          }
        ]
      },
      controller: 'ArticleEditController'
    }).when('/view-article/:id', {
      templateUrl: 'views/site-view-article.html',
        resolve: {
            loadMyFiles: [
                '$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'adminApp',
                        files: [
                            '../../angular/angular-utils-pagination/dirPagination.js',
                            '../../app/article/articleController.js',
                            '../../css/testimonial-image-upload.css',
                            '../../js/image-upload.js'
                        ]
                    });
                }
            ]
        },
      controller: 'ArticleEditController'
    }).when('/cdc-list', {
            templateUrl: 'views/site-cdc-list.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/diseaseControlTips/adminDiseaseControlController.js',
                                '../../css/testimonial-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        });
                    }
                ]
            },
            controller: 'DiseaseControlController'
    }).when('/add-cdc', {
        templateUrl: 'views/site-add-or-edit-cdc.html',
        resolve: {
            loadMyFiles: [
                '$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'adminApp',
                        files: [
                            '../../angular/angular-utils-pagination/dirPagination.js',
                            '../../app/diseaseControlTips/adminDiseaseControlController.js',
                            '../../plugin/text-editor/summernote.js',
                            '../../plugin/text-editor/summernote.css',
                            '../../css/testimonial-image-upload.css',
                            '../../js/image-upload.js',
                            '../../plugin/dateRange/daterangepicker.css',
                            '../../plugin/dateRange/daterangepicker.js'
                        ]
                    });
                }
            ]
        },
        controller: 'DiseaseControlController'
    }).when('/edit-cdc/:sid', {
       templateUrl: 'views/site-add-or-edit-cdc.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/diseaseControlTips/adminDiseaseControlController.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../css/testimonial-image-upload.css',
                                '../../js/image-upload.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js'
                            ]
                        });
                    }
                ]
            },
            controller: 'DiseaseControlEditController'
        })
    .when('/view-cdc/:sid', {
            templateUrl: 'views/site-view-cdc.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/diseaseControlTips/adminDiseaseControlController.js',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/text-editor/summernote.css',
                                '../../css/testimonial-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        });
                    }
                ]
            },
            controller: 'DiseaseControlEditController'
    }).when('/member', {
      templateUrl: 'views/member.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/member/memberController.js'
              ]
            });
          }
        ]
      },
      controller: 'MemberController'
    }).when('/member-view/:id', {
      templateUrl: 'views/member-view.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../angular/angular-utils-pagination/dirPagination.js','../../app/member/memberController.js']
            });
          }
        ]
      },
      controller: 'MemberController'
    }).when('/coach', {
      templateUrl: 'views/coach.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../css/custom-inputs.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/coach/coachController.js'
              ]
            });
          }
        ]
      },
      controller: 'CoachController'
    }).when('/invitation-list', {
      templateUrl: 'views/invitation-list.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/coach/coachController.js'
              ]
            });
          }
        ]
      },
      controller: 'CoachController'
    }).when('/coach-view/:id', {
      templateUrl: 'views/coach-view.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../css/profile-image-upload.css',
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../js/image-upload.js',
                '../../app/coach/coachController.js'
              ]
            });
          }
        ]
      },
      controller: 'CoachViewController'
    }).when('/invitation-view/:id', {
      templateUrl: 'views/invitation-view.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../css/profile-image-upload.css',
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../js/image-upload.js',
                '../../app/coach/coachAddEditController.js'
              ]
            });
          }
        ]
      },
      controller: 'CoachAddEditController'
    }).
    when('/add-edit-coach', {
      templateUrl: 'views/add-edit-coach.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../css/profile-image-upload.css',
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../js/image-upload.js',
                '../../app/coach/CoachAddEditController.js'
              ]
            });
          }
        ]
      },
      controller: 'CoachAddEditController'
    }).when('/add-edit-coach/:id', {
      templateUrl: 'views/add-edit-coach.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../css/profile-image-upload.css',
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../js/image-upload.js',
                '../../app/coach/CoachAddEditController.js'
              ]
            });
          }
        ]
      },
      controller: 'CoachAddEditController'
    }).when('/coach-edit', {
      templateUrl: 'views/coach-edit.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../css/profile-image-upload.css',
                '../../js/image-upload.js'
              ]
            });
          }
        ]
      },
      controller: 'CoachViewController'
    }).when('/coach-subscriptions', {
      templateUrl: 'views/coach-subscriptions.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../css/profile-image-upload.css',                
                '../../css/custom-inputs.css',
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../js/image-upload.js',
                '../../app/coach/coachSubscriptionController.js'
              ]
            });
          }
        ]
      },
      controller: 'CoachSubscriptionController'
    }).when('/coach-subscriptions/:id', {
      templateUrl: 'views/coach-subscriptions-individual.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../css/profile-image-upload.css',
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../js/image-upload.js',
                '../../app/coach/coachSubscriptionController.js'
              ]
            });
          }
        ]
      },
      controller: 'IndividualCoachSubscriptionController'
    }).when('/exercise', {
      templateUrl: 'views/exercise.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../js/category-select.js',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/exercise/exerciseService.js',
                '../../app/exercise/exerciseController.js'
              ]
            });
          }
        ]
      },
      controller: 'ExerciseController'
    }).when('/exercise-view/:id', {
      templateUrl: 'views/exercise-view.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                  '../../angular/angular-utils-pagination/dirPagination.js',
                  '../../js/category-select.js',
                  '../../app/exercise/exerciseService.js',
                  '../../app/exercise/exerciseController.js'
              ]
            });
          }
        ]
      },
      controller: 'ExerciseViewController'
    }).when('/exercise-edit/:id', {
      templateUrl: 'views/exercise-add-or-edit.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
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
            });
          }
        ]
      },
      controller: 'ExerciseEditController',
      title: 'Edit Exercise',
      type: 2,
      isNew: false
    }).when('/exercise-add', {
      templateUrl: 'views/exercise-add-or-edit.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
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
            });
          }
        ]
      },
      controller: 'ExerciseEditController',
      title: 'Add Exercise',
      type: 1,
      isNew: true
    }).when('/exercise-add/:id', {
      templateUrl: 'views/exercise-add-or-edit.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
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
            });
          }
        ]
      },
      controller: 'ExerciseEditController',
      title: 'Add Exercise',
      type: 1,
      isNew: true
    }).when('/exercise-type', {
      templateUrl: 'views/exercise-type.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/exerciseType/exerciseTypeController.js'
              ]
            });
          }
        ]
      },
      controller: 'ExerciseTypeController'
    }).when('/exercise-category', {
            templateUrl: 'views/exercise-category.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/exerciseCategory/exerciseCategoryController.js'
                            ]
                        });
                    }
                ]
            },
            controller: 'ExerciseCategoryController'
        }).when('/exercise-level', {
            templateUrl: 'views/exercise-level.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/exerciseLevel/exerciseLevelController.js'
                            ]
                        });
                    }
                ]
            },
            controller: 'ExerciseLevelController'
        })
        .when('/exercise-unit', {
            templateUrl: 'views/exercise-unit.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../plugin/popup/style.css',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/exerciseUnit/exerciseUnitController.js'
                        ]
                        });
                    }
                ]
            },
            controller: 'ExerciseUnitController'
        }).when('/settings', {
      templateUrl: 'views/settings-contact.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../app/settings/basicInfoController.js']
            });
          }
        ]
      },
      controller: 'ContactUsController'
    }).when('/mobile-app', {
      templateUrl: 'views/settings-mobile-app.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../app/settings/mobileAppSettingsController.js']
            });
          }
        ]
      },
      controller: 'MobileAppSettingsController'
    }).when('/paypal-settings', {
      templateUrl: 'views/settings-paypal.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../app/settings/paypalController.js'
              ]
            });
          }
        ]
      },
      controller: 'PaypalSettingsController'
        }) .when('/razor-payment-settings', {
                templateUrl: 'views/settings-razor.html',
                resolve: {
                    loadMyFiles: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'adminApp',
                                files: ['../../app/settings/razorSettingsController.js']
                            });
                        }
                    ]
                },
                controller: 'RazorSettingsController'
        }).when('/authorizeNet-payment-settings', {
              templateUrl: 'views/settings-authorizeNet.html',
              resolve: {
                  loadMyFiles: [
                      '$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load({
                              name: 'adminApp',
                              files: ['../../app/settings/authorizeNetSettingsController.js']
                          });
                      }
                  ]
              },
              controller: 'AuthorizeNetSettingsController'
          }).when('/social-media-settings', {
                templateUrl: 'views/settings-socialmedia.html',
                resolve: {
                    loadMyFiles: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'adminApp',
                                files: ['../../app/settings/socialMediaController.js']
                            });
                        }
                    ]
                },
                controller: 'SocialMediaSettingsController'
    }).when('/server-settings', {
      templateUrl: 'views/settings-server.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../app/settings/serverController.js']
            });
          }
        ]
      },
      controller: 'ServerSettingsController'

    }).when('/vendor-settings', {
          templateUrl: 'views/site-vendorlist.html',
       resolve: {
            loadMyFiles: [
                '$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'adminApp',

                        files:
                            [  '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/settings/vendorController.js']
                    });
                }
            ]
        },
        controller: 'VendorSettingsController'
       })
        .when('/vendor-edit-settings/:id', {
            templateUrl: 'views/site-vendor-edit.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                          '../../js/image-upload.js',
                          '../../angular/angular-utils-pagination/dirPagination.js',
                             '../../app/settings/vendorController.js']
                        });
                    }
                ]
            },
            controller: 'VendorEditSettingsController'
        })
        .when('/vendor-view/:id', {
            templateUrl: 'views/site-vendor-view.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../js/image-upload.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/settings/vendorController.js']
                        });
                    }
                ]
            },
            controller: 'VendorEditSettingsController'
        })
        .when('/food', {
      templateUrl: 'views/food.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../js/category-select.js',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/food/foodService.js',
                  '../../app/food/pageService.js',
                '../../app/food/foodController.js'
              ]
            });
          }
        ]
      },
      controller: 'FoodController'
    }).when('/food-edit/:id', {
      templateUrl: 'views/food-add-or-edit.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../css/food-image-upload.css',
                '../../js/image-upload.js',
                '../../js/category-select.js',
                '../../css/custom-inputs.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                'https://cdn.rawgit.com/angular-ui/ui-select/master/dist/select.min.js',
                '../../css/multiSelect.css',
                '../../css/category-select.css',
                '../../css/category-select-bootstrap.css',
                '../../app/food/foodService.js',
                '../../app/food/foodController.js'
              ]
            });
          }
        ]
      },
      controller: 'FoodDetailsEditController',
      title: 'Edit Food',
      type: 2,
      isNew: false
    }).when('/food-view/:id', {
      templateUrl: 'views/food-view.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                  '../../angular/angular-utils-pagination/dirPagination.js',
                  'https://cdn.rawgit.com/angular-ui/ui-select/master/dist/select.min.js',
                '../../plugin/popup/style.css',
                '../../app/food/foodService.js',
                '../../app/food/foodController.js'
              ]
            });
          }
        ]
      },
      controller: 'FoodDetailsViewController'
    }).when('/add-food', {
      templateUrl: 'views/food-add-or-edit.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
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
            });
          }
        ]
      },
      controller: 'FoodDetailsEditController',
      title: 'Add Food',
      type: 1,
      isNew: true
    }).when('/add-food/:id', {
      templateUrl: 'views/food-add-or-edit.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
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
            });
          }
        ]
      },
      controller: 'FoodDetailsEditController',
      title: 'Add Food',
      type: 1,
      isNew: true
    }).when('/upload-food', {
      templateUrl: 'views/upload-food.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/file-upload/angular-file-upload.min.js',
                '../../app/food/foodController.js'
              ]
            });
          }
        ]
      },
      controller: 'FoodController'
    }).when('/food-category', {
      templateUrl: 'views/food-category.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/foodCategory/foodCategoryController.js'
              ]
            });
          }
        ]
      },
      controller: 'FoodCategoryController'
    }).when('/food-measure', {
      templateUrl: 'views/food-Measure.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/food/foodMeasure.js'
              ]
            });
          }
        ]
      },
      controller: 'FoodMeasureController'
    }).when('/food-suggestion', {
      templateUrl: 'views/food-Suggestion.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/foodSuggestion/foodSuggestionController.js'
              ]
            });
          }
        ]
      },
      controller: 'FoodSuggestionController'
    }).when('/admin-food-suggestion', {
      templateUrl: 'views/admin-food-Suggestion.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/foodSuggestion/adminFoodSuggestionController.js',
                 '../../app/userDashboard/userDashboardService.js'
              ]
            });
          }
        ]
      },
      controller: 'AdminFoodSuggestionController'
    }).when('/food-suggestion-detail/:id', {
      templateUrl: 'views/food-view-suggestion.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/foodSuggestion/foodSuggestionController.js'
              ]
            });
          }
        ]
      },
      controller: 'FoodSuggestionViewController'
    }).when('/exercise-suggestion', {
      templateUrl: 'views/exercise-suggestion.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/exerciseSuggestion/exerciseSuggestionController.js'

              ]
            });
          }
        ]
      },
      controller: 'ExerciseSuggestionController'
    }).when('/exercise-suggestion-detail/:id', {
      templateUrl: 'views/exercise-view-suggestion.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/exerciseSuggestion/exerciseSuggestionController.js'
              ]
            });
          }
        ]
      },
      controller: 'ExerciseSuggestionDetailViewController'
    }).when('/admin-exercise-suggestion', {
        templateUrl: 'views/admin-exercise-suggestion.html',
        resolve: {
            loadMyFiles: [
                '$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'adminApp',
                        files: [
                            '../../plugin/popup/style.css',
                            '../../angular/angular-utils-pagination/dirPagination.js',
                            '../../app/exerciseSuggestion/adminExerciseSuggestionController.js',
                            '../../app/userDashboard/userDashboardService.js'
                        ]
                    });
                }
            ]
        },
        controller: 'AdminExerciseSuggestionController'
    }).when('/course', {
      templateUrl: 'views/course.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../css/custom-inputs.css',
                '../../app/course/courseController.js',
                '../../angular/angular-utils-pagination/dirPagination.js'
              ]
            });
          }
        ]
      },
      controller: 'CourseAdminController'
    }).when('/course-pending', {
      templateUrl: 'views/course-pending.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../css/custom-inputs.css',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/course/courseController.js'
              ]
            });
          }
        ]
      },
      controller: 'CourseAdminController'
    }).when('/course-detail/:id', {
      templateUrl: '../user/views/course-details.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                  '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/course/courseController.js'
              ]
            });
          }
        ]
      },
      controller: 'CourseAdminController'
    }).when('/course-view/:id', {
      templateUrl: '../user/views/course-view.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                  '../../angular/angular-utils-pagination/dirPagination.js',
                  '../../plugin/popup/style.css',
                  '../../app/course/courseController.js'
              ]
            });
          }
        ]
      },
      controller: 'CourseAdminController'
    }).when('/payments', {
      templateUrl: 'views/payments.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-ui-bootstarp.js',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/payments/adminPaymentController.js'
              ]
            });
          }
        ]
      },
      controller: 'AdminPaymentController'
    }).when('/course-subscribers-list/:id', {
      templateUrl: 'views/payments-course-subscribers.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-ui-bootstarp.js',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/payments/adminPaymentController.js'
              ]
            });
          }
        ]
      },
      controller: 'AdminPaymentController'
    }).when('/course-subscriber-details/:id', {
      templateUrl: 'views/payments-course-subscriber-details.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-ui-bootstarp.js',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/payments/adminPaymentController.js'
              ]
            });
          }
        ]
      },
      controller: 'AdminPaymentController'
    }).when('/coach-subscriber-details/:id', {
      templateUrl: 'views/payments-coach-subscriber-details.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-ui-bootstarp.js',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/payments/adminPaymentController.js'
              ]
            });
          }
        ]
      },
      controller: 'AdminPaymentController'
    }).when('/coach-payment', {
      templateUrl: 'views/payments-coach.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-ui-bootstarp.js',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/payments/adminPaymentController.js'
              ]
            });
          }
        ]
      },
      controller: 'AdminPaymentController'
    }).when('/coach-subscribers-list/:id', {
      templateUrl: 'views/payments-coach-subscribers.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../plugin/popup/style.css',
                '../../angular/angular-ui-bootstarp.js',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/payments/adminPaymentController.js'
              ]
            });
          }
        ]
      },
      controller: 'AdminPaymentController'
    }).when('/failed-payment', {
      templateUrl: 'views/payment-failed.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-ui-bootstarp.js',
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/payments/adminPaymentController.js'
              ]
            });
          }
        ]
      },
      controller: 'AdminFailedPaymentController'
    }).when('/faq', {
      templateUrl: '../common/faq.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                '../../angular/angular-utils-pagination/dirPagination.js',
                '../../app/faq/faqController.js'
              ]
            });
          }
        ]
      },
      controller: 'FAQCommonController'
    }).when('/instructions', {
      templateUrl: '../../views/common/instruction.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../app/instruction/instructionController.js']
            });
          }
        ]
      },
      controller: 'InstructionCommonController'
    }).when('/aboutus', {
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

        }).when('/terms-of-use', {
      templateUrl: '../../views/common/termsofuse.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../app/termsOfUse/termsOfUseController.js']
            });
          }
        ]
      },
      controller: 'TermsOfUseCommonController'
    }).when('/policy', {
      templateUrl: '../common/privacypolicy.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: ['../../app/privacyPolicy/privacyPolicyController.js']
            });
          }
        ]
      },
      controller: 'PrivacyPolicyCommonController'
    }).when('/contact', {
      templateUrl: '../common/contact.html',
      resolve: {
        loadMyFiles: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'adminApp',
              files: [
                'https://maps.googleapis.com/maps/api/js',
                '../../app/settings/basicInfoController.js'
              ]
            });
          }
        ]
      },
      controller: 'ContactUsController'
    }).when('/portfolio', {
        templateUrl: '../common/portfolio.html'
    }).when('/singleProject', {
        templateUrl: '../common/single-project.html'
    }).when('/blog', {
            templateUrl: '../common/blog.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'adminApp',
                        files:[
                            '../../app/blog/blogController.js'
                        ]
                    })
                }]
            },
            controller:'BlogController'
        }).
            when('/single-blog1', {
                templateUrl: '../common/single-blog1.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/blog/blogController.js'
                            ]
                        })
                    }]
                },
                controller:'BlogController'
            }).
            when('/single-blog2', {
                templateUrl: '../common/single-blog2.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/blog/blogController.js'
                            ]
                        })
                    }]
                },
                controller:'BlogController'
    }).when('/activity-logs', {
            templateUrl: 'views/activity-logs.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../angular/angular-ui-bootstarp.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/activityLogs/adminActivityLogsController.js',
                                '../../plugin/dateRange/daterangepicker.css',
                                '../../plugin/dateRange/daterangepicker.js'
                            ]
                        });
                    }
                ]
            },
            controller: 'AdminActivityLogsController'})
        .when('/user-feedback', {
            templateUrl: 'views/user-feedback.html',
            resolve: {
                loadMyFiles: [
                    '$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'adminApp',
                            files: [
                                '../../plugin/popup/style.css',
                                '../../angular/angular-ui-bootstarp.js',
                                '../../angular/angular-utils-pagination/dirPagination.js',
                                '../../app/userFeedback/userFeedbackController.js'
                            ]
                        });
                    }
                ]
            },
            controller: 'UserFeedbackController'})

        .otherwise({
        redirectTo: '/dashboard'
    });
  }
]);
//Initial Controller for Username
adminApp.controller('InitialController', [
    '$route','$routeParams', '$rootScope','$scope',
  'requestHandler',
  '$location',
  function ($route,$routeParams,$rootScope,$scope, requestHandler, $location) {
    $scope.hideValue = 1;
    requestHandler.getRequest('getUserId/', '').then(function (response) {
      $scope.username = response.data.User_Profile.name;
    });
    $scope.$on('$routeChangeStart', function (next, current) {
      $scope.activeClass = {};
      var currentPage = $location.url().substr(1);
      $scope.activeClass[currentPage] = 'active';
      });
    $scope.getSocialMediaDetails = function () {
      requestHandler.getRequest('contactus/', '').then(function (response) {
        $scope.commonDetails = response.data.Contactus[0];
        $scope.address = $scope.commonDetails.streetaddress + ', ' + $scope.commonDetails.state + ', ' + $scope.commonDetails.city + ', ' + $scope.commonDetails.zipcode;
        $scope.contactUsDetails = $scope.commonDetails;
        $scope.hideValue = 0;
      });
    };
    $scope.getSocialMediaDetails();

      $rootScope.$route=$route;
      $rootScope.$routeParams=$routeParams;
      $rootScope.$on('$routeChangeSuccess',function(event,current,previous){
          if(previous!=undefined){
              $rootScope.previousState=previous.$$route.originalPath;
          }
      });
  }
]);
//Controller For Logout
adminApp.controller('LogoutController', [
  '$cookies',
  '$scope',
  '$window',
  'requestHandler',
  function ($cookies, $scope, $window, requestHandler) {
    $scope.doLogout = function () {
      $cookies.remove('X-CSRFToken', { path: '/' });
      $cookies.put('sessionid', undefined);
      $window.location.href = '../../#/home';
    };
  }
]);
//Email Already Exists
adminApp.directive('emailexists', [
  '$q',
  '$timeout',
  'requestHandler',
  function ($q, $timeout, requestHandler) {
    var CheckEmailExists = function (isNew) {
      if (isNew === 1)
        return true;
      else
        return false;
    };
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.emailexists = function (modelValue) {
          var defer = $q.defer();
          $timeout(function () {
            var isNew;
            var sendRequest = requestHandler.postRequest('checkEmailExist/', { 'emailid': modelValue }).then(function (response) {
                isNew = response.data.Response_status;
              });
            sendRequest.then(function () {
              if (CheckEmailExists(isNew)) {
                defer.resolve();
              } else {
                defer.reject();
              }
            });
            isNew = false;
          }, 10);
          return defer.promise;
        };
      }
    };
  }
]);
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
adminApp.directive('categoryexists', [
  '$q',
  '$timeout',
  'requestHandler',
  function ($q, $timeout, requestHandler) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: { 'categoryid': '=' },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.categoryexists = function (modelValue) {
          var defer = $q.defer();
          $timeout(function () {
            var categoryid = scope.categoryid;
            var sendRequest = requestHandler.postRequest('admin/checkCategoryNameExists/', {
                'categoryname': modelValue,
                'categoryid': categoryid
              }).then(function (response) {
                if (response.data.Response_status == 0) {
                  defer.resolve();
                } else {
                  defer.reject();
                }
              });
          }, 10);
          return defer.promise;
        };
      }
    };
  }
]);
//Category Already Exists
adminApp.directive('measureexists', [
  '$q',
  '$timeout',
  'requestHandler',
  function ($q, $timeout, requestHandler) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: { 'measureid': '=' },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.measureexists = function (modelValue) {
          var defer = $q.defer();
          $timeout(function () {
            var measureid = scope.measureid;
            var sendRequest = requestHandler.postRequest('admin/checkMeasureNameExists/', {
                'measurename': modelValue,
                'measureid': measureid
              }).then(function (response) {
                if (response.data.Response_status == 0) {
                  defer.resolve();
                } else {
                  defer.reject();
                }
              });
          }, 10);
          return defer.promise;
        };
      }
    };
  }
]);
//Food Already Exists
adminApp.directive('foodexists', [
  '$q',
  '$timeout',
  'requestHandler',
  function ($q, $timeout, requestHandler) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: { 'foodid': '=' },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.foodexists = function (modelValue) {
          var defer = $q.defer();
          $timeout(function () {
            var foodid = scope.foodid;
            var sendRequest = requestHandler.postRequest('admin/checkFoodNameExists/', {
                'foodname': modelValue,
                'foodid': foodid
              }).then(function (response) {
                if (response.data.Response_status == 0) {
                  defer.resolve();
                } else {
                  defer.reject();
                }
              });
          }, 10);
          return defer.promise;
        };
      }
    };
  }
]);
//Exercise Already Exists
adminApp.directive('exerciseexists', [
  '$q',
  '$timeout',
  'requestHandler',
  function ($q, $timeout, requestHandler) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: { 'exerciseid': '=' },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.exerciseexists = function (modelValue) {
          var defer = $q.defer();
          $timeout(function () {
            var exerciseid = scope.exerciseid;
            var sendRequest = requestHandler.postRequest('admin/checkExerciseNameExists/', {
                'exercisename': modelValue,
                'exerciseid': exerciseid
              }).then(function (response) {
                if (response.data.Response_status == 0) {
                  defer.resolve();
                } else {
                  defer.reject();
                }
              });
          }, 10);
          return defer.promise;
        };
      }
    };
  }
]);
//Exercise type name Already Exists
adminApp.directive('typenameexists', [
  '$q',
  '$timeout',
  'requestHandler',
  function ($q, $timeout, requestHandler) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: { 'typeid': '=' },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.typenameexists = function (modelValue) {
          var defer = $q.defer();
          $timeout(function () {
            var typeid = scope.typeid;
            var sendRequest = requestHandler.postRequest('admin/checkTypeName/', {
                'typename': modelValue,
                'typeid': typeid
              }).then(function (response) {
                if (response.data.Response_status == 0) {
                  defer.resolve();
                } else {
                  defer.reject();
                }
              });
          }, 10);
          return defer.promise;
        };
      }
    };
  }
]);
//Exercise Category name Already Exists
adminApp.directive('categorynameexists', [
    '$q',
    '$timeout',
    'requestHandler',
    function ($q, $timeout, requestHandler) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: { 'categoryid': '=' },
            link: function (scope, element, attributes, ngModel) {
                ngModel.$asyncValidators.categorynameexists = function (modelValue) {
                    var defer = $q.defer();
                    $timeout(function () {
                        var categoryid = scope.categoryid;
                        var sendRequest = requestHandler.postRequest('admin/checkCategoryName/', {
                            'categoryname': modelValue,
                            'categoryid': categoryid
                        }).then(function (response) {
                            if (response.data.Response_status == 0) {
                                defer.resolve();
                            } else {
                                defer.reject();
                            }
                        });
                    }, 10);
                    return defer.promise;
                };
            }
        };
    }
]);


//Exercise Level name Already Exists
adminApp.directive('levelnameexists', [
    '$q',
    '$timeout',
    'requestHandler',
    function ($q, $timeout, requestHandler) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: { 'levelid': '=' },
            link: function (scope, element, attributes, ngModel) {
                ngModel.$asyncValidators.levelnameexists = function (modelValue) {
                    var defer = $q.defer();
                    $timeout(function () {
                        var levelid = scope.levelid;
                        var sendRequest = requestHandler.postRequest('admin/checkLevelName/', {
                            'levelname': modelValue,
                            'levelid': levelid
                        }).then(function (response) {
                            if (response.data.Response_status == 0) {
                                defer.resolve();
                            } else {
                                defer.reject();
                            }
                        });
                    }, 10);
                    return defer.promise;
                };
            }
        };
    }
]);

// Compare Confirm Password
adminApp.directive('compareTo', function () {
  return {
    require: 'ngModel',
    scope: { otherModelValue: '=compareTo' },
    link: function (scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = function (modelValue) {
        return modelValue == scope.otherModelValue;
      };
      scope.$watch('otherModelValue', function () {
        ngModel.$validate();
      });
    }
  };
});
//To Display success message
//For User Messages
function successMessage(Flash, message) {
  Flash.dismiss();
  Flash.create('success', message, 'alert');
  $('html, body').animate({ scrollTop: 0 }, 600);
  return false;
}
function errorMessage(Flash, message) {
  Flash.dismiss();
  Flash.create('danger', message, 'custom-class');
  $('html, body').animate({ scrollTop: 0 }, 600);
  return false;
}
//Check For Email Validation
adminApp.directive('validateEmail', function () {
  var EMAIL_REGEXP = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,5})$/;
  return {
    require: 'ngModel',
    restrict: '',
    link: function (scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {
        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function (modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});




//Check For Only Alphabets with space
adminApp.directive('validateAlphaWithSpace', function() {
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
adminApp.directive('validateEmail', function() {
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
adminApp.directive('validatePhoneNumber', function() {
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

//Check For URL Validation
adminApp.directive('validateUrl', function () {
  var URL_REGEXP = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return {
    require: 'ngModel',
    restrict: '',
    link: function (scope, elm, attrs, ngModel) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      ngModel.$validators.validateUrl = function (modelValue) {
        return URL_REGEXP.test(modelValue);
      };
    }
  };
});
//Check For URL Validation
adminApp.directive('validateNumber', function () {
  var NUM_REGEXP = /^\d+$/;
  return {
    require: 'ngModel',
    restrict: '',
    link: function (scope, elm, attrs, ngModel) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      ngModel.$validators.validateNumber = function (modelValue) {
        return NUM_REGEXP.test(modelValue);
      };
      elm.bind('keypress', function (event) {
        if (event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});
//ui-select required validation
adminApp.directive('uiSelectRequired', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ngModel) {
      ngModel.$validators.uiSelectRequired = function (modelValue, viewValue) {
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
adminApp.directive('checkRequired', function () {
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
adminApp.directive('foodNameExists', [
  '$q',
  '$timeout',
  'requestHandler',
  function ($q, $timeout, requestHandler) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.foodNameExists = function (modelValue) {
          var defer = $q.defer();
          $timeout(function () {
            var sendRequest = requestHandler.postRequest('admin/searchFoodnamebyAdmin/', { 'foodname': modelValue }).then(function (response) {
                return response.data.Response_status;
              });
            sendRequest.then(function (result) {
              if (result == '0') {
                defer.resolve();
              } else {
                defer.reject();
              }
            });
            isNewFood = false;
          }, 10);
          return defer.promise;
        };
      }
    };
  }
]);
adminApp.directive('checkboxGroup', function () {
  return {
    restrict: 'E',
    controller: [
      '$scope',
      '$attrs',
      function ($scope, $attrs) {
        var self = this;
        var ngModels = [];
        var minRequired;
        self.validate = function () {
          var checkedCount = 0;
          angular.forEach(ngModels, function (ngModel) {
            if (ngModel.$modelValue) {
              checkedCount++;
            }
          });
          var minRequiredValidity = checkedCount >= minRequired;
          angular.forEach(ngModels, function (ngModel) {
            ngModel.$setValidity('checkboxGroup-minRequired', minRequiredValidity, self);
          });
        };
        self.register = function (ngModel) {
          ngModels.push(ngModel);
        };
        self.deregister = function (ngModel) {
          if (!this.ngModels) {
          } else {
            var index = this.ngModels.indexOf(ngModel);
            if (index != -1) {
              this.ngModels.splice(index, 1);
            }
          }
        };
        $scope.$watch($attrs.minRequired, function (value) {
          minRequired = parseInt(value, 10);
          self.validate();
        });
      }
    ]
  };
});
adminApp.directive('input', function () {
  return {
    restrict: 'E',
    require: [
      '?^checkboxGroup',
      '?ngModel'
    ],
    link: function (scope, element, attrs, controllers) {
      var checkboxGroup = controllers[0];
      var ngModel = controllers[1];
      if (attrs.type == 'checkbox' && checkboxGroup && ngModel) {
        checkboxGroup.register(ngModel);
        scope.$watch(function () {
          return ngModel.$modelValue;
        }, checkboxGroup.validate);
        // In case we are adding and removing checkboxes dynamically we need to tidy up after outselves.
        scope.$on('$destroy', function () {
          checkboxGroup.deregister(ngModel);
        });
      }
    }
  };
});
//Float Validation
//Check For FLoat Validation
adminApp.directive('validateFloat', function () {
  //alert("hi");
  var FLOAT_REGEXP = /^\-?\d+((\.)\d+)?$/;
  //var FLOAT_REGEXP = /^[1-9]+((\.)\d+)?$/;
  return {
    require: 'ngModel',
    restrict: '',
    link: function (scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the Float Number validator
      ctrl.$validators.validateFloat = function (modelValue) {
        // alert(modelValue);
        return ctrl.$isEmpty(modelValue) || FLOAT_REGEXP.test(modelValue);
      };
    }
  };
});
//Check For FLoat Validation greater than 0
adminApp.directive('validateFloat1', function () {
  // var FLOAT_REGEXP = /^\-?\d+((\.)\d+)?$/;
  var FLOAT_REGEXP = /^\s*(?=.*[1-9])\d*(?:\.\d{0,8})?\s*$/;
  return {
    require: 'ngModel',
    restrict: '',
    link: function (scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the Float Number validator
      ctrl.$validators.validateFloat1 = function (modelValue) {
        return ctrl.$isEmpty(modelValue) || FLOAT_REGEXP.test(modelValue);
      };
    }
  };
});
//Check For Integer Validation
adminApp.directive('validateInteger', function () {
  var INTEGER_REGEXP = /^\-?\d*$/;
  return {
    require: 'ngModel',
    restrict: '',
    link: function (scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the Integer validator
      ctrl.$validators.validateInteger = function (modelValue) {
        return ctrl.$isEmpty(modelValue) || INTEGER_REGEXP.test(modelValue);
      };
    }
  };
});

adminApp.filter('startsWithLetter', function () {
  return function (items, searchMenu) {
    var filtered = [];
    var letterMatch = new RegExp(searchMenu, 'i');
    if (!items) {
    } else {
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
adminApp.directive('validateImgFileExt', function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            elem.on('change', function  (evt) {
                scope.$apply(function(value){
                    var files = evt.currentTarget.files[0];
                    fileExt = files.name.substring(files.name.lastIndexOf('.')+1);
                    var type=["jpg","gif","png","jpeg"];

                    if (fileExt && type.indexOf(fileExt)!=-1){
                        ctrl.$setValidity('validateImgFileExt', true);
                    }
                    else{
                        ctrl.$setValidity('validateImgFileExt', false);
                    }
                });
            });
        }
    };
});

adminApp.directive('validNumber', function() {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            if(!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function(val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }

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
adminApp.factory('siteMenuService', function () {
  var site = [
      {
        'id': 4,
        'name': 'FAQ List',
        'icon': 'question-circle',
        'href': 'site',
        'active': ''
      },
      {
        'name': 'About Us',
        'icon': 'building-o',
        'href': 'about-us',
        'active': ''
      },
      {
        'name': 'Privacy Policy',
        'icon': 'pencil',
        'href': 'privacy-policy',
        'active': ''
      },
      {
        'name': 'Terms Of Use',
        'icon': 'file-text',
        'href': 'terms-of-use-edit',
        'active': ''
      },
      {
        'id': 5,
        'name': 'Articles',
        'icon': 'list-alt',
        'href': 'articles',
        'active': ''
      },
      {
        'id': 3,
        'name': 'Testimonials',
        'icon': 'comment',
        'href': 'testimonials',
        'active': ''
      },
      {
        'id': 2,
        'name': 'Latest News',
        'icon': 'newspaper-o',
        'href': 'latest-news',
        'active': ''
      },
      {
        'id': 1,
        'name': 'Forums',
        'icon': 'comments',
        'href': 'forums',
        'active': ''
      },
      {
          'name': 'Coach Pricing Plan',
          'icon': 'inr',
          'href': 'pricing-plan-list',
          'active': ''
      },
      {
        'name': 'Address Info',
        'icon': 'map-marker',
        'href': 'settings',
        'active': ''
      },
      {
        'name': 'Mobile App',
        'icon': 'tablet',
        'href': 'mobile-app',
        'active': ''
      },
      {
        'name': 'Payment Settings',
        'icon': 'dollar',
        'href': 'paypal-settings',
        'active': ''
      },
      /*{
          'name': 'Razor Payment Settings',
          'icon': 'dollar',
          'href': 'razor-payment-settings',
          'active': ''
      },
      {
          'name': 'Authorize.Net Settings',
          'icon': 'credit-card',
          'href': 'authorizeNet-payment-settings',
          'active': ''
      },*/
      {
        'name': 'Server',
        'icon': 'server',
        'href': 'server-settings',
        'active': ''
      },
      {
        'name': 'Social Media',
        'icon': 'connectdevelop',
        'href': 'social-media-settings',
        'active': ''
      },
      {

          'name':'Apps & Devices',
          'icon':'cog',
          'href':'vendor-settings',
          'active': ''
      },
      {

          'name': 'CDC Syndication',
          'icon': 'file-code-o',
          'href': 'cdc-list',
          'active': ''
      }

    ];
  return site;
});

adminApp.factory('coachMenuService', function () {
  var coach = [
     
      {
        'id': 1,
        'name': 'Invitation List',
        'icon': 'envelope',
        'href': 'invitation-list',
        'active': ''
      },
      {
        'id': 2,
        'name': 'Coach List',
        'icon': 'users',
        'href': 'coach',
        'active': ''
      },
      {
        'id': 3,
        'name': 'Subscriptions', 
        'icon': 'dollar',
        'href': 'coach-subscriptions',
        'active': ''
      }];
  return coach;
});


adminApp.directive('focusMe', [
  '$timeout',
  '$parse',
  function ($timeout, $parse) {
    return {
      link: function (scope, element, attrs) {
        var model = $parse(attrs.focusMe);
        scope.$watch(model, function (value) {
          if (value === true) {
            $timeout(function () {
              element[0].focus();
            });
          }
        });
        // to address @blesh's comment, set attribute value to 'false'
        // on blur event:
        element.bind('blur', function () {
          scope.$apply(model.assign(scope, false));
        });
      }
    };
  }
]);

//Check for Email Already Exists
adminApp.directive("emailexists",['$q', '$timeout','requestHandler', function ($q, $timeout,requestHandler) {

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


adminApp.factory('myGoogleAnalytics', [
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

//Check for All alpha with space and special character  Validation
adminApp.directive('validateAlphaWithCharacters', function() {
    var ALPHA_CHARACTERS = /^[a-zA-Z @!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":_<>\?]+$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the Integer validator
            ctrl.$validators.validateAlphaWithCharacters = function(modelValue) {
                return  ctrl.$isEmpty(modelValue) || ALPHA_CHARACTERS .test(modelValue);
            };
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
