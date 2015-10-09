/**
 * Created by Deemsys on 9/21/2015.
 */
var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);


userApp.controller('UserProfileController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {


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
            if($scope.userProfile.gender == null) {
                $scope.userProfile.gender = "1";
            }

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
                successMessage(Flash,"Successfully Updated");
                //Copy Orginal
                $scope.orginalUserProfile=angular.copy($scope.userProfile);

            });
        });


    };


    $scope.doUpdateProfileImage=function(){
        //Convert the image to base 64
        var image = $('.image-editor').cropit('export');

        requestHandler.postRequest("uploadProfileImage/",{'imageurl':image}).then(function(response){
            $scope.refreshImage();
        },function(response){
            errorMessage(Flash,"Please Try again later!");
        });
    };

    $scope.doGetProfile();

    //To Enable the update button if changes occur.
    $scope.isClean = function() {
        return angular.equals ($scope.orginalUserProfile, $scope.userProfile);
    }

    //Change Password
    $scope.doChangePassword=function(){
        requestHandler.postRequest("changePassword/",$scope.changePassword).then(function(response){
            if(response.data.Response_status==0){
                $scope.doGetProfile();
                errorMessage(Flash,"Incorrect&nbsp;current&nbsp;password");
                $scope.changePasswordForm.$setPristine();
            }
            else if(response.data.Response_status==1) {
                $scope.doGetProfile();
                successMessage(Flash, "Password&nbsp;changed&nbsp;successfully");
                $scope.changePasswordForm.$setPristine();
            }
        },function(response){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.reset=function(){
        $scope.changePassword={};
        $scope.changePasswordForm.$setPristine();
    };


}]);


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

userApp.directive('compareTo',function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

/*
userApp.directive('numbersOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                // this next if is necessary for when using ng-required on your input.
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});*/
