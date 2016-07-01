var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote','angularUtils.directives.dirPagination']);
adminApp.controller('TestimonialController',['$scope','requestHandler','Flash','$location','siteMenuService',function($scope,requestHandler,Flash,$location,siteMenuService) {

    $scope.isNew = true;
    $scope.title = "Add Testimonial";

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.id==3){
            value.active = "active";
        }
        else value.active = ""
    });

    $scope.imageAdded=false;

     $scope.fileNameChanged = function(element)
    {
        if(!$scope.imageAdded){
            if(element.files.length > 0){
                $scope.inputContainsFile = false;
                $scope.imageAdded=true;
            }
            else{
                $scope.inputContainsFile = true;
                $scope.imageAdded=false;
            }
        }
    };

    $scope.imageUpload=false;
    $scope.doUpdateImage=function(){
        $scope.imageUpload=true;
    };

    //summer note
    $scope.options = {
        height: 200
    };

    // To display Testimonials admin view
    $scope.doGetTestimonialsByAdmin=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getTestimonialList/", "").then(function(response){
            $scope.admintestimonials=response.data.Testimonials;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //To add Testimonials
    $scope.doAddTestimonials=function(){

        //Convert the image to base 64

        if(!$scope.imageUpload){
            delete $scope.testimonials.imageurl;
        }
        else{
            $scope.testimonials.imageurl = $('.image-editor').cropit('export');
        }
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
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetTestimonialsByAdmin();
    };

    //For image upload
    $('.image-editor').cropit();

}]);

adminApp.controller('TestimonialEditController',['$scope','requestHandler','Flash','$location','$routeParams','$sce','siteMenuService',function($scope,requestHandler,Flash,$location,$routeParams,$sce,siteMenuService) {

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.id==3){
            value.active = "active";
        }
        else value.active = ""
    });

    //summer note
    $scope.options = {
        height: 200
    };

    $scope.imageAdded=false;

    $scope.fileNameChanged = function(element)
    {
        if(!$scope.imageAdded){
            if(element.files.length > 0){
                $scope.inputContainsFile = false;
                $scope.imageAdded=true;
            }
            else{
                $scope.inputContainsFile = true;
                $scope.imageAdded=false;
            }
        }


    }

    var original ="";
    //To display Latest News based on newsid
    $scope.doGetTestimonialsAdminByID=function(){
        $scope.isNew = false;
        $scope.title = "Edit Testimonial";

        requestHandler.getRequest("admin/getTestimonialListById/"+$routeParams.id,"").then(function(response){
            delete response.data.Testimonials.datetime;

            //View the image in ng-src for view testimonials
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.Testimonials.imageurl+"?decache="+Math.random());

            //Set values to display data in edit testimonial
            $scope.testimonials=response.data.Testimonials;

            $scope. originalTestimonial=angular.copy(response.data.Testimonials);
           /* // Change the url hostname to localhost
            $scope.testimonials.imageurl = requestHandler.convertUrl( $scope.testimonials.imageurl);
            $scope.testimonials.imageurl = "http://localhost"+$scope.testimonials.imageurl;*/


            // View the image in image cropit preview in edit testimonials
            $('.image-editor').cropit({
                imageState: {
                    src: $scope.testimonials.imageurl+"?decache="+Math.random()
                }
            });


        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

// Function to convert image url to base64
    $scope.convertImgToBase64=function(url, callback, outputFormat){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this,0,0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/jpg');
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    };

    $scope.imageUpload=false;
    $scope.doUpdateImage=function(){
        $scope.imageUpload=true;
    };

    //To update Latest News
    $scope.doUpdateTestimonials = function(){

        if(!$scope.imageUpload){
            delete $scope.testimonials.imageurl;
        }
        else{
            $scope.testimonials.imageurl = $('.image-editor').cropit('export');
        $scope.convertImgToBase64($scope.testimonials.imageurl, function(base64Img){

            //Convert the image url to base64 when image is not edited
            $scope.testimonials.imageurl=base64Img;

        });
        }//Convert the image url to base64 when image is edited


            requestHandler.putRequest("admin/insertorupdateTestimonial/",$scope.testimonials).then(function(response){
                successMessage(Flash,"Successfully Updated");
                $location.path("testimonials");

            }, function () {
                errorMessage(Flash, "Please try again later!")
            });


    };

    $scope.isCleanTestimonial = function() {
        return angular.equals ($scope. originalTestimonial, $scope.testimonials);
    };
    //Display Edit Page with date On load
    $scope.doGetTestimonialsAdminByID();



}]);

// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

// Validation for file upload
adminApp.directive('validFile',function(){
    return {
        require:'ngModel',
        link:function(scope,el,attrs,ngModel){
            //change event is fired when file is selected
            el.bind('change',function(){
                scope.$apply(function(){
                    ngModel.$setViewValue(el.val());
                    ngModel.$render();
                })
            })
        }
    }
});

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('TestimonialUserController',['$scope','requestHandler','Flash','$sce','$routeParams',function($scope,requestHandler,Flash,$sce,$routeParams){

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
        requestHandler.getRequest("getTestimonialDetail/"+id, "").then(function(response){

            //View the image in ng-src for view testimonials
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.Testimonials.imageurl+"?decache="+Math.random());

            $scope.usertestimonialdetails=response.data.Testimonials

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        return false;

    };

    // To display the user Testimonial list on load
    $scope.doGetTestimonialsByUser();
    $scope.doGetTestimonialDetailsByUser($routeParams.id);


}]);

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
