var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination","angular-nicescroll"]);userApp.controller("GoalController",["$scope","requestHandler","Flash","$route","$routeParams","$location",function(a,b,c,d,e,f){a.activeClass.groupGoal="active",a.doGetMyGoalList=function(){a.paginationLoad=!1,a.loaded=!0,b.getRequest("user/getMyGoallist","").then(function(b){a.myGoalList=[],a.myRequestGoalList=[],$.each(b.data.MyGoallist,function(b,c){1==c.activestatus?a.myGoalList.push(c):a.myRequestGoalList.push(c)}),a.loaded=!1,a.paginationLoad=!0})},a.doGetViewGoal=function(){a.isRequest=d.current.request,b.postRequest("user/getIndividualGoalDetail/",{goalid:e.id}).then(function(b){a.goalDetail=b.data.Goal_Data,2==a.goalDetail.status&&a.viewRank()})},a.doGetViewGoalMember=function(){a.loaded=!0,a.memberUserIdList=[],b.postRequest("user/getGoalMemberList/",{goalid:e.id}).then(function(c){a.goalMembers=c.data.Goal_Data,$.each(a.goalMembers,function(b,c){a.memberUserIdList.push(c.userid)}),a.loaded=!1,b.getRequest("user/getMyFriendsList/","").then(function(b){a.myRemainderFriendsList=[],$.each(b.data.Friends_List,function(b,c){"-1"==a.memberUserIdList.indexOf(c.userid)&&a.myRemainderFriendsList.push(c)})})})},a.doAddMember=function(c){b.postRequest("user/insertGoalMembers/",{goalid:e.id,memberlist:[c]}).then(function(){a.doGetViewGoalMember()})},a.doRemoveMember=function(d){b.deleteRequest("user/deleteGoalMember/",{goalid:e.id,memberid:d}).then(function(){successMessage(c,"Successfully Removed!"),a.doGetViewGoalMember()},function(){errorMessage(c,"Please try again later!")})},a.doConfirmation=function(b){$(function(){$("#lean_overlay").fadeTo(1e3),$("#confirmation").fadeIn(600),$(".common_model").show()}),a.deleteId=b,$(".modal_close").click(function(){$(".common_model").hide(),$("#confirmation").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#confirmation").hide(),$("#lean_overlay").hide()})},a.doDeleteGroup=function(d){b.deleteRequest("user/deleteGoal/",{goalid:d}).then(function(b){successMessage(c,"Goal Successfully Deleted!"),a.doGetMyGoalList()},function(){errorMessage(c,"Please try again later!")})},a.doQuitGroup=function(){b.postRequest("user/completeGoal/",{goalid:e.id}).then(function(b){successMessage(c,"Goal Successfully Completed!"),a.doGetViewGoal()},function(){errorMessage(c,"Please try again later!")})},a.doExitConfirmation=function(){$(function(){$("#lean_overlay").fadeTo(1e3),$("#confirmation-remove").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#confirmation-remove").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#confirmation-remove").hide(),$("#lean_overlay").hide()})},a.doExitGroup=function(){b.deleteRequest("user/rejectOrExistGoalMember/",{goalid:e.id}).then(function(b){a.isRequest?f.path("/group-goal-request"):f.path("/group-goal"),successMessage(c,"Successfully Exit!"),a.doGetMyGoalList()},function(){errorMessage(c,"Please try again later!")})},a.doAcceptGroup=function(){b.putRequest("user/acceptGoal/",{goalid:e.id}).then(function(a){successMessage(c,"Successfully Accepted!"),f.path("/group-goal-view/"+e.id)},function(){errorMessage(c,"Please try again later!")})},a.doAddGoalPopup=function(){a.createGoal={},a.createGoalForm.$setPristine(),a.createGoal.goaltype=1;var b={minDate:new Date,startDate:new Date,endDate:new Date,singleDatePicker:!0};$("#set-goal-date").daterangepicker(b,function(a,b,c){document.getElementById("start").value=a.format("DD/MM/YYYY"),document.getElementById("end").value=b.format("DD/MM/YYYY")}),$(function(){$("#lean_overlay").fadeTo(1e3),$("#createGoal").fadeIn(600),$(".common_model").show(),$("#updateWeight").hide(),a.shouldBeOpen=!0}),$(".modal_close").click(function(){$(".common_model").hide(),$("#createGoal").hide(),$("#lean_overlay").hide(),a.shouldBeOpen=!1}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#createGoal").hide(),$("#lean_overlay").hide(),a.shouldBeOpen=!1})},a.doAddWeightPopup=function(b){a.acceptGoalId=b,a.updateWeightForm.$setPristine(),$(function(){$("#lean_overlay").fadeTo(1e3),$("#updateWeight").fadeIn(600),$(".common_model").show(),a.shouldBeOpen=!0}),$(".modal_close").click(function(){$(".common_model").hide(),$("#updateWeight").hide(),$("#lean_overlay").hide(),a.shouldBeOpen=!1}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#updateWeight").hide(),$("#lean_overlay").hide(),a.shouldBeOpen=!1})},a.viewRank=function(){b.postRequest("user/rankGoalList/",{goalid:e.id}).then(function(b){a.rankList=b.data.Goal_Data,1==a.goalDetail.status&&($(function(){$("#lean_overlay").fadeTo(1e3),$("#modal1").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#modal1").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#modal1").hide(),$("#lean_overlay").hide()}))},function(){errorMessage(c,"Please try again later!")})},e.id?(a.doGetViewGoal(),a.doGetViewGoalMember()):a.doGetMyGoalList();var g=new Date,h=g.getDate(),i=g.getMonth()+1,j=g.getFullYear();10>h&&(h="0"+h),10>i&&(i="0"+i),g=h+"/"+i+"/"+j,a.getUserTimeZone=function(){b.getRequest("getUserTimeZone/","").then(function(b){a.UserTimeZone=b.data.time,a.UserDate=a.UserTimeZone.slice(0,10)})},a.checkUserWeightEntry=function(){b.postRequest("/user/getWeightLogGraph/",{startdate:a.UserDate,enddate:a.UserDate}).then(function(b){a.UserWeightEntry=b.data.Weight_logs[0].userentry,0==a.UserWeightEntry?a.doAddWeightPopup():1==a.UserWeightEntry&&a.doAddGoalPopup()})},a.getWeightLog=function(){b.postRequest("user/getWeightLogByDate/",{date:g}).then(function(b){a.weightlog=b.data.Weight_logs.weight})},a.init=function(){a.getUserTimeZone(),a.getWeightLog()},a.init(),a.updateWeightLog=function(d){a.weightlog=parseFloat(a.weightlog),1==d?b.postRequest("user/weightlogInsertorUpdate/",{date:a.UserDate,weight:a.weightlog}).then(function(b){a.doAddGoalPopup()},function(){errorMessage(c,"Please try again later!")}):2==d&&b.postRequest("user/weightlogInsertorUpdate/",{date:a.UserDate,weight:a.weightlog}).then(function(b){a.doAcceptGoalRequest(a.acceptGoalId,a.weightlog)},function(){errorMessage(c,"Please try again later!")})},a.doCreateGoal=function(){a.loaded=!0,""==document.getElementById("start").value?a.createGoal.enddate=g:a.createGoal.enddate=document.getElementById("start").value,a.createGoal.goaltype=parseInt(a.createGoal.goaltype),a.createGoal.targetweight=parseFloat(a.createGoal.targetweight),a.createGoal.userweight=a.weightlog,b.postRequest("user/insertUserGoal/",a.createGoal).then(function(b){successMessage(c,"Goal Successfully Created!"),a.doGetMyGoalList(),a.loaded=!1},function(){errorMessage(c,"Please try again later!")})},a.acceptGoalCheck=function(c){b.postRequest("/user/getWeightLogGraph/",{startdate:a.UserDate,enddate:a.UserDate}).then(function(b){a.UserWeightEntry=b.data.Weight_logs[0].userentry,0==a.UserWeightEntry?a.doAddWeightPopup(c):1==a.UserWeightEntry&&a.doAcceptGoalRequest(c,a.weightlog)})},a.doAcceptGoalRequest=function(a,d){b.putRequest("user/acceptGoal/",{goalid:a,currentweight:d}).then(function(){successMessage(c,"Successfully Joined!"),$("#modal_trigger1").leanModal({top:200,overlay:.6,closeButton:".modal_close"}),f.path("/group-goal-view/"+a)},function(){errorMessage(c,"Please try again later!")})},a.doDeleteGoalRequest=function(d){b.deleteRequest("user/rejectOrExistGoalMember/",{goalid:d}).then(function(){successMessage(c,"Successfully Exited!"),a.doGetMyGoalList()},function(){errorMessage(c,"Please try again later!")})},a.resetdata=function(){a.friendsearch="",$(function(){$("#lean_overlay").fadeTo(1e3),$("#modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()})}}]),userApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),userApp.filter("startsWithLetter",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];d.test(f.user_name)&&c.push(f)}else;return c}}),userApp.filter("startsWithLetterRemain",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];d.test(f.name)&&c.push(f)}else;return c}});