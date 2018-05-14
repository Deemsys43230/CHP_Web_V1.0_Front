
var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);
userApp.controller('UserHealthyTipsListController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
    $scope.activeClass.healthy='active';
    //to show hide articles list and single article
    $scope.isSingleView=false;
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
        $scope.isSingleView=false;
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


    // Get List of CDC Content By ID
    $scope.getArticleById=function(id){
        $scope.isSingleView=true;
        requestHandler.getRequest("articleview/"+ id+"/","").then(function(response){
            $scope.articleDetail=response.data.article;
             $('#article').html($scope.articleDetail.content+" <div><div class='loader-style'><div class='loader'></div></div></div>");
            $scope.title=$scope.articleDetail.title;
        });
    };

    $scope.init();
}]);
