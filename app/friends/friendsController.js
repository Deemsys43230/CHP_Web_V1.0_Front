
var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','friendsServiceModule','angular-nicescroll']);

userApp.controller('FriendsController',['$scope','requestHandler','Flash','FriendsService','$sce',function($scope,requestHandler,Flash,FriendsService,$sce){

    $scope.viewDetails=0;
    //Initialize search
    $scope.friendsearch="";
    $scope.activeClass.friends='active';

    //My Friends Pagination starts
    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.myFriendsList.length/$scope.pageSize);
    };
    //My Friends Pagination ends

    //Requested Friends Pagination starts
    $scope.currentPage1 = 0;
    $scope.pageSize1 = 8;
    $scope.numberOfPages1=function(){
        return Math.ceil($scope.requestsent.length/$scope.pageSize1);
    };
    //Requested Friends Pagination ends

    $scope.currentPage2 = 0;
    $scope.pageSize2 = 8;
    $scope.numberOfPages2=function(){
        return Math.ceil($scope.requestreceived.length/$scope.pageSize2);
    };

    $scope.myFriends=function(){
        $scope.loaded=true;
        var getMyFriendsPromise=FriendsService.doGetMyFriends();
        getMyFriendsPromise.then(function(result){
            $scope.myFriendsList=result;
            $scope.loaded=false;
        });
    };

    $scope.requestedFriends=function(){

        var getRequestedFriendsPromise=FriendsService.doGetFriendRequest();
        getRequestedFriendsPromise.then(function(result){
            $scope.requestedFriendsList=result;
            $scope.requestreceived = [];
            $scope.requestsent = [];
            $.each($scope.requestedFriendsList,function(index,value){
                if(value.friendStatus == 2){
                     $scope.requestreceived.push(value);
                }
               else if(value.friendStatus == 1){
                    $scope.requestsent.push(value);
                }
            })
        });
    };

    $scope.searchFriends=function(){
        var getSearchFriendsPromise=FriendsService.doSearchFriends($scope.friendsearch);
        getSearchFriendsPromise.then(function(result){
            $scope.searchFriendsList=result;
        });
    };

    $scope.inviteFriends=function(id){
        var inviteFriendsPromise = FriendsService.doInviteFriends(id);
        inviteFriendsPromise.then(function(result){
            if(result.data.Response_status ==1){
                successMessage(Flash,"Request&nbsp;Sent");
                $scope.searchFriends('');
                $scope.initialLoad();
            }
           else if(result.data.Response_status == 0){
                errorMessage(Flash,"Already Request Sent");
            }
        })
    };

    $scope.acceptFriends=function(id){
        var acceptFriendsPromise = FriendsService.doAcceptFriends(id);
        acceptFriendsPromise.then(function(result){
            if(result.data.Response_status ==1){
                successMessage(Flash,"Request&nbsp;Accepted");
                $scope.initialLoad();
            }
            else if(result.data.Response_status == 0){
                errorMessage(Flash,"No Friends found");
            }
        })
    };

    $scope.denyFriends=function(id){
        var denyFriendsPromise = FriendsService.doDenyFriends(id);
        denyFriendsPromise.then(function(result){
            if(result.data.Response_status ==1){
                successMessage(Flash,"Request&nbsp;Cancelled");
                $scope.initialLoad();
            }
            else if(result.data.Response_status == 0){
                errorMessage(Flash,"No friends found");
            }
        })
    };

    //user view details
    $scope.doViewMembers= function (id) {
        $scope.viewDetails=1;
        $scope.loaded = true;
        requestHandler.getRequest("getUserIndividualDetail/"+id,"").then(function(response){
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.getUserIndividualDetail.imageurl+"?decache="+Math.random());
            $scope.viewMemberDetails = response.data.getUserIndividualDetail;
            //View the image in ng-src for view testimonials

            if($scope.viewMemberDetails.about==null){
                $scope.viewMemberDetails.about="N/A";
            }
            if($scope.viewMemberDetails.dob==null){
                $scope.viewMemberDetails.dob="N/A";
            }
            if($scope.viewMemberDetails.phone==null){
                $scope.viewMemberDetails.phone="N/A";
            }
            if($scope.viewMemberDetails.country==null){
                $scope.viewMemberDetails.country="N/A";
            }
            if($scope.viewMemberDetails.state==null){
                $scope.viewMemberDetails.state="N/A";
            }
            if($scope.viewMemberDetails.city==null){
                $scope.viewMemberDetails.city="N/A";
            }
            if($scope.viewMemberDetails.zipcode==null){
                $scope.viewMemberDetails.zipcode="N/A";
            }

            $scope.loaded = false;
            $scope.paginationLoad = true;

        },  function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    //Onload
    $scope.initialLoad=function(){
        $scope.myFriends();
        $scope.requestedFriends();
        $scope.searchFriends();
        $scope.viewDetails=0;

    };

    $scope.initialLoad();

}]);

userApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if(!input){}
        else return input.slice(start);
    }
});

// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);



