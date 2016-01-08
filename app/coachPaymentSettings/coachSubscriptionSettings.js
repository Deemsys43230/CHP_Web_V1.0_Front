/**
 * Created by user on 26-09-2015.
 */

var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule']);

coachApp.controller('CoachSubscriptionController',function($scope) {
//sidebar menu active class
    $scope.activeClass = {subscriptionPanel:'active'};

});