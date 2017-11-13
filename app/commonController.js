var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('CommonController',['$scope','requestHandler','Flash','$routeParams','$sce','$rootScope','$timeout','$window',function($scope,requestHandler,Flash,$routeParams,$sce,$rootScope,$timeout,$window) {

    $scope.countFrom = 0;
    $window.emi=0;

    if($routeParams.id=="password"){
        $(function(){
            $(".popupContainer").addClass('left-36');
            $("#lean_overlay").fadeTo(1000);
            $("#modal").fadeIn(600);
            /*$(".modal_trigger").click();*/
            $(".reset_password").hide();
            $(".user_register").hide();
            $(".secret_question").hide();
            $(".user_register1").hide();
            $(".user_login").show();
            $(".new_password_form").hide();
            $(".header_title").text('Login');
        });
        successMessage(Flash,"Reset Password Successfull! Please Login");
    }


    if($routeParams.id== "logout"){

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#section-modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#section-modal").hide();
            $("#lean_overlay").hide();
        });

        $(".relogin").click(function(){
            $("#section-modal").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#section-modal").hide();
            $("#lean_overlay").hide();
        });
    }
    // To display Testimonials as user
    $scope.doGetNewsByUser = function () {
        requestHandler.getRequest("getLatestNewsByUser/", "").then(function (response) {
            $scope.usernewslist = response.data.News;
            newscarousel();
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    // To display Testimonials as user
    $scope.doGetTestimonialsByUser=function(){
        requestHandler.getRequest("getTestimonialListByUser/", "").then(function(response){
            $scope.usertestimoniallist=response.data.Testimonials;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetDashboardCount=function(){
        requestHandler.getRequest("getStatistics/","").then(function(response){
            $scope.adminCountList=response.data.Stats;
            $scope.memberCount = $scope.adminCountList.membercount;
            $scope.exerciseCount = $scope.adminCountList.exercisecount;
            $scope.foodCount = $scope.adminCountList.foodcount;
            $scope.courseCount = $scope.adminCountList.publishedcourses;

        });
    };

   // To display the user Testimonial list on load
    /*$scope.init=function(){
        $scope.doGetNewsByUser();
        $scope.doGetTestimonialsByUser();
        $scope.doGetDashboardCount();
    };*/
    $scope.units=1;
    $scope.test=function(unitVar){
       if(unitVar=='mUnit'){
           $scope.units=1;
           $scope.height="";
           $scope.weight="";

       }
       else if(unitVar){
           $scope.units=2;
           $scope.feet="";
           $scope.inches="";
           $scope.weight="";
       }
    };

    $scope.showForm=true;


    $scope.calculateEMI=function(validation){
        $scope.bmiUnder = false;
        $scope.bmiHealthy = false;
        $scope.bmiOver = false;
        $scope.bmiObese = false;
        $scope.minWeight = 0;
        $scope.maxWeight = 0;
        $scope.weightRange = "";
        if(validation){
        $scope.showForm=false;
        if($scope.units==1){
            $scope.weightCal=$scope.weight/0.4536;
            $scope.heightCal=$scope.height/2.54;
            $scope.emiValue=(($scope.weightCal*703)/($scope.heightCal*$scope.heightCal)).toFixed(2);
            var mHt = $scope.height/100; //Height in meter
            $scope.minWeight = 18.6 * mHt * mHt; $scope.maxWeight = 24.9 * mHt * mHt; //Min and max weight
            $scope.weightRange = ""+Math.round($scope.minWeight)+" and "+Math.round($scope.maxWeight)+" kgs";
            console.log($scope.dob);
        }
        else if($scope.units==2){
            var inches = (12*$scope.feet)+(1*$scope.inches);
            $scope.emiValue=(($scope.weight*703)/(inches*inches)).toFixed(2);
            $scope.minWeight = ((18.6 * inches * inches) / 703); //Min weight lbs
            $scope.maxWeight = ((24.9 * inches * inches) / 703); //Max weight lbs
            $scope.weightRange = ""+Math.round($scope.minWeight)+" and "+Math.round($scope.maxWeight)+" lbs";
        }
        $window.emi=$scope.emiValue;
        callGraph();
        if($scope.emiValue < 18.5) {
            $scope.bmiUnder = true;
        }
        else if($scope.emiValue > 18.5 && $scope.emiValue < 25) {
            $scope.bmiHealthy = true;
        }
        else if($scope.emiValue > 25 && $scope.emiValue < 30) {
            $scope.bmiOver = true;
        }
        else if($scope.emiValue > 30) {
            $scope.bmiObese = true;
        }
      }
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
    $scope.returnToCalculate=function(){
        $scope.showForm=true;
    };

// To reset form
    $scope.reset=function(){
        $scope.showForm=true;
        $scope.bmiSubmitted=false;
        $scope.feet="";
        $scope.inches="";
        $scope.height="";
        $scope.dob="";
        $scope.weight="";
        $scope.email="";
        $scope.gender="";
        $scope.calculateForm.$setPristine();
    };


  //datepicker
    $('#dobForBMI1').datetimepicker({format: 'DD-MMM-YYYY', ignoreReadonly: true}).on('dp.change', function(selected){
        $('#dobIcon1').click(function()
        {
            $('#dobForBMI1').focus();

        });

        $scope.dob=$('#dobForBMI1').val();
    });

    $('#dobForBMI').datetimepicker({format: 'DD-MMM-YYYY', ignoreReadonly: true}).on('dp.change', function(selected){
        $('#dobIcon').click(function()
        {
            $('#dobForBMI').focus();

        });

        $scope.dob=$('#dobForBMI').val();
    });

    $timeout(function(){
        $scope.doGetNewsByUser();
        $scope.doGetTestimonialsByUser();
        $scope.doGetDashboardCount();
    });


}]);



// render image to view in list
commonApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);


commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

commonApp.filter('toSec', function() {

    return function(input) {

        dateArgs = input.match(/\d{2,4}/g),
            year = dateArgs[2],
            month = parseInt(dateArgs[1]) - 1,
            day = dateArgs[0],
            hour = dateArgs[3],
            minutes = dateArgs[4];

        var result = new Date(year, month, day, hour, minutes).getTime();

        return result || '';
    };
});
//Common Date Validation Directive
commonApp.directive('dateValidation', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ctrl) {
            
              ctrl.$parsers.unshift(function(value) {
                if(value){
                  // test and set the validity after update.
                  var valid = value.charAt(2) == '/' && value.charAt(5) == '/' && value.length == 10 && checkDate(value);
                  ctrl.$setValidity('invalidDate', valid);
                }
                // if it's valid, return the value to the model,
                // otherwise return undefined.
                return valid ? value : "undefined";
        });
                
                checkDate = function(inputDate) {
                    var dd = parseInt(inputDate.substr(0,2));
                    var mm = parseInt(inputDate.substr(3,4))-1;
                    var yy = parseInt(inputDate.substr(6,9));
                    var currentDate = new Date();
                    var userDOB = new Date(yy, mm, dd);
                    var minDate = new Date(1800, 0, 0);
                    if((userDOB > currentDate)||(userDOB < minDate) || (dd > 31) || (mm > 11)) {

                    
                     return false; 
                    }
                                          
                    else 
                        return true;                    
                };
    }
};
});

//Date Directive for US BMI calculation
commonApp.directive('dateValidationUs', function() {

    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ctrl) {
            
              ctrl.$parsers.unshift(function(value) {
                if(value){
                  // test and set the validity after update.
                  var valid = value.charAt(2) == '/' && value.charAt(5) == '/' && value.length == 10 && checkDateUS(value);
                  ctrl.$setValidity('invalidDate', valid);
                }

                // if it's valid, return the value to the model,
                // otherwise return undefined.
                return valid ? value : "undefined";
        });
                
                checkDateUS = function(inputDate) {
                    var mm = parseInt(inputDate.substr(0,2)-1);
                    var dd = parseInt(inputDate.substr(3,4));
                    var yy = parseInt(inputDate.substr(6,9));

                    var currentDate = new Date(yy,mm,dd);
                    var userDOB = new Date(yy, mm, dd);
                    var minDate = new Date(1800, 0, 0);
                    if((userDOB > currentDate)||(userDOB < minDate) || (dd > 31) || (mm > 11)) {
                        return false; 
                    }                                        
                    else 
                    {
                        return true;         
                    }
                                   
                };
    }
};
});

//Date Directive for Metric BMI calculation
commonApp.directive('dateValidationIn', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ctrl) {
            
              ctrl.$parsers.unshift(function(value) {
                if(value){
                  // test and set the validity after update.
                  var valid = value.charAt(2) == '/' && value.charAt(5) == '/' && value.length == 10 && checkDateIN(value);
                  ctrl.$setValidity('invalidDate', valid);
                }

                // if it's valid, return the value to the model,
                // otherwise return undefined.
                return valid ? value : "undefined";
        });
                
                checkDateIN = function(inputDate) {
                    var dd = parseInt(inputDate.substr(0,2));
                    var mm = parseInt(inputDate.substr(3,4))-1;
                    var yy = parseInt(inputDate.substr(6,9));
                    var currentDate = new Date();
                    var userDOB = new Date(yy, mm, dd);
                    var minDate = new Date(1800, 0, 0);
                    if((userDOB > currentDate)||(userDOB < minDate) || (dd > 31) || (mm > 11)) {

                    
                     return false; 
                    }
                                          
                    else 
                        return true;                    
                };
    }
};
});



