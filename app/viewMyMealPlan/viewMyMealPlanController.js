var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angular-nicescroll']);
userApp.controller('ViewMyMealPlanController',['$scope', '$sce', 'requestHandler','Flash','$timeout','$rootScope',function($scope, $sce ,requestHandler,Flash$sce,$timeout,$rootScope){
    $rootScope.isMenuShow=1;
    
    $scope.doGetMealPlan=function() {
        requestHandler.getRequest("user/getfreeplanpdf/",{}).then(function (response) {
            $scope.mealPlanDetails = $sce.trustAsResourceUrl(response.data.pdf);
            console.log("Mealplan Details Checking Where its from :D " + $scope.mealPlanDetails);
        });
    };

    $scope.init=function () {
        $scope.doGetMealPlan();
    };
    $scope.init();
}]);