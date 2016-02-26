var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","summernote","angularUtils.directives.dirPagination"]);adminApp.controller("ForumsController",["$scope","requestHandler","Flash","$location","siteMenuservice",function(a,b,c,d,e){a.isNew=!0,a.title="Add Forum",a.activeClass.forums="active",a.siteMenuList=e,$.each(a.siteMenuList,function(a,b){1==b.id?b.active="active":b.active=""}),a.doGetForums=function(){a.loaded=!0,b.getRequest("getListOfForumsByAdmin/","").then(function(b){a.forums=b.data["Forum details"],a.loaded=!1,a.paginationLoad=!0},function(){errorMessage(c,"Please try again later!")})},a.doAddForum=function(){b.postRequest("insertForum/",a.forumDetails).then(function(a){successMessage(c,"Successfully Added"),d.path("forums")},function(){errorMessage(c,"Please try again later!")})},a.doBlockUnblockForum=function(d){"none"!=$(".search-list-form").css("display")&&($(".search-list-form").hide(),$(".search-list-form").show(2400)),b.putRequest("admin/blockorUnblockForum/",{postid:d}).then(function(b){a.doGetForums(),successMessage(c,"Successfully Updated")},function(){errorMessage(c,"Please try again later!")})},a.init=function(){a.paginationLoad=!1,a.doGetForums()},$(".show-list-search").click(function(){$(".search-list-form").toggle(300),$(".search-list-form input").focus()})}]),adminApp.controller("ForumsEditController",["$scope","requestHandler","Flash","$routeParams","siteMenuService","$location",function(a,b,c,d,e,f){a.activeClass.forums="active",a.siteMenuList=e,$.each(a.siteMenuList,function(a,b){1==b.id?b.active="active":b.active=""});var g="";a.doGetForumsByID=function(){a.isNew=!1,a.title="Edit Forum",a.loaded=!0,b.postRequest("getForumDetailByAdmin/",{postid:d.id}).then(function(b){g=angular.copy(b.data["Forum details"]),console.log("ori",g),a.forumDetails=b.data["Forum details"],console.log("adsd",a.forumDetails),a.loaded=!1},function(){errorMessage(c,"Please try again later!")})},a.doGetForumAnswers=function(){b.postRequest("admin/listofAnswersbyAdmin/",{postid:d.id}).then(function(b){a.forumAnswers=b.data.ForumDiscussionData},function(){errorMessage(c,"Please try again later!")})},a.doBlockUnblockForumAnswer=function(d){b.postRequest("admin/blockorUnblock/",{ansid:d}).then(function(b){successMessage(c,"Successfully Updated"),a.doGetForumAnswers()},function(){errorMessage(c,"Please try again later!")})},a.doPostForumAnswers=function(){b.postRequest("postAnswer/",{comments:a.comments,postid:d.id}).then(function(b){successMessage(c,"Comment Posted Successfully!"),a.doGetForumAnswers(),a.comments="",a.userCommentForm.$setPristine()},function(){errorMessage(c,"Please try again later!")})},a.doUpdateForum=function(){"none"!=$(".search-list-form").css("display")&&($(".search-list-form").hide(),$(".search-list-form").show(2400)),b.putRequest("updateForum/",a.forumDetails).then(function(a){successMessage(c,"Successfully Updated"),f.path("forums")},function(){errorMessage(c,"Please try again later!")})},a.isClean=function(){return console.log(angular.equals(g,a.forumDetails)),angular.equals(g,a.forumDetails)},a.viewInit=function(){a.doGetForumsByID(),a.doGetForumAnswers()},a.editForumInit=function(){a.doGetForumsByID()}}]),adminApp.filter("startsWithLetterForum",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.posttitle)||d.test(f.postdescription))&&c.push(f)}else;return c}}),adminApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),adminApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]);var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination"]);userApp.controller("ForumsUserController",["$scope","requestHandler","Flash","$routeParams","$location",function(a,b,c,d,e){a.isNew=!0,a.title="Add Forum",a.activeClass.forums="active",a.options={height:250},a.abuseDisable=!1,a.doAddForum=function(){b.postRequest("insertForum/",a.forumDetails).then(function(b){a.postid=b.data["Forum details"].postid,successMessage(c,"Successfully Added"),e.path("forumDetails/"+a.postid)},function(){errorMessage(c,"Please try again later!")})},a.doGetForumsByUser=function(){a.loaded=!0,a.forum={status:"forum-view"},b.getRequest("getListOfForumsByUserAndCoach/","").then(function(c){a.userforumlist=c.data["Forum details"],$.each(a.userforumlist,function(a,c){b.postRequest("listofAnswers/",{postid:c.postid}).then(function(a){c.totalcomment=a.data.ForumDiscussionData.length})}),$("#showMostViewed").hide(),$("#showMostViewed").show(700),a.loaded=!1},function(){errorMessage(c,"Please try again later!")})},a.doGetForumDetailsByUser=function(){b.getRequest("getUserId/","").then(function(e){a.loginuserid=e.data.User_Profile.userid,b.postRequest("getForumDetailByUserAndCoach/",{postid:d.id}).then(function(b){a.userforumdetails=b.data["Forum details"],a.loginuserid===a.userforumdetails.userid?a.userCheck=!0:a.userCheck=!1},function(){errorMessage(c,"Please try again later!")})})},a.doGetForumAnswers=function(){b.postRequest("listofAnswers/",{postid:d.id}).then(function(b){a.forumAnswers=b.data.ForumDiscussionData},function(){errorMessage(c,"Please try again later!")})},a.doPostForumAnswers=function(){b.postRequest("postAnswer/",{comments:a.comments,postid:d.id}).then(function(b){a.doGetForumAnswers(),a.comments="",a.userCommentForm.$setPristine()},function(){errorMessage(c,"Please try again later!")})},a.doMarkPostAsAbuse=function(){b.postRequest("abuseCount/",{postid:d.id}).then(function(a){successMessage(c,"Thanks for your evaluation!")},function(){errorMessage(c,"Please try again later!")})},a.doMarkCommentAsAbuse=function(a){b.postRequest("MarkasAbuse/",{ansid:a}).then(function(a){successMessage(c,"Thanks for your evaluation!")},function(){errorMessage(c,"Please try again later!")})},a.doGetForumsByUser(),a.init=function(){a.doGetForumDetailsByUser(),a.doGetForumAnswers()}}]),userApp.controller("ForumsUserEditController",["$scope","requestHandler","Flash","$routeParams","$location",function(a,b,c,d,e){var f="";a.doGetForumDetailsByUserEdit=function(){a.isNew=!1,a.title="Edit Forum",b.postRequest("getForumDetailByUserAndCoach/",{postid:d.id}).then(function(b){f=angular.copy(b.data["Forum details"]),a.forumDetails=b.data["Forum details"]},function(){errorMessage(c,"Please try again later!")})},a.doGetForumAnswers=function(){b.postRequest("listofAnswers/",{postid:d.id}).then(function(b){a.forumAnswers=b.data.ForumDiscussionData},function(){errorMessage(c,"Please try again later!")})},a.doUpdateForum=function(){b.putRequest("updateForum/",a.forumDetails).then(function(b){a.postid=b.data["Forum details"].postid,successMessage(c,"Successfully Updated"),e.path("forumDetails/"+a.postid)},function(){errorMessage(c,"Please try again later!")})},a.doGetForumsByUser=function(){a.loaded=!0,a.forum={status:"forum-view"},b.getRequest("getListOfForumsByUserAndCoach/","").then(function(c){a.userforumlist=c.data["Forum details"],$.each(a.userforumlist,function(a,c){b.postRequest("listofAnswers/",{postid:c.postid}).then(function(a){c.totalcomment=a.data.ForumDiscussionData.length})}),a.loaded=!1,$("#showMostViewed").hide(),$("#showMostViewed").show(300)},function(){errorMessage(c,"Please try again later!")})},a.isClean=function(){return angular.equals(f,a.forumDetails)},a.doGetForumsByUser(),a.Editinit=function(){a.doGetForumDetailsByUserEdit(),a.doGetForumAnswers()},a.Editinit()}]),userApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),userApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),userApp.filter("startsWithLetterForum",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.username)||d.test(f.posttitle)||d.test(f.postdescription))&&c.push(f)}else;return c}});var coachApp=angular.module("coachApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination"]);coachApp.controller("ForumsCoachController",["$scope","requestHandler","Flash","$routeParams","$location",function(a,b,c,d,e){a.isNew=!0,a.title="Add Forum",a.activeClass.forums="active",a.options={height:250},a.abuseDisable=!1,a.doAddForum=function(){b.postRequest("insertForum/",a.forumDetails).then(function(b){a.postid=b.data["Forum details"].postid,successMessage(c,"Successfully Added"),e.path("forumDetails/"+a.postid)},function(){errorMessage(c,"Please try again later!")})},a.doGetForumsByUser=function(){a.loaded=!0,a.forum={status:"forum-view"},b.getRequest("getListOfForumsByUserAndCoach/","").then(function(c){a.userforumlist=c.data["Forum details"],$.each(a.userforumlist,function(a,c){b.postRequest("listofAnswers/",{postid:c.postid}).then(function(a){c.totalcomment=a.data.ForumDiscussionData.length})}),$("#showMostViewed").hide(),$("#showMostViewed").show(300),a.loaded=!1},function(){errorMessage(c,"Please try again later!")})},a.doGetForumDetailsByUser=function(){b.getRequest("getUserId/","").then(function(e){a.loginuserid=e.data.User_Profile.userid,b.postRequest("getForumDetailByUserAndCoach/",{postid:d.id}).then(function(b){a.userforumdetails=b.data["Forum details"],a.loginuserid===a.userforumdetails.userid?a.userCheck=!0:a.userCheck=!1},function(){errorMessage(c,"Please try again later!")})})},a.doGetForumAnswers=function(){b.postRequest("listofAnswers/",{postid:d.id}).then(function(b){a.forumAnswers=b.data.ForumDiscussionData},function(){errorMessage(c,"Please try again later!")})},a.doPostForumAnswers=function(){b.postRequest("postAnswer/",{comments:a.comments,postid:d.id}).then(function(b){successMessage(c,"Your Comment Successfully Posted!"),a.doGetForumAnswers(),a.comments="",a.userCommentForm.$setPristine()},function(){errorMessage(c,"Please try again later!")})},a.doMarkPostAsAbuse=function(){b.postRequest("abuseCount/",{postid:d.id}).then(function(b){successMessage(c,"Thanks for your evaluation!"),a.abuseDisable=!0},function(){errorMessage(c,"Please try again later!")})},a.doMarkCommentAsAbuse=function(a){b.postRequest("MarkasAbuse/",{ansid:a}).then(function(a){successMessage(c,"Thanks for your evaluation!")},function(){errorMessage(c,"Please try again later!")})},a.doGetForumsByUser(),a.init=function(){a.doGetForumDetailsByUser(),a.doGetForumAnswers()}}]),coachApp.controller("ForumsCoachEditController",["$scope","requestHandler","Flash","$routeParams","$location",function(a,b,c,d,e){a.activeClass.forums="active";var f="";a.doGetForumDetailsByUserEdit=function(){a.isNew=!1,a.title="Edit Forum",b.postRequest("getForumDetailByUserAndCoach/",{postid:d.id}).then(function(b){f=angular.copy(b.data["Forum details"]),a.forumDetails=b.data["Forum details"]},function(){errorMessage(c,"Please try again later!")})},a.doGetForumAnswers=function(){b.postRequest("listofAnswers/",{postid:d.id}).then(function(b){a.forumAnswers=b.data.ForumDiscussionData},function(){errorMessage(c,"Please try again later!")})},a.doUpdateForum=function(){b.putRequest("updateForum/",a.forumDetails).then(function(b){a.postid=b.data["Forum details"].postid,successMessage(c,"Successfully Updated"),e.path("forumDetails/"+a.postid)},function(){errorMessage(c,"Please try again later!")})},a.doGetForumsByUser=function(){a.loaded=!0,a.forum={status:"forum-view"},b.getRequest("getListOfForumsByUserAndCoach/","").then(function(c){a.userforumlist=c.data["Forum details"],$.each(a.userforumlist,function(a,c){b.postRequest("listofAnswers/",{postid:c.postid}).then(function(a){c.totalcomment=a.data.ForumDiscussionData.length})}),a.loaded=!1,$("#showMostViewed").hide(),$("#showMostViewed").show(300)},function(){errorMessage(c,"Please try again later!")})},a.isClean=function(){return angular.equals(f,a.forumDetails)},a.doGetForumsByUser(),a.Editinit=function(){a.doGetForumDetailsByUserEdit(),a.doGetForumAnswers()},a.Editinit()}]),coachApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),coachApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),coachApp.filter("startsWithLetterForum",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.username)||d.test(f.posttitle)||d.test(f.postdescription))&&c.push(f)}else;return c}});