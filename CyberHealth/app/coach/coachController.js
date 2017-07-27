var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination"]);adminApp.controller("CoachController",["$scope","requestHandler","Flash","coachMenuService","$location","$routeParams",function(a,b,c,d,e,f){a.inviteId=f.id,console.log(f.id),a.coachMenuList=d,$.each(a.coachMenuList,function(a,b){b.href==e.path().substr(1)?b.active="active":b.active=""}),a.doGetCoachList=function(){a.loaded=!0,b.getRequest("admin/getallCoachListbyAdmin/","").then(function(b){a.coachList=b.data.getallCoachListbyAdmin,a.loaded=!1,a.paginationLoad=!0})},a.doGetInvitationList=function(){a.loaded=!0,b.getRequest("admin/getinterestedcoachlist/","").then(function(b){a.invitationList=b.data.coaches,a.loaded=!1,a.paginationLoad=!0})},a.doViewInvitationList=function(){a.loaded=!0,b.getRequest("admin/getinterestedcoachlist/","").then(function(b){a.invitationList=b.data.coaches,console.log(a.invitationList),a.loaded=!1,a.paginationLoad=!0;a.invitationList;$.each(a.invitationList,function(b,c){c.id==f.id&&(a.invitationDetails=c)})})},a.doDeleteInvitationList=function(d){a.loaded=!0,b.postRequest("admin/deletecoachinterest/",{id:a.InvitationId}).then(function(b){a.loaded=!1,a.paginationLoad=!0,a.doGetInvitationList()},function(){errorMessage(c,"Please try again later!")})},a.doGetInvitationByID=function(){a.loaded=!0,b.getRequest("admin/getinterestedcoachlist/","").then(function(b){a.invitationList=b.data.coaches,a.loaded=!1,a.paginationLoad=!0;a.invitationList;$.each(a.invitationList,function(b,c){c.id==f.id&&(a.invitationDetails=c)})})},a.deleteModel=function(b){a.InvitationId=b,$(function(){$("#lean_overlay").fadeTo(1e3),$("#modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()})},a.confirmModel=function(){$(function(){$("#lean_overlay").fadeTo(1e3),$("#modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()})},a.doEnableDisableCoach=function(d){"none"!=$(".search-list-form").css("display")&&($(".search-list-form").hide(),$(".search-list-form").show(2400)),b.postRequest("admin/enableordisableUser/",{userid:d}).then(function(b){a.doGetCoachList(),successMessage(c,"Successfully Updated")},function(){errorMessage(c,"Please Try Again Later")})},a.doAddCoach=function(){b.postRequest("admin/registerCoach/",a.invitationDetails).then(function(){successMessage(c,"Successfully Registered"),$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide(),a.doGetCoachList(),e.path("invitation-list")},function(){errorMessage(c,"Please Try Again Later")})},a.invitationCoachViewInit=function(){a.doViewInvitationList()},a.editInvitationInit=function(){a.doGetInvitationByID()},a.init=function(){a.paginationLoad=!1,a.doGetCoachList(),a.doGetInvitationList()},$(".show-list-search").click(function(){$(".search-list-form").toggle(300),$(".search-list-form input").focus()}),a.reset=function(){a.coach={},a.coach.name="",a.coach.emailid="",a.coach.password="",a.confirm_password="",a.coachRegisterForm.$setPristine(),a.coachRegisterForm1.$setPristine(),a.shouldBeOpen=!0,"none"!=$(".search-list-form").css("display")&&$(".search-list-form").hide()}}]),adminApp.controller("CoachViewController",["$scope","requestHandler","Flash","$routeParams",function(a,b,c,d){a.averageRate=.1,a.paginationLoad=!1,a.doGetCoachDetailsByUser=function(d){a.coach={status:"coach-view"},a.viewload=!0,b.getRequest("getCoachIndividualDetailbyAdmin/"+d,"").then(function(b){a.usercoachdetails=b.data.getCoachIndividualDetail,null!=a.usercoachdetails.experience&&(a.years=Math.trunc(a.usercoachdetails.experience/12),a.months=a.usercoachdetails.experience%12),null==a.usercoachdetails.about&&(a.usercoachdetails.about="NA"),null==a.usercoachdetails.specialist&&(a.usercoachdetails.specialist="NA"),null==a.usercoachdetails.qualification&&(a.usercoachdetails.qualification="NA"),null==a.usercoachdetails.experience&&(a.usercoachdetails.experience="0"),null==a.usercoachdetails.specialist&&(a.usercoachdetails.specialist="NA"),null==a.usercoachdetails.phone&&(a.usercoachdetails.phone="NA"),null==a.usercoachdetails.dob&&(a.usercoachdetails.dob="NA"),null==a.usercoachdetails.country&&(a.usercoachdetails.country="NA"),null==a.usercoachdetails.state&&(a.usercoachdetails.state="NA"),null==a.usercoachdetails.city&&(a.usercoachdetails.city="NA"),null==a.usercoachdetails.zipcode&&(a.usercoachdetails.zipcode="NA")}),b.getRequest("getRatingsandReviews/"+d,"").then(function(b){a.coachReviews=b.data.Ratings_Reviews,a.viewload=!1,a.totalRatings=a.coachReviews.totalRatings,a.avgRatings=a.coachReviews.averageRatings,0==a.coachReviews.averageRatings?a.averageRate=.1:a.averageRate=a.coachReviews.averageRatings},function(){},function(){errorMessage(c,"Please try again later!")})},a.doGetCoachRatings=function(c){a.reviewload=!0,b.getRequest("getRatingsandReviews/"+c,"").then(function(b){a.coachReviews=b.data.Ratings_Reviews.Reviews,a.reviewload=!1})},a.coachReview=function(b){a.doGetCoachRatings(b),a.coachViewId=b,a.coach={status:"coach-reviews"}},a.userCoachViewInit=function(){a.doGetCoachDetailsByUser(d.id),a.coachView={status:"coach-reviews"},a.doGetCoachRatings(d.id)}}]),adminApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),adminApp.filter("startsWithLettercoach",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.emailid)||d.test(f.name))&&c.push(f)}else;return c}}),adminApp.filter("startsWithLettercoach",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.emailid)||d.test(f.name))&&c.push(f)}else;return c}}),adminApp.directive("averageStarRating",function(){return{restrict:"EA",template:"<div class='average-rating-container'>  <ul class='rating background' class='readonly'>    <li ng-repeat='star in stars' class='star'>      <i class='fa fa-star'></i>    </li>  </ul>  <ul class='rating foreground' class='readonly' ng-attr-style='width:{{filledInStarsContainerWidth}}%'>    <li ng-repeat='star in stars' class='star filled'>      <i class='fa fa-star'></i>    </li>  </ul></div>",scope:{averageRatingValue:"=ngModel",max:"=?"},link:function(a,b,c){function d(){a.stars=[];for(var b=0;b<a.max;b++)a.stars.push({});var c=76;a.filledInStarsContainerWidth=a.averageRatingValue/a.max*c}void 0==a.max&&(a.max=5),a.$watch("averageRatingValue",function(a,b){b&&d()})}}});