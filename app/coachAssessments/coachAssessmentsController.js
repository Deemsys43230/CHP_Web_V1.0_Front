var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll']);

coachApp.controller('CoachAssessmentsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    //Get All Coach Assessments
    $scope.doGetCoachMyAssessments=function(){
        requestHandler.getRequest("coach/getmyassessments/", "").then(function(response){
            $scope.coachAssessmentsList=response.data.assessments;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };
   
    $scope.init=function(){
        $scope.doGetCoachMyAssessments();
    };

    $scope.init();

}]);

//Add Assessment Controller
coachApp.controller('CoachAddAssessmentsController',['$scope','requestHandler','Flash',"$location",function($scope,requestHandler,Flash,$location) {
    $scope.mainTitle="Add Assessment";
    //Answer Type Values
    $scope.answertypelist = [{"type":"Single Choice","typeId":1},{"type":"Multiple Choice","typeId":2},{"type":"Text","typeId":3}];

    $scope.reset=function(){
    $scope.isNew=true;
    $scope.addQuestion={};
    $scope.addQuestion.question="";
    $scope.addQuestion.answertype=1;
    $scope.addQuestion.answers=["",""];
    $scope.addQuestionForm.$setPristine();
     $scope.title = "Add Question";   

    $(function(){
        $("#lean_overlay").fadeTo(1000);
        $("#add-question").fadeIn(600);
        $(".common_model").show();
    });

    $(".modal_close").click(function(){
        $(".common_model").hide();
        $("#add-question").hide();
        $("#lean_overlay").hide();
    });

    $("#lean_overlay").click(function(){
        $(".common_model").hide();
        $("#add-question").hide();
        $("#lean_overlay").hide();
    });
    }

    $scope.doEditQuestion=function(index){
    $scope.isNew=false;
    $scope.addQuestion=$scope.assessments.questions[index];
     $scope.title = "Edit Question";     
    $(function(){
        $("#lean_overlay").fadeTo(1000);
        $("#add-question").fadeIn(600);
        $(".common_model").show();
        $scope.shouldBeOpen = true;
    });

    $(".modal_close").click(function(){
        $(".common_model").hide();
        $("#add-question").hide();
        $("#lean_overlay").hide();
        $scope.shouldBeOpen = false;
    });

    $("#lean_overlay").click(function(){
        $(".common_model").hide();
        $("#add-question").hide();
        $("#lean_overlay").hide();
        $scope.shouldBeOpen = false;
    });

    $("html, body").animate({
              scrollTop: 0
          }, 600);

    }

    $scope.doSaveUpdateAssessment=function(status){
        $scope.assessments.status=status;

        //Check for text and reset the answers
        $.each($scope.assessments.questions,function(index,value){
            if(value.answertype==3)
                value.answers=[];
        });

        requestHandler.postRequest("/coach/insertassessment/",$scope.assessments).then(function(response){
            successMessage(Flash,"Successfully Added!");
            $location.path("coach-assessments");
        });
    };

    $scope.init=function(){
        $scope.addQuestion={};
        $scope.assessments={"assessmentname":"",
            "status":0,
            "questions":[]
        };
    };

    $scope.init();

}]);

//Edit Assessment Controller
coachApp.controller('CoachEditAssessmentsController',['$scope','requestHandler','Flash',"$location","$routeParams",function($scope,requestHandler,Flash,$location,$routeParams) {
    $scope.mainTitle="Edit Assessment";
    //Answer Type Values
    $scope.answertypelist = [{"type":"Single Choice","typeId":1},{"type":"Multiple Choice","typeId":2},{"type":"Text","typeId":3}];


    $scope.reset=function(){
    $scope.isNew=true;
    $scope.addQuestion={};
    $scope.addQuestion.question="";
    $scope.addQuestion.answertype=1;
    $scope.addQuestion.answers=["",""];
    $scope.addQuestionForm.$setPristine();
     $scope.title = "Add Question";   

    $(function(){
        $("#lean_overlay").fadeTo(1000);
        $("#add-question").fadeIn(600);
        $(".common_model").show();
    });

    $(".modal_close").click(function(){
        $(".common_model").hide();
        $("#add-question").hide();
        $("#lean_overlay").hide();
    });

    $("#lean_overlay").click(function(){
        $(".common_model").hide();
        $("#add-question").hide();
        $("#lean_overlay").hide();
    });
    }

    $scope.doEditQuestion=function(index){
    $scope.isNew=false;
    $scope.addQuestion=$scope.assessments.questions[index];
    console.log($scope.assessments.questions[index]);
     $scope.title = "Edit Question";     
    $(function(){
        $("#lean_overlay").fadeTo(1000);
        $("#add-question").fadeIn(600);
        $(".common_model").show();
        $scope.shouldBeOpen = true;
    });

    $(".modal_close").click(function(){
        $(".common_model").hide();
        $("#add-question").hide();
        $("#lean_overlay").hide();
        $scope.shouldBeOpen = false;
    });

    $("#lean_overlay").click(function(){
        $(".common_model").hide();
        $("#add-question").hide();
        $("#lean_overlay").hide();
        $scope.shouldBeOpen = false;
    });

    $("html, body").animate({
              scrollTop: 0
          }, 600);

    }

    //Update Function
    $scope.doSaveUpdateAssessment=function(status){
        $scope.assessments.status=status;

        //Check for text and reset the answers
        $.each($scope.assessments.questions,function(index,value){
            if(value.answertype==3)
                value.answers=[];
        });

        requestHandler.postRequest("/coach/updateassessment/",$scope.assessments).then(function(response){
            successMessage(Flash,"Successfully Updated!");
            $location.path("coach-assessments");
        });
    };

    var original="";
    //Get By Assessment ID
    $scope.getAssessmentDetails=function(){
        requestHandler.getRequest("coach/getassessmentdetail/"+$routeParams.id+"/","").then(function(response){
            $scope.assessments=response.data.assessment;
            original=angular.copy($scope.assessments); 
        });
    };

    $scope.isClean=function(){
        return angular.equals(original,$scope.assessments);
    }

    //Init Function
    $scope.init=function(){
        $scope.addQuestion={};
        $scope.getAssessmentDetails();
    };

    $scope.init();

}]);

//View One Assessment Controller
coachApp.controller('CoachViewAssessmentsController',['$scope','requestHandler','Flash',"$location","$routeParams",function($scope,requestHandler,Flash,$location,$routeParams) {

    //Get By Assessment ID
    $scope.getAssessmentDetails=function(){
        requestHandler.getRequest("coach/getassessmentdetail/"+$routeParams.id+"/","").then(function(response){
            $scope.assessments=response.data.assessment;
            original=angular.copy($scope.assessments); 
        });
    };

    //Init Function
    $scope.init=function(){
        $scope.getAssessmentDetails();
    };

    $scope.init();

}]);