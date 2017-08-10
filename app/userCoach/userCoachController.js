var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll']);

userApp.controller('UserCoachController',['$scope','requestHandler','Flash','$location','$q','$routeParams','$route',function($scope,requestHandler,Flash,$location,$q,$routeParams,$route) {

    $scope.activeClass.coach='active';
    $scope.coachreview = {ratinglevel:1};
    $scope.averageRate=0.1;
    $scope.paginationLoad=false;
    $scope.coachInvitations= $route.current.$$route.coachInvitations;

    var myCoachIdListArray = [];
    // $scope.disablereview=false;

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });


    $scope.userCoachPagination= {
                                "limit":200,
                                "searchname":"",
                                "offset":0
                               };
    // To display Coach list by user
    $scope.doGetCoachListByUser=function(){
       
        if($scope.coachInvitations){
            $scope.request=requestHandler.getRequest("user/userreadinvitations/",{});
        }else{
            $scope.request=requestHandler.postRequest("user/usergetcoachlist/",$scope.userCoachPagination);
          }

        
        $scope.request.then(function(response){
            $scope.usercoachlist=response.data.coaches;

            if($routeParams.renew){
                $scope.doGetCoachDetailsByUser($routeParams.renew);
            }
            else{
                if($scope.usercoachlist.length>0)
                    $scope.doGetCoachDetailsByUser(response.data.coaches[0].userid);
            }

            var ratingPromise;
            $.each($scope.usercoachlist, function(index,value){
                value.averageRating=0.1;
                ratingPromise=$scope.doGetRatingsByCoach(value.userid);
               // console.log("Rating Promise", ratingPromise);
                ratingPromise.then(function(result){
                   // console.log("Result",result.averageratings);
                    if(result.averageratings!=0){
                        value.averageRating=result.averageratings;
                    }
                  
                    value.totalReviews= result.totalrecords;
                });
            });
             $.each($scope.usercoachlist, function(index,value){
                 
             });


            $q.all([ratingPromise]).then(function(){
                $scope.usercoachlist=$scope.usercoachlist;
                if($scope.usercoachlist==0){

                }else{
                    $scope.coach = {
                        status: 'coach-view'
                    };
                }
            });

          /*  $scope.items = [];
            $scope.counter = 0;
            $scope.loadMore = function(){
                $scope.userCoachPagination.limit = 1;
                while ($scope.userCoachPagination.limit< 50) {
                    $scope.items.push(++$scope.counter);
                    $scope.userCoachPagination.limit++;
                }
            }
            $scope.loadMore();*/
                        

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.coachRatingPagination={
                                    "limit":3,
                                    "offset":0
                                 };

    $scope.doGetRatingsByCoach=function(userid){
        return requestHandler.postRequest("getCoachRatingsandReviews/"+userid+"/", $scope.coachRatingPagination).then(function (response) {
            return response.data;
        });
    };

    $scope.doGetCoachRatings= function (id) {
        $scope.reviewload=true;
        $scope.coachReviews={};
        requestHandler.postRequest("getCoachRatingsandReviews/"+id+"/", $scope.coachRatingPagination).then(function (response) {
            $scope.coachReviews=response.data.reviews;
            $scope.reviews=response.data.reviews;
            $scope.reviewload=false;
            $scope.totalRatings = response.data.totalrecords;
            $scope.avgRatings = response.data.averageratings;
            if($scope.avgRatings==0)
                $scope.averageRate=0.1;
            else
                $scope.averageRate=$scope.avgRatings;
        });
    };

    $scope.doGetCoachDetailsByUser= function (id){

        $scope.coach = {
            status: 'coach-view'
        };

        $scope.doGetMyCoachListByUser();

        if(myCoachIdListArray.indexOf(id)!=-1)
            $scope.checkSubscribed=0;
        else
            $scope.checkSubscribed=1;

        $scope.viewload=true;

        requestHandler.getRequest("getUserProfile/"+id, "").then(function(response){

            $scope.usercoachdetails=response.data.userprofile;

            if($scope.usercoachdetails.experience!=null){
            $scope.years = Math.trunc($scope.usercoachdetails.experience / 12);
            $scope.months = $scope.usercoachdetails.experience %12;
            }

            if($scope.usercoachdetails.about==null){
                $scope.usercoachdetails.about = "NA";
            }

            if($scope.usercoachdetails.qualification==null){
                $scope.usercoachdetails.qualification = "NA";
            }

            if($scope.usercoachdetails.experience==null){
                $scope.usercoachdetails.experience = "0";
            }

            if($scope.usercoachdetails.specialist==null){
                $scope.usercoachdetails.specialist = "NA";
            }

            if($scope.usercoachdetails.relationship==null){
                $scope.usercoachdetails.relationship = "NA";
            }

            if($scope.usercoachdetails.phone==null){
                $scope.usercoachdetails.phone = "NA";
            }

            if($scope.usercoachdetails.dob==null){
                $scope.usercoachdetails.dob = "NA";
            }

            if($scope.usercoachdetails.country==null){
                $scope.usercoachdetails.country = "NA";
            }

            if($scope.usercoachdetails.state==null){
                $scope.usercoachdetails.state = "NA";
            }

            if($scope.usercoachdetails.city==null){
                $scope.usercoachdetails.city = "NA";
            }

            if($scope.usercoachdetails.zipcode==null){
                $scope.usercoachdetails.zipcode = "NA";
            }

            $scope.viewload=false;
        });

        requestHandler.postRequest("getCoachRatingsandReviews/"+id+"/",$scope.coachRatingPagination).then(function (response) {
            $scope.coachReviews = response.data.reviews;
            $scope.viewload=false;
            $scope.totalRatings = response.data.totalrecords;
            $scope.avgRatings = response.data.averageratings;

            if($scope.avgRatings==0)
                $scope.averageRate=0.1;
            else
                $scope.averageRate=$scope.avgRatings;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.doGetMyCoachListByUser=function(){
        $scope.loaded=true;
        requestHandler.getRequest("user/mycoachlist/", "").then(function(response){
            $scope.mycoachlist=response.data.coaches;
            $scope.loaded=false;
            $.each($scope.mycoachlist, function(index,coachlist){
                myCoachIdListArray.push(coachlist.userid);
            });
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };

    $scope.subscribeButtonStatus=false;
    $scope.subscribing=[];
  
    $scope.acceptCoachInvitationsByUser=function(id){
        requestHandler.postRequest("user/acceptinvitation/",{'coachid':id}).then(function(response){
           if(response.data.Response_status==1){
            successMessage(Flash,"Invitation Accepted");
           }else{
            errorMessage(Flash,"Please try again later!");
           }
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    //Send Interest to coach
    $scope.doSendInterestToCoach=function(coachid){
        $scope.sendInterestParam={"coachid":coachid};
        requestHandler.postRequest("user/sendinteresttocoach/",$scope.sendInterestParam).then(function(){
            if(response.data.Response_status==1){
                successMessage(Flash,"Interest Sent Successfully");
                $scope.doGetCoachDetailsByUser(coachid);
            }else{
                errorMessage(Flash,"Please try again later!");
            }
        });
    }

    $scope.denyCoachInvitationsByUser=function(id){
        requestHandler.postRequest("user/denyinvitation/",{'coachid':id}).then(function(response){
            
           if(response.data.Response_status==1){
            successMessage(Flash,"Invitation Declined");
           }else{
            errorMessage(Flash,"Please try again later!");
           }
        },function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.coachReview=function(id){
        $scope.doGetCoachRatings(id);
        $scope.subscribed=0;
        $scope.coachViewId=id;
        $scope.coach = {
            status: 'coach-reviews'
        };
    };

    $scope.priceTable=function(id){
        //$scope.viewload=true;
        $scope.coachViewId=id;
        $scope.coach = {
            status: 'coach-price'
        };
        requestHandler.getRequest("getCoachIndividualDetailbyUser/"+id,"").then(function(response){
            $scope.priceValue=response.data.getCoachIndividualDetail.subscriptionDetail;
            //$scope.viewload=false;
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });

        /* //hard code
         $scope.priceValue={
         "coachid": 8,
         "onemonth_amount": 20,
         "threemonth_percentage": 1,
         "threemonth_amount": 19.8,
         "sixmonth_percentage": 3,
         "sixmonth_amount": 19.4,
         "status": 1
         }*/
    };

    $scope.coachView=function(id){
        $scope.doGetCoachDetailsByUser(id);
    };

    $scope.doAddReview=function(){
        $scope.coachreview.review_coach=$routeParams.id;
        requestHandler.postRequest("user/insertRatingsandReviews/",$scope.coachreview).then(function(response){

            successMessage(Flash,"Successfully Added");
            $scope.userCoachViewInit();
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };


    $scope.reset=function(){
        $scope.coachreview.reviewtitle="";
        $scope.coachreview.reviewdescription="";
        $scope.reviewForm.$setPristine();
    };



    $scope.checkReview=function(){

        $scope.checkReviews="";

        requestHandler.getRequest("getUserId/","").then(function(response){
            $scope.userProfile=response.data.User_Profile;
            $scope.loginuserid = $scope.userProfile.userid;
            requestHandler.getRequest("getRatingsandReviews/"+$routeParams.id, "").then(function (response) {
                $scope.checkReviews = response.data.Ratings_Reviews.Reviews;

                userTypeArray=[];
                $.each($scope.checkReviews, function(index,userid) {
                    userTypeArray.push(userid.review_user);
                });

                $scope.check=userTypeArray;

                if($scope.check.indexOf($scope.loginuserid) !=-1){
                    $scope.disablereview = true;
                }
                else{
                    $scope.disablereview = false;
                }
            });

        });
    };
    $scope.userCoachViewInit=function(){
        $scope.disablereview=true;
        $scope.checkReview();
        $scope.doGetCoachDetailsByUser($routeParams.id);
        $scope.coachView = {
            status: 'coach-reviews'
        };
        $scope.doGetCoachRatings($routeParams.id);
        $scope.subscribed=1;
    };

    $scope.coachListInit=function(){
        $scope.doGetMyCoachListByUser();
    };

    $scope.userCoachInit=function(){
        $scope.doGetCoachListByUser();

        $scope.coach = {
            status: 'coach-view'
        };
    };
}]);


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

userApp.directive("starRating", function() {
    return {
        restrict : "EA",
        template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
            "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
            "    <i class='fa fa-star'></i>" + //&#9733
            "  </li>" +
            "</ul>",
        scope : {
            ratingValue : "=ngModel",
            max : "=?", //optional: default is 5
            readonly: "=?"
        },
        link : function(scope, elem, attrs) {
            if (scope.max == undefined) { scope.max = 5; }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled : (i < scope.ratingValue.ratinglevel)
                    });
                }
            };
            scope.toggle = function(index) {
                if (scope.readonly == undefined || scope.readonly == false){
                    scope.ratingValue.ratinglevel = index + 1;
                    scope.onRatingSelected({
                        ratinglevel: index + 1
                    });
                }
            };
            scope.$watch("ratingValue.ratinglevel", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});



userApp.directive("averageStarRating", function() {
    return {
        restrict : "EA",
        template : "<div class='average-rating-container'>" +
            "  <ul class='rating background' class='readonly'>" +
            "    <li ng-repeat='star in stars' class='star'>" +
            "      <i class='fa fa-star'></i>" + //&#9733
            "    </li>" +
            "  </ul>" +
            "  <ul class='rating foreground' class='readonly' ng-attr-style='width:{{filledInStarsContainerWidth}}%'>" +
            "    <li ng-repeat='star in stars' class='star filled'>" +
            "      <i class='fa fa-star'></i>" + //&#9733
            "    </li>" +
            "  </ul>" +
            "</div>",
        scope : {
            averageRatingValue : "=ngModel",
            max : "=?" //optional: default is 5
        },
        link : function(scope, elem, attrs) {
            if (scope.max == undefined) { scope.max = 5; }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({});
                }
                var starContainerMaxWidth = 76; //%
                scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
            }
            scope.$watch("averageRatingValue", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});


userApp.filter('startsWithLetter', function () {

    return function (items, mycoachsearch) {
        var filtered = [];
        var letterMatch = new RegExp(mycoachsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.emailid) || letterMatch.test(item.name) ) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});


userApp.filter('startsWithLetterSearch', function () {

    return function (items, coachsearch) {
        var filtered = [];
        var letterMatch = new RegExp(coachsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.emailid) || letterMatch.test(item.name) || letterMatch.test(item.businessaddress
                    || letterMatch.test(item.phone) || letterMatch.test(item.specialist)) ) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});


userApp.directive('scroller', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            rawElement = elem[0]; // new
            elem.bind('scroll', function () {
                if((rawElement.scrollTop + rawElement.offsetHeight+5) >= rawElement.scrollHeight){ //new
                    scope.$apply('loadMore()');
                }
            });
        }
    };
});