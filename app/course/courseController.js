/**
 * Created by user on 14/12/15.
 */

var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash']);
userApp.controller('CourseController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    requestHandler.getRequest("user/getMyCourseList/","").then(function(response) {
        $scope.myCourseList = response.data.published_Course;
        console.log($scope.myCourseList);
    },function(){
        errorMessage(Flash,"Please try again later!")
    });

}]);
