var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('CoachPaymentController',function($scope,requestHandler,Flash,$routeParams) {

    // To display Course list by user
    $scope.doGetMyCourseListByUser=function(){
        requestHandler.getRequest("coach/listofPublishedCoursePayment/","").then(function(response) {
            $scope.myCourseList = response.data.courselist;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetCourseTotalEarnings=function(){
        requestHandler.getRequest("coach/totalEarningsInCourse/","").then(function(response) {
            $scope.totalearnings = response.data.totalearnings;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetMyStudentListByCourse=function(){
        requestHandler.postRequest("coach/courseTransactionHistory/",{"courseid":$routeParams.id,"offset":0,"limit":10,"searchname":"","sortid":"","sorttype":""}).then(function(response) {
            $scope.studentList = response.data.purchasehistory.purchasedList;
            console.log("asda",$scope.studentList);
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetPerCourseTotalEarnings=function(){
        requestHandler.postRequest("coach/totalEarningsbyCourse/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.coursetotalearnings = response.data.toatlearnings;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // To display Coach list by user
    $scope.doGetMyStudentListByCoach=function(){
        requestHandler.postRequest("coach/coachSubscribedTransactionHistory/",{"offset":0,"limit":10,"searchname":"","sortid":"","sorttype":""}).then(function(response) {
            $scope.subscribedList = response.data.purchasehistory.purchasedList;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetTotalSubscriptionEarnings=function(){
        requestHandler.getRequest("coach/totalEarningsbySubscription/","").then(function(response) {
            $scope.subscriptiontotalearnings = response.data.toatlearnings;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetSubscriptionDetails =function(){
            requestHandler.postRequest("coach/detailViewofsubscriptionTransaction/",{"paymentid":$routeParams.id}).then(function(response) {
            $scope.outwardDetails = response.data.subscription_transaction_detail.outwarddetail;
                console.log("jgfghf",$scope.outwardDetails);
            $scope.coachDetails = response.data.subscription_transaction_detail.coachdetail;
            $scope.userdetail =  response.data.subscription_transaction_detail.userdetail;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.courseListInit=function(){
        $scope.doGetMyCourseListByUser();
        $scope.doGetCourseTotalEarnings();
    };

    $scope.studentListInit=function(){
        $scope.doGetMyStudentListByCourse();
        $scope.doGetPerCourseTotalEarnings();
    };

    $scope.studentSubscriptionList=function(){
        $scope.doGetMyStudentListByCoach();
        $scope.doGetTotalSubscriptionEarnings();
    };

    $scope.studentSubscriptionDetailsInit=function(){
        $scope.doGetSubscriptionDetails();
    };

});


// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);