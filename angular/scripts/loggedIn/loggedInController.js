//Module Creation
var loggedinApp = angular.module('logApp', ['ngCookies','ngRoute','oc.lazyLoad']);


loggedinApp.config(['$routeProvider','$ocLazyLoadProvider',

    function($routeProvider,$ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug:false,
            events:true
        });

        $routeProvider.
            when('/index', {
                templateUrl: 'views/course_category.html',
                controller:'logoutController',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/menu/css/component.css',
                                '../../plugin/menu/js/modernizr.custom.js',
                                '../../plugin/menu/js/jquery.dlmenu.js',
                                '../../js/jquery-mouse-overlay.js'
                            ]
                        })
                    }
                }

            }).
            when('/course_category', {
                templateUrl: 'views/course_category.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../plugin/menu/css/component.css',
                                '../../plugin/menu/js/modernizr.custom.js',
                                '../../plugin/menu/js/jquery.dlmenu.js',
                                '../../js/jquery-mouse-overlay.js'
                            ]
                        })
                    }
                }
            }).
            when('/offer_zone', {
                templateUrl: '../common/views/offer_zone.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
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
                templateUrl: '../common/views/news_events.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/news_detail', {
                templateUrl: '../common/views/news_detail.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../js/jquery-social.min.js',
                                '../../js/jquery-socialmedia.js'
                            ]
                        })
                    }
                }
            }).
            when('/blog', {
                templateUrl: '../common/views/blog.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/blog_post', {
                templateUrl: '../common/views/blog_post.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/profile_edit', {
                templateUrl: 'views/profile_edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js'
                            ]
                        })
                    }
                }
            }).
            when('/primary_info_edit', {
                templateUrl: 'views/primary_info_edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js'
                            ]
                        })
                    }
                }
            }).
            when('/account_edit', {
                templateUrl: 'views/account_edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js'
                            ]
                        })
                    }
                }
            }).
            when('/payment_edit', {
                templateUrl: 'views/payment_edit.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js'
                            ]
                        })
                    }
                }
            }).
            when('/profile_view', {
                templateUrl: 'views/profile_view.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/my_courses', {
                templateUrl: 'views/my_courses.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../js/jquery-mouse-overlay.js'
                            ]
                        })
                    }
                }
            }).
            when('/new_course', {
                templateUrl: 'views/new_course.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/popup-delay.css',
                                '../../css/input-tag.css',
                                '../../css/video_preview.css',
                                '../../css/sidebar.css',
                                '../../plugin/video/jquery_video_upload.js',
                                '../../plugin/video/build/mediaelementplayer.min.css',
                                '../../plugin/video/build/mediaelement-and-player.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/add_section', {
                templateUrl: 'views/add_section.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css',
                                '../../css/popup.css',
                                '../../css/table-sort.css',
                                '../../js/popup.js',
                                '../../js/jquery-sortable-table.js'
                            ]
                        })
                    }
                }
            }).
            when('/add_lecture', {
                templateUrl: 'views/add_lecture.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css',
                                '../../css/popup.css',
                                '../../css/table-sort.css',
                                '../../js/popup.js',
                                '../../js/jquery-sortable-table.js'
                            ]
                        })
                    }
                }
            }).
            when('/add_new_lecture', {
                templateUrl: 'views/add_lecture_new.html',
                controller: 'addNewLecture',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../angular/scripts/loggedIn/pageRedirect.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css',
                                '../../plugin/text-editor/text-editor-bootstarp.js',
                                'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.5.0/summernote.css',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/video/jquery_video_upload.js'
                            ]
                        })
                    }
                }
            }).
            when('/edit_lecture', {
                templateUrl: 'views/add_lecture_new.html',
                controller: 'editLecture',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../angular/scripts/loggedIn/pageRedirect.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css',
                                '../../plugin/text-editor/text-editor-bootstarp.js',
                                'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.5.0/summernote.css',
                                '../../plugin/text-editor/summernote.js',
                                '../../plugin/video/jquery_video_upload.js'
                            ]
                        })
                    }
                }
            }).
            when('/view-quiz', {
                templateUrl: 'views/view-quiz.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css',
                                '../../css/popup.css',
                                '../../js/popup.js'
                            ]
                        })
                    }
                }
            }).
            when('/question-list', {
                templateUrl: 'views/question-list.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css',
                                '../../css/popup.css',
                                '../../css/table-sort.css',
                                '../../js/popup.js',
                                '../../js/jquery-sortable-table.js'
                            ]
                        })
                    }
                }
            }).
            when('/add_question', {
                templateUrl: 'views/add_question.html',
                controller: 'addQuestion',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../angular/scripts/loggedIn/pageRedirect.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css',
                                '../../css/check-radio.css'
                            ]
                        })
                    }
                }
            }).
            when('/edit_question', {
                templateUrl: 'views/add_question.html',
                controller: 'editQuestion',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../angular/scripts/loggedIn/pageRedirect.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css',
                                '../../css/check-radio.css'
                            ]
                        })
                    }
                }
            }).
            when('/quiz_preview', {
                templateUrl: 'views/quiz_preview.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css'
                            ]
                        })
                    }
                }
            }).
            when('/add_promocode', {
                templateUrl: 'views/add_promocode.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css',
                                '../../css/popup.css',
                                '../../js/popup.js',
                                '../../css/jquery.Checkbox.css',
                                '../../plugin/date-picker/pikaday.css',
                                '../../plugin/date-picker/pikaday.js'
                            ]
                        })
                    }
                }
            }).
            when('/preview', {
                templateUrl: 'views/preview.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css',
                                '../../css/popup.css',
                                '../../js/popup.js',
                                '../../css/single_course.css'
                            ]
                        })
                    }
                }
            }).
            when('/preview_text', {
                templateUrl: 'views/preview_text.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css'
                            ]
                        })
                    }
                }
            }).
            when('/preview-video', {
                templateUrl: 'views/preview-video.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css'
                            ]
                        })
                    }
                }
            }).
            when('/preview-audio', {
                templateUrl: 'views/preview-audio.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js',
                                '../../css/sidebar.css'
                            ]
                        })
                    }
                }
            }).
            when('/help', {
                templateUrl: 'views/help.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/fileupload.css',
                                '../../js/fileupload.js'
                            ]
                        })
                    }
                }
            }).
            when('/my_wishlist', {
                templateUrl: 'views/my_wishlist.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../js/jquery-mouse-overlay.js'
                            ]
                        })
                    }
                }
            }).
            when('/my_students', {
                templateUrl: 'views/my_students.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/my_favourites', {
                templateUrl: 'views/my_favourites.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../js/jquery-mouse-overlay.js',
                                '../../css/popup.css',
                                '../../js/popup.js'
                            ]
                        })
                    }
                }
            }).
            when('/my_messages', {
                templateUrl: 'views/my_messages.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
                                '../../css/popup.css',
                                '../../js/popup.js',
                                '../../css/inbox_menu.css'
                            ]
                        })
                    }
                }
            }).
            when('/my_messages_details', {
                templateUrl: 'views/my_messages_details.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/my_purchase_history', {
                templateUrl: 'views/my_purchase_history.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js'
                            ]
                        })
                    }
                }
            }).
            when('/my_payment', {
                templateUrl: 'views/my_payment.html',
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'logApp',
                            files:[
                                '../../js/bootstrap.min.js',
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
                redirectTo: '/index',
                controller:'logoutController'
            });
    }]);

// Logut Controller
loggedinApp.controller('logoutController',['$window','$scope','$cookieStore','$location',function($window,$scope,$cookieStore,$location){

   /* if($cookieStore.get("userObj") == undefined){
          $window.location.href = '../common/';
    }*/
     $scope.error1="check";
     $scope.logout=function(){
     $cookieStore.remove('userObj');
     $window.location.href = '../#/logout';
     };
}]);
