/**
 * Created by Deemsys on 9/21/2015.
 */
var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('CoachMembersController',['$scope','requestHandler',"$filter",function($scope,requestHandler,$filter) {

    //Get Coaches List
    $scope.doGetMyMembers=function(currentGroupId){
        $scope.currentGroupId=currentGroupId;
        $scope.clients=[];
        $scope.loaded=true;
        requestHandler.getRequest("/coach/myclients/","").then(function(response){
            if($scope.currentGroupId==0)
                $scope.clients=response.data.clients;
            else
                {
                    $.each(response.data.clients,function(index,value){
                        if($scope.currentGroupId==value.groupid){
                            $scope.clients.push(value);
                        }                           
                    });                   
                }
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });

    };

    //Get Groups List
    $scope.doGetGroupList=function(){
        requestHandler.getRequest("coach/getGroups/").then(function(response){
            $scope.groupsList=$scope.groupsList.concat(response.data.Groups);
            $scope.groupsList=$scope.groupsList.concat({"id": null, "coachid": null, "groupname": "Un Assigned", "status": 1});
        })
    }

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.groupsList=[{"id": 0, "coachid": null, "groupname": "All Clients", "status": 1}];
        $scope.doGetGroupList();
        $scope.doGetMyMembers(0);
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


}]);

coachApp.controller('MembersViewController',['$scope','requestHandler','Flash','$routeParams','$sce',function($scope,requestHandler,Flash,$routeParams,$sce) {

    $scope.activeClass.mymembers='active';

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

}]);

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