var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash']);
userApp.controller('DemographyController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    var originalDemography="";
    var originalNutrition="";
    $scope.doGetDemographyandNutrition = function () {

        requestHandler.getRequest("user/getDemography/","").then(function(response) {
            //Copy Original
            originalDemography=angular.copy(response.data.Demography_Data[0]);
            $scope.demography = response.data.Demography_Data[0];


        });
        requestHandler.getRequest("user/getNutrition/","").then(function(response) {
            //Copy Original
            originalNutrition=angular.copy(response.data.Nutrition);
            $scope.nutrients = response.data.Nutrition;


        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doUpdateDemography= function () {
            $scope.demography.height = parseFloat($scope.demography.height);
            $scope.demography.weight = parseFloat($scope.demography.weight);
            $scope.demography.hip = parseFloat($scope.demography.hip);
            requestHandler.putRequest("user/insertorupdateDemography/",$scope.demography).then(function(response){
                $scope.doGetDemographyandNutrition();
                successMessage(Flash,"Successfully Updated");
                originalDemography=angular.copy($scope.demography);
            }, function () {
                errorMessage(Flash, "Please try again later!")
            });
    };

    $scope.doUpdateNutrition= function () {
        requestHandler.putRequest("user/updateNutrition/",$scope.nutrients).then(function(response){
            $scope.doGetDemographyandNutrition();
            successMessage(Flash,"Successfully Updated");
            originalNutrition=angular.copy($scope.nutrients);
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.isCleanDemography =function(){
            return angular.equals(originalDemography, $scope.demography);
    };

    $scope.isCleanNutrition =function(){
        return angular.equals(originalNutrition, $scope.nutrients);
    };

    $scope.doGetDemographyandNutrition();
}]);


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);