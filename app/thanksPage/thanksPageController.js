var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule']);
userApp.controller('ThanksSubscribePageController',function($scope,requestHandler,$location,$routeParams) {
    $scope.urlPage="http://localhost/cyber/views/user/#/coachView/"+$routeParams.id;

        var delay = 10 ;
        var url = $scope.urlPage;
        var timer=setInterval(function(){countdown()}, 1000) ;
        function countdown() {
            $('#countmesg').html("Redirecting in "  + delay  + " seconds.");
            delay --;
            if (delay < 0 ) {
                clearInterval(timer);
                window.location = url ;
                delay = 0 ;
            }
        }

});

userApp.controller('ThanksEnrollPageController',function($scope,requestHandler,$location,$window,$routeParams) {

    var paymentResponse=$location.search();
    $scope.completed=false;
    $scope.transactionSucceed=true;

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

    if(!paymentResponse){
        var paymentConfirmDetails={};
        paymentConfirmDetails.payId=paymentResponse.paymentId;
        paymentConfirmDetails.payerId=paymentResponse.PayerID;
        paymentConfirmDetails.courseid=parseInt($routeParams.id);
        $scope.completed=true;
        $scope.doExcecutePayment = function(paymentConfirmDetails){
            requestHandler.postRequest("user/enrollCourseExecute/",paymentConfirmDetails).then(function(response){
                if(response.data.Response_status==0){
                    $scope.transactionSucceed=false;
                    $scope.urlPage="http://localhost/cyber/views/user/#/courses";
                    $scope.countDownTimer($scope.urlPage,"course search");
                }
                else{
                    $scope.transactionSucceed=true;
                    $scope.urlPage="http://localhost/cyber/views/user/#/courseDetail/"+$routeParams.id;
                    $scope.countDownTimer($scope.urlPage,"course");
                }
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        };

        $scope.doExcecutePayment(paymentConfirmDetails);
    }
    else{
        $scope.completed=true;
        $scope.transactionSucceed=true;
        $scope.urlPage="http://localhost/cyber/views/user/#/courseDetail/"+$routeParams.id;
        $scope.countDownTimer($scope.urlPage,"course");
    }
});