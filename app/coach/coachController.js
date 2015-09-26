/**
 * Created by Deemsys on 9/21/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('CoachController',function($scope,requestHandler,Flash) {

    //Get Coach List
    $scope.doGetCoachList=function(){

        requestHandler.getRequest("admin/getallCoachListbyAdmin/","").then(function(response){
            $scope.coachList=response.data.getallCoachListbyAdmin;
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

          $scope.coach={};
          $scope.confirm_password="";
          $scope.coachRegisterForm=false;
      },function(){
           errorMessage(Flash,"Please Try Again Later");
      });
    };

    $scope.doGetCoachList();

});
