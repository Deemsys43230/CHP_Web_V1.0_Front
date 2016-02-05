var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','countTo']);

commonApp.controller('CommonController',function($scope,requestHandler,Flash,$routeParams,$sce,$rootScope) {

    $scope.countTo = 10000;
    $scope.countFrom=5;

    if($routeParams.session== "logout"){
        $rootScope.sessionValue = 1;

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal").fadeIn(600);
            $(".user_login").show();
        });

        $(".modal_close").click(function(){
            $(".user_login").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".user_login").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });
    }
    // To display Testimonials as user
    $scope.doGetNewsByUser = function () {
        requestHandler.getRequest("getLatestNewsByUser/", "").then(function (response) {
            $scope.usernewslist = response.data.News;

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    // To display Testimonials as user
    $scope.doGetTestimonialsByUser=function(){
        requestHandler.getRequest("getTestimonialListByUser/", "").then(function(response){
            $scope.usertestimoniallist=response.data.Testimonials;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };



    // To display the user Testimonial list on load
    $scope.doGetNewsByUser();
    $scope.doGetTestimonialsByUser();
});



// render image to view in list
commonApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);


commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

commonApp.filter('toSec', function() {

    return function(input) {

        dateArgs = input.match(/\d{2,4}/g),
            year = dateArgs[2],
            month = parseInt(dateArgs[1]) - 1,
            day = dateArgs[0],
            hour = dateArgs[3],
            minutes = dateArgs[4];

        var result = new Date(year, month, day, hour, minutes).getTime();

        return result || '';
    };
});
