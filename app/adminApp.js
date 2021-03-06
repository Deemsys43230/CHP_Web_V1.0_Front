var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad']);

adminApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

    function($routeProvider,$ocLazyLoadProvider,$httpProvider) {
        $ocLazyLoadProvider.config({
            debug:false,
            events:true
        });

        //Do For Cross Orgin Management
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push(['$q','$location','$injector',function ($q, $location,$injector) {

            return {
                
                'request': function(request) {
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
                                '../../plugin/popup/jquery.leanModal.min.js'
                            ]
                        })
                    }
                }
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
                                'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.5.0/summernote.css',
                                '../../plugin/text-editor/summernote.js'
                            ]
                        })
                    }
                }
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
                                'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.5.0/summernote.css',
                                '../../plugin/text-editor/summernote.js'
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
                                '../../css/image-upload.css',
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
                                '../../app/commonDirectives/sidebar/settingsmenu.js'
                            ]
                        })
                    }
                }
            }).
            when('/mobileApp', {
                templateUrl: 'views/settings-mobile-app.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../app/commonDirectives/sidebar/settingsmenu.js'
                            ]
                        })
                    }
                }
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
                                '../../css/image-upload.css',
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