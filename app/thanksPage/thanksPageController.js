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
   var paymentConfirmDetails={};
   paymentConfirmDetails.payId=paymentResponse.paymentId;
   paymentConfirmDetails.payerId=paymentResponse.PayerID;
   paymentConfirmDetails.courseid=parseInt($routeParams.id);


   $scope.completed=false; 

     $scope.doExcecutePayment = function(paymentConfirmDetails){
        requestHandler.postRequest("user/enrollCourseExecute/",paymentConfirmDetails).then(function(response){
            $scope.completed=true; 
            $scope.urlPage="http://localhost/cyber/views/user/#/courseDetail/"+$routeParams.id;
            var delay = 5 ;
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

            
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doExcecutePayment(paymentConfirmDetails);

});