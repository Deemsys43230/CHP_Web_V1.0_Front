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
                            break;
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
                templateUrl: '../common/index.html',
                resolve: {
                        loadMyFiles:function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name:'commonApp',
                                files:[
                                    '../../plugin/vertical-carousel/vertical-carousel.js',
                                    '../../plugin/vertical-carousel/vertical-carousel.css',
                                    '../../app/commonController.js'
                                ]
                            })
                        }

                },
                controller:'CommonController'
            }).
            when('/howItWork', {
                templateUrl: '../common/how-it-work.html'
            }).
            when('/aboutUs', {
                templateUrl: '../common/about.html'
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
            when('/singleBlog1', {
                templateUrl: '../common/single-blog1.html'
            }).
            when('/singleBlog2', {
                templateUrl: '../common/single-blog2.html'
            }).
            when('/contact', {
                templateUrl: '../common/contact.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/settings/basicInfoController.js'
                            ]
                        })
                    }
                },
                controller:'ContactUsDetailsController'
            }).
            when('/testimonials/:id', {
                templateUrl: '../common/testimonial.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../plugin/vertical-carousel/vertical-carousel.css',
                                '../../app/testimonial/testimonialController.js'
                            ]
                        })
                    }
                },
                controller:'TestimonialUserController'
            }).
            when('/news', {
                templateUrl: '../common/news.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../plugin/vertical-carousel/vertical-carousel.css',
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }
                },
                controller:'NewsUserController'
            }).
            when('/news/:id', {
                templateUrl: '../common/news.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../plugin/vertical-carousel/vertical-carousel.css',
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }
                },
                controller:'NewsUserController'
            }).
            when('/FAQ', {
                templateUrl: '../common/FAQ.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/faq/faqController.js'
                            ]
                        })
                    }
                },
                controller:'FAQCommonController'
            }).
            when('/instructions', {
                templateUrl: '../common/instruction.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/instruction/instructionController.js'
                            ]
                        })
                    }
                },
                controller:'InstructionCommonController'
            }).
            when('/termsofuse', {
                templateUrl: '../common/termsofuse.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/termsOfUse/termsOfUseController.js'
                            ]
                        })
                    }
                },
                controller:'TermsOfUseCommonController'
            }).
            when('/policy', {
                templateUrl: '../common/privacypolicy.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/privacyPolicy/privacyPolicyController.js'
                            ]
                        })
                    }
                },
                controller:'PrivacyPolicyCommonController'
            }).
            when('/usefulVideos', {
                templateUrl: '../common/useful-videos.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/usefulVideos/usefulVideosController.js'
                            ]
                        })
                    }
                },
                controller:'UsefulVideosController'
            }).
            otherwise({
                redirectTo: '/index'
            });
    }]);

//Internal Login Details
commonApp.controller('LoginController',function($scope,requestHandler,Flash,$window,$location){

    $scope.$on('$routeChangeStart', function(next, current) {
        $scope.activeClass={};
        var currentPage = $location.url().substr(1);
        $scope.activeClass[currentPage]='active';
    });

    $scope.reset=function(){
        $scope.loginForm.$setPristine();
        $scope.forgotPasswordForm.$setPristine();
        $scope.registerForm.$setPristine();
        $scope.registerForm2.$setPristine();
        $scope.username='';
        $scope.password='';
        $scope.emailid='';
        $scope.secretAnswer='';
        $scope.confirmpassword='';
        $scope.userForm={};
        $scope.userForm={
            'emailid':''
        };
    };

    $scope.getSocialMediaDetails=function(){
        requestHandler.getRequest("contactus/","").then(function(response){
            $scope.commonDetails = response.data.Contactus[0];
        });
    };

    $scope.getSocialMediaDetails();

    //Login
    $scope.doLogin=function(){
        requestHandler.loginRequest($scope.username,$scope.password).then(function(response){

            if(response.data.Response_status===0){

                errorMessage(Flash,"Incorrect Username/Password");
            }
            if(response.data.Response_status==="User not allowed"){
                errorMessage(Flash,"Your Account has been disabled!<br/>Please Contact Administrator.");
            }
            if(response.data.Response_status===""){

                successMessage(Flash,"Login Successful!");

                //Get Logged In User
                requestHandler.getRequest("getUserId/","").then(function(response){

                    console.log("Role:"+response.data.Login.roleid);
                   if(response.data.Login.roleid==3){
                       console.log("Role:"+response.data.User_Profile.isProfileUpdated);
                       if(response.data.User_Profile.isProfileUpdated==0){
                          $window.location.href="../user/#/profile";
                       }else{
                           $window.location.href="../user/#/dashboard";
                       }
                   }
                    else if(response.data.Login.roleid==2){
                       console.log("Role:"+response.data.User_Profile.isProfileUpdated);
                       if(response.data.User_Profile.isProfileUpdated==0){
                           $window.location.href="../coach/#/profile";
                       }else{
                           $window.location.href="../coach/#/dashboard";
                       }
                   }
                    else if(response.data.Login.roleid==1){
                       $scope.reset();
                       $window.location.href="../superadmin/#/dashboard";
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
        if($scope.userForm.secretquestion==""){
            delete $scope.userForm.secretquestion;
            delete $scope.userForm.secretanswer;
        }
        if($scope.userForm.secretanswer==""){
            delete $scope.userForm.secretquestion;
            delete $scope.userForm.secretanswer;
        }
        requestHandler.postRequest("registerUser/",$scope.userForm).then(function(response){

            console.log($scope.userForm);
            console.log(response.data.Response);
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
                successMessage(Flash,"Registration Successful!");
                $scope.reset();
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
            if(response.data.Response_status=="User not allowed"){
                errorMessage(Flash,"Your Account has been disabled!<br/>Please Contact Administrator.");
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
            else if(response.data.Response_status==2){
                $(".reset_password").hide();
                $(".user_register").hide();
                $(".secret_question").hide();
                $(".user_register1").hide();
                $(".user_login").show();
                $(".header_title").text('Login');
                successMessage(Flash,"Please check your Email<br/>to reset the password!");
                $scope.emailid="";
                $scope.forgotPasswordForm.$setPristine();
            }else if(response.data.Response_status=="User not allowed"){
                errorMessage(Flash,"Email ID not allowed!");
            }
        });
    };

    //Enter Key Login
    $scope.checkIfEnterKeyWasPressedForLogin = function($event){
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            if($scope.username!=null && $scope.password!=null)
            $scope.doLogin();
        }
    };

    //Check Secret Answer
    $scope.doSecretAnswerCheck=function(){
        //send secret answer
        requestHandler.postRequest("forgotPassword/",{"emailid":$scope.emailid,"secretanswer":$scope.secretAnswer}).then(function(response){
            if(response.data.Response_status==0){
                errorMessage(Flash,"Incorrect Secret Answer!");
            }
            else if(response.data.Response_status==1){
                $(".reset_password").hide();
                $(".user_register").hide();
                $(".secret_question").hide();
                $(".user_register1").hide();
                $(".user_login").show();
                $(".header_title").text('Login');
                //Lets show the secret question
                successMessage(Flash,"Please check your registered email!!");
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

// Name Field Validation
commonApp.directive('replace', function() {
    return {
        require: 'ngModel',
        scope: {
            regex: '@replace',
            with: '@with'
        },
        link: function(scope, element, attrs, model) {
            model.$parsers.push(function(val) {
                if (!val) { return; }
                var regex = new RegExp(scope.regex);
                var replaced = val.replace(regex, scope.with);
                if (replaced !== val) {
                    model.$setViewValue(replaced);
                    model.$render();
                }
                return replaced;
            });
        }
    };
});

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

//Check for Email Already Exists
commonApp.directive("emailexists", function ($q, $timeout,requestHandler) {

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
});

//Check For Email Validation
commonApp.directive('validateEmail', function() {
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

//Check For Url Validation
commonApp.directive('validateUrl', function() {
    var URL_REGEXP = /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elm, attrs, ngModel) {
            // only apply the validator if ngModel is present and Angular has added the email validator
            ngModel.$validators.validateUrl = function(modelValue) {
                return URL_REGEXP.test(modelValue);
            };

        }
    };
});