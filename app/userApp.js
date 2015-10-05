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
                                '../../plugin/circle/circle.css',
                                '../../plugin/circle/jquery.circlechart.js',
                                '../../plugin/date-picker/moment.js',
                                '../../plugin/date-picker/pikaday.css',
                                '../../plugin/date-picker/pikaday.js',
                                '../../plugin/search/tipuedrop_content.js',
                                '../../plugin/search/tipuedrop.css',
                                '../../plugin/search/tipuedrop.js'
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
            when('/profile', {
                templateUrl: 'views/profile.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'userApp',
                            files:[
                                '../../plugin/date-picker/moment.js',
                                '../../plugin/date-picker/pikaday.css',
                                '../../plugin/date-picker/pikaday.js',
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
                                '../../css/profile-image-upload.css',
                                '../../js/image-upload.js',
                                '../../app/demography/demographyController.js'
                            ]
                        })
                    }
                },
                controller:'DemographyController'
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
