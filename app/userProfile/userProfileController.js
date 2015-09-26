/**
 * Created by Deemsys on 9/21/2015.
 */
var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule']);


userApp.controller('UserProfileController',['$scope','requestHandler',function($scope,requestHandler) {

    $scope.doGetProfile=function(){
        requestHandler.getRequest("getUserId/","").then(function(response){

            $scope.userProfile=response.data.User_Profile;
            $scope.imageUrl=response.data.User_Profile.imageurl+"?decache="+Math.random();
            //Delete unwanted variables
            delete $scope.userProfile.createdon;
            delete $scope.userProfile.userid;
            delete $scope.userProfile.isProfileUpdated;
            delete $scope.userProfile.status;

            $('.image-editor').cropit({
                imageState: {
                    src: $scope.imageUrl+"?decache="+Math.random()
                }
            });
        });
    };

    $scope.refreshImage=function(){
        requestHandler.getRequest("getUserId/","").then(function(response){
            $scope.imageUrl=response.data.User_Profile.imageurl+"?decache="+Math.random();
            $('.image-editor').cropit({
                imageState: {
                    src: $scope.imageUrl+"?decache="+Math.random()
                }
            });
        });
    }


    $scope.doUpdateProfile= function () {
        $scope.userProfile.imageurl=$scope.getBase64Image(document.getElementById("profile-image-change"));
        $scope.userProfile.dob="31/05/2015";
        requestHandler.putRequest("updateProfile/",$scope.userProfile).then(function(){
            alert("success");
        });
    };

    $scope.doUpdateProfileImage=function(){
        var image=$('.image-editor').cropit('export');
        requestHandler.postRequest("uploadProfileImage/",{'imageurl':image}).then(function(response){
            $scope.refreshImage();
        },function(response){
            alert("Please Try again later!");
        });
    };

    $scope.doGetProfile();

}]);

// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);