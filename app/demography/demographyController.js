var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash']);
userApp.controller('DemographyController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    var originalDemography="";
    $scope.doGetProfile = function () {
        requestHandler.getRequest("getUserId/", "").then(function (response) {
            $scope.userProfile = response.data.User_Profile;
            $scope.userProfile.imageurl = $scope.userProfile.imageurl.substring($scope.userProfile.imageurl.indexOf("/") + 14, $scope.userProfile.imageurl.length)
            $scope.userProfile.imageurl = $scope.userProfile.imageurl + "?decache=" + Math.random();
        });

        requestHandler.getRequest("user/getDemography/","").then(function(response) {
            //Copy Original
            originalDemography=angular.copy(response.data.Demography_Data[0]);
            $scope.demography = response.data.Demography_Data[0];


        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doUpdateDemography= function () {
            requestHandler.putRequest("user/insertorupdateDemography/",$scope.demography).then(function(response){
                successMessage(Flash,"Successfully Updated");
                originalDemography=angular.copy($scope.demography);
            }, function () {
                errorMessage(Flash, "Please try again later!")
            });
    };

    $scope.isClean =function(){
        console.log(originalDemography);
        console.log($scope.demography);
            return angular.equals(originalDemography, $scope.demography);
    };

    $scope.doGetProfile();
}]);


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);