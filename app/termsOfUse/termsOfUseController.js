
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote']);

adminApp.controller('TermsOfUseController',function($scope,requestHandler,Flash) {

    $scope.activeClass = {terms:'active'};

    var original="";
    $scope.doGetTermsOfUse=function(){
        requestHandler.getRequest("getLegalByName/Termsofuse/", "").then(function(response){

            original=angular.copy(response.data.Legal_Data);
            console.log(response.data.Legal_Data);
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

    $scope.isClean=function(){
        return angular.equals(original, $scope.terms);
    };

    // Display Terms of Use details On Page Load
    $scope.doGetTermsOfUse();

});

/*adminApp.controller('TermsOfUseAdminController',function($scope,requestHandler,Flash) {

    $scope.doGetAdminTermsOfUse=function(){
        requestHandler.getRequest("getLegalByAll/Termsofuse/", "").then(function(response){
            $scope.userterms=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Instruction details On Page Load
    $scope.doGetAdminTermsOfUse();

});

// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);*/

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


