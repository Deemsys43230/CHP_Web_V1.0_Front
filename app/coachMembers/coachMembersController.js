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
                $scope.doGetClientsProfileDetailsByCoach($scope.clients[0].userid);
                $scope.doGetClientsDemographyDetailsByCoach($scope.clients[0].userid);
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


    // For clients individual User profile view
    $scope.doGetClientsProfileDetailsByCoach= function (id){
            $scope.coachclientdetails={};
            $scope.member = {
                status: 'member-view'
            };
            if(id!=0){
                 requestHandler.getRequest("/getUserProfile/"+id, "").then(function(response){
                    coachclientdetails=response.data.userprofile;
                    // $scope.coachclientdetails.age = "-";
                    

                    //For Age calculation
                    var today = new Date();
                    if(coachclientdetails.dob == null){
                        coachclientdetails.age = "-";
                    }
                    if(coachclientdetails.dob !=null){
                        //Age Calculation starts
                        var birthDate = coachclientdetails.dob;
                        var birthdatearray = birthDate.split("/");
                        var newdate = birthdatearray[1] + '/' + birthdatearray[0] + '/' + birthdatearray[2];
                        birthDate = new Date(newdate);
                         var age = today.getFullYear() - birthDate.getFullYear();
                         var m = today.getMonth() - birthDate.getMonth();
                         if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                             age--;
                          }
                        //Age caluclation ends
                    coachclientdetails.age = age;
                    }
                    $scope.coachclientdetails = coachclientdetails;

                    $scope.viewload=true;

                    //Get Chat Message
                    $scope.doGetChatMessage(id);

              });
            }
           
        };

    /* For clients Individual Demograpgy Details BY Coach */

    $scope.doGetClientsDemographyDetailsByCoach = function(id){
        requestHandler.getRequest("getUserDemography/"+id, "").then(function(response){
            $scope.demographyDeatil = response.data.demography;

            if($scope.demographyDeatil.obesity==null){
                $scope.demographyDeatil.obesity = "N/A";
            }
            if($scope.demographyDeatil.diabetes==null){
                $scope.demographyDeatil.diabetes = "N/A";
            }
            if($scope.demographyDeatil.height==null){
                $scope.demographyDeatil.height = "N/A";
            }
            if($scope.demographyDeatil.weight==null){
                $scope.demographyDeatil.weight = "N/A";
            }
            if($scope.demographyDeatil.fat==null){
                demographyDeatil.fat = "N/A";
            }
            if($scope.demographyDeatil.fibre==null){
                $scope.demographyDeatil.fibre = "N/A";
            }
            if($scope.demographyDeatil.hip==null){
                $scope.demographyDeatil.hip = "N/A";
            }
            if($scope.demographyDeatil.waist==null){
                $scope.demographyDeatil.waist = "N/A";
            }
            if($scope.demographyDeatil.bmi==null){
                demographyDeatil.bmi = "N/A";
            }
            if($scope.demographyDeatil.bloodgroup==null){
                $scope.demographyDeatil.bloodgroup = "N/A";
            }
            if($scope.demographyDeatil.protien==null){
                $scope.demographyDeatil.protien = "N/A";
            }
            if($scope.demographyDeatil.carbo==null){
                $scope.demographyDeatil.carbo = "N/A";
            }
            if($scope.demographyDeatil.systolicbloodpressure==null){
                $scope.demographyDeatil.systolicbloodpressure = "N/A";
            }
            if($scope.demographyDeatil.diastolicbloodpressure==null){
                $scope.demographyDeatil.diastolicbloodpressure = "N/A";
            }
            if($scope.demographyDeatil.HDLcholestrol==null){
                $scope.demographyDeatil.HDLcholestrol = "N/A";
            }
            if($scope.demographyDeatil.LDLcholestrol==null){
                $scope.demographyDeatil.LDLcholestrol = "N/A";
            }
            if($scope.demographyDeatil.triglycerides==null){
                $scope.demographyDeatil.triglycerides = "N/A";
            }
            if($scope.demographyDeatil.HbA1c==null){
                $scope.demographyDeatil.HbA1c = "N/A";
            }
            if($scope.demographyDeatil.fastingbloodglucose==null){
                $scope.demographyDeatil.fastingbloodglucose = "N/A";
            }
            if($scope.demographyDeatil.randombloodglucose==null){
                $scope.demographyDeatil.randombloodglucose = "N/A";
            }
            if($scope.demographyDeatil.postprandialbloodglucose==null){
                $scope.demographyDeatil.postprandialbloodglucose = "N/A";
            }
        });
    };

    //Do Get Chat Message
    $scope.doGetChatMessage=function(id){
        $scope.currentChatTargetId=id;
        $scope.getMessageParam={"targetid":id,"offset":0};
        requestHandler.postRequest("/readMessage/",$scope.getMessageParam).then(function(response){
            $scope.chatMessages=response.data.chats;
            $scope.chat={"message":""};

            $scope.unreadChatMessageCount=0;
            $.each($scope.chatMessages,function(index,value){
                if(value.status==0){
                    $scope.unreadChatMessageCount+=1;
                }
            });
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

    // For remove user by coach from all groups

    $scope.doRemoveUserByCoach = function(userid){
        requestHandler.postRequest("coach/removeuser/",{"userid":userid}).then(function(response){
            $scope.Result = response.data.Response;
            if(response.data.Response == "Success"){
                $scope.doGetMyMembers();
            };
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
        $scope.doGetClientsProfileDetailsByCoach(0);
        $scope.doGetClientsDemographyDetailsByCoach(0);
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