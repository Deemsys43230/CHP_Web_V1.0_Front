var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('AdminPaymentController',function($scope,requestHandler,Flash,$routeParams) {


    //Main Function returns the list
    $scope.doGetCoursePaymentDetails = function(pageno){
       $scope.pagination.current=pageno;
       $scope.offset=(pageno-1)*$scope.itemsPerPage;
       $scope.limit=pageno*$scope.itemsPerPage;

       if($scope.courseSearch==undefined){
           $scope.courseSearch="";
       }

        $scope.params={
            "limit":$scope.limit,
            "offset":$scope.offset,
            "searchname":$scope.courseSearch,
            "sortid":$scope.sortId,
            "sorttype":$scope.sorttype
        };

        //In practice this should be in a factory.
        requestHandler.postRequest("admin/publishedCoursePaymentlist/",$scope.params).then(function(response){
            $scope.courses = [];
            $scope.courses = response.data.courselist;
            $scope.total_count=response.data.totalrecordcount;
        });
    };
    //End Function returns the list

    //Detail of subscribers
    $scope.doGetCourseSubsciberList = function(pageno){
        $scope.pagination.current=pageno;
        $scope.offset=(pageno-1)*$scope.itemsPerPage;
        $scope.limit=pageno*$scope.itemsPerPage;

        if($scope.courseSearch==undefined){
            $scope.courseSearch="";
        }

        $scope.params={
            "courseid":$routeParams.id,
            "limit":$scope.limit,
            "offset":$scope.offset,
            "searchname":$scope.courseSearch,
            "sortid":$scope.sortId,
            "sorttype":$scope.sorttype
        };

        //In practice this should be in a factory.
        requestHandler.postRequest("admin/paymentHistoryforCourse/",$scope.params).then(function(response){
            $scope.coursesPaymentHistory = [];
            $scope.coursesPaymentHistory = response.data.coursePaylist.paymentHistory;
            $scope.total_count=response.data.totalrecordcount;
        });
    };
    //End Subscriber returns the list


    //Subscription Details - Course
    $scope.doGetSubscriberDetailView = function(){

        //In practice this should be in a factory.
        requestHandler.postRequest("admin/detailViewofCourseTransactionbyAdmin/",{
            "paymentid":$routeParams.id
        }).then(function(response){
            $scope.coursePurchaseDetailView=response.data;
        });
    };
    //End Subscriber returns the list

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


    $scope.sortingCourse = function(id){
        $scope.sortId=id;
        var currentOrder=$scope.sortIcon[id];
        //Object + 1 icons needed NOTE
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down'];

        if(currentOrder=='fa fa-caret-down'){
            $scope.sortIcon[id]='fa fa-caret-up';
            $scope.sorttype=2;
        }else{
            $scope.sortIcon[id]='fa fa-caret-down';
            $scope.sorttype=1;
        }
        $scope.doGetCoursePaymentDetails(1);
    };
    $scope.sortingCourseSubscriber = function(id){
        $scope.sortId=id;
        var currentOrder=$scope.sortIcon[id];
        //Object + 1 icons needed NOTE
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down'];

        if(currentOrder=='fa fa-caret-down'){
            $scope.sortIcon[id]='fa fa-caret-up';
            $scope.sorttype=2;
        }else{
            $scope.sortIcon[id]='fa fa-caret-down';
            $scope.sorttype=1;
        }
        $scope.doGetCourseSubsciberList(1);
    };

    $scope.init=function(){
        $scope.itemsPerPage = 10;
        $scope.courseSearch="";
        $scope.sortId="";
        $scope.sorttype="";

        //Initialize Pagination
        $scope.pagination = {
            current: 1
        };

        //Object + 1 icons needed NOTE //Initialize Icon
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down'];
        $scope.doGetCoursePaymentDetails(1);
    };

    $scope.subscribersListInit=function(){
        $scope.itemsPerPage = 10;
        $scope.courseSearch="";
        $scope.sortId="";
        $scope.sorttype="";

        //Initialize Pagination
        $scope.pagination = {
            current: 1
        };

        //Object + 1 icons needed NOTE //Initialize Icon
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down'];
        $scope.doGetCourseSubsciberList(1);
    };


    $scope.subscribersDetailInit=function(){
         $scope.doGetSubscriberDetailView();
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