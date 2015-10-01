/**
 * Created by Deemsys on 9/21/2015.
 */
var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule']);


userApp.controller('UserProfileController',['$scope','requestHandler',function($scope,requestHandler) {


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


    $scope.doGetProfile=function(){
        requestHandler.getRequest("getUserId/","").then(function(response){


            $scope.userProfile=response.data.User_Profile;
            $scope.userProfile.imageurl=$scope.userProfile.imageurl.substring($scope.userProfile.imageurl.indexOf("/") + 14, $scope.userProfile.imageurl.length)
            $scope.userProfile.imageurl=$scope.userProfile.imageurl+"?decache="+Math.random();

            //Convert Integer to String
            if($scope.userProfile.gender)
            $scope.userProfile.gender=$scope.userProfile.gender.toString();

            //Delete unwanted variables
            delete $scope.userProfile.createdon;
            delete $scope.userProfile.userid;
            delete $scope.userProfile.isProfileUpdated;
            delete $scope.userProfile.status;

            //Copy Original
            $scope.orginalUserProfile=angular.copy($scope.userProfile);

            $('.image-editor').cropit({
                imageState: {
                    src: $scope.userProfile.imageurl+"?decache="+Math.random()
                }
            });
        });
    };

    $scope.refreshImage=function(){
        requestHandler.getRequest("getUserId/","").then(function(response){
            $scope.userProfile.imageurl=response.data.User_Profile.imageurl;
            $scope.userProfile.imageurl=$scope.userProfile.imageurl.substring($scope.userProfile.imageurl.indexOf("/") + 14, $scope.userProfile.imageurl.length)
            $scope.userProfile.imageurl=$scope.userProfile.imageurl+"?decache="+Math.random();

            $('.image-editor').cropit({
                imageState: {
                    src: $scope.userProfile.imageurl+"?decache="+Math.random()
                }
            });
        });
    }


    $scope.doUpdateProfile= function () {

        $scope.convertImgToBase64($scope.userProfile.imageurl, function(base64Img){

            //Convert Image to base64
            $scope.userProfile.imageurl=base64Img;

            requestHandler.putRequest("updateProfile/",$scope.userProfile).then(function(){
                //Copy Orginal
                $scope.orginalUserProfile=angular.copy($scope.userProfile);
                alert("success");
            });
        });


    };


    $scope.doUpdateProfileImage=function(){
        //Convert the image to base 64
        var image = $('.image-editor').cropit('export');

        requestHandler.postRequest("uploadProfileImage/",{'imageurl':image}).then(function(response){
            $scope.refreshImage();
        },function(response){
            alert("Please Try again later!");
        });
    };

    $scope.doGetProfile();

    //To Enable the update button if changes occur.
    $scope.isClean = function() {
        console.log($scope.orginalUserProfile);
        console.log($scope.userProfile);
        return angular.equals ($scope.orginalUserProfile, $scope.userProfile);
    }

    //Change Password
    $scope.doChangePassword=function(){
        requestHandler.postRequest("changePassword/",{'oldPassword':$scope.oldPassword,'newPassword':$scope.newPassword}).then(function(response){
            $scope.refreshImage();
        },function(response){
            alert("Please Try again later!");
        });
    };

}]);

// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);