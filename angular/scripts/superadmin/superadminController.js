
var adminApp = angular.module('superadmin', ['ngRoute','oc.lazyLoad']);
 
//Define Routing for app

adminApp.config(['$routeProvider','$ocLazyLoadProvider',
  function($routeProvider,$ocLazyLoadProvider) {

      $ocLazyLoadProvider.config({
          debug:false,
          events:true
      });

    $routeProvider.
      when('/index', {
        templateUrl: 'views/dashboard.html'
      }).
      when('/messages',{
      	templateUrl: 'views/messages.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../css/inbox_menu.css',
                            '../../css/popup.css',
                            '../../js/popup.js'
                        ]
                    })
                }
            }
      }).
      when('/messages_detail',{
      	templateUrl: 'views/messages_detail.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../css/popup.css',
                            '../../js/popup.js'
                        ]
                    })
                }
            }
      }).
       when('/instructors', {
        templateUrl: 'views/instructors.html'
      }).
       when('/instructors_details', {
        templateUrl: 'views/instructors_details.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../js/bootstrap.min.js',
                            '../../css/popup.css',
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.css',
                            '../../plugin/date-picker/date-picker/lib/pikaday.css',
                            '../../js/popup.js',
                            '../../plugin/date-picker/date-picker/dist/jquery-timepicker.js',
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.js',
                            '../../plugin/date-picker/date-picker/dist/datepair.js'
                        ]
                    })
                }
            }
      }).
       when('/students', {
        templateUrl: 'views/students.html'
      }).
        when('/student_details', {
        templateUrl: 'views/student_details.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../js/bootstrap.min.js',
                            '../../css/popup.css',
                            '../../js/popup.js'
                        ]
                    })
                }
            }
      }).
       when('/affiliates', {
        templateUrl: 'views/affiliates.html'
      }).
       when('/affiliate_details', {
        templateUrl: 'views/affiliate_details.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../js/bootstrap.min.js',
                            '../../css/popup.css',
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.css',
                            '../../plugin/date-picker/date-picker/lib/pikaday.css',
                            '../../js/popup.js',
                            '../../plugin/date-picker/date-picker/dist/jquery-timepicker.js',
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.js',
                            '../../plugin/date-picker/date-picker/dist/datepair.js'
                        ]
                    })
                }
            }
      }).
       when('/courses', {
        templateUrl: 'views/courses.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
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
       when('/categories', {
        templateUrl: 'views/categories.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../css/popup.css',
                            '../../js/popup.js'
                        ]
                    })
                }
            }
      }).
       when('/sub_categories', {
        templateUrl: 'views/sub_categories.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../css/popup.css',
                            '../../js/popup.js'
                        ]
                    })
                }
            }
      }).
       when('/billing', {
        templateUrl: 'views/billing.html'
      }).
       when('/billing_course', {
        templateUrl: 'views/billing_course.html'
      }).
       when('/billing_enrollment', {
        templateUrl: 'views/billing_enrollment.html'
      }).
       when('/offer_zone', {
        templateUrl: 'views/offer_zone.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../js/bootstrap.min.js'
                        ]
                    })
                }
            }
      }).
       when('/offer_zone_create', {
        templateUrl: 'views/offer_zone_create.html',
            controller:'addOfferController',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.css',
                            '../../plugin/date-picker/date-picker/lib/pikaday.css',
                            '../../css/fileupload.css',
                            '../../plugin/date-picker/date-picker/dist/jquery-timepicker.js',
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.js',
                            '../../plugin/date-picker/date-picker/dist/datepair.js',
                            '../../angular/scripts/superadmin/pageRedirect.js'
                        ]
                    })
                }
            }
      }).
       when('/offer_zone_edit', {
        templateUrl: 'views/offer_zone_create.html',
            controller:'editOfferController',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.css',
                            '../../plugin/date-picker/date-picker/lib/pikaday.css',
                            '../../css/fileupload.css',
                            '../../plugin/date-picker/date-picker/dist/jquery-timepicker.js',
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.js',
                            '../../plugin/date-picker/date-picker/dist/datepair.js',
                            '../../angular/scripts/superadmin/pageRedirect.js'
                        ]
                    })
                }
            }
      }).
       when('/offer_zone_reuse', {
        templateUrl: 'views/offer_zone_create.html',
            controller:'reuseOfferController',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.css',
                            '../../plugin/date-picker/date-picker/lib/pikaday.css',
                            '../../css/fileupload.css',
                            '../../plugin/date-picker/date-picker/dist/jquery-timepicker.js',
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.js',
                            '../../plugin/date-picker/date-picker/dist/datepair.js',
                            '../../angular/scripts/superadmin/pageRedirect.js'
                        ]
                    })
                }
            }
      }).
       when('/news', {
        templateUrl: 'views/news.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../css/popup.css',
                            '../../js/popup.js'
                        ]
                    })
                }
            }
      }).
       when('/news_create', {
        templateUrl: 'views/news_create.html',
            controller:'addNews',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../plugin/text-editor/text-editor-bootstarp.js',
                            'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.5.0/summernote.css',
                            '../../plugin/text-editor/summernote.js',
                            '../../angular/scripts/superadmin/pageRedirect.js'
                        ]
                    })
                }
            }
      }).
       when('/news_edit', {
        templateUrl: 'views/news_create.html',
            controller:'editNews',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../plugin/text-editor/text-editor-bootstarp.js',
                            'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.5.0/summernote.css',
                            '../../plugin/text-editor/summernote.js',
                            '../../angular/scripts/superadmin/pageRedirect.js'
                        ]
                    })
                }
            }
      }).
       when('/blogs', {
        templateUrl: 'views/blogs.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../css/popup.css',
                            '../../js/popup.js'
                        ]
                    })
                }
            }
      }).
       when('/blog_create', {
        templateUrl: 'views/blog_create.html',
            controller:'addBlog',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../plugin/text-editor/text-editor-bootstarp.js',
                            'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.5.0/summernote.css',
                            '../../plugin/text-editor/summernote.js',
                            '../../angular/scripts/superadmin/pageRedirect.js'
                        ]
                    })
                }
            }
      }).
       when('/blog_edit', {
        templateUrl: 'views/blog_create.html',
            controller:'editBlog',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../plugin/text-editor/text-editor-bootstarp.js',
                            'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.5.0/summernote.css',
                            '../../plugin/text-editor/summernote.js',
                            '../../angular/scripts/superadmin/pageRedirect.js'
                        ]
                    })
                }
            }
      }).

       when('/reports', {
        templateUrl: 'views/reports.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../js/bootstrap.min.js',
                            'http://code.highcharts.com/highcharts.js',
                            'http://code.highcharts.com/modules/exporting.js',
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

       when('/refund', {
        templateUrl: 'views/refund.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superadmin',
                        files:[
                            '../../js/bootstrap.min.js',
                            '../../css/popup.css',
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.css',
                            '../../plugin/date-picker/date-picker/lib/pikaday.css',
                            '../../js/popup.js',
                            '../../plugin/date-picker/date-picker/dist/jquery-timepicker.js',
                            '../../plugin/date-picker/date-picker/lib/bootstrap-datepicker.js',
                            '../../plugin/date-picker/date-picker/dist/datepair.js'
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
                        name:'superadmin',
                        files:[
                            '../../css/popup.css',
                            '../../js/popup.js'
                        ]
                    })
                }
            }
      }).

      otherwise({
        redirectTo: '/index'
      });
}]);