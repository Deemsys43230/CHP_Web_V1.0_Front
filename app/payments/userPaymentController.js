var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

userApp.controller('UserPaymentController',function($scope,requestHandler,Flash,$routeParams) {

    // To display Course list by user
    $scope.doGetMyCourseListByUser=function(){
        requestHandler.getRequest("user/getMyCoursePurchaseList/", "").then(function(response){
            $scope.usercourselist=response.data.courselist;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.getPaymentDetails=function(){
        requestHandler.getRequest("getCoachIndividualDetailbyUser/"+$routeParams.id, "").then(function(response){
            $scope.paymentDetails=response.data.getCoachIndividualDetail;
            console.log($scope.paymentDetails);
        });
    };

    // To display Coach list by user
    $scope.doGetMyCoachListByUser=function(){
        requestHandler.getRequest("user/getallCoachListbyUser/", "").then(function(response){
            $scope.usercourselist=response.data.getallCoachListbyUser;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.getCoachPaymentDetails=function(){
        requestHandler.getRequest("getCoachIndividualDetailbyUser/"+$routeParams.id, "").then(function(response){
            $scope.paymentDetails=response.data.getCoachIndividualDetail;
            console.log($scope.paymentDetails);
        });
    };

    var original="";
    $scope.doGetPaypalDetails = function(){
        requestHandler.getRequest("getUserSettings/","").then(function(response){
            original=angular.copy(response.data.User_Settings[0]);
            $scope.paypalDetails=response.data.User_Settings[0];
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };


    $scope.doUpdatePaypalDetails=function(){
        requestHandler.putRequest("updateUserSettings/",$scope.paypalDetails).then(function(response){

            successMessage(Flash,"Successfully Updated!");
        },function(){
            errorMessage(Flash,"Please try again later");
        });
    };

    $scope.isCleanPaypalSettings=function(){
        return angular.equals(original, $scope.paypalDetails);
    };

    $scope.doGetCurrencyCode = function(){
        requestHandler.getRequest("getCurrencyCode/","").then(function(response){
            $scope.currencycodeData=response.data.CurrencyCode_Data;
        },function(response){
            errorMessage(Flash,"Please Try again later");
        });
    };

    $scope.getSettingDetails = function(){
        $scope.doGetCurrencyCode();
        $scope.doGetPaypalDetails();
    };

     $scope.courseListInit=function(){
        $scope.doGetMyCourseListByUser();
    };

    $scope.paymentDetails=function(){
        $scope.getPaymentDetails();
    };

    $scope.coachListInit=function(){
        $scope.doGetMyCoachListByUser();
    };

    $scope.coachPaymentDetails=function(){
        $scope.getCoachPaymentDetails();
    };

});


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);