var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","summernote","angularUtils.directives.dirPagination"]);adminApp.controller("LatestNewsController",function(e,t,s,a,n){e.isNew=!0,e.title="Add Latest News",e.siteMenuList=n,$.each(e.siteMenuList,function(e,t){2==t.id?t.active="active":t.active=""}),e.options={height:250},e.doGetLatestNews=function(){e.loaded=!0,t.getRequest("admin/getLatestNews/","").then(function(t){e.news=t.data.News,e.loaded=!1,e.paginationLoad=!0},function(){errorMessage(s,"Please try again later!")})},e.doAddLatestNews=function(){t.postRequest("admin/insertorupdateLatestNews/",e.latest).then(function(){successMessage(s,"Successfully Added"),a.path("latestNews")},function(){errorMessage(s,"Please try again later!")})},e.doEnableDisableLatestNews=function(a){"none"!=$(".search-list-form").css("display")&&($(".search-list-form").hide(),$(".search-list-form").show(2400)),t.postRequest("admin/disableLatestNews/",{newsid:a}).then(function(){e.doGetLatestNews(),successMessage(s,"Successfully Updated")},function(){errorMessage(s,"Please try again later!")})},e.init=function(){e.paginationLoad=!1,e.doGetLatestNews()},$(".show-list-search").click(function(){$(".search-list-form").toggle(300),$(".search-list-form input").focus()})}),adminApp.controller("LatestNewsEditController",function(e,t,s,a,n,i){e.siteMenuList=i,$.each(e.siteMenuList,function(e,t){2==t.id?t.active="active":t.active=""}),e.options={height:250};var o="";e.doGetLatestNewsByID=function(){e.isNew=!1,e.title="Edit Latest News",t.getRequest("admin/getLatestNewsById/"+n.id,"").then(function(t){o=angular.copy(t.data.News),e.latest=t.data.News},function(){errorMessage(s,"Please try again later!")})},e.doUpdateLatestNews=function(){t.putRequest("admin/insertorupdateLatestNews/",e.latest).then(function(){successMessage(s,"Successfully Updated"),a.path("latestNews")},function(){errorMessage(s,"Please try again later!")})},e.isClean=function(){return console.log(o),console.log(e.latest),angular.equals(o,e.latest)},e.doGetLatestNewsByID()}),adminApp.filter("html",["$sce",function(e){return function(t){return e.trustAsHtml(t)}}]),adminApp.filter("startsWithLetterNews",function(){return function(e,t){var s=[],a=new RegExp(t,"i");if(e)for(var n=0;n<e.length;n++){var i=e[n];(a.test(i.title)||a.test(i.datetime))&&s.push(i)}else;return s}});var commonApp=angular.module("commonApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate"]);commonApp.controller("NewsUserController",function(e,t,s,a){e.doGetNewsByUser=function(){t.getRequest("getLatestNewsByUser/","").then(function(t){e.usernewslist=t.data.News},function(){errorMessage(s,"Please try again later!")})},e.doGetNewsDetailsByUser=function(a){$("html, body").animate({scrollTop:0},600),t.getRequest("getLatestNewsDetail/"+a,"").then(function(t){e.usernewsdetails=t.data.News},function(){errorMessage(s,"Please try again later!")})},e.doGetNewsByUser(),e.doGetNewsDetailsByUser(a.id)}),commonApp.filter("html",["$sce",function(e){return function(t){return e.trustAsHtml(t)}}]),commonApp.filter("toSec",function(){return function(e){if(e){dateArgs=e.match(/\d{2,4}/g),year=dateArgs[2],month=parseInt(dateArgs[1])-1,day=dateArgs[0],hour=dateArgs[3],minutes=dateArgs[4];var t=new Date(year,month,day,hour,minutes).getTime();return t||""}return""}});