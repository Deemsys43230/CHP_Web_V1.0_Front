
//load admin sidebar html file
angular.module('adminApp').directive('sitemenu',['$location',function() {
  return {
    templateUrl:'../../app/commonDirectives/sidebar/sitemenu.html',
    restrict: 'E',
    link: function(){
        $('.sidebar-active li').click(function() {
            $('.sidebar-active li').removeClass('active');
            $(this).addClass('active');
        });
    },
    replace: true
  }
}]);

