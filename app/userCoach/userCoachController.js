var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

userApp.controller('UserCoachController',function($scope,requestHandler,Flash,$location,$q,$routeParams) {

    $scope.averageRate=0.1;
    var myCoachIdListArray = [];

  // To display Coach list by user
    $scope.doGetCoachListByUser=function(){
        requestHandler.getRequest("user/getallCoachListbyUser/", "").then(function(response){

            $scope.usercoachlist=response.data.getallCoachListbyUser;

            $scope.doGetCoachDetailsByUser(response.data.getallCoachListbyUser[0].userid);

            /*var ratingPromise;
            $.each($scope.usercoachlist, function(index,value){
                ratingPromise.requestHandler.getRequest("getRatingsandReviews/"+value.userid, "").then(function (response) {
                    $scope.coachReviewslist = response.data.Ratings_Reviews;
                    $scope.doGetRatingsByCoach($scope.coachReviewslist);
                });
            });*/
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };


    $scope.doGetRatingsByCoach=function(id){
        $q.all([ratingPromise]).then(function(){//Only after tagPromise
            requestHandler.putRequest("admin/updateFood/", $scope.foodDetails).then(function (response) {
                if (response.data.Response_status == 1) {
                    successMessage(Flash,"Food Updated Successfully!");
                    $scope.doGetFoodDetails();
                    $location.path("food");
                }
            }, function (response) {
                alert("Not able to pull Food Tag");
            });
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
                $scope.usercoachdetails.about = "-";
            }

            if($scope.usercoachdetails.specialist==null){
                $scope.usercoachdetails.specialist = "-";
            }

            if($scope.usercoachdetails.qualification==null){
                $scope.usercoachdetails.qualification = "-";
            }

            if($scope.usercoachdetails.experience==null){
                $scope.usercoachdetails.experience = "0";
            }

        });

        requestHandler.getRequest("getRatingsandReviews/"+id, "").then(function (response) {
            $scope.coachReviews = response.data.Ratings_Reviews;
            $scope.viewload=false;

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
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doSubscribeCoach = function(coach){
       requestHandler.postRequest("user/subscribeCoach/",{"coach":coach}).then(function(response){
           successMessage(Flash,"Successfully subscribed");
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
    };

    $scope.coachReview=function(id){
        $scope.doGetCoachRatings(id);
        $scope.coachViewId=id;
        $scope.coach = {
            status: 'coach-reviews'
        };
    };

    $scope.coachView=function(id){
        $scope.doGetCoachDetailsByUser(id);
    };
});


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

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
