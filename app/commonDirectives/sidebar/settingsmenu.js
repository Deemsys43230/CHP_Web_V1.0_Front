//load admin sidebar html file

var settingsmenu = angular.module('adminApp',[]);

settingsmenu.directive("settingsmenu",function() {
  return {
      restrict: 'E',
      templateUrl:"../../app/commonDirectives/sidebar/settingsmenu.html"
  };
});

