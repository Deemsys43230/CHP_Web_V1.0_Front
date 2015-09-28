var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote','angularUtils.directives.dirPagination']);
adminApp.controller('TestimonialController',function($scope,requestHandler,Flash,$location) {

    $scope.isNew = true;
    $scope.title = "Add Testimonial";
    $scope.activeClass = {testimonial:'active'};

    // To display Testimonials admin view
    $scope.doGetTestimonialsByAdmin=function(){

        requestHandler.getRequest("admin/getTestimonialList/", "").then(function(response){
            $scope.admintestimonials=response.data.Testimonials;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //To add Testimonials
    $scope.doAddTestimonials=function(){

        //Convert the image to base 64
        $scope.testimonials.imageurl = $('.image-editor').cropit('export');


        requestHandler.postRequest("admin/insertorupdateTestimonial/",$scope.testimonials).then(function(response){

            successMessage(Flash,"Successfully Added");
            $location.path("testimonials");
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };


    //To Enable or Disable Testimonials

    $scope.doEnableDisableTestimonials=function(id){
        requestHandler.postRequest("admin/enableordisableTestimonial/",{'testimonialid':id}).then(function(response){

            $scope.doGetTestimonialsByAdmin();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display Testimonials For admin view On Page Load
    $scope.doGetTestimonialsByAdmin();

    //For image upload
    $('.image-editor').cropit();

});

adminApp.controller('TestimonialEditController',function($scope,requestHandler,Flash,$location,$routeParams,$sce) {

    $scope.activeClass = {testimonial:'active'};

    var original ="";
    //To display Latest News based on newsid
    $scope.doGetTestimonialsAdminByID=function(){
        $scope.isNew = false;
        $scope.title = "Edit Testimonial";

        requestHandler.getRequest("admin/getTestimonialListById/"+$routeParams.id,"").then(function(response){
            delete response.data.Testimonials.datetime;

            //View the image in ng-src for view testimonials
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.Testimonials.imageurl+"?decache="+Math.random());

            // View the image in image cropit preview in edit testimonials
            $('.image-editor').cropit({
                imageState: {
                    src: response.data.Testimonials.imageurl+"?decache="+Math.random()
                }
            });
            original=angular.copy(response.data.Testimonials.imageurl);
            $scope.testimonials=response.data.Testimonials;




        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };


    //To update Latest News
    $scope.doUpdateTestimonials = function(){
       // alert("hi");
        // convert the image to base64 while editing the image
       $scope.testimonials.imageurl = $('.image-editor').cropit('export');

        //alert($scope.testimonials.imageurl);

        requestHandler.putRequest("admin/insertorupdateTestimonial/",$scope.testimonials).then(function(response){
            successMessage(Flash,"Successfully Updated");
            $location.path("testimonials");

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };
    //Display Edit Page with date On load
    $scope.doGetTestimonialsAdminByID();

});

// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

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

// html filter (render text as html)

commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
