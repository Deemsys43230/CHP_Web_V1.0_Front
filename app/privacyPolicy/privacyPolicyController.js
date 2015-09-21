
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote']);
adminApp.controller('PrivacyPolicyController',function($scope,requestHandler,Flash) {

   // To display privacy policy details
    $scope.doGetPrivacyPolicy=function(){

        requestHandler.getRequest("getLegalByAll/Privacypolicy/", "").then(function(response){

            $scope.privacypolicydetails=response.data.Legal_Data;
console.log($scope.privacypolicydetails);
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doUpdatePrivacyPolicy=function(){

        requestHandler.putRequest("admin/updateLegal/",$scope.privacypolicydetails).then(function(response){
            console.log(response);
            $scope.doGetPrivacyPolicy();
            successMessage(Flash,"Successfully Updated");
        }, function () {
            errorMessage(Flash, "Please try again later!")

        });
    };

    // Display Privacy policy details On Page Load
    $scope.doGetPrivacyPolicy();
});