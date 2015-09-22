
//load admin sidebar html file
angular.module('adminApp').directive('sitemenu',function() {
  return {
      replace: true,
      restrict: 'E',
      templateUrl:'../../app/commonDirectives/sidebar/sitemenu.html'
  }
});