var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','ui.bootstrap']);

adminApp.controller('UserFeedbackController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {



    $scope.currentPage=1;

    $scope.getUserFeedBackDetails= function(){
        $('#checkAll').removeAttr('checked','checked');
        $scope.loaded=true;
        $scope.offset=($scope.currentPage-1)*$scope.itemsPerPage;
        $scope.limit=$scope.currentPage*$scope.itemsPerPage;

        if(!$scope.searchText){
            $scope.searchText="";
        }

        $scope.params={
            "limit":$scope.limit,
            "offset":$scope.offset,
            "search":$scope.searchText
        };

        requestHandler.postRequest("admin/getFeedback/", $scope.params).then(function(response){
            $scope.userFeedbackList=response.data.feedbackList;
            $.each($scope.userFeedbackList, function(index,value) {
            if(value.mobile==null){
                value.mobile="N/A";
            }
            });
            $scope.total_count=response.data.totalrecords;
            $scope.loaded=false;
        });
    };

    $scope.searchFeedbackDetails=function(){
      $scope.currentPage=1;
      $scope.getUserFeedBackDetails();
    };

    $scope.feedbackid=[];
    $scope.isChecked=function(){
       // $scope.getUserFeedBackDetails();
        if($scope.total_count>0){

            $.each($scope.userFeedbackList, function(index,value) {
                if(document.getElementById('checkAll').checked==true){
                    $scope.feedbackid.push(value.feedbackid);
                   // $("#"+value.feedbackid).checked==true;
                    $('#'+value.feedbackid).attr('checked','checked');
                    $scope.removeDisable=false;
                    $scope.selected=true;
                }
                else if(document.getElementById('checkAll').checked==false){
                    $scope.feedbackid=[];
                    //$("#"+value.feedbackid).checked==false;
                    $('#'+value.feedbackid).prop('checked', false);
                    $scope.removeDisable=true;
                    $scope.selected=false;
                }
            });

        }
    };

    $scope.selectedFeedback=function(feedbackId){

        /*document.getElementById('checkAll').checked=false;
        $scope.removeDisable=false;*/
        var idx=$scope.feedbackid.indexOf(feedbackId);

        // Already Selected Items
        if(idx>-1){
            document.getElementById('checkAll').checked=false;


            $scope.feedbackid.splice(idx,1);
            if($scope.feedbackid.length==0){
                $scope.removeDisable=true;
            }
        }
        // Add New Items
        else{
            $scope.removeDisable=false;
            $scope.feedbackid.push(feedbackId);
        }



    };

    $scope.removeFeedback=function(){
        document.getElementById('checkAll').checked=false;
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
        requestHandler.postRequest("admin/deleteFeedback/",{'feedbackid':$scope.feedbackid} ).then(function(response){
            $scope.getUserFeedBackDetails();
            successMessage(Flash,"Successfully Removed");
            $scope.removeDisable=true;
        });

    };

    $scope.removeFeedbackSingle=function(feedbackid){
        $scope.feedbackid=[];
        $scope.feedbackid.push(feedbackid);
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
        requestHandler.postRequest("admin/deleteFeedback/",{'feedbackid':$scope.feedbackid} ).then(function(response){
            $scope.getUserFeedBackDetails();
            successMessage(Flash,"Successfully Removed");
            $scope.removeDisable=true;
        });

    };

    $scope.viewFeedback=function(feedbackid){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#category").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        requestHandler.postRequest("admin/getFeedbackDetail/",{"feedbackid":feedbackid}).then(function(response){
            $scope.userFeedbackDetails=response.data.feedbackDetail;
            if($scope.userFeedbackDetails.mobile==null){

                $scope.userFeedbackDetails.mobile="N/A";
            }

        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#category").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#category").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });


    };

    // Search toggle
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });

    $scope.init=function(){
        $scope.itemsPerPage = 10;
        $scope.searchText="";
        $scope.getUserFeedBackDetails();
        $scope.removeDisable=true;
    };

    $scope.init();

}]);
