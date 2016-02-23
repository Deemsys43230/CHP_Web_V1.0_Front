var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","angularUtils.directives.dirPagination"]);adminApp.controller("CoachController",["$scope","requestHandler","Flash",function(e,a,t){e.doGetCoachList=function(){e.loaded=!0,a.getRequest("admin/getallCoachListbyAdmin/","").then(function(a){e.coachList=a.data.getallCoachListbyAdmin,e.loaded=!1,e.paginationLoad=!0})},e.doEnableDisableCoach=function(s){"none"!=$(".search-list-form").css("display")&&($(".search-list-form").hide(),$(".search-list-form").show(2400)),a.postRequest("admin/enableordisableUser/",{userid:s}).then(function(){e.doGetCoachList(),successMessage(t,"Successfully Updated")},function(){errorMessage(t,"Please Try Again Later")})},e.doAddCoach=function(){e.coach.role=2,a.postRequest("admin/registerCoach/",e.coach).then(function(){successMessage(t,"Successfully Registered"),$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide(),e.doGetCoachList(),e.coach={},e.confirm_password="",e.coachRegisterForm=!1},function(){errorMessage(t,"Please Try Again Later")})},e.init=function(){e.paginationLoad=!1,e.doGetCoachList()},$(".show-list-search").click(function(){$(".search-list-form").toggle(300),$(".search-list-form input").focus()}),e.reset=function(){e.coach={},e.coach.name="",e.coach.emailid="",e.coach.password="",e.coach.confirm_password="",e.coachRegisterForm.$setPristine(),e.shouldBeOpen=!0,"none"!=$(".search-list-form").css("display")&&$(".search-list-form").hide()}}]),adminApp.controller("CoachViewController",["$scope","requestHandler","Flash","$routeParams",function(e,a,t,s){e.averageRate=.1,e.paginationLoad=!1,e.doGetCoachDetailsByUser=function(s){e.coach={status:"coach-view"},e.viewload=!0,a.getRequest("getCoachIndividualDetailbyAdmin/"+s,"").then(function(a){e.usercoachdetails=a.data.getCoachIndividualDetail,null==e.usercoachdetails.about&&(e.usercoachdetails.about="NA"),null==e.usercoachdetails.specialist&&(e.usercoachdetails.specialist="NA"),null==e.usercoachdetails.qualification&&(e.usercoachdetails.qualification="NA"),null==e.usercoachdetails.experience&&(e.usercoachdetails.experience="0"),null==e.usercoachdetails.specialist&&(e.usercoachdetails.specialist="NA"),null==e.usercoachdetails.phone&&(e.usercoachdetails.phone="NA"),null==e.usercoachdetails.dob&&(e.usercoachdetails.dob="NA"),null==e.usercoachdetails.country&&(e.usercoachdetails.country="NA"),null==e.usercoachdetails.state&&(e.usercoachdetails.state="NA"),null==e.usercoachdetails.city&&(e.usercoachdetails.city="NA"),null==e.usercoachdetails.zipcode&&(e.usercoachdetails.zipcode="NA")}),a.getRequest("getRatingsandReviews/"+s,"").then(function(a){e.coachReviews=a.data.Ratings_Reviews,e.viewload=!1,e.totalRatings=e.coachReviews.totalRatings,e.avgRatings=e.coachReviews.averageRatings,0==e.coachReviews.averageRatings?e.averageRate=.1:e.averageRate=e.coachReviews.averageRatings},function(){},function(){errorMessage(t,"Please try again later!")})},e.doGetCoachRatings=function(t){e.reviewload=!0,a.getRequest("getRatingsandReviews/"+t,"").then(function(a){e.coachReviews=a.data.Ratings_Reviews.Reviews,e.reviewload=!1})},e.coachReview=function(a){e.doGetCoachRatings(a),e.coachViewId=a,e.coach={status:"coach-reviews"}},e.userCoachViewInit=function(){e.doGetCoachDetailsByUser(s.id),e.coachView={status:"coach-reviews"},e.doGetCoachRatings(s.id)}}]),adminApp.filter("trusted",["$sce",function(e){return function(a){return e.trustAsResourceUrl(a)}}]),adminApp.filter("startsWithLettercoach",function(){return function(e,a){var t=[],s=new RegExp(a,"i");if(e)for(var i=0;i<e.length;i++){var c=e[i];(s.test(c.emailid)||s.test(c.name))&&t.push(c)}else;return t}}),adminApp.directive("averageStarRating",function(){return{restrict:"EA",template:"<div class='average-rating-container'>  <ul class='rating background' class='readonly'>    <li ng-repeat='star in stars' class='star'>      <i class='fa fa-star'></i>    </li>  </ul>  <ul class='rating foreground' class='readonly' style='width:{{filledInStarsContainerWidth}}%'>    <li ng-repeat='star in stars' class='star filled'>      <i class='fa fa-star'></i>    </li>  </ul></div>",scope:{averageRatingValue:"=ngModel",max:"=?"},link:function(e){function a(){e.stars=[];for(var a=0;a<e.max;a++)e.stars.push({});var t=76;e.filledInStarsContainerWidth=e.averageRatingValue/e.max*t}void 0==e.max&&(e.max=5),e.$watch("averageRatingValue",function(e,t){t&&a()})}}});