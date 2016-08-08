var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

userApp.controller('UserPaymentController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {


    $scope.sortcoursenameicon="fa fa-caret-down";
    $scope.sortcategoryicon = "fa fa-caret-down";
    $scope.sortauthoricon = "fa fa-caret-down";
    $scope.sortpruchasedonicon = "fa fa-caret-down";
    $scope.sortamounticon = "fa fa-caret-down";
    $scope.sortcoachnameicon="fa fa-caret-down";
    $scope.sortcoachemailicon="fa fa-caret-down";
    $scope.sortenrollicon="fa fa-caret-down";
    $scope.sortpayicon="fa fa-caret-down";

    //sorting by food Id
    $scope.sortCourseName = function(){
        $scope.sortKey='coursename';
        $scope.reverse = !$scope.reverse;
        if($scope.sortcoursenameicon=="fa fa-caret-down")$scope.sortcoursenameicon="fa fa-caret-up";
        else $scope.sortcoursenameicon="fa fa-caret-down";
    };

    //sorting by food name
    $scope.sortCategoryName = function(){
        $scope.sortKey='categoryname';
        $scope.reverse = !$scope.reverse;
        if($scope.sortcategoryicon=="fa fa-caret-down") $scope.sortcategoryicon="fa fa-caret-up";
        else $scope.sortcategoryicon="fa fa-caret-down";
    };

    //sorting by food name
    $scope.sortAuthorName = function(){
        $scope.sortKey='ownername';
        $scope.reverse = !$scope.reverse;
        if($scope.sortauthoricon=="fa fa-caret-down") $scope.sortauthoricon="fa fa-caret-up";
        else $scope.sortauthoricon="fa fa-caret-down";
    };

    //sorting by food name
    $scope.sortPurchaseDate = function(){
        $scope.sortKey='purchasedon';
        $scope.reverse = !$scope.reverse;
        if($scope.sortpruchasedonicon=="fa fa-caret-down") $scope.sortpruchasedonicon="fa fa-caret-up";
        else $scope.sortpruchasedonicon="fa fa-caret-down";
    };

    //sorting by food name
    $scope.sortAmount = function(){
        $scope.sortKey='purchaseamount';
        $scope.reverse = !$scope.reverse;
        if($scope.sortamounticon=="fa fa-caret-down") $scope.sortamounticon="fa fa-caret-up";
        else $scope.sortamounticon="fa fa-caret-down";
    };

    //sorting by food name
    $scope.sortCoachName = function(){
        $scope.sortKey='coachname';
        $scope.reverse = !$scope.reverse;
        if($scope.sortcoachnameicon=="fa fa-caret-down") $scope.sortcoachnameicon="fa fa-caret-up";
        else $scope.sortcoachnameicon="fa fa-caret-down";
    };

    //sorting by food name
    $scope.sortCoachEmail = function(){
        $scope.sortKey='coachemailid';
        $scope.reverse = !$scope.reverse;
        if($scope.sortcoachemailicon=="fa fa-caret-down") $scope.sortcoachemailicon="fa fa-caret-up";
        else $scope.sortcoachemailicon="fa fa-caret-down";
    };

    //sorting by food name
    $scope.sortEnrolled = function(){
        $scope.sortKey='coachEnrollStatus';
        $scope.reverse = !$scope.reverse;
        if($scope.sortenrollicon=="fa fa-caret-down") $scope.sortenrollicon="fa fa-caret-up";
        else $scope.sortenrollicon="fa fa-caret-down";
    };

    //sorting by food name
    $scope.sortPay = function(){
        $scope.sortKey='purchaseamount';
        $scope.reverse = !$scope.reverse;
        if($scope.sortpayicon=="fa fa-caret-down") $scope.sortpayicon="fa fa-caret-up";
        else $scope.sortpayicon="fa fa-caret-down";
    };
    // To display Course list by user
    $scope.doGetMyCourseListByUser=function(){
        requestHandler.getRequest("user/getMyCoursePurchaseList/", "").then(function(response){
            $scope.usercourselist=response.data.courselist;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };


    $scope.doViewPaymentDetails=function(inwardid){

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#paymentView").fadeIn(600);
            $(".common_model").show();
        });

        $scope.loaded=true;

        requestHandler.postRequest("inwardPaymentDetail/",{'inwardid':inwardid}).then(function(response){
            $scope.paymentDetails=response.data.InwardDetails;
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

    // To display Coach list by user
    $scope.doGetMyCoachListByUser=function(){
        requestHandler.getRequest("user/getmySubscribedCoachList/", "").then(function(response){
            $scope.usercoachlist=response.data.coachlist;
        },function(){
            errorMessage(Flash,"Please try again later!")
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
            if(response.data.Response_status==0){
                errorMessage(Flash,"Invalid paypal emailId!!!")
            }
            else if(response.data.Response_status==1){
                successMessage(Flash,"Successfully Updated!");
                $scope.getSettingDetails();
            }
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

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });


}]);


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

userApp.filter('startsWithLetterCourse', function () {

    return function (items, coursepay) {
        var filtered = [];
        var letterMatch = new RegExp(coursepay, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.coursename) || letterMatch.test(item.categoryname) || letterMatch.test(item.ownername) || letterMatch.test(item.purchaseamount) || letterMatch.test(item.inwardid)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});

userApp.filter('startsWithLetterCoach', function () {

    return function (items, coachpay) {
        var filtered = [];
        var letterMatch = new RegExp(coachpay, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.coachname) || letterMatch.test(item.coachemailid) || letterMatch.test(item.coachEnrollStatus) || letterMatch.test(item.purchaseamount) || letterMatch.test(item.inwardid)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});