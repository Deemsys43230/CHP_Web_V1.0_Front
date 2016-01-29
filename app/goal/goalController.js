/**
 * Created by Deemsys on 9/21/2015.
 */
var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

userApp.controller('GoalController',function($scope,requestHandler,Flash,$route,$routeParams,$location) {

    $scope.activeClass.groupGoal='active';

    $scope.doGetMyGoalList=function(){
        $scope.paginationLoad=false;
        $scope.loaded=true;
        requestHandler.getRequest("user/getMyGoallist","").then(function(response){
            $scope.myGoalList = [];
            $scope.myRequestGoalList = [];
            $.each(response.data.MyGoallist,function(index,value){
                requestHandler.postRequest("user/getGoalMemberList/",{"goalid" : value.goalid}).then(function(response){
                    value.members=response.data.Goal_Data.length;
                    if(value.activestatus==1)$scope.myGoalList.push(value);
                    else $scope.myRequestGoalList.push(value);
                })
            });
            $scope.loaded=false;
            $scope.paginationLoad=true;
        })
    };

    $scope.doGetViewGoal=function(){
        $scope.isRequest=$route.current.request;
        requestHandler.postRequest("user/getIndividualGoalDetail/",{"goalid" :$routeParams.id}).then(function(response){
            $scope.goalDetail=response.data.Goal_Data;
            if($scope.goalDetail.status==2){
                $scope.viewRank();
            }
        });
    };

    $scope.doGetViewGoalMember=function(){
        $scope.loaded=true;
        $scope.memberUserIdList=[];
        requestHandler.postRequest("user/getGoalMemberList/",{"goalid" : $routeParams.id}).then(function(response){
            $scope.goalMembers=response.data.Goal_Data;

            $.each($scope.goalMembers,function(index,value){
                $scope.memberUserIdList.push(value.userid);
            });
            $scope.loaded=false;

            requestHandler.getRequest("user/getMyFriendsList/","").then(function(response){
                $scope.myRemainderFriendsList=[];
                $.each(response.data.Friends_List,function(index,uservalue){

                    if($scope.memberUserIdList.indexOf(uservalue.userid)=='-1')
                        $scope.myRemainderFriendsList.push(uservalue);
                });
            });
        });

    };

    $scope.doAddMember=function(id){
        requestHandler.postRequest("user/insertGoalMembers/",{"goalid" : $routeParams.id,"memberlist" : [id]}).then(function(){
            $scope.doGetViewGoalMember();
        });
    };

    $scope.doRemoveMember=function(id){
        requestHandler.deleteRequest("user/deleteGoalMember/",{"goalid" : $routeParams.id,"memberid" : id}).then(function(){
            successMessage(Flash,"Successfully Removed!");
            $scope.doGetViewGoalMember();
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.doConfirmation=function(id){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#confirmation").fadeIn(600);
            $(".common_model").show();
        });

        $scope.deleteId=id;

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#confirmation").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#confirmation").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.doDeleteGroup=function(id){
         requestHandler.deleteRequest("user/deleteGoal/",{"goalid" : id}).then(function(response){
             successMessage(Flash,"Successfully Updated!");
             $scope.doGetMyGoalList();
         },function(){
             errorMessage(Flash,"Please try again later!");
         });
    };

    $scope.doQuitGroup=function(){
        requestHandler.postRequest("user/completeGoal/",{"goalid" : $routeParams.id}).then(function(response){
            //$location.path('/groupGoalView/'+$routeParams.id);
            successMessage(Flash,"Goal Successfully Completed!");
            $scope.doGetViewGoal();
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.doExitConfirmation=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#confirmation-remove").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#confirmation-remove").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#confirmation-remove").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.doExitGroup=function(){
        requestHandler.deleteRequest("user/rejectOrExistGoalMember/",{"goalid" : $routeParams.id}).then(function(response){
            if($scope.isRequest)$location.path('/groupGoalRequest');
            else $location.path('/groupGoal');
            successMessage(Flash,"Successfully Exit!");
            $scope.doGetMyGoalList();
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.doAcceptGroup=function(){
        requestHandler.putRequest("user/acceptGoal/",{"goalid" : $routeParams.id}).then(function(response){
             successMessage(Flash,"Successfully Accepted!");
            $location.path('/groupGoalView/'+$routeParams.id);
           // $scope.doGetMyGoalList();
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.doAddGoalPopup=function(){
        $scope.createGoal={};
        $scope.createGoalForm.$setPristine();
        $scope.createGoal.goaltype=1;
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#createGoal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#createGoal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#createGoal").hide();
            $("#lean_overlay").hide();
        });
    };

    $scope.viewRank=function(){
        requestHandler.postRequest("user/rankGoalList/",{"goalid" : $routeParams.id}).then(function(response){
            $scope.rankList=response.data.Goal_Data;
            if($scope.goalDetail.status==1){
                $(function(){
                    $("#lean_overlay").fadeTo(1000);
                    $("#modal1").fadeIn(600);
                    $(".common_model").show();
                });

                $(".modal_close").click(function(){
                    $(".common_model").hide();
                    $("#modal1").hide();
                    $("#lean_overlay").hide();
                });

                $("#lean_overlay").click(function(){
                    $(".common_model").hide();
                    $("#modal1").hide();
                    $("#lean_overlay").hide();
                });
            }

        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    if(!$routeParams.id){
        $scope.doGetMyGoalList();
    }
    else{
        $scope.doGetViewGoal();
        $scope.doGetViewGoalMember();
    }

    //To Display current date
    var selectedDate = new Date();
    var dd = selectedDate.getDate();
    var mm = selectedDate.getMonth()+1; //January is 0!

    var yyyy = selectedDate.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    selectedDate = dd+'/'+mm+'/'+yyyy;

    $scope.doCreateGoal=function(){
        $scope.loaded=true;
        if(document.getElementById("start").value==""){
            console.log(selectedDate);
            $scope.createGoal.startdate=$scope.createGoal.enddate=selectedDate;
        }
        else{
            $scope.createGoal.startdate=document.getElementById("start").value;
            $scope.createGoal.enddate=document.getElementById("end").value;
        }
        $scope.createGoal.goaltype=parseInt($scope.createGoal.goaltype);

        requestHandler.postRequest("user/insertUserGoal/",$scope.createGoal).then(function(response){
            successMessage(Flash,"Goal Successfully Created!");
            $scope.doGetMyGoalList();
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.doAcceptGoalRequest=function(id){
        requestHandler.putRequest("user/acceptGoal/",{"goalid":id}).then(function(){
            successMessage(Flash,"Successfully Joined!");
            $("#modal_trigger1").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });
            $location.path('/groupGoalView/'+id);
           // $scope.doGetMyGoalList();
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.doDeleteGoalRequest=function(id){
        requestHandler.deleteRequest("user/rejectOrExistGoalMember/",{"goalid":id}).then(function(){
            successMessage(Flash,"Successfully Exited!");
            $scope.doGetMyGoalList();
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.resetdata = function(){
        $scope.friendsearch = "";
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });

    };

});

userApp.controller('GoalViewController',function() {
    alert("okay");
});

// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

userApp.filter('startsWithLetter', function () {
    return function (items, searchfriend) {
        var filtered = [];
        var letterMatch = new RegExp(searchfriend, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.user_name)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});

userApp.filter('startsWithLetterRemain', function () {
    return function (items, friendsearch) {
        var filtered = [];
        var letterMatch = new RegExp(friendsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.name)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});


