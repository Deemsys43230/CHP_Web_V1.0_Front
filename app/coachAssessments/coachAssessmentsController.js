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

coachApp.controller('CoachAddAssessmentsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    $scope.reset=function(){
    $scope.isNew=true;
    $scope.addQuestion={};
    $scope.addQuestion.answertype="1";
    $scope.addQuestion.answers=["",""];
    $scope.addQuestionForm.$setPristine();
     $scope.title = "Add Question";     
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
    }

    $scope.isClean=function(){
        return angular.equals(original, $scope.myadvice);
    };

    $scope.init=function(){
        $scope.assessments={"assessmentname":"",
            "status":0,
            "questions":[]
        };
    };

    $scope.init();

}]);

