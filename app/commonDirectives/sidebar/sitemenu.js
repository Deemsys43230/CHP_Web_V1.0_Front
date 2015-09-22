//load admin sidebar html file

var sitemenu = angular.module('adminApp',[]);

sitemenu.directive("sitemenu",function() {
  return {
      restrict: 'E',
      templateUrl:"../../app/commonDirectives/sidebar/sitemenu.html"
  };
});