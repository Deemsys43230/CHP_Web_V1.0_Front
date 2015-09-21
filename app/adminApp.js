var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad','ngCookies','ngAnimate','angularUtils.directives.dirPagination']);

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
                                '../../js/bootstrap.min.js',
                                '../../css/custom-inputs.css',
                                '../../plugin/datepicker/bootstrap-datepicker.js',
                                '../../plugin/datepicker/datepicker.css'
                            ]
                        })
                    }
                }
            }).
            when('/register', {
                templateUrl: 'views/register.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/custom-inputs.css',
                                '../../plugin/datepicker/bootstrap-datepicker.js',
                                '../../plugin/datepicker/datepicker.css'
                            ]
                        })
                    }
                }
            }).
            when('/history', {
                templateUrl: 'views/history.html',
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
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/portfolio', {
                templateUrl: '../common/portfolio.html',
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
            when('/singleProject', {
                templateUrl: '../common/single-project.html',
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
            when('/blog', {
                templateUrl: '../common/blog.html',
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
            when('/contact', {
                templateUrl: '../common/contact.html',
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
            when('/site', {
                templateUrl: 'views/site-FAQ.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../app/commonDirectives/sidebar/sitemenu.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../js/jquery.simplyCountable.js',
                                '../../app/faq/faqController.js'
                            ]
                        })
                    }
                },
                controller:'FAQController'
            }).
            when('/instruction', {
                templateUrl: 'views/site-instruction.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/commonDirectives/sidebar/sitemenu.js',
                                '../../plugin/text-editor/text-editor-bootstarp.js',
                                '../../css/summernote.css',
                                '../../js/summernote.js',
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
                                '../../app/commonDirectives/sidebar/sitemenu.js',
                                '../../plugin/text-editor/text-editor-bootstarp.js',
                                '../../app/privacyPolicy/privacyPolicyController.js',
                                '../../css/summernote.css',
                                '../../js/summernote.js'

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
                                '../../app/commonDirectives/sidebar/sitemenu.js',
                                '../../plugin/text-editor/text-editor-bootstarp.js',
                                '../../app/termsOfUse/termsOfUseController.js',
                                '../../css/summernote.css',
                                '../../js/summernote.js'

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
                                '../../app/commonDirectives/sidebar/sitemenu.js'
                            ]
                        })
                    }
                }
            }).
            when('/addLatestNews', {
                templateUrl: 'views/site-add-news.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/commonDirectives/sidebar/sitemenu.js',
                                '../../plugin/text-editor/text-editor-bootstarp.js',
                                'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.5.0/summernote.css',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/date-time-picker/DateTimePicker.js',
                                '../../plugin/date-time-picker/DateTimePicker.css'
                            ]
                        })
                    }
                }
            }).
            when('/editLatestNews', {
                templateUrl: 'views/site-edit-news.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../app/commonDirectives/sidebar/sitemenu.js',
                                '../../plugin/text-editor/text-editor-bootstarp.js',
                                'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.5.0/summernote.css',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/date-time-picker/DateTimePicker.js',
                                '../../plugin/date-time-picker/DateTimePicker.css'
                            ]
                        })
                    }
                }
            }).
            when('/testimonials', {
                templateUrl: 'views/site-testimonials.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../app/commonDirectives/sidebar/sitemenu.js',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js'
                            ]
                        })
                    }
                }
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
                                '../../plugin/popup/jquery.leanModal.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/coach-view', {
                templateUrl: 'views/coach-view.html',
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
                                '../../app/commonDirectives/sidebar/settingsmenu.js',
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
                                '../../app/commonDirectives/sidebar/settingsmenu.js',
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
                                '../../app/commonDirectives/sidebar/settingsmenu.js',
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
                                '../../app/commonDirectives/sidebar/settingsmenu.js',
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
                                '../../app/commonDirectives/sidebar/settingsmenu.js',
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
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/food-edit', {
                templateUrl: 'views/food-edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/input-tag.css',
                                '../../css/custom-inputs.css',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js',
                                '../../css/food-image-upload.css',
                                '../../js/image-upload.js'
                            ]
                        })
                    }
                }
            }).
            when('/food-view', {
                templateUrl: 'views/food-view.html',
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
            when('/addFood', {
                templateUrl: 'views/add-food.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/input-tag.css',
                                '../../css/custom-inputs.css',
                                '../../plugin/popup/style.css',
                                '../../plugin/popup/jquery.leanModal.min.js'
                            ]
                        })
                    }
                }
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
            otherwise({
                redirectTo: '/dashboard'
            });
}]);


//To Display success message
//For User Messages
function successMessage(Flash,message){
    Flash.create('success', message, 'alert');
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
}

function errorMessage(Flash,message){
    Flash.create('danger', message, 'custom-class');
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
}
