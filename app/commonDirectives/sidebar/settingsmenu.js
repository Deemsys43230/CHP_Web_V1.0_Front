
//load admin sidebar html file
angular.module('adminApp').directive('settingsmenu',['$location',function() {
  return {
    templateUrl:"../../app/commonDirectives/sidebar/settingsmenu.html",
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

