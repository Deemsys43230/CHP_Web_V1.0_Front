var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule']);
userApp.controller('UserKeyDetailsController',['$scope','requestHandler','$rootScope','$location',function($scope,requestHandler,$rootScope,$location) {

    $rootScope.isMenuShow=2;
    $scope.activeClass.menu='active';
    //to redirect to particular controller
    $scope.menuUrlChange=function(tabid){
        $rootScope.isMenuClicked=tabid;
        if (tabid==7) {
            $location.path('/profile');
        }
        else{
            $location.path('/dashboard');
        }
     };
    $scope.nonDiabeticAlert=false;

    $scope.doGetUserKeyDetails=function() {
        requestHandler.getRequest("user/keydetails/", "").then(function (response) {
            $scope.userKeyDetails=response.data;
            if($scope.userKeyDetails.diabeticstatus==1) {
                $rootScope.isDiabetic=1;
                $scope.isDiabeticPerson=1;
            }
              // for diabetic details popup
            if ($scope.userKeyDetails.diabeticstatus==0) {
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
        $scope.diabeticCheck.diabetic=parseInt( $scope.diabeticCheck.diabetic);
        $scope.diabeticCheck.HbA1c=parseFloat( $scope.diabeticCheck.HbA1c);
        $scope.diabeticCheck.fastingbloodglucose=parseFloat($scope.diabeticCheck.fastingbloodglucose);
        $scope.diabeticCheck.postprandialbloodglucose=parseFloat( $scope.diabeticCheck.postprandialbloodglucose);
        $scope.diabeticCheck.randombloodglucose=parseFloat( $scope.diabeticCheck.randombloodglucose);
        requestHandler.postRequest("user/diabetescheck/", $scope.diabeticCheck).then(function (response) {
            if(response.data.Response_status==0){
                $scope.nonDiabeticAlert=true;
                $scope.nonDiabeticAlertText="You are not a diabetic patient. Please provide valid information."
            }
               $scope.doGetUserKeyDetails();
        });
    }

    //to display water log detail
    $scope.dGetWaterLog=function() {
        requestHandler.postRequest("user/getWaterLogByDate/",{"date":selectedDate}).then(function (response) {
            $scope.waterlogDetails=response.data.Water_log;
            $scope.waterLogDisplay=$scope.waterlogDetails.milliliters/240;
        });
    };

    //to display mealPlan
    $scope.doGetMealPlan=function() {
        requestHandler.getRequest("user/getfreeplanpdf/",{}).then(function (response) {
            $scope.mealPlanDetails=response.data.pdf;
            console.log("Mealplan Details : " + $scope.mealPlanDetails);
             // to show and hide the My Meal Plan Card
                $scope.havePlan = false;
                $scope.showLink = false;
                if($scope.mealPlanDetails != null){
                    $scope.showLink = true;
                    $scope.userPlanText="No Plan";
                    console.log("showLink True");
                }
                else if($scope.mealPlanDetails == null){
                    $scope.havePlan = true;
                    console.log("havePlan True");
                }
        });
    };

    //to display fat details
    $scope.doGetWeightLogDetails=function(){
         requestHandler.postRequest("user/getWeightLogByDate/",{"date":selectedDate}).then(function(response) {
            $scope.weightlogDetails= response.data.Weight_logs;
        });
    };


    //To Display current date
    var selectedDate = new Date();
    var dd = selectedDate.getDate();
    var mm = selectedDate.getMonth()+1; //January is 0!

    var yyyy = selectedDate.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    selectedDate = dd+'/'+mm+'/'+yyyy;
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
        $scope.dGetWaterLog();
        $scope.doGetWeightLogDetails();
        $scope.doGetMealPlan();

    };
    $scope.init();

}]);