var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination"]);userApp.controller("GoalController",function(e,o,t,a,n,l){e.activeClass.groupGoal="active",e.doGetMyGoalList=function(){e.paginationLoad=!1,e.loaded=!0,o.getRequest("user/getMyGoallist","").then(function(t){e.myGoalList=[],e.myRequestGoalList=[],$.each(t.data.MyGoallist,function(t,a){o.postRequest("user/getGoalMemberList/",{goalid:a.goalid}).then(function(o){a.members=o.data.Goal_Data.length,1==a.activestatus?e.myGoalList.push(a):e.myRequestGoalList.push(a)})}),e.loaded=!1,e.paginationLoad=!0})},e.doGetViewGoal=function(){e.isRequest=a.current.request,o.postRequest("user/getIndividualGoalDetail/",{goalid:n.id}).then(function(o){e.goalDetail=o.data.Goal_Data,2==e.goalDetail.status&&e.viewRank()})},e.doGetViewGoalMember=function(){e.loaded=!0,e.memberUserIdList=[],o.postRequest("user/getGoalMemberList/",{goalid:n.id}).then(function(t){e.goalMembers=t.data.Goal_Data,$.each(e.goalMembers,function(o,t){e.memberUserIdList.push(t.userid)}),e.loaded=!1,o.getRequest("user/getMyFriendsList/","").then(function(o){e.myRemainderFriendsList=[],$.each(o.data.Friends_List,function(o,t){"-1"==e.memberUserIdList.indexOf(t.userid)&&e.myRemainderFriendsList.push(t)})})})},e.doAddMember=function(t){o.postRequest("user/insertGoalMembers/",{goalid:n.id,memberlist:[t]}).then(function(){e.doGetViewGoalMember()})},e.doRemoveMember=function(a){o.deleteRequest("user/deleteGoalMember/",{goalid:n.id,memberid:a}).then(function(){successMessage(t,"Successfully Removed!"),e.doGetViewGoalMember()},function(){errorMessage(t,"Please try again later!")})},e.doConfirmation=function(o){$(function(){$("#lean_overlay").fadeTo(1e3),$("#confirmation").fadeIn(600),$(".common_model").show()}),e.deleteId=o,$(".modal_close").click(function(){$(".common_model").hide(),$("#confirmation").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#confirmation").hide(),$("#lean_overlay").hide()})},e.doDeleteGroup=function(a){o.deleteRequest("user/deleteGoal/",{goalid:a}).then(function(){successMessage(t,"Goal Successfully Deleted!"),e.doGetMyGoalList()},function(){errorMessage(t,"Please try again later!")})},e.doQuitGroup=function(){o.postRequest("user/completeGoal/",{goalid:n.id}).then(function(){successMessage(t,"Goal Successfully Completed!"),e.doGetViewGoal()},function(){errorMessage(t,"Please try again later!")})},e.doExitConfirmation=function(){$(function(){$("#lean_overlay").fadeTo(1e3),$("#confirmation-remove").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#confirmation-remove").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#confirmation-remove").hide(),$("#lean_overlay").hide()})},e.doExitGroup=function(){o.deleteRequest("user/rejectOrExistGoalMember/",{goalid:n.id}).then(function(){e.isRequest?l.path("/groupGoalRequest"):l.path("/groupGoal"),successMessage(t,"Successfully Exit!"),e.doGetMyGoalList()},function(){errorMessage(t,"Please try again later!")})},e.doAcceptGroup=function(){o.putRequest("user/acceptGoal/",{goalid:n.id}).then(function(){successMessage(t,"Successfully Accepted!"),l.path("/groupGoalView/"+n.id)},function(){errorMessage(t,"Please try again later!")})},e.doAddGoalPopup=function(){e.createGoal={},e.createGoalForm.$setPristine(),e.createGoal.goaltype=1,$(function(){$("#lean_overlay").fadeTo(1e3),$("#createGoal").fadeIn(600),$(".common_model").show(),e.shouldBeOpen=!0}),$(".modal_close").click(function(){$(".common_model").hide(),$("#createGoal").hide(),$("#lean_overlay").hide(),e.shouldBeOpen=!1}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#createGoal").hide(),$("#lean_overlay").hide(),e.shouldBeOpen=!1})},e.viewRank=function(){o.postRequest("user/rankGoalList/",{goalid:n.id}).then(function(o){e.rankList=o.data.Goal_Data,1==e.goalDetail.status&&($(function(){$("#lean_overlay").fadeTo(1e3),$("#modal1").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#modal1").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#modal1").hide(),$("#lean_overlay").hide()}))},function(){errorMessage(t,"Please try again later!")})},n.id?(e.doGetViewGoal(),e.doGetViewGoalMember()):e.doGetMyGoalList();var i=new Date,s=i.getDate(),r=i.getMonth()+1,d=i.getFullYear();10>s&&(s="0"+s),10>r&&(r="0"+r),i=s+"/"+r+"/"+d,e.doCreateGoal=function(){e.loaded=!0,""==document.getElementById("start").value?e.createGoal.startdate=e.createGoal.enddate=i:(e.createGoal.startdate=document.getElementById("start").value,e.createGoal.enddate=document.getElementById("end").value),e.createGoal.goaltype=parseInt(e.createGoal.goaltype),o.postRequest("user/insertUserGoal/",e.createGoal).then(function(){successMessage(t,"Goal Successfully Created!"),e.doGetMyGoalList(),e.loaded=!1},function(){errorMessage(t,"Please try again later!")})},e.doAcceptGoalRequest=function(e){o.putRequest("user/acceptGoal/",{goalid:e}).then(function(){successMessage(t,"Successfully Joined!"),$("#modal_trigger1").leanModal({top:200,overlay:.6,closeButton:".modal_close"}),l.path("/groupGoalView/"+e)},function(){errorMessage(t,"Please try again later!")})},e.doDeleteGoalRequest=function(a){o.deleteRequest("user/rejectOrExistGoalMember/",{goalid:a}).then(function(){successMessage(t,"Successfully Exited!"),e.doGetMyGoalList()},function(){errorMessage(t,"Please try again later!")})},e.resetdata=function(){e.friendsearch="",$(function(){$("#lean_overlay").fadeTo(1e3),$("#modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()})}}),userApp.controller("GoalViewController",function(){alert("okay")}),userApp.filter("trusted",["$sce",function(e){return function(o){return e.trustAsResourceUrl(o)}}]),userApp.filter("startsWithLetter",function(){return function(e,o){var t=[],a=new RegExp(o,"i");if(e)for(var n=0;n<e.length;n++){var l=e[n];a.test(l.user_name)&&t.push(l)}else;return t}}),userApp.filter("startsWithLetterRemain",function(){return function(e,o){var t=[],a=new RegExp(o,"i");if(e)for(var n=0;n<e.length;n++){var l=e[n];a.test(l.name)&&t.push(l)}else;return t}});