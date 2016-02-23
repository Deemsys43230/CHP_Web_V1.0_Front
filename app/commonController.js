var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('CommonController',['$scope','requestHandler','Flash','$routeParams','$sce','$rootScope',function($scope,requestHandler,Flash,$routeParams,$sce,$rootScope) {


    $scope.countFrom = 0;

    if($routeParams.session== "logout"){
       /* $rootScope.sessionValue = 1;*/


        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#section-modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#section-modal").hide();
            $("#lean_overlay").hide();
        });

        $(".relogin").click(function(){
            $("#section-modal").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#section-modal").hide();
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

    $scope.doGetDashboardCount=function(){
        requestHandler.getRequest("getStatistics/","").then(function(response){
            $scope.adminCountList=response.data.Stats;
            $scope.memberCount = $scope.adminCountList.membercount;
            $scope.exerciseCount = $scope.adminCountList.exercisecount;
            $scope.foodCount = $scope.adminCountList.foodcount;
            $scope.courseCount = $scope.adminCountList.publishedcourses;

        });
    };





    // To display the user Testimonial list on load
    $scope.doGetNewsByUser();
    $scope.doGetTestimonialsByUser();
    $scope.doGetDashboardCount();
}]);



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
