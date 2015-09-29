var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('NewsUserController',function($scope,requestHandler,Flash){

    // To display Testimonials as user
    $scope.doGetNewsByUser=function(){


        requestHandler.getRequest("getLatestNewsByUser/", "").then(function(response){

            $scope.usernewslist=response.data.News;


        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };


    // To display the user Testimonial list on load
    $scope.doGetNewsByUser();


});

commonApp.controller('TestimonialUserController',function($scope,requestHandler,Flash,$sce,$routeParams){

    // To display Testimonials as user
    $scope.doGetTestimonialsByUser=function(){

        requestHandler.getRequest("getTestimonialListByUser/", "").then(function(response){


            $scope.usertestimoniallist=response.data.Testimonials;

            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.Testimonials[0].imageurl+"?decache="+Math.random());
            $scope.usertestimonialdetails = response.data.Testimonials[0];

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetTestimonialDetailsByUser= function (id) {
        //  alert("hi");
        requestHandler.getRequest("getTestimonialDetail/"+id, "").then(function(response){

            //View the image in ng-src for view testimonials
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.Testimonials.imageurl+"?decache="+Math.random());

            $scope.usertestimonialdetails=response.data.Testimonials

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    // To display the user Testimonial list on load
    $scope.doGetTestimonialsByUser();
    $scope.doGetTestimonialDetailsByUser($routeParams.id);


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
