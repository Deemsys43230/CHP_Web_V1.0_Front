
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote']);

adminApp.controller('TermsOfUseController',function($scope,requestHandler,Flash) {

    $scope.activeClass = {terms:'active'};

    $scope.doGetTermsOfUse=function(){
        requestHandler.getRequest("getLegalByName/Termsofuse/", "").then(function(response){

            $scope.terms=response.data.Legal_Data;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doUpdateTermsOfUse=function(){

        requestHandler.putRequest("admin/updateLegal/",$scope.terms).then(function(response){
            console.log(response);
            $scope.doGetTermsOfUse();
            successMessage(Flash,"Successfully Updated");
        }, function () {
            errorMessage(Flash, "Please try again later!")

        });
    };

    // Display Terms of Use details On Page Load
    $scope.doGetTermsOfUse();

});

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('TermsOfUseUserController',function($scope,requestHandler,Flash) {

    $scope.doGetUserTermsOfUse=function(){
        requestHandler.getRequest("getLegalByAll/Termsofuse/", "").then(function(response){
            $scope.userterms=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Instruction details On Page Load
    $scope.doGetUserTermsOfUse();

});


// html filter (render text as html)
commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);