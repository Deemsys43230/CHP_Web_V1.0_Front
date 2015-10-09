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
        requestHandler.postRequest("admin/enableordisableUser/",{"userid":coachId}).then(function(response){
           $scope.doGetCoachList();
            successMessage(Flash,"Successful");
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

});


adminApp.controller('CoachViewController',function($scope,requestHandler,Flash,$routeParams) {

    $scope.doGetCoachProfile = function () {
        requestHandler.getRequest("getCoachIndividualDetail/"+$routeParams.id, "").then(function (response) {
            $scope.coachProfile = response.data.getCoachIndividualDetail;
            $scope.coachProfile.imageurl = $scope.coachProfile.imageurl.substring($scope.coachProfile.imageurl.indexOf("/") + 14, $scope.coachProfile.imageurl.length)
            $scope.coachProfile.imageurl = $scope.coachProfile.imageurl + "?decache=" + Math.random();
        });


        requestHandler.getRequest("getRatingsandReviews/"+$routeParams.id, "").then(function (response) {

            $scope.coachReviews = response.data.Ratings_Reviews.Reviews;
            $scope.averageRatings = response.data.Ratings_Reviews.averageRatings;
        });
    };
    
    $scope.doGetCoachProfile();


});

// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);