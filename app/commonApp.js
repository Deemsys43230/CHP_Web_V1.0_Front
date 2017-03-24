var commonApp= angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ngCookies','feedbackServiceModule']);

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
            when('/home', {
                templateUrl: 'views/common/index.html',
                resolve: {
                        loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name:'commonApp',
                                files:[
                                    'plugin/vertical-carousel/vertical-carousel.js',
                                    'css/stepProgressBar.css',
                                    'app/commonController.js'
                                ]
                            })
                        }]

                },
                controller:'CommonController'
            }).
            when('/home/:id', {
                templateUrl: 'views/common/index.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'plugin/vertical-carousel/vertical-carousel.js',
                                'app/commonController.js'
                            ]
                        })
                    }]

                },
                controller:'CommonController'
            }).
            when('/how-it-work', {
                templateUrl: '../common/how-it-work.html'
            }).
            when('/aboutus', {
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
            when('/single-blog1', {
                templateUrl: '../common/single-blog1.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
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
                            name:'commonApp',
                            files:[
                                '../../app/blog/blogController.js'
                            ]
                        })
                    }]
                },
                controller:'BlogController'
            }).
            when('/contact', {
                templateUrl: '../common/contact.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/settings/basicInfoController.js',
                                'https://maps.googleapis.com/maps/api/js'
                            ]
                        })
                    }]
                },
                controller:'ContactUsDetailsController'
            }).
            when('/testimonials/:id', {
                templateUrl: '../common/testimonial.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../app/testimonial/testimonialController.js'
                            ]
                        })
                    }]
                },
                controller:'TestimonialUserController'
            }).
            when('/news', {
                templateUrl: '../common/news.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }]
                },
                controller:'NewsUserController'
            }).
            when('/news/:id', {
                templateUrl: '../common/news.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../plugin/vertical-carousel/vertical-carousel.js',
                                '../../app/latestNews/latestNewsController.js'
                            ]
                        })
                    }]
                },
                controller:'NewsUserController'
            }).
            when('/faq', {
                templateUrl: '../common/FAQ.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
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
                            name:'commonApp',
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
                            name:'commonApp',
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
                            name:'commonApp',
                            files:[
                                '../../app/privacyPolicy/privacyPolicyController.js'
                            ]
                        })
                    }]
                },
                controller:'PrivacyPolicyCommonController'
            }).
            when('/useful-videos', {
                templateUrl: '../common/useful-videos.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/usefulVideos/usefulVideosController.js'
                            ]
                        })
                    }]
                },
                controller:'UsefulVideosController'
            }).

             when('/disease-control-tips', {
                templateUrl: '../common/disease-control-tips.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/diseaseControlTips/diseaseControlTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'DiseaseControlTipsListController'
            }).
            when('/disease-control-tips-1', {
                templateUrl: '../common/disease-control-tips-1.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/diseaseControlTips/diseaseControlTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'diseaseControlTipsController'
            }).
            
            when('/disease-control-tips-2', {
                templateUrl: '../common/disease-control-tips-2.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/diseaseControlTips/diseaseControlTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'diseaseControlTipsController'
            }).
            when('/disease-control-tips-3', {
                templateUrl: '../common/disease-control-tips-3.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/diseaseControlTips/diseaseControlTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'diseaseControlTipsController'
            }).
            when('/disease-control-tips-4', {
                templateUrl: '../common/disease-control-tips-4.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/diseaseControlTips/diseaseControlTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'diseaseControlTipsController'
            }).

            when('/healthy-tips', {
                templateUrl: '../common/healthy-tips.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsListController'
            }).
            when('/healthy-tips-1', {
                templateUrl: '../common/healthy-tips-1.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-2', {
                templateUrl: '../common/healthy-tips-2.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-3', {
                templateUrl: '../common/healthy-tips-3.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-4', {
                templateUrl: '../common/healthy-tips-4.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-5', {
                templateUrl: '../common/healthy-tips-5.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).

            when('/healthy-tips-6', {
                templateUrl: '../common/healthy-tips-6.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-7', {
                templateUrl: '../common/healthy-tips-7.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-8', {
                templateUrl: '../common/healthy-tips-8.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-9', {
                templateUrl: '../common/healthy-tips-9.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-10', {
                templateUrl: '../common/healthy-tips-10.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-11', {
                templateUrl: '../common/healthy-tips-11.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-12', {
                templateUrl: '../common/healthy-tips-12.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-13', {
                templateUrl: '../common/healthy-tips-13.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-14', {
                templateUrl: '../common/healthy-tips-14.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            when('/healthy-tips-15', {
                templateUrl: '../common/healthy-tips-15.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                '../../app/healthyTips/healthyTipsController.js'
                            ]
                        })
                    }]
                },
                controller:'HealthyTipsController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);

//Internal Login Details
commonApp.controller('LoginController',['$scope','requestHandler','Flash','$window','$location','$element','FeedbackService','$timeout',function($scope,requestHandler,Flash,$window,$location,$element,FeedbackService,$timeout){
 $scope.hideValue=1;

    $scope.getSocialMediaDetails=function(){
        requestHandler.getRequest("contactus/","").then(function(response){
            $scope.commonDetails = response.data.Contactus[0];
            $scope.address=$scope.commonDetails.streetaddress+', '+$scope.commonDetails.state+', '+$scope.commonDetails.city+', '+$scope.commonDetails.zipcode;
            $scope.hideValue=0;
        });
    };

    $scope.init=function(){
        $scope.getSocialMediaDetails();
    };

     $scope.init();
    $scope.$on('$routeChangeStart', function(next, current) {
        $scope.activeClass={};
        var page = $location.url().substr(1);
        page=page.split('-');
        var currentPage=page[0];
        $scope.activeClass[currentPage]='active';
    });

    $scope.reset=function(){
        var loginForm = $element.find('form').eq(0).controller('form');
        loginForm.$setPristine();
        var forgotPasswordForm = $element.find('form').eq(1).controller('form');
        forgotPasswordForm.$setPristine();
        var registerForm = $element.find('form').eq(2).controller('form');
        registerForm.$setPristine();
        var registerForm1 = $element.find('form').eq(3).controller('form');
        registerForm1.$setPristine();
        var registerForm2 = $element.find('form').eq(4).controller('form');
        registerForm2.$setPristine();
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

                   if(response.data.Login.roleid==3){
                       if(response.data.User_Profile.isProfileUpdated==0){
                          $window.location.href=requestHandler.domainURL()+"views/user/#/profile";
                       }else{
                           $window.location.href=requestHandler.domainURL()+"views/user/#/dashboard";
                       }
                   }
                    else if(response.data.Login.roleid==2){
                       if(response.data.User_Profile.isProfileUpdated==0){
                           $window.location.href=requestHandler.domainURL()+"views/coach/#/profile";
                       }else{
                           $window.location.href=requestHandler.domainURL()+"views/coach/#/dashboard";
                       }
                   }
                    else if(response.data.Login.roleid==1){
                       $scope.reset();
                       $window.location.href=requestHandler.domainURL()+"views/superadmin/#/dashboard";
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

        requestHandler.postRequest("forgotPassword/",{"emailid":$scope.emailid,"secretanswer":$scope.secretanswer,"option":2}).then(function(response){
            if(response.data.Response_status==0){
                errorMessage(Flash,"Incorrect Secret Answer!");
            }
            else if(response.data.Response_status==1){
                $(".user_login").hide();
                $(".reset_password").hide();
                $(".user_register").hide();
                $(".secret_question").hide();
                $(".new_password_form").show();
                $(".header_title").text('Reset Password');
                $scope.secretanswer="";
                $scope.secretAnswerForm.$setPristine();
                console.log($scope.emailid);
                $rootScope.emailId=$scope.emailid;
                /* $window.location.href = "#password/";
                //Lets show the secret question
               successMessage(Flash,"Please check your registered email!!");*/

            }
        });
    };

    $scope.changePassword = function(){
         $scope.newpassword;
        requestHandler.postRequest("passwordUpdate/",{"emailid":$scope.emailid,"newpassword":$scope.newpassword}).then(function(response){
            if(response.data.Response_status==1){
                $(".reset_password").hide();
                $(".user_register").hide();
                $(".secret_question").hide();
                $(".user_register1").hide();
                $(".new_password_form").hide();
                $(".user_login").show();
                $(".header_title").text('Login');
                successMessage(Flash,"Reset Password Successfull! Please Login");
                $scope.newpassword="";
                $scope.confirmPassword="";
                $scope.newPasswordForm.$setPristine();
            }
        });


    };
$scope.isFeedback=false;
    $scope.addUserFeedback=function(){
        $scope.userFeedback= FeedbackService.addUserFeedback($scope.feedback);
        $scope.userFeedback.then(function(result){
           $scope.isFeedback=true;
            $scope.feedback={};
            $scope.feedbackForm.$setPristine();

        });

        $timeout(function () {
            $scope.isFeedback=false;
            $("#feedback_button").click();
        },2000);



    };



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
commonApp.directive("emailexists",['$q', '$timeout','requestHandler', function ($q, $timeout,requestHandler) {

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

commonApp.factory('myGoogleAnalytics', [
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