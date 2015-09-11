var commonApp= angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash']);

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
                templateUrl: 'views/common/index.html',
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


//Internal Login Details
commonApp.controller('LoginController',function($scope,requestHandler,Flash){

    $scope.doLogin=function(){
        console.log("Logging in...");
        requestHandler.loginRequest($scope.username,$scope.password).then(function(response){
            console.log(response.data.Response_status);
            if(response.data.Response_status===0){
                errorMessage(Flash,"Incorrect Username/Password");
            }
            else{
                successMessage(Flash,"Login Successful!");
            }
        });

    };

    $scope.register=function(){
        alert("register Control");
    };



});

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