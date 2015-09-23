
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote']);

adminApp.controller('InstructionController',function($scope,requestHandler,Flash) {
    $scope.activeClass = {instruction:'active'};
    $scope.doGetInstruction=function(){
        requestHandler.getRequest("getLegalByAll/Instructions/", "").then(function(response){
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