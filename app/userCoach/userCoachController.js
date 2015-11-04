var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

userApp.controller('UserCoachController',function($scope,requestHandler,Flash,$location) {

  // To display Coach list by user
    $scope.doGetCoachListByUser=function(){
        requestHandler.getRequest("user/getallCoachListbyUser/", "").then(function(response){
            $scope.usercoachlist=response.data.getallCoachListbyUser;

            $scope.usercoachdetails=response.data.getallCoachListbyUser[0];

            requestHandler.getRequest("getRatingsandReviews/"+$scope.usercoachdetails.userid, "").then(function (response) {

                $scope.coachReviews = response.data.Ratings_Reviews.Reviews;
            });

            $.each($scope.usercoachlist, function(index,value){
                requestHandler.getRequest("getRatingsandReviews/"+value.userid, "").then(function (response) {
                    $scope.coachReviewslist = response.data.Ratings_Reviews;
                   // alert($scope.coachReviewslist.averageRatings);

                    $('#Rating_'+value.userid).raty({ score: $scope.coachReviewslist.averageRatings });
                },function(){
                    errorMessage(Flash,"Please try again later!")
                });
            });
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetCoachDetailsByUser= function (id) {

        requestHandler.getRequest("getCoachIndividualDetail/"+id, "").then(function(response){

            $scope.usercoachdetails=response.data.getCoachIndividualDetail;

            if($scope.usercoachdetails.about==null){
                $scope.usercoachdetails.about = "-";
            }
        });

        requestHandler.getRequest("getRatingsandReviews/"+id, "").then(function (response) {

             $scope.coachReviews = response.data.Ratings_Reviews.Reviews;

            $.each($scope.coachReviews, function(index,value){
               alert(value.id);
               alert(value.ratinglevel);
                $('#Review_'+value.id).raty({score: value.ratinglevel});
            });


       },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.doGetMyCoachListByUser=function(){
        requestHandler.getRequest("user/getmyCoachList/", "").then(function(response){
            $scope.mycoachlist=response.data.getmyCoachList;


        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doSubscribeCoach = function(coach){

       requestHandler.postRequest("user/subscribeCoach/",{"coach":coach}).then(function(response){
            successMessage(Flash,"Successfully subscribed");
           $location.path("coach");

       });

    };

     $scope.doGetCoachListByUser();

    $scope.doGetMyCoachListByUser();


});


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
