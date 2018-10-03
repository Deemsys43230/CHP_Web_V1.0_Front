/**
 * Created by Deemsys on 3/19/2016.
 */
/*var commonApp= angular.module('commonApp');*/
/*Since commonApp is loading before Disease Control Trip so angular.module is not needed*/
commonApp.controller('diseaseControlTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.disease='active';
}]);

var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

userApp.controller('diseaseControlTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.disease='active';
}]);

var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

coachApp.controller('diseaseControlTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.disease='active';
}]);

var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate']);

adminApp.controller('diseaseControlTipsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
    $scope.activeClass.disease='active';
}]);

commonApp.controller('DiseaseControlTipsListController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
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
        $scope.commonCdcListPagination={
            "limit": $scope.commonCdcPagination.itemsPerPage,
            "offset":($scope.commonCdcPagination.pageNumber-1)*$scope.commonCdcPagination.itemsPerPage
        };
       requestHandler.postRequest("getHealthyLivingListByUser/",$scope.commonCdcListPagination).then(function(response){
          $scope.cdcContentList=response.data;
           $scope.paginationLoad=true;
//console.log($scope.cdcContentList.syndicateid);
       });
    };

    $scope.init=function(){
        $scope.paginationLoad=false;
        $scope.commonCdcPagination={"itemsPerPage":6,"pageNumber":1};

    };

    $scope.init();
    $scope.$watch("commonCdcPagination.pageNumber",function(){
        $scope.getCDCList();
    });
    }]);

commonApp.controller('DiseaseControlTipController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
    $scope.loaded=false;
    $scope.cdcid=window.location.href.slice(window.location.href.indexOf('=') + 1);
    // Get List of CDC Content By ID
    $scope.getCDCListByID=function(){
        $scope.loaded=true;
        requestHandler.getRequest("getHealthyLivingDetail/"+ $scope.cdcid+"/","").then(function(response){
            $scope.cdcContent=response.data.healthyliving;
            $('#content').html($scope.cdcContent.content+" <div><div class='loader-style'><div class='loader'></div></div></div>");
            $scope.loaded=false;
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
commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
