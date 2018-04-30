var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','stateCountryModule','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('MemberController',['$scope','requestHandler','Flash','CountryStateService','$routeParams','$sce',function($scope,requestHandler,Flash,CountryStateService,$routeParams,$sce) {



    //Get Coach List
    $scope.doGetMemberList=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getallUserListbyAdmin/","").then(function(response){
            $scope.userList=response.data.getallUserListbyAdmin;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
    };

    //user view details
    $scope.doViewMembers= function () {
        $scope.loaded = true;
        requestHandler.getRequest("getUserProfile/"+$routeParams.id,"").then(function(response){
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.userprofile.imageurl+"?decache="+Math.random());
            $scope.viewMemberDetails = response.data.userprofile;
            //to get country and state details for user
            $scope.viewMemberDetails.countryName=CountryStateService.doGetCountries($scope.viewMemberDetails.country);
            $scope.viewMemberDetails.stateName=CountryStateService.doGetStates($scope.viewMemberDetails.state,$scope.viewMemberDetails.country);


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

    //Enable Disable user
    $scope.doEnableDisableUser=function(userId){
        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(2400);
        }
        requestHandler.postRequest("admin/enableordisableUser/",{"userid":userId}).then(function(response){
            $scope.doGetMemberList();
            successMessage(Flash,"Successfully Updated");
        },function(){
            errorMessage(Flash,"Please Try Again Later");
        });
    };

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetMemberList();
    };

}]);

adminApp.filter('startsWithLetteruser', function () {

    return function (items, usersearch) {

        var filtered = [];
        var letterMatch = new RegExp(usersearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.emailid) || letterMatch.test(item.name) ) {

                    filtered.push(item);
                }
            }

        }
        return filtered;
    };
});