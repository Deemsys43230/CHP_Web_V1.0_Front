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
                    "searchname":""
                    };

        requestHandler.postRequest("admin/getcoacheslist/",$scope.param).then(function(response){
            $scope.coachList=response.data; 
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
    };

    //Get Invitation List
    $scope.doGetInvitationList=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getinterestedcoachlist/","").then(function(response){
            $scope.invitationList=response.data.coaches;
            // console.log($scope.invitationList);
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
    };

     //Get Individual Invitation List
    $scope.doViewInvitationList=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getinterestedcoachlist/","").then(function(response){
            $scope.invitationList=response.data.coaches;
            console.log($scope.invitationList);
            $scope.loaded=false;
            $scope.paginationLoad=true;
            var coaches = $scope.invitationList;

            //Looping to find the coach detail
            $.each($scope.invitationList,function(index,value){
                if(value.id==$routeParams.id){
                    $scope.invitationDetails=value;
                }
            });

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

    // Do Add as a coach with Edit
    $scope.doGetInvitationByID = function() {
        $scope.loaded=true;
        requestHandler.getRequest("admin/getinterestedcoachlist/","").then(function(response){
            $scope.invitationList=response.data.coaches;
            $scope.loaded=false;
            $scope.paginationLoad=true;
            var coaches = $scope.invitationList;

            //Looping to find the coach detail
            $.each($scope.invitationList,function(index,value){
                if(value.id==$routeParams.id){
                    $scope.invitationDetails=value;
                }
            });

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

    //Alert for Confirm add as a coach
    $scope.confirmModel=function(){
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

    //Add New Coach from coach list and Clik add as a coach button
    $scope.doAddCoach= function () {
      requestHandler.postRequest("admin/registerCoach/",$scope.invitationDetails).then(function(){
            successMessage(Flash,"Successfully Registered");
            /*To Close Modal*/
             $(".common_model").hide();
             $("#modal").hide();
             $("#lean_overlay").hide();
          /*End Close Modal*/
          $scope.doGetCoachList();
          $location.path('invitation-list');

      },function(){
           errorMessage(Flash,"Please Try Again Later");
      });
    };

    //Display view Individual Invitation Details By Id
    $scope.invitationCoachViewInit=function(){
        $scope.doViewInvitationList();
    };

    //Display view Invitation Details for add as a coach
    $scope.editInvitationInit=function(){
        $scope.doGetInvitationByID();
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



        requestHandler.getRequest("getRatingsandReviews/"+id, "").then(function (response) {
            $scope.coachReviews = response.data.Ratings_Reviews;
            $scope.viewload=false;
            $scope.totalRatings = $scope.coachReviews.totalRatings;
            $scope.avgRatings = $scope.coachReviews.averageRatings;

            if($scope.coachReviews.averageRatings==0)
                $scope.averageRate=0.1;
            else
                $scope.averageRate=$scope.coachReviews.averageRatings;
        },function(){
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doGetCoachRatings= function (id) {
        $scope.reviewload=true;
        requestHandler.getRequest("getRatingsandReviews/"+id, "").then(function(response){
            $scope.coachReviews=response.data.Ratings_Reviews.Reviews;
            $scope.reviewload=false;
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
        $scope.doGetCoachDetailsByUser($routeParams.id);
        $scope.coachView = {
            status: 'coach-reviews'
        };
        $scope.doGetCoachRatings($routeParams.id);

    };
}]);

// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

adminApp.filter('startsWithLettercoach', function () {

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

