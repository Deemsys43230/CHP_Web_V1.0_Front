/**
 * Created by Deemsys on 11/4/17.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote','angularUtils.directives.dirPagination']);
adminApp.controller('DiseaseControlController',['$scope','requestHandler','Flash','$location','siteMenuService',function($scope,requestHandler,Flash,$location,siteMenuService) {

    $scope.isNew=true;

    $scope.title='Add CDC';
    $scope.siteMenuList = siteMenuService;

    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
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

    //summer note
    $scope.options = {
       height: 250
    };


  $scope.imageUpload=false;
    $scope.doUpdateImage=function(){
        $scope.imageUpload=true;
    };
    // To display DiseaseControl Tips admin view
    $scope.doGetHealthyListByAdmin=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getHealthyLivingList/", "").then(function(response){
            $scope.adminhealthytips=response.data.healthyliving;
           $scope.loaded=false;
            $scope.paginationLoad=true;
           },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };
 //To Enable or Disable HealthyTips

    $scope.doEnableDisableHealthyTips=function(sid){
       requestHandler.postRequest("admin/enableordisableHealthyLiving/",{"syndicateid":sid}).then(function(response){
           $scope.doGetHealthyListByAdmin();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //To add HealthyTips
    $scope.doAddHealthyTips=function(){

        //Convert the image to base 64
        var thumbnail_image_base64=document.getElementById("thumbnail_image_base64").value;
        var banner_image_base64=document.getElementById("banner_image_base64").value;

        if(banner_image_base64==""){
            delete $scope.healthyliving.imageurl;
        }
        else{
            $scope.healthyliving.imageurl = banner_image_base64;            
        }

        //For Thumbnail Image
        if(thumbnail_image_base64==""){
            delete $scope.healthyliving.thumbnailurl;
        }
        else{
            $scope.healthyliving.thumbnailurl = thumbnail_image_base64;            
        }


        requestHandler.postRequest("admin/insertorupdateHealthyLiving/",$scope.healthyliving).then(function(response){
            successMessage(Flash,"Successfully Added");
            $location.path("cdc-list");
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.deleteHealthyTips=function(sid){
     var confirmDelete=confirm("Are you sure you want to delete the Content?");
        if(confirmDelete==true){
            requestHandler.postRequest("admin/deleteHealthyLiving/",{"syndicateid":sid}).then(function(response){
                $scope.doGetHealthyListByAdmin();
                    successMessage(Flash,"Successfully Deleted");
              },function(){
                errorMessage(Flash,"Please try again later!")
            });
        }

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

    $scope.init = function(){

        $scope.paginationLoad=false;
       $scope.doGetHealthyListByAdmin();

    };
    //For image upload
    $('.image-editor').cropit();



}]);


adminApp.controller('DiseaseControlEditController',['$scope','requestHandler','Flash','$location','$routeParams','$sce','siteMenuService',function($scope,requestHandler,Flash,$location,$routeParams,$sce,siteMenuService) {

    $scope.isNew=false;
    $scope.siteMenuList = siteMenuService;

    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });
    $scope.title='Edit CDC';

    //summer note
    $scope.options = {
        height: 250
    };
   var original ="";

    //To display HealthyTips based on id
    $scope.doGetHealthyTipsAdminByID=function(){
       requestHandler.getRequest("admin/getHealthyLivingListById/"+$routeParams.sid,"").then(function(response){
          //View the image in ng-src for view page
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.healthyliving.imageurl+"?decache="+Math.random());

            //Set values to display data in edit healthytips
            $scope.healthyliving=response.data.healthyliving;
                // View the image in image cropit preview in edit page
            $('.image-editor').cropit({
                imageState: {
                    src: $scope.healthyliving.imageurl+"?decache="+Math.random()
                }
            });


        },function(){
            errorMessage(Flash,"Please try again later!")
        });
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


    //To update healthy tips
    $scope.doUpdateHealthyTips = function(){

        if(!$scope.imageUpload){
            delete $scope.healthyliving.imageurl;
        }
        else{
            $scope.healthyliving.imageurl = $('.image-editor').cropit('export');
            $scope.convertImgToBase64($scope.healthyliving.imageurl, function(base64Img){

                //Convert the image url to base64 when image is not edited
                $scope.healthyliving.imageurl=base64Img;

                console.log(base64Img);
            });
        }//Convert the image url to base64 when image is edited


        requestHandler.putRequest("admin/insertorupdateHealthyLiving/",$scope.healthyliving).then(function(response){
            successMessage(Flash,"Successfully Updated");
            $location.path("cdc-list");

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });


    };
    $scope.doGetHealthyTipsAdminByID();

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


adminApp.directive('calendar', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                dateFormat: 'dd/mm/yy',
                  maxDate: new Date() , //Hiding Future Date
                onSelect: function (dateText) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(dateText);
                    });
                }
            });
        }
    };
});
