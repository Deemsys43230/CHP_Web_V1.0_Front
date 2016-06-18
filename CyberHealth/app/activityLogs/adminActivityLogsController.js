var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination","ui.bootstrap"]);adminApp.controller("AdminActivityLogsController",["$scope","requestHandler","Flash","$routeParams",function(a,b,c,d){a.searchVal=1,a.loaddisable=!1,a.currentPage=1,a.doGetActivityLogs=function(c){a.selectedDate=c,a.loaded=!0,a.offset=(a.currentPage-1)*a.itemsPerPage,a.limit=a.currentPage*a.itemsPerPage,a.searchText||(a.searchText=""),a.params={limit:a.limit,offset:a.offset,date:c,searchtext:a.searchText,sorttype:a.sorttype},b.postRequest("admin/getActivityLog/",a.params).then(function(b){a.activityLog=b.data.activity_log,a.total_count=b.data.totalRecords,a.loaded=!1})},a.doGetActivityLogsPage=function(b){a.currentPage=1,a.doGetActivityLogs(b)},a.sortingLogId=function(b){a.sortId=b,a.currentPage=1;var c=a.sortIcon[b];a.sortIcon=["fa fa-caret-down"],"fa fa-caret-down"==c?(a.sortIcon[b]="fa fa-caret-up",a.sorttype=2):(a.sortIcon[b]="fa fa-caret-down",a.sorttype=1),a.doGetActivityLogs(a.selectedDate)},a.init=function(){var b=new Date,c=b.getDate(),d=b.getMonth()+1,e=b.getFullYear();10>c&&(c="0"+c),10>d&&(d="0"+d),b=c+"/"+d+"/"+e,a.selectedDate=b,a.itemsPerPage=10,a.searchText="",a.sortId="",a.sorttype=1,a.date=b,a.sortIcon=["fa fa-caret-down","fa fa-caret-down"],a.doGetActivityLogs(a.selectedDate)},a.init()}]),adminApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),adminApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),adminApp.filter("startsWithLetterFood",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];d.test(f.coachname)&&c.push(f)}else;return c}});