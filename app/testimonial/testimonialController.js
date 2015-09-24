
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote']);

adminApp.controller('testimonialController',function($scope) {
    $scope.activeClass = {testimonial:'active'};
});


