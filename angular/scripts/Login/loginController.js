//Module Creation
var loginApp = angular.module('indexApp', ['authModule','requestModule','ngRoute','oc.lazyLoad']);



// Compare Confirm Password
loginApp.directive('compareTo',function() {
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

//Own Directive for ngblur
loginApp.directive('ngBlur', ['$parse', function($parse) {
  return function(scope, element, attr) {
    var fn = $parse(attr['ngBlur']);
    element.bind('blur', function(event) {
      scope.$apply(function() {
        fn(scope, {$event:event});
      });
    });
  }
}]);

loginApp.config(['$routeProvider','$ocLazyLoadProvider',

    function($routeProvider,$ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug:false,
            events:true
        });

        $routeProvider.
            when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginController'
            }).
            when('/register', {
                templateUrl: 'views/register.html',
                controller: 'saveUserDetails'
            }).
            when('/create_account', {
                templateUrl: 'views/create_account.html',
                controller: 'userDetailController',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'indexApp',
                            files:[
                                '../../plugin/check_radio/skins/square/aero.css',
                                '../../css/check-radio.css',
                                '../../plugin/date-picker/pikaday.css',
                                '../../js/jquery-ui-1.8.12.min.js',
                                '../../js/jquery.validate.js',
                                '../../plugin/check_radio/jquery.icheck.js',
                                '../../plugin/date-picker/pikaday.js'
                            ]
                        })
                    }
                }

            }).
            when('/user-registration-success', {
                templateUrl: 'views/apply_send.html',
                controller: 'userApply',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'indexApp',
                            files:[
                                '../../angular/scripts/Login/pageRedirect.js'
                            ]
                        })
                    }
                }

            }).
            when('/offer_zone', {
                templateUrl: 'views/offer_zone.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'indexApp',
                            files:[
                                '../../js/js-countdown.js',
                                '../../js/popup.js',
                                '../../css/popup.css',
                                '../../js/jquery.shuffle.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/news_events', {
                templateUrl: 'views/news_events.html'
            }).
            when('/news_detail', {
                templateUrl: 'views/news_detail.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'indexApp',
                            files:[
                                '../../js/jquery-social.min.js',
                                '../../js/jquery-socialmedia.js'
                            ]
                        })
                    }
                }
            }).
            when('/blog', {
                templateUrl: 'views/blog.html'
            }).
            when('/blog_post', {
                templateUrl: 'views/blog_post.html'
            }).
            when('/affiliate_login', {
                templateUrl: 'views/affiliate_login.html'
            }).
            when('/affiliate_register', {
                templateUrl: 'views/affiliate_register.html'
            }).
            when('/affiliate_account_register', {
                templateUrl: 'views/affiliate_account_register.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'indexApp',
                            files:[
                                '../../plugin/check_radio/skins/square/aero.css',
                                '../../css/check-radio.css',
                                '../../plugin/date-picker/pikaday.css',
                                '../../js/jquery-ui-1.8.12.min.js',
                                '../../js/jquery.validate.js',
                                '../../plugin/check_radio/jquery.icheck.js',
                                '../../plugin/date-picker/pikaday.js'
                            ]
                        })
                    }
                }
            }).
            when('/affiliate-registration-success', {
                templateUrl: 'views/apply_send.html',
                controller: 'affiliateApply',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'indexApp',
                            files:[
                                '../../angular/scripts/Login/pageRedirect.js'
                            ]
                        })
                    }
                }

            }).
            when('/term_of_use', {
                templateUrl: 'views/term_of_use.html'
            }).
            when('/privacy_policy', {
                templateUrl: 'views/privacy_policy.html'
            }).
            when('/refund_policy', {
                templateUrl: 'views/refund_policy.html'
            }).
            when('/about_us', {
                templateUrl: 'views/about_us.html'
            }).
            when('/promocode', {
                templateUrl: 'views/promocode.html'
            }).
            when('/FAQ', {
                templateUrl: 'views/site-FAQ.html'
            }).
            when('/contacts', {
                templateUrl: 'views/contacts.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'indexApp',
                            files:[
                                'http://maps.googleapis.com/maps/api/js?sensor=false',
                                '../../js/mapmarker_func.jquery.js'
                            ]
                        })
                    }
                }

            }).
            when('/logout',{
              templateUrl:'views/login.html',
              controller:'logoutController'
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);


//Declare Login Page Controller
loginApp.controller('saveUserDetails', function($scope,$http,$location,userDetailService,requestHandler) {

$scope.isValid=false;

//Check for Email Already Exists
 $scope.checkEmail = function() {

 	if($scope.userDetailsForm.emailAddress!="")
 	{
    requestHandler.postRequest("isNewUser.json",$scope.userDetailsForm,0).then(function(results){
       if (!results.data.isNewUser) {
            $scope.emailAlreadyExist= "Email ID Already Exists!";
            $scope.isValid=false;
         }
         else{
             $scope.emailAlreadyExist= "";
             $scope.isValid=true;
         }
    });
	}

}

//Create New User
 $scope.creatUser=function(){

 	//Operation After clicked create account
     requestHandler.postRequest("saveUserDetails.json",$scope.userDetailsForm,0).then(function(results){
         userDetailService.setUserDetailsForm(results.data.userDetailsForm);
          $location.path('/create_account');
    });

}

});


//Account Detail Controller
loginApp.controller('userDetailController', function($scope,$http,$location,userDetailService,requestHandler) {

if(userDetailService.getUserDetailsForm()!=null)
{
	$scope.userDetailsForm=userDetailService.getUserDetailsForm();
}
else
{
	$location.path('/login');
}

//Enrich the Account Profile
 $scope.updateUserDetails=function(){
    requestHandler.postRequest("updateUserDetails.json",$scope.userDetailsForm,0).then(function(results){
          userDetailService.setUserDetailsForm(null);
          $location.path('/login');
    });

};

});


loginApp.controller("loginController",function($window,$scope,$location,authFactory,oAuthFactory,requestHandler,$cookieStore){

  $scope.login=function()
  {
    $scope.loginError="";
    console.log("Username: "+$scope.loginDetail.email+",Password:"+$scope.loginDetail.password);
   oAuthFactory.requestLogin($scope.loginDetail.email,$scope.loginDetail.password).success(function(results){
    alert(JSON.stringify(results));
    if(authFactory.isAuthenticated())
    {
        alert("isAuthenticated");
        $window.location.href = '../user/#/index';
    }
    else
    {
      $scope.loginError="Tokem Expired";
    }
  }).error(function(){
     $scope.loginError="Please check your email and password.";
     $location.path('/login');
  });
  };

});

//logoutController
loginApp.controller("logoutController",function($window,$scope,$location,authFactory,oAuthFactory,requestHandler,$cookieStore){
   $cookieStore.remove('userObj');
    $scope.login=function()
  {
    $scope.loginError="";
    console.log("Username: "+$scope.loginDetail.email+",Password:"+$scope.loginDetail.password);
   oAuthFactory.requestLogin($scope.loginDetail.email,$scope.loginDetail.password).success(function(results){
    if(authFactory.isAuthenticated())
    {
        $window.location.href = 'users/';
    }
    else
    {
      $scope.loginError="Tokem Expired";
    }
  }).error(function(){
     $scope.loginError="Please check your email and password.";
     $location.path('/logout');
  });
  };
  });
//Service
loginApp.service('userDetailService', function() {
  this.userDetailsForm = null;

  this.setUserDetailsForm = function(userDetailsForm) {
        this.userDetailsForm = userDetailsForm;
  };

  this.getUserDetailsForm = function() {
        return this.userDetailsForm;
  };

});