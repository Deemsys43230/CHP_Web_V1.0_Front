var pageRedirect = angular.module('logApp', []);

pageRedirect.controller("addNewLecture",function($scope){
    $scope.title="Add New";
});

pageRedirect.controller("editLecture",function($scope){
    $scope.title="Edit";
});

pageRedirect.controller("addQuestion",function($scope){
    $scope.title="Add";
    $scope.button="Save Quiz";
});

pageRedirect.controller("editQuestion",function($scope){
    $scope.title="Edit";
    $scope.button="Save Changes";
});