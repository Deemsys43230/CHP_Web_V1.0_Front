var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','ui.bootstrap']);

adminApp.controller('UserFeedbackController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {

    $scope.currentPage=1;
    $scope.getUserFeedBackDetails= function(){

        $scope.loaded=true;
        $scope.offset=($scope.currentPage-1)*$scope.itemsPerPage;
        $scope.limit=$scope.currentPage*$scope.itemsPerPage;

        $scope.params={
            "limit":$scope.limit,
            "offset":$scope.offset,
            "search":$scope.searchText
        };

        requestHandler.postRequest("admin/getFeedback/", $scope.params).then(function(response){
            $scope.userFeedbackList=response.data.feedbackList;
            $scope.total_count=response.data.totalrecords;
            $scope.loaded=false;
        });
    };

    $scope.removeUserFeedBackDetails=function(){

    };
    $scope.feedbackid=[];
    $scope.isChecked=function(){
        $scope.getUserFeedBackDetails();
        alert("hi");
        console.log($scope.userFeedbackList);
        console.log($scope.total_count);
        if($scope.total_count>0){
            alert("hello");
            $.each($scope.userFeedbackList, function(index,value) {
                if(document.getElementById('checkAll').checked==true){
                    $scope.feedbackid.push(value.feedbackid);
                    $("#"+value.feedbackid).checked==true;
                    //$("#"+value.id).prop('checked',$(this).prop("checked"));

                }
                else if(document.getElementById('checkAll').checked==false){
                    $scope.feedbackid=[];
                    //$("#"+value.id).prop('checked', $(this).prop("checked"));
                    $("#"+value.feedbackid).checked==false;
                }
            });

        }
    };

    $scope.init=function(){
        $scope.itemsPerPage = 10;
        $scope.searchText=" ";
        $scope.getUserFeedBackDetails();
    };

    $scope.init();

}]);