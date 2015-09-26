var commonApp= angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ngCookies']);

commonApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

    function($routeProvider,$ocLazyLoadProvider,$httpProvider) {
        $ocLazyLoadProvider.config({
            debug:false,
            events:true
        });

        //Do For Cross Orgin Login Management
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
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'plugin/vertical-carousel/vertical-carousel.js',
                                'plugin/vertical-carousel/vertical-carousel.css',
                                'app/testimonial/testimonialController.js'
                            ]
                        })
                    }
                }
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
                templateUrl: 'views/common/contact.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'app/settings/basicInfoController.js'
                            ]
                        })
                    }
                },
                controller:'ContactUsDetailsController'
            }).
            when('/testimonial', {
                templateUrl: 'views/common/testimonial.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'plugin/vertical-carousel/vertical-carousel.js',
                                'plugin/vertical-carousel/vertical-carousel.css',
                                'app/testimonial/testimonialController.js'

                            ]
                        })
                    }
                },
                controller:'TestimonialUserController'
            }).
            when('/testimonials/:id', {
                templateUrl: 'views/common/testimonial.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'plugin/vertical-carousel/vertical-carousel.js',
                                'plugin/vertical-carousel/vertical-carousel.css',
                                'app/testimonial/testimonialController.js'

                            ]
                        })
                    }
                },
                controller:'TestimonialUserController'
            }).
            when('/news', {
                templateUrl: 'views/common/news.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'plugin/vertical-carousel/vertical-carousel.js',
                                'plugin/vertical-carousel/vertical-carousel.css',
                                'app/latestNews/latestNewsController.js'
                            ]
                        })
                    }
                },
                controller:'NewsUserController'
            }).
            when('/FAQ', {
                templateUrl: 'views/common/FAQ.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'js/bootstrap.min.js',
                                'app/faq/faqController.js'
                            ]
                        })
                    }
                },
                controller:'FAQUserController'
            }).
            when('/instructions', {
                templateUrl: 'views/common/instruction.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'js/bootstrap.min.js',
                                'app/instruction/instructionController.js'
                            ]
                        })
                    }
                },
                controller:'InstructionUserController'
            }).
            when('/termsofuse', {
                templateUrl: 'views/common/termsofuse.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'js/bootstrap.min.js',
                                'app/termsOfUse/termsOfUseController.js'
                            ]
                        })
                    }
                },
                controller:'TermsOfUseUserController'
            }).
            when('/policy', {
                templateUrl: 'views/common/privacypolicy.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'js/bootstrap.min.js',
                                'app/privacyPolicy/privacyPolicyController.js'
                            ]
                        })
                    }
                },
                controller:'PrivacyPolicyUserController'
            }).
            otherwise({
                redirectTo: '/index'
            });
    }]);


//Internal Login Details
commonApp.controller('LoginController',function($scope,requestHandler,Flash,$window){

    //Login
    $scope.doLogin=function(){
        requestHandler.loginRequest($scope.username,$scope.password).then(function(response){
            console.log(response.data.Response_status);
            if(response.data.Response_status===0){
                errorMessage(Flash,"Incorrect Username/Password");
            }
            else{
                successMessage(Flash,"Login Successful!");

                //Get Logged In User
                requestHandler.getRequest("getUserId/","").then(function(response){

                    console.log("Role:"+response.data.Login.roleid);
                   if(response.data.Login.roleid==3){
                       console.log("Role:"+response.data.User_Profile.isProfileUpdated);
                       if(response.data.User_Profile.isProfileUpdated==0){
                          $window.location.href="views/user/#/profile";
                       }else{
                           $window.location.href="views/user/#/dashboard";
                       }
                   }
                    else if(response.data.Login.roleid==2){
                       $window.location.href="views/superadmin/#/dashboard";
                   }
                    else if(response.data.Login.roleid==1){
                       $window.location.href="views/superadmin/#/dashboard";
                   }
                });


               // $window.location.href="views/user/#/register";
            }
        });

    };

    //Register New User
    $scope.register=function(){
        //Operation After clicked create account
        $scope.userForm.role="3";
        requestHandler.postRequest("registerUser/",$scope.userForm).then(function(response){

            console.log($scope.userForm);

            if(response.data.Response===0){
                errorMessage(Flash,"Something went wrong! Please Try again later!")
            }
            else{
                $(".reset_password").hide();
                $(".user_register").hide();
                $(".secret_question").hide();
                $(".user_register1").hide();
                $(".user_login").show();
                $(".header_title").text('Login');
                successMessage(Flash,"Register Successful!");

                $scope.userForm={};
                $scope.registerForm=false;

            }
        });
    };

    //Forgot Password
    $scope.doForgotPassword=function(){
        //request for secret question
        requestHandler.postRequest("getSecretQuestion/",{"emailid":$scope.emailid}).then(function(response){
            if(response.data.Response_status==0){
                errorMessage(Flash,"Email ID doesn't Exist!");
            }
            else if(response.data.Response_status==1){
                //Lets show the secret question
                $(".user_login").hide();
                $(".reset_password").hide();
                $(".user_register").hide();
                $(".secret_question").show();
                $(".header_title").text('Register');
                $scope.secretQuestion=response.data.secretquestion;
            }
        });
    };

    //Check Secret Answer
    $scope.doSecretAnswerCheck=function(){
        //send secret answer
        requestHandler.postRequest("forgotPassword/",{"emailid":$scope.emailid,"secretanswer":$scope.secretAnswer}).then(function(response){
            if(response.data.Response_status==0){
                errorMessage(Flash,"Incorrect Secret Answer!");
            }
            else if(response.data.Response_status==1){
                //Lets show the secret question
                successMessage(Flash,"Secret Answer Matched! Check your E-Mail");
            }
        });
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

// Compare Confirm Password
commonApp.directive('compareTo',function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

// Compare Confirm Password
commonApp.directive('secretAnswer',function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=secretAnswer"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.secretAnswer = function (modelValue) {
                alert("Sample"+scope.otherModelValue);
                if(scope.otherModelValue!=""){
                    alert("return true");
                    return true;
                }else{
                    return false;
                }


            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});


//Check for Email Already Exists
commonApp.directive("emailexists", function ($q, $timeout,requestHandler) {

    var CheckEmailExists = function (isNew) {

        if(isNew===1)
            return true;
        else
            return false;
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
});
