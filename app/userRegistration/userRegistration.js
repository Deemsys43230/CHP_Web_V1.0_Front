var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash']);

commonApp.controller('UserRegistrationController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
    $scope.steps = 0;
    $scope.registerUser={};
    $scope.userPlan={};
    $scope.changePlanSkipStep=true;
    $scope.isPlanSubmitted=true;

    // to choose user plan
    $scope.planChoosen = function (plantype) {
        $scope.planType = plantype;
        if(plantype!=4){
            $scope.steps = 1;
            if($scope.changePlanSkipStep==false){
                $scope.steps=$scope.steps+1;
            }
        }else{
            $scope.steps = 6;
        }
    };
    //default data
    $scope.defaultRegistrationData = {
        'plantype': '',
        'gender': '1',
        'dob': '01/01/1990',
        'height': '160',
        'weight': '60',
        'enddate': '',
        'activitytype': '1',
        'planchoice': '1',
        'role': '3',
        'unit': '',
        'targetweight': '',
        'customenddate': '',
        'referralid':''
    };

    //to change the plan
    $scope.changePlan = function () {
        $scope.changePlanSkipStep=false;
        $scope.steps = 0;


    };
    //to show plan preview
    $scope.planPreview = function () {
        $scope.steps = 5;

    };
    $scope.userRegistration = function () {
        $scope.steps = 6;

    };
    $scope.customPlanAlert = function () {
        $(function () {
            $("#lean_overlay").fadeTo(1000);
            $("#custom-plan-confirmation").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function () {
            $(".common_model").hide();
            $("#custom-plan-confirmation").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function () {
            $(".common_model").hide();
            $("#custom-plan-confirmation").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
    };

    //to calculate previous step
    $scope.previousStep=function(){
        $scope.steps=$scope.steps-1;
    };
    $scope.doGetUserPlanOverView= function (possibiledate) {
        $scope.userPlan.plantype=parseInt($scope.planType);
        $scope.userPlan.dob=$scope.defaultRegistrationData.dob;
        $scope.userPlan.activitytype=parseInt($scope.defaultRegistrationData.activitytype);
        $scope.userPlan.planchoice= parseInt($scope.defaultRegistrationData.planchoice);
        $scope.userPlan.role= $scope.defaultRegistrationData.role.toString();
        $scope.userPlan.gender= parseInt($scope.defaultRegistrationData.gender);
        $scope.userPlan.unit=$scope.units;
        if( $scope.userPlan.planchoice==5) {
            $scope.userPlan.enddate =$scope.defaultRegistrationData.customenddate;

        }


        if($scope.userPlan.unit==2){
            $scope.userPlan.height=parseInt($scope.defaultRegistrationData.heightFeet)+'.'+($scope.defaultRegistrationData.heightInches) ;
            $scope.userPlan.weight=parseInt($scope.defaultRegistrationData.weightlbs);
            if($scope.userPlan.plantype==2){
                $scope.userPlan.targetweight= ((parseInt($scope.defaultRegistrationData.weightlbs))-(parseInt($scope.defaultRegistrationData.targetweight)));
            }

            if($scope.userPlan.plantype==3){
                $scope.userPlan.targetweight= ((parseInt(($scope.defaultRegistrationData.weightlbs))+parseInt($scope.defaultRegistrationData.targetweight)));
            }
        }
        else if($scope.userPlan.unit==1){
            $scope.userPlan.height=parseInt($scope.defaultRegistrationData.height);
            $scope.userPlan.weight=parseInt($scope.defaultRegistrationData.weight);
            if($scope.userPlan.plantype==2){
                $scope.userPlan.targetweight= ((parseInt($scope.defaultRegistrationData.weight))-(parseInt($scope.defaultRegistrationData.targetweight)));
            }

            if($scope.userPlan.plantype==3){
                $scope.userPlan.targetweight= ((parseInt(($scope.defaultRegistrationData.weight))+parseInt($scope.defaultRegistrationData.targetweight)));
            }
        }
        if(possibiledate){
            $scope.userPlan.enddate= $scope.possibledate;
        }

        requestHandler.postRequest("getplanoverview/",$scope.userPlan).then(function(response) {

            if(response.data.Response_status==1){

                $scope.userPlanDetails=response.data.plandetails;
            }
            else{
                $scope.customPlanAlert();
                console.log($scope.userPlan);
                $scope.userPlanDetails=$scope.userPlan;
                console.log($scope.userPlanDetails);
                $scope.possibledate=response.data.possibledate;
                $scope.userPlanDetails.enddate=$scope.possibledate;
                console.log($scope.userPlanDetails);

            }


        });
    };
    $scope.doUserRegistration= function () {

        $scope.submitted=true;
        if($scope.registerForm.$valid){
        $scope.registerUser.referralid=$scope.defaultRegistrationData.referralid;
        if($scope.planType==4){
            $scope.registerUser.role= $scope.defaultRegistrationData.role;
            $scope.registerUser.plantype=  $scope.planType;
        }else {
            $scope.registerUser.height=$scope.userPlan.height;
            $scope.registerUser.weight=$scope.userPlan.weight;
            $scope.registerUser.plantype=$scope.userPlan.plantype;
            $scope.registerUser.dob=  $scope.userPlan.dob;
            $scope.registerUser.activitytype=$scope.userPlan.activitytype;
            $scope.registerUser.planchoice=$scope.userPlan.planchoice;
            $scope.registerUser.role= $scope.userPlan.role;
            $scope.registerUser.gender=$scope.userPlan.gender;
            $scope.registerUser.unit=$scope.userPlan.unit;
            $scope.registerUser.enddate=$scope.userPlan.enddate;
            $scope.registerUser.targetweight=$scope.userPlan.targetweight;
        }

        requestHandler.postRequest("userregistration/",$scope.registerUser).then(function(response) {
            $scope.steps = 0;
            successMessage(Flash,"User Registration Successful");

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    }

    };
    //to calculate next step
    $scope.nextStep=function(){

        if($scope.planType!=2&&$scope.steps==3){
            $scope.steps=$scope.steps+2;

        }
        else{
            $scope.steps=$scope.steps+1;
        }
        if($scope.steps==5){
            $scope.doGetUserPlanOverView(false);
        }

    };

    $scope.doValidation=function(){

        if($scope.basicDetailsForm.$valid){
            $scope.nextStep();
        }

    };

    $scope.test=function(unitVar){
        if(unitVar=='mUnit'){
            $scope.units=1;
            $scope.weightLbsToKgConversion();
        }
        else if(unitVar=='uUnit'){
            $scope.units=2;
            $scope.convertCmToFeetConversion();

        }
    };

    function initializeDobCalender() {
        $('#dob').datetimepicker({format: 'DD/MM/YYYY', ignoreReadonly: true, maxDate: new Date(),widgetPositioning: {vertical: 'bottom'}}).on('dp.change', function(selected){
            $scope.defaultRegistrationData.dob=$('#dob').val();
        });

        $('#dob').click(function(){
            $('#dob').focus();
        });
        //while clicking dob icon to set scrollTop for metric calender
        $('#dobIcon').click(function()
        {
            $('#dob').focus();

        });
    };

    function initializeEndDateCalender() {
        $('#enddate').datetimepicker({format: 'DD/MM/YYYY', ignoreReadonly: true, minDate: new Date(),widgetPositioning: {vertical: 'top'}}).on('dp.change', function(selected){
            $scope.enddate=$('#enddate').val();
        });

        $('#enddate').click(function(){
            $('#enddate').focus();
        });
        //while clicking dob icon to set scrollTop for metric calender
        $('#enddateIcon').click(function()
        {
            $('#enddate').focus();

        });
    };
    function customEndDateCalender() {
        $('#customEndDate').datetimepicker({format: 'DD/MM/YYYY', ignoreReadonly: true, minDate: new Date(),widgetPositioning: {vertical: 'top'}}).on('dp.change', function(selected){
            $scope.defaultRegistrationData.customenddate=$('#customEndDate').val();
        });

        $('#customEndDate').click(function(){
            $('#customEndDate').focus();
        });
        $('#customEndDateIcon').click(function()
        {
            $('#customEndDate').focus();

        });
    };
    //convert height cm to feet and inches
    $scope.convertCmToFeetConversion=function() {
        var realFeet = (($scope.defaultRegistrationData.height*0.393700) / 12);
        var feet = Math.floor(realFeet);
        $scope.defaultRegistrationData.heightFeet=feet;
        var inches = Math.round((realFeet - feet) * 12);
        $scope.defaultRegistrationData.heightInches=inches;
        //convert weight kgs to lbs
        $scope.defaultRegistrationData.weightlbs=  $scope.defaultRegistrationData.weight*2.2046;
        $scope.defaultRegistrationData.targetweight=$scope.defaultRegistrationData.targetweight*2.2046;
    };
   //convert weight kg to lbs
    $scope.weightLbsToKgConversion=function(){
        $scope.defaultRegistrationData.targetweight= $scope.defaultRegistrationData.targetweight/2.2046;
    };


    //To check maximum Height in inches
    $scope.maxHeightInches=false;
    $scope.maxHeightCheck = function(height){
        if(height <=11){
            $scope.maxHeightInches=false;
        }
        else if(height >11){
            $scope.maxHeightInches=true;
        }

    };
    //To check maximum Height in feet
    $scope.maxHeightFeet=false;
    $scope.maxHeightCheckFeet = function(height){
        if(height <=12){
            $scope.maxHeightFeet=false;
        }
        else if(height >12){
            $scope.maxHeightFeet=true;
        }

    };
    $scope.init = function() {
        $scope.test('mUnit');
        initializeDobCalender();
        initializeEndDateCalender();
        customEndDateCalender();
    };
    $scope.init();

}]);