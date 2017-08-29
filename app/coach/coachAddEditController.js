//For add Edit coach controller
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('CoachAddEditController',['$scope','requestHandler','Flash','coachMenuService','$location','$routeParams',function($scope,requestHandler,Flash,coachMenuService,$location,$routeParams) {

    $scope.inviteId = $routeParams.id;

    // For coach management side menu
     $scope.coachMenuList = coachMenuService;

     if($scope.inviteId!=undefined){
        $scope.selectedMenu=1;
        $scope.backTo="#invitation-list";
    }else{
        $scope.selectedMenu=2;   
        $scope.backTo="#coach";
    }
     

        $.each($scope.coachMenuList,function(index,value){
            if(value.id==$scope.selectedMenu){
                value.active = "active";
            }
            else value.active = ""
        });
    //Add New Coach from coach list and Clik add as a coach button
    $scope.doAddCoach= function () {
      requestHandler.postRequest("admin/registerCoach/",$scope.invitationDetails).then(function(){
            successMessage(Flash,"Coach Added Successfully");
            /*To Close Modal*/
             $(".common_model").hide();
             $("#modal").hide();
             $("#lean_overlay").hide();
          /*End Close Modal*/
           $location.path("coach");

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

            switch ($scope.invitationDetails.referral.toString()) {
                    case "1":
                        $scope.invitationDetails.referral="Friend";
                        break;
                    case "2":
                        $scope.invitationDetails.referral="Email";
                        break;
                    case "3":
                        $scope.invitationDetails.referral="Search Engine";
                        break;
                    case "4":
                        $scope.invitationDetails.referral="TV/Radio";
                        break;
                    case "5":
                        $scope.invitationDetails.referral="Website";
                        break;
                    case "6":
                        $scope.invitationDetails.referral="Newspaper";
                        break;
                    case "7":
                        $scope.invitationDetails.referral="Facebook";
                        break;
                    case "8":
                        $scope.invitationDetails.referral="Twitter";
                        break;
                    case "9":
                        $scope.invitationDetails.referral="Linked In";
                        break;
                    case "10":
                        $scope.invitationDetails.referral="Other";
                        break;
                    }
        });
    };


    //Alert for Confirm add as a coach
    $scope.confirmModel=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#confirm_modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#confirm_modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#confirm_modal").hide();
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
        $scope.doGetInvitationByID();
    };


    $scope.init= function() {
       $scope.doViewInvitationList();
    };
}]);