var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination"]);adminApp.controller("MemberController",function(e,i,t,a,s){e.doGetMemberList=function(){e.loaded=!0,i.getRequest("admin/getallUserListbyAdmin/","").then(function(i){e.userList=i.data.getallUserListbyAdmin,e.loaded=!1,e.paginationLoad=!0})},e.doViewMembers=function(){e.loaded=!0,i.getRequest("getUserIndividualDetail/"+a.id,"").then(function(i){e.myImgSrc=s.trustAsResourceUrl(i.data.getUserIndividualDetail.imageurl+"?decache="+Math.random()),e.viewMemberDetails=i.data.getUserIndividualDetail,null==e.viewMemberDetails.about&&(e.viewMemberDetails.about="N/A"),null==e.viewMemberDetails.dob&&(e.viewMemberDetails.dob="N/A"),null==e.viewMemberDetails.phone&&(e.viewMemberDetails.phone="N/A"),null==e.viewMemberDetails.country&&(e.viewMemberDetails.country="N/A"),null==e.viewMemberDetails.state&&(e.viewMemberDetails.state="N/A"),null==e.viewMemberDetails.city&&(e.viewMemberDetails.city="N/A"),null==e.viewMemberDetails.zipcode&&(e.viewMemberDetails.zipcode="N/A"),e.loaded=!1,e.paginationLoad=!0},function(){errorMessage(t,"Please try again later!")})},e.doEnableDisableUser=function(a){"none"!=$(".search-list-form").css("display")&&($(".search-list-form").hide(),$(".search-list-form").show(2400)),i.postRequest("admin/enableordisableUser/",{userid:a}).then(function(){e.doGetMemberList(),successMessage(t,"Successfully Updated")},function(){errorMessage(t,"Please Try Again Later")})},$(".show-list-search").click(function(){$(".search-list-form").toggle(300),$(".search-list-form input").focus()}),e.init=function(){e.paginationLoad=!1,e.doGetMemberList()}}),adminApp.filter("startsWithLetteruser",function(){return function(e,i){var t=[],a=new RegExp(i,"i");if(e)for(var s=0;s<e.length;s++){var r=e[s];(a.test(r.emailid)||a.test(r.name))&&t.push(r)}else;return t}});