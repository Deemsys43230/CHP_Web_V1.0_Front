var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule']);
userApp.controller('ThanksSubscribePageController',function($scope,requestHandler,$location,$routeParams) {
    var paymentResponse=$location.search();
    $scope.completed=false;
    $scope.transactionSucceed=true;
    $scope.enroll="SUBSCRIPTION";
    $scope.thanksEnroll="YOUR SUBSCRIPTION WAS SUCCESSFULLY COMPLETED";

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
        $scope.urlPage="http://localhost/cyber/views/user/#/coachView/"+$routeParams.id;
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
                    $scope.transactionSucceed=false;
                    $scope.urlPage="http://localhost/cyber/views/user/#/coachSearch";
                    $scope.countDownTimer($scope.urlPage,"coach search");
                }
                else{
                    $scope.transactionSucceed=true;
                    $scope.completed=true;
                    $scope.urlPage="http://localhost/cyber/views/user/#/coachView/"+$routeParams.id;
                    $scope.countDownTimer($scope.urlPage,"coach view");
                }
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        };
        console.log(paymentConfirmDetails);
        $scope.doExcecutePayment(paymentConfirmDetails);
    }
});

userApp.controller('ThanksEnrollPageController',function($scope,requestHandler,$location,$window,$routeParams) {

    var paymentResponse=$location.search();
    $scope.completed=false;
    $scope.transactionSucceed=true;
    $scope.enroll="ENROLLMENT";
    $scope.thanksEnroll="YOUR HAVE SUCCESSFULLY ENROLLED THIS COURSE";

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
        $scope.urlPage="http://localhost/cyber/views/user/#/courseDetail/"+$routeParams.id;
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
                    $scope.transactionSucceed=false;
                    $scope.urlPage="http://localhost/cyber/views/user/#/courses";
                    $scope.countDownTimer($scope.urlPage,"course search");
                }
                else{
                    $scope.transactionSucceed=true;
                    $scope.completed=true;
                    $scope.urlPage="http://localhost/cyber/views/user/#/courseDetail/"+$routeParams.id;
                    $scope.countDownTimer($scope.urlPage,"course");
                }
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        };
        $scope.doExcecutePayment(paymentConfirmDetails);
    }
});