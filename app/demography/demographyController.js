var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash']);
userApp.controller('DemographyController',['$rootScope','$scope','requestHandler','Flash','$location','$timeout',function($rootScope,$scope,requestHandler,Flash,$location,$timeout) {
    $rootScope.isMenuShow=1;
    var originalDemography="";
    var originalNutrition="";
    $scope.doGetDemographyandNutrition = function () {

        requestHandler.getRequest("user/getDemography/","").then(function(response) {
            if($scope.isUpdated==1){
            $scope.demography = response.data.Demography_Data;

            //Copy Original
          // $scope.demography.height=$scope.demography.height.toString();
            $scope.demography.weight=$scope.demography.weight;
            $scope.demography.hip=$scope.demography.hip;
            $scope.demography.waist=$scope.demography.waist;
            $scope.demography.userPlanType =($scope.demography.userPlanType).toString();
            $scope.userPlanTypeOld=$scope.demography.userPlanType;
            $scope.demography.userActivityType =($scope.demography.userActivityType).toString();


            if($scope.userProfile.unitPreference==2){
                $scope.demography.height = $scope.demography.height.toString();

                var heightarray=$scope.demography.height.split('.');
                var heightSplit=new Array();
                heightSplit= heightarray;
                $scope.demography.heightFeet = heightSplit[0];
                if(heightSplit[1]==undefined){
                    $scope.demography.heightInches= 0;
                }else{
                $scope.demography.heightInches=heightSplit[1];
             //  $scope.demography.heightInches=parseInt($scope.demography.heightInches);
                }
                $scope.demography.height=$scope.demography.height.toString();
            }
            }
            originalDemography=angular.copy(response.data.Demography_Data);
            // For onchange event
            $scope.bmiCalculation();
            $scope.bmiCheck();


        });
        requestHandler.getRequest("user/getNutrition/","").then(function(response) {
            //Copy Original
            $scope.nutrients = response.data.Nutrition;
            $scope.nutritionToString($scope.nutrients);

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };


    //BMI Calculation for demography page onchange event
    $scope.bmiCalculation=function(){
        if(Number($scope.demography.height)&&Number($scope.demography.weight)){
             if($scope.userProfile.unitPreference==1){
            $scope.demography.bmi="";
            $scope.weightBmi= $scope.demography.weight/0.4536;
            $scope.heightBmi= $scope.demography.height/2.54;
            $scope.demography.bmi=(($scope.weightBmi*703)/($scope.heightBmi*$scope.heightBmi)).toFixed(2);

        }
        else if($scope.userProfile.unitPreference==2){
            var inches = (12* $scope.demography.heightFeet)+(1*  $scope.demography.heightInches);
            $scope.demography.bmi=(($scope.demography.weight*703)/(inches*inches)).toFixed(2);
        }

        //To check the Obesity Status
           $scope.bmiCheck();
       }       

    };

    $scope.nutritionToString = function(nutrition){
        $scope.nutrients=nutrition;

        if($scope.nutrients.saturatedfat==null) $scope.nutrients.saturatedfat="";
        else $scope.nutrients.saturatedfat= $scope.nutrients.saturatedfat.toString();

        if($scope.nutrients.monounsaturatedfat==null) $scope.nutrients.monounsaturatedfat="";
        else $scope.nutrients.monounsaturatedfat= $scope.nutrients.monounsaturatedfat.toString();

        if($scope.nutrients.polyunsaturatedfat==null) $scope.nutrients.polyunsaturatedfat="";
        else $scope.nutrients.polyunsaturatedfat= $scope.nutrients.polyunsaturatedfat.toString();

        if($scope.nutrients.sugar==null) $scope.nutrients.sugar="";
        else $scope.nutrients.sugar= $scope.nutrients.sugar.toString();

        if($scope.nutrients.calcium==null) $scope.nutrients.calcium="";
        else $scope.nutrients.calcium= $scope.nutrients.calcium.toString();

        if($scope.nutrients.iron==null) $scope.nutrients.iron="";
        else $scope.nutrients.iron= $scope.nutrients.iron.toString();

        if($scope.nutrients.sodium==null) $scope.nutrients.sodium="";
        else $scope.nutrients.sodium= $scope.nutrients.sodium.toString();

        if($scope.nutrients.potassium==null) $scope.nutrients.potassium="";
        else $scope.nutrients.potassium= $scope.nutrients.potassium.toString();

        if($scope.nutrients.vitaminA==null) $scope.nutrients.vitaminA="";
        else $scope.nutrients.vitaminA= $scope.nutrients.vitaminA.toString();

        if($scope.nutrients.vitaminC==null) $scope.nutrients.vitaminC="";
        else $scope.nutrients.vitaminC= $scope.nutrients.vitaminC.toString();

        if($scope.nutrients.phosphorous==null) $scope.nutrients.phosphorous="";
        else $scope.nutrients.phosphorous= $scope.nutrients.phosphorous.toString();

        if($scope.nutrients.vitaminB12==null) $scope.nutrients.vitaminB12="";
        else $scope.nutrients.vitaminB12= $scope.nutrients.vitaminB12.toString();

        if($scope.nutrients.vitaminE==null) $scope.nutrients.vitaminE="";
        else $scope.nutrients.vitaminE= $scope.nutrients.vitaminE.toString();

        if($scope.nutrients.vitaminK==null) $scope.nutrients.vitaminK="";
        else $scope.nutrients.vitaminK= $scope.nutrients.vitaminK.toString();

        if($scope.nutrients.thiamin==null) $scope.nutrients.thiamin="";
        else $scope.nutrients.thiamin= $scope.nutrients.thiamin.toString();

        if($scope.nutrients.riboflavin==null) $scope.nutrients.riboflavin="";
        else $scope.nutrients.riboflavin= $scope.nutrients.riboflavin.toString();

        if($scope.nutrients.niacin==null) $scope.nutrients.niacin="";
        else $scope.nutrients.niacin= $scope.nutrients.niacin.toString();

        if($scope.nutrients.folicacid==null) $scope.nutrients.folicacid="";
        else $scope.nutrients.folicacid= $scope.nutrients.folicacid.toString();

        if($scope.nutrients.vitaminB6==null) $scope.nutrients.vitaminB6="";
        else $scope.nutrients.vitaminB6= $scope.nutrients.vitaminB6.toString();

        originalNutrition=angular.copy($scope.nutrients);
    };

    $scope.checkGoalStatus=function(date){
        requestHandler.postRequest("checkGoalStatus/",{"date":date}).then(function(response){

            $scope.budgetCheck = response.data.goalPossiblity;
            if($scope.budgetCheck == 0){
                $(function(){
                    $("#lean_overlay").fadeTo(1000);
                    $("#budgetAlert").fadeIn(600);
                    $(".common_model").show();
                    $scope.shouldBeOpen = true;
                });

                $(".modal_close").click(function(){
                    $(".common_model").hide();
                    $("#budgetAlert").hide();
                    $("#lean_overlay").hide();
                    $scope.shouldBeOpen = false;
                });

                $("#lean_overlay").click(function(){
                    $(".common_model").hide();
                    $("#budgetAlert").hide();
                    $("#lean_overlay").hide();
                    $scope.shouldBeOpen = false;
                });
            }
        });
    };

    //user plan changes alert
    $scope.userPlanChanged=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#plan-change").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#plan-change").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#plan-change").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
    };

    $scope.userWeightPlanChanged=function(){
        if( $scope.userPlanTypeOld!=$scope.demography.userPlanType){
            $scope.planChanged=true;
            $scope.userPlanChanged();
            $scope.demography.dob=$scope.demography.dob;
            $scope.demography.gender=$scope.demography.gender;
        }else{
            $scope.doUpdateDemography();
        }
    };


    $scope.doUpdateDemography= function () {
        $rootScope.planHighlight = false;
        if($scope.demography.heightFeet && $scope.demography.heightInches){
            $scope.demography.height =$scope.demography.heightFeet+'.'+$scope.demography.heightInches;

        }
            $scope.demography.height =$scope.demography.height.toString();
            $scope.demography.weight = parseFloat($scope.demography.weight);
            $scope.demography.hip = parseFloat($scope.demography.hip);
             $scope.demography.targetweight=parseFloat($scope.demography.targetweight);



        delete $scope.demography.obesity;
        delete $scope.demography.diabetes;

        requestHandler.getRequest("getUserId/","").then(function(response){
            if(response.data.demography.demoUpdatedstatus==0){
                $scope.dashboardNavigation = true;
            }
            else if(response.data.demography.demoUpdatedstatus==1){
                $scope.dashboardNavigation = false;
            }
            requestHandler.putRequest("user/insertorupdateDemography/",$scope.demography).then(function(response){
                if(response.data.Response_status==1){
                $scope.doGetDemographyandNutrition();
                $scope.checkGoalStatus(selectedDate);
                $rootScope.checkPath=2;
                successMessage(Flash,"Successfully Updated");
                $timeout(function () {
                    if($scope.dashboardNavigation == true){
                    $location.path("/dashboard");
                    }
                    $scope.dashboardNavigation = false;
                },1000);
                }
                else if(response.data.Response_status==2){
                    if(response.data.eligibilityPlan ==1){
                        $("html, body").animate({
                            scrollTop: 0
                        }, 600);
                        $scope.eligibilityPlan=response.data.eligibilityPlan;
                        $(function(){
                            $("#lean_overlay").fadeTo(1000);
                            $("#updateAlert").fadeIn(600);
                            $(".common_model").show();
                        });

                        $(".modal_close").click(function(){
                            $(".common_model").hide();
                            $("#updateAlert").hide();
                            $("#lean_overlay").hide();
                        });

                        $("#lean_overlay").click(function(){
                            $(".common_model").hide();
                            $("#updateAlert").hide();
                            $("#lean_overlay").hide();
                        });
                    }
                    else  if(response.data.eligibilityPlan ==3){
                        $("html, body").animate({
                            scrollTop: 0
                        }, 600);
                        $scope.eligibilityPlan=response.data.eligibilityPlan;
                        $(function(){
                            $("#lean_overlay").fadeTo(1000);
                            $("#updateAlert").fadeIn(800);
                            $(".common_model").show();
                        });

                        $(".modal_close").click(function(){
                            $(".common_model").hide();
                            $("#updateAlert").hide();
                            $("#lean_overlay").hide();
                        });

                        $("#lean_overlay").click(function(){
                            $(".common_model").hide();
                            $("#updateAlert").hide();
                            $("#lean_overlay").hide();
                        });
                    }
                }
            }, function () {
                errorMessage(Flash, "Please try again later!")
            });

        });
    };

    $scope.doUpdateNutrition= function () {
        requestHandler.putRequest("user/updateNutrition/",$scope.nutrients).then(function(response){
            $scope.nutrients = response.data.Nutrition;
            successMessage(Flash,"Successfully Updated");
        },  function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.isCleanDemography =function(){
        if($scope.isUpdated==0){
            return false;
        }
        else if($scope.isUpdated==1){
            return angular.equals(originalDemography, $scope.demography);
        }
    };
    $scope.weightlossError=false;
    $scope.weightgainError=false;

    $scope.planChangeValidation = function(plantype){
       $scope.weight=parseFloat($scope.demography.weight);
       $scope.targetweight =parseFloat($scope.demography.targetweight);




        if(plantype==1 || plantype==4 ){
            $scope.weightlossError=false;
            $scope.weightgainError=false;
        }
        if(plantype==2){
            $scope.weightgainError=false;
            $scope.weightlossError=false;
            $scope.invalidError=false;
            if($scope.targetweight==0){
                $scope.invalidError=true;
            }
            else{
                if( $scope.targetweight < $scope.weight){
                    $scope.weightlossError=false;
                }
                else{
                    $scope.weightlossError=true;
                }
            }

        }
        else if(plantype==3){
            $scope.weightlossError=false;
            if( $scope.targetweight > $scope.weight){
                $scope.weightgainError=false;
            }
            else{
                $scope.weightgainError=true;
            }
        }
       // $scope.weight=$scope.demography.weight.toString();
        //$scope.targetweight =$scope.demography.targetweight.toString();
    };


   //To Check maximum height
    $scope.maxheight=false;
    $scope.maxHeightCheck = function(height){
        if(height<=393.7){
            $scope.maxheight=false;
        }
        else if(height>393.7){
            $scope.maxheight=true;
        }

    };

    //To check maximum Weight
    $scope.maxweight=false;
    $scope.maxWeightCheck = function(weight){
        if(weight <=2204.4){
            $scope.maxweight=false;
        }
        else if(weight >2204.4){
            $scope.maxweight=true;
        }

    };

//To Check maximum Weight in kgs
    $scope.maxweightkgs=false;
    $scope.maxWeightCheckKgs = function(weight){
        if(weight <=999.9){
            $scope.maxweightkgs=false;
        }
        else if(weight >999.9){
            $scope.maxweightkgs=true;
        }

    };


    //TO check Maximum target Weight in lbs
    $scope.maxTargetWeight=false;
    $scope.maxTargetWeightCheck = function(targetWeight){
        if(targetWeight<=2204.4){
            $scope.maxTargetWeight=false;
        }
        else if(targetWeight>2204.4){
            $scope.maxTargetWeight=true;
        }

    };

    //TO check Maximum target Weight in kgs
    $scope.maxTargetWeightKgs=false;
    $scope.maxTargetWeightCheckKgs = function(targetWeight){
        if(targetWeight<=999.9){
            $scope.maxTargetWeightKgs=false;
        }
        else if(targetWeight>999.9 || targetWeight==0){
            $scope.maxTargetWeightKgs=true;
        }

    };

    //TO check Maximum target Weight in kgs
/*    $scope.targetZero=false;
    $scope.targetZeroKgs = function(targetWeight){
        if(targetWeight==0){
            $scope.targetZero=true;
        }
        else if(targetWeight!=0){
            $scope.targetZero=false;
        }

    };*/
    $scope.isCleanNutrition =function(){
        return angular.equals(originalNutrition, $scope.nutrients);
    };

    //For Obesity Condition based on BMI Value
    $scope.bmiCheck=function(){
        $scope.bmiStatus = "";
        if($scope.demography.bmi <18.5){
            $scope.bmiStatus ="You are Suffer UnderWeight";
        }
        else if($scope.demography.bmi > 18.5 && $scope.demography.bmi <= 25){
            $scope.bmiStatus ="Healthy";
        }
        else if($scope.demography.bmi >25 && $scope.demography.bmi <= 30){
            $scope.bmiStatus ="You are Suffer OverWeight";
        }
        else if($scope.demography.bmi >30){
            $scope.bmiStatus ="Obesity";
        }
    };


    $scope.getUserId = function () {

        requestHandler.getRequest("getUserId/","").then(function(response) {
            $scope.userProfile = response.data.User_Profile;
           $scope.isUpdated = response.data.demography.demoUpdatedstatus;
            $scope.userdemo =response.data.demography;
            $scope.doGetDemographyandNutrition();
        });

    };
    //TO check Maximum 2 digit validation for HbA1c
    $scope.maxHbaValue=false;
    $scope.maxHbaValueCheck = function(){
        if($scope.demography.HbA1c <= 100){
            $scope.maxHbaValue=false;
        }
        else if($scope.demography.HbA1c > 100){
            $scope.maxHbaValue=true;
        }

    };


  //TO check Maximum 2 digit validation for bloodoxygen
    $scope.maxValue=false;
    $scope.maxValueCheck = function(){
        if($scope.demography.bloodoxygen <= 100){
            $scope.maxValue=false;
        }
        else if($scope.demography.bloodoxygen > 100){
            $scope.maxValue=true;
        }

    };

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

    $scope.init=function(){
        $scope.getUserId();
        $scope.doGetDemographyandNutrition();
    };

    $scope.init();
}]);


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);



userApp.directive('lowerThan', [

    function() {
        var link = function($scope, $element, $attrs, ctrl) {

            var validate = function(viewValue) {
                var comparisonModel = $attrs.lowerThan;


                if(!viewValue || !comparisonModel){
                    // It's valid because we have nothing to compare against
                    ctrl.$setValidity('lowerThan', true);
                }

                var plantype="";
                plantype=$scope.plantype;
                // It's valid if model is lower than the model we're comparing against
                if(plantype==2){
                ctrl.$setValidity('lowerThan', parseInt(viewValue, 10) < parseInt(comparisonModel, 10) );
                }
                else if(plantype==3){
                ctrl.$setValidity('lowerThan', parseInt(viewValue, 10) > parseInt(comparisonModel, 10) );
                 }
                return viewValue;
            };



            ctrl.$parsers.unshift(validate);
            ctrl.$formatters.push(validate);

            $attrs.$observe('lowerThan', function(comparisonModel){
                return validate(ctrl.$viewValue);
            });



        };

        return  {
            require: 'ngModel',
            link: link,
            scope: { 'plantype': '=' }
        };

    }
]);


userApp.directive('checkWeight', function () {

    return {
        require: 'ngModel',
        restrict: '',
        link: function (scope, elm, attrs, ctrl) {
         ctrl.$validators.checkWeight = function (modelValue) {
           var planType=scope.demography.userPlanType;
           var currentWeight=scope.demography.weight;
            if(planType!=1){
                 if(planType==2){
                     if(modelValue>currentWeight){
                         scope.isCheckError=true;
                         return false;
                     }else{
                         return true;
                     }
                 }else if(planType==3){
                     if(modelValue<currentWeight){
                         return false;
                     }else{
                         return true;
                     }
                 }
             }else{
                return false;
             }

         }
        }
    };
});
userApp.directive('validateMoney', function() {
    var MONEY_EXPR = /^(\d+\.[\d]|\d+\.[\d]|\d+)$/;
    return {
        require : 'ngModel',
        restrict : '',
        link : function(scope, elm, attrs, ngModel) {
            ngModel.$validators.validateMoney = function(modelValue) {
                return MONEY_EXPR.test(modelValue);
            };
        }
    };
});

