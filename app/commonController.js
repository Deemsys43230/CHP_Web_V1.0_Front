var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('CommonController',['$scope','requestHandler','Flash','$routeParams','$sce','$rootScope','$timeout','$window',function($scope,requestHandler,Flash,$routeParams,$sce,$rootScope,$timeout,$window) {



    $scope.countFrom = 0;
    $window.emi=0;

    if($routeParams.id=="password"){
        $(function(){
            $(".popupContainer").addClass('left-36');
            $("#lean_overlay").fadeTo(1000);
            $("#modal").fadeIn(600);
            /*$(".modal_trigger").click();*/
            $(".reset_password").hide();
            $(".user_register").hide();
            $(".secret_question").hide();
            $(".user_register1").hide();
            $(".user_login").show();
            $(".new_password_form").hide();
            $(".header_title").text('Login');
        });
        successMessage(Flash,"Reset Password Successfull! Please Login");
    }


    if($routeParams.id== "logout"){

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
            newscarousel();
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
    /*$scope.init=function(){
        $scope.doGetNewsByUser();
        $scope.doGetTestimonialsByUser();
        $scope.doGetDashboardCount();
    };*/
    $scope.showForm=true;

    $scope.calculateEMI=function(){
        var inches = (12*$scope.feet)+(1*$scope.inches);
        $scope.emiValue=(($scope.weight*703)/(inches*inches)).toFixed(2);
        $window.emi=$scope.emiValue;
        $scope.showForm=false;
        callGraph();
    };

    $scope.returnToCalculate=function(){
        $scope.showForm=true;
    };

    $timeout(function(){
        $scope.doGetNewsByUser();
        $scope.doGetTestimonialsByUser();
        $scope.doGetDashboardCount();
    });

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
