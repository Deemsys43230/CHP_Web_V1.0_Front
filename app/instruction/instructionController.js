
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote']);

adminApp.controller('InstructionController',function($scope,requestHandler,Flash) {
    $scope.activeClass = {instruction:'active'};

    var original="";

    //summer note
    $scope.options = {
        height: 250
    };

    $scope.doGetInstruction=function(){
        $scope.loaded=true;
        requestHandler.getRequest("getLegalByName/Instructions/", "").then(function(response){
            original=angular.copy(response.data.Legal_Data);
            $scope.instructions=response.data.Legal_Data;
            $scope.loaded=false;
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

    $scope.isClean=function(){

        return angular.equals(original, $scope.instructions);
    };
    // Display Instruction details On Page Load
    $scope.doGetInstruction();

});

/*adminApp.controller('InstructionAdminController',function($scope,requestHandler,Flash) {

    $scope.doGetAdminInstruction=function(){
        requestHandler.getRequest("getLegalByAll/Instructions/", "").then(function(response){
            $scope.userinstructions=response.data.Legal_Data;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display User Instruction details On Page Load
    $scope.doGetAdminInstruction();

});*/

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