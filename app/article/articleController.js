var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote','angularUtils.directives.dirPagination']);
adminApp.controller('ArticleController',['$scope','requestHandler','Flash','$location','siteMenuService',function($scope,requestHandler,Flash,$location,siteMenuService) {

    $scope.isNew = true;
    $scope.title = "Add Article";

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.id==5){
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

    // To display Articles admin view
    $scope.doGetArticlesByAdmin=function(){
        $scope.loaded=true;

        $scope.getArticlesParam= {
                        "limit": $scope.adminArticlePagination.itemsPerPage,
                        "offset":($scope.adminArticlePagination.pageNumber-1)*$scope.adminArticlePagination.itemsPerPage
                        };

        requestHandler.postRequest("admin/admingetarticles/", $scope.getArticlesParam).then(function(response){
            $scope.adminarticles=response.data;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //To add Articles
    $scope.doAddArticles=function(){

        //Convert the image to base 64

        if(!$scope.imageUpload){
            delete $scope.articles.imageurl;
        }
        else{
            $scope.articles.imageurl = document.getElementById("base64").value;
        }
        
        requestHandler.postRequest("admin/insertorupdatearticle/",$scope.articles).then(function(response){

                successMessage(Flash,"Successfully Added");
                $location.path("articles");
            }, function () {
                errorMessage(Flash, "Please try again later!")
            });
    };


    //To Enable or Disable Articles

    $scope.doEnableDisableArticles=function(id){
        requestHandler.postRequest("admin/enableordisablearticle/",{'id':id}).then(function(response){

            $scope.doGetArticlesByAdmin();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display Articles For admin view On Page Load
    $scope.init = function(){
        $scope.paginationLoad=false;

        $scope.adminArticlePagination={"pageNumber":1,"itemsPerPage":10};

    };

    $scope.$watch("adminArticlePagination.pageNumber",function(){
        $scope.doGetArticlesByAdmin();
    });

    //For image upload
    $('.image-editor').cropit();

}]);

adminApp.controller('ArticleEditController',['$scope','requestHandler','Flash','$location','$routeParams','$sce','siteMenuService',function($scope,requestHandler,Flash,$location,$routeParams,$sce,siteMenuService) {

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.id==5){
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
    //To display Latest Articles based on id
    $scope.doGetarticlesAdminByID=function(){
        $scope.isNew = false;
        $scope.title = "Edit Article";
        console.log($routeParams.id);

        requestHandler.postRequest("articledetail/",{'id':$routeParams.id}).then(function(response){
            
            delete response.data.article.subdate;

            //View the image in ng-src for view articles
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.article.imageurl+"?decache="+Math.random());
          
            //Set values to display data in edit article
            $scope.articles=response.data.article;
            
            $scope. originalArticle=angular.copy(response.data.article);
           /* // Change the url hostname to localhost
            $scope.testimonials.imageurl = requestHandler.convertUrl( $scope.testimonials.imageurl);
            $scope.testimonials.imageurl = "http://localhost"+$scope.testimonials.imageurl;*/


            // View the image in image cropit preview in edit articles
            $('.image-editor').cropit({
                imageState: {
                    src: $scope.articles.imageurl+"?decache="+Math.random()
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

    //To update Latest Articles
    $scope.doUpdateArticles = function(){

        if(!$scope.imageUpload){
            delete $scope.articles.imageurl;
        }
        else{
            $scope.articles.imageurl = $('.image-editor').cropit('export');

        $scope.convertImgToBase64($scope.articles.imageurl, function(base64Img){

            //Convert the image url to base64 when image is not edited
            $scope.articles.imageurl=base64Img;
          
        });
        }//Convert the image url to base64 when image is edited
          
            requestHandler.postRequest("admin/insertorupdatearticle/",$scope.articles).then(function(response){
                successMessage(Flash,"Successfully Updated");
                $location.path("articles");

            }, function () {
                errorMessage(Flash, "Please try again later!")
            });


    };

    $scope.isCleanArticle = function() {
        return angular.equals ($scope.originalArticle, $scope.articles);
    };
    //Display Edit Page with date On load
    $scope.doGetarticlesAdminByID();



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

commonApp.controller('ArticleUserController',['$scope','requestHandler','Flash','$sce','$routeParams',function($scope,requestHandler,Flash,$sce,$routeParams){

$scope.getArticlesParam= {
                        "limit":10,
                        "offset":0
                        };
    // To display Testimonials as user
    $scope.doGetArticlesByUser=function(){
        requestHandler.postRequest("user/usergetarticles/", $scope.getArticlesParam).then(function(response){
      $scope.usertestimoniallist=response.data.Testimonials;

            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.Testimonials[0].imageurl+"?decache="+Math.random());
            $scope.usertestimonialdetails = response.data.Testimonials[0];

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetArticleDetailsByUser= function (id) {
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
