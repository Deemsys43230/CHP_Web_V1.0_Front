var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash']);

commonApp.controller('UserRegistrationController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
   
    // to choose user plan
    $scope.customAlertChangePlan=false;
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
    
    //to change the plan
    $scope.changePlan = function () {
        $("#lean_overlay").hide();
        $(".modal-backdrop").hide();
        $scope.changePlanSkipStep=false;
        $scope.customAlertChangePlan=false;
        $scope.steps = 0;


    };
    //to show plan preview
    $scope.planPreview = function () {
        $scope.steps = 5;

    };
    $scope.userRegistration = function (isAlert) {
        $("#lean_overlay").hide();
        $(".modal-backdrop").hide();
        // Checking for alert
        if(isAlert){
            $scope.customAlertChangePlan=true;
        }
        $scope.steps = 6;

    };
  ;
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
            $(".common_model").show();
            $("#custom-plan-confirmation").modal({backdrop: 'static', keyboard: false});
            $("#lean_overlay").show();
            $scope.shouldBeOpen = false;
        });
    };
    $scope.weightLossAlert = function () {
        $(function () {
            $("#lean_overlay").fadeTo(1000);
            $("#weight-loss-message").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function () {
            $(".common_model").hide();
            $("#weight-loss-message").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function () {
            $(".common_model").show();
            $("#weight-loss-message").modal({backdrop: 'static', keyboard: false});
            $("#lean_overlay").show();
            $scope.shouldBeOpen = false;
        });
    };

    //to calculate previous step
    $scope.previousStep=function(){
        $scope.steps=$scope.steps-1;
    };
    $scope.doGetUserPlanOverView= function (possibiledate) {
        $scope.customAlertChangePlan=false;
        $("#lean_overlay").hide();
        $(".modal-backdrop").hide();
        $scope.userPlan.plantype=parseInt($scope.planType);
        $scope.userPlan.dob=$scope.defaultRegistrationData.dob;
        $scope.userPlan.activitytype=parseInt($scope.defaultRegistrationData.activitytype);
        $scope.userPlan.planchoice= parseInt($scope.defaultRegistrationData.planchoice);
        $scope.userPlan.role= $scope.defaultRegistrationData.role.toString();
        $scope.userPlan.gender= parseInt($scope.defaultRegistrationData.gender);
        $scope.userPlan.unit=$scope.units;
        // Switch End Date
        if($scope.userPlan.plantype==3){
            $scope.userPlan.enddate =$scope.enddate;
        }else{
            if( $scope.userPlan.planchoice==5) {
                $scope.userPlan.enddate =$scope.defaultRegistrationData.customEndDate;
             }
        }
        
        if($scope.userPlan.unit==2){
            $scope.userPlan.height=parseInt($scope.defaultRegistrationData.heightFeet)+'.'+($scope.defaultRegistrationData.heightInches) ;
            $scope.userPlan.weight=parseInt($scope.defaultRegistrationData.weightlbs);
            if($scope.userPlan.plantype==2){
                $scope.userPlan.targetweight= ((parseInt($scope.defaultRegistrationData.weightlbs))-(parseInt($scope.defaultRegistrationData.targetweightlbs)));
            }

            if($scope.userPlan.plantype==3){
                $scope.userPlan.targetweight= ((parseInt(($scope.defaultRegistrationData.weightlbs))+parseInt($scope.defaultRegistrationData.targetweightlbs)));
            }
        }
        else if($scope.userPlan.unit==1){
            $scope.userPlan.height=parseInt($scope.defaultRegistrationData.height);
            $scope.userPlan.weight=parseInt($scope.defaultRegistrationData.weight);
            if($scope.userPlan.plantype==2){
                $scope.userPlan.targetweight= ((parseInt($scope.defaultRegistrationData.weight))-(parseInt($scope.defaultRegistrationData.targetweightkgs)));
            }

            if($scope.userPlan.plantype==3){
                $scope.userPlan.targetweight= ((parseInt(($scope.defaultRegistrationData.weight))+parseInt($scope.defaultRegistrationData.targetweightkgs)));
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
                if(response.data.possibledate==undefined){
                    $scope.weightLossAlert();
                }
                else{
                    $scope.customPlanAlert();
                    $scope.userPlanDetails=$scope.userPlan;
                    $scope.possibledate=response.data.possibledate;
                    $scope.userPlanDetails.enddate=$scope.possibledate;
                }


            }


        });
    };

    //to user registration
    $scope.doUserRegistration= function () {

        $scope.submitted=true;
        $scope.isEmailExits=false;
        if($scope.registerForm.$valid){
        $scope.registerUser.referralid=$scope.defaultRegistrationData.referralid;
        if($scope.planType==4 || $scope.customAlertChangePlan==true){
            $scope.registerUser.role= $scope.defaultRegistrationData.role;
            $scope.registerUser.plantype= 4;
        }
        else{
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
    //to calculate target weight is lesser than current weight
    $scope.weightlossError=false;
    $scope.targetWeightValidation=function() {
        $scope.weightlossError = false;
        if ($scope.planType == 2){
            if ($scope.units ==2) {
                if (parseFloat($scope.defaultRegistrationData.targetweightlbs) > parseFloat($scope.defaultRegistrationData.weightlbs)) {
                    $scope.weightlossError = true;
                }
            }
            else {
                if (parseFloat($scope.defaultRegistrationData.targetweightkgs) > parseFloat($scope.defaultRegistrationData.weight)) {
                    $scope.weightlossError = true;
                }

            }
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

    //To Check maximum height cm
    $scope.maxheight=false;
    $scope.maxHeightCheck = function(){

        if($scope.defaultRegistrationData.height<=393.7){
            $scope.maxheight=false;
        }
        else if($scope.defaultRegistrationData.height>393.7){
            $scope.maxheight=true;
        }
    };


//To Check maximum Weight in kgs
    $scope.maxweightkgs=false;
    $scope.maxWeightCheckKgs = function(){

        if($scope.defaultRegistrationData.weight <=999.9){
            $scope.maxweightkgs=false;
        }
        else if($scope.defaultRegistrationData.weight >999.9){
            $scope.maxweightkgs=true;
        }

    };


    //To check maximum Weight
    $scope.maxweightlbs=false;
    $scope.maxWeightCheckLbs= function(){
        if($scope.defaultRegistrationData.weightlbs <=2204.4){
            $scope.maxweightlbs=false;
        }
        else if($scope.defaultRegistrationData.weightlbs >2204.4){
            $scope.maxweightlbs=true;
        }

    };

    //To check maximum Height in inches
    $scope.maxHeightInches=false;
    $scope.maxHeightCheckInches = function(){
        if($scope.defaultRegistrationData.heightInches <=11){
            $scope.maxHeightInches=false;
        }
        else if($scope.defaultRegistrationData.heightInches >11){
            $scope.maxHeightInches=true;
        }

    };
    //To check maximum Height in feet
    $scope.maxHeightFeet=false;
    $scope.maxHeightCheckFeet = function(){
        if($scope.defaultRegistrationData.heightFeet <=12){
            $scope.maxHeightFeet=false;
        }
        else if($scope.defaultRegistrationData.heightFeet >12){
            $scope.maxHeightFeet=true;
        }
    };
    $scope.doValidation=function(){
        if($scope.planType==2 && $scope.steps==4){
            if($scope.activityForm.$valid){
                $scope.nextStep();
            }

        }else {
            if($scope.units==1){
                if($scope.basicDetailsForm.$valid && $scope.maxheight==false && $scope.maxweightkgs==false && $scope.weightlossError==false){
                    $scope.nextStep();
                }
            }
          else{
                if($scope.basicDetailsForm.$valid && $scope.maxweightlbs==false && $scope.maxHeightInches==false && $scope.maxHeightFeet==false && $scope.weightlossError==false){
                    $scope.nextStep();
                }
            }
        }

    };

    //check unit preference
    $scope.test=function(unitVar){
        if(unitVar=='mUnit'){
            $scope.units=1;
            $scope.weightLbsToKgConversion();
            $scope.maxHeightCheck();
            $scope.maxWeightCheckKgs();

        }
        else if(unitVar=='uUnit'){
            $scope.units=2;
            $scope.convertCmToFeetConversion();
            $scope.maxWeightCheckLbs();
            $scope.maxHeightCheckInches();
            $scope.maxHeightCheckFeet();

        }
    };



    function initializeDobCalender() {
        var previousdate = new Date();
        previousdate.setFullYear(new Date().getFullYear()-13);
        $('#dob').datetimepicker({format: 'DD/MM/YYYY', ignoreReadonly: true, maxDate: previousdate,widgetPositioning: {vertical: 'bottom'}}).on('dp.change', function(selected){
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
            $scope.defaultRegistrationData.customEndDate=$('#customEndDate').val();
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
        $scope.defaultRegistrationData.weightlbs=  ($scope.defaultRegistrationData.weight*2.2046).toFixed(2);
        if($scope.defaultRegistrationData.targetweightkgs!='' && $scope.defaultRegistrationData.targetweightkgs!=undefined ){
            $scope.defaultRegistrationData.targetweightlbs=Math.ceil($scope.defaultRegistrationData.targetweightkgs*2.2046).toFixed(2);
        }
    };
   //convert weight kg to lbs
    $scope.weightLbsToKgConversion=function(){
   
        if($scope.defaultRegistrationData.heightFeet!=undefined&&$scope.defaultRegistrationData.heightInches!=undefined){
            $scope.defaultRegistrationData.height=Math.ceil(($scope.defaultRegistrationData.heightFeet*30.48)+($scope.defaultRegistrationData.heightInches*2.54));
        }
        $scope.defaultRegistrationData.weight=  Math.ceil($scope.defaultRegistrationData.weightlbs/2.2046);
        if($scope.defaultRegistrationData.targetweightlbs!='' && $scope.defaultRegistrationData.targetweightlbs!=undefined ){
            $scope.defaultRegistrationData.targetweightkgs= ($scope.defaultRegistrationData.targetweightlbs/2.2046).toFixed(2);
        }
    };


     // Toggle Show Password
     $scope.toggleShowPassword=function(){
        $scope.showPassword=!$scope.showPassword;
    };
    $scope.init = function() {
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
            'targetweightkgs': '',
             'targetweightlbs':'',
            'customEndDate': '',
            'referralid':''
        };
        $scope.steps = 0;
        $scope.registerUser={};
        $scope.userPlan={};
        $scope.changePlanSkipStep=true;
        $scope.showPassword=false;
        $scope.isPlanSubmitted=true;
        $scope.convertCmToFeetConversion();
        $scope.test('mUnit');
        initializeDobCalender();
        initializeEndDateCalender();
        customEndDateCalender();
     };
    $scope.init();

}]);