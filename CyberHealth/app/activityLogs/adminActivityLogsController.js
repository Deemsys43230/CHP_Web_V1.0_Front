var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination","ui.bootstrap"]);adminApp.controller("AdminActivityLogsController",["$scope","requestHandler","Flash","$routeParams",function(a,b,c,d){var e=new Date,f=e.getDate(),g=e.getMonth()+1,h=e.getFullYear();10>f&&(f="0"+f),10>g&&(g="0"+g),e=f+"/"+g+"/"+h,a.selectedDate=e,a.totalEarningsByAdmin=0,a.totalEarningsByCoach=0,a.loaddisable=!1,a.currentPage=1,a.doGetCoursePaymentDetails=function(){a.loaded=!0,a.offset=(a.currentPage-1)*a.itemsPerPage,a.limit=a.currentPage*a.itemsPerPage,a.courseSearch||(a.courseSearch=""),a.params={limit:a.limit,offset:a.offset,searchname:a.courseSearch,sortid:a.sortId,sorttype:a.sorttype},b.postRequest("admin/publishedCoursePaymentlist/",a.params).then(function(b){a.courses=[],a.courses=b.data.courselist,a.total_count=b.data.totalrecordcount,a.loaded=!1})},a.doGetCourseSubsciberList=function(){a.offset=(a.currentPage-1)*a.itemsPerPage,a.limit=a.currentPage*a.itemsPerPage,a.loaded=!0,void 0==a.courseSearch&&(a.courseSearch=""),a.params={courseid:d.id,limit:a.limit,offset:a.offset,searchname:a.courseSearch,sortid:a.sortId,sorttype:a.sorttype},b.postRequest("admin/paymentHistoryforCourse/",a.params).then(function(b){a.coursesPaymentHistory=[],a.coachid=b.data.coursePaylist.coachid,a.coursesPaymentHistory=b.data.coursePaylist.paymentHistory,a.courseDetails=b.data.coursePaylist,a.total_count=b.data.totalrecordcount,a.loaded=!1})},a.doGetCoachList=function(){a.loaded=!0,b.getRequest("admin/coachListPayment/","").then(function(b){a.coachList=b.data.CoachList,a.loaded=!1,a.paginationLoad=!0})},a.doGetCoachSubscribersList=function(){a.offset=(a.currentPage-1)*a.itemsPerPage,a.limit=a.currentPage*a.itemsPerPage,a.loaded=!0,void 0==a.subscriberSearch&&(a.subscriberSearch=""),a.params={coachid:d.id,limit:a.limit,offset:a.offset,searchname:a.subscriberSearch,sortid:a.sortId,sorttype:a.sorttype},b.postRequest("admin/paymentHistoryforCoach/",a.params).then(function(b){a.coachPaymentHistory=[],a.coachPaymentHistory=b.data.coachPaylist,a.coachid=b.data.coachPaylist.coachid,a.total_count=b.data.totalrecordcount,a.loaded=!1})},a.doGetSubscriberDetailView=function(){a.loaded=!0,b.postRequest("admin/detailViewofCourseTransactionbyAdmin/",{paymentid:d.id}).then(function(b){a.coursePurchaseDetailView=b.data.course_purchase_detail,a.loaded=!1})},a.doGetCoachSubscriberDetailView=function(){a.loaded=!0,b.postRequest("admin/detailViewofsubscriptionTransactionbyAdmin/",{paymentid:d.id}).then(function(b){a.coachSubscriptionDetailView=b.data.subscription_transaction_detail,a.loaded=!1})},a.doGetCoursePuchaseDetails=function(){b.postRequest("courseDetail/",{courseid:d.id}).then(function(b){a.coursePurchsedDeatils=b.data.coursedetail})},a.sortingCourse=function(b){a.sortId=b,a.currentPage=1;var c=a.sortIcon[b];a.sortIcon=["fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down"],"fa fa-caret-down"==c?(a.sortIcon[b]="fa fa-caret-up",a.sorttype=2):(a.sortIcon[b]="fa fa-caret-down",a.sorttype=1),a.doGetCoursePaymentDetails()},a.sortingCourseSubscriber=function(b){a.sortId=b,a.currentPage=1;var c=a.sortIcon[b];a.sortIcon=["fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down"],"fa fa-caret-down"==c?(a.sortIcon[b]="fa fa-caret-up",a.sorttype=2):(a.sortIcon[b]="fa fa-caret-down",a.sorttype=1),a.doGetCourseSubsciberList()},a.sortingCoachSubscriber=function(b){a.sortId=b,a.currentPage=1;var c=a.sortIcon[b];a.sortIcon=["fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down"],"fa fa-caret-down"==c?(a.sortIcon[b]="fa fa-caret-up",a.sorttype=2):(a.sortIcon[b]="fa fa-caret-down",a.sorttype=1),a.doGetCoachSubscribersList()},a.totalEarnbycourse=function(){b.getRequest("admin/totalShareByCourse/","").then(function(b){a.totalEarningsByAdmin=b.data.totalearningsAdmin,a.totalEarningsByCoach=b.data.totalearningsCoach})},a.totalEarnByCourseId=function(){b.postRequest("admin/adminandcoachsharebyCourseid/",{courseid:d.id}).then(function(b){a.totalEarningsByAdmin=b.data.totalearningsAdmin,a.totalEarningsByCoach=b.data.totalearningsCoach})},a.totalEarnByCoaches=function(){b.getRequest("admin/totalShareByCoach/","").then(function(b){a.totalEarningsByAdmin=b.data.totalearningsAdmin,a.totalEarningsByCoach=b.data.totalearningsCoach})},a.totalEarnByCoachId=function(){b.postRequest("admin/adminandcoachsharebyCoachid/",{coachid:d.id}).then(function(b){a.totalEarningsByAdmin=b.data.totalearningsAdmin,a.totalEarningsByCoach=b.data.totalearningsCoach})},a.coachSortIcons={coachname:"fa fa-caret-down",coachsubscriptioncount:"fa fa-caret-down",coachonemonthpay:"fa fa-caret-down",toatlearningsCoach:"fa fa-caret-down",totalearningsAdmin:"fa fa-caret-down"},a.sortBy=function(b){a.sortKey=b,a.reverse=!a.reverse;var c=a.coachSortIcons[b];a.coachSortIcons={coachname:"fa fa-caret-down",coachsubscriptioncount:"fa fa-caret-down",coachonemonthpay:"fa fa-caret-down",toatlearningsCoach:"fa fa-caret-down",totalearningsAdmin:"fa fa-caret-down"},"fa fa-caret-down"==c?a.coachSortIcons[b]="fa fa-caret-up":a.coachSortIcons[b]="fa fa-caret-down"},a.init=function(){a.itemsPerPage=10,a.courseSearch="",a.sortId="",a.sorttype="",a.sortIcon=["fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down"],a.doGetCoursePaymentDetails(),a.totalEarnbycourse()},a.subscribersListInit=function(){a.itemsPerPage=6,a.courseSearch="",a.sortId="",a.sorttype="",a.sortIcon=["fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down"],a.doGetCourseSubsciberList(),a.totalEarnByCourseId()},a.coachListInit=function(){a.paginationLoad=!1,a.doGetCoachList(),a.totalEarnByCoaches()},a.coachSubscribersListInit=function(){a.itemsPerPage=10,a.subscriberSearch="",a.sortId="",a.sorttype="",a.sortIcon=["fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down","fa fa-caret-down"],a.doGetCoachSubscribersList(),a.totalEarnByCoachId()},a.subscribersDetailInit=function(){a.doGetSubscriberDetailView()},a.coachSubscribersDetailInit=function(){a.doGetCoachSubscriberDetailView()},a.doManualPay=function(d,e){a.loaddisable=!0,a.loaded=!0,b.postRequest("admin/payManualImplicit/",{coachid:e,paymentid:d}).then(function(b){1==b.data.Response_status?(a.subscribersListInit(),successMessage(c,"Payment successfull"),a.loaded=!1,a.loaddisable=!1):0==b.data.Response_status&&($(function(){$("#lean_overlay").fadeTo(1e3),$("#errormodal").fadeIn(600),$(".common_model").show()}),a.errormsg=b.data.Error,$(".modal_close").click(function(){$(".common_model").hide(),$("#errormodal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#errormodal").hide(),$("#lean_overlay").hide()}),a.loaded=!1,a.loaddisable=!1)})}}]),adminApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),adminApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),adminApp.filter("startsWithLetterFood",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];d.test(f.coachname)&&c.push(f)}else;return c}});