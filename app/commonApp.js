var commonApp= angular.module('commonApp', ['ngRoute','oc.lazyLoad']);

commonApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

    function($routeProvider,$ocLazyLoadProvider,$httpProvider) {
        $ocLazyLoadProvider.config({
            debug:false,
            events:true
        });

        //Do For Cross Orgin Login Management
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
            when('/index', {
                templateUrl: 'views/common/index.html'
            }).
            when('/howItWork', {
                templateUrl: 'views/common/how-it-work.html'
            }).
            when('/aboutUs', {
                templateUrl: 'views/common/about.html'
            }).
            when('/portfolio', {
                templateUrl: 'views/common/portfolio.html'
            }).
            when('/singleProject', {
                templateUrl: 'views/common/single-project.html'
            }).
            when('/blog', {
                templateUrl: 'views/common/blog.html'
            }).
            when('/contact', {
                templateUrl: 'views/common/contact.html'
            }).
            otherwise({
                redirectTo: '/index'
            });
    }]);