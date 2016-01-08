var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule']);
userApp.controller('ThanksPageController',function($scope,requestHandler,$location,$window) {
    $scope.urlPage="http://localhost/cyber/views/user/#/coach";

    $(document).ready(function() {
        var delay = 10 ;
        var url = $scope.urlPage;
        function countdown() {
            setTimeout(countdown, 1000) ;
            $('#countmesg').html("Redirecting in "  + delay  + " seconds.");
            delay --;
            if (delay < 0 ) {
                window.location = url ;
                delay = 0 ;
            }
        }
        countdown() ;
    });
});