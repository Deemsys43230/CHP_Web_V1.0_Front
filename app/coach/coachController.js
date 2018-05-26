/**
 * Created by Deemsys on 9/21/2017.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('CoachController',['$scope','requestHandler','Flash','coachMenuService','$location','$routeParams',function($scope,requestHandler,Flash,coachMenuService,$location,$routeParams) {
    $scope.inviteId = $routeParams.id;
    // For coach management side menu
    $scope.coachMenuList = coachMenuService;
    $.each($scope.coachMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });

    //Get Coach List
    $scope.doGetCoachList=function(){
        $scope.loaded=true;

        //Param
        $scope.param={
            "limit":$scope.pagination.itemsPerPage,
            "offset":($scope.pagination.pageNumber-1)*$scope.pagination.itemsPerPage,
            "searchname":$scope.coachsearch
        };

        requestHandler.postRequest("admin/getcoacheslist/",$scope.param).then(function(response){
            $scope.coachList=response.data;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
    }

    //Get Invitation List
    $scope.doGetInvitationList=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getinterestedcoachlist/","").then(function(response){
            $scope.invitationList=response.data.coaches;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
    };



    //Post Delete Invitation List

    $scope.doDeleteInvitationList=function(Id){
        $scope.loaded=true;
        requestHandler.postRequest("admin/deletecoachinterest/",{"id":$scope.InvitationId}).then(function(response){
            $scope.loaded=false;
            $scope.paginationLoad=true;
            $scope.doGetInvitationList();
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //Alert Delete Model
    $scope.deleteModel=function(Id){
        $scope.InvitationId = Id;
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });
    };


    //Enable Disable coach
    $scope.doEnableDisableCoach=function(coachId){
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }

        requestHandler.postRequest("admin/enableordisableUser/",{"userid":coachId}).then(function(response){
            $scope.doGetCoachList();
            successMessage(Flash,"Successfully Updated");
        },function(){
            errorMessage(Flash,"Please Try Again Later");
        });
    };



    //Initial Load
    $scope.init = function(){
        $scope.coachList={};
        $scope.paginationLoad=false;
        $scope.pagination={"itemsPerPage":9,"pageNumber":1};
        $scope.doGetInvitationList();
    };

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });

    $scope.reset=function(){

        $scope.coach={};
        $scope.coach.name="";
        $scope.coach.emailid="";
        $scope.coach.password="";
        $scope.confirm_password="";
        $scope.coachRegisterForm.$setPristine();
        $scope.coachRegisterForm1.$setPristine();
        $scope.shouldBeOpen = true;

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
        }
    };

    $scope.$watch("pagination.pageNumber",function(){
        $scope.doGetCoachList();
    });


}]);


adminApp.controller('CoachViewController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {

    $scope.averageRate=0.1;
    $scope.paginationLoad=false;
    $scope.coachRatingPagination={
        "limit":4,
        "offset":0
    };

    $scope.doGetCoachDetailsByUser= function (id){
        $scope.coach = {
            status: 'coach-view'
        };

        $scope.viewload=true;

        requestHandler.getRequest("getCoachIndividualDetailbyAdmin/"+id, "").then(function(response){
            $scope.usercoachdetails=response.data.getCoachIndividualDetail;

            if($scope.usercoachdetails.experience!=null){
                $scope.years = Math.trunc($scope.usercoachdetails.experience / 12);
                $scope.months = $scope.usercoachdetails.experience %12;
            }

            if($scope.usercoachdetails.about==null){
                $scope.usercoachdetails.about = "NA";
            }

            if($scope.usercoachdetails.specialist==null){
                $scope.usercoachdetails.specialist = "NA";
            }

            if($scope.usercoachdetails.qualification==null){
                $scope.usercoachdetails.qualification = "NA";
            }

            if($scope.usercoachdetails.experience==null){
                $scope.usercoachdetails.experience = "0";
            }

            if($scope.usercoachdetails.specialist==null){
                $scope.usercoachdetails.specialist = "NA";
            }

            if($scope.usercoachdetails.phone==null){
                $scope.usercoachdetails.phone = "NA";
            }

            if($scope.usercoachdetails.dob==null){
                $scope.usercoachdetails.dob = "NA";
            }

            if($scope.usercoachdetails.country==null){
                $scope.usercoachdetails.country = "NA";
            }

            if($scope.usercoachdetails.state==null){
                $scope.usercoachdetails.state = "NA";
            }

            if($scope.usercoachdetails.city==null){
                $scope.usercoachdetails.city = "NA";
            }

            if($scope.usercoachdetails.zipcode==null){
                $scope.usercoachdetails.zipcode = "NA";
            }

        });

        $scope.doGetCoachRatings(id);

    };


    $scope.doGetCoachRatings= function (id) {
        $scope.reviewload=true;
        $scope.scrollnation.scrollEndCount= $scope.scrollnation.scrollEndCount+1;

        $scope.coachRatingScrollnation={
            "limit":$scope.scrollnation.itemsPerScroll,
            "offset":($scope.scrollnation.scrollEndCount)*$scope.scrollnation.itemsPerScroll
        };
        requestHandler.postRequest("getCoachRatingsandReviews/"+id+"/", $scope.coachRatingPagination).then(function(response){

            $scope.coachReviews= $scope.coachReviews.concat(response.data.reviews);
            $scope.canReview= response.data.canreview;
            $scope.reviewload=false;
            $scope.totalRatings = response.data.totalrecords;
            $scope.avgRatings = response.data.averageratings;
            if($scope.avgRatings==0)
                $scope.averageRate=0.1;
            else
                $scope.averageRate=$scope.avgRatings;
        });
    };

    $scope.coachReview=function(id){
        $scope.doGetCoachRatings(id);
        $scope.coachViewId=id;
        $scope.coach = {
            status: 'coach-reviews'
        };
    };
    $scope.userCoachViewInit=function(){
        $scope.scrollnation={"itemsPerScroll":4,"scrollEndCount":-1};
        /*$scope.checkReviews=[];*/
        $scope.doGetCoachDetailsByUser($routeParams.id);
        $scope.coachReviews=[];
        $scope.coachView = {
            status: 'coach-reviews'
        };
    };
}]);



// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

adminApp.filter('startsWithLettertotalcoach', function () {

    return function (items, coachsearch) {

        var filtered = [];
        var letterMatch = new RegExp(coachsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.emailid) || letterMatch.test(item.name) ) {

                    filtered.push(item);
                }
            }

        }
        return filtered;
    };
});

adminApp.filter('startsWithLettercoach', function () {

    return function (items, invitationsearch) {

        var filtered = [];
        var letterMatch = new RegExp(invitationsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.emailid) || letterMatch.test(item.name) ) {

                    filtered.push(item);
                }
            }

        }
        return filtered;
    };
});


adminApp.directive("averageStarRating", function() {
    return {
        restrict : "EA",
        template : "<div class='average-rating-container'>" +
        "  <ul class='rating background' class='readonly'>" +
        "    <li ng-repeat='star in stars' class='star'>" +
        "      <i class='fa fa-star'></i>" + //&#9733
        "    </li>" +
        "  </ul>" +
        "  <ul class='rating foreground' class='readonly' ng-attr-style='width:{{filledInStarsContainerWidth}}%'>" +
        "    <li ng-repeat='star in stars' class='star filled'>" +
        "      <i class='fa fa-star'></i>" + //&#9733
        "    </li>" +
        "  </ul>" +
        "</div>",
        scope : {
            averageRatingValue : "=ngModel",
            max : "=?" //optional: default is 5
        },
        link : function(scope, elem, attrs) {
            if (scope.max == undefined) { scope.max = 5; }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({});
                }
                var starContainerMaxWidth = 76; //%
                scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
            }
            scope.$watch("averageRatingValue", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});

coachApp.controller('CoachReviewController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {

    $scope.averageRate=0.1;
    $scope.paginationLoad=false;
    $scope.coachRatingPagination={
        "limit":4,
        "offset":0
    };

    $scope.doGetCoachUserId= function () {
        requestHandler.getRequest("getUserId/","").then(function(response){
            $scope.coachDetails=response.data.User_Profile;
            //for getting ratings and reviews
            $scope.doGetCoachRatings($scope.coachDetails.userid);
        });
    };

    $scope.doGetCoachRatings= function (userid) {

        $scope.reviewload=true;
        $scope.scrollnation.scrollEndCount= $scope.scrollnation.scrollEndCount+1;

        $scope.coachRatingScrollnation={
            "limit":$scope.scrollnation.itemsPerScroll,
            "offset":($scope.scrollnation.scrollEndCount)*$scope.scrollnation.itemsPerScroll
        };
        requestHandler.postRequest("getCoachRatingsandReviews/"+ userid+"/", $scope.coachRatingPagination).then(function(response){

            $scope.coachReviews= $scope.coachReviews.concat(response.data.reviews);
            $scope.canReview= response.data.canreview;
            $scope.reviewload=false;
            $scope.totalRatings = response.data.totalrecords;
            $scope.avgRatings = response.data.averageratings;
            if($scope.avgRatings==0)
                $scope.averageRate=0.1;
            else
                $scope.averageRate=$scope.avgRatings;
        });
    };

    $scope.coachReview=function(id){
        $scope.doGetCoachUserId();
        $scope.coachViewId=id;
        $scope.coach = {
            status: 'coach-reviews'
        };
    };

    $scope.userCoachViewInit=function(){
        $scope.scrollnation={"itemsPerScroll":4,"scrollEndCount":-1};
        /*$scope.checkReviews=[];*/
        $scope.coachReviews=[];
        $scope.coachView = {
            status: 'coach-reviews'
        };
    };
    $scope.doGetCoachUserId();
}]);



// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

coachApp.filter('startsWithLettertotalcoach', function () {

    return function (items, coachsearch) {

        var filtered = [];
        var letterMatch = new RegExp(coachsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.emailid) || letterMatch.test(item.name) ) {

                    filtered.push(item);
                }
            }

        }
        return filtered;
    };
});

coachApp.filter('startsWithLettercoach', function () {

    return function (items, invitationsearch) {

        var filtered = [];
        var letterMatch = new RegExp(invitationsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.emailid) || letterMatch.test(item.name) ) {

                    filtered.push(item);
                }
            }

        }
        return filtered;
    };
});


coachApp.directive("averageStarRating", function() {
    return {
        restrict : "EA",
        template : "<div class='average-rating-container'>" +
        "  <ul class='rating background' class='readonly'>" +
        "    <li ng-repeat='star in stars' class='star'>" +
        "      <i class='fa fa-star'></i>" + //&#9733
        "    </li>" +
        "  </ul>" +
        "  <ul class='rating foreground' class='readonly' ng-attr-style='width:{{filledInStarsContainerWidth}}%'>" +
        "    <li ng-repeat='star in stars' class='star filled'>" +
        "      <i class='fa fa-star'></i>" + //&#9733
        "    </li>" +
        "  </ul>" +
        "</div>",
        scope : {
            averageRatingValue : "=ngModel",
            max : "=?" //optional: default is 5
        },
        link : function(scope, elem, attrs) {
            if (scope.max == undefined) { scope.max = 5; }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({});
                }
                var starContainerMaxWidth = 76; //%
                scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
            }
            scope.$watch("averageRatingValue", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});

