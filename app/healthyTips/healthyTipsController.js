/**
 * Created by Deemsys on 3/19/2016.
 */
// var commonApp= angular.module('commonApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

commonApp.controller('HealthyTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.healthy='active';
}]);

var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

userApp.controller('HealthyTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.healthy='active';
}]);

var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

coachApp.controller('HealthyTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.healthy='active';
}]);

var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

adminApp.controller('HealthyTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.healthy='active';
}]);

commonApp.controller('HealthyTipsListController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
    // setTimeout(function(){
    //     if(!$location.search().id){}
    //     else{
    //         var searchId="#"+$location.search().id;
    //         var pageNo = Math.floor(($scope.tId-$location.search().id)/10+1);
    //         if($scope.pageNo!=pageNo){
    //         $scope.pageNo=pageNo;
    //         setTimeout(function(){ var searchId="#"+$location.search().id;
    //         var offset = $(searchId).offset().top-75;
    //         $("html, body").animate({ scrollTop: offset }, "slow"); }, 100);
    //     }else{
    //         var searchId="#"+$location.search().id;
    //         var offset = $(searchId).offset().top-75;
    //         $("html, body").animate({ scrollTop: offset }, "slow");
    //     }
    //     }
    // });
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

     // Get list of Artlcle 
    $scope.getArticleList=function(){
    $scope.getArticleParam={
                             "limit": $scope.pagination.itemsPerPage,
                             "offset": ($scope.pagination.pageNumber-1)* $scope.pagination.itemsPerPage
                           };

       requestHandler.postRequest("articles/",$scope.getArticleParam).then(function(response){
          $scope.articleList=response.data;
       });
    };

    $scope.init=function(){
         $scope.pagination={"itemsPerPage": 4, "pageNumber": 1};
    };

    $scope.$watch("pagination.pageNumber",function(){
        $scope.getArticleList();
    });

    $scope.init();
}]);

commonApp.controller('HealthyTipController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {

    $scope.articleid=window.location.href.slice(window.location.href.indexOf('=') + 1);
    // Get List of CDC Content By ID
    $scope.getArticleById=function(){
        requestHandler.getRequest("articleview/"+ $scope.articleid+"/","").then(function(response){
            $scope.articleDetail=response.data.article;
            $('#article').html($scope.articleDetail.content+" <div><div class='loader-style'><div class='loader'></div></div></div>");
            $scope.title=$scope.articleDetail.title;
            console.log($scope.title);
        });
    };

    $scope.init=function(){
        $scope.getArticleById();
    };

    $scope.init();

}]);

// html filter (render text as html)
commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);