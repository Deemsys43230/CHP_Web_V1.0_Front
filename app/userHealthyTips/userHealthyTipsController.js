
//var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);
userApp.controller('UserHealthyTipsListController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
    $scope.activeClass.healthy='active';
    //to show hide articles list and single article

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
            $scope.pager= true;
        });
    };

    $scope.init=function(){
        $scope.pagination={"itemsPerPage": 4, "pageNumber": 1};
        $scope.pager= false;
    };

    $scope.$watch("pagination.pageNumber",function(){
        $scope.getArticleList();
    });

    $scope.init();
}]);
userApp.controller('UserHealthyTipController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
    $scope.loaded=false;
    $scope.articleid=window.location.href.slice(window.location.href.indexOf('=') + 1);
    // Get List of CDC Content By ID
    $scope.getArticleById=function(){
        $scope.loaded=true;
        requestHandler.getRequest("articleview/"+ $scope.articleid+"/","").then(function(response){
            $scope.articleDetail=response.data.article;
            $('#article').html($scope.articleDetail.content);
            $scope.loaded=false;
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
userApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);