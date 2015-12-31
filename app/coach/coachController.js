/**
 * Created by Deemsys on 9/21/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('CoachController',function($scope,requestHandler,Flash) {

    //Get Coach List
    $scope.doGetCoachList=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getallCoachListbyAdmin/","").then(function(response){
            $scope.coachList=response.data.getallCoachListbyAdmin;
            $scope.loaded=false;
            $scope.paginationLoad=true;
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

    //Add New Coach
    $scope.doAddCoach= function () {
        //Set Coach Role
        $scope.coach.role=2;

      requestHandler.postRequest("admin/registerCoach/",$scope.coach).then(function(){
            successMessage(Flash,"Registration Successful");
            /*To Close Modal*/
             $(".common_model").hide();
             $("#modal").hide();
             $("#lean_overlay").hide();
          /*End Close Modal*/
          $scope.doGetCoachList();
          $scope.coach={};
          $scope.confirm_password="";
          $scope.coachRegisterForm=false;
      },function(){
           errorMessage(Flash,"Please Try Again Later");
      });
    };

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetCoachList();
    };

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });

    $scope.reset=function(){
        $scope.coach={};
        $scope.coach.emailid="";
        $scope.coach.password="";
        $scope.coach.confirm_password="";
        $scope.coachRegisterForm.$setPristine();
    };

});


adminApp.controller('CoachViewController',function($scope,requestHandler,Flash,$routeParams) {

    $scope.averageRate=0.1;
    $scope.paginationLoad=false;

    $scope.doGetCoachDetailsByUser= function (id){

        $scope.coach = {
            status: 'coach-view'
        };




        $scope.viewload=true;

        requestHandler.getRequest("getCoachIndividualDetailbyAdmin/"+id, "").then(function(response){

            $scope.usercoachdetails=response.data.getCoachIndividualDetail;

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
});

// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

adminApp.filter('startsWithLetter', function () {

    return function (items, coachsearch) {

        var filtered = [];
        var letterMatch = new RegExp(coachsearch, 'i');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (letterMatch.test(item.emailid) || letterMatch.test(item.name) ) {

                filtered.push(item);
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
            "  <ul class='rating foreground' class='readonly' style='width:{{filledInStarsContainerWidth}}%'>" +
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

