var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','ui.bootstrap']);

adminApp.controller('AdminPaymentController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {

    $scope.totalEarningsByAdmin=0.00;
    $scope.totalEarningsByCoach=0.00;
    $scope.loaddisable=false;
    $scope.currentPage=1;

    //Main Function returns the list
    $scope.doGetCoursePaymentDetails = function(){

        $scope.loaded=true;
        $scope.offset=($scope.currentPage-1)*$scope.itemsPerPage;
        $scope.limit=$scope.currentPage*$scope.itemsPerPage;

        if(!$scope.courseSearch){
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
    $scope.doGetCourseSubsciberList = function(){

        $scope.offset=($scope.currentPage-1)*$scope.itemsPerPage;
        $scope.limit=$scope.currentPage*$scope.itemsPerPage;
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
            $scope.coachid = response.data.coursePaylist.coachid;
            $scope.coursesPaymentHistory = response.data.coursePaylist.paymentHistory;
            $scope.courseDetails = response.data.coursePaylist;
            $scope.total_count=response.data.totalrecordcount;
            $scope.loaded=false;
        });
    };


    //End Subscriber returns the list


    //Coach List
    $scope.doGetAllCoachSubscriptions = function(){
        $scope.loaded=true;
        if($scope.coachPaymentSearch==undefined){
            $scope.coachPaymentSearch="";
        }


            $scope.getAllSubscriptionParam={
            "limit":$scope.getAllSubscriptionPagination.itemsPerPage,
            "offset":($scope.getAllSubscriptionPagination.pageNumber-1)*$scope.getAllSubscriptionPagination.itemsPerPage,
            "coachid":$routeParams.id,
           "searchname":$scope.coachPaymentSearch
        };

        //In practice this should be in a factory.
        requestHandler.postRequest("admin/getallsubscriptions/",$scope.getAllSubscriptionParam).then(function(response){
            $scope.subscriptionDetails = response.data;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
    };
    //End coach list

    $scope.$watch("getAllSubscriptionPagination.pageNumber",function(){
        $scope.doGetAllCoachSubscriptions();
    });

    //Detail of subscribers
    $scope.doGetCoachSubscribersList = function(){

        $scope.offset=($scope.currentPage-1)*$scope.itemsPerPage;
        $scope.limit=$scope.currentPage*$scope.itemsPerPage;
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
            $scope.coachid= response.data.coachPaylist.coachid;
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

    $scope.doGetCoursePuchaseDetails = function(){
        //In practice this should be in a factory.
        requestHandler.postRequest("courseDetail/",{'courseid':$routeParams.id}).then(function(response){
            $scope.coursePurchsedDeatils = response.data.coursedetail;
        });
    };


    $scope.sortingCourse = function(id){
        $scope.sortId=id;
        $scope.currentPage = 1;
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
        $scope.doGetCoursePaymentDetails();
    };

    $scope.sortingCourseSubscriber = function(id){
        $scope.sortId=id;
        $scope.currentPage=1;
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
        $scope.doGetCourseSubsciberList();
    };



    $scope.sortingCoachSubscriber = function(id){
        $scope.sortId=id;
        $scope.currentPage=1;
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
        $scope.doGetCoachSubscribersList();
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
        //Object + 1 icons needed NOTE //Initialize Icon
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down'];
        $scope.doGetCoursePaymentDetails();
        $scope.totalEarnbycourse();
    };

    $scope.subscribersListInit=function(){
        $scope.itemsPerPage = 6;
        $scope.courseSearch="";
        $scope.sortId="";
        $scope.sorttype="";
        //Object + 1 icons needed NOTE //Initialize Icon
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down'];
        $scope.doGetCourseSubsciberList();
        $scope.totalEarnByCourseId();
    };

    $scope.coachListInit=function(){
        $scope.paginationLoad=false;
        $scope.getAllSubscriptionPagination={"itemsPerPage":10,"pageNumber":1};
    };

    $scope.coachSubscribersListInit=function(){
        $scope.itemsPerPage = 10;
        $scope.subscriberSearch="";
        $scope.sortId="";
        $scope.sorttype="";
        //Object + 1 icons needed NOTE //Initialize Icon
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down','fa fa-caret-down'];

        $scope.doGetCoachSubscribersList();
        $scope.totalEarnByCoachId();
    };

    $scope.subscribersDetailInit=function(){
         $scope.doGetSubscriberDetailView();
    };

    $scope.coachSubscribersDetailInit=function(){
         $scope.doGetCoachSubscriberDetailView();
    };


    //Send Invoice Phase 2
    $scope.doSendSubscriptionInvoice=function(paymentid){
        requestHandler.postRequest("admin/sendsubscriptioninvoice/",{"paymentid":paymentid}).then(function(response){
            successMessage(Flash,"Sent Successfull");
        });
    };

    //Send Renew Subscription
    $scope.doSendRenewSubscription=function(paymentid){
        requestHandler.postRequest("admin/renewsubscriptionmail/",{"paymentid":paymentid}).then(function(response){
            successMessage(Flash,"Sent Successfull");
        });
    }

    $scope.doManualPay=function(paymentid,coachid){

        $scope.loaddisable=true;
        $scope.loaded=true;
        requestHandler.postRequest("admin/payManualImplicit/",{"coachid":coachid,"paymentid":paymentid}).then(function(response){

            if(response.data.Response_status==1){
                $scope.subscribersListInit();
                successMessage(Flash,"Payment successfull");
                $scope.loaded=false;
                $scope.loaddisable=false;
            }
            else if(response.data.Response_status==0){
                $(function(){
                    $("#lean_overlay").fadeTo(1000);
                    $("#errormodal").fadeIn(600);
                    $(".common_model").show();
                });
                $scope.errormsg= response.data.Error;

                $(".modal_close").click(function(){
                    $(".common_model").hide();
                    $("#errormodal").hide();
                    $("#lean_overlay").hide();
                });

                $("#lean_overlay").click(function(){
                    $(".common_model").hide();
                    $("#errormodal").hide();
                    $("#lean_overlay").hide();
                });
                $scope.loaded=false;
                $scope.loaddisable=false;

            }
        });


    };

}]);


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

//Admin Failed Payment
adminApp.controller('AdminFailedPaymentController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {

// For pagination
    $scope.getFailedPaymentPagination={"itemsPerPage":10,"pageNumber":1};

   //Main Function returns the list
    $scope.doGetFailedPaymentList = function(){

        $scope.loaded=true;

    if($scope.coachFailedPaymentSearch==undefined){
        $scope.coachFailedPaymentSearch="";
    }
        $scope.params={
            "limit":$scope.getFailedPaymentPagination.itemsPerPage,
            "offset":($scope.getFailedPaymentPagination.pageNumber-1)*$scope.getFailedPaymentPagination.itemsPerPage,
            "searchname":$scope.coachFailedPaymentSearch
        };

        //In practice this should be in a factory.
        requestHandler.postRequest("admin/pendingtransactions/",$scope.params).then(function(response){
            $scope.failedPaymentHistory = response.data;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
    };
    //End Function returns the list

    //Verify Payment
    $scope.doVerifyPayment=function(paymentid){
        requestHandler.postRequest("admin/retrypayment/",{"paymentid":paymentid}).then(function(response){
            if(response.data.Response_status==0){
                errorMessage(Flash,response.data.Error);       
            }else{
                successMessage(Flash,"Successfully Verified");
            }
        });
    };
    //End Verify Payment

    //Init Function
    $scope.init=function(){
        $scope.paginationLoad=false;
    }

    $scope.$watch("getFailedPaymentPagination.pageNumber",function(){
        $scope.doGetFailedPaymentList();
    })

}]);

  