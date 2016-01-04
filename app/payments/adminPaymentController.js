var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('AdminPaymentController',function($scope,requestHandler,Flash,$routeParams) {

    $scope.pageno = 1;
    $scope.total_count = 60;
    $scope.itemsPerPage = 10;

    $scope.doGetCourseList = function(pageno){
        //In practice this should be in a factory.
        requestHandler.postRequest("getPublishedCourse/",{'offset':pageno}).then(function(response){
            $scope.courses = [];
            $scope.courses = response.data.published_Course;
        });
    };

    $scope.doGetStudentList = function(pageno){
        alert($routeParams.id);
        //In practice this should be in a factory.
        requestHandler.postRequest("getPublishedCourse/",{'offset':pageno}).then(function(response){
            $scope.students = [];
            $scope.students = response.data.published_Course;
        });
    };

    $scope.doGetCoursePuchaseDetails = function(){
        alert($routeParams.id);
        //In practice this should be in a factory.
        requestHandler.postRequest("courseDetail/",{'courseid':$routeParams.id}).then(function(response){
            $scope.coursePurchsedDeatils = response.data.coursedetail;
        });
    };


    var iconList={};
    iconList.coursename="fa fa-caret-down";
    iconList.coachname="fa fa-caret-down";
    iconList.publishedon="fa fa-caret-down";
    iconList.enrollcount="fa fa-caret-down";
    iconList.ownerid="fa fa-caret-down";

    $scope.sortIcon=iconList;
    $scope.orderBy=0;
    $scope.currentOrderId='';

    //sorting by food Id
    $scope.sortList = function(id){
        var iconList={};
        iconList.coursename="fa fa-caret-down";
        iconList.coachname="fa fa-caret-down";
        iconList.publishedon="fa fa-caret-down";
        iconList.enrollcount="fa fa-caret-down";
        iconList.ownerid="fa fa-caret-down";

        if($scope.currentOrderId==''||$scope.currentOrderId!=id){
            $scope.currentOrderId=id;
            iconList[id]="fa fa-caret-up";
            $scope.orderBy=1;
            $scope.sortIcon=iconList;
        }
        else{
            if($scope.orderBy==0){
                iconList[id]="fa fa-caret-up";
                $scope.orderBy=1;
                $scope.sortIcon=iconList;
            }
            else{
                iconList[id]="fa fa-caret-down";
                $scope.orderBy=0;
                $scope.sortIcon=iconList;
            }
        }

        var searchObject={};
        if(!$scope.courseSearch){
            searchObject.keyid=id;
            searchObject.orderby=$scope.orderBy;
            searchObject.searchtext="";
            console.log(searchObject);
        }
        else{
            searchObject.keyid=id;
            searchObject.orderby=$scope.orderBy;
            searchObject.searchtext=$scope.courseSearch;
            console.log(searchObject);
        }
    };

    $scope.doGetCourseSearch=function(){
        $scope.sortIcon=iconList;
        $scope.currentOrderId='';
        $scope.doGetCourseList(1);
        var searchObject={};
        if(!$scope.courseSearch){
            searchObject.keyid="";
            searchObject.orderby="";
            searchObject.searchtext="";
            console.log(searchObject);
        }
        else{
            searchObject.keyid="";
            searchObject.orderby="";
            searchObject.searchtext=$scope.courseSearch;
            console.log(searchObject);
        }
    };

    $scope.init=function(){
        $scope.doGetCourseList($scope.pageno);
    };

    $scope.studentlistinit=function(){
        $scope.doGetStudentList($scope.pageno);
    };

    $scope.studentlistdetailinit=function(){
        $scope.doGetCoursePuchaseDetails();
    };

});


// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);