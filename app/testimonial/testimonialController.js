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
       // alert("hi");

        $scope.testimonials.imageurl = $('.image-editor').cropit('export');
       // alert($scope.testimonials.imageurl);

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

    $('.image-editor').cropit();

});

adminApp.controller('TestimonialEditController',function($scope,requestHandler,Flash,$location,$routeParams,$sce) {

    $scope.activeClass = {news:'active'};

    var original ="";
    //To display Latest News based on newsid
    $scope.doGetTestimonialsAdminByID=function(){
        $scope.isNew = false;
        $scope.title = "Edit Testimonial";

        requestHandler.getRequest("admin/getTestimonialListById/"+$routeParams.id,"").then(function(response){
            delete response.data.Testimonials.datetime;

            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.Testimonials.imageurl);
            //alert($scope.myImgSrc);
            $('.image-editor').cropit({
                imageState: {
                    src: response.data.Testimonials.imageurl
                }
            });
            //alert(response.data.Testimonials.imageurl);
            original=angular.copy(response.data.Testimonials);
            $scope.testimonials=response.data.Testimonials;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };


    //To update Latest News
    $scope.doUpdateTestimonials = function(){

       // alert("hi");
        $scope.testimonials.imageurl = $('.image-editor').cropit('export');
       // alert($scope.testimonials.imageurl );
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