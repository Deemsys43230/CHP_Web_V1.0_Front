var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','ui.bootstrap']);

adminApp.controller('AdminActivityLogsController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {

    $scope.loaddisable=false;
    $scope.currentPage=1;
        //Main Function returns the list
    $scope.doGetActivityLogs = function(date){

        $scope.selectedDate=date;

        $scope.loaded=true;
        $scope.offset=($scope.currentPage-1)*$scope.itemsPerPage;
        $scope.limit=$scope.currentPage*$scope.itemsPerPage;

        if(!$scope.searchText){
            $scope.searchText="";
        }

        $scope.params={
            "limit":$scope.limit,
            "offset":$scope.offset,
            "date":date,
            "searchtext":$scope.searchText,
            "sorttype":$scope.sorttype
        };

        //In practice this should be in a factory.
        requestHandler.postRequest("admin/getActivityLog/",$scope.params).then(function(response){

            $scope.activityLog = response.data.activity_log;
            $scope.total_count=response.data.totalRecords;
            $scope.loaded=false;
        });
    };
    //End Function returns the list


    $scope.doGetActivityLogsPage=function(date){
        $scope.currentPage = 1;
        $scope.doGetActivityLogs(date);
    };

    $scope.sortingLogId = function(id){
        $scope.sortId=id;
        $scope.currentPage = 1;
        var currentOrder=$scope.sortIcon[id];
        //Object + 1 icons needed NOTE
        $scope.sortIcon=['fa fa-caret-down'];

        if(currentOrder=='fa fa-caret-down'){
            $scope.sortIcon[id]='fa fa-caret-up';
            $scope.sorttype=2;
        }else{
            $scope.sortIcon[id]='fa fa-caret-down';
            $scope.sorttype=1;
        }
        $scope.doGetActivityLogs($scope.selectedDate);
    };


    $scope.init=function(){
        //To Display current date
        var selectedDate = new Date();
        var dd = selectedDate.getDate();
        var mm = selectedDate.getMonth()+1; //January is 0!

        var yyyy = selectedDate.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        selectedDate = dd+'/'+mm+'/'+yyyy;

        $scope.selectedDate = selectedDate;

        $scope.itemsPerPage = 10;
        $scope.searchText="";
        $scope.sortId="";
        $scope.sorttype=1;
        $scope.date=selectedDate;
        //Object + 1 icons needed NOTE //Initialize Icon
        $scope.sortIcon=['fa fa-caret-down','fa fa-caret-down'];
        $scope.doGetActivityLogs($scope.selectedDate);


    };


    $scope.init();
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