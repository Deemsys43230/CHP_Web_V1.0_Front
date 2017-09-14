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

    // To display Coach list by user
    $scope.doGetCoachListByUser=function(loadCoachDetail){
        $scope.scrollnation.scrollEndCount=$scope.scrollnation.scrollEndCount+1;


         $scope.userCoachPagination= {
                                "limit":$scope.scrollnation.itemsPerScroll,
                                "searchname":"",
                                "offset":($scope.scrollnation.scrollEndCount)*$scope.scrollnation.itemsPerScroll
                               };
       
        if($scope.coachInvitations){
            $scope.request=requestHandler.getRequest("user/userreadinvitations/",{});
        }else{
            $scope.request=requestHandler.postRequest("user/usergetcoachlist/",$scope.userCoachPagination);
          }

        
        $scope.request.then(function(response){
           
            var ratingPromise;
            $.each(response.data.coaches, function(index,value){
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
          
            $q.all([ratingPromise]).then(function(){
             
                $scope.usercoachlist= $scope.usercoachlist.concat(response.data.coaches);
                if(loadCoachDetail){ 
                    //Load First Coach Default
                        if($scope.usercoachlist.length>0)
                        {
                             $scope.doGetCoachDetailsByUser($scope.usercoachlist[0].userid); 
                        }
                }

                if($scope.usercoachlist==0){

                }else{
                    $scope.coach = {
                        status: 'coach-view'
                    };
                }
            });
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.coachRatingPagination={
                                    "limit":4,
                                    "offset":0
                                 };

    $scope.doGetRatingsByCoach=function(userid){
        return requestHandler.postRequest("getCoachRatingsandReviews/"+userid+"/", $scope.coachRatingPagination).then(function (response) {
            return response.data;
        });
    };

    $scope.doGetCoachRatings= function (id) {
        $scope.reviewload=true;
        $scope.scrollnation.scrollEndCount= $scope.scrollnation.scrollEndCount+1;

        $scope.coachRatingScrollnation={
                                    "limit":$scope.scrollnation.itemsPerScroll,
                                    "offset":($scope.scrollnation.scrollEndCount)*$scope.scrollnation.itemsPerScroll
                                 };

        requestHandler.postRequest("getCoachRatingsandReviews/"+id+"/", $scope.coachRatingScrollnation).then(function (response) {
            $scope.coachReviews= $scope.coachReviews.concat(response.data.reviews);
            $scope.canReview= response.data.canreview;
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
        $scope.usercoachdetails={};
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
            $scope.years = Math.floor($scope.usercoachdetails.experience / 12);
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

    //Do Set Chat Message as Read 
    $scope.doReadChatMessage=function(){
      $scope.setReadMessageParam={"targetid":$scope.currentChatTargetId};
      requestHandler.postRequest("setMessageRead/", $scope.setReadMessageParam).then(function(response){
          if(response.data.Response_status==1){
            $scope.unreadChatMessageCount=0;
            $scope.showMessageCount=false; 
          }
      })
    };

    // Do Get Chat Message
    $scope.doGetChatMessage=function(id){
        $scope.currentChatTargetId= id;
        $scope.getMessageParam={"targetid":id,"offset":0};
        requestHandler.postRequest("readMessage/",$scope.getMessageParam).then(function(response){
            $scope.chatMessages= response.data.chats;
            $scope.chatMessages.userid= response.data.chats[0].userid;
            requestHandler.getRequest("getUserProfile/"+$scope.chatMessages.userid, "").then(function(response){
                 $scope.userImageUrl=response.data.userprofile.imageurl;
            });
            $scope.chat={"message":""};
            $scope.unreadChatMessageCount=0;

            var newMessageFound=0;
            $scope.showMessageCount=false;

            $.each($scope.chatMessages,function(index,value){
                value.selectedChat=0;
                value.firstNewMessage=0;
                if(value.status==0 && value.sentby==2){
                    $scope.unreadChatMessageCount+=1;
                    $scope.showMessageCount=true;
                    if(newMessageFound==0){
                        value.firstNewMessage=1;
                        newMessageFound=1;
                    }
                }

            });
        });
    };

    //Do Send Chat Message
    $scope.doSendChatMessage=function(){
         var chatlen=$scope.chat.message.length;
        if(chatlen ==0)
        {
            return false;
        }
        $scope.getSendMessageParam={"targetid":$scope.currentChatTargetId,"message":$scope.chat.message};
        requestHandler.postRequest("/sendMessage/",$scope.getSendMessageParam).then(function(response){
            $scope.doGetChatMessage($scope.currentChatTargetId);
        });
    };

    //Do Send Chat Message
    $scope.doDeleteChatMessage=function(){
        $scope.deleteChatParam={"messageids":$scope.deleteChatLogId};
        requestHandler.postRequest("/deleteMessage/",$scope.deleteChatParam).then(function(response){
            $scope.doGetChatMessage($scope.currentChatTargetId);
        });
       //Reset Array
       $scope.deletingChatCount=0;
       $scope.deleteChatLogId=[];
    };

    //Do Select Chat
    $scope.doSelectChat=function(chatMessage){
        if(chatMessage.selectedChat==0)
            chatMessage.selectedChat=1;
        else
            chatMessage.selectedChat=0;
        //Reset array
        $scope.deletingChatCount=0;
        $scope.deleteChatLogId=[];
        $.each($scope.chatMessages,function(index,value){
            if(value.selectedChat==1){
                $scope.deleteChatLogId.push(value.logid);
                $scope.deletingChatCount+=1;
            }             
        });
        

    };

    $scope.subscribeButtonStatus=false;
    $scope.subscribing=[];
  
    $scope.acceptCoachInvitationsByUser=function(coachid){
        requestHandler.postRequest("user/acceptinvitation/",{"coachid":coachid}).then(function(response){
           if(response.data.Response_status==1){
                successMessage(Flash,"Invitation Accepted");
                 $scope.userCoachInit();
               //Redirect to coach list
                $location.path("coach");

           }
            if(response.data.Response_status==0 && response.data.Error){
                errorMessage(Flash,"Coach Exceeded Eligible Clients Count");
            }
        }, function(){
                errorMessage(Flash,"Please try again later!");
        });
    };

    //Send Interest to coach
    $scope.doSendInterestToCoach=function(coachid){
        $scope.sendInterestParam={"coachid":coachid};
        requestHandler.postRequest("user/sendinteresttocoach/",$scope.sendInterestParam).then(function(response){
            if(response.data.Response_status==1){
                successMessage(Flash,"Interest Sent Successfully");
                $scope.userCoachInit();
            }
        }, function(){
                errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.denyCoachInvitationsByUser=function(coachid){
        requestHandler.postRequest("user/denyinvitation/",{'coachid':coachid}).then(function(response){
           if(response.data.Response_status==1){
                successMessage(Flash,"Invitation Declined");
                $scope.doGetCoachDetailsByUser(coachid);
           }
        }, function(){
                errorMessage(Flash,"Please try again later!");
        });
    };

    // Remove Coach from My Coach list
    $scope.doRemoveMyCoachByUser=function(coachid){
        $scope.removeCoachParam= {"coachid":coachid};
        requestHandler.postRequest("user/removecoach/",$scope.removeCoachParam).then(function(response){
             if(response.data.Response_status==1){
                successMessage(Flash,"Coach Removed Successfully");
                $scope.doGetMyCoachListByUser();
             }else{
                errorMessage(Flash,"Please try again later!");
             }
        });
    };


    $scope.coachReview=function(id){
        $scope.scrollnation={"itemsPerScroll": 4,"scrollEndCount":-1};
        $scope.coachReviews=[];
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

    $scope.doAddCoachReview=function(){
        $scope.coachreview.review_coach=$scope.usercoachdetails.userid;
        requestHandler.postRequest("user/insertRatingsandReviews/",$scope.coachreview).then(function(response){

            successMessage(Flash,"Successfully Added");
            $scope.coachReview($scope.coachreview.review_coach);
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.reset=function(reviewForm){
        $scope.coachreview.reviewtitle="";
        $scope.coachreview.reviewdescription="";
        reviewForm.$setPristine();
    };

    $scope.checkReview=function(){

        $scope.scrollnation.scrollEndCount= $scope.scrollnation.scrollEndCount+1;

        $scope.coachRatingScrollnation={
                                    "limit":$scope.scrollnation.itemsPerScroll,
                                    "offset":($scope.scrollnation.scrollEndCount)*$scope.scrollnation.itemsPerScroll
                                 };

        requestHandler.postRequest("getCoachRatingsandReviews/"+$routeParams.id+"/", $scope.coachRatingPagination).then(function (response) {
            $scope.checkReviews = $scope.checkReviews.concat(response.data.reviews);

            userTypeArray=[];
            $.each(response.data.reviews, function(index,userid) {
                userTypeArray.push(userid.review_user);
            });

            $scope.check=userTypeArray;

            $scope.canReview= response.data.canreview;
            if($scope.canReview==0){
                $scope.disablereview = true;
            }else{
                $scope.disablereview = false;
            }
        });

    };

    //Do Get Coach Advices
    $scope.doGetCoachAdviceByUser=function(coachid){
        requestHandler.getRequest("user/getcoachquote/"+coachid+"/","").then(function(response){
            $scope.coachAdvice= response.data.quotes;
            $scope.coachAdvice.description=response.data.quotes.description;
            if(response.data.quotes.description==""){
                $scope.noAdvices=true;
            }
            else{
                $scope.noAdvices=false;
            }
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
    };


    //Do get coach upcoming Events
    $scope.doGetUpcomingEvents = function(coachid){
        requestHandler.postRequest("user/upcomingevents/",{"coachid":coachid}).then(function(response){
            $scope.coachEvent = response.data.attendees;
        });
    };

    $scope.userSetAttendence = function(eventid){
        requestHandler.postRequest("user/setattendence/",{"id":eventid}).then(function(response){
            if(response.data.Response){
                $scope.doGetUpcomingEvents($routeParams.id);
            }
        }, function(){
            errorMessage(Flash,"Successfully Joined Event!");
        });
    };
    //Food Meal Plan
    $scope.doGetCoachMealPlans=function(targetid){
        $scope.mealplan={planDetailView:false};

       $scope.getMealPlanParams={
            "targetid":targetid,
            "limit":$scope.mealPlanPagination.itemsPerPage,
            "offset":($scope.mealPlanPagination.pageNumber-1)*$scope.mealPlanPagination.itemsPerPage,
            "plantype": 1
        };   
        requestHandler.postRequest("user/getplans/",$scope.getMealPlanParams).then(function(response){
            $scope.myMealPlanList=response.data;
        }, function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //Laod Food Meal Plan Details
    $scope.doLoadMealPlanDetails=function(mapId){
        $scope.currentPlanDetail=mapId;
       $scope.mealplan={planDetailView:true};

        requestHandler.postRequest("getplandetail/",{"mapid":mapId}).then(function(response){
            //First We need to group up days
            $scope.plandetail=response.data.plandetail;
           
            //Initialize
            $scope.mealPlanDetailList=[];

            //create array of days
            for(var i=1;i<=$scope.plandetail.plandays;i++)
            {
              $scope.mealPlanDetailList.push(
                  {
                    "day":"Day "+i,
                    "dayId":i,
                    "date": "dd/mm/yyyy",
                    "totalCalories":0,
                    "consumedCalories":0,
                    "foods":[
                              {"sessionId":1,"sessionName":"BreakFast","foodItems":[]},
                              {"sessionId":2,"sessionName":"Brunch","foodItems":[]},
                              {"sessionId":3,"sessionName":"Lunch","foodItems":[]},
                              {"sessionId":4,"sessionName":"Snacks","foodItems":[]},
                              {"sessionId":5,"sessionName":"Dinner","foodItems":[]},  
                            ]
                  }
                );
            }

          // Group Json object of plan 
         $.each($scope.plandetail, function (key, obj) {            
              if(key.startsWith("day")){
                $scope.mealPlanDetailList[key.substring(3)-1].totalCalories=(obj.actualcalories).toFixed(2);
                $scope.mealPlanDetailList[key.substring(3)-1].consumedCalories=(obj.consumedcalories).toFixed(2);
                $scope.mealPlanDetailList[key.substring(3)-1].date= obj.date;
                $.each(obj.foods, function (index, value) {
                 value.calorieintake=value.calorieintake.toFixed(2);   
                 $scope.mealPlanDetailList[value.day-1].foods[value.foodsessionid-1].foodItems.push(value);
                });
              }              
          });

         console.log($scope.mealPlanDetailList);
         
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // View Food Meal Item Plan Details
    $scope.doViewFoodItemFromMealPlan=function(foodplanid,date){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#view-meal-item").fadeIn(600);
            $(".common_model").show();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            $scope.shouldBeOpen = true;
        });

        $scope.getFoodPlanItemParam={'id':foodplanid, 'date':date};
        requestHandler.postRequest("user/getfooditemdetail/", $scope.getFoodPlanItemParam).then(function(response){
            $scope.foodPlanItemDetails= response.data.plandetail;
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#view-meal-item").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#view-meal-item").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
    };

    // Set or Unset Food Consumed By User
    $scope.doSetUnsetFoodItemConsumed= function(foodplanid,date){
        $scope.getFoodItemConsumedParam={'id':foodplanid, 'date':date};
        requestHandler.postRequest("user/setorunsetfoodplan/", $scope.getFoodItemConsumedParam).then(function(response){
           if(response.data.Response_status==1){
                $scope.doLoadMealPlanDetails($scope.currentPlanDetail);
                $(function(){
                    $(".common_model").hide();
                    $("#view-meal-item").hide();
                    $("#lean_overlay").hide();
                });
                successMessage(Flash,"Successfully Updated!");
           }else if(response.data.Response_status==2){
                $scope.doLoadMealPlanDetails($scope.currentPlanDetail);
                $(function(){
                    $(".common_model").hide();
                    $("#view-meal-item").hide();
                    $("#lean_overlay").hide();
                });
                errorMessage(Flash,"Food log for future date is not allowed.");
           }
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
    }

    //Workout Plan
    $scope.doGetCoachWorkoutPlans=function(targetid){
        $scope.workoutplan={workPlanDetailView:false};

        $scope.getWorkoutPlanParams={
            "targetid":targetid,
            "limit":$scope.workoutPlanPagination.itemsPerPage,
            "offset":($scope.workoutPlanPagination.pageNumber-1)*$scope.workoutPlanPagination.itemsPerPage,
            "plantype": 2
        };   
        requestHandler.postRequest("user/getplans/",$scope.getWorkoutPlanParams).then(function(response){
            $scope.myworkoutPlanList=response.data;
        }, function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //Laod Food Meal Plan Details
    $scope.doLoadWorkoutPlanDetails=function(mapId){
        $scope.currentWorkoutPlanDetail=mapId;
        $scope.workoutplan={workPlanDetailView:true};

        requestHandler.postRequest("getplandetail/",{"mapid":mapId}).then(function(response){
        $scope.plan= response.data.plan;
            //First We need to group up days
            $scope.plandetail=response.data.plandetail;
           
            //Initialize
            $scope.workoutPlanDetailList=[];

            for(var i=1; i<=$scope.plandetail.plandays; i++){
                $scope.workoutPlanDetailList.push(
                {
                  "day":"Day "+i,
                  "dayId": i,
                  "date": "dd/mm/yyyy",
                  "totalCalories":0,
                  "burntCalories":0,
                  "workouts":[]
                }
                );
            }

          // Group Json object of plan 
          $.each($scope.plandetail, function (key, obj) {            
              if(key.startsWith("day")){
                $scope.workoutPlanDetailList[key.substring(3)-1].totalCalories=(obj.actualcalories).toFixed(2);
                $scope.workoutPlanDetailList[key.substring(3)-1].burntCalories=(obj.burntcalories).toFixed(2);
                $scope.workoutPlanDetailList[key.substring(3)-1].date=obj.date;
                $.each(obj.workouts, function (index, value) {
                 $scope.workoutPlanDetailList[value.day-1].workouts.push(value);
                });
              }              
          });

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // View Workout Plan Details
    $scope.doViewExerciseItemFromWorkoutPlan=function(workoutplanid,date){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#view-workout-item").fadeIn(600);
            $(".common_model").show();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            $scope.shouldBeOpen = true;
        });

        $scope.getExerciseItemParam={'id':workoutplanid, 'date':date};
        requestHandler.postRequest("user/getexerciseitemdetail/", $scope.getExerciseItemParam).then(function(response){
            $scope.workoutPlanItemDetails= response.data.plandetail;
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#view-workout-item").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#view-workout-item").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
    };

    // Set or Unset Workout Item By User
    $scope.doSetUnsetExerciseItem= function(workoutplanid,date){
        $scope.getExerciseItemParam={'id':workoutplanid, 'date':date};
        requestHandler.postRequest("user/setorunsetworkoutplan/", $scope.getExerciseItemParam).then(function(response){
           if(response.data.Response_status==1){
                $scope.doLoadWorkoutPlanDetails($scope.currentWorkoutPlanDetail);
                $(function(){
                    $(".common_model").hide();
                    $("#view-workout-item").hide();
                    $("#lean_overlay").hide();
                });
                successMessage(Flash,"Successfully Updated!");
           }else if(response.data.Response_status==2){
                $scope.doLoadWorkoutPlanDetails($scope.currentWorkoutPlanDetail);
                $(function(){
                    $(".common_model").hide();
                    $("#view-workout-item").hide();
                    $("#lean_overlay").hide();
                });
                errorMessage(Flash,"Exercise log for future date is not allowed.");
           }
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
    }

    $scope.userCoachViewInit=function(){
        $scope.scrollnation={"itemsPerScroll": 4,"scrollEndCount":-1};
        $scope.checkReviews=[];
        $scope.disablereview=true;
        $scope.checkReview();
        $scope.doGetCoachDetailsByUser($routeParams.id);
        $scope.coachView = {
            status: 'coach-reviews'
        };
        $scope.coachReviews=[];
        $scope.doGetCoachRatings($routeParams.id);
        $scope.subscribed=1;
        $scope.doGetChatMessage($routeParams.id);
        $scope.doGetCoachAdviceByUser($routeParams.id);
        $scope.doGetUpcomingEvents($routeParams.id);

        //Initializ Page
        $scope.mealPlanPagination={"itemsPerPage":10,"pageNumber":1};
        $scope.workoutPlanPagination={"itemsPerPage":10,"pageNumber":1};
    };

    $scope.$watch("mealPlanPagination.pageNumber",function(){
        $scope.doGetCoachMealPlans($routeParams.id);
    }); 

    $scope.$watch("workoutPlanPagination.pageNumber",function(){
        $scope.doGetCoachWorkoutPlans($routeParams.id);
    });

    $scope.coachListInit=function(){
        $scope.doGetMyCoachListByUser();
    };

    $scope.userCoachInit=function(){

        $scope.scrollnation={"itemsPerScroll":4,"scrollEndCount":-1};    
        $scope.usercoachlist=[];
        $scope.doGetCoachListByUser(true);
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
