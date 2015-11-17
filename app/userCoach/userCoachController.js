var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

userApp.controller('UserCoachController',function($scope,requestHandler,Flash,$location,$q,$routeParams,$window) {

    $scope.coachreview = {ratinglevel:1};
    $scope.averageRate=0.1;
    $scope.paginationLoad=false;
    var myCoachIdListArray = [];
    $scope.disablereview=false;

  // To display Coach list by user
    $scope.doGetCoachListByUser=function(){
        requestHandler.getRequest("user/getallCoachListbyUser/", "").then(function(response){

            $scope.usercoachlist1=response.data.getallCoachListbyUser;

            $scope.doGetCoachDetailsByUser(response.data.getallCoachListbyUser[0].userid);

            var ratingPromise;
            $.each($scope.usercoachlist1, function(index,value){
                value.averageRating=0.1;
                ratingPromise=$scope.doGetRatingsByCoach(value.userid);
                ratingPromise.then(function(result){
                    if(result.averageRatings!=0){
                        value.averageRating=result.averageRatings;
                    }
                    value.totalReviews=result.totalRatings;
                });
            });

            $q.all([ratingPromise]).then(function(){
                $scope.usercoachlist=$scope.usercoachlist1;
            });


        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };


    $scope.doGetRatingsByCoach=function(userid){
        return requestHandler.getRequest("getRatingsandReviews/"+userid, "").then(function (response) {
            return response.data.Ratings_Reviews;
        });
    };

    $scope.doGetCoachRatings= function (id) {
        $scope.reviewload=true;
        requestHandler.getRequest("getRatingsandReviews/"+id, "").then(function(response){
            $scope.coachReviews=response.data.Ratings_Reviews.Reviews;
            $scope.reviewload=false;
        });
    };

    $scope.doGetCoachDetailsByUser= function (id){

        $scope.coach = {
            status: 'coach-view'
        };

        $scope.doGetMyCoachListByUser();

        if(myCoachIdListArray.indexOf(id)!=-1)
            $scope.checkSubscribed=0;
        else
            $scope.checkSubscribed=1;

        $scope.viewload=true;

        requestHandler.getRequest("getCoachIndividualDetailbyUser/"+id, "").then(function(response){

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

    $scope.doGetMyCoachListByUser=function(){
        $scope.loaded=true;
        requestHandler.getRequest("user/getmyCoachList/", "").then(function(response){
            $scope.mycoachlist=response.data.getmyCoachList;
            $scope.loaded=false;
            $.each($scope.mycoachlist, function(index,coachlist){
                myCoachIdListArray.push(coachlist.userid);
            });
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doSubscribeCoach = function(coach){
       requestHandler.postRequest("user/subscribeCoach/",{"coach":coach}).then(function(response){
           successMessage(Flash,"Successfully subscribed");
           $scope.doGetCoachDetailsByUser(coach);
       },function(){
           errorMessage(Flash,"Please try again later!")
       });
    };

    $scope.doUnsubscribeCoach = function(coach){
       alert('Are you surely want to Unsubcribe the Coach '+coach);
    };

    $scope.coachListInit=function(){
        $scope.doGetMyCoachListByUser();
    };

    $scope.userCoachInit=function(){
        $scope.doGetCoachListByUser();
        $scope.coach = {
            status: 'coach-view'
        };
    };

    $scope.userCoachViewInit=function(){
        $scope.doGetCoachDetailsByUser($routeParams.id);
        $scope.coachView = {
            status: 'coach-reviews'
        };
        $scope.doGetCoachRatings($routeParams.id);
        $scope.subscribed=1;

        $scope.checkReview();
    };

    $scope.coachReview=function(id){
        $scope.doGetCoachRatings(id);
        $scope.subscribed=0;
        $scope.coachViewId=id;
        $scope.coach = {
            status: 'coach-reviews'
        };
    };

    $scope.coachView=function(id){
        $scope.doGetCoachDetailsByUser(id);
    };

    $scope.doAddReview=function(){
        $scope.coachreview.review_coach=$routeParams.id;
        requestHandler.postRequest("user/insertRatingsandReviews/",$scope.coachreview).then(function(response){

          successMessage(Flash,"Successfully Added");
         $scope.userCoachViewInit();
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };


    $scope.reset=function(){
        $scope.coachreview.reviewtitle="";
        $scope.coachreview.reviewdescription="";
        $scope.reviewForm.$setPristine();
    };


    $scope.checkReview=function(){
        $scope.coachReviews="";

        requestHandler.getRequest("getUserId/","").then(function(response){
            $scope.userProfile=response.data.User_Profile;
           $scope.loginuserid = $scope.userProfile.userid;
           requestHandler.getRequest("getRatingsandReviews/"+$routeParams.id, "").then(function (response) {
               $scope.coachReviews = response.data.Ratings_Reviews.Reviews;
               $.each($scope.coachReviews,function(index,value){
                   if(value.review_user == $scope.loginuserid){
                       $scope.disablereview = true;
                   }

               });

            });

        });
    }

});


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

userApp.directive("starRating", function() {
    return {
        restrict : "EA",
        template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
            "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
            "    <i class='fa fa-star'></i>" + //&#9733
            "  </li>" +
            "</ul>",
        scope : {
            ratingValue : "=ngModel",
            max : "=?", //optional: default is 5
            readonly: "=?"
        },
        link : function(scope, elem, attrs) {
            if (scope.max == undefined) { scope.max = 5; }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled : (i < scope.ratingValue.ratinglevel)
                    });
                }
            };
            scope.toggle = function(index) {
                if (scope.readonly == undefined || scope.readonly == false){
                    scope.ratingValue.ratinglevel = index + 1;
                    scope.onRatingSelected({
                        ratinglevel: index + 1
                    });
                }
            };
            scope.$watch("ratingValue.ratinglevel", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});



userApp.directive("averageStarRating", function() {
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
