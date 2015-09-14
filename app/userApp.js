var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad']);

userApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

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
                            name:'userApp',
                            files:[
                                '../../css/custom-inputs.css',
                                '../../css/vertical_tab.css',
                                '../../plugin/circle/circle.css',
                                '../../plugin/circle/circle.js',
                                '../../plugin/circle/jquery.circlechart.js',
                                '../../plugin/datepicker/bootstrap-datepicker.js',
                                '../../plugin/datepicker/datepicker.css',
                                '../../plugin/search/tipuedrop_content.js',
                               '../../plugin/search/tipuedrop.css',
                               '../../plugin/search/tipuedrop.js',

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
            when('/history', {
                templateUrl: 'views/history.html'
            }).
            when('/coach', {
                templateUrl: 'views/coach.html'
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
            otherwise({
                redirectTo: '/dashboard'
            });
}]);