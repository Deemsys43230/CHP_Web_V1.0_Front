
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote']);

adminApp.controller('InstructionController',['$scope','requestHandler','Flash','$location','siteMenuService',function($scope,requestHandler,Flash,$location,siteMenuService) {

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });

    var original="";

    //summer note
    $scope.options = {
        height: 250
    };

    $scope.doGetInstruction=function(){
        $scope.loaded=true;
        requestHandler.getRequest("getLegalByName/Aboutus/", "").then(function(response){
            original=angular.copy(response.data.Legal_Data);
            $scope.instructions=response.data.Legal_Data;
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doUpdateInstructions=function(){

        requestHandler.putRequest("admin/updateLegal/",$scope.instructions).then(function(response){
            $scope.doGetInstruction();
            successMessage(Flash,"Successfully Updated");
        }, function () {
            errorMessage(Flash, "Please try again later!")

        });
    };

    $scope.isClean=function(){

        return angular.equals(original, $scope.instructions);
    };
    // Display Instruction details On Page Load
    $scope.doGetInstruction();

}]);

adminApp.controller('InstructionCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    $scope.doGetUserInstruction=function(){
        requestHandler.getRequest("getLegalByAll/Aboutus/", "").then(function(response){
            $scope.userinstructions=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Instruction details On Page Load
    $scope.doGetUserInstruction();

}]);

// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('InstructionCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    $scope.doGetUserInstruction=function(){
        requestHandler.getRequest("getLegalByAll/Aboutus/", "").then(function(response){
            $scope.userinstructions=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Instruction details On Page Load
    $scope.doGetUserInstruction();

}]);

// html filter (render text as html)
commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

userApp.controller('InstructionCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    $scope.doGetUserInstruction=function(){
        requestHandler.getRequest("getLegalByAll/Aboutus/", "").then(function(response){
            $scope.userinstructions=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Instruction details On Page Load
    $scope.doGetUserInstruction();

}]);

// html filter (render text as html)
userApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

coachApp.controller('InstructionCommonController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    $scope.doGetUserInstruction=function(){
        requestHandler.getRequest("getLegalByAll/Aboutus/", "").then(function(response){
            $scope.userinstructions=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Instruction details On Page Load
    $scope.doGetUserInstruction();

}]);

// html filter (render text as html)
coachApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);