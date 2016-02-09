var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote','angularUtils.directives.dirPagination']);
adminApp.controller('LatestNewsController',function($scope,requestHandler,Flash,$location,siteMenuService) {

    $scope.isNew = true;
    $scope.title = "Add Latest News";

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.id==2){
            value.active = "active";
        }
        else value.active = ""
    });

    //summer note
    $scope.options = {
        height: 250
    };

    // To display Latest news
    $scope.doGetLatestNews=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getLatestNews/", "").then(function(response){
            $scope.news=response.data.News;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //To add Latest News
    $scope.doAddLatestNews=function(){
        /*$('#summernote-news').code().find('*').css('font-family','inherit');
              alert($scope.latest.description);*/
        requestHandler.postRequest("admin/insertorupdateLatestNews/",$scope.latest).then(function(response){

            successMessage(Flash,"Successfully Added");
            $location.path("latestNews");
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };


    //To Enable or Disable Latest News

    $scope.doEnableDisableLatestNews=function(id){
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
        requestHandler.postRequest("admin/disableLatestNews/",{'newsid':id}).then(function(response){

            $scope.doGetLatestNews();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display Latest News On Page Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetLatestNews();
    };

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });
});

adminApp.controller('LatestNewsEditController',function($scope,requestHandler,Flash,$location,$routeParams,siteMenuService) {

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.id==2){
            value.active = "active";
        }
        else value.active = ""
    });

    //summer note
    $scope.options = {
        height: 250
    };

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
    };

    //Display Edit Page with date On load
    $scope.doGetLatestNewsByID();

});

// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

adminApp.filter('startsWithLetterNews', function () {

    return function (items, newssearch) {
        var filtered = [];
        var letterMatch = new RegExp(newssearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.title) || letterMatch.test(item.datetime)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('NewsUserController',function($scope,requestHandler,Flash,$routeParams,$location){

    // To display Testimonials as user
    $scope.doGetNewsByUser=function(){
        requestHandler.getRequest("getLatestNewsByUser/", "").then(function(response){

            $scope.usernewslist=response.data.News;

         },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetNewsDetailsByUser= function (id) {
        $('html, body').animate({scrollTop: 0}, 600);
        requestHandler.getRequest("getLatestNewsDetail/"+id, "").then(function(response){

            $scope.usernewsdetails=response.data.News;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };


    // To display the user Testimonial list on load
    $scope.doGetNewsByUser();
    $scope.doGetNewsDetailsByUser($routeParams.id);

});

// html filter (render text as html)
commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);



commonApp.filter('toSec', function() {

    return function(input) {

            dateArgs = input.match(/\d{2,4}/g),
            year = dateArgs[2],
            month = parseInt(dateArgs[1]) - 1,
            day = dateArgs[0],
            hour = dateArgs[3],
            minutes = dateArgs[4];

        var result = new Date(year, month, day, hour, minutes).getTime();

        return result || '';
    };
});