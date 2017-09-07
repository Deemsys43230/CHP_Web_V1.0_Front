var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ngPercentDisplay','angular-svg-round-progress','angularUtils.directives.dirPagination','userDashboardServiceModule','ui.bootstrap']);

coachApp.controller('CoachWorkoutPlanController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {
$scope.activeClass.advices='active';

$scope.doGetCoachWorkoutPlanList=function(){
  $scope.loaded=true;
  $scope.coachWorkoutPlanPagination={
  									"limit": $scope.pagination.itemsPerPage,
  									"offset": ($scope.pagination.pageNumber-1)*$scope.pagination.itemsPerPage
  									};

   requestHandler.postRequest("coach/myplans/",$scope.coachWorkoutPlanPagination).then(function(response){
     $scope.coachWorkoutPlanList= response.data;
     $scope.loaded=false;
   	 $scope.paginationLoad=true;
   },function(){
      errorMessage(Flash,"Please try again later!")
  });
};

//Reset Scope
$scope.reset=function(){
    $scope.workoutPlan={};
    $scope.workoutPlan.planname="";
    $scope.workoutPlan.plandays="";
    $scope.workoutPlan.intensity="";
    $scope.workoutPlan.level="";
    $scope.workoutPlan.goodfor="";
    $scope.workoutPlan.equipments="";
    $scope.workoutPlan.description="";
    $scope.workoutPlanForm.$setPristine();
    $scope.isNew = true;
    $scope.title = "Add Workout Plan";

    $(function(){
        $("#lean_overlay").fadeTo(1000);
        $("#workout-plan").fadeIn(600);
        $(".common_model").show();
        $scope.shouldBeOpen = true;
    });

    $(".modal_close").click(function(){
        $(".common_model").hide();
        $("#workout-plan").hide();
        $("#lean_overlay").hide();
        $scope.shouldBeOpen = false;
    });

    $("#lean_overlay").click(function(){
        $(".common_model").hide();
        $("#workout-plan").hide();
        $("#lean_overlay").hide();
        $scope.shouldBeOpen = false;
    });

};

$scope.doAddWorkoutPlanByCoach=function(){
    requestHandler.postRequest("coach/insertorupdateworkoutplan/",$scope.workoutPlan).then(function(response){
       $scope.doGetCoachWorkoutPlanList();
         successMessage(Flash,"Successfully Added");
         $scope.loaded=false;
         $scope.paginationLoad=true;  
     }, function(){
      errorMessage(Flash,"Please try again later!");
     });
};

$scope.doEditCoachWorkoutPlan=function(id){
    $scope.isNew = false;
    $scope.title = "Edit Workout Plan";

    $(function(){
        $("#lean_overlay").fadeTo(1000);
        $("#workout-plan").fadeIn(600);
        $(".common_model").show();
        $scope.shouldBeOpen = true;
    });
    
    $.each($scope.coachWorkoutPlanList.plans,function(index,value){
       if(value.id==id){
          $scope.workoutPlan=value;
          original= angular.copy($scope.workoutPlan);
       }
    });
    
    $(".modal_close").click(function(){
        $(".common_model").hide();
        $("#workout-plan").hide();
        $("#lean_overlay").hide();
        $scope.shouldBeOpen = false;
    });

    $("#lean_overlay").click(function(){
        $(".common_model").hide();
        $("#workout-plan").hide();
        $("#lean_overlay").hide();
        $scope.shouldBeOpen = false;
    });
};

$scope.isClean=function(){
  return angular.equals(original, $scope.workoutPlan);
};    

$scope.doDeleteCoachWorkoutPlan=function(id){
    if(confirm("Are you sure you want to delete?")){
      requestHandler.postRequest("coach/deleteplan/",{'id':id}).then(function(response){
          if(response.data.Response_status==1){
            successMessage(Flash,"Successfully Deleted");
            $scope.doGetCoachWorkoutPlanList();
       }
    }, function(){
          errorMessage(Flash,"Please try again later!");
    });
  }
};

$scope.init=function(){
  var original="";
	$scope.pagination= {"itemsPerPage": 8, "pageNumber": 1}
	$scope.paginationLoad=false;
};

$scope.$watch("pagination.pageNumber", function(){
	$scope.doGetCoachWorkoutPlanList();
});

$scope.init();

}]);

coachApp.controller('ViewCoachWorkoutPlanController',['$scope','requestHandler','Flash','$routeParams','UserDashboardService','roundProgressService',function($scope,requestHandler,Flash,$routeParams,UserDashboardService,roundProgressService) {

$scope.doviewCoachWorkoutPlans=function(){
  $scope.coachPlanId= $routeParams.id;
  requestHandler.getRequest("coach/plandetail/"+$scope.coachPlanId+"/", "").then(function(response){
      $scope.plan= response.data.plan;

      $scope.plandetail= response.data.plan.plandetail;

      $scope.workoutPlanDetailList=[];

      for(var i=1; i<=$scope.plandetail.plandays; i++){
         $scope.workoutPlanDetailList.push(
          {
              "day":"Day "+i,
              "dayId": i,
              "workouts":[]
          }
         );
      }

      //Group json object
      Object.keys($scope.plan).forEach(function(key){
        $.each($scope.plan[key].workouts,function(index,value){
            $scope.workoutPlanDetailList[value.day-1].workouts.push(value);
        });
      });

  },function(){
      errorMessage(Flash,"Please try again later!")
  });
};

//Initialize Modal Popup after ng-repeat
$scope.doIntializeLeanModal=function()
{
    $(".modal_trigger_exercise").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });
    $(function(){
        $(".user_register").show();
    });
}

$scope.doCoachAddExercise=function(planDay){

    $scope.userExercise={};
    $scope.userExercise.day= planDay;
    $scope.showSearch=true;
    $scope.addExcercise=false;
    $scope.isNew=true;
    $scope.title= "Add Exercise";

    $(function(){
          $("#lean_overlay").fadeTo(1000);
          $("#modal-add-exercise").fadeIn(600);
          $(".user_register").show();

      });

      $(".modal_close").click(function(){
          $(".user_register").hide();
          $("#modal-add-exercise").hide();
          $("#lean_overlay").hide();
          $scope.resetexercisedata();
      });

      $("#lean_overlay").click(function(){
          $(".user_register").hide();
          $("#modal-add-exercise").hide();
          $("#lean_overlay").hide();
          $scope.resetexercisedata();
      });
    
};

//Clear suggest exercise model values
$scope.resetexercisedata=function(){
    $scope.userExercise.selectedLevel="";
    $scope.userExercise.repsavailable="";
    $scope.userExercise.workoutvalue="";
    $scope.workoutvalueMinutes=0;
    $scope.workoutvalueSeconds=0;
    $scope.workoutvalueHours=0;
    $scope.ExerciseAddForm.$setPristine();
    $scope.current=$scope.caloriesSpent=0;
    $scope.max = 100;
    $scope.userSelectedExerciseDetails={};
};

$scope.selectedCategory=[];
$scope.selectedType=[];
//Search Function for exercise
$scope.inputChangedExercise = function(searchStr) {
    if(searchStr.length){
        $scope.loadingExercise=true;
        if($scope.exerciseSearchResult.length==0){
            $scope.loadingExercise=true;
        }
        var userExerciseDiaryDetailPromise=UserDashboardService.searchExerciseByCoach(searchStr,$scope.selectedCategory,$scope.selectedType);
        return userExerciseDiaryDetailPromise.then(function(result){
            $scope.exerciseSearchResult=result;
            $scope.loadingExercise=false;
            return $scope.exerciseSearchResult;
        });
    }
};

//On Select search exercise function
$scope.exerciseSelected=function(){
  $scope.selectedWorkoutParam={'exerciseid': $scope.selectedExercise.exerciseid};
    requestHandler.postRequest("coach/getExerciseDetailbyCoach/", $scope.selectedWorkoutParam).then(function(response){
        $scope.addExercise=true;
        $scope.userSelectedExerciseDetails= response.data.ExerciseDetail;
        
    }, function(){
          errorMessage(Flash,"Please try again later!");
    });
};

//Calories caluclation for exercose
$scope.doCalculateCaloriesExercise=function(){
    $scope.userExercise.workoutvalue=0;
    $scope.userExercise.workoutvalue+=parseInt($scope.workoutvalueHours)*3600;
    $scope.userExercise.workoutvalue+=parseInt($scope.workoutvalueMinutes)*60;
    $scope.userExercise.workoutvalue+=parseInt($scope.workoutvalueSeconds);
    console.log( $scope.userExercise.workoutvalue);
    if($scope.userExercise.workoutvalue==0){
        $scope.current=$scope.caloriesSpent=0;
    }
    if(!$scope.userExercise.workoutvalue>0){
        $scope.current=$scope.caloriesSpent=0;
    }
    else{
        if($scope.userProfile.unitPreference==2){
            $scope.current=$scope.caloriesSpent=$scope.userExercise.selectedLevel.MET*($scope.demography.weight*0.453592)*($scope.userExercise.workoutvalue/3600);
            $scope.current=Math.abs($scope.current).toFixed(2);
        }
        else if($scope.userProfile.unitPreference==1){
            $scope.current=$scope.caloriesSpent=$scope.userExercise.selectedLevel.MET*($scope.demography.weight)*($scope.userExercise.workoutvalue/3600);
            $scope.current=Math.abs($scope.current).toFixed(2);
        }

    console.log($scope.current);
        if(($scope.current.length-3)>2) $scope.max=$scope.max+((String($scope.current|0).slice(0, -2))*100);
        else $scope.max=100;
    }
};

$scope.doEditExerciseFromPlan=function(id){
  $scope.userExercise={};
    requestHandler.postRequest("coach/exerciseplandetail/",id).then(function(response){
        $scope.userSelectedExerciseDetails= response.data.exercisedetail;
        $scope.userSavedExerciseDetails= response.data.savedexerciseplan;

        $.each($scope.userSavedExerciseDetails.levels,function(index,value){
           if(value.levels.levelid==$scope.userSavedExerciseDetails.unitlevelid){
              $scope.userExercise.selectedLevel=value;
           }
        });  

        $scope.userExercise.id= $scope.userSavedExerciseDetails.id;
        $scope.userExercise.day= $scope.userSavedExerciseDetails.day;
        $scope.doCalculateCaloriesExercise();
        $scope.userFood.calorieburn=$scope.caloriesSpent;      
    });

        $scope.addExercise=true;
        $scope.showSearch=false;
        $scope.isNew=false;
        $scope.title="Edit Exercise";

        $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#modal-add-exercise").fadeIn(600);
                $(".user_register").show();
              
            });

            $(".modal_close").click(function(){
                $(".user_register").hide();
                $("#modal-add-exercise").hide();
                $("#lean_overlay").hide();
                $scope.resetdata();
            });

            $("#lean_overlay").click(function(){
                $(".user_register").hide();
                $("#modal-add-exercise").hide();
                $("#lean_overlay").hide();
                $scope.resetdata();
            });
};

//Insert  Exercise
$scope.doInsertExerciseByCoach=function(){
    //Set values according to the api calls
    $scope.userExercise.planid= $routeParams.id;
    $scope.userExercise.exerciseid=$scope.userSelectedExerciseDetails.exerciseid;
    $scope.userExercise.unitlevelid= $scope.userExercise.selectedLevel.levelid;
    $scope.userExercise.isoptional=1;

    requestHandler.postRequest("coach/insertorupdateexerciseplan/",$scope.userExercise).then(function(response){
        if(response.data.Response_status==1){
          successMessage(Flash,"Successfully Added");
          $scope.doviewCoachWorkoutPlans();
        }
    }, function(){
          errorMessage(Flash,"Please try again later!");
    });

};

$scope.doDeleteExerciseFromPlan=function(id){
  if(confirm("Are you sure you want to delete exercise?")){
    $scope.deleteExerciseParam={'id':id};
    requestHandler.postRequest("coach/deleteexerciseplan/",$scope.deleteExerciseParam).then(function(response){
       if(response.data.Response_status==1){
          successMessage(Flash,"Successfully Deleted");
          $scope.doviewCoachWorkoutPlans();
       }
    }, function(){
          errorMessage(Flash,"Please try again later!");
    });
  }
};

$scope.workoutPlansInit=function(){
  $scope.exerciseFilter= false;
  $scope.current=$scope.caloriesSpent=0;
  $scope.max = 100;
  $scope.doviewCoachWorkoutPlans();
  $scope.exerciseSearchResult=[];
};

//circle round
    $scope.offset =         0;
    $scope.timerCurrent =   0;
    $scope.uploadCurrent =  0;
    $scope.stroke =         12;
    $scope.radius =         70;
    $scope.isSemi =         false;
    $scope.rounded =        false;
    $scope.responsive =     false;
    $scope.clockwise =      true;
    $scope.bgColor =        '#ddd';
    $scope.duration =       1000;
    $scope.currentAnimation = 'easeOutCubic';

    $scope.animations = [];

    angular.forEach(roundProgressService.animations, function(value, key){
        $scope.animations.push(key);
    });

    $scope.getStyle = function(){
        var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

        return {
            'top': $scope.isSemi ? 'auto' : '52%',
            'bottom': $scope.isSemi ? '5%' : 'auto',
            'left': '50%',
            'transform': transform,
            '-moz-transform': transform,
            '-webkit-transform': transform
        };
    };

}]);	
