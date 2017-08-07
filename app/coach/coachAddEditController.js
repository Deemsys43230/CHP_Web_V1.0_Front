//For add Edit coach controller
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('CoachAddEditController',['$scope','requestHandler','Flash','coachMenuService','$location','$routeParams',function($scope,requestHandler,Flash,coachMenuService,$location,$routeParams) {

$scope.inviteId = $routeParams.id;

    // For coach management side menu
     $scope.coachMenuList = coachMenuService;
        $.each($scope.coachMenuList,function(index,value){
            if(value.id==1){
                value.active = "active";
            }
            else value.active = ""
        });
    //Add New Coach from coach list and Clik add as a coach button
    $scope.doAddCoach= function () {
      requestHandler.postRequest("admin/registerCoach/",$scope.invitationDetails).then(function(){
            successMessage(Flash,"Successfully Registered");
            /*To Close Modal*/
             $(".common_model").hide();
             $("#modal").hide();
             $("#lean_overlay").hide();
          /*End Close Modal*/

      },function(){
           errorMessage(Flash,"Please Try Again Later");
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

        //Scroll to top after model opens
        $('html, body').animate({scrollTop: '0px'}, 500);

    };

    //Get Individual Invitation List
    $scope.doViewInvitationList=function(){
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

    //Display view Individual Invitation Details By Id
    $scope.invitationCoachViewInit=function(){
        $scope.doViewInvitationList();
    };


    $scope.init= function() {
       $scope.doGetInvitationByID();
    };
    $scope.init();
}]);