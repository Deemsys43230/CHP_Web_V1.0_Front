var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote','angularUtils.directives.dirPagination']);
adminApp.controller('ForumsController',function($scope,requestHandler,Flash,$location) {

    $scope.isNew = true;
    $scope.title = "Add Forum";
    $scope.activeClass = {forum:'active'};

    //summer note
    $scope.options = {
        height: 250
    };

    // To display Forums List
    $scope.doGetForums=function(){
        $scope.loaded=true;
        requestHandler.getRequest("getListOfForumsByAdmin/", "").then(function(response){
            $scope.forums=response.data['Forum details'];
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //To add Forum
    $scope.doAddForum=function(){

        requestHandler.postRequest("insertForum/",$scope.forumDetails).then(function(response){
            successMessage(Flash,"Successfully Added");
            $location.path("forums");
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };


    //To Enable or Disable Forums
    $scope.doBlockUnblockForum=function(id){
        requestHandler.putRequest("admin/blockorUnblockForum/",{'postid':id}).then(function(response){

            $scope.doGetForums();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display Forums On Page Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetForums();
    };
});

adminApp.controller('ForumsEditController',function($scope,requestHandler,Flash,$location,$routeParams) {

    $scope.activeClass = {forum:'active'};

    //summer note
    $scope.options = {
        height: 250
    };

    var originalforum ="";

    //To display Forums by id
    $scope.doGetForumsByID=function(){
        $scope.isNew = false;
        $scope.title = "Edit Forum";

        requestHandler.postRequest("getForumDetailByAdmin/",{"postid":$routeParams.id}).then(function(response){
            $scope.forumDetails=response.data['Forum details'];
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doGetForumAnswers=function(){

        requestHandler.postRequest("admin/listofAnswersbyAdmin/",{"postid":$routeParams.id}).then(function(response){
            $scope.forumAnswers=response.data.ForumDiscussionData;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doBlockUnblockForumAnswer=function(ansid){

        requestHandler.postRequest("admin/blockorUnblock/",{"ansid":ansid}).then(function(response){
            successMessage(Flash,"Successfully Updated");
            $scope.doGetForumAnswers();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };


    //To update Latest News
    $scope.doUpdateForum = function(){
        requestHandler.putRequest("updateForum/",$scope.forumDetails).then(function(response){
            successMessage(Flash,"Successfully Updated");
            $location.path("forums");
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    //Display view forums
    $scope.viewInit=function(){
        $scope.doGetForumsByID();
        $scope.doGetForumAnswers();
    };

    //Display view forums
    $scope.editForumInit=function(){
        $scope.doGetForumsByID();
    };

});

// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

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