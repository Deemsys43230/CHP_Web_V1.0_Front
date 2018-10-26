
var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','friendsServiceModule','stateCountryModule','angular-nicescroll']);

userApp.controller('FriendsController',['$scope','requestHandler','Flash','FriendsService','$sce','$timeout','$rootScope','CountryStateService',function($scope,requestHandler,Flash,FriendsService,$sce,$timeout,$rootScope,CountryStateService){
    $rootScope.isMenuShow=1;
    $scope.viewDetails=0;
    //Initialize search
    $scope.friendsearch="";
    $scope.activeClass.friends='active';
    $scope.loadingFriendsImage=false;

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
        if($scope.friendsearch.length >=3){
        $scope.loaded=true;
        var getSearchFriendsPromise=FriendsService.doSearchFriends($scope.friendsearch);
        getSearchFriendsPromise.then(function(result){
            $scope.searchFriendsList=result;
            $scope.loaded=false;
        });
        }
        if($scope.friendsearch == ""){
        var getSearchFriendsPromise=FriendsService.doSearchFriends($scope.friendsearch);
        getSearchFriendsPromise.then(function(result){
            $scope.searchFriendsList=result;
        });
        }
       // $scope.loaded=false;
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
                errorMessage(Flash,"No Request Received");
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
                errorMessage(Flash,"No Request Received");
            }
        })
    };

    //UnFriend
    $scope.unFriend=function(id){
        var unFriendPromise = FriendsService.doUnFriend(id);
        unFriendPromise.then(function(result){
            if(result.data.Response_status ==1){
                successMessage(Flash,"Successfully&nbsp;Unfriend");
                $scope.initialLoad();
            }
            else if(result.data.Response_status == 0){
                errorMessage(Flash,"No Request Received");
            }
        })
    };

    //DO send Email Invitation
    $scope.doSendEmail=function(name,email){
        var doSendEmailPromise = FriendsService.doSendEmail(name,email);
        doSendEmailPromise.then(function(result){
            if(result.data.Response_status ==1){
                successMessage(Flash,"Invitation&nbsp;Successfully&nbsp;Send");
                $scope.initialLoad();
            }
        })
    };

    //user view details
    $scope.doViewMembers= function (id) {
        $scope.loadingFriendsImage=true;
        $scope.viewMemberDetails={};
        // To empty the image url after getting json values
        $scope.myImgSrc="";
        $scope.viewDetails=1;
        requestHandler.getRequest("getUserProfile/"+id,"").then(function(response){
            $scope.viewMemberDetails = response.data.userprofile;
            console.log( $scope.viewMemberDetails);
            $scope.viewMemberDetails.countryName=CountryStateService.doGetCountries($scope.viewMemberDetails.country);
            $scope.viewMemberDetails.stateName=CountryStateService.doGetStates($scope.viewMemberDetails.state,$scope.viewMemberDetails.country);
            console.log($scope.viewMemberDetails.stateName);
            $scope.myImgSrc =$sce.trustAsResourceUrl(response.data.userprofile.imageurl+"?decache="+Math.random());

            //View the image in ng-src for view testimonials
            $scope.viewMemberDetails.address="";
            if($scope.viewMemberDetails.about==null){
                $scope.viewMemberDetails.about="NA";
            }
            if($scope.viewMemberDetails.dob==null){
                $scope.viewMemberDetails.dob="NA";
            }
            if($scope.viewMemberDetails.phone==null){
                $scope.viewMemberDetails.phone="NA";
            }
            if($scope.viewMemberDetails.city!=null){
                $scope.viewMemberDetails.address=$scope.viewMemberDetails.city;
            }
            if($scope.viewMemberDetails.state!=null){
                $scope.viewMemberDetails.address=$scope.viewMemberDetails.address+", "+$scope.viewMemberDetails.stateName;
            }
            if($scope.viewMemberDetails.country!=null){
                $scope.viewMemberDetails.address=$scope.viewMemberDetails.address+", "+$scope.viewMemberDetails.countryName;
            }
            if($scope.viewMemberDetails.zipcode==null){
                $scope.viewMemberDetails.zipcode="";
            }
            $timeout(function(){
                $scope.loadingFriendsImage=false;
            },3000);


            $scope.paginationLoad = true;

        },  function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doInviteFriendPopup=function(){
        $scope.sendEmail={};
        $scope.inviteFriendsForm.$setPristine();
      $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#sendEmail").fadeIn(600);
            $(".common_model").show();
             $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#sendEmail").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#sendEmail").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
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



