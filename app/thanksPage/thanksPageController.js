var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule']);
userApp.controller('ThanksSubscribePageController',['$scope','requestHandler','$location','$routeParams',function($scope,requestHandler,$location,$routeParams) {
    var paymentResponse=$location.search();
    $scope.completed=false;
    $scope.transactionSucceed=true;
    $scope.enroll="SUBSCRIPTION";
    $scope.thanksEnroll="WE HAVE PROCESSING WITH YOUR PAYMENTS";

    $scope.countDownTimer = function(url,redirectPageName){
        var delay = 5 ;
        var timer=setInterval(function(){countdown()}, 1000) ;
        function countdown() {
            $('#countmesg').html("You will be redirecting to the "+redirectPageName+" page in "  + delay  + " seconds.");
            delay --;
            if (delay < 0 ) {
                clearInterval(timer);
                window.location = url ;
                delay = 0 ;
            }
        }
    };

    if($.isEmptyObject(paymentResponse)){
        $scope.completed=true;
        $scope.transactionSucceed=true;
        $scope.urlPage=requestHandler.paymentURL()+"/#/coachView/"+$routeParams.id;
        $scope.countDownTimer($scope.urlPage,"course");
    }
    else{
        var paymentConfirmDetails={};
        paymentConfirmDetails.payId=paymentResponse.paymentId;
        paymentConfirmDetails.payerId=paymentResponse.PayerID;
        paymentConfirmDetails.coachid=parseInt($routeParams.id);
        paymentConfirmDetails.month=parseInt($routeParams.month);

        $scope.doExcecutePayment = function(paymentConfirmDetails){
            requestHandler.postRequest("user/subscribeCoachExecute/",paymentConfirmDetails).then(function(response){
                if(response.data.Response_status==0){
                    $scope.completed=true;
                    $scope.transactionSucceed=false;
                    $scope.urlPage=requestHandler.paymentURL()+"/#/coachSearch";
                    $scope.countDownTimer($scope.urlPage,"coach search");
                }
                else{
                    $scope.thanksEnroll="YOUR SUBSCRIPTION WAS SUCCESSFULLY COMPLETED";
                    $scope.transactionSucceed=true;
                    $scope.completed=true;
                    $scope.urlPage=requestHandler.paymentURL()+"/#/coachView/"+$routeParams.id;
                    $scope.countDownTimer($scope.urlPage,"coach view");
                }
            },function(){
                $scope.completed=true;
                $scope.transactionSucceed=false;
                $scope.urlPage=requestHandler.paymentURL()+"/#/coachSearch";
                $scope.countDownTimer($scope.urlPage,"coach search");
            });
        };
        console.log(paymentConfirmDetails);
        $scope.doExcecutePayment(paymentConfirmDetails);
    }
}]);

userApp.controller('ThanksEnrollPageController',['$scope','requestHandler','$location','$window','$routeParams',function($scope,requestHandler,$location,$window,$routeParams) {

    var paymentResponse=$location.search();
    $scope.completed=false;
    $scope.transactionSucceed=true;
    $scope.enroll="ENROLLMENT";
    $scope.thanksEnroll="WE HAVE PROCESSING WITH YOUR PAYMENTS";

    $scope.countDownTimer = function(url,redirectPageName){
        var delay = 5 ;
        var timer=setInterval(function(){countdown()}, 1000) ;
        function countdown() {
            $('#countmesg').html("You will be redirecting to the "+redirectPageName+" page in "  + delay  + " seconds.");
            delay --;
            if (delay < 0 ) {
                clearInterval(timer);
                window.location = url ;
                delay = 0 ;
            }
        }
    };

    if($.isEmptyObject(paymentResponse)){
        $scope.completed=true;
        $scope.transactionSucceed=true;
        $scope.urlPage=requestHandler.paymentURL()+"/#/courseDetail/"+$routeParams.id;
        $scope.countDownTimer($scope.urlPage,"course");
    }
    else{
        var paymentConfirmDetails={};
        paymentConfirmDetails.payId=paymentResponse.paymentId;
        paymentConfirmDetails.payerId=paymentResponse.PayerID;
        paymentConfirmDetails.courseid=parseInt($routeParams.id);

        console.log(paymentConfirmDetails);

        $scope.doExcecutePayment = function(paymentConfirmDetails){
            requestHandler.postRequest("user/enrollCourseExecute/",paymentConfirmDetails).then(function(response){
                if(response.data.Response_status==0){
                    $scope.completed=true;
                    $scope.transactionSucceed=false;
                    $scope.urlPage=requestHandler.paymentURL()+"/#/courses";
                    $scope.countDownTimer($scope.urlPage,"course search");
                }
                else{
                    $scope.thanksEnroll="YOUR HAVE SUCCESSFULLY ENROLLED THIS COURSE";
                    $scope.transactionSucceed=true;
                    $scope.completed=true;
                    $scope.urlPage=requestHandler.paymentURL()+"/#/courseDetail/"+$routeParams.id;
                    $scope.countDownTimer($scope.urlPage,"course");
                }
            },function(){
                $scope.completed=true;
                $scope.transactionSucceed=false;
                $scope.urlPage=requestHandler.paymentURL()+"/#/courses";
                $scope.countDownTimer($scope.urlPage,"course search");
            });
        };
        $scope.doExcecutePayment(paymentConfirmDetails);
    }
}]);