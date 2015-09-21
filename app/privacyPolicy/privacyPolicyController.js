
var commonApp= angular.module('commonApp',['requestModule','flash']);
commonApp.controller('privacyPolicyController',function($scope,requestHandler) {
    //alert("hello");

   // To display privacy policy details
    $scope.details = function() {
        requestHandler.getRequest("getLegalByAll/Privacypolicy/", "").then(function (response) {
           // alert(JSON.stringify(response));
            $scope.privacypolicydetails = response.data.Legal_Data;
            console.log(response);
        });
    };

    $scope.details();
});