var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote','angularUtils.directives.dirPagination']);
adminApp.controller('ArticleController',['$scope','requestHandler','Flash','$location','siteMenuService',function($scope,requestHandler,Flash,$location,siteMenuService) {

    $scope.isNew = true;
    $scope.submitContent=false;
    $scope.articleBtnTxt="Add Article";
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

        $scope.submitContent=true;

        $scope.articleBtnTxt="Submitting...";
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

    $scope.init();

    //For image upload
    $('.image-editor').cropit();

}]);

adminApp.controller('ArticleEditController',['$scope','requestHandler','Flash','$location','$routeParams','$sce','siteMenuService','$timeout',function($scope,requestHandler,Flash,$location,$routeParams,$sce,siteMenuService,$timeout) {

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
        $scope.loaded=true;
        $scope.title = "Edit Article";

        $scope.submitContent=false;
       $scope.articleBtnTxt="Save Changes";
        console.log($routeParams.id);

        requestHandler.postRequest("articledetail/",{'id':$routeParams.id}).then(function(response){
            
            delete response.data.article.subdate;

            //View the image in ng-src for view articles
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.article.imageurl+"?decache="+Math.random());
          
            //Set values to display data in edit article
            $scope.articles=response.data.article;
            $timeout(function(){
               $scope.loaded=false;
            },5000);
            
            $scope.originalArticle=angular.copy(response.data.article);
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
            $scope.articles.imageurl = document.getElementById("base64").value;
        }
        
        requestHandler.postRequest("admin/insertorupdatearticle/",$scope.articles).then(function(response){

                successMessage(Flash,"Successfully Updated");
                $location.path("articles");
            }, function () {
                errorMessage(Flash, "Please try again later!")
        });
        $scope.submitContent=true;

        $scope.articleBtnTxt="Submitting...";

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

// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

// html filter (render text as html)

adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
