/**
 * Created by Deemsys on 9/21/2015.
 */
var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll','angular-svg-round-progress']);

coachApp.controller('CoachMembersController',['$scope','requestHandler',"$filter","Flash",function($scope,requestHandler,$filter,roundProgressService,Flash) {

    //Get Coaches List
    $scope.doGetMyMembers=function(){
      
        $scope.clients=[];
        $scope.loaded=true;
        requestHandler.getRequest("/coach/myclients/","").then(function(response){
            //Intialize the array
            $scope.selectedGroupId=[];

            $.each($scope.groupsList,function(index,value){
                if(value.isSelected)
                    $scope.selectedGroupId.push(value.id);
            });

            if($scope.selectedGroupId.length==0)
                $scope.clients=response.data.clients;
            else
                {
                    $.each(response.data.clients,function(index,value){
                        if(value.groupid==null)
                            value.groupid=0;
                        if($scope.selectedGroupId.indexOf(value.groupid)!=-1){
                            $scope.clients.push(value);
                        }                           
                    });                   
                }
            if($scope.clients.length>0){
                $scope.doGetClientsDetailsByCoach($scope.clients[0].userid);
                $scope.doGetNotesByCoach($scope.clients[0].userid);
            }
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });

    };


    $scope.doGetAllClients = function(){
        requestHandler.getRequest("/coach/myclients/","").then(function(response){
            $scope.clients = response.data.clients;
        });
    };
    //Get Groups List
    $scope.doGetGroupList=function(){
       requestHandler.getRequest("coach/getGroups/").then(function(response){
             $scope.groupsList=[];
            $scope.groupsList=response.data.Groups;
            $scope.groupsList.push({"id": 0, "coachid": null, "groupname": "Un Assigned", "status": 1});

            $.each($scope.groupsList,function(index,value){
                value.isSelected=false;
            });
        })
    };


    //Duplicate value For clients individual profile view

    $scope.doGetClientsDetailsByCoach= function (id){
        $scope.coachclientdetails={};
        $scope.member = {
            status: 'member-view'
        };

        requestHandler.getRequest("getUserProfile/"+id, "").then(function(response){

            $scope.coachclientdetails=response.data.userprofile;
            $scope.coachclientdetails.age = "-";

        $scope.viewload=true;

    });
    };

        // Notes for User Written by Coach reference

    // Insert or Update Notes
        $scope.doInsertOrUpdateNotes = function(userid){
            $scope.notes= $scope.Notes.notes;

            requestHandler.postRequest("coach/updatenotes/",{"userid":userid,"notes":$scope.notes}).then(function(response){
                if(response.data.Response == "Success"){
                    $('#notesButton').hide();
                    scrollBottom: 0
                }
            });
        };
        //Get Users Individual Notes
    $scope.doGetNotesByCoach = function(userid){
        requestHandler.postRequest("coach/getnotes/",{"userid":userid}).then(function(response){
            $scope.Notes = response.data.Notes;
        });
    };

    //Clear all Notes for Individual Notes
    $scope.doClearAllNotes = function(userid){
        $scope.Notes.notes ="";
        console.log($scope.Notes.notes);
        $scope.doInsertOrUpdateNotes(userid);
    };

    //circle round
    $scope.offset =         0;
    $scope.timerCurrent =   0;
    $scope.uploadCurrent =  0;
    $scope.stroke =         12;
    $scope.radius =         70;
    $scope.isSemi =         false;
    $scope.rounded =        false;
    $scope.responsive =     false;
    $scope.clockwise =      true;
    $scope.bgColor =        '#ddd';
    $scope.duration =       1000;
    $scope.currentAnimation = 'easeOutCubic';

    $scope.animations = [];

/*    angular.forEach(roundProgressService.animations, function(value, key){
        $scope.animations.push(key);
    });*/

    $scope.getStyle = function(){
        var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

        return {
            'top': $scope.isSemi ? 'auto' : '52%',
            'bottom': $scope.isSemi ? '5%' : 'auto',
            'left': '50%',
            'transform': transform,
            '-moz-transform': transform,
            '-webkit-transform': transform
        };
    };

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetGroupList();
        $scope.doGetMyMembers(0);
        $scope.doGetClientsDetailsByCoach(0);
        $scope.doGetNotesByCoach();
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

// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);