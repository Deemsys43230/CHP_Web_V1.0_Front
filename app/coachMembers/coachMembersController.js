/**
 * Created by Deemsys on 9/21/2015.
 */
var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll','angular-svg-round-progress']);

coachApp.controller('CoachMembersController',['$scope','requestHandler',"$filter","Flash","$location","$rootScope",function($scope,requestHandler,$filter,Flash,$location,$rootScope,roundProgressService) {

    $scope.isActive=false;

    
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

                 // for Assign button show
                 
               $scope.doGetIndividualClientDetail($scope.clients[0].userid);
            }
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });

    };

    //Get Individual Memeber Details
    $scope.doGetIndividualClientDetail=function(id){
        $scope.currentClientId=id;
        //Get Profile Detail
        $scope.doGetClientsProfileDetailsByCoach(id);  
        //Get Chat Message
        $scope.doGetChatMessage(id);
        //Do Get Notes
        $scope.doGetNotesByCoach(id);  
        //Demography Details
        $scope.doGetClientsDemographyDetailsByCoach(id);
        //Health profile Details
        $scope.doGetClientHealthProfileDetailsByCoach(id);
        //Graph  for oneweek
        $scope.doGetClientGraphDetailsByCoach(id);
        //Get Tracking Plan Details
        $scope.doGetTrainingPlanDetails(id);
        //Get Medication List
        $scope.doGetMedicationList(id);


    };

    //Get All Client List
    $scope.doGetAllClients = function(){
        requestHandler.getRequest("/coach/myclients/","").then(function(response){
        $scope.clients = response.data.clients;
            $.each($scope.groupsList,function(index,value){
                value.isSelected=false;
            });
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

    // For Assign to Group  
    $scope.SelectModel =function(param){
        //Intialize the array
        $scope.selectedClientId=[];

        $.each($scope.clients,function(index,value){
            if(value.isChecked)
                $scope.selectedClientId.push(value.userid);
        });
        console.log($scope.selectedClientId);
        if($scope.selectedClientId.length==0){
            $("#selectModel").modal('show');
        }else{
            if(param==1){
                $("#groupButton").modal('show');
            }else{
                $("#groupMessage").modal('show');
            }
        }
    };

    $scope.doAssignGroup = function(){
        alert($scope.assignGroup);
        $.each($scope.selectedClientId,function(index,value){
            alert(value);
             requestHandler.postRequest("coach/assignusertogroup/",{"groupid":$scope.assignGroup,"userid":value}).then(function(response){
             },function(){
                successMessage(Flash, "Successfully Added!");
                $scope.doGetAllClients();
            });
        });
       
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
                  });
            }
           
        };
     
    /* For clients Individual Demograpgy Details BY Coach */

    $scope.doGetClientsDemographyDetailsByCoach = function(id){
        requestHandler.getRequest("getUserDemography/"+id, "").then(function(response){
            $scope.demographyDeatil = response.data.demography;

        });
    };


    /*For clients Individual daily activities details By Coach */

    $scope.doGetClientHealthProfileDetailsByCoach = function(userid){
        var today = new Date(); 
        var dd = today.getDate(); 
        var mm = today.getMonth()+1; 
        //January is 0! 
        var yyyy = today.getFullYear(); 
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        var today = dd+'/'+mm+'/'+yyyy;

        requestHandler.postRequest("coach/userhealthprofile/",{"userid":userid,"startdate":today,"enddate":today}).then(function(response){
          
            //get the array
            $.each(response.data.healthprofile,function(index,value){
                $scope.wearable = value.wearables;
                $scope.water = value.waterlog;
            });
        });
    };

    $scope.doGetClientGraphDetailsByCoach = function(userid){
        var today = new Date(); 
        var dd = today.getDate(); 
        var mm = today.getMonth()+1; 
        //January is 0! 
        var yyyy = today.getFullYear(); 
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

        var ed = today.getDate()-6;
        if(ed<10){
            ed='0'+ed
        }
        var today = dd+'/'+mm+'/'+yyyy;
        var enddate = ed+'/'+mm+'/'+yyyy; 
        requestHandler.postRequest("coach/userhealthprofile/",{"userid":userid,"startdate":enddate,"enddate":today}).then(function(response){
          
            //get the array
            $.each(response.data.healthprofile,function(index,value){
                $scope.wearable = value.wearables;
                $scope.water = value.waterlog;
            });
        });
    };

    //Do Set Chat Message as Read 
    $scope.doReadChatMessage=function(){
      $scope.setReadMessageParam={"targetid":$scope.currentChatTargetId};
      requestHandler.postRequest("setMessageRead/", $scope.setReadMessageParam).then(function(response){
          if(response.data.Response_status==1){
            $scope.unreadChatMessageCount=0;
            $scope.showMessageCount=false; 
          }
      })
    };


    //Do Get Chat Message
    $scope.doGetChatMessage=function(id){
        $scope.currentChatTargetId=id;
        $scope.getMessageParam={"targetid":id,"offset":0};
        requestHandler.postRequest("/readMessage/",$scope.getMessageParam).then(function(response){
            $scope.chatMessages=response.data.chats;
            if(response.data.chats.length!=0){
                $scope.chatMessages.coachid= response.data.chats[0].coachid;

                requestHandler.getRequest("/getUserProfile/"+$scope.chatMessages.coachid, "").then(function(response){
                     $scope.coachImageUrl=response.data.userprofile.imageurl;
                });
            }
           
            $scope.chat={"message":""};

            $scope.unreadChatMessageCount=0;
            $.each($scope.chatMessages,function(index,value){
                if(value.status==0 && value.sentby==3){
                    $scope.unreadChatMessageCount+=1;
                    $scope.showMessageCount=true;
                }
                else{
                     $scope.showMessageCount=false;
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


    /*Get Medication List*/
     $scope.doGetMedicationList = function(userid){
        requestHandler.postRequest("coach/coachgetmedications/",{"userid":userid}).then(function(response){
            $scope.medicationList = response.data.medications;
        });
    };

    /*Get traning plan details*/

    $scope.doGetTrainingPlanDetails = function(userid){
        $scope.param={
            "limit":$scope.pagination.itemsPerPage,
            "offset":($scope.pagination.pageNumber-1)*$scope.pagination.itemsPerPage
        };
        $scope.param.userid = userid;
        requestHandler.postRequest("coach/getTrainingPlans/",$scope.param).then(function(response){
            $scope.planList = response.data.history;
        });
    };

    /*Get Individual plans view*/

    $scope.doGetPlansView = function(id){
        
        requestHandler.getRequest("coach/getTrainingPlandetail/"+id,"").then(function(response){
            $scope.planView = response.data.history;

             $(".tracking-plan-viewall-div").hide();
             $(".tracking-plan-view-div").show();
             $(".tracking-plan-add-div").hide();
        });
    };

    //do Insert New Plans

    $scope.doInsertTrainingPlan = function(){
        $scope.planDetails.userid = $scope.currentClientId;
        requestHandler.postRequest("coach/insertTrainingPlan/",$scope.planDetails).then(function(response){
            console.log(response.data);
        },function(){
            successMessage(Flash, "Successfully Plan Added!");
            $scope.doGetTrainingPlanDetails(userid);
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
                        $scope.pagination={"itemsPerPage":9,"pageNumber":1};
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

coachApp.filter('startsWithLetterSearch', function () {

    return function (items, clientsearch) {
        var filtered = [];
        var letterMatch = new RegExp(clientsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.emailid) || letterMatch.test(item.name) || letterMatch.test(item.businessaddress
                    || letterMatch.test(item.phone) || letterMatch.test(item.specialist)) ) {
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