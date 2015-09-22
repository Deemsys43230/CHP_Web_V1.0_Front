var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote','angularUtils.directives.dirPagination']);
adminApp.controller('LatestNewsController',function($scope,requestHandler,Flash,$location) {

    $scope.isNew = true;
    $scope.title = "Add Latest News";

    // To display Latest news
    $scope.doGetLatestNews=function(){

        requestHandler.getRequest("admin/getLatestNews/", "").then(function(response){

            $scope.news=response.data.News;
            console.log($scope.news);
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //To add Latest News
    $scope.doAddLatestNews=function(){
        requestHandler.postRequest("admin/insertorupdateLatestNews/",$scope.latest).then(function(response){
            successMessage(Flash,"Successfully Added");
            $location.path("latestNews");
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };


    //To Enable or Disable Latest News

    $scope.doEnableDisableLatestNews=function(id){
        requestHandler.postRequest("admin/disableLatestNews/",{'newsid':id}).then(function(response){

            $scope.doGetLatestNews();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display Latest News On Page Load
    $scope.doGetLatestNews();

});

adminApp.controller('LatestNewsEditController',function($scope,requestHandler,Flash,$location,$routeParams) {


    var originalnews ="";
    //To display Latest News based on newsid
    $scope.doGetLatestNewsByID=function(){
        $scope.isNew = false;
        $scope.title = "Edit Latest News";

        requestHandler.getRequest("admin/getLatestNewsById/"+$routeParams.id,"").then(function(response){
            originalnews=angular.copy(response.data.News);
            $scope.latest=response.data.News;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };


    //To update Latest News
    $scope.doUpdateLatestNews = function(){
        requestHandler.putRequest("admin/insertorupdateLatestNews/",$scope.latest).then(function(response){
            successMessage(Flash,"Successfully Updated");
            $location.path("latestNews");

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    //To Enable the update button if changes occur.
    $scope.isClean = function() {
        console.log(originalnews);
        console.log($scope.latest);
        return angular.equals (originalnews, $scope.latest);
    }

    //Display Edit Page with date On load
    $scope.doGetLatestNewsByID();





});

// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);