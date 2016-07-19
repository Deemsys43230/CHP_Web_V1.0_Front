/**
 * Created by Deemsys on 9/21/2015.
 */
var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll']);

userApp.controller('GoalController',['$scope','requestHandler','Flash','$route','$routeParams','$location',function($scope,requestHandler,Flash,$route,$routeParams,$location) {

    $scope.activeClass.groupGoal='active';

    $scope.doGetMyGoalList=function(){
        $scope.paginationLoad=false;
        $scope.loaded=true;
        requestHandler.getRequest("user/getMyGoallist","").then(function(response){
            $scope.myGoalList = [];
            $scope.myRequestGoalList=[];
           $.each(response.data.MyGoallist,function(index,value){
               if(value.activestatus==1)$scope.myGoalList.push(value);
                    else $scope.myRequestGoalList.push(value);

            });
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
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
             successMessage(Flash,"Goal Successfully Deleted!");
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
            if($scope.isRequest)$location.path('/group-goal-request');
            else $location.path('/group-goal');
            successMessage(Flash,"Successfully Exit!");
            $scope.doGetMyGoalList();
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.doAcceptGroup=function(){
        requestHandler.putRequest("user/acceptGoal/",{"goalid" : $routeParams.id}).then(function(response){
             successMessage(Flash,"Successfully Accepted!");
            $location.path('/group-goal-view/'+$routeParams.id);
           // $scope.doGetMyGoalList();
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.doAddGoalPopup=function(){
        $scope.createGoal={};
        $scope.createGoalForm.$setPristine();
        $scope.createGoal.goaltype=1;

            var options = {
                minDate : new Date,
                startDate : new Date,
                endDate : new Date,
                singleDatePicker:true
            };

            $('#set-goal-date').daterangepicker(options, function(start, end, label) {
                document.getElementById("start").value = start.format('DD/MM/YYYY');
                document.getElementById("end").value = end.format('DD/MM/YYYY');
            });

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#createGoal").fadeIn(600);
            $(".common_model").show();
            $("#updateWeight").hide();
            $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#createGoal").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#createGoal").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
    };

    $scope.doAddWeightPopup=function(goalid){
        $scope.acceptGoalId=goalid;
        $scope.updateWeightForm.$setPristine();
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#updateWeight").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#updateWeight").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#updateWeight").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
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

    $scope.getUserTimeZone=function(){
        requestHandler.getRequest("getUserTimeZone/","").then(function(response){
            $scope.UserTimeZone = response.data.time;
            $scope.UserDate = $scope.UserTimeZone.slice(0,10);
           // $scope.UserDate= new Date($scope.UserDate).format("mm/dd/yyyy");
        });
    };



    $scope.checkUserWeightEntry=function(){
        requestHandler.postRequest("/user/getWeightLogGraph/", {"startdate": $scope.UserDate,"enddate": $scope.UserDate}).then(function(response){
            $scope.UserWeightEntry=response.data.Weight_logs[0].userentry;

            if($scope.UserWeightEntry==0){
                $scope.doAddWeightPopup();

            }
            else if($scope.UserWeightEntry==1){
                $scope.doAddGoalPopup();
            }
        });
    };

    $scope.getWeightLog=function(){
        requestHandler.postRequest("user/getWeightLogByDate/",{"date":selectedDate}).then(function(response){
          //  alert(selectedDate);
            $scope.weightlog = response.data.Weight_logs.weight;

        });
    };

    $scope.init=function(){
        $scope.getUserTimeZone();
        $scope.getWeightLog();
    };

    $scope.init();

    $scope.updateWeightLog=function(id){

        $scope.weightlog=parseFloat($scope.weightlog);
        if(id==1){
        requestHandler.postRequest("user/weightlogInsertorUpdate/",{"date":$scope.UserDate,"weight":$scope.weightlog}).then(function(response){
         $scope.doAddGoalPopup();

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
        }
        else if(id==2){
            requestHandler.postRequest("user/weightlogInsertorUpdate/",{"date":$scope.UserDate,"weight":$scope.weightlog}).then(function(response){
                $scope.doAcceptGoalRequest($scope.acceptGoalId,$scope.weightlog);

            }, function () {
                errorMessage(Flash, "Please try again later!")
            });
        }

    };

    $scope.doCreateGoal=function(){
        $scope.loaded=true;

        if(document.getElementById("start").value==""){
            $scope.createGoal.enddate=selectedDate;
        }
        else{
            $scope.createGoal.enddate=document.getElementById("start").value;
        }
        $scope.createGoal.goaltype=parseInt($scope.createGoal.goaltype);
        $scope.createGoal.targetweight=parseFloat($scope.createGoal.targetweight);
        $scope.createGoal.userweight=$scope.weightlog;
        requestHandler.postRequest("user/insertUserGoal/",$scope.createGoal).then(function(response){
            successMessage(Flash,"Goal Successfully Created!");
            $scope.doGetMyGoalList();
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };
    $scope.acceptGoalCheck=function(goalid){
        requestHandler.postRequest("/user/getWeightLogGraph/", {"startdate": $scope.UserDate,"enddate": $scope.UserDate}).then(function(response){
            $scope.UserWeightEntry=response.data.Weight_logs[0].userentry;

            if($scope.UserWeightEntry==0){
                $scope.doAddWeightPopup(goalid);

            }
            else if($scope.UserWeightEntry==1){
                $scope.doAcceptGoalRequest(goalid,$scope.weightlog);
            }
        });
    };

    $scope.doAcceptGoalRequest=function(id,weight){

        requestHandler.putRequest("user/acceptGoal/",{"goalid":id,"currentweight":weight}).then(function(){
            successMessage(Flash,"Successfully Joined!");
            $("#modal_trigger1").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });
            $location.path('/group-goal-view/'+id);
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

}]);

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


