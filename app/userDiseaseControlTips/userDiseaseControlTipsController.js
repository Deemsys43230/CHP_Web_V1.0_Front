
//var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','ngSanitize']);
userApp.controller('UserDiseaseControlTipsListController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
    $scope.activeClass.healthy='active';
    setTimeout(function(){
        if(!$location.search().id){}
        else{
            var searchId="#"+$location.search().id;
            var offset = $(searchId).offset().top-75;
            $("html, body").animate({ scrollTop: offset }, "slow");
        }
    }, 300);

   $scope.focusToIndividualTips=function(id){
        console.log(id);
        var searchId="#"+id;
        var offset = $(searchId).offset().top;
        $("html, body").animate({ scrollTop: offset }, "slow");
    };

    // Get list of CDC content
    $scope.getCDCList=function(){
        //$scope.isSingleView=false;
        requestHandler.getRequest("getHealthyLivingListByUser/","").then(function(response){
            $scope.cdcContentList=response.data.healthyliving;
        });
    };
    $scope.init=function(){
        $scope.getCDCList();
    };

    $scope.init();
}]);
userApp.controller('UserDiseaseControlTipController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {

    $scope.cdcid=window.location.href.slice(window.location.href.indexOf('=') + 1);
    // Get List of CDC Content By ID
    $scope.getCDCListByID=function(){
        requestHandler.getRequest("getHealthyLivingDetail/"+ $scope.cdcid+"/","").then(function(response){
            $scope.cdcContent=response.data.healthyliving;
            $('#content').html($scope.cdcContent.content+" <div><div class='loader-style'><div class='loader'></div></div></div>");
            $scope.title=$scope.cdcContent.title;
            console.log($scope.title);
        });
    };

    $scope.init=function(){
        $scope.getCDCListByID();
    };

    $scope.init();

}]);
// html filter (render text as html)
userApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

