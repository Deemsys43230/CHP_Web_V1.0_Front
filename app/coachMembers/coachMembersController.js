/**
 * Created by Deemsys on 9/21/2015.
 */
var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll','angular-svg-round-progress']);

coachApp.controller('CoachMembersController',['$scope','requestHandler',"$filter",function($scope,requestHandler,$filter,roundProgressService) {

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
                        if($scope.selectedGroupId.indexOf(value.groupid)!=-1){
                            $scope.clients.push(value);
                        }                           
                    });                   
                }
            if($scope.clients.length>0)
                $scope.doGetClientsDetailsByCoach($scope.clients[0].userid);
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });

    };

    //Get Groups List
    $scope.doGetGroupList=function(){
       requestHandler.getRequest("coach/getGroups/").then(function(response){
             $scope.groupsList=[];
            $scope.groupsList=response.data.Groups;
            $scope.groupsList.push({"id": null, "coachid": null, "groupname": "Un Assigned", "status": 1});

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
        if(id!=0){
             requestHandler.getRequest("/getUserProfile/"+id, "").then(function(response){
                $scope.coachclientdetails=response.data.userprofile;
                $scope.coachclientdetails.age = "-";
                $scope.viewload=true;

                //Get Chat Message
                $scope.doGetChatMessage(id);

          });
        }
       
    };

    //Do Get Chat Message
    $scope.doGetChatMessage=function(id){
        $scope.currentChatTargetId=id;
        $scope.getMessageParam={"targetid":id,"offset":0};
        requestHandler.postRequest("/readMessage/",$scope.getMessageParam).then(function(response){
            $scope.chatMessages=response.data.chats;
            $scope.chat={"message":""};
            setTimeout(function(){ $('.msg_container_base').scrollTop($('.msg_container_base')[0].scrollHeight); }, 500);
            
        });
    };

    //Do Send Chat Message
    $scope.doSendChatMessage=function(){
             $scope.getSendMessageParam={"targetid":$scope.currentChatTargetId,"message":$scope.chat.message};
            requestHandler.postRequest("/sendMessage/",$scope.getSendMessageParam).then(function(response){
                $scope.doGetChatMessage($scope.currentChatTargetId);
            });
       
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
        $scope.currentGroupName = "All Clients"
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