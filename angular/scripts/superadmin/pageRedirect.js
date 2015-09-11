var pageRedirect = angular.module('superadmin', []);

pageRedirect.controller("addOfferController",function($scope){
    $scope.title="Create";
    $scope.button="Activate Offer";
});

pageRedirect.controller("editOfferController",function($scope){
    $scope.title="Edit";
    $scope.button="Save Changes";
});

pageRedirect.controller("reuseOfferController",function($scope){
    $scope.title="Reuse";
    $scope.button="Reuse Offer";
});

pageRedirect.controller("addNews",function($scope){
    $scope.title=" Create";
    $scope.button="Create News";
});

pageRedirect.controller("editNews",function($scope){
    $scope.title=" Edit";
    $scope.button="Save Changes";
});

pageRedirect.controller("addBlog",function($scope){
    $scope.title=" Create";
    $scope.button="Create Blog";
});

pageRedirect.controller("editBlog",function($scope){
    $scope.title=" Edit";
    $scope.button="Save Changes";
});