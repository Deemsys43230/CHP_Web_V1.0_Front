var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote','angularUtils.directives.dirPagination']);
adminApp.controller('ForumsController',function($scope,requestHandler,Flash,$location,siteMenuService) {

    $scope.isNew = true;
    $scope.title = "Add Forum";
    $scope.activeClass.forums='active';

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.id==1){
            value.active = "active";
        }
        else value.active = ""
    });

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

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
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

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });
});

adminApp.controller('ForumsEditController',function($scope,requestHandler,Flash,$routeParams,siteMenuService,$location) {

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.id==1){
            value.active = "active";
        }
        else value.active = ""
    });

    var originalforum ="";

    //To display Forums by id
    $scope.doGetForumsByID=function(){
        $scope.isNew = false;
        $scope.title = "Edit Forum";
        $scope.loaded=true;

        requestHandler.postRequest("getForumDetailByAdmin/",{"postid":$routeParams.id}).then(function(response){
            originalforum=angular.copy(response.data['Forum details']);
            console.log("ori",originalforum);
            $scope.forumDetails=response.data['Forum details'];
            console.log("adsd",$scope.forumDetails);
            $scope.loaded=false;
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
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }

        requestHandler.putRequest("updateForum/",$scope.forumDetails).then(function(response){
            successMessage(Flash,"Successfully Updated");
            $location.path("forums");
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.isClean=function(){
        console.log(angular.equals(originalforum, $scope.forumDetails));
        return angular.equals(originalforum, $scope.forumDetails);
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

adminApp.filter('startsWithLetterForum', function () {

    return function (items, forumsearch) {
        var filtered = [];
        var letterMatch = new RegExp(forumsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.posttitle) || letterMatch.test(item.postdescription)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
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

var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

userApp.controller('ForumsUserController',function($scope,requestHandler,Flash,$routeParams,$location){

    $scope.isNew = true;
    $scope.title = "Add Forum";
    $scope.activeClass.forums='active';

    //summer note
    $scope.options = {
        height: 250
    };

    $scope.abuseDisable=false;

    //To add Forum
    $scope.doAddForum=function(){

        requestHandler.postRequest("insertForum/",$scope.forumDetails).then(function(response){

            $scope.postid = response.data['Forum details'].postid;
            successMessage(Flash,"Successfully Added");
            $location.path("forumDetails/"+$scope.postid);
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    // To display Forum as user
    $scope.doGetForumsByUser=function(){
        $scope.loaded=true;

        $scope.forum = {
            status: 'forum-view'
        };

        requestHandler.getRequest("getListOfForumsByUserAndCoach/", "").then(function(response){

           $scope.userforumlist=response.data['Forum details'];

            $.each($scope.userforumlist, function(index,value) {
                requestHandler.postRequest("listofAnswers/", {"postid":value.postid}).then(function(response){
                    value.totalcomment=response.data.ForumDiscussionData.length;
                });
            });
            $('#showMostViewed').hide();
            $('#showMostViewed').show(700);
            $scope.loaded=false;
         },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetForumDetailsByUser= function () {
            requestHandler.getRequest("getUserId/","").then(function(response){                
            $scope.loginuserid=response.data.User_Profile.userid;
             requestHandler.postRequest("getForumDetailByUserAndCoach/",{"postid":$routeParams.id}).then(function(response){
            $scope.userforumdetails=response.data['Forum details'];

            if($scope.loginuserid === $scope.userforumdetails.userid){
                $scope.userCheck = true;
            }
            else{
                $scope.userCheck=false;
            }
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
        });
    };


    $scope.doGetForumAnswers=function(){

        requestHandler.postRequest("listofAnswers/",{"postid":$routeParams.id}).then(function(response){
            $scope.forumAnswers=response.data.ForumDiscussionData;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doPostForumAnswers=function(){

        requestHandler.postRequest("postAnswer/",{"comments":$scope.comments,"postid":$routeParams.id}).then(function(response){
            successMessage(Flash,"Your Comment Successfully Posted!");
            $scope.doGetForumAnswers();
            $scope.comments='';
            $scope.userCommentForm.$setPristine();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doMarkPostAsAbuse=function(){

        requestHandler.postRequest("abuseCount/",{"postid":$routeParams.id}).then(function(response){
            successMessage(Flash,"Thanks for your evaluation!");
            $scope.abuseDisable=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doMarkCommentAsAbuse=function(ansid){
        requestHandler.postRequest("MarkasAbuse/",{"ansid":ansid}).then(function(response){
            successMessage(Flash,"Thanks for your evaluation!");
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

 // To display the user Forum list on load
    $scope.doGetForumsByUser();

    $scope.init=function(){
        $scope.doGetForumDetailsByUser();
        $scope.doGetForumAnswers();
    };



});

userApp.controller('ForumsUserEditController',function($scope,requestHandler,Flash,$routeParams,$location){
    var original="";
    $scope.doGetForumDetailsByUserEdit= function () {

        $scope.isNew = false;
        $scope.title = "Edit Forum";

        requestHandler.postRequest("getForumDetailByUserAndCoach/",{"postid":$routeParams.id}).then(function(response){
            original=angular.copy(response.data['Forum details']);
            $scope.forumDetails=response.data['Forum details'];

        },function(){
            errorMessage(Flash,"Please try again later!")
        });


    };

    $scope.doGetForumAnswers=function(){

        requestHandler.postRequest("listofAnswers/",{"postid":$routeParams.id}).then(function(response){
            $scope.forumAnswers=response.data.ForumDiscussionData;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    //To update Latest News
    $scope.doUpdateForum = function(){
        requestHandler.putRequest("updateForum/",$scope.forumDetails).then(function(response){
            $scope.postid = response.data['Forum details'].postid;
            successMessage(Flash,"Successfully Updated");
            $location.path("forumDetails/"+$scope.postid);
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    // To display Forum as user
    $scope.doGetForumsByUser=function(){
        $scope.loaded=true;

        $scope.forum = {
            status: 'forum-view'
        };

        requestHandler.getRequest("getListOfForumsByUserAndCoach/", "").then(function(response){

            $scope.userforumlist=response.data['Forum details'];

            $.each($scope.userforumlist, function(index,value) {
                requestHandler.postRequest("listofAnswers/", {"postid":value.postid}).then(function(response){
                    value.totalcomment=response.data.ForumDiscussionData.length;
                });
            });
            $scope.loaded=false;
            $('#showMostViewed').hide();
            $('#showMostViewed').show(300);

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.isClean=function(){

        return angular.equals(original,  $scope.forumDetails);
    };

    $scope.doGetForumsByUser();

    $scope.Editinit=function(){
        $scope.doGetForumDetailsByUserEdit();
        $scope.doGetForumAnswers();
    };

    $scope.Editinit();
});

// html filter (render text as html)
userApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

userApp.filter('startsWithLetterForum', function () {

    return function (items, forumsearch) {
        var filtered = [];
        var letterMatch = new RegExp(forumsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.username) || letterMatch.test(item.posttitle) || letterMatch.test(item.postdescription)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});


var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('ForumsCoachController',function($scope,requestHandler,Flash,$routeParams,$location){

    $scope.isNew = true;
    $scope.title = "Add Forum";

    //summer note
    $scope.options = {
        height: 250
    };

    $scope.abuseDisable=false;

    //To add Forum
    $scope.doAddForum=function(){

        requestHandler.postRequest("insertForum/",$scope.forumDetails).then(function(response){
            $scope.postid = response.data['Forum details'].postid;
            successMessage(Flash,"Successfully Added");
            $location.path("forumDetails/"+$scope.postid);
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    // To display Forum as user
    $scope.doGetForumsByUser=function(){
        $scope.loaded=true;

        $scope.forum = {
            status: 'forum-view'
        };

        requestHandler.getRequest("getListOfForumsByUserAndCoach/", "").then(function(response){

            $scope.userforumlist=response.data['Forum details'];

            $.each($scope.userforumlist, function(index,value) {
                requestHandler.postRequest("listofAnswers/", {"postid":value.postid}).then(function(response){
                    value.totalcomment=response.data.ForumDiscussionData.length;
            });
            });
           /* $scope.userforumlist.sort(function(a,b){
                return a.totalcomment > b.totalcomment;
            });*/
            $('#showMostViewed').hide();
            $('#showMostViewed').show(300);
                 $scope.loaded=false;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };



    $scope.doGetForumDetailsByUser= function () {
        
        requestHandler.getRequest("getUserId/","").then(function(response){
            $scope.loginuserid=response.data.User_Profile.userid;
            requestHandler.postRequest("getForumDetailByUserAndCoach/",{"postid":$routeParams.id}).then(function(response){
            $scope.userforumdetails=response.data['Forum details'];

            if($scope.loginuserid === $scope.userforumdetails.userid){
                $scope.userCheck = true;
            }
            else{
                $scope.userCheck=false;
            }
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
        });
    };


    $scope.doGetForumAnswers=function(){

        requestHandler.postRequest("listofAnswers/",{"postid":$routeParams.id}).then(function(response){
            $scope.forumAnswers=response.data.ForumDiscussionData;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doPostForumAnswers=function(){

        requestHandler.postRequest("postAnswer/",{"comments":$scope.comments,"postid":$routeParams.id}).then(function(response){
            successMessage(Flash,"Your Comment Successfully Posted!");
            $scope.doGetForumAnswers();
            $scope.comments='';
            $scope.userCommentForm.$setPristine();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doMarkPostAsAbuse=function(){

        requestHandler.postRequest("abuseCount/",{"postid":$routeParams.id}).then(function(response){
            successMessage(Flash,"Thanks for your evaluation!");
            $scope.abuseDisable=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doMarkCommentAsAbuse=function(ansid){
        requestHandler.postRequest("MarkasAbuse/",{"ansid":ansid}).then(function(response){
            successMessage(Flash,"Thanks for your evaluation!");
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };






    // To display the user Forum list on load
    $scope.doGetForumsByUser();

    $scope.init=function(){
        $scope.doGetForumDetailsByUser();
        $scope.doGetForumAnswers();
    };



});

coachApp.controller('ForumsCoachEditController',function($scope,requestHandler,Flash,$routeParams,$location){

    var original="";
    $scope.doGetForumDetailsByUserEdit= function () {

        $scope.isNew = false;
        $scope.title = "Edit Forum";

        requestHandler.postRequest("getForumDetailByUserAndCoach/",{"postid":$routeParams.id}).then(function(response){
            original=angular.copy(response.data['Forum details']);
            $scope.forumDetails=response.data['Forum details'];

        },function(){
            errorMessage(Flash,"Please try again later!")
        });


    };

    $scope.doGetForumAnswers=function(){

        requestHandler.postRequest("listofAnswers/",{"postid":$routeParams.id}).then(function(response){
            $scope.forumAnswers=response.data.ForumDiscussionData;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    //To update Latest News
    $scope.doUpdateForum = function(){
        requestHandler.putRequest("updateForum/",$scope.forumDetails).then(function(response){
            $scope.postid = response.data['Forum details'].postid;
            successMessage(Flash,"Successfully Updated");
            $location.path("forumDetails/"+$scope.postid);
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    // To display Forum as user
    $scope.doGetForumsByUser=function(){
        $scope.loaded=true;

        $scope.forum = {
            status: 'forum-view'
        };

        requestHandler.getRequest("getListOfForumsByUserAndCoach/", "").then(function(response){

            $scope.userforumlist=response.data['Forum details'];

            $.each($scope.userforumlist, function(index,value) {
                requestHandler.postRequest("listofAnswers/", {"postid":value.postid}).then(function(response){
                    value.totalcomment=response.data.ForumDiscussionData.length;
                });
            });
            $scope.loaded=false;
            $('#showMostViewed').hide();
            $('#showMostViewed').show(300);

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.isClean=function(){

        return angular.equals(original,  $scope.forumDetails);
    };

    $scope.doGetForumsByUser();

    $scope.Editinit=function(){
        $scope.doGetForumDetailsByUserEdit();
        $scope.doGetForumAnswers();
    };

    $scope.Editinit();
});

// html filter (render text as html)
coachApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);


coachApp.filter('startsWithLetterForum', function () {

    return function (items, forumsearch) {
        var filtered = [];
        var letterMatch = new RegExp(forumsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.username) || letterMatch.test(item.posttitle) || letterMatch.test(item.postdescription)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});