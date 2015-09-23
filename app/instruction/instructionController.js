
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote']);

adminApp.controller('InstructionController',function($scope,requestHandler,Flash) {
    $scope.activeClass = {instruction:'active'};
    $scope.doGetInstruction=function(){
        requestHandler.getRequest("getLegalByName/Instructions/", "").then(function(response){
            $scope.instructions=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doUpdateInstructions=function(){

        requestHandler.putRequest("admin/updateLegal/",$scope.instructions).then(function(response){
            console.log(response);
            $scope.doGetInstruction();
            successMessage(Flash,"Successfully Updated");
        }, function () {
            errorMessage(Flash, "Please try again later!")

        });
    };

    // Display Instruction details On Page Load
    $scope.doGetInstruction();

});

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('InstructionUserController',function($scope,requestHandler,Flash) {

    $scope.doGetUserInstruction=function(){
        requestHandler.getRequest("getLegalByAll/Instructions/", "").then(function(response){
            $scope.userinstructions=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Instruction details On Page Load
    $scope.doGetUserInstruction();

});


// html filter (render text as html)
commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);