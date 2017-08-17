/**
 * Created by Deemsys on 9/21/2015.
 */
var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('CoachInvitationController',['$scope','requestHandler',"$filter",function($scope,requestHandler,$filter) {

	$scope.init=function(){
		alert("deal");
	};

}]);