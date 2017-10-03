var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll']);

coachApp.controller('CoachAssessmentsController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams) {

    $scope.activeClass.assessments='active';
    //Get All Coach Assessments
    $scope.doGetCoachMyAssessments=function(){
        requestHandler.getRequest("coach/getmyassessments/", "").then(function(response){
            $scope.coachAssessmentsList=response.data.assessments;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
        /*$scope.doDeleteAssessment($scope.assessmentID);*/
    };




    //To delete Coach Assessments
    $scope.doDeleteAssessment=function(id){
        if(confirm("Are you sure want to delete Assessment?")){
            requestHandler.getRequest("coach/deleteassessment/"+id+"/","").then(function(response){
                if(response.data.Response_status==0 ){
                    errorMessage(Flash,"Assessment&nbsp;assigned&nbsp;to&nbsp;User");
                }
                else if(response.data.Response_status==1){
                    successMessage(Flash,"Successfully Deleted");

                }
                $scope.doGetCoachMyAssessments();
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        }
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
    $scope.canShowOptions=true;
    $scope.addQuestion={};
    $scope.addQuestion.question="";
    $scope.lastanswertype=3;
    $scope.addQuestion.answertype=1;
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

    $scope.addOptions=function(){
        if($scope.addQuestion.answers.length<6){
            $scope.addQuestion.answers.push('');
        }
    };

    $scope.init=function(){
        $scope.addQuestion={};
        $scope.assessments={"assessmentname":"",
            "status":0,
            "questions":[]
        };
    };

    $scope.$watch("addQuestion.answertype",function(){
        if($scope.addQuestion.answertype==3)
            $scope.addQuestion.answers=null;
        else if($scope.lastanswertype==3)
            $scope.addQuestion.answers=["",""];
        $scope.lastanswertype=$scope.addQuestion.answertype;
           
    });

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
    $scope.lastanswertype=3;
    $scope.addQuestion.answertype=1;
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
    };

    $scope.addOptions=function(){
        if($scope.addQuestion.answers.length<6){
            $scope.addQuestion.answers.push('');
        }
    };

    //Init Function
    $scope.init=function(){
        $scope.addQuestion={};
        $scope.getAssessmentDetails();
    };

    $scope.$watch("addQuestion.answertype",function(){
        if($scope.addQuestion.answertype==3)
            $scope.addQuestion.answers=null;
        else if($scope.lastanswertype==3)
            $scope.addQuestion.answers=["",""];
        $scope.lastanswertype=$scope.addQuestion.answertype;
           
    });

    $scope.init();

}]);

//View One Assessment Controller
coachApp.controller('CoachViewAssessmentsController',['$scope','requestHandler','Flash',"$location","$routeParams",function($scope,requestHandler,Flash,$location,$routeParams) {

    //Get By Assessment ID
    $scope.getAssessmentDetails=function(){
        requestHandler.getRequest("coach/getassessmentdetail/"+$routeParams.id+"/","").then(function(response){
            $scope.assessments=response.data.assessment;
            if($scope.assessments.status==1){
                        $scope.assignTo=1;
                        $scope.doGetAllClientsOrGroups();
            }
            original=angular.copy($scope.assessments); 
        });
    };

    //Get All Client List and group list with send message type
    $scope.doGetAllClientsOrGroups = function(){
        $scope.groupsList=[];
        $scope.coachClients={};
        if($scope.assignTo==1){
            $scope.selectText="Select Members";
            $scope.selectGroup="Select All Members";
            requestHandler.getRequest("/coach/myclients/","").then(function(response){
                $scope.coachClients = response.data.clients;
                $scope.resetSelectedCheckBox();
              });        
        }else{
            $scope.selectText="Select Groups";
            $scope.selectGroup="Select All Groups";
                requestHandler.getRequest("coach/getGroups/").then(function(response){
                $scope.groupsList=[];
                $scope.groupsList=response.data.Groups;
                $scope.resetSelectedCheckBox();
            });
            $scope.loaded=false;
        }       
    };

    //for select all button push id to dosendgroupmessage
    $scope.doSelectDeselect = function(isSelected){
       if($scope.assignTo==1){
            $.each($scope.coachClients,function(index,value){
                value.isSelected=isSelected;
            });
        }else{
            $.each($scope.groupsList,function(index,value){
                value.isSelected=isSelected;
            });
        }
    };

    //Reset the selection
    $scope.resetSelectedCheckBox = function(){
        $.each($scope.groupsList,function(index,value){
            value.isSelected=false;
        });
        $.each($scope.coachClients,function(index,value){
            value.isSelected=false;
        });
    };

    // always watch Switching Assign type
    $scope.$watch("assignTo",function(){
         $scope.doGetAllClientsOrGroups(true);
    });

    $scope.isDisabled=function(){
        $scope.assignParams={"userids":[],
                             "groupids":[],
                             "assessmentid":$routeParams.id
                            };
         if($scope.assignTo==1){
            $.each($scope.coachClients,function(index,value){
                if(value.isSelected)
                    $scope.assignParams.userids.push(value.userid);
            });
        }else{
            $.each($scope.groupsList,function(index,value){
                 if(value.isSelected)
                    $scope.assignParams.groupids.push(value.id);
            });
        }
        if($scope.assignParams.groupids.length==0&&$scope.assignParams.userids.length==0)
            return true;
        else
            return false;
    }


    $scope.doAssignAssessment=function(){
        //API Request
        requestHandler.postRequest("coach/assigntouser/",$scope.assignParams).then(function(response){
            if(response.data.Response_status==1){
                successMessage(Flash,"Successfully Assigned!");
                $location.path("coach-assessments");
            }else{
                errorMessage(Flash,"Please try again later!!")
            }
        });
    }

    //Init Function
    $scope.init=function(){
        $scope.getAssessmentDetails();        
    };

    $scope.init();

}]);

// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

//Check for option unique
coachApp.directive('optionExistCheck', function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, elem, attrs, ngModel) {
      ngModel.$validators.optionExistCheck = function(modelValue, viewValue) {
        if(scope.addQuestion.answertype!=3){
            if(scope.addQuestion.answers.indexOf(modelValue)!=-1)
                return false;
            else
                return true;
        }else
            return false;
      };
    }
  };
});