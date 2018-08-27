var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule']);
userApp.controller('UserKeyDetailsController',['$scope','requestHandler','$rootScope','$location',function($scope,requestHandler,$rootScope,$location) {

    $rootScope.isMenuShow=2;
    //to redirect to particular controller
    $scope.menuUrlChange=function(tabid){
        $rootScope.isMenuClicked=tabid;
        $location.path('/dashboard');
    };

    $scope.doGetUserKeyDetails=function() {
        requestHandler.getRequest("user/keydetails/", "").then(function (response) {
            $scope.userKeyDetails=response.data;    
            if($scope.userKeyDetails.diabeticstatus==1) {
                $rootScope.isDiabetic=1;
            }
            else {
                $('.navbar-collapse ul').addClass('navbar-menu-right1');
            }
              // for diabetic details popup
            if ($scope.userKeyDetails.diabeticstatus==null || $scope.userKeyDetails.diabeticstatus==0) {
                 $(window).load(function(){        
                    $(function(){
                        $("#lean_overlay").fadeTo(1000);
                        $("#diabetic-status").fadeIn(600);
                        $(".common_model").show();
                        $scope.shouldBeOpen = true;
                    });

                    $(".modal_close").click(function(){
                        $(".common_model").hide();
                        $("#diabetic-status").hide();
                        $("#lean_overlay").hide();
                        $scope.shouldBeOpen = false;
                    });

                    $("#lean_overlay").click(function(){
                        $(".common_model").show();
                        $("#diabetic-status").modal({backdrop: 'static',keyboard: false});
                        $("#lean_overlay").show();
                        $scope.shouldBeOpen = false;
                    });
                }); 
            }
        });
    };
    
    $scope.doDiabetesCheck=function() {
        $("#lean_overlay").hide();
        $(".modal-backdrop").hide();
        $("#diabetic-status").hide();
        requestHandler.postRequest("user/diabetescheck/", $scope.diabeticCheck).then(function (response) {
               $scope.doGetUserKeyDetails();
        });
    }

    //TO check Maximum 2 digit validation for HbA1c
    $scope.maxHbaValue=false;
    $scope.maxHbaValueCheck = function(){
        if($scope.diabeticCheck.HbA1c <= 100){
            $scope.maxHbaValue=false;
        }
        else if($scope.diabeticCheck.HbA1c > 100){
            $scope.maxHbaValue=true;
        }

    };

    $scope.init=function () {
        $scope.doGetUserKeyDetails();
    }
    $scope.init();

}]);