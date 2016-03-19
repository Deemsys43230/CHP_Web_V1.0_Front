
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote']);
adminApp.controller('PrivacyPolicyController',['$scope','requestHandler','Flash','$location','siteMenuService',function($scope,requestHandler,Flash,$location,siteMenuService) {

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

   // To display privacy policy details
    var original="";
    $scope.doGetPrivacyPolicy=function(){
        $scope.loaded=true;
        requestHandler.getRequest("getLegalByName/Privacypolicy/", "").then(function(response){

            original=angular.copy(response.data.Legal_Data);
            $scope.privacypolicydetails=response.data.Legal_Data;
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doUpdatePrivacyPolicy=function(){

        requestHandler.putRequest("admin/updateLegal/",$scope.privacypolicydetails).then(function(response){
            $scope.doGetPrivacyPolicy();
            successMessage(Flash,"Successfully Updated");
        }, function () {
            errorMessage(Flash, "Please try again later!")

        });
    };

   $scope.isClean=function(){
     return angular.equals(original, $scope.privacypolicydetails);
     };

    // Display Privacy policy details On Page Load
    $scope.doGetPrivacyPolicy();
}]);

adminApp.controller('PrivacyPolicyCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    // To display privacy policy details as user
    $scope.doGetUserPrivacyPolicy=function(){

        requestHandler.getRequest("getLegalByAll/Privacypolicy/", "").then(function(response){

            $scope.userprivacypolicydetails=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Privacy policy details On Page Load
    $scope.doGetUserPrivacyPolicy();
}]);



// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);
commonApp.controller('PrivacyPolicyCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    // To display privacy policy details as user
    $scope.doGetUserPrivacyPolicy=function(){

        requestHandler.getRequest("getLegalByAll/Privacypolicy/", "").then(function(response){

            $scope.userprivacypolicydetails=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Privacy policy details On Page Load
    $scope.doGetUserPrivacyPolicy();
}]);



// html filter (render text as html)
commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);
coachApp.controller('PrivacyPolicyCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    // To display privacy policy details as user
    $scope.doGetUserPrivacyPolicy=function(){

        requestHandler.getRequest("getLegalByAll/Privacypolicy/", "").then(function(response){

            $scope.userprivacypolicydetails=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Privacy policy details On Page Load
    $scope.doGetUserPrivacyPolicy();
}]);

// html filter (render text as html)
coachApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);
userApp.controller('PrivacyPolicyCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    // To display privacy policy details as user
    $scope.doGetUserPrivacyPolicy=function(){

        requestHandler.getRequest("getLegalByAll/Privacypolicy/", "").then(function(response){

            $scope.userprivacypolicydetails=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Privacy policy details On Page Load
    $scope.doGetUserPrivacyPolicy();
}]);

// html filter (render text as html)
userApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

