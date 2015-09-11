
var adminApp = angular.module('affiliateApp', ['ngRoute','oc.lazyLoad']);
 
//Define Routing for app

adminApp.config(['$routeProvider','$ocLazyLoadProvider',
  function($routeProvider,$ocLazyLoadProvider) {

      $ocLazyLoadProvider.config({
          debug:false,
          events:true
      });

      $routeProvider.
          when('/index', {
              templateUrl: 'views/affiliatername_dashboard.html'
          }).
          when('/profile', {
              templateUrl: 'views/affiliatername_profile.html',
              resolve: {
                  loadMyFiles:function($ocLazyLoad) {
                      return $ocLazyLoad.load({
                          name:'affiliateApp',
                          files:[
                              '../../css/fileupload.css',
                              '../../plugin/date-picker/pikaday.css',
                              '../../css/popup.css',
                              '../../js/popup.js',
                              '../../js/fileupload.js',
                              '../../plugin/date-picker/pikaday.js'
                          ]
                      })
                  }
              }
          }).
          when('/messages', {
              templateUrl: 'views/affiliatername_messages.html',
              resolve: {
                  loadMyFiles:function($ocLazyLoad) {
                      return $ocLazyLoad.load({
                          name:'affiliateApp',
                          files:[
                              '../../css/inbox_menu.css',
                              '../../css/popup.css',
                              '../../js/popup.js',
                              '../../plugin/date-picker/pikaday.js'
                          ]
                      })
                  }
              }
          }).
          when('/messages_details', {
              templateUrl: 'views/affiliatername_messages_details.html'
          }).
          when('/my_instructors', {
              templateUrl: 'views/affiliatername_my_instructors.html',
              resolve: {
                  loadMyFiles:function($ocLazyLoad) {
                      return $ocLazyLoad.load({
                          name:'affiliateApp',
                          files:[
                              '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.css',
                              '../../plugin/date-picker/date-picker/lib/pikaday.css',
                              '../../plugin/date-picker/date-picker/dist/jquery-timepicker.js',
                              '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.js',
                              '../../plugin/date-picker/date-picker/dist/datepair.js'
                          ]
                      })
                  }
              }
          }).
          when('/reports', {
              templateUrl: 'views/affiliatername_reports.html'
          }).
          when('/news_events', {
              templateUrl: '../common/views/news_events.html'
          }).
          when('/news_detail', {
              templateUrl: '../common/views/news_detail.html',
              resolve: {
                  loadMyFiles:function($ocLazyLoad) {
                      return $ocLazyLoad.load({
                          name:'affiliateApp',
                          files:[
                              '../../js/jquery-social.min.js',
                              '../../js/jquery-socialmedia.js'
                          ]
                      })
                  }
              }
          }).
          when('/blog', {
              templateUrl: '../common/views/blog.html'
          }).
          when('/blog_post', {
              templateUrl: '../common/views/blog_post.html'
          }).
          when('/term_of_use', {
              templateUrl: '../common/views/term_of_use.html'
          }).
          when('/privacy_policy', {
              templateUrl: '../common/views/privacy_policy.html'
          }).
          when('/refund_policy', {
              templateUrl: '../common/views/refund_policy.html'
          }).
          when('/affiliate_login', {
              templateUrl: '../common/views/affiliate_login.html'
          }).
          when('/about_us', {
              templateUrl: '../common/views/about_us.html'
          }).
          when('/promocode', {
              templateUrl: '../common/views/promocode.html'
          }).
          when('/FAQ', {
              templateUrl: '../common/views/site-FAQ.html'
          }).
          when('/contacts', {
              templateUrl: '../common/views/contacts.html'
          }).
          otherwise({
              redirectTo: '/index'
          });
}]);