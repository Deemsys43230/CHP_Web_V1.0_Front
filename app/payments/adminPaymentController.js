var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('AdminPaymentController',function($scope,requestHandler,Flash,$routeParams) {

    $scope.totalEarningsByAdmin=0.00;
    $scope.totalEarningsByCoach=0.00;

    //Main Function returns the list
    $scope.doGetCoursePaymentDetails = function(pageno){

        $scope.loaded=true;
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
            $scope.loaded=false;
        });
    };
    //End Function returns the list

    //Detail of subscribers
    $scope.doGetCourseSubsciberList = function(pageno){
        $scope.pagination.current=pageno;
        $scope.offset=(pageno-1)*$scope.itemsPerPage;
        $scope.limit=pageno*$scope.itemsPerPage;
        $scope.loaded=true;

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
            $scope.loaded=false;
        });
    };
    //End Subscriber returns the list


    //Coach List
    $scope.doGetCoachList = function(){
        $scope.loaded=true;
        //In practice this should be in a factory.
        requestHandler.getRequest("admin/coachListPayment/","").then(function(response){
            $scope.coachList = response.data.CoachList;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
    };
    //End coach list

    //Detail of subscribers
    $scope.doGetCoachSubscribersList = function(pageno){
        $scope.pagination.current=pageno;
        $scope.offset=(pageno-1)*$scope.itemsPerPage;
        $scope.limit=pageno*$scope.itemsPerPage;
        $scope.loaded=true;

        if($scope.subscriberSearch==undefined){
            $scope.subscriberSearch="";
        }

        $scope.params={
            "coachid":$routeParams.id,
            "limit":$scope.limit,
            "offset":$scope.offset,
            "searchname":$scope.subscriberSearch,
            "sortid":$scope.sortId,
            "sorttype":$scope.sorttype
        };

        //In practice this should be in a factory.
        requestHandler.postRequest("admin/paymentHistoryforCoach/",$scope.params).then(function(response){
            $scope.coachPaymentHistory = [];
            $scope.coachPaymentHistory = response.data.coachPaylist;
            $scope.total_count=response.data.totalrecordcount;
            $scope.loaded=false;
        });

    };
    //End Subscriber returns the list


    //Subscription Details - Course
    $scope.doGetSubscriberDetailView = function(){
        //In practice this should be in a factory.
        $scope.loaded=true;
        requestHandler.postRequest("admin/detailViewofCourseTransactionbyAdmin/",{"paymentid":$routeParams.id}).then(function(response){
            $scope.coursePurchaseDetailView=response.data.course_purchase_detail;
            $scope.loaded=false;
        });
    };
    //End Subscriber returns the list

    //Coach Subscription Details - Course
    $scope.doGetCoachSubscriberDetailView = function(){
        //In practice this should be in a factory.
        $scope.loaded=true;
        requestHandler.postRequest("admin/detailViewofsubscriptionTransactionbyAdmin/",{"paymentid":$routeParams.id}).then(function(response){
            $scope.coachSubscriptionDetailView=response.data.subscription_transaction_detail;
            $scope.loaded=false;
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
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down'];

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



    $scope.sortingCoachSubscriber = function(id){
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
        $scope.doGetCoachSubscribersList(1);
    };

    $scope.totalEarnbycourse=function(){
        requestHandler.getRequest("admin/totalShareByCourse/","").then(function(response){
            $scope.totalEarningsByAdmin=response.data.totalearningsAdmin;
            $scope.totalEarningsByCoach=response.data.totalearningsCoach;
        });
    };

    $scope.totalEarnByCourseId=function(){
        requestHandler.postRequest("admin/adminandcoachsharebyCourseid/",{"courseid":$routeParams.id}).then(function(response){
            $scope.totalEarningsByAdmin=response.data.totalearningsAdmin;
            $scope.totalEarningsByCoach=response.data.totalearningsCoach;
        });
    };

    $scope.totalEarnByCoaches=function(){
        requestHandler.getRequest("admin/totalShareByCoach/","").then(function(response){
            $scope.totalEarningsByAdmin=response.data.totalearningsAdmin;
            $scope.totalEarningsByCoach=response.data.totalearningsCoach;
        });
    };

    $scope.totalEarnByCoachId=function(){
        requestHandler.postRequest("admin/adminandcoachsharebyCoachid/",{"coachid":$routeParams.id}).then(function(response){
            $scope.totalEarningsByAdmin=response.data.totalearningsAdmin;
            $scope.totalEarningsByCoach=response.data.totalearningsCoach;
        });
    };

    $scope.coachSortIcons={
        coachname:"fa fa-caret-down",
        coachsubscriptioncount:"fa fa-caret-down",
        coachonemonthpay:"fa fa-caret-down",
        toatlearningsCoach:"fa fa-caret-down",
        totalearningsAdmin:"fa fa-caret-down"
    };

    $scope.sortBy=function(sortKey){
        $scope.sortKey=sortKey;
        $scope.reverse = !$scope.reverse;
        var sortKeyStore=$scope.coachSortIcons[sortKey];
        $scope.coachSortIcons={
            coachname:"fa fa-caret-down",
            coachsubscriptioncount:"fa fa-caret-down",
            coachonemonthpay:"fa fa-caret-down",
            toatlearningsCoach:"fa fa-caret-down",
            totalearningsAdmin:"fa fa-caret-down"
        };
        if(sortKeyStore=="fa fa-caret-down")$scope.coachSortIcons[sortKey]="fa fa-caret-up";
        else $scope.coachSortIcons[sortKey]="fa fa-caret-down";
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
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down'];
        $scope.doGetCoursePaymentDetails(1);
        $scope.totalEarnbycourse();
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
        $scope.totalEarnByCourseId();
    };

    $scope.coachListInit=function(){
        $scope.paginationLoad=false;
        $scope.doGetCoachList();
        $scope.totalEarnByCoaches();
    };

    $scope.coachSubscribersListInit=function(){
        $scope.itemsPerPage = 10;
        $scope.subscriberSearch="";
        $scope.sortId="";
        $scope.sorttype="";

        //Initialize Pagination
        $scope.pagination = {
            current: 1
        };

        //Object + 1 icons needed NOTE //Initialize Icon
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down'];

        $scope.doGetCoachSubscribersList(1);
        $scope.totalEarnByCoachId();
    };

    $scope.subscribersDetailInit=function(){
         $scope.doGetSubscriberDetailView();
    };

    $scope.coachSubscribersDetailInit=function(){
         $scope.doGetCoachSubscriberDetailView();
    };

});


// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


adminApp.filter('startsWithLetterFood', function () {

    return function (items, foodsearch) {
        var filtered = [];
        var letterMatch = new RegExp(foodsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.coachname)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});