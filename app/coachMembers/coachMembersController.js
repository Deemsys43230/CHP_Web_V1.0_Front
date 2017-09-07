/**
 * Created by Deemsys on 9/21/2015.
 */
var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll','angular-svg-round-progress']);

coachApp.controller('CoachMembersController',['$scope','requestHandler',"$filter","Flash","$location","$rootScope","$routeParams",function($scope,requestHandler,$filter,Flash,$location,$rootScope,$routeParams) {

    $scope.isActive=false;

    $scope.showGraph={reportTittle:0}

    $scope.accordion={
        "current":null
    };

    /*$scope.datePicker = function(){
        $("#main-date").click();
    };*/
        
    //Get Coaches List
    $scope.doGetMyMembers=function(){
      
        $scope.clients=[];
        $scope.loaded=true;
        requestHandler.getRequest("/coach/myclients/","").then(function(response){
            //Intialize the array
            $.each(response.data.clients,function(clientIndex,client){               
                $.each($scope.groupsList,function(groupIndex,group){
                    $scope.clients.push(client);
                    if(group.clients==undefined){
                       group.clients=[]; 
                    }                            
                    if(client.groupid==null){
                        client.groupid=0;
                    }
                    if(group.id==client.groupid){                      
                        group.clients.push(client);
                    }
                });
            });
       if($scope.clients.length>0){
               $.each($scope.groupsList,function(groupIndex,group){
                    if(group.clients.length>0){
                        $scope.accordion.current=group.id;
                        $scope.doGetIndividualClientDetail(group.clients[0].userid);
                        return false;
                    }
               });
               
            }
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });

    };

    //Get Individual Memeber Details
    $scope.doGetIndividualClientDetail=function(id){

        $scope.resetUserDetails();
        $scope.currentClientId=id;
        //Get Profile Detail
        $scope.doGetClientsProfileDetailsByCoach(id);  
        //Get Chat Message
        $scope.doGetChatMessage(id);
        //Do Get Notes
        $scope.doGetNotesByCoach(id);  
        //Demography Details
        $scope.doGetClientsDemographyDetailsByCoach(id);
        //Health profile Details
        // $scope.doGetClientHealthProfileDetailsByCoach();
        //Graph  for oneweek
        //$scope.doGetClientGraphDetailsByCoach();
        //Get Tracking Plan Details
        $scope.doGetTrainingPlanDetails(id);
        //Get Medication List
        $scope.doGetMedicationList(id);
        // Reload TrainingPlan List
        $scope.reloadTrainingplanList();


    };

    $scope.resetUserDetails=function(){
        $scope.deletingChatCount=0;
        $scope.deleteChatLogId=[];
    };

    //Refresh Accordian
    $scope.refreshAccordian=function(){
        $scope.$apply();
    };


    //Get All Client List
    $scope.doGetAllClients = function(){
        requestHandler.getRequest("/coach/myclients/","").then(function(response){
        $scope.clients = response.data.clients;
            $.each($scope.groupsList,function(index,value){
                value.isSelected=false;
            });
        });
   };
    //Get Groups List
    $scope.doGetGroupList=function(){
       requestHandler.getRequest("coach/getGroups/").then(function(response){
             $scope.groupsList=[];
            $scope.groupsList=response.data.Groups;
            $scope.groupsList.push({"id": 0, "coachid": null, "groupname": "Un Assigned", "status": 1});

            $.each($scope.groupsList,function(index,value){
                value.isSelected=false;
            });
        })
    };

    // For Assign to Group  
    $scope.SelectModel =function(param){
        //Intialize the array
        $scope.selectedClientId=[];

        $.each($scope.clients,function(index,value){
            if(value.isChecked)
                $scope.selectedClientId.push(value.userid);
        });
        if($scope.selectedClientId.length==0){
            $("#selectModel").modal('show');
        }else{
            if(param==1){
                $("#groupButton").modal('show');
            }else{
                $("#groupMessage").modal('show');
            }
        }
    };

    $scope.doAssignGroup = function(){
        alert($scope.assignGroup);
        $.each($scope.selectedClientId,function(index,value){
            alert(value);
             requestHandler.postRequest("coach/assignusertogroup/",{"groupid":$scope.assignGroup,"userid":value}).then(function(response){
             },function(){
                successMessage(Flash, "Successfully Added!");
                $scope.doGetAllClients();
            });
        });
       
    };

    // For clients individual User profile view
    $scope.doGetClientsProfileDetailsByCoach= function (id){
            $scope.coachclientdetails={};
            $scope.member = {
                status: 'member-view'
            };
            if(id!=0){
                 requestHandler.getRequest("/getUserProfile/"+id, "").then(function(response){
                    coachclientdetails=response.data.userprofile;
                    // $scope.coachclientdetails.age = "-";
                    

                    //For Age calculation
                    var today = new Date();
                    if(coachclientdetails.dob == null){
                        coachclientdetails.age = "-";
                    }
                    if(coachclientdetails.dob !=null){
                        //Age Calculation starts
                        var birthDate = coachclientdetails.dob;
                        var birthdatearray = birthDate.split("/");
                        var newdate = birthdatearray[1] + '/' + birthdatearray[0] + '/' + birthdatearray[2];
                        birthDate = new Date(newdate);
                         var age = today.getFullYear() - birthDate.getFullYear();
                         var m = today.getMonth() - birthDate.getMonth();
                         if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                             age--;
                          }
                        //Age caluclation ends
                    coachclientdetails.age = age;
                    }
                    $scope.coachclientdetails = coachclientdetails;

                    $scope.viewload=true;
                  });
            }
           
        };
     
    /* For clients Individual Demograpgy Details BY Coach */

    $scope.doGetClientsDemographyDetailsByCoach = function(id){
        requestHandler.getRequest("getUserDemography/"+id, "").then(function(response){
            $scope.demographyDeatil = response.data.demography;

            // For height inches and feet calculation based on user unit preference
                $scope.demographyDeatil.height = $scope.demographyDeatil.height.toString();

                var heightarray=$scope.demographyDeatil.height.split('.');
                var heightSplit=new Array();
                heightSplit= heightarray;
                $scope.demographyDeatil.heightFeet = heightSplit[0];
                if(heightSplit[1]==undefined){
                    $scope.demographyDeatil.heightInches= 0;
                }else{
                    $scope.demographyDeatil.heightInches=heightSplit[1];
                }
                $scope.demographyDeatil.height=$scope.demographyDeatil.height.toString();
        });
    };


    /*For clients Individual daily activities details By Coach */


    $scope.doGetClientHealthProfileDetailsByCoach = function(){
        if(document.getElementById("main-start-date").value!=''){
           var selectedDate=document.getElementById("main-start-date").value;
           // alert(selectedDate);
        }
        else{
            var selectedDate = new Date(); 
            var dd = selectedDate.getDate(); 
            var mm = selectedDate.getMonth()+1; 
            //January is 0! 
            var yyyy = selectedDate.getFullYear(); 
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 
            var selectedDate = dd+'/'+mm+'/'+yyyy;
        }
         
        requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":selectedDate,"enddate":selectedDate}).then(function(response){
          
            //get the array
            $.each(response.data.healthprofile,function(index,value){
                $scope.wearable = value.wearables;
                $scope.water = value.waterlog;
                $scope.budgetDetails=value.budget;
            });
        });
    };

        //To Display User History Graph
        $scope.historyGraph = [
                 {"graphCategory":"ACTIVITY","graphCategoryId":1,"graphs":[
            /*{
                'id': 3,
                'name': 'Exercise Minutes',
                "imageSrc": "../../images/exercise.png"
            },*/
            {
                    'id': 10,
                    'name': 'Floor Graph',
                    "imageSrc": "../../images/floor.png"

            },
            {
                    'id': 7,
                    'name': 'Steps Value',
                    "imageSrc": "../../images/step.png"

            },
            {
                    'id': 12,
                    'name': 'Sleep Rate',
                    "imageSrc": "../../images/sleep.jpg"
            }

            ]
            },


            {"graphCategory":"CALORIES","graphCategoryId":1,"graphs":[{
                'id': 6,
                'name': 'Nutrients Intake',
                "imageSrc": "../../images/FoodNutrition_Icon.png"

            },
            {
                'id': 5,
                'name': 'Budget vs Net',
                "imageSrc": "../../images/budget.png"
            }]
            },
            {"graphCategory":"HEART RATE","graphCategoryId":3,"graphs":[
                
                {
                    'id': 11,
                    'name': 'Heart Rate',
                    "imageSrc": "../../images/heartpeak.ico"

                }
                ]
            },{"graphCategory":"BLOOD GLUCOSE","graphCategoryId":4,"graphs":[{
                'id': 8,
                'name': 'Blood Glucose',
                "imageSrc": "../../images/blood.png"

            }
               /* {
                    'id': 9,
                    'name': 'Blood Oxygen',
                    "imageSrc": "../../images/oxygen.png"
                }*/]

            },{"graphCategory":"BLOOD PRESSURE","graphCategoryId":5,"graphs":[{

                'id': 13,
                'name': 'Blood Pressure',
                "imageSrc": "../../images/bp.png"
            }]
            }, {"graphCategory":"WATER INTAKE","graphCategoryId":6,"graphs":[
                {
                    'id': 14,
                    'name': 'Water Level',
                    "imageSrc": "../../images/fat.jpg"

                }]

            },
            {"graphCategory":"BODY TEMPERATURE","graphCategoryId":7,"graphs":[{

                'id': 16,
                'name': 'Body Temperature',
                "imageSrc": "../../images/smalltemp.png"
            }]
            }
            ];

    $scope.setHistoryType=function(id,divId){
            alert(id);

            $scope.historyType=id;
            if($('#history-start').val()==''){
                $scope.doGetClientGraphDetailsByCoach(divId);
            }
            else $scope.doGetClientGraphDetailsByCoach(divId);
        };

    $scope.doGetClientGraphDetailsByCoach=function(divId){

        //To Display current date
        var selectedDate = new Date();
        var dd = selectedDate.getDate();
        var mm = selectedDate.getMonth()+1; //January is 0!

        var yyyy = selectedDate.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        selectedDate = dd+'/'+mm+'/'+yyyy;
            $scope.isHistoryEmpty=0;
            $scope.loaded=false;
            $scope.waterGraphs=false;
            var endDate;

            //To display lastWeek
        function getLastWeek(){
            var today = new Date();
            var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
            return lastWeek ;
        }

        var lastWeek = getLastWeek();
        var lastWeekMonth = lastWeek.getMonth() + 1;
        var lastWeekDay = lastWeek.getDate();
        var lastWeekYear = lastWeek.getFullYear();
        var lastWeekDisplay = lastWeekMonth + "/" + lastWeekDay + "/" + lastWeekYear;
        var lastWeekDisplayPadded = ("00" + lastWeekDay.toString()).slice(-2)+ "/" + ("00" + lastWeekMonth .toString()).slice(-2)+ "/" + ("0000" + lastWeekYear .toString()).slice(-4);
        var startDate=lastWeekDisplayPadded;


            if($('#history-start').val()==''){
                startDate = startDate;
                endDate = selectedDate;
            }
            else{

                startDate = $('#history-start').val();
                endDate = $('#history-end').val();
            }
            var monthNames= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var historyReport = [];
            var netVal =[];
            var fibreVal=[];
            var fatVal=[];
            var carbsVal=[];
            var diastolicbpVal=[];
            var randomglucoseVal=[];
            var budgetdate=[];
            var nutrientsdate=[];
            var historyDates=[];
            var titles={};

            if($scope.historyType==4){
                if($scope.userProfile.unitPreference==1){
                    $scope.unit="Kgs";
                }
                else if($scope.userProfile.unitPreference==2){
                    $scope.unit="Lbs";
                }
                requestHandler.postRequest("/user/getWeightLogGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.Weight_logs;
                    $.each($scope.historyRecord, function(index,value) {
                        if(value.userentry ==1){
                            var history = [];
                            var date = value.date.split("/");
                            history.push(monthNames[(date[1]-1)]+' '+date[0]);
                            history.push(parseFloat(value.weight));
                            historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                            historyReport.push(history);
                        }
                    });

                    titles.title="Weight Log Graph ( "+startDate+" - "+endDate+" )";
                    titles.graphType='column';
                    titles.name="Weight Log";
                    titles.suffix=$scope.unit;
                    titles.yaxis="Weight (" + $scope.unit + ")";
                    titles.xaxis="Date Range";
                    titles.color='#f8ba01';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }


            else if($scope.historyType==5){
                requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        var history = [];
                        var date = value.budget.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.budget.Budget));
                        netVal.push(value.budget.Net);
                        budgetdate.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Budget Vs Net Graph ( "+startDate+" - "+endDate+" )";
                    titles.graphType='column';
                    titles.name="Budget";
                    titles.suffix=" cals";
                    titles.yaxis="Calories (Cal)";
                    titles.xaxis="Date Range";
                    titles.color='#ff8000';
                    $scope.drawHistoryGraphForBudget(historyReport,titles,netVal,budgetdate,divId);
                });
            }

            else if($scope.historyType==6){
                requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    var totalFibre = 0;
                    var totalProtein = 0;
                    var totalFat = 0;
                    var totalCarbo = 0;
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        totalFibre = parseFloat(totalFibre)+parseFloat(value.nutritions.fibre);
                        totalProtein = parseFloat(totalProtein)+value.nutritions.protein;
                        totalFat   = parseFloat(totalFat)+ value.nutritions.fat;
                        totalCarbo = parseFloat(totalCarbo)+value.nutritions.carbo;
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.nutritions.protein));
                        fibreVal.push(parseFloat(value.nutritions.fibre));
                        fatVal.push(parseFloat(value.nutritions.fat));
                        carbsVal.push(parseFloat(value.nutritions.carbo));
                        nutrientsdate.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });

                    var fiberPercentage=totalFibre/100;
                    var proteinPercentage=totalProtein/100;
                    var fatPercentage=totalFat/100;
                    var carboPercentage=totalCarbo/100;
                    titles.title="Nutrients Graph( "+startDate+" - "+endDate+" )";
                    titles.name="Nutrients";
                    titles.yaxis="Units (grams)";
                    titles.xaxis="Date Range";
                    titles.color='#ff8000';
                    $scope.drawNutrientsGraph(historyReport,titles,fibreVal,fatVal,carbsVal,fiberPercentage,proteinPercentage,fatPercentage,carboPercentage,nutrientsdate,divId);
                });
            }


            else if($scope.historyType==7){
                requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        $scope.steps = value.wearables.steps;
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.wearables.steps));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });

                    titles.title="Steps Graph( "+startDate+" - "+endDate+" )";
                    titles.graphType='column';
                    titles.name="Steps Walked";
                    titles.suffix=" steps";
                    titles.yaxis="Steps (count)";
                    titles.xaxis="Date Range";
                    titles.color='#f8ba01';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }

            else if($scope.historyType==8){
                requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        $scope.steps = value.wearables.steps;
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.wearables.fastingbloodglucose));
                        randomglucoseVal.push(parseFloat(value.wearables.randombloodglucose));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Blood Glucose Graph( "+startDate+" - "+endDate+" )";
                    titles.name="Glucose level";
                    titles.yaxis="Glucose level (mg/dl)";
                    titles.xaxis="Date Range";
                    titles.color='red';
                    $scope.drawBloodGlucoseGraph(historyReport,titles,randomglucoseVal,historyDates,divId);
                });
            }
            else if($scope.historyType==9){
                 requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        $scope.bloodoxygen = value.wearables.bloodoxygen;
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.wearables.bloodoxygen));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Blood Oxygen Graph( "+startDate+" - "+endDate+" )";
                    titles.graphType='spline';
                    titles.name="Bloodoxygen Level";
                    titles.suffix="  mg/dl";
                    titles.yaxis="Bloodoxygen Level (mg/dl)";
                    titles.xaxis="Date Range";
                    titles.color='#33bbff';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }

            else if($scope.historyType==10){
                requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        $scope.floors = value.wearables.floors;
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.wearables.floors));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });

                    titles.title="Floor Graph( "+startDate+" - "+endDate+" )";
                    titles.graphType='column';
                    titles.name="Floors Walked";
                    titles.suffix="  floor (s)";
                    titles.yaxis="Floors";
                    titles.xaxis="Date Range";
                    titles.color='brown';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }
            else if($scope.historyType==11){
                requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        $scope.restingheartrate = value.wearables.restingheartrate;
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.wearables.restingheartrate));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });

                    titles.title="Heart Rate Graph( "+startDate+" - "+endDate+" )";
                    titles.graphType='line';
                    titles.name="Heart Rate";
                    titles.suffix="  bpm";
                    titles.yaxis="Heart Rate (bpm)";
                    titles.xaxis="Date Range";
                    titles.color='#ff3300';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }

            else if($scope.historyType==12){
                requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        $scope.sleep = value.wearables.sleep;
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.wearables.sleep));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Sleep Rate Graph( "+startDate+" - "+endDate+" )";
                    titles.graphType='spline';
                    titles.name="Sleep";
                    titles.suffix="  mins";
                    titles.yaxis="Sleep (minutes)";
                    titles.xaxis="Date Range";
                    titles.color='#339966';
                    $scope.drawSleepHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }
            else if($scope.historyType==13){
                requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        $scope.steps = value.wearables.diastolic;
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.wearables.systolic));
                        history.push(parseFloat(value.wearables.diastolic));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Blood Pressure Graph( "+startDate+" - "+endDate+" )";
                    titles.name="BloodPressure";
                    titles.suffix="  mmHg";
                    titles.yaxis="BloodPressure (mmHg)";
                    titles.xaxis="Date Range";
                    titles.color='#339966';
                    $scope.drawBpHistoryGraph(historyReport,historyDates,diastolicbpVal,titles,divId);
                });
            }
            else if($scope.historyType==14){
                 requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(value.waterlog.milliliters);
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });

                    titles.title="Water Level Graph( "+startDate+" - "+endDate+" )";
                    titles.graphType='spline';
                    titles.name="Water Level";
                    titles.suffix="  ml";
                    titles.yaxis="Water Level (ml)";
                    titles.xaxis="Date Range";
                    titles.color='#00ccff';
                    $scope.drawWaterlogMlHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }
            else if($scope.historyType==15){
                requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(value.waterlog.ounces);
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });

                    titles.title="Water Level Graph( "+startDate+" - "+endDate+" )";
                    titles.graphType='spline';
                    titles.name="Water Level";
                    titles.suffix="  oz";
                    titles.yaxis="Water Level (oz)";
                    titles.xaxis="Date Range";
                    titles.color='#ff4da6';
                    $scope.drawWaterlogOzHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }
            else if($scope.historyType==16){
                requestHandler.postRequest("coach/userhealthprofile/",{"userid":$scope.currentClientId,"startdate":startDate,"enddate":endDate}).then(function(response){
                    
                    //get the array
                    $.each(response.data.healthprofile,function(index,value){
                        $scope.sleep = value.wearables.bodytemperature;
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.wearables.bodytemperature));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Body Temperature Graph( "+startDate+" - "+endDate+" )";
                    titles.graphType='areaspline';
                    titles.name="Body Temperature";
                    titles.suffix="  °F";
                    titles.yaxis="Fahrenheit";
                    titles.xaxis="Date Range";
                    titles.color='#ff4d4d';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }
        };

        $scope.drawHistoryGraph=function(data,dataX,titles,divId){
            $scope.loaded=false;
            $('#'+divId).highcharts({

                title: {
                    text: titles.title
                },
                xAxis: {
                    title: {
                        text: titles.xaxis
                    },
                    categories: dataX
                },
                tooltip:{
                    enabled:true,
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    borderWidth:1,
                    shadow:true,
                    style:{fontSize:'10px',padding:5,zIndex:500},
                    formatter:false,
                    valueSuffix: titles.suffix
                },
                yAxis: {
                    minPadding: 0,
                    maxPadding: 0,
                    min: 1,

                    title: {
                        text: titles.yaxis
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color:titles.color
                    }]
                },
                colors: [
                    titles.color
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },

                legend:{enabled:false},
                series: [{
                    type: titles.graphType,
                    name: titles.name,
                    data: data
                }]
            });
            $('#excerciseGraph').highcharts({

                title: {
                    text: titles.title
                },
                xAxis: {
                    title: {
                        text: titles.xaxis
                    },
                    categories: dataX
                },
                tooltip:{
                    enabled:true,
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    borderWidth:1,
                    shadow:true,
                    style:{fontSize:'10px',padding:5,zIndex:500},
                    formatter:false,
                    valueSuffix: titles.suffix
                },
                yAxis: {
                    minRange:0,

                    title: {
                        text: titles.yaxis
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color:titles.color
                    }]
                },
                colors: [
                    titles.color
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },



                legend:{enabled:false},
                series: [{
                    type: 'column',
                    name: titles.name,
                    data: data
                      }]
            });
        };

        //for bloodglucose Graph
        $scope.drawBloodGlucoseGraph=function(datafbg,titles,datarbg,dataD,divId){
            $scope.loaded=false;

            $('#'+divId).highcharts({
                title: {
                    text: titles.title
                },

                xAxis: {
                    title: {
                        text: titles.xaxis
                    },
                    categories: dataD //to display date

                },
                yAxis: {
                    title: {
                        text: titles.yaxis
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color:titles.color
                    }]
                },
                colors: [
                    titles.color
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.2f} mg/dl</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true,
                    enabled:true,
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    borderWidth:1,
                    shadow:true,
                    style:{fontSize:'10px',padding:5,zIndex:500},
                    formatter:false
                },
                plotOptions: {
                    column: {
                        zones: [{
                            value: 195,
                            color: '#00cc44'
                        },{
                            value: 225,
                            color: '#ffd11a'
                        },{
                            value: 400,
                            color: '#e60000'
                        }]
                    }
                },
                series: [{
                    type: 'column',
                    name: 'Fastingbloodglucose',
                    color: '#339966',
                    data:datafbg     //to  display fasting bloodglucose value
                }, {
                    type: 'column',
                    name: 'Randombloodglucose',
                    color: '#3366cc',
                    data:datarbg   // to display  random bloodGlucose value
                }]

            });
        };

        //for blood pressure graph
        $scope.drawBpHistoryGraph=function(datasbp,dataD,datadbp,titles,divId){
            $scope.loaded=false;
            $('#'+divId).highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: titles.title
                },

                xAxis: {
                    title: {
                        text: titles.xaxis
                    },
                    categories: dataD //for displaying date

                },
                yAxis: {
                    title: {
                        text: titles.yaxis
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color:titles.color
                    }]
                },
                colors: [
                    titles.color
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                legend:{enabled:false},
                tooltip: {

                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.2f} mmHg</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true,
                    enabled:true,
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    borderWidth:1,
                    shadow:true,
                    style:{fontSize:'10px',padding:5,zIndex:500},
                    formatter:false
                },
                series: [{
                    name: 'Systolic Bp',
                    color: '#cc0000',
                    data:datasbp     //for  displaying systolic blood pressure value
                }, {
                    name: 'Diastolic Bp',
                    color: '#339966',
                    data:datadbp     // for displaying diastolic blood pressure value
                }
                ]
            });
        };

        //for sleep history graph
        $scope.drawSleepHistoryGraph=function(data,dataD,titles,divId){
            $scope.loaded=false;
            $('#'+divId).highcharts({

                title: {
                    text: titles.title
                },
                xAxis: {
                    title: {
                        text: titles.xaxis
                    },
                    categories: dataD
                },
                tooltip:{
                    enabled:true,
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    borderWidth:1,
                    shadow:true,
                    style:{fontSize:'10px',padding:5,zIndex:500},
                    formatter:function() {
                        return ' <b>' + this.x + '</b>,<br/>Sleep: <b>' + this.y + '</b> mins ('+$scope.convertMinutesToHours(this.y)+')';
                    },
                    valueSuffix: titles.suffix
                },
                yAxis: {

                    title: {
                        text: titles.yaxis
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color:titles.color
                    }]
                },
                colors: [
                    titles.color
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },

                legend:{enabled:false},
                series: [{
                    type: titles.graphType,
                    name: titles.name,
                    data: data,
                    additional:'true'
                }]
            });
        };

        $scope.drawHistoryGraphForBudget=function(data,titles,data1,data2,divId){
            $scope.loaded=false;
            $('#'+divId).highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: titles.title
                },
                xAxis: {
                    title: {text: titles.xaxis},
                    categories: data2
                },tooltip:{
                    enabled:true,
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    borderWidth:1,
                    shadow:true,
                    style:{fontSize:'10px',padding:5,zIndex:500},
                    formatter:false,
                    valueSuffix: titles.suffix
                },
                yAxis: {
                    title: {
                        text: titles.yaxis
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color:titles.color
                    }]
                },
                colors: [
                    titles.color
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                legend:{enabled:false},
                series: [{
                    type: 'column',
                    name: 'Net',
                    data: data1
                },{

                    type: 'spline',
                    name: 'Budget',
                    data: data,
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }]
            });

        };
        //for Nutrients intake graph

        $scope.drawNutrientsGraph=function(dataP,titles,dataFr,dataFa,dataC,dataAf,dataAp,dataAfa,dataAC,dataD,divId){
            $scope.loaded=false;
            $('#'+divId).highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: titles.title
                },

                xAxis: {
                    title: {
                        text: titles.xaxis
                    },
                    categories: dataD     //to display  date

                },
                yAxis: {

                    title: {
                        text: titles.yaxis
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color:titles.color
                    }]
                },
                colors: [
                    titles.color
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                legend:{enabled:false},

                tooltip:{
                    enabled:true,
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    borderWidth:1,
                    shadow:true,
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'+
                        '<td style="padding:0"><b>{point.y:.2f} %</b></td></tr>',
                    style:{fontSize:'10px',padding:5,zIndex:500},
                    formatter:false,
                    valueSuffix: titles.suffix
                },

                series: [{
                    name: 'Protein',
                    color: 'limegreen',
                    data:dataP ,          // to display protein value
                    tooltip: {

                        headerFormat: '<span style="font-size:10px">{point.key} </span> <table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.2f} g</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true,
                        enabled:true,
                        backgroundColor:'rgba(255, 255, 255, 1)',
                        borderWidth:1,
                        shadow:true,
                        style:{fontSize:'10px',padding:5,zIndex:500},
                        formatter:false
                    }
                }, {
                    name: 'Fat',
                    color: 'red',
                    data:dataFa ,        // to display fiber value
                    tooltip: {

                        headerFormat: '<span style="font-size:10px">{point.key} </span> <table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.2f} g</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true,
                        enabled:true,
                        backgroundColor:'rgba(255, 255, 255, 1)',
                        borderWidth:1,
                        shadow:true,
                        style:{fontSize:'10px',padding:5,zIndex:500},
                        formatter:false
                    }
                }, {
                    name: 'Carbs',
                    color: '#ff8000',
                    data:dataC,          // to display fat value
                    tooltip: {

                        headerFormat: '<span style="font-size:10px">{point.key} </span> <table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.2f} g</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true,
                        enabled:true,
                        backgroundColor:'rgba(255, 255, 255, 1)',
                        borderWidth:1,
                        shadow:true,
                        style:{fontSize:'10px',padding:5,zIndex:500},
                        formatter:false
                    }

                }, {
                    name: 'Fibre',
                    color: '#ffcc00',
                    data:dataFr,        // to display fibre value
                    tooltip: {

                        headerFormat: '<span style="font-size:10px">{point.key} </span> <table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.2f} g</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true,
                        enabled:true,
                        backgroundColor:'rgba(255, 255, 255, 1)',
                        borderWidth:1,
                        shadow:true,
                        style:{fontSize:'10px',padding:5,zIndex:500},
                        formatter:false
                    }
                },


                    {
                        type: 'pie',
                        name: 'Total Consumption',
                        data: [{
                            name: 'Protein',
                            y: dataAp,
                            color:'limegreen'
                        }, {
                            name: 'Fat',
                            y:  dataAfa,
                            color:'red'
                        }, {
                            name: 'Fibre',
                            y: dataAf,
                            color:'#ffcc00'
                        },{
                            name: 'Carbo',
                            y: dataAC,
                            color:'#ff8000'
                        }],
                        center: [100, 80],
                        size: 100,
                        showInLegend: false,
                        dataLabels: {
                            enabled: false
                        }
                    }
                ]
            });
        };

        //for water log millilitre unit graph
        $scope.drawWaterlogMlHistoryGraph=function(dataml,dataX,titles,divId){
            console.log(dataml);
            $scope.historyType=14;
            $scope.waterGraphs=true;
            $scope.loaded=false;
            $('#'+divId).highcharts({

                title: {
                    text: titles.title
                },
                xAxis: {
                    title: {
                        text: titles.xaxis
                    },
                    categories: dataX
                },
                tooltip:{
                    enabled:true,
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    borderWidth:1,
                    shadow:true,
                    style:{fontSize:'10px',padding:5,zIndex:500},
                    formatter:false,
                    valueSuffix: titles.suffix
                },
                yAxis: {
                    title: {
                        text: titles.yaxis
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color:titles.color
                    }]
                },
                colors: [
                    titles.color
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },

                legend:{enabled:false},
                series: [{
                    type: titles.graphType,
                    name: titles.name,
                    data: dataml

                }]
            });
        };

        //for water log ounces unit graph
        $scope.drawWaterlogOzHistoryGraph=function(dataoz,dataX,titles,divId){
            console.log(dataoz);
            $scope.historyType=15;
            $scope.waterGraphs=true;
            $scope.loaded=false;
            $('#'+divId).highcharts({

                title: {
                    text: titles.title
                },
                xAxis: {
                    title: {
                        text: titles.xaxis
                    },
                    categories: dataX
                },
                tooltip:{
                    enabled:true,
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    borderWidth:1,
                    shadow:true,
                    style:{fontSize:'10px',padding:5,zIndex:500},
                    formatter:false,
                    valueSuffix: titles.suffix
                },
                yAxis: {

                    title: {
                        text: titles.yaxis
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color:titles.color
                    }]
                },
                colors: [
                    titles.color
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },

                legend:{enabled:false},
                series: [{
                    type: titles.graphType,
                    name: titles.name,
                    data: dataoz

                }]
            });
        };

        //To Convert Minutes to Hours Format
        $scope.convertMinutesToHours=function(minutes){
            var sign ='';
            if(minutes < 0){
                sign = '-';
            }
            var hours=Math.floor(Math.abs(minutes) / 60);
            hours = ((hours < 10 && hours >= 0) ? '0' : '') + hours;

            var minutes = Math.abs(minutes) % 60;
            minutes=((minutes < 10 && minutes >= 0) ? '0' : '') + minutes;

            return sign + hours +'hrs '+minutes + 'mins';
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


    //Do Get Chat Message
    $scope.doGetChatMessage=function(id){
        $scope.currentChatTargetId=id;
        $scope.getMessageParam={"targetid":id,"offset":0};

        requestHandler.postRequest("/readMessage/",$scope.getMessageParam).then(function(response){
            $scope.chatMessages=response.data.chats;
            if(response.data.chats.length!=0){
                $scope.chatMessages.coachid= response.data.chats[0].coachid;

                requestHandler.getRequest("/getUserProfile/"+$scope.chatMessages.coachid, "").then(function(response){
                     $scope.coachImageUrl=response.data.userprofile.imageurl;
                });
            }
           
            $scope.chat={"message":""};

            $scope.unreadChatMessageCount=0;

            var newMessageFound=0;
            $scope.showMessageCount=false;
            $.each($scope.chatMessages,function(index,value){
                value.selectedChat=0;
                value.firstNewMessage=0;
                if(value.status==0 && value.sentby==3){
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

    // Notes for User Written by Coach reference

   // Insert or Update Notes
    $scope.doInsertOrUpdateNotes = function(userid){
        $scope.notes= $scope.Notes.notes;

        requestHandler.postRequest("coach/updatenotes/",{"userid":userid,"notes":$scope.notes}).then(function(response){
            if(response.data.Response == "Success"){
                $scope.doGetNotesByCoach(userid);
                $('#notesButton').hide();
                scrollBottom: 0
            }
        });
    };
        //Get Users Individual Notes
    $scope.doGetNotesByCoach = function(userid){
        $scope.Notes="";
        $('#notesButton').hide();
        requestHandler.postRequest("coach/getnotes/",{"userid":userid}).then(function(response){
            $scope.Notes = response.data.Notes;
        });
    };

    //Clear all Notes for Individual Notes
    $scope.doClearAllNotes = function(userid){
            $scope.Notes.notes ="";
           $scope.doInsertOrUpdateNotes(userid);


    };

    // For remove user by coach from all groups

    $scope.doRemoveUserByCoach = function(userid){
        requestHandler.postRequest("coach/removeuser/",{"userid":userid}).then(function(response){
            $scope.Result = response.data.Response;
            if(response.data.Response == "Success"){
                        $scope.doGetMyMembers();
             
            }
        });
    };

    //Alert Popup for Remove user from coach
    $scope.doRemoveUser=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#modal").hide();
            $("#lean_overlay").hide();
        });
    };


    /*Get Medication List*/
     $scope.doGetMedicationList = function(userid){
        requestHandler.postRequest("coach/coachgetmedications/",{"userid":userid}).then(function(response){
            $scope.medicationList = response.data.medications;
        });
    };

    /*Get traning plan details*/

    $scope.doGetTrainingPlanDetails = function(userid){
        $scope.param={
            "limit":$scope.pagination.itemsPerPage,
            "offset":($scope.pagination.pageNumber-1)*$scope.pagination.itemsPerPage
        };
        $scope.param.userid = userid;
        requestHandler.postRequest("coach/getTrainingPlans/",$scope.param).then(function(response){
            $scope.planList = response.data.history;
        });
    };


// Reload training plan list page while adding user training plan
    $scope.reloadTrainingplanList=function(){
        $(".tracking-plan-viewall-div").show();
        $(".tracking-plan-view-div").hide();
        $(".tracking-plan-add-div").hide();
    };


    /*Get Individual plans view*/

    $scope.doGetPlansView = function(id){
        
        requestHandler.getRequest("coach/getTrainingPlandetail/"+id,"").then(function(response){
            $scope.planView = response.data.history;

             $(".tracking-plan-viewall-div").hide();
             $(".tracking-plan-view-div").show();
             $(".tracking-plan-add-div").hide();
        });
    };

    //do Insert New Plans

    $scope.doInsertTrainingPlan = function(){
        $scope.planDetails.userid = $scope.currentClientId;
        requestHandler.postRequest("coach/insertTrainingPlan/",$scope.planDetails).then(function(response){
        },function(){
            successMessage(Flash, "Successfully Plan Added!");
            $scope.doGetTrainingPlanDetails(userid);
        });
    };


    //TO check Maximum digits validation for training plan amount
    $scope.maxAmount=false;
    $scope.maxAmountCheck = function(amount){
        if(amount<= 99999.99){
            $scope.maxAmount=false;
        }
        else if(amount> 99999.99){
            $scope.maxAmount=true;
        }

    }
    
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

        /*angular.forEach(roundProgressService.animations, function(value, key){
            $scope.animations.push(key);
        });*/

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

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.pagination={"itemsPerPage":9,"pageNumber":1};
        $scope.doGetIndividualClientDetail($routeParams.id);
    };

    //Initial Load
    $scope.statsInit = function(){
        $scope.loaded = false;
        $scope.paginationLoad=false;
         //Health profile Details
        $scope.doGetClientHealthProfileDetailsByCoach();
        //Graph  for oneweek
        $scope.doGetClientGraphDetailsByCoach();
    };

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').fadeIn(300);
        $('.search-list-form input').focus();
    });

    $('.search-list-form input').focusout(function() {
        $('.search-list-form').fadeOut(300);
        $scope.membersearch="";
    });


}]);

coachApp.controller('MyMembersController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams){

    $scope.getMyClientsList=function(){
         requestHandler.getRequest("coach/myclients/","").then(function(response){
            $scope.myClients=response.data.clients;
        },function(){
            successMessage(Flash, "Successfully Plan Added!");
            $scope.doGetTrainingPlanDetails(userid);
        });
    }


    $scope.init=function(){
        $scope.getMyClientsList();
    }

    //My Members Init
    $scope.init();


}]);

coachApp.controller('MembersViewController',['$scope','requestHandler','Flash','$routeParams','$sce',function($scope,requestHandler,Flash,$routeParams,$sce) {

    $scope.activeClass.mymembers='active';

    //Exercise Detail View Suggestion
    $scope.doViewMembers= function () {
        $scope.loaded = true;
        requestHandler.getRequest("getUserIndividualDetail/"+$routeParams.id,"").then(function(response){
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.getUserIndividualDetail.imageurl+"?decache="+Math.random());
            $scope.viewMemberDetails = response.data.getUserIndividualDetail;
            //View the image in ng-src for view testimonials

            if($scope.viewMemberDetails.about==null){
                $scope.viewMemberDetails.about="N/A";
            }
            if($scope.viewMemberDetails.dob==null){
                $scope.viewMemberDetails.dob="N/A";
            }
            if($scope.viewMemberDetails.phone==null){
                $scope.viewMemberDetails.phone="N/A";
            }
            if($scope.viewMemberDetails.country==null){
                $scope.viewMemberDetails.country="N/A";
            }
            if($scope.viewMemberDetails.state==null){
                $scope.viewMemberDetails.state="N/A";
            }
            if($scope.viewMemberDetails.city==null){
                $scope.viewMemberDetails.city="N/A";
            }
            if($scope.viewMemberDetails.zipcode==null){
                $scope.viewMemberDetails.zipcode="N/A";
            }

            $scope.loaded = false;
            $scope.paginationLoad = true;

        },  function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.doViewMembers();

}]);

coachApp.filter('startsWithLetterSearch', function () {

    return function (items, clientsearch) {
        var filtered = [];
        var letterMatch = new RegExp(clientsearch, 'i');
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

// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);


// Graph chart
coachApp.directive('historyGraph', function () {
    return {
        restrict: 'C',
        replace: true,
        scope: {
            historygraph: '='
        },
        controller: function ($scope, $element, $attrs) {
        },
        template: '<div id="graph-container" style="height: 400px;width: 67%">not working</div>',
        link: function (scope, element, attrs) {
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'graph-container',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: scope.test,
                    x: -20 //center
                },
                subtitle: {
                    text: '',
                    x: -20
                },
                xAxis: {
                    title: {text: 'Date Range'},
                    categories: []
                },
                yAxis: {
                    title: {
                        text: 'Weight (Kgs)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#ff0066'
                    }]
                },
                tooltip: {
                    valueSuffix: 'Kgs'
                },

                colors: [
                    '#ff0066'
                ],
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0,
                    x: 80,
                    y: 0
                },
                series: [ {
                    name: 'Weight',
                    data: []
                }],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                }
            });
            scope.$watch("historygraph", function (newValue) {
                chart.series[0].setData(newValue, true);
            }, true);
        }
    }
});