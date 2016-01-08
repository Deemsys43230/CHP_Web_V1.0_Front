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
        //In practice this should be in a factory.
        requestHandler.postRequest("getPublishedCourse/",{'offset':pageno}).then(function(response){
            $scope.students = [];
            $scope.students = response.data.published_Course;
        });
    };

    $scope.doGetCoursePuchaseDetails = function(){
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

    $scope.doViewInwardDetails=function(id){
        $scope.title = "Payment Inward Details";

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#inwardDetailView").fadeIn(600);
            $(".common_model").show();
        });

        //$scope.loaded=true;

        /*****************Get Inward Details****************/

       /* requestHandler.postRequest("admin/gettypeIndividualDetail/",{'typeid':id}).then(function(response){
            $scope.exerciseType=response.data.IndividualtypeData;
            $scope.loaded=false;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
        */
        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#inwardDetailView").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#inwardDetailView").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.doViewOutwardDetails=function(id){
        $scope.title = "Payment Outward Details";

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#outwardDetailView").fadeIn(600);
            $(".common_model").show();
        });

        //$scope.loaded=true;

        /*****************Get Inward Details****************/

       /* requestHandler.postRequest("admin/gettypeIndividualDetail/",{'typeid':id}).then(function(response){
            $scope.exerciseType=response.data.IndividualtypeData;
            $scope.loaded=false;
            $scope.paginationLoad=true;

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
        */
        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#outwardDetailView").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#outwardDetailView").hide();
            $("#lean_overlay").hide();
        });
    };

});


// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);