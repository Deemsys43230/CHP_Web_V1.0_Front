/**
 * Created by Deemsys on 9/21/2015.
 */
var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('CoachMembersController',function($scope,requestHandler) {

    //Get Coach List
    $scope.doGetMyMembers=function(){
        $scope.loaded=true;
        requestHandler.getRequest("coach/getSubscribedusers/","").then(function(response){
            $scope.myMembersList=response.data.getSubscribedusers;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });

    };

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetMyMembers();
    };

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').fadeIn(300);
        $('.search-list-form input').focus();
    });

    $('.search-list-form input').focusout(function() {
        $('.search-list-form').fadeOut(300);
        $scope.membersearch="";
    });


});

coachApp.controller('MembersViewController',function($scope,requestHandler,Flash,$routeParams,$sce) {

    //Exercise Detail View Suggestion
    $scope.doViewMembers= function () {
        $scope.loaded = true;
        requestHandler.getRequest("getUserIndividualDetail/"+$routeParams.id,"").then(function(response){
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

    $scope.doViewMembers();

});

coachApp.filter('startsWithLetterMember', function () {

    return function (items, membersearch) {
        var filtered = [];
        var letterMatch = new RegExp(membersearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.name) || letterMatch.test(item.emailid)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});