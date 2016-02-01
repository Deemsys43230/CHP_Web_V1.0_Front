
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote']);

adminApp.controller('TermsOfUseController',function($scope,requestHandler,Flash,$location,siteMenuService) {

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });

    //summer note
    $scope.options = {
        height: 250
    };

    var original="";
    $scope.doGetTermsOfUse=function(){
        $scope.loaded=true;
        requestHandler.getRequest("getLegalByName/Termsofuse/", "").then(function(response){

            original=angular.copy(response.data.Legal_Data);
            $scope.terms=response.data.Legal_Data;
            $scope.loaded=false;

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


adminApp.controller('TermsOfUseCommonController',function($scope,requestHandler,Flash) {

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
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('TermsOfUseCommonController',function($scope,requestHandler,Flash) {

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

var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

userApp.controller('TermsOfUseCommonController',function($scope,requestHandler,Flash) {

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
userApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

coachApp.controller('TermsOfUseCommonController',function($scope,requestHandler,Flash) {

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
coachApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);



