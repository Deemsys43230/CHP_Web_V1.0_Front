var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('CoachPaymentController',function($scope,requestHandler,Flash,$routeParams) {

    $scope.paginationLoad=false;
    $scope.activeClass.payments='active';

    // To display Course list by user
    $scope.doGetMyCourseListByUser=function(){
        requestHandler.getRequest("coach/listofPublishedCoursePayment/","").then(function(response) {
            $scope.myCourseList = response.data.courselist;
            $scope.paginationLoad=true;
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

    $scope.doGetMySubscribersListByCourse=function(pageno){

        $scope.pagination.current=pageno;
        $scope.offset=(pageno-1)*$scope.itemsPerPage;
        $scope.limit=pageno*$scope.itemsPerPage;
        $scope.loaded=true;

        if($scope.subscriberSearch==undefined){
            $scope.subscriberSearch="";
        }

        $scope.params={
            "courseid":$routeParams.id,
            "limit":$scope.limit,
            "offset":$scope.offset,
            "searchname":$scope.subscriberSearch,
            "sortid":$scope.sortId,
            "sorttype":$scope.sorttype
        };

        requestHandler.postRequest("coach/courseTransactionHistory/",$scope.params).then(function(response) {
            $scope.subscribersList = response.data.purchasehistory;
            $scope.total_count=response.data.totalrecordcount;
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.sortingCourseSubscriber = function(id){
        $scope.sortId=id;
        var currentOrder=$scope.sortIcon[id];
        //Object + 1 icons needed NOTE
        $scope.sortIcon=['fa fa-caret-up','fa fa-caret-up','fa fa-caret-up','fa fa-caret-up','fa fa-caret-up'];

        if(currentOrder=='fa fa-caret-up'){
            $scope.sortIcon[id]='fa fa-caret-down';
            $scope.sorttype=1;
        }else{
            $scope.sortIcon[id]='fa fa-caret-up';
            $scope.sorttype=2;
        }
        $scope.doGetMySubscribersListByCourse(1);
    };

    $scope.sortingCoachSubscriber = function(id){
        $scope.sortId=id;
        var currentOrder=$scope.sortIcon[id];
        //Object + 1 icons needed NOTE
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down'];

        if(currentOrder=='fa fa-caret-down'){
            $scope.sortIcon[id]='fa fa-caret-up';
            $scope.sorttype=2;
        }else{
            $scope.sortIcon[id]='fa fa-caret-down';
            $scope.sorttype=1;
        }
        $scope.doGetMySubscribersListByCoach(1);
    };

    $scope.doViewPaymentDetails=function(outwardid){

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#paymentView").fadeIn(600);
            $(".common_model").show();
        });

        $scope.loaded=true;

        requestHandler.postRequest("outwardPaymentDetail/",{'outwardid':outwardid}).then(function(response){
            $scope.paymentDetails=response.data.outwardDetails;
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#paymentView").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#paymentView").hide();
            $("#lean_overlay").hide();
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
    $scope.doGetMySubscribersListByCoach=function(pageno){

        $scope.pagination.current=pageno;
        $scope.offset=(pageno-1)*$scope.itemsPerPage;
        $scope.limit=pageno*$scope.itemsPerPage;
        $scope.loaded=true;

        if($scope.subscriberSearch==undefined){
            $scope.subscriberSearch="";
        }

        $scope.params={
            "limit":$scope.limit,
            "offset":$scope.offset,
            "searchname":$scope.subscriberSearch,
            "sortid":$scope.sortId,
            "sorttype":$scope.sorttype
        };

        requestHandler.postRequest("coach/coachSubscribedTransactionHistory/",$scope.params).then(function(response) {
            $scope.subscribedList = response.data.purchasehistory.purchasedList;
            $scope.total_count=response.data.totalrecordcount;
            $scope.loaded=false;
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

    $scope.subscribersListInit=function(){
        $scope.itemsPerPage = 10;
        $scope.subscriberSearch="";
        $scope.sortId="";
        $scope.sorttype="";

        //Initialize Pagination
        $scope.pagination = {
            current: 1
        };

        //Object + 1 icons needed NOTE //Initialize Icon
        $scope.sortIcon=['fa fa-caret-up','fa fa-caret-up','fa fa-caret-up','fa fa-caret-up','fa fa-caret-up'];

        $scope.doGetMySubscribersListByCourse(1);
        $scope.doGetPerCourseTotalEarnings();
    };

    $scope.SubscriptionList=function(){
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

        $scope.doGetMySubscribersListByCoach(1);
        $scope.doGetTotalSubscriptionEarnings();
    };

    $scope.courseSortIcons={
        coursename:"fa fa-caret-down",
        categoryname:"fa fa-caret-down",
        publishedon:"fa fa-caret-down",
        courseamount:"fa fa-caret-down",
        enrollcount:"fa fa-caret-down",
        toatlearnings:"fa fa-caret-down"
    };

    $scope.sortBy=function(sortKey){
        $scope.sortKey=sortKey;
        $scope.reverse = !$scope.reverse;
        var sortKeyStore=$scope.courseSortIcons[sortKey];
        $scope.courseSortIcons={
            coursename:"fa fa-caret-down",
            categoryname:"fa fa-caret-down",
            publishedon:"fa fa-caret-down",
            courseamount:"fa fa-caret-down",
            enrollcount:"fa fa-caret-down",
            toatlearnings:"fa fa-caret-down"
        };
        if(sortKeyStore=="fa fa-caret-down")$scope.courseSortIcons[sortKey]="fa fa-caret-up";
        else $scope.courseSortIcons[sortKey]="fa fa-caret-down";
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

coachApp.filter('startsWithLetterCourse', function () {

    return function (items, usersearch) {
        var filtered = [];
        var letterMatch = new RegExp(usersearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.coursename) || letterMatch.test(item.categoryname) ) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});