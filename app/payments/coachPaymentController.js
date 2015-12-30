var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('CoachPaymentController',function($scope,requestHandler,Flash,$routeParams) {

    // To display Course list by user
    $scope.doGetMyCourseListByUser=function(){
        requestHandler.getRequest("coach/getCourseList/","").then(function(response) {
            $scope.myCourseList = response.data.course.course_list;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetMyStudentListByCourse=function(){
        requestHandler.getRequest("coach/getCourseList/","").then(function(response) {
            $scope.studentList = response.data.course.course_list;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.getPaymentDetails=function(){
        requestHandler.getRequest("getCoachIndividualDetailbyUser/"+$routeParams.id, "").then(function(response){
            $scope.paymentDetails=response.data.getCoachIndividualDetail;
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

    $scope.courseListInit=function(){
        $scope.doGetMyCourseListByUser();
    };

    $scope.studentListInit=function(){
        $scope.doGetMyStudentListByCourse();
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
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);