var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','ngTouch','ngPercentDisplay','userDashboardServiceModule','angular-svg-round-progress','ui.bootstrap','angular-nicescroll','mwl.calendar']);

userApp.controller('UserDashboardController',['$scope','$window','requestHandler','Flash','UserDashboardService','$interval','roundProgressService','limitToFilter','$timeout','$compile','$location','$rootScope','$route','calendarConfig','moment',function($scope,$window,requestHandler,Flash,UserDashboardService,$interval,roundProgressService,limitToFilter,$timeout,$compile,$location,$rootScope,$route,calendarConfig,moment) {
        $rootScope.isMenuShow=1;
        $scope.foodSearchResult = [];
        $scope.userFood={};
        $scope.userFood.sessionid=1;
        $scope.graphSessionId='1';
        $scope.servings=0;
        $scope.current=$scope.caloriesIntake=0;
        $scope.max=$scope.gainGraphMax=100;
        $scope.exerciseSearchResult = [];
        $scope.userExercise={};
        $scope.customExercise={};
        $scope.exercisename='';
        $scope.reps='';
        $scope.calories='';
        $scope.caloriesSpent=0;
        $scope.workoutvalue=0;
        $scope.workoutvalueMinutes=0;
        $scope.workoutvalueSeconds=0;
        $scope.workoutvalueHours=0;
        $scope.selectedMinutes=0;
        $scope.selectedSeconds=0;
        $scope.selectedHours=0;
        $window.singlePicker = false;
        $window.minimumDate = new Date();
        $scope.weightUpdateText="Update";
        $scope.syncBtnTxt="Sync Now";
        $scope.sync_btn_background_color="#ff5010";
        $scope.connectDevice=false;
        $scope.waterAddText="+ Log";
        $scope.waterReduceText="- Reduce";
        $scope.wearableText="Disconnect";
        $scope.graphs=1;
        $scope.historyReport=0;
        $scope.historyType=1;
        $scope.showExercise=0;
        // $scope.showFoodMoal=0;
        $scope.isGlycaemicValueEmpty=false;
           $window.emi=0;
        slidemenu();
        daterangepicker();
        modeltrigger();
        tabcontent();
        if($route.current.$$route.fromGoal)
            $("#updateWeightGoal").click();
        if($route.current.$$route.fromDevice){
            $("#appAndDevice").click();
        }
    // $scope.mealPlanCalender=function(){
    //     $(function(){
    //         $("#lean_overlay").fadeTo(1000);
    //         $("#meal-plan-calendar").fadeIn(600);
    //         $(".common_model").show();
    //
    //     });
    //
    //     $(".modal_close").click(function(){
    //         $(".common_model").hide();
    //         $("#meal-plan-calendar").hide();
    //         $("#lean_overlay").hide();
    //     });
    //
    //     $("#lean_overlay").click(function(){
    //         $(".common_model").hide();
    //         $("#meal-plan-calendar").hide();
    //         $("#lean_overlay").hide();
    //     });
    //
    // };

    // if($rootScope.isMenuClicked==1){
    //     $scope.mealPlanCalender();
    // };
        if($rootScope.isMenuClicked==3){

            $("#appAndDevice").click();
        };
        if($rootScope.isMenuClicked==2){
            $("#dailyupdate").click();
            $("#energyspent").click();
        };
        if($rootScope.isMenuClicked==7){
            $("#dailyupdate").click();
            $("#weight-water").click();
        };


    // $('#energyspent').click(function(e) {
    //     $scope.showFoodMoal=0;
    // });
    // $('#weight-water').click(function(e) {
    //     $scope.showFoodMoal=0;
    // });
    // $('#foodintake').click(function(e) {
    //     $scope.showFoodMoal=1;
    //     $scope.mealPlanCalender();
    // });

        //Modal Popup to add user food
        $scope.doUserAddFood=function(){
            $scope.isHistoryEmpty=0;
            $scope.historyReport=0;
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#modal-add-food").fadeIn(600);
                $(".user_register").show();

            });
            $(".modal_close").click(function(){
                $(".user_register").hide();
                $("#modal-add-food").hide();
                $("#lean_overlay").hide();
                $scope.resetdata();
            });

            $("#lean_overlay").click(function(){
                $(".user_register").hide();
                $("#modal-add-food").hide();
                $("#lean_overlay").hide();
                $scope.resetdata();
            });
            $scope.selectedFood="";
        };

        //Modal Popup to add user exercise
        $scope.doUserAddExercise=function(){
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
            $scope.selectedExercise="";

        };

        //To Insert User Custom Exercise
        $scope.doUserAddCustomExercise=function(){
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#modal-custom-exercise").fadeIn(600);
                $(".user_register").show();
            });

            $(".modal_close").click(function(){
                $(".user_register").hide();
                $("#modal-custom-exercise").hide();
                $("#lean_overlay").hide();
                $scope.resetexercisedata();
            });

            $("#lean_overlay").click(function(){
                $(".user_register").hide();
                $("#modal-custom-exercise").hide();
                $("#lean_overlay").hide();
                $scope.resetexercisedata();

            });
        };

        /*Starts For Medications*/

        // medication popup
        $scope.resetMedication=function(){
            $scope.medication={};
            document.getElementById("set-to-date").value ="";
            $scope.medication.medicinename="";
            $scope.medication.dosage="";
            $scope.medication.todate="";
            $scope.medication.notes="";
            $scope.medication.issharable= 0;
            $scope.medicationForm.$setPristine();
            $scope.isNew = true;
            $scope.title = "Add Medication";
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#medication").fadeIn(600);
                $(".common_model").show();
                $scope.shouldBeOpen = true;
            });

            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#medication").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#medication").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

        };

        // opload document popup
        $scope.uploadreset=function(){
            $scope.title = "Upload Document";
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#uploadDocumentMedication").fadeIn(600);
                $(".common_model").show();
                $scope.shouldBeOpen = true;
            });

            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#uploadDocumentMedication").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#uploadDocumentMedication").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

        };


        // delete medication popup
        $scope.deletemedication=function(logid){
            $scope.deleteLogid = logid;
            $scope.title = "Upload Document";
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#medication-delete-confirmation").fadeIn(600);
                $(".common_model").show();
                $scope.shouldBeOpen = true;
            });

            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#medication-delete-confirmation").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#medication-delete-confirmation").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

        };

        // delete medication popup
        $scope.deleteuploaded=function(name){
            $scope.filename = name;
            console.log(name);
            $scope.title = "Upload Document";
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#medication-document-delete-confirmation").fadeIn(600);
                $(".common_model").show();
                $scope.shouldBeOpen = true;
            });

            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#medication-document-delete-confirmation").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#medication-document-delete-confirmation").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

        };


        $scope.medicationforArray = ['Fever','Typhoid','Diabetic','Sugar','Blood Pressure','Hypertension','Heart Disease','Asthma','Obesity','Headache',
          'Depression','Gastro Intestinal','Alzhema','Other'];            

        $scope.sessionid=1;
        //Do Get User Medication List
        $scope.doGetMedicationListByUser=function(){
            $scope.loader=true;
            var toDate;
            var fromDate
            if($('#medications-start').val()==''){
                fromDate =startDate;
                toDate = selectedDate;
            }
            else{
                fromDate = $('#medications-start').val();
                toDate = $('#medications-end').val();
            }
            requestHandler.postRequest("user/getmedications/",{"fromdate":fromDate,"todate":toDate}).then(function(response){
              $scope.userMedicationList= response.data.list;
              $scope.loadMedicationBySession($scope.sessionid);
              $scope.loader=false;
              $scope.paginationLoad=true;
           }, function(){
              errorMessage(Flash,"Please try again later!");
           });
        };

        $scope.loadMedicationBySession=function(sessionid){
            $scope.userMedicationData=[];
            $.each($scope.userMedicationList, function(index,value) {
                $scope.resultData = value.medications;
                $.each($scope.resultData, function(index,value){
                    if(value.session.indexOf(sessionid)!=-1) {
                        $scope.userMedicationData.push(value);
                    }
                 });
            });
        }


        $scope.getMedicationsSession=function(sessionSet){

            //Set Session
            var session =[];

            if(sessionSet.morning){
                session.push("1");
            }
            if(sessionSet.anun){
                session.push("2");
            }
            if(sessionSet.evening){
                session.push("3");
            }
            return session.toString();
        };


        // Add Medications
        $scope.doInsertOrUpdateUserMedication=function(){
            var setToDate = document.getElementById("set-to-date").value
            if (setToDate!="") {
                $scope.medication.todate= setToDate;
            }
            $scope.medication.session=$scope.getMedicationsSession($scope.medication.session);
            if($scope.medication.notes==""){
                $scope.medication.notes=null;
            }
            if($scope.isNew == false) {
                $scope.medication.fromdate = $scope.medication.date;
                $scope.medication.todate = "";
            }
            if($scope.medication.medicinefor=='Other'){
                $scope.medication.medicinefor=$scope.medication.medicinefortext;
            }
            requestHandler.postRequest("user/insertorupdatemedication/",$scope.medication).then(function(response){
                 $scope.doGetMedicationListByUser();
                 successMessage(Flash,"Successfully Added");
                 $scope.loaded=false;
             }, function(){
                errorMessage(Flash,"Please try again later!");
             });
        };

        //Delete Mediactions
        $scope.doDeleteUserMedication=function(){
            requestHandler.postRequest("user/deletemedication/",{'logid':$scope.deleteLogid}).then(function(response){
                successMessage(Flash,"Successfully Removed");
                $scope.doGetMedicationListByUser();
            }, function(){
                errorMessage(Flash,"Please try again later!");
            }); 
        };

    //To Check Maximum dosage value
    $scope.maxdosage=false;
    $scope.maxDosageCheck = function(dosage){
        if(dosage <=999.99){
            $scope.maxdosage=false;
        }
        else if(dosage >999.99){
            $scope.maxdosage=true;
        }

    };

        // view User Medictaions
        $scope.viewUserMedication=function(id){
            //scrolling to top of the page
            $('html, body').animate({scrollTop :0},"slow");
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#viewMedication").fadeIn(600);
                $(".common_model").show();
                $scope.shouldBeOpen = true;
            });

            requestHandler.postRequest("medicationdetail/",{'logid':id}).then(function(response){
                $scope.userMedicationDetails=response.data.medication;
                $scope.userMedicationDetails.sessionSet=$scope.getMedicationsSession($scope.userMedicationDetails.session);
            }, function(){
                errorMessage(Flash,"Please try again later!");
            });

            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#viewMedication").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#viewMedication").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });
        };

        $scope.medicationOtherText;
        // Edit User Medications
        $scope.doEditUserMedication=function(id){
            //scrolling to top of the page
            $('html, body').animate({scrollTop :0},"slow");
            $scope.isNew = false;
            $scope.title = "Edit Medication";

            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#medication").fadeIn(600);
                $(".common_model").show();
                $scope.shouldBeOpen = true;
            });

            $scope.loaded=true;
            requestHandler.postRequest("medicationdetail/",{'logid':id}).then(function(response){
                $scope.medication= response.data.medication;

                var d =new Date($scope.medication.date);
                var datestring = ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) +"/" +  + d.getFullYear();
                   $scope.startdate = datestring;

                   $scope.medication.date = $scope.startdate;

                if($scope.medicationforArray.indexOf($scope.medication.medicinefor)==-1){
                    $scope.medication.medicinefortext = angular.copy($scope.medication.medicinefor);
                    $scope.medication.medicinefor ="Other";
                }
                    
                var sessionString = $scope.medication.session;
                var sessionArr = sessionString.split(',');
                var session=[];
                for(i=0; i < sessionArr.length; i++)
                session.push(parseInt(sessionArr[i]));

                $.each(session, function(index,value) {
                    switch(value) {
                        case 1:
                            session.morning=true;
                            break;
                        case 2:
                            session.anun=true;
                            break;
                        case 3:
                            session.evening=true;
                            break;
                        default:
                            break;
                    }
                });

                return $scope.medication.session = session;
                
            });
            $scope.loaded=false;
            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#medication").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#medication").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });
        };
        /*End medications*/

        /*For Medications Document Upload*/

        $scope.uploadBtnTxt="Upload File";
        $scope.fileUpload=false;
        $scope.paginationLoad=false;
        $scope.usedSpace=0;
        $scope.fileTypeError=false;



        // Search  Medication
        $('.show-list-search').click(function() {
            $('.search-list-form').toggle(300);
            $('.search-list-form input').focus();
        });

      //to get user id
            $scope.doGetUserDetails=function(){
                $scope.loader=true;
                requestHandler.getRequest("getUserId/").then(function(response){
                    $scope.userDetails=response.data.User_Profile;
                    $scope.loader=false;
                    $scope.doGetUserUploadedDocument($scope.userDetails.userid);
                });

            };


        //To get user uploaded file list
        $scope.doGetUserUploadedDocument=function(userid){
        $scope.loader=true;
            $scope.totalAvailableSpace=20;
            requestHandler.getRequest("readfiles/"+ userid+"/","").then(function(response){
                $scope.userUploadedDocumentList=response.data.files;
                $scope.usedSpace=response.data.usedspace;
                $scope.availableSpace=response.data.availablespace;
                $scope.availableSpaceColor="red";
                $scope.usedSpaceColor="limegreen";
                $scope.loader=false;
                $scope.paginationLoad=true;
            }, function(){
                errorMessage(Flash,"Please try again later!");
            });
        };

        //to check user is having coach or not
        $scope.doCheckUserMedicationDocument=function(){
            $scope.loader=true;
            requestHandler.getRequest("user/checkfolderexist/","").then(function(response){
                $scope.userUploadedDocumentIsExists=response.data.isexist;
                if($scope.userUploadedDocumentIsExists==1){
                    $scope.showDocumentList=true;
                }
                else{
                    $scope.showDocumentList=false;
                }

                $scope.loader=false;
            }, function(){
                errorMessage(Flash,"Please try again later!");
            });
        };




    //to delete user uploaded document
        $scope.deleteUserUploadedDocument=function(){
                requestHandler.postRequest("user/deletefile/",{'filename':$scope.filename}).then(function(response){
                    successMessage(Flash,"Successfully Removed");
                    $scope.doGetUserUploadedDocument($scope.userDetails.userid);
                }, function(){
                    errorMessage(Flash,"Please try again later!");
                });
        };

        $scope.doUploadFile = function(){
            $scope.fileUpload=true;
            $scope.uploadBtnTxt="Uploading...";


            requestHandler.directFileUpload("user/uploadfile/",$scope.uploadFile,"document").then(function(response){

                console.log(response.data);
           if(response.data.Response_status==0 ){
                $(".common_model").hide();
                $("#uploadDocumentMedication").hide();
                $("#lean_overlay").hide();
                errorMessage(Flash,response.data.Error);
            }
            else if(response.data.Response_status==1){
                $(".common_model").hide();
                $("#uploadDocumentMedication").hide();
                $("#lean_overlay").hide();
                successMessage(Flash,"Successfully Uploaded");
            }
               $scope.uploadBtnTxt="Upload File";
               $scope.fileUpload=false;
               $scope.doGetUserUploadedDocument($scope.userDetails.userid);
               $scope.resetDocument();
           });

        };

        //To clear uploaded file
        $scope.resetDocument = function () {
            $scope.uploadFile="";
            angular.element("input[type='file']").val(null);
            $scope.documentUploadForm.$setPristine();
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

        var getPadded = function(val){
            return val < 10 ? ('0' + val) : val;
        };

    /*End Medications Documents Upload*/

        $scope.doSyncDevices=function(id){
            $scope.connectDevice=true;
            $scope.syncBtnTxt="Synchronizing...";
        var date = document.getElementById("main-start-date").value;
            requestHandler.postRequest("user/syncWearableData/",{"date":date}).then(function(response){
              $scope.doGetConnectedDevices();
                    if(id=0){
                        $location.path("dashboard");
                    }

              $scope.connectDevice=false;
            $scope.initialLoadFoodAndExercise(date);
                    },
                function () {
                    errorMessage(Flash, "Please try again later!")
                });
        };
        $scope.doGetConnectedDevices=function(){
            requestHandler.getRequest("getWearableVendorsListByUser/","").then(function(response){
                $scope.vendorlist=response.data.vendorlist;
                var isActive=0;
                $.each($scope.vendorlist, function(index,value) {
                        if(value.isactive==1){
                            isActive++;
                        }
                  });
                if(isActive>0){
                   $scope.syncBtnTxt="Sync Completed";
                   $scope.sync_btn_background_color="#35900d";

                }
                else{
                   $scope.syncBtnTxt="No Devices Connected";
                }
                });
        };

        //On Select frequent foods
        $scope.frequentFood=function(foodid){
            $window.emi=0;
            callGlycaemic();
            $scope.isNew=true;
            $scope.title= "Add Food";
            $scope.loaded=true;
            var getFoodDetailPromise=UserDashboardService.doGetSelectedFoodDetails(foodid);
            getFoodDetailPromise.then(function(result){
                $scope.userSelectedFoodDetails=result;
                if( $scope.userSelectedFoodDetails.glycaemicindex==null){
                    $scope.isGlycaemicValueEmpty=true;
                }
                $scope.loaded=false;
                $scope.doUserAddFood();
            });
        };


        //On Select suggested foods
        $scope.suggestedFoodByAdmin=function(foodid){
            $window.emi=0;
            $scope.isNew=true;
            $scope.title= "Add Food";
            $scope.loaded=true;
            callGlycaemic();
            var getFoodDetailPromise=UserDashboardService.doGetSelectedFoodDetails(foodid);
            getFoodDetailPromise.then(function(result){
                $scope.userSelectedFoodDetails=result;
                if( $scope.userSelectedFoodDetails.glycaemicindex==null){
                    $scope.isGlycaemicValueEmpty=true;
                }
                $scope.loaded=false;
                $scope.doUserAddFood();
            });
        };

        //On Select search function
        $scope.foodSelected=function(){
            $window.emi=0;
            callGlycaemic();
            $scope.isNew=true;
            $scope.title= "Add Food";
            var getFoodDetailPromise=UserDashboardService.doGetSelectedFoodDetails($scope.selectedFood.foodid);
            getFoodDetailPromise.then(function(result){
                $scope.userSelectedFoodDetails=result;
           if( $scope.userSelectedFoodDetails.glycaemicindex==null){
               $scope.isGlycaemicValueEmpty=true;
           }
                $scope.doUserAddFood();
            });
        };
        var originalmeasure="";
        var originalservings="";
        //On Select edit foods
        $scope.doEditUserFood=function(foodid,userfoodid){
            $scope.isNew=false;
            $scope.title= "Edit Food";
            $scope.loaded=true;
            callGlycaemic();
            var getFoodDetailForEditPromise=UserDashboardService.doGetSelectedFoodDetails(foodid);
            getFoodDetailForEditPromise.then(function(result){
                $scope.userSelectedFoodDetails=result;
                var getUserFoodDetailsPromise=UserDashboardService.doGetUserFoodDetails(userfoodid);
                getUserFoodDetailsPromise.then(function(result){
                    $scope.userFoodGlycaemic=result.glycaemicload;
                    $scope.userFood.userfoodid=result.userfoodid;
                    $scope.userFood.foodid=result.foodid;
                    //  $scope.userFood.measure=result.measureid;
                    $.each($scope.userSelectedFoodDetails.measure, function(index,value) {
                        if(value.measureid == result.measureid.measureid){
                            $scope.userFood.measure = value;
                            originalmeasure = angular.copy(value);
                        }
                    });

                    $scope.userFood.servings=parseFloat(result.measureid.servings);
                    originalservings = angular.copy(result.measureid.servings);
                    $scope.current=$scope.caloriesIntake=result.measureid.calories;
                    $scope.glycaemicLoad=result.glycaemicload;
                    $window.emi=$scope.glycaemicLoad;
                    callGlycaemic();
                    if($scope.glycaemicLoad <= 10) {
                        $scope.glycaemic = 1;
                    }
                    else if($scope.glycaemicLoad >= 11 && $scope.glycaemicLoad <= 19) {
                        $scope.glycaemic = 2;
                    }
                    else {
                        $scope.glycaemic = 3;
                    }
                    $scope.current=$scope.current.toFixed(2);
                    if(($scope.current.length-3)>2) $scope.max=100+((String($scope.current|0).slice(0, -2))*100);
                    else $scope.max=100;
                    $scope.loaded=false;
                    $scope.doUserAddFood();
                });
            });
        };

        $scope.isCleanFood=function(){
            return angular.equals(originalmeasure, $scope.userFood.measure)&& angular.equals(originalservings, $scope.userFood.servings);
        };

        //Calories caluclation for food
        $scope.doCalculateCalories=function(){
            if($scope.userFood.servings==0){
                $scope.current=$scope.caloriesIntake=0;
            }
            if(!$scope.userFood.servings>0){
                $scope.current=$scope.caloriesIntake=0;
            }
            else{
                $scope.current=$scope.caloriesIntake=$scope.userFood.measure.calories*$scope.userFood.servings;
                $scope.current=$scope.current.toFixed(2);
                if(($scope.current.length-3)>2) $scope.max=100+((String($scope.current|0).slice(0, -2))*100);
                else $scope.max=100;
                 /* glyphicload calculation*/
                $scope.userCarbo=($scope.current*$scope.userFood.measure.carbo);
                
                $scope.glycaemicLoad = parseFloat(($scope.userSelectedFoodDetails.glycaemicindex*$scope.userCarbo) / 100);
                $scope.glycaemicLoad=$scope.glycaemicLoad.toFixed(2);
                /* for graph*/
                $window.emi=$scope.glycaemicLoad;
                callGlycaemic();
                if($scope.glycaemicLoad <= 10) {
                    $scope.glycaemic = 1;
                }
                else if($scope.glycaemicLoad >= 11 && $scope.glycaemicLoad <= 19) {
                    $scope.glycaemic = 2;
                }
                else {
                    $scope.glycaemic = 3;
                }
            }
        };

        //Insert User Food
        $scope.doInsertUserFood=function(){
            //Set values according to the api calls
            $scope.userFood.foodid=$scope.userSelectedFoodDetails.foodid;
            $scope.userFood.measureid=$scope.userFood.measure.measureid;
            $scope.userFood.addeddate=document.getElementById("main-start-date").value;
            $scope.userFood.servings=parseFloat($scope.userFood.servings);

            var foodInsertPromise=UserDashboardService.doInsertUserFood($scope.userFood);
            foodInsertPromise.then(function(){
                $scope.loadFoodDiary( $scope.userFood.addeddate);
                $scope.doGetIntakeBruntByDate( $scope.userFood.addeddate);
                $scope.goGetDailyIntakeGraph($scope.userFood.addeddate);
                $scope.goGetSessionGraph($scope.storedSessionId);
                $scope.doGetHistoryReport("historyGraph");
                $scope.getBudget($scope.userFood.addeddate);
            });

        };

        //To Check maximum food value
        $scope.maxfoodvalue=false;
        $scope.maxFoodValueCheck = function(value){
            if(value<=999.99){
                $scope.maxfoodvalue=false;
            }
            else if(value >999.99){
                $scope.maxfoodvalue=true;
            }

        };

        //Update User Food
        $scope.doUpdateUserFood=function(){
            //Set values according to the api calls
            $scope.userFood.userfoodid= $scope.userFood.userfoodid;
            $scope.userFood.foodid= $scope.userFood.foodid;
            $scope.userFood.measureid=$scope.userFood.measure.measureid;
            $scope.userFood.servings=parseFloat($scope.userFood.servings);
            var foodInsertPromise=UserDashboardService.doUpdateUserFood($scope.userFood);
            foodInsertPromise.then(function(){
                var date = document.getElementById("main-start-date").value;
                $scope.loadFoodDiary(date);
                $scope.doGetIntakeBruntByDate(date);
                $scope.goGetDailyIntakeGraph(date);
                $scope.goGetSessionGraph($scope.storedSessionId);
                $scope.doGetHistoryReport("historyGraph");
                $scope.getBudget(date);
            });

        };

        //Delete User Food
        $scope.doDeleteUserFood= function (userFoodId) {
            $scope.loaded=true;
            var foodDeletePromise=UserDashboardService.doDeleteUserFood(userFoodId);
            foodDeletePromise.then(function(){
                var date = document.getElementById("main-start-date").value;
                $scope.loadFoodDiary(date);
                $scope.doGetIntakeBruntByDate(date);
                $scope.goGetDailyIntakeGraph(date);
                $scope.goGetSessionGraph($scope.storedSessionId);
                $scope.doGetHistoryReport("historyGraph");
                $scope.getBudget(date);
            });
        };

        //On load Food Diary
        $scope.loadFoodDiary=function(selectedDate){
            $scope.loaded=true;
            var userFoodDiaryDetailPromise=UserDashboardService.getFoodDiary(selectedDate);
            userFoodDiaryDetailPromise.then(function(result){
                $scope.userFoodDiaryDataAll=result;
                $scope.loadSessionDetails();
                $scope.loadSessionFood();
                $scope.loaded=false;
            });
        };

        //Load Details Based on session
        $scope.loadSessionDetails=function(){
            $scope.suggest={};
            $scope.suggest.session = $scope.userFood.sessionid;
            requestHandler.postRequest("user/getUserFoodSuggestions/",$scope.suggest).then(function(response){
                $scope.adminSuggestedFood={};
                $scope.adminSuggestedFood="";

                $scope.adminSuggestedFood = response.data.foodSuggestion;
                document.getElementById("marquee").innerHTML="<marquee class='feedbackslide' behavior='scroll' direction='left' id='marqueeid' onmouseover='mouseover(this);' onmouseout='mouseout(this);' scrollamount='3'><span ng-repeat='suggestedFood in adminSuggestedFood' class='slideFeedback'><a href='' ng-click='suggestedFoodByAdmin(suggestedFood.foodId)'>{{suggestedFood.foodName}}</a></span></marquee>";
                $compile( document.getElementById('marquee') )($scope);

            });
            switch(parseInt($scope.userFood.sessionid)){

                case 1:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.BreakFast;
                    break;
                case 2:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Brunch;
                    break;
                case 3:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Lunch;
                    break;
                case 4:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Evening;
                    break;
                case 5: $scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Dinner;
                    break;
                default :break;
            }
        };


        //Search Function for food
        $scope.inputChanged = function(searchStr) {

            if(searchStr.length >=1){
                $scope.loadingFoods=true;
                if($scope.foodSearchResult.length==0){

                    $scope.loadingFoods=true;
                }
                var userFoodDiaryDetailPromise=UserDashboardService.searchFood(searchStr,$scope.userFood.sessionid);
                return userFoodDiaryDetailPromise.then(function(result){
                    var foods = [];
                    $scope.foodSearchResult=result;
                    $scope.loadingFoods=false;
                    return $scope.foodSearchResult;
                });
            }
            else{
                $('.dropdown-menu').animate({
                    scrollTop: 0
                }, 0);
                return {};
            }

        };

        //TO get user demography details
        $scope.doGetDemograph=function(){
            var userDemographyPromise=UserDashboardService.doGetDemographyDetails();
            userDemographyPromise.then(function(result){
                $scope.demography = result;

                if(!$scope.userProfile){
                    var userDetailPromise=UserDashboardService.doGetUserDetails();
                    userDetailPromise.then(function(result){
                        $scope.userProfile=result;
                        $scope.userProfileImage=$scope.userProfile.imageurl+"?decache="+Math.random();
                        var dividevalue=2;
                        if($scope.userProfile.gender==1){
                            dividevalue=4;
                        }

                        $scope.idealWeight = ($scope.demography.height - 100 -(($scope.demography.height -150)/dividevalue));
                        $scope.idealWeight=$scope.idealWeight.toFixed(2);

                        if($scope.demography.weight < $scope.idealWeight){
                            $scope.upweight =1;
                            $scope.idealWeightlevel = $scope.demography.weight/$scope.idealWeight;
                            $scope.idealWeightlevel = ($scope.idealWeightlevel*100)/2;
                            $scope.balanceweight = $scope.idealWeight - $scope.demography.weight;
                            $scope.balanceweight = $scope.balanceweight.toFixed(2);
                        }
                        else if($scope.demography.weight > $scope.idealWeight){
                            $scope.upweight =0;
                            $scope.idealWeightlevel = $scope.idealWeight/$scope.demography.weight;
                            $scope.idealWeightlevel = 100-($scope.idealWeightlevel*100)/2;
                            $scope.balanceweight =  $scope.demography.weight - $scope.idealWeight ;
                            $scope.balanceweight = $scope.balanceweight.toFixed(2);
                        }else{
                            $scope.upweight =2;
                            $scope.idealWeightlevel = 1;
                            $scope.idealWeightlevel = ($scope.idealWeightlevel*100)/2;
                        }

                        $window.idealWeightlevel = $scope.idealWeightlevel.toFixed(2);
                        $scope.graph = {
                            status: 'goal'
                        };
                        setTimeout(viewWeightGraph(),10);
                    });
                }
                else{
                    var dividevalue=2;
                    if($scope.userProfile.gender==1){
                        dividevalue=4;
                    }
                    if($scope.userProfile.unitPreference==1){
                        $scope.heightCal = $scope.demography.height/100;
                        $scope.heightCal = $scope.heightCal * $scope.heightCal;

                        $scope.idealWeight = 22 * $scope.heightCal;
                        $scope.idealWeight=$scope.idealWeight.toFixed(1);

                        if($scope.demography.weight < $scope.idealWeight){
                            $scope.upweight =1;
                            $scope.idealWeightlevel = $scope.demography.weight/$scope.idealWeight;
                            $scope.idealWeightlevel = ($scope.idealWeightlevel*100)/2;
                            $scope.balanceweight = $scope.idealWeight - $scope.demography.weight;
                            $scope.balanceweight = $scope.balanceweight.toFixed(1);
                        }
                        else if($scope.demography.weight > $scope.idealWeight){
                            $scope.upweight =0;
                            $scope.idealWeightlevel = $scope.idealWeight/$scope.demography.weight;
                            $scope.idealWeightlevel = 100-($scope.idealWeightlevel*100)/2;
                            $scope.balanceweight =  $scope.demography.weight - $scope.idealWeight ;
                            $scope.balanceweight = $scope.balanceweight.toFixed(1);
                        }else{
                            $scope.upweight =2;
                            $scope.idealWeightlevel = 1;
                            $scope.idealWeightlevel = ($scope.idealWeightlevel*100)/2;
                        }
                    }

                    else if($scope.userProfile.unitPreference==2){
                        $scope.heightFeet = $scope.demography.height.toString().split(".")[0];
                        $scope.heightInches = $scope.demography.height.toString().split(".")[1];

                        $scope.heightTotal = ((parseInt($scope.heightFeet) * 12 ) + parseInt($scope.heightInches)) ;
                        $scope.heightTotal = $scope.heightTotal * 2.54 ;
                        $scope.heightCal = $scope.heightTotal/100;
                        $scope.heightCal = $scope.heightCal * $scope.heightCal;
                        $scope.idealWeight = 22 * $scope.heightCal;
                        $scope.idealWeight =$scope.idealWeight / 0.4536;
                        $scope.idealWeight=$scope.idealWeight.toFixed(1);
                        $scope.idealWeight=parseFloat($scope.idealWeight);

                        $scope.weightCal = $scope.demography.weight * 0.4536 ;
                        $scope.weightCal = $scope.demography.weight.toFixed(2);
                        $scope.weightCal=parseFloat($scope.weightCal);
                        if($scope.weightCal < $scope.idealWeight){
                            $scope.upweight =1;
                            $scope.idealWeightlevel = $scope.weightCal/$scope.idealWeight;
                            $scope.idealWeightlevel = ($scope.idealWeightlevel*100)/2;
                            $scope.balanceweight = $scope.idealWeight - $scope.weightCal;
                            $scope.balanceweight = $scope.balanceweight.toFixed(1);
                        }
                        else if($scope.weightCal > $scope.idealWeight){
                            $scope.upweight =0;
                            $scope.idealWeightlevel = $scope.idealWeight/$scope.weightCal;
                            $scope.idealWeightlevel = 100-($scope.idealWeightlevel*100)/2;
                            $scope.balanceweight =  $scope.weightCal - $scope.idealWeight ;
                            $scope.balanceweight = $scope.balanceweight.toFixed(1);
                        }else{
                            $scope.upweight =2;
                            $scope.idealWeightlevel = 1;
                            $scope.idealWeightlevel = ($scope.idealWeightlevel*100)/2;
                        }

                    }



                    $window.idealWeightlevel = $scope.idealWeightlevel.toFixed(2);
                    $scope.graph = {
                        status: 'goal'
                    };
                    setTimeout(viewWeightGraph(),10);
                }
            });
        };

        $scope.doGetDemograph();

        //To get frequently asked foods
        var frequentFoodPromise=UserDashboardService.doGetFrequentlyAdded();
        frequentFoodPromise.then(function(result){
            $scope.frequentFoodList =result;
        });

        // Insert suggest food
        $scope.isAddFood =false;
        $scope.doAddSuggestFood=function(){

            requestHandler.postRequest("user/searchFoodnamebyUser/",{"foodname":$scope.foodSuggest.foodname}).then(function(response){
                if(response.data.Response_status==0){
                    var insertSuggestedFoodPromise=UserDashboardService.doAddSuggestedFood($scope.foodSuggest);

                    insertSuggestedFoodPromise.then(function(result){
                        $scope.isAddFood =true;
                        //  successMessage(Flash,"Thanks&nbsp;for&nbsp;the&nbsp;suggestion.You&nbsp;will&nbsp;<br/>receive&nbsp;a&nbsp;mail&nbsp;once&nbsp;food&nbsp;is approved!!");
                        $scope.resetdata();
                    },function(){
                        errorMessage(Flash, "Please try again later!");
                    });
                }
                else if(response.data.Response_status==1){
                    errorMessage(Flash,"Food&nbsp;already&nbsp;exists");
                    $scope.resetdata();
                }
            });

        };

        $scope.msg=function(){
            $scope.isAddFood =false;
            $scope.isAddExercise=false;
        };
        // Insert suggest exercise

        $scope.isAddExercise=false;
        $scope.doAddSuggestExercise=function(){
            var insertSuggestedExercisePromise=UserDashboardService.doAddSuggestedExercise($scope.exerciseSuggest);

            insertSuggestedExercisePromise.then(function(result){
                $scope.isAddExercise=true;
                //successMessage(Flash,"Thanks&nbsp;for&nbsp;the&nbsp;suggestion.You&nbsp;will&nbsp;<br/>receive&nbsp;a&nbsp;mail&nbsp;once&nbsp;food&nbsp;is approved!!");
                $scope.resetexercisedata();
            },function(){
                errorMessage(Flash, "Please try again later!");
            })

        };

        //Search Function for exercise
        $scope.inputChangedExercise = function(searchStr) {
            if(searchStr.length){
                $scope.loadingExercise=true;
                if($scope.exerciseSearchResult.length==0){
                    $scope.loadingExercise=true;
                }
                var userExerciseDiaryDetailPromise=UserDashboardService.searchExercise(searchStr,$scope.selectedCategory,$scope.selectedType);
                return userExerciseDiaryDetailPromise.then(function(result){
                    $scope.exerciseSearchResult=result;
                    $scope.loadingExercise=false;
                    return $scope.exerciseSearchResult;
                });
            }
        };

        //On Select frequent exercise
        $scope.frequentExercise=function(exerciseid,isCustom,exercisename){
            $scope.isNew=true;
            $scope.title= "Add Exercise";
            $scope.loaded=true;
            if(isCustom==0){
                var date = document.getElementById("main-start-date").value;
                var getExerciseDetailPromise=UserDashboardService.doGetSelectedExerciseDetails(exerciseid,date);
                getExerciseDetailPromise.then(function(result){
                    $scope.userSelectedExerciseDetails=result;
                    $scope.loaded=false;
                    $scope.doUserAddExercise();
                });
             }
            else if(isCustom==1){
                $scope.title= "Add Custom Exercise";
                $scope.customExercise.exercisename=exercisename;
                $scope.loaded=false;
                $scope.doUserAddCustomExercise();
            }

        };

        //On Select frequent exercise
        $scope.suggestedExerciseByAdmin=function(exerciseid){
            $scope.isNew=true;
            $scope.title= "Add Exercise";
            $scope.loaded=true;
            var date = document.getElementById("main-start-date").value;
            var getExerciseDetailPromise=UserDashboardService.doGetSelectedExerciseDetails(exerciseid,date);
            getExerciseDetailPromise.then(function(result){
                $scope.userSelectedExerciseDetails=result;
                $scope.loaded=false;
                $scope.doUserAddExercise();
            });
        };

        //On Select search exercise function
        $scope.exerciseSelected=function(){
            $scope.isNew=true;
            $scope.title= "Add Exercise";
            var date = document.getElementById("main-start-date").value;
            var getExerciseDetailPromise=UserDashboardService.doGetSelectedExerciseDetails($scope.selectedExercise.exerciseid,date);
            getExerciseDetailPromise.then(function(result){
                $scope.userSelectedExerciseDetails=result;
                $scope.doUserAddExercise ();
            });
        };

        $scope.doFilterPopup=function(){
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#modal-filter").fadeIn(600);
                $(".user_register").show();
                $scope.shouldBeOpen = true;
            });

            $(".modal_close").click(function(){
                $(".user_register").hide();
                $("#modal-filter").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

            $("#lean_overlay").click(function(){
                $(".user_register").hide();
                $("#modal-filter").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;

            });
        };

        //Filter exercise category and type
        $scope.selectedCategory=[];
        $scope.selectedType=[];
        $scope.doGetCategoryandTypeExercise=function(){
            requestHandler.getRequest("user/exercisetypeandcategorylist/","").then(function(response){
                $scope.categorylist=response.data.exercisecategory;
                //Add Checked Object for Selection
                $.each($scope.categorylist, function(index,value){
                    value.isChecked=false;
                });

                $scope.typelist=response.data.exercisetype;

                //Add Checked Object for Selection
                $.each($scope.typelist, function(index,value){
                    value.isChecked=false;
                });
                //Check All Category
                $scope.categoryAllChecked=function(){
                    $.each($scope.categorylist, function(index,value){
                        value.isChecked=true;
                    });
                };

                // UnCheck All Category
                $scope.categoryAllUnChecked=function(){
                    $.each($scope.categorylist, function(index,value){
                        value.isChecked=false;
                    });
                };

                //Check All Type
                $scope.typeAllChecked=function(){
                    $.each($scope.typelist, function(index,value){
                        value.isChecked=true;

                    });
                };
                //UnCheck All Category
                $scope.typeAllUnChecked=function(){
                    $.each($scope.typelist, function(index,value){
                        value.isChecked=false;

                    });
                };
                //Apply filter for searching exercise
                $scope.doApplyFilter=function(){
                    $scope.displayFilteredCategory=[];
                    $scope.displayFilteredType=[];
                    $scope.selectedCategory=[];
                    $scope.selectedType=[];
                    $.each($scope.categorylist, function(index,value){
                        if (value.isChecked==true) {
                            $scope.selectedCategory.push(value.categoryid);
                            $scope.displayFilteredCategory.push(value.categoryname);
                        }
                    });
                    $.each($scope.typelist, function(index,value){
                        if (value.isChecked==true) {
                            $scope.selectedType.push(value.typeid);
                            $scope.displayFilteredType.push(value.typename);
                        }
                    });
                };
                //To Clear filter
                $scope.doClearFilter=function(){
                    $.each($scope.categorylist, function(index,value){
                        value.isChecked=false;
                        $scope.selectedCategory=[];
                    });
                    $.each($scope.typelist, function(index,value){
                        value.isChecked=false;
                        $scope.selectedType=[];
                    });
                };

            },function(){
                errorMessage(Flash, "Please try again later!");
            });
        };


        //On load Exercise Diary
        $scope.loadExerciseDiary=function(selectedDate){
            $scope.loaded=true;
            var userExerciseDiaryDetailPromise=UserDashboardService.getExerciseDiary(selectedDate);
            userExerciseDiaryDetailPromise.then(function(result){
                $scope.userExerciseDiaryDataAll=result;
                $scope.loaded=false;
                //For Normal Exercise Workout Conversion
                $.each($scope.userExerciseDiaryDataAll.ExerciseData,function(index,value){
                    value.userExerciseWorkoutDisplayValue=Math.floor(value.workoutvalue/3600) +" Hrs "+Math.floor((value.workoutvalue%3600)/60) +" Mins "+Math.floor((value.workoutvalue%3600)%60)+" Secs";
                });
                //For Custom Exercise Workout Conversion
                $.each($scope.userExerciseDiaryDataAll.customExercise,function(index,value){
                    value.customExerciseWorkoutDisplayValue=Math.floor(value.workoutvalue/3600) +" Hrs "+Math.floor((value.workoutvalue%3600)/60) +" Mins "+Math.floor((value.workoutvalue%3600)%60)+" Secs";
                });
            });

            requestHandler.getRequest("user/getUserExerciseSuggestions/","").then(function(response){
                $scope.adminSuggestedExercise = response.data.exerciseSuggestion;
            });
        };

        var listExercisePromise=UserDashboardService.doGetUserExerciseList();
        listExercisePromise.then(function(result){
            $scope.exerciselist =result;
        });

        //Insert User Exercise
        $scope.doInsertUserExercise=function(){
            //Set values according to the api calls
            $scope.userExercise.exerciseid=$scope.userSelectedExerciseDetails.exerciseid;
            $scope.userExercise.date=document.getElementById("main-start-date").value;
            $scope.userExercise.levelid= $scope.userExercise.selectedLevel.levelid;
            $scope.userExercise.unitid=$scope.userSelectedExerciseDetails.levels.unitid;

            var exerciseInsertPromise=UserDashboardService.doInsertUserExercise($scope.userExercise);
            exerciseInsertPromise.then(function(){
                $scope.loadExerciseDiary($scope.userExercise.date);
                $scope.doGetIntakeBruntByDate($scope.userExercise.date);
                $scope.doGetHistoryReport("historyGraph");
                $scope.getBudget($scope.userExercise.date);
            });

        };

        //Delete User Exercise
        $scope.doDeleteUserExercise= function (userExerciseId) {
            $scope.loaded=true;
            var exerciseDeletePromise=UserDashboardService.doDeleteUserExercise(userExerciseId);
            exerciseDeletePromise.then(function(){
                var date = document.getElementById("main-start-date").value;
                $scope.loadExerciseDiary(date);
                $scope.doGetIntakeBruntByDate(date);
                $scope.doGetHistoryReport("historyGraph");
                $scope.getBudget(date);
            });
        };
        var originallevel="";
        var originaltiming="";
        var originalreps="";
        //On Select edit exercise
        $scope.doEditUserExercise=function(exerciseid,userexercisemapid,isCustom){

            $scope.isNew=false;
            $scope.title= "Edit Exercise";
            $scope.loaded=true;

            var date = document.getElementById("main-start-date").value;
            var getExerciseDetailForEditPromise=UserDashboardService.doGetSelectedExerciseDetails(exerciseid,date);
            getExerciseDetailForEditPromise.then(function(result){

                $scope.userSelectedExerciseDetails=result;
                var getUserExerciseDetailsPromise=UserDashboardService.doGetUserExerciseDetails(userexercisemapid,isCustom);

                getUserExerciseDetailsPromise.then(function(result){

                    $scope.userExercise.userexercisemapid=userexercisemapid;
                    $scope.userExercise.exerciseid=exerciseid;
                    $scope.userExercise.unitid=$scope.userSelectedExerciseDetails.levels.unitid;
                    $.each($scope.userSelectedExerciseDetails.levels.levels, function(index,value) {
                        if(value.levelid == result.levelid){
                            $scope.userExercise.selectedLevel= value;
                            originallevel = angular.copy(value);
                        }
                    });
                    $scope.userExercise.workoutvalue=(result.workoutvalue);
                    $scope.workoutvalueMinutes=Math.floor((result.workoutvalue%3600)/60).toString();
                    $scope.workoutvalueSeconds=Math.floor((result.workoutvalue%3600)%60).toString();
                    $scope.workoutvalueHours=Math.floor(result.workoutvalue/3600).toString();
                    originaltiming = parseInt(result.workoutvalue);
                    $scope.userExercise.reps=parseInt(result.reps);
                    originalreps = parseInt(result.reps);
                    $scope.current=$scope.caloriesSpent=result.calories;
                    $scope.current=$scope.current.toFixed(2);
                    if(($scope.current.length-3)>2) $scope.max=100+((String($scope.current|0).slice(0, -2))*100);
                    else $scope.max=100;
                    $scope.loaded=false;
                    $scope.doUserAddExercise();
                });

            });
        };

        $scope.isCleanExercise=function(){
            return angular.equals(originallevel, $scope.userExercise.selectedLevel)&& angular.equals(originaltiming, $scope.userExercise.workoutvalue);
        };


        //Update User Exercise
        $scope.doUpdateUserExercise=function(){
            //Set values according to the api calls
            if($scope.userExercise.date!=null){
                delete $scope.userExercise.date;
            }
            $scope.userExercise.userexercisemapid= $scope.userExercise.userexercisemapid;
            $scope.userExercise.exerciseid= $scope.userExercise.exerciseid;
            $scope.userExercise.levelid=$scope.userExercise.selectedLevel.levelid;
            $scope.userExercise.workoutvalue=parseInt($scope.userExercise.workoutvalue);
            var exerciseInsertPromise=UserDashboardService.doUpdateUserExercise($scope.userExercise);
            exerciseInsertPromise.then(function(){
                var date = document.getElementById("main-start-date").value;
                $scope.loadExerciseDiary(date);
                $scope.doGetIntakeBruntByDate(date);
                $scope.doGetHistoryReport("historyGraph");
                $scope.getBudget(date);
            });

        };

        //To get frequently asked exercise
        var frequentExercisePromise=UserDashboardService.doGetFrequentlyUsedExercise();
        frequentExercisePromise.then(function(result){
            $scope.frequentExerciseList =result;
        });


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

        //To insert custom exercise
        $scope.doInsertUserCustomExercise=function(){
            $scope.customExercise.reps=parseInt($scope.customExercise.reps);
            $scope.customExercise.date=document.getElementById("main-start-date").value;
            $scope.customExercise.workoutvalue=parseInt($scope.selectedHours*3600)+ parseInt($scope.selectedMinutes*60)+ parseInt($scope.selectedSeconds);
            var customExerciseInsertPromise=UserDashboardService.doInsertUserCustomExercise($scope.customExercise);
            customExerciseInsertPromise.then(function(){
                $scope.loadExerciseDiary($scope.customExercise.date);
                $scope.doGetIntakeBruntByDate($scope.customExercise.date);
                $scope.doGetHistoryReport("historyGraph");
                $scope.getBudget($scope.customExercise.date);
            });

        };


        //On Select user custom exercise

        $scope.doEditUserCustomExercise=function(id,isCustom){
            $scope.isNew=false;
            $scope.title= "Edit Custom Exercise";
            $scope.loaded=true;

            var getUserCustomExerciseDetailsPromise=UserDashboardService.doGetUserCustomExerciseDetails(id,isCustom);
            getUserCustomExerciseDetailsPromise.then(function(result){
                $scope.customExercise.id=id;
                $scope.customExercise.exercisename=result.exercisename;
                $scope.customExercise.calories=result.calories;
                $scope.customExercise.workoutvalue=(result.workoutvalue);
                $scope.selectedMinutes=Math.floor((result.workoutvalue%3600)/60).toString();
                $scope.selectedSeconds=Math.floor((result.workoutvalue%3600)%60).toString();
                $scope.selectedHours=Math.floor(result.workoutvalue/3600).toString();
                originaltiming = result.workoutvalue;
                $scope.customExercise.reps=parseInt(result.reps);
                originalreps = parseInt(result.reps);
                $scope.loaded=false;
                $scope.doUserAddCustomExercise();
            });

        };
        //Update User Exercise
        $scope.doUpdateUserCustomExercise=function(){
            //Set values according to the api calls
            if($scope.customExercise.date!=null){
                delete $scope.customExercise.date;
            }
            $scope.customExercise.workoutvalue=parseInt($scope.selectedHours*3600)+ parseInt($scope.selectedMinutes*60)+ parseInt($scope.selectedSeconds);
            $scope.customExercise.date=document.getElementById("main-start-date").value;
            $scope.customExercise.reps=parseInt($scope.customExercise.reps);
            $scope.customExercise.calories = $scope.customExercise.calories.toString();
            $scope.customExercise.workoutvalue= $scope.customExercise.workoutvalue.toString();
            var customExerciseInsertPromise=UserDashboardService.doUpdateUserCustomExercise($scope.customExercise);
            customExerciseInsertPromise.then(function(){
                var date = document.getElementById("main-start-date").value;
                $scope.loadExerciseDiary(date);
                $scope.doGetIntakeBruntByDate(date);
                $scope.doGetHistoryReport("historyGraph");
                $scope.getBudget(date);

            });

        };

        //To delete user custom exercise
        $scope.doDeleteUserCustomExercise= function (userExerciseId,isCustom) {
            $scope.loaded=true;
            var customExerciseDeletePromise=UserDashboardService.doDeleteUserCustomExercise(userExerciseId,isCustom);
            customExerciseDeletePromise.then(function(){
                var date = document.getElementById("main-start-date").value;
                $scope.loadExerciseDiary(date);
                $scope.doGetIntakeBruntByDate(date);
                $scope.doGetHistoryReport("historyGraph");
                $scope.getBudget(date);
            });
        };

        //Maximum calorie value check
        $scope.maxcalories=false;
        $scope.maxCalorieValueCheck = function(){
            if(parseInt($scope.customExercise.calories)<=5000){
                $scope.maxcalories=false;
            }
            else if(parseInt($scope.customExercise.calories) >5000){
                $scope.maxcalories=true;
            }

        };

        //Reps Value max check
        $scope.maxreps=false;
        $scope.maxRepsValueCheck = function(){
            if(parseInt($scope.customExercise.reps)<=100){
                $scope.maxreps=false;
            }
            else if(parseInt($scope.customExercise.reps) >100){
                $scope.maxreps=true;
            }

        };


        //Clear suggest food model values
        $scope.resetdata=function(){
            $scope.foodSuggest={};
            $scope.foodSuggestForm.$setPristine();
            $scope.userFood.measure="";
            $scope.userFood.servings=[];
            $scope.FoodAddForm.$setPristine();
            $scope.current=$scope.caloriesIntake=0;
            $scope.max = 100;
            $scope.userSelectedFoodDetails={};
            //$scope.isAddFood=false;

        };

        //Clear suggest exercise model values
        $scope.resetexercisedata=function(){
            $scope.exerciseSuggest={};
            $scope.exerciseSuggestForm.$setPristine();
            $scope.userExercise.selectedLevel="";
            $scope.userExercise.repsavailable="";
            $scope.userExercise.workoutvalue="";
            $scope.workoutvalueMinutes=0;
            $scope.workoutvalueSeconds=0;
            $scope.workoutvalueHours=0;
            $scope.ExerciseAddForm.$setPristine();
            $scope.title = "Add Custom Exercise";
            $scope.isNew = true;
            $scope.customExercise.reps="";
            $scope.customExercise.workoutvalue="";
            $scope.selectedHours=0;
            $scope.selectedMinutes=0;
            $scope.selectedSeconds=0;
            $scope.customExercise.exercisename="";
            $scope.customExercise.calories="";
            $scope.customExerciseAddForm.$setPristine();
            $scope.current=$scope.caloriesSpent=0;
            $scope.max = 100;
            $scope.userSelectedExerciseDetails={};
        };



        //Weight and Set Goal
        $scope.goal = {
            status: 'set-goal'
        };

        $scope.graph = {
            status: 'goal'
        };

        $scope.viewGoal=function(){
            $scope.doGetWeightGoal();
            $scope.graph = {
                status: 'goal'
            };
            $scope.doGetDemograph();
            setTimeout(viewWeightGraph(), 10);
        };

        $scope.cancelUpdate=function(){
            $scope.goal = {
                status: 'view-goal'
            };
        };



        $scope.doGetWeightGoal=function(){
            $scope.weightGraph=true;
            requestHandler.getRequest("getUserId/","").then(function(response){
                $scope.userProfile=response.data.User_Profile;
                $scope.demographydetail=response.data.demography;
                $scope.preferMetric = $scope.userProfile.unitPreference;
                $scope.plantype=$scope.demographydetail.userPlanType;
            });

            requestHandler.getRequest("user/getDemography/","").then(function(response) {
                $scope.demographydata = response.data.Demography_Data;
                $scope.weight= $scope.demographydata.targetweight;
                $scope.currentwt = $scope.demographydata.weight;
                $window.currentweight = $scope.demographydata.weight;
            });

            requestHandler.postRequest("checkGoalStatus/",{"date":selectedDate}).then(function(response){

                $scope.goalPossibilitycheck = response.data.Response_status;
            });


            requestHandler.getRequest("user/getWeightGoal/","").then(function(response){

                if(response.data.Response_status==0){
                    $scope.updateGoal=0;
                    $window.singlePicker = true;
                    $window.minimumDate = new Date();
                    $scope.goal = {
                        status: 'set-goal'
                    };
                }
                else if(response.data.Response_status==1){
                    $scope.goalDetails=response.data.Weight_Goal;

                    if($scope.goalDetails.goalid==null){
                        $scope.updateGoal=0;
                        $scope.targetText='Period';
                        $window.singlePicker = true;
                        $window.minimumDate = new Date();
                    }
                    else{
                        $scope.updateGoal=1;



                        var dateCompare = $scope.goalDetails.startdate.slice(6,10)+'-'+$scope.goalDetails.startdate.slice(3,5)+'-'+$scope.goalDetails.startdate.slice(0,2);
                        var date1 = selectedDate.slice(6,10)+'-'+selectedDate.slice(3,5)+'-'+selectedDate.slice(0,2);
                        var date2 = $scope.goalDetails.enddate.slice(6,10)+'-'+$scope.goalDetails.enddate.slice(3,5)+'-'+$scope.goalDetails.enddate.slice(0,2);

                        var date1_ms;

                        if (new Date(dateCompare).getTime() > new Date(date1).getTime()) {
                            date1_ms = new Date(dateCompare).getTime();
                            $scope.viewGraphButton=false;
                        }
                        else{
                            date1_ms = new Date(date1).getTime();
                            $scope.viewGraphButton=true;
                        }

                        // The number of milliseconds in one day
                        var ONE_DAY = 1000 * 60 * 60 * 24;

                        // Convert both dates to milliseconds
                        var date2_ms = new Date(date2).getTime();


                        // Calculate the difference in milliseconds
                        var difference_ms = date2_ms - date1_ms;

              // Convert back to days
                        $scope.remainingDates = (difference_ms/ONE_DAY);
                        console.log($scope.remainingDates);
                        if($scope.remainingDates<0){
                            $scope.remainingDates=0;
                            $scope.goalExpired=1;
                            var dateinitial = new Date(dateCompare).getTime();
                            var diff_ms = date2_ms - dateinitial;
                            $scope.targetDays = Math.round(diff_ms/ONE_DAY);
                           var weightLogPromise=UserDashboardService.doGetAchievedWeight($scope.goalDetails.enddate);
                            weightLogPromise.then(function(result){
                                $scope.achievedWeight = result;
                                var targetWeightLossOrGain=0;
                                var achievedWeightLossOrGain=0;
                                var compare=0;
                                if($scope.goalDetails.targetweight>$scope.goalDetails.initialweight){
                                    targetWeightLossOrGain = $scope.goalDetails.targetweight-$scope.goalDetails.initialweight;
                                    achievedWeightLossOrGain = $scope.achievedWeight-$scope.goalDetails.initialweight;
                                    if(achievedWeightLossOrGain<=0){
                                        $scope.achieveStatus=0;
                                    }
                                    else{
                                        compare = achievedWeightLossOrGain/targetWeightLossOrGain;
                                        if(compare==1){
                                            $scope.achieveStatus=2;
                                        }else if(0.6>=compare<1&&compare<1.4){
                                            $scope.achieveStatus=1;
                                        }else $scope.achieveStatus=0;
                                    }
                                }
                                else{
                                    targetWeightLossOrGain = $scope.goalDetails.initialweight - $scope.goalDetails.targetweight;
                                    achievedWeightLossOrGain = $scope.goalDetails.initialweight - $scope.achievedWeight;
                                    if(achievedWeightLossOrGain<=0){
                                        $scope.achieveStatus=0;
                                    }
                                    else{
                                        compare = achievedWeightLossOrGain/targetWeightLossOrGain;
                                        if(compare==1){
                                            $scope.achieveStatus=2;
                                        }else if(0.6>=compare<1&&compare<1.4){
                                            $scope.achieveStatus=1;
                                        }else $scope.achieveStatus=0;
                                    }
                                }

                            });
                        }
                        else{
                            $scope.goalExpired=0;
                        }

                        $window.targetweight = $scope.goalDetails.targetweight;
                        $window.unit=$scope.userProfile.unitPreference==1?"Kgs":"Lbs";
                        $scope.goal = {
                            status: 'view-goal'
                        };

                    }
                }

            });



        };

        $scope.setGoal=function(){
            $scope.setGoalDetails={};
            if($scope.setGoalDetails.goalchoice==5){
                if($scopeuploadDocumentMedication.setGoalDetails.enddate==''){
                    $scope.setGoalDetails.enddate = selectedDate;
                }
                else{
                    $scope.setGoalDetails.enddate=document.getElementById("start").value;
                }
            }
            $scope.setGoalDetails.enddate=$scope.enddate;
            $scope.setGoalDetails.currentweight=$scope.demographydata.weight;
            $scope.setGoalDetails.goalchoice=$scope.goalchoice.toString();


            if($scope.demography.weight!=""){
                $(function(){
                    $("#lean_overlay").fadeTo(1000);
                    $("#goal-confirmation").fadeIn(600);
                    $(".common_model").show();

                });
                $(".modal_close").click(function(){
                    $(".common_model").hide();
                    $("#goal-confirmation").hide();
                    $("#lean_overlay").hide();
                });

                $("#lean_overlay").click(function(){
                    $(".common_model").hide();
                    $("#goal-confirmation").hide();
                    $("#lean_overlay").hide();
                });
            }
        };

        $scope.setGoalConfirmation=function(){
            requestHandler.postRequest("user/insertWeightGoal/",$scope.setGoalDetails).then(function(response){
                $scope.doGetWeightGoal();
                $scope.doInsertOrUpdateWeightLog(selectedDate,parseFloat($scope.setGoalDetails.initialweight));
            },function(){
                errorMessage(Flash, "Please try again later!");
            });
        };

        $scope.isshowGraph = false;
        $scope.showGraph = function () {
            //If DIV is visible it will be hidden and vice versa.        
            $scope.isshowGraph = $scope.isshowGraph ? false : true;
        }

        /*$('#dailyUpdateBudgetGraph').highcharts({
         chart: {
         type: 'bar'
         },
         title: {
         text: null
         },
         xAxis: {
         categories: ['Budget', 'Gain', 'Brunt', 'Net']
         },
         yAxis: {
         min: 0,
         title: {
         text: null
         }
         },
         credits:{enabled:false},
         exporting:{enabled:false},
         legend:{enabled:false},
         plotOptions: {
         series: {
         dataLabels: {
         enabled: true,
         style:{fontSize:10},
         formatter:function() {
         return this.point.y;
         }
         }
         }
         },
         series: [{
         name: 'Units',
         data: [
         {y:2195,color:"orange"},
         {y:1542,color:"limegreen"},
         {y:643,color:"red"},
         {y:-862,color:"#ffcc00"}],
         showInLegend: false
         }]
         });*/
    // date compare for update weight
        $scope.doGetPreviousDate=function(){
            $scope.shouldNotHide=false;
            var yesterdayDate=document.getElementById("main-start-date").value; //main date
            var firstValue = selectedDate.split('/'); //current date
            var secondValue =yesterdayDate.split('/'); // main date on change value
            var firstDate=new Date();
            firstDate.setFullYear(firstValue[2],(firstValue[1] - 1 ),firstValue[0]);
            var secondDate=new Date();
            secondDate.setFullYear(secondValue[2],(secondValue[1] - 1 ),secondValue[0]);
            //Comparing previous date with today date
            if (+firstDate != +secondDate)
            {
                $scope.shouldNotHide=true;
            }
        };

        $scope.doGetWeightLog=function(date,id){
            $scope.showEmpty=false;
            var weightLogPromise=UserDashboardService.doGetWeightLogDetails(date);
            weightLogPromise.then(function(result){
                var weightlogdetails=result.Weight_logs;

                if(!weightlogdetails.weight){
                    $scope.originalWeight="";
                    if(id==1)
                        $("#weightLog").val('');
                     else
                        $("#weightLog1").val('');
                     }
                else{
                    $scope.weightlog=$scope.originalWeight=weightlogdetails.weight;
                    $scope.fat=$scope.originalFat=weightlogdetails.fat;
                    if(weightlogdetails.fat == null){
                        $scope.fatEmpty= '-';
                        $scope.showEmpty=true;
                    }

                    if(id==1){
                        $("#weightLog").val(weightlogdetails.weight);
                        $("#fatLog").val(weightlogdetails.fat);
                    }
                    else{
                        $("#weightLog1").val(weightlogdetails.weight);
                    }
                }
            });
        };
        $scope.maxfat=false;
        $scope.maxFatValueCheck = function(){
            if(parseFloat($scope.fat)<=100.0){
                $scope.maxfat=false;
            }
            else if(parseFloat($scope.fat) >100.0){
                $scope.maxfat=true;
            }

        };


        $scope.weightLogEntry=function(id){
            $scope.weightUpdateText="Updating...";
            $scope.showEmpty=false;
            $scope.spinner=true;
            if(id==1){
                $scope.doInsertOrUpdateWeightLog($scope.UserDate,parseFloat($("#weightLog").val()));
            }

            else{
                 $scope.doInsertOrUpdateWeightLog($("#weight-log-date1").val(),parseFloat($("#weightLog1").val()));
            }

        };


        $scope.checkGoalOnLoad = function(date){
            requestHandler.postRequest("checkGoalStatus/",{"date":date}).then(function(response){

                $scope.budgetCheck = response.data.goalPossiblity;
            });
        };

        $scope.checkGoalStatus=function(date){
            requestHandler.postRequest("checkGoalStatus/",{"date":date}).then(function(response){

                $scope.budgetCheck = response.data.goalPossiblity;

                if($scope.budgetCheck == 0){
                    $(function(){
                        $("#lean_overlay").fadeTo(1000);
                        $("#budgetAlert").fadeIn(600);
                        $(".common_model").show();
                        $scope.shouldBeOpen = true;
                    });

                    $(".modal_close").click(function(){
                        $(".common_model").hide();
                        $("#budgetAlert").hide();
                        $("#lean_overlay").hide();
                        $scope.shouldBeOpen = false;
                    });

                    $("#lean_overlay").click(function(){
                        $(".common_model").hide();
                        $("#budgetAlert").hide();
                        $("#lean_overlay").hide();
                        $scope.shouldBeOpen = false;
                    });
                }
            });
        };

        $scope.budgetChangePlan = function(){
            $timeout(function(){
                $("#updateWeightGoal").click();
                $scope.updateGoalDetails($scope.weight);
            });

            /* $("#updateWeightGoal").click(function(){

             });*/
        };
        //TO Insert weight Goal Log
        $scope.doInsertOrUpdateWeightLog=function(date,weight,fat){
            requestHandler.postRequest("user/weightlogInsertorUpdate/",{"date":selectedDate,"weight":weight,"fat":$scope.fat}).then(function(response){
                if(date==selectedDate && $scope.weightGraph){
                    $window.currentweight = weight;
                    $window.fat=fat;
                    //refreshGraph();
                    /*$scope.updateAverageGainSpent(date);*/
                }
                $scope.spinner=false;
                $scope.weightUpdateText="Update";
                $scope.doGetWeightLog(date);
                $scope.doGetDemograph();
                $scope.getBudget(date);
                $scope.doGetWeightGoal();
                $scope.checkGoalStatus(date);
            }, function () {
                errorMessage(Flash, "Please try again later!")
            });
        };

        $scope.isCleanWeight=function(){
            return angular.equals(parseFloat($("#weightLog").val()), parseFloat($scope.originalWeight));
        };

        $scope.isCleanWeight1=function(){
            return angular.equals(parseFloat($("#weightLog1").val()), parseFloat($scope.originalWeight));
        };


        //For maximum Weight validation lbs
        $scope.maxweightlbs=false;
        $scope.maxCheck = function(){
            if(parseFloat($scope.weightlog) <=2204.4){
                $scope.maxweightlbs=false;
            }
            else if(parseFloat($scope.weightlog)>2204.4){
                $scope.maxweightlbs=true;
            }

        };

        //For maximum Weight validation kgs
        $scope.maxweight=false;
        $scope.maxWeightCheck = function(){
            if(parseFloat($scope.weightlog)<=999.9){
                $scope.maxweight=false;
            }
            else if($scope.weightlog>999.9){
                $scope.maxweight=true;
            }

        };

        $scope.doGetWeightLogGraph=function(){
            var goalEndDate=$scope.goalDetails.enddate; //actual goal end date
            var firstValue = selectedDate.split('/'); //current date
            var secondValue =goalEndDate.split('/'); // goal end date
            var firstDate=new Date();
            firstDate.setFullYear(firstValue[2],(firstValue[1] - 1 ),firstValue[0]);
            var secondDate=new Date();
            secondDate.setFullYear(secondValue[2],(secondValue[1] - 1 ),secondValue[0]);
           //Comparing goal end date with today date
            if (firstDate < secondDate)
            {
                goalEndDate=selectedDate;
            }

            $scope.graph = {
                status: 'goal-graph'
            };

            if($scope.userProfile.unitPreference==1){
                $scope.unit="Kgs";
            }
            else if($scope.userProfile.unitPreference==2){
                $scope.unit="Lbs";
            }
            var monthNames= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var titles={};
            var budgetdate=[];
            var weightLogs = [];
            requestHandler.postRequest("user/getWeightLogGraph/",{"startdate":$scope.goalDetails.startdate.toString(),"enddate":goalEndDate.toString()}).then(function(response){
                $scope.weightlogGraph=response.data.Weight_logs;
                   $.each($scope.weightlogGraph, function(index,value) {
                        var weightLog = [];
                        var date = value.date.split("/");
                        weightLog.push(monthNames[(date[1]-1)]+' '+date[0]);
                        weightLog.push(value.weight);
                        budgetdate.push(monthNames[(date[1]-1)]+' '+date[0]);
                        weightLogs.push(weightLog);
                  });
                titles.title="Goal Graph";
                titles.name="Weight";
                titles.suffix=" "+$scope.unit;
                titles.yaxis="Weight (" + $scope.unit + ")";
                titles.xaxis="Date Range";
                var range=1;
                var filterWeightLogs=[];
                var filterBudgetDate=[];
                if(weightLogs.length>24){
                    range=Math.round(weightLogs.length/24);
                }
                
                for (i = 0; i < weightLogs.length; i=i+range) {
                    filterWeightLogs.push(weightLogs[i]);
                    filterBudgetDate.push(budgetdate[i]);
                }
                if(i!=weightLogs.length){
                    filterWeightLogs.push(weightLogs[weightLogs.length-1]);
                    filterBudgetDate.push(budgetdate[weightLogs.length-1]);
                }


                $scope.drawGoalGraph(filterWeightLogs,titles,filterBudgetDate);
                $scope.weightGraphValue = filterWeightLogs
                //$scope.weightGraph = limitToFilter($scope.weightGraphValue, 30);
            }, function () {
                errorMessage(Flash, "Please try again later!")
            });
        };



        $scope.deteteGoal=function(){
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#goal-delete-confirmation").fadeIn(600);
                $("#goal-delete-confirmation").fadeIn(600);
                $(".common_model").show();

            });
            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#goal-delete-confirmation").hide();
                $("#lean_overlay").hide();
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#goal-delete-confirmation").hide();
                $("#lean_overlay").hide();
            });
        };

        $scope.doAddWeightPopup=function(value){
            $scope.choice=value;
            $scope.updateWeightForm.$setPristine();
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#updateWeight").fadeIn(600);
                $(".common_model").show();
                $scope.shouldBeOpen = true;
            });

            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#updateWeight").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#updateWeight").hide();
                $("#lean_overlay").hide();
                $scope.shouldBeOpen = false;
            });
        };

        $scope.docheckGoalEndDate=function(value){

            $scope.goalchoice=parseInt(value);
            if(value==5){
                $scope.goalPossiblityStatus=1;
            }
            else{
                requestHandler.postRequest("checkgoalenddate/",{"currentweight":$scope.demography.weight,"goalchoice":$scope.goalchoice}).then(function(response){
                    $scope.goalPossiblityStatus = response.data.Response_status;
                    $scope.customResponse=1;
                    if(response.data.Response_status==1){
                        $scope.enddate=response.data.goalEndDate;
                    }
                    else{

                    }

                });
            }
        };

        $scope.doCheckPossibleDate=function(value){

            requestHandler.postRequest("/user/getWeightLogGraph/", {"startdate": $scope.UserDate,"enddate": $scope.UserDate}).then(function(response){
                $scope.UserWeightEntry=response.data.Weight_logs[0].userentry;


                if($scope.UserWeightEntry==0){
                    $scope.doAddWeightPopup(value);
                }
                else{
                    $scope.docheckGoalEndDate(value);

                }

//Need to check possible date API call here with current weight
            });
        };

            $scope.updateWeightLogAndEndDate=function(choice){

            $scope.updateWeightLog();
            $scope.docheckGoalEndDate(choice);

        };

        $scope.updateWeightLog=function(){
            $scope.weightlog=parseFloat($scope.weightlog);
            requestHandler.postRequest("user/weightlogInsertorUpdate/",{"date":$scope.UserDate,"weight":$scope.weightlog}).then(function(response){

            }, function () {
                errorMessage(Flash, "Please try again later!")
            });

        };



        //To Delete Goal
        $scope.doDeleteGoal=function(){
            requestHandler.postRequest("user/deleteWeightGoal/",{"date":selectedDate,"currentweight":$scope.demography.weight}).then(function(response){
                // $scope.doGetWeightGoal();
                // $scope.setGoalTypeOptions(2);
                // $scope.weight='';
                $scope.updateGoal=0;
                $window.goalStartDate = $window.goalEndDate = selectedDate;
                $window.minimumDate = new Date();
                $scope.targetText='Period';
                $window.singlePicker = true;
                $scope.goal = {
                    status: 'set-goal'
                };
            },function () {
                errorMessage(Flash, "Please try again later!")
            });
        };


        //To Update Goal Details
        $scope.updateGoalDetails=function(currentWeight){
            //  $scope.setGoalTypeOptions(1);
            $scope.weightGraph=false;
            $scope.goalPossiblityStatus =0;
            $scope.targetText = 'End Date';
            $window.singlePicker = true;
            $scope.originalUpdateGoalWeight={
                endDate:$scope.goalDetails.enddate,
                weight:$scope.goalDetails.targetweight
            };
            var startformat = $scope.goalDetails.startdate.slice(6,10)+','+$scope.goalDetails.startdate.slice(3,5)+','+$scope.goalDetails.startdate.slice(0,2);
            var currentformat = selectedDate.slice(6,10)+','+selectedDate.slice(3,5)+','+selectedDate.slice(0,2);

            if($scope.goalDetails.planType==3){
                $window.goalStartDate = $scope.goalDetails.enddate;
            }
            if($scope.goalDetails.planchoice==5){
                $window.goalStartDate = $scope.goalDetails.startdate;
                if($scope.goalDetails.enddate!=selectedDate){
                    $window.goalEndDate=$scope.goalDetails.enddate;
                }
                else{
                    $window.goalEndDate = new Date();
                }

            }


            $scope.weight = $scope.goalDetails.targetweight;
            $scope.currentEnddate= $scope.goalDetails.enddate;
            if($scope.goalDetails.planType==2){
                $scope.goalchoice=$scope.goalDetails.planchoice.toString();
            }
            $scope.currentweight=currentWeight;
            if (new Date(startformat).getTime() >= new Date(currentformat).getTime()) {
                $window.minimumDate = $scope.goalDetails.startdate;
            }
            else{
                $window.minimumDate = new Date();
            }
            $scope.goal = {
                status: 'set-goal'
            };
        };


        $scope.setGoalTypeOptions=function(id){
            var checkPlanType;
            if($scope.demography.userPlanType==2){
                checkPlanType = "Gain";
            }else if($scope.demography.userPlanType==3){
                checkPlanType = "Lose";
            }

            if($scope.userProfile.unitPreference==1){
                $scope.goalTypeOptions=[{
                    "value": 1,
                    "name": checkPlanType+" 1/4 kg per week"
                },
                    {
                        "value": 2,
                        "name": checkPlanType+" 1/2 kg per week"
                    },
                    {
                        "value": 3,
                        "name": checkPlanType+" 3/4 kg per week"
                    },
                    {
                        "value": 4,
                        "name": checkPlanType+" 1 kg per week"
                    },
                    {
                        "value": 5,
                        "name": "Custom"
                    }
                ]
            }
            else{
                $scope.goalTypeOptions=[{
                    "value": 1,
                    "name": checkPlanType+" 1/2 lb per week"
                },
                    {
                        "value": 2,
                        "name": checkPlanType+" 1 lb per week"
                    },
                    {
                        "value": 3,
                        "name": checkPlanType+" 1 1/2 lbs per week"
                    },
                    {
                        "value": 4,
                        "name": checkPlanType+" 2 lbs per week"
                    },
                    {
                        "value": 5,
                        "name": "Custom"
                    }
                ]
            }

            if(id==2){
                $scope.goalType = $scope.goalTypeOptions[0];
            }
            else{
                if($scope.goalDetails.planchoice==null){
                    $scope.goalType = $scope.goalTypeOptions[0];
                }
                else{
                    $scope.goalType = $scope.goalTypeOptions[($scope.goalDetails.planchoice-1)];
                }
            }
        };

        $scope.isCleanUpdateGoal=function(){
            var endDate = document.getElementById("end").value;
            if(endDate==""){
                endDate = $scope.goalDetails.enddate;
            }
            var newUpdateGoal={
                endDate:endDate,
                weight:parseFloat(document.getElementById("target").value)
            };
            return angular.equals($scope.originalUpdateGoalWeight,newUpdateGoal);
        };

        $scope.changeGoalType=function(value){
            $scope.goalType=value;
        };
        $scope.updateGoalAlert=function(){
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#updateGoalAlert").fadeIn(600);
                $(".common_model").show();
            });

            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#updateGoalAlert").hide();
                $("#lean_overlay").hide();
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#updateGoalAlert").hide();
                $("#lean_overlay").hide();
            });
        };

        $scope.updateGoalCheck=function(){
            if($scope.goalDetails.planType==2){
                if($scope.demography.weight<$scope.demography.targetweight){
                    $scope.doWeightGoalUpdate="loss";
                    $scope.updateGoalAlert();
                }
                else{
                    $scope.doUpdateGoal();
                }
            }
            else if($scope.goalDetails.planType==3){
                if($scope.demography.weight>$scope.demography.targetweight){
                    $scope.doWeightGoalUpdate="gain";
                    $scope.updateGoalAlert();
                }
                else{
                    $scope.doUpdateGoal();
                }
            }
        };

        $scope.highlightPlan = function() {
            $rootScope.planHighlight = true;
            $location.url('/demography');
        }

        //To Do Update Goal
        $scope.doUpdateGoal=function(){
            $scope.setGoalDetails={};


            $scope.setGoalDetails.currentweight=$scope.demography.weight;
            if($scope.goalDetails.planType==2){
                $scope.setGoalDetails.goalchoice=parseInt($scope.goalchoice);
                if($scope.setGoalDetails.goalchoice==5){
                    if(document.getElementById("start").value==''){
                        $scope.setGoalDetails.enddate = $scope.goalDetails.enddate;
                    }
                    else{
                        $scope.setGoalDetails.enddate=document.getElementById("start").value;

                    }
                }


            }
            else if($scope.goalDetails.planType==3){
                $scope.setGoalDetails.goalchoice=parseInt($scope.goalchoice);

                if(document.getElementById("start1").value==''){
                    $scope.setGoalDetails.enddate = $scope.goalDetails.enddate;
                }
                else{
                    $scope.setGoalDetails.enddate=document.getElementById("start1").value;
                }
            }

            else{
                $scope.setGoalDetails.enddate=$scope.enddate;
            }


            $scope.userChosenDate = $scope.setGoalDetails.enddate;
            requestHandler.postRequest("user/weightgoalInsertorUpdate/",$scope.setGoalDetails).then(function(response){

                if(response.data.Response_status==0){

                    $scope.customResponse = response.data.Response_status;
                    $scope.goalPossiblityStatus =0;
                    $scope.customPossibleDate =  response.data.possibledate;

                    $scope.setGoalDetails.enddate=$scope.customPossibleDate;
                    $(function(){
                        $("#lean_overlay").fadeTo(1000);
                        $("#custom-goal-confirmation").fadeIn(600);
                        $(".common_model").show();
                        $scope.shouldBeOpen = true;
                    });

                    $(".modal_close").click(function(){
                        $(".common_model").hide();
                        $("#custom-goal-confirmation").hide();
                        $("#lean_overlay").hide();
                        $scope.shouldBeOpen = false;
                    });

                    $("#lean_overlay").click(function(){
                        $(".common_model").hide();
                        $("#custom-goal-confirmation").hide();
                        $("#lean_overlay").hide();
                        $scope.shouldBeOpen = false;
                    });
                }
                else{

                    $scope.doGetWeightGoal();
                    $scope.getBudget(selectedDate);
                }

            },function(){
                errorMessage(Flash, "Please try again later!");
            });
        };

        //Clear popup close
        $scope.customGoalClear = function(){
            $scope.setGoalDetails.enddate=$scope.enddate;
        };
        //Do Check Possible Date on Custom update goal
        $scope.checkCustomGoal=function(){
            $scope.setGoalDetails={};



            $scope.goalType=$scope.goalDetails.planType;
            $scope.setGoalDetails.currentweight=$scope.demography.weight;
            $scope.setGoalDetails.goalchoice=parseInt($scope.goalchoice);

            if($scope.goalType==2){
                if($scope.setGoalDetails.goalchoice==5 && $scope.customResponse!=0){

                    if(document.getElementById("start").value==''){
                        $scope.setGoalDetails.enddate = selectedDate;
                    }
                    else{
                        $scope.setGoalDetails.enddate=document.getElementById("start").value;
                    }
                }
                else if($scope.setGoalDetails.goalchoice==5 && $scope.customResponse==0){
                    $scope.setGoalDetails.enddate=$scope.customPossibleDate;
                }

                else{
                    $scope.setGoalDetails.enddate=$scope.enddate;
                }
            }
            else if($scope.goalType==3){
                if(document.getElementById("start1").value==''){
                    $scope.setGoalDetails.enddate = selectedDate;
                }
                else{
                    $scope.setGoalDetails.enddate=$scope.customPossibleDate;
                }
            }

            $scope.userChosenDate = $scope.setGoalDetails.enddate;
            requestHandler.postRequest("user/weightgoalInsertorUpdate/",$scope.setGoalDetails).then(function(response){

                if(response.data.Response_status==0){
                    $scope.customResponse = response.data.Response_status;
                    $scope.goalPossiblityStatus =10;
                    $scope.customPossibleDate =  response.data.possibledate;

                    $scope.setGoalDetails.enddate=$scope.customPossibleDate;

                }
                else if(response.data.Response_status==1){

                    $scope.doGetWeightGoal();
                    $scope.getBudget(selectedDate);
                }


            },function(){
                errorMessage(Flash, "Please try again later!");
            });
        };

         // Get Calories Brunt And Intake deatils by date
         $scope.doGetIntakeBruntByDate = function(date){
         requestHandler.postRequest("user/getTotalCalorieDetailForDate/",{"date":date}).then(function(response){
         $scope.calorieGraph=response.data.BudgetDetail;



         if($scope.calorieGraph.Intake=="") $scope.calorieGraph.Intake=0;
         if($scope.calorieGraph.Burnt=="") $scope.calorieGraph.Burnt=0;
         else  if($scope.calorieGraph.Burnt!=""){
         $scope.calorieGraph.Burnt=Math.abs($scope.calorieGraph.Burnt);
         }
         $scope.averageIntake=Math.round($scope.calorieGraph.averagecalorieintake);
         $scope.averageSpent=Math.round($scope.calorieGraph.averagecalorieburnt);

         $scope.currentGain=$scope.calorieGraph.Intake;
         $scope.currentGain=$scope.currentGain.toFixed(2);

          if($scope.averageIntake<$scope.calorieGraph.intakecalorie){
         $scope.currentGainColour="red";
         }else $scope.currentGainColour="limegreen";


         $scope.currentSpent=$scope.calorieGraph.Burnt;
         $scope.currentSpent=$scope.currentSpent.toFixed(2);

         if($scope.averageSpent<$scope.calorieGraph.burntcalorie){
         $scope.currentSpentColour="red";
         }else $scope.currentSpentColour="orange";


         var gainedCalories;
         var spentCalories;
         if($scope.calorieGraph.Intake>$scope.calorieGraph.Burnt)
         spentCalories = parseFloat(($scope.calorieGraph.Intake - $scope.calorieGraph.Burnt).toFixed(2));
         else spentCalories =0;
         if($scope.calorieGraph.Intake<$scope.calorieGraph.Burnt)
         gainedCalories = parseFloat(($scope.calorieGraph.Burnt - $scope.calorieGraph.Intake).toFixed(2));
         else gainedCalories =0;
         if($scope.calorieGraph.Intake==$scope.calorieGraph.Burnt){
         gainedCalories =0;
         spentCalories =0;
         }

         $('#gainVsSpent').highcharts({

         chart: {
         type: 'column'
         },

         xAxis: {
         categories: ['Compare <br/> <small>(calories)</small>']
         },

         yAxis: {
         allowDecimals: false,
         min: 0,
         title: {
         text: ''
         }
         },

         credits:{enabled:false},
         exporting:{enabled:false},
         legend:{enabled:false},
         title:{text:''},

         tooltip: {
         enabled:true,
         backgroundColor:'rgba(255, 255, 255, 1)',
         borderWidth:1,
         shadow:true,
         style:{fontSize:'10px',padding:5,zIndex:10000},
         formatter: function () {
         return '<b>' + this.x + '</b><br/>' +
         this.series.name + ': ' + this.y + '<br/>'
         }
         },

         plotOptions: {
         column: {
         stacking: 'normal'
         }
         },

         series: [//{
         //name: 'Spent',
         //data: [gainedCalories],
         //color: '#eee',
         //stack: 'male'},
         {
         name: 'Intake',
         data: [$scope.calorieGraph.Intake],
         color: 'limegreen',
         stack: 'male'
         },// {
         //   name: 'Gained',
         //   color: '#eee',
         //   data: [spentCalories],
         //   stack: 'female' }
         {
         name: 'Burnt',
         data: [$scope.calorieGraph.Burnt],
         color: 'red',
         stack: 'female'
         }]
         });

         },function(){
         errorMessage(Flash, "Please try again later!");
         });
         };

         $scope.updateAverageGainSpent = function(date){
         requestHandler.postRequest("user/getTotalCalorieDetailForDate/",{"date":date}).then(function(response){
         $scope.averageIntake=Math.round(response.data.Calorie_Graph.averagecalorieintake);
         $scope.averageSpent=Math.round(response.data.Calorie_Graph.averagecalorieburnt);
         });
         };

        $scope.goGetDailyIntakeGraph = function(date){

            requestHandler.postRequest("user/dailyCalorieGraph/",{"date":date}).then(function(response){

                $scope.calorieIntakeGraph=response.data.dailyCalorieGraph;

                if($scope.calorieIntakeGraph.averagefat=="") $scope.calorieIntakeGraph.averagefat=0;
                if($scope.calorieIntakeGraph.fat=="") $scope.calorieIntakeGraph.fat=0;
                if($scope.calorieIntakeGraph.averageprotein=="") $scope.calorieIntakeGraph.averageprotein=0;
                if($scope.calorieIntakeGraph.protein=="") $scope.calorieIntakeGraph.protein=0;
                if($scope.calorieIntakeGraph.averagefibre=="") $scope.calorieIntakeGraph.averagefibre=0;
                if($scope.calorieIntakeGraph.fibre=="") $scope.calorieIntakeGraph.fibre=0;
                if($scope.calorieIntakeGraph.averagecarbo=="") $scope.calorieIntakeGraph.averagecarbo=0;
                if($scope.calorieIntakeGraph.carbo=="") $scope.calorieIntakeGraph.carbo=0;

                $('#dailyIntake').highcharts({
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['Protein', 'Fat', 'Carbs', 'Fibre'],
                        labels: {
                            style: {
                                fontSize:'9px',
                                fontWeight:'normal'
                            },
                            useHTML: true,
                            formatter: function() {
                                if(this.value == "Protein")
                                    return this.value+'<br/><img class="hidden-md" src="../../images/i-protein.jpg"/>';
                                else if(this.value == "Fat")
                                    return '&nbsp;&nbsp;'+this.value+'&nbsp;&nbsp;&nbsp;&nbsp;'+'<br/><img class="hidden-md" src="../../images/i-fats.jpg"/>';
                                else if(this.value == "Carbs")
                                    return this.value+'&nbsp;'+'<br/><img class="hidden-md" src="../../images/i-carbs.jpg"/>';
                                else if(this.value == "Fibre")
                                    return '&nbsp;'+this.value+'&nbsp;&nbsp;'+'<br/><img class="hidden-md" src="../../images/i-fibre.jpg"/>';
                                else
                                    return this.value;
                            }
                        }
                    },
                    tooltip:{
                        enabled:true,
                        backgroundColor:'rgba(255, 255, 255, 1)',
                        borderWidth:1,
                        shadow:true,
                        style:{fontSize:'10px',padding:5,zIndex:10000},
                        formatter:false
                    },
                    yAxis:{
                        title: {
                            text: null
                        },
                        labels:{
                            style:{
                                fontSize:'10px'
                            }
                        }
                    },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    legend:{
                        enabled:true,
                        itemStyle:{
                            align:'left'

                        }
                    },
                    plotOptions: {
                        series: {
                            events: {
                                legendItemClick: function(event) {
                                    var selected = this.index;
                                    var allSeries = this.chart.series;

                                    $.each(allSeries, function(index, series) {
                                        if (selected == index) {
                                            if (series.visible == true) {
                                                series.visible=false;
                                                series.hide();
                                            }
                                            else {
                                                series.visible=true;
                                                series.show();
                                            }
                                        }

                                    });
                                    var count=0;
                                    $.each(allSeries, function(index,series) {
                                        if (series.visible == true) {

                                        }
                                        else {
                                            count++; //increasing series click count
                                        }
                                    });

                                    if(count==2){
                                        $.each(allSeries, function(index, series) {
                                            if (selected == index) {
                                                if (series.visible == true) {
                                                    series.hide();
                                                }
                                                else {
                                                    series.show();
                                                }
                                            }

                                        });

                                    }
                                    return false;
                                }
                            }
                        }
                    },

                    series: [{
                        type: 'column',
                        name:'Consumed',
                        data: [
                            {
                                name: 'Protein',
                                color: 'limegreen',
                                y: parseFloat($scope.calorieIntakeGraph.protein)
                            }, {
                                name: 'Fat',
                                color: 'red',
                                y: parseFloat($scope.calorieIntakeGraph.fat)
                            }, {
                                name: 'Carbs',
                                color: 'orange',
                                y: parseFloat($scope.calorieIntakeGraph.carbo)
                            }, {
                                name: 'Fibre',
                                color: '#ffcc00',
                                y: parseFloat($scope.calorieIntakeGraph.fibre)
                            }],
                        visible:true
                    },  {
                        type: 'spline',
                        name: 'Required',
                        data: [
                            parseFloat($scope.calorieIntakeGraph.averageprotein),
                            parseFloat($scope.calorieIntakeGraph.averagefat),
                            parseFloat($scope.calorieIntakeGraph.averagecarbo),
                            parseFloat($scope.calorieIntakeGraph.averagefibre)],
                        visible:true,
                        marker: {
                            lineWidth: 1,
                            lineColor: Highcharts.getOptions().colors[1],
                            fillColor: 'white'
                        }
                    }]
                });

            },function(){
                errorMessage(Flash, "Please try again later!");
            });
        };

        /*
         $scope.graphOne=function(){
         $scope.graphs=1;
         };
         */

        $scope.graphTwo=function(){
            $scope.graphs=2;
        };
        $scope.dailyIntake=function(){
            $scope.graphs=3;
        };
        $scope.loadSessionFood=function(){
            switch(parseInt($scope.graphSessionId)){
                case 1:$scope.userSessionFoods=$scope.userFoodDiaryDataAll.BreakFast;
                    break;
                case 2:$scope.userSessionFoods=$scope.userFoodDiaryDataAll.Brunch;
                    break;
                case 3:$scope.userSessionFoods=$scope.userFoodDiaryDataAll.Lunch;
                    break;
                case 4:$scope.userSessionFoods=$scope.userFoodDiaryDataAll.Evening;
                    break;
                case 5: $scope.userSessionFoods=$scope.userFoodDiaryDataAll.Dinner;
                    break;
                default :break;
            }
            $scope.goGetSessionGraph($scope.graphSessionId);
        };

        $scope.goGetSessionGraph = function(id){
            $scope.loaded=true;
            var date=document.getElementById("main-start-date").value;
            $scope.storedSessionId = id;

            if(!$scope.storedSessionId){}
            else{
                requestHandler.postRequest("user/getDailyCalorieGraphWithSession/",{"date":date,"sessionid":id}).then(function(response){
                    $scope.calorieIntakeGraph=response.data.Calorie_Graph;
                    $scope.graphResponse=response.data.Response_status;
                    if($scope.calorieIntakeGraph.fat=="") $scope.calorieIntakeGraph.fat=0;
                    if($scope.calorieIntakeGraph.protein=="") $scope.calorieIntakeGraph.protein=0;
                    if($scope.calorieIntakeGraph.fibre=="") $scope.calorieIntakeGraph.fibre=0;
                    if($scope.calorieIntakeGraph.carbo=="") $scope.calorieIntakeGraph.carbo=0;

                    $scope.totalUnits = $scope.calorieIntakeGraph.fat+$scope.calorieIntakeGraph.protein+$scope.calorieIntakeGraph.fibre+$scope.calorieIntakeGraph.carbo;

                    $('#sessionGraph').highcharts({
                        title: {
                            text: ''
                        },
                        xAxis: {
                            categories: ['Protein', 'Fat', 'Carbs', 'Fibre'],
                            labels: {
                                useHTML: true,
                                formatter: function() {
                                    if(this.value == "Protein")
                                        return this.value+'<br/><img src="../../images/i-protein.jpg"/>';
                                    else if(this.value == "Fat")
                                        return '&nbsp;&nbsp;'+this.value+'&nbsp;&nbsp;&nbsp;&nbsp'+'<br/><img src="../../images/i-fats.jpg"/>';
                                    else if(this.value == "Carbs")
                                        return this.value+'<br/><img src="../../images/i-carbs.jpg"/>';
                                    else if(this.value == "Fibre")
                                        return this.value+'&nbsp;&nbsp;'+'<br/><img src="../../images/i-fibre.jpg"/>';
                                    else
                                        return this.value;
                                }
                            }
                        },
                        tooltip:{
                            enabled:true,
                            backgroundColor:'rgba(255, 255, 255, 1)',
                            borderWidth:1,
                            shadow:true,
                            style:{fontSize:'10px',padding:5,zIndex:500},
                            formatter:false
                        },
                        yAxis:{
                            title: {
                                text: null
                            },
                            min: 0, max: $scope.totalUnits,
                            labels:{
                                style:{
                                    fontSize:'10px'
                                }
                            }
                        },
                        exporting: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        legend:{enabled:false},
                        series: [{
                            type: 'column',
                            showInLegend:false,
                            name:'Unit',
                            data: [
                                {
                                    name: 'Protein',
                                    color: 'limegreen',
                                    y: parseFloat($scope.calorieIntakeGraph.protein)
                                }, {
                                    name: 'Fat',
                                    color: 'red',
                                    y: parseFloat($scope.calorieIntakeGraph.fat)
                                }, {
                                    name: 'Carbs',
                                    color: 'orange',
                                    y: parseFloat($scope.calorieIntakeGraph.carbo)
                                }, {
                                    name: 'Fibre',
                                    color: '#ffcc00',
                                    y: parseFloat($scope.calorieIntakeGraph.fibre)
                                }]
                        }]
                    });
                    $scope.loaded=false;

                },function(){
                    errorMessage(Flash, "Please try again later!");
                });
            }
        };


      /*  $scope.doGetCoachAdvices = function(){
            requestHandler.getRequest("user/getCoachAdvicesByUser/", "").then(function(response){

                //To get frequently asked exercise
                var advicePromise=UserDashboardService.getCoachIndividualDetail(response.data.Coach_Advice);

                var adviceCoachList=[];

                $.each(advicePromise, function(index,value) {
                    adviceCoachList.push(value.coachid);
                });

                requestHandler.getRequest("user/getmyCoachList/", "").then(function(response){
                    $scope.coachlist=response.data.getmyCoachList;
                    $.each($scope.coachlist, function(index,coach) {
                        if(adviceCoachList.indexOf(coach.userid)==-1){
                            var addCoach={};
                            addCoach.coachid=coach.userid;
                            addCoach.coachname=coach.name;
                            addCoach.coachimage=coach.imageurl;
                            addCoach.description="";
                            advicePromise.push(addCoach);
                        }
                    });

                    var emptyCoach=[{coachid: "n1",coachname: ""},{coachid: "n2",coachname: ""},{coachid: "n3",coachname: ""},{coachid: "n4",coachname: ""}];

                    if(advicePromise.length<3){
                        for(i=advicePromise.length;i<3;i++){
                            advicePromise.push(emptyCoach[i]);
                        }
                    }
                    else{
                        advicePromise.push(emptyCoach[0]);
                    }
                    $scope.coachadvice =advicePromise;
                    $scope.usercoachadvicedetails=$scope.coachadvice[0];

                    coachAdviceCarousel();
                });

            },function(){
                console.log("Please try again later!");
            });
        };*/

        $scope.setCoachDeatails=function(mycoachadvice){
            $scope.usercoachadvicedetails=mycoachadvice;
        };

        $scope.getHistory=function(){
            $scope.showFoodMoal=0;
            $scope.historyReport=1;
            if($('#history-start').val()==''){
                $scope.isHistoryEmpty=0;
            }
          /*  else{
                $scope.isHistoryEmpty=1;
            }*/
        };
    /*    $scope.getViewGraph=function(){
            $scope.historyReport=0;
            if($('#history-start').val()=='') $scope.isViewGraphEmpty=1;
            else $scope.isViewGraphEmpty=0;
        };*/
     /*   $scope.getViewGraph1=function(){
            $scope.historyReport=0;
            if($('#history-start').val()=='') $scope.isViewEmpty=1;
            else $scope.isViewEmpty=0;
        };*/

        $scope.otherThanHistory=function(){
            // $scope.showFoodMoal=0;
            // $('#dailyupdate').click(function(e) {
            //     $scope.showFoodMoal=1;
            //     $scope.mealPlanCalender();
            // });
            $scope.isHistoryEmpty=0;
            $scope.historyReport=0;

        };

        $scope.setHistoryType=function(id,divId){

            $scope.historyType=id;
            if($('#history-start').val()==''){
                $scope.showGraph=1;
                $scope.doGetHistoryReport(divId);
            }
            else $scope.doGetHistoryReport(divId);
        };
        $scope.setGraphType=function(id,divId){

            $scope.historyType=id;
            if($('#history-start').val()==''){}
            else $scope.doGetGraphReport(divId);
        };
        $scope.setExcerciseType=function(id,divId){
            $scope.historyType=id;
            if($('#history-start').val()==''){}
            else $scope.doGetGraph(divId);
        };
        
        //To Display User History Graph
        $scope.historyGraph = [
                 {"graphCategory":"ACTIVITY","graphCategoryId":1,"graphs":[
            {
                'id': 3,
                'name': 'Exercise Minutes',
                "imageSrc": "../../images/exercise.png"
            },
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
            },  {
                         'id': 18,
                         'name': 'Weight Vs Exercise',
                         "imageSrc": "../../images/weight-exercise.png"
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
            },
                {
                    'id': 17,
                    'name': 'Weight Vs Intake',
                    "imageSrc": "../../images/weight_maintain.png"
                }]
            },
            {"graphCategory":"HEART RATE","graphCategoryId":3,"graphs":[
                
                {
                    'id': 11,
                    'name': 'Heart Rate',
                    "imageSrc": "../../images/heart1.gif"

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

        $scope.doGetGraph=function(divId){
            $scope.isViewEmpty=0;
            $scope.loaded=true;
            var endDate;
            if($('#history-start').val()==''){
              startDate=startDate;
              endDate = selectedDate;
            }
            else{
                startDate =$('#history-start').val();
                endDate = $('#history-end').val();
            }
            var monthNames= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var historyReport = [];
            var historyDates=[];
            var titles={};

            if($scope.historyType==3){
                requestHandler.postRequest("user/getExerciseMinutesUsingDates/", {"fromdate":startDate,"todate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.ExerciseMinutesUsingDates;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.workoutvalue));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Exercise Minutes Graph ( "+startDate+" - "+endDate+" )";
                    titles.name="Exercise Minutes";
                    titles.suffix=" mints";
                    titles.yaxis="Minutes";
                    titles.xaxis="Date Range";
                    titles.color='blue';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }

        };
        $scope.doGetGraphReport=function(divId){
            $scope.isViewGraphEmpty=0;
            $scope.loaded=true;
            var endDate;
            if($('#history-start').val()==''){
                startDate =startDate;
                endDate = selectedDate;
            }
            else{
                startDate = $('#history-start').val();
                endDate = $('#history-end').val();
            }
            var monthNames= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var historyReport = [];
            var historyDates=[];
            var titles={};

            if($scope.historyType==1){
                requestHandler.postRequest("user/calorieGraphbyDates/", {"fromdate":startDate,"todate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.calorieGraphbyDates;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.calorie));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Calories Gained Graph ( "+startDate+" - "+endDate+" )";
                    titles.name="Calories Gained";
                    titles.suffix=" cals";
                    titles.yaxis="Calories (cal)";
                    titles.xaxis="Date Range";
                    titles.color='limegreen';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }
            else if($scope.historyType==2){
                requestHandler.postRequest("user/getCalorieBurntGraphByDates/", {"fromdate":startDate,"todate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.CalorieBurntGraphbyDates;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.calorie));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Calories Brunt Graph ( "+startDate+" - "+endDate+" )";
                    titles.name="Calories Burned";
                    titles.suffix=" cals";
                    titles.yaxis="Calories (cal)";
                    titles.xaxis="Date Range";
                    titles.color='red';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }

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

        $scope.doGetHistoryReport=function(divId){
            $scope.isHistoryEmpty=0;
            $scope.loaded=true;
            $scope.waterGraphs=false;
            var endDate;
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
            var userWeightVal=[];
            var foodIntakeVal=[];
            var exerciseMinutes=[];
            if($scope.userProfile.unitPreference==1){
                $scope.unit="Kgs";
            }
            else if($scope.userProfile.unitPreference==2){
                $scope.unit="Lbs";
            }

            if($scope.historyType==1){
                requestHandler.postRequest("user/calorieGraphbyDates/", {"fromdate":startDate,"todate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.calorieGraphbyDates;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.calorie));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Calories Gained Graph ( "+startDate+" - "+endDate+" )";
                    titles.graphType='column';
                    titles.name="Calories Gained";
                    titles.suffix=" cals";
                    titles.yaxis="Calories (cal)";
                    titles.xaxis="Date Range";
                    titles.color='limegreen';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }
            else if($scope.historyType==2){
                requestHandler.postRequest("user/getCalorieBurntGraphByDates/", {"fromdate":startDate,"todate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.CalorieBurntGraphbyDates;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.calorie));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Calories Brunt Graph ( "+startDate+" - "+endDate+" )";
                    titles.graphType='column';
                    titles.name="Calories Burned";
                    titles.suffix=" cals";
                    titles.yaxis="Calories (cal)";
                    titles.xaxis="Date Range";
                    titles.color='red';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });

            }
            else if($scope.historyType==3){
                requestHandler.postRequest("user/getExerciseMinutesUsingDates/", {"fromdate":startDate,"todate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.ExerciseMinutesUsingDates;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.workoutvalue));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Exercise Minutes Graph ( "+startDate+" - "+endDate+" )";
                    titles.graphType='column';
                    titles.name="Exercise Minutes";
                    titles.suffix=" mins";
                    titles.yaxis="Minutes";
                    titles.xaxis="Date Range";
                    titles.color='blue';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }

            else if($scope.historyType==4){
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
                requestHandler.postRequest("/user/budgetGraphbyDates/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.BudgetList;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.Budget));
                        netVal.push(value.Net);
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
                requestHandler.postRequest("user/dailyCalorieGraphForDates/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.dailyCalorieForDates;
                    var totalFibre = 0;
                    var totalProtein = 0;
                    var totalFat = 0;
                    var totalCarbo = 0;
                    $.each($scope.historyRecord, function(index,value) {
                        totalFibre = parseFloat(totalFibre)+parseFloat(value.fibre);
                        totalProtein = parseFloat(totalProtein)+value.protein;
                        totalFat   = parseFloat(totalFat)+ value.fat;
                        totalCarbo = parseFloat(totalCarbo)+value.carbo;
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.protein));
                        fibreVal.push(parseFloat(value.fibre));
                        fatVal.push(parseFloat(value.fat));
                        carbsVal.push(parseFloat(value.carbo));
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
                requestHandler.postRequest("user/getWearableDataGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.wearable;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.steps));
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
                requestHandler.postRequest("user/getWearableDataGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.wearable;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.fastingbloodglucose));
                        randomglucoseVal.push(parseFloat(value.randombloodglucose));
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
                requestHandler.postRequest("user/getWearableDataGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.wearable;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.bloodoxygen));
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
                requestHandler.postRequest("user/getWearableDataGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.wearable;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.floors));
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
                requestHandler.postRequest("user/getWearableDataGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.wearable;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.restingheartrate));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Heart Rate Graph( "+startDate+" - "+endDate+" )";
                    titles.graphType='column';
                    titles.name="Heart Rate";
                    titles.suffix="  bpm";
                    titles.yaxis="Heart Rate (bpm)";
                    titles.xaxis="Date Range";
                    titles.color='#ff3300';
                    $scope.drawHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }

            else if($scope.historyType==12){

                requestHandler.postRequest("user/getWearableDataGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.wearable;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.sleep));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                        historyReport.push(history);
                    });
                    titles.title="Sleep Rate Graph( "+startDate+" - "+endDate+" )";
                    titles.graphType='column';
                    titles.name="Sleep";
                    titles.suffix="  mins";
                    titles.yaxis="Sleep (minutes)";
                    titles.xaxis="Date Range";
                    titles.color='#339966';
                    $scope.drawSleepHistoryGraph(historyReport,historyDates,titles,divId);
                });
            }
            else if($scope.historyType==13){
                requestHandler.postRequest("user/getWearableDataGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.wearable;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(parseFloat(value.systolic));
                        diastolicbpVal.push(parseFloat(value.diastolic));
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

                requestHandler.postRequest("user/getWaterLogGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.Water_logs;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(value.milliliters);
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

                requestHandler.postRequest("user/getWaterLogGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.Water_logs;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(value.ounces);
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

                requestHandler.postRequest("user/getWearableDataGraph/", {"startdate":startDate,"enddate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.wearable;
                    $.each($scope.historyRecord, function(index,value) {
                        var history = [];
                        var date = value.date.split("/");
                        history.push(monthNames[(date[1]-1)]+' '+date[0]);
                        history.push(value.bodytemperature);
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
            else if($scope.historyType==17){
                requestHandler.postRequest("user/getintakevsweightgraphbydates/", {"fromdate":startDate,"todate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.records;
                    $.each($scope.historyRecord, function(index,value) {
                        var date = value.date.split("/");
                        foodIntakeVal.push(value.calorieintake);
                        userWeightVal.push(parseInt(value.weight));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                    });
                    titles.title="Food Intake Vs Weight Graph( "+startDate+" - "+endDate+" )";
                    titles.name="Food Intake Vs Weight Graph";
                    titles.xaxis="Date Range";
                    titles.suffix=$scope.unit;
                    titles.yaxis=$scope.unit;
                    titles.color='#ff4d4d';
                    $scope.drawFoodIntakeandWeightGraph(foodIntakeVal,userWeightVal,historyDates,titles,divId);
                });
            }
            else if($scope.historyType==18){
                requestHandler.postRequest("user/getweightvsexercisegraphbydates/", {"fromdate":startDate,"todate":endDate}).then(function(response){
                    $scope.historyRecord=response.data.records;
                    $.each($scope.historyRecord, function(index,value) {
                        var date = value.date.split("/");
                        exerciseMinutes.push(parseInt(value.exerciseminutes));
                        userWeightVal.push(parseInt(value.weight));
                        historyDates.push(monthNames[(date[1]-1)]+' '+date[0]);
                    });
                    titles.title="Exercise Vs Weight Graph( "+startDate+" - "+endDate+" )";
                    titles.name="Exercise Vs Weight Graph";
                    titles.xaxis="Date Range";
                    titles.suffix=$scope.unit;
                    titles.yaxis= $scope.unit;
                    $scope.drawExerciseMinutesandWeightGraph(exerciseMinutes,userWeightVal,historyDates,titles,divId);
                });
            }

             //All Ready Show the Graph
              $scope.showGraph=1;


        };

        $scope.drawHistoryGraph=function(data,dataX,titles,divId){
            console.log(data);
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

        $scope.drawHistoryGraphForBudget=function(data,titles,data1,data2,divId){
            console.log(data);
            console.log(titles);
            console.log(data1);
            console.log(data2);
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
            console.log(dataC);
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

        //for sleep history graph
        $scope.drawSleepHistoryGraph=function(data,dataD,titles,divId){
            console.log(data);
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

        //for bloodglucose Graph
        $scope.drawBloodGlucoseGraph=function(datafbg,titles,datarbg,dataD,divId){
            console.log(datafbg);
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
                    categories: dataD, //for displaying date
                     crosshair:true

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
                        '<td style="padding:0"><b>{point.y:.2f} mm/dl</b></td></tr>',
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
                    name: 'Fasting Blood Glucose',
                    color: '#339966',
                    data:datafbg     //for  displaying systolic blood pressure value
                }, {
                    name: 'Random Blood Glucose',
                    color: '#3366cc',
                    data:datarbg     // for displaying diastolic blood pressure value
                }
                ]
            });
        };

        //for blood pressure graph
        $scope.drawBpHistoryGraph=function(datasbp,dataD,datadbp,titles,divId){
            console.log(datasbp);
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
                    categories: dataD,//for displaying date
                    crosshair:true

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
    //to draw user weight vs food intake graph
    $scope.drawFoodIntakeandWeightGraph=function(dataC,dataW,dataD,titles,divId){

        $scope.loaded=false;
        $('#'+divId).highcharts({
            title: {
                text: titles.title
            },
            xAxis: [{title: {
                text: titles.xaxis
            },categories: dataD
                // crosshair: true
            }],tooltip:{
                enabled:true,
                backgroundColor:'rgba(255, 255, 255, 1)',
                borderWidth:1,
                shadow:true,
                style:{fontSize:'10px',padding:5,zIndex:500},
                formatter:false,
                valueSuffix: titles.suffix
            },
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value} '+  ' '+ titles.yaxis,
                    style: {
                        color: '#f8ba01'
                    }
                },
                title: {
                    text: 'Weight',
                    style: {
                        color: '#f8ba01'
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Food Intake',
                    style: {
                        color: 'limegreen'
                    }
                },
                labels: {
                    format: '{value} cal',
                    style: {
                        color: 'limegreen'
                    }
                },
                opposite: true
            }],
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            legend:{enabled:false},
            // legend: {
            //     layout: 'vertical',
            //     align: 'center',
            //     verticalAlign: 'bottom',
            //     floating: false
            // },
            series: [{
                name: 'Weight',
                type: 'line',
                data: dataW,
                tooltip: {
                    valueSuffix: ' ' +titles.suffix
                },
                color:'#f8ba01'

            }, {
                name: 'Food Intake',
                type: 'spline',
                yAxis: 1,
                data:dataC ,
                tooltip: {
                    valueSuffix: ' cal'
                },
                color:'limegreen'
            }]
        });

    };
    //to draw user weight vs exercise graph
    $scope.drawExerciseMinutesandWeightGraph=function(dataM,dataW,dataD,titles,divId){
        $scope.loaded=false;
        $('#'+divId).highcharts({
            title: {
                text: titles.title
            },
            xAxis: [{ title: {
                text: titles.xaxis
            },
                categories: dataD
                //crosshair: true
            }],tooltip:{
                enabled:true,
                backgroundColor:'rgba(255, 255, 255, 1)',
                borderWidth:1,
                shadow:true,
                style:{fontSize:'10px',padding:5,zIndex:500},
                formatter:false,
                valueSuffix: titles.suffix
            },
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}' +  ' '+titles.yaxis,
                    style: {
                        color: '#f8ba01'
                    }
                },
                title: {
                    text: 'Weight',
                    style: {
                        color: '#f8ba01'
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Exercise',
                    style: {
                        color: 'blue'
                    }
                },
                labels: {
                    format: '{value} min',
                    style: {
                        color: 'blue'
                    }
                },
                opposite: true
            }],
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            legend:{enabled:false},
            // legend: {
            //     layout: 'vertical',
            //     align: 'center',
            //     verticalAlign: 'bottom',
            //     floating: false
            // },
            series: [{
                name: 'Weight',
                type: 'line',
                data: dataW,
                tooltip: {
                    valueSuffix:' '+ titles.suffix
                },
                color:'#f8ba01'

            }, {
                name: 'Exercise Minutes',
                type: 'spline',
                yAxis: 1,
                data:dataM ,
                tooltip: {
                    valueSuffix: ' min'
                },
                color:'blue'
            }]
        });

    };


//HistoryGraph Search Filter

        // html filter (render text as html)
        userApp.filter('html', ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        }]);

        userApp.filter('startsWithLetterHistory', function () {

            return function (items, historysearch) {
                var filtered = [];
                var letterMatch = new RegExp(historysearch, 'i');
                if(!items){}
                else{
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (letterMatch.test(item.name)) {
                            filtered.push(item);
                        }
                    }
                }
                return filtered;
            };
        });

        $scope.datePicker = function(){
            $("#main-date").click();
        };
        $scope.datePickerGraph = function(){
            $("#history-graph").click();
            $("#history-view").click();
        };
        $scope.datePickerHistoryGraph = function(){
            $("#history-graph-date").click();
        };
        $scope.weekHistoryGraph = function(){
            $("#history-graph-week").click();
        };

        //Weight Goal Graph
        $scope.drawGoalGraph=function(data,titles,data1){
            console.log(data1);
           $('#goalGraph').highcharts({
                title: {
                    text: titles.title
                },
                xAxis: {
                    title: {
                        text: titles.xaxis
                    },

                    categories: data1
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

                        width: 1,
                        color: '#f8ba01'
                    }]
                },
                colors: [
                    '#f8ba01'
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                legend:{enabled:false},
                series: [ {
                    name: titles.name,
                    data: data
                }]
            });
        };



        //Get user time zone for update weight log
        $scope.getUserTimeZone=function(date){
            requestHandler.getRequest("getUserTimeZone/","").then(function(response){
                $scope.UserTimeZone = response.data.time;
                $scope.UserDate = $scope.UserTimeZone.slice(0,10);
                $scope.selectDate = date;
                if( $scope.UserDate == date){
                    $scope.disableUpdateWeight=false;
                }
                else{
                    $scope.disableUpdateWeight=true;
                }
            });
        };


        //Budget value
        $scope.getBudget=function(date){
            requestHandler.postRequest("user/getTotalCalorieDetailForDate/",{"date":date}).then(function(response){
                $scope.budgetDetails = response.data.BudgetDetail;
                $scope.Budget= $scope.budgetDetails.Budget;
                $scope.Net = $scope.budgetDetails.Net;
                if($scope.budgetDetails.OverorUnderStatus==1){
                    $scope.currentGainColour="red";
                }
                else if($scope.budgetDetails.OverorUnderStatus==2){
                    $scope.currentGainColour="limegreen";
                }
            });
        };


        //for get water level entry
        $scope.waterlog=0;
        $scope.doGetWaterLog=function(date,id){

            var waterLogPromise=UserDashboardService.doGetWaterLogDetails(date);
            waterLogPromise.then(function(result){
                var waterlogdetails=result.Water_log;

                $scope.waterlog = waterlogdetails.milliliters;
                $scope.waterlogoz = waterlogdetails.ounces;
            });
        };

        //TO Insert water Log
        $scope.doAddOrReduceWatertLog=function(id){
            //getting main date
            var date = document.getElementById("main-start-date").value;
            //$scope.disableReduceWater=false;
            if(id==0){
                $scope.addspin=true;
                $scope.waterAddText="Updating...";
                if($scope.addlogUnit==1){
                    requestHandler.postRequest("user/waterlogInsertorUpdate/",{"date":date,"milliliters":parseInt($scope.addlog),"oz":""}).then(function(response){
                        $scope.addspin=false;
                        $scope.waterAddText="+ Log";
                        $scope.doGetWaterLog(date);
                    }, function () {
                        errorMessage(Flash, "Please try again later!")
                    });
                }
                else{
                    requestHandler.postRequest("user/waterlogInsertorUpdate/",{"date":date,"milliliters":"","oz":parseInt($scope.addlog)}).then(function(response){
                        $scope.addspin=false;
                        $scope.waterAddText="+ Log";
                        $scope.doGetWaterLog(date);
                    }, function () {
                        errorMessage(Flash, "Please try again later!")
                    });

                }
            }
            else{
                if($scope.waterlog>$scope.addlog){
                    $scope.reducespin=true;
                    $scope.waterReduceText="Updating...";
                    if($scope.addlogUnit==1){
                        requestHandler.postRequest("user/waterlogInsertorUpdate/",{"date":date,"milliliters":parseInt($scope.waterlog) - parseInt($scope.addlog),"oz":""}).then(function(response){
                            $scope.reducespin=false;
                            $scope.waterReduceText="- Reduce";
                            $scope.doGetWaterLog(date);
                        }, function () {
                            errorMessage(Flash, "Please try again later!")
                        });
                    }
                    else{
                        $scope.disableForReduce=($scope.waterlogoz<=$scope.addlog);
                        requestHandler.postRequest("user/waterlogInsertorUpdate/",{"date":date,"milliliters":"","oz":parseInt($scope.waterlogoz) - parseInt($scope.addlog)}).then(function(response){
                            $scope.reducespin=false;
                            $scope.waterReduceText="- Reduce";
                            $scope.doGetWaterLog(date);
                        }, function () {
                            errorMessage(Flash, "Please try again later!")
                        });
                    }
                }
            }
        };

        // for water log update
        $scope.updateWaterLog=function(){
            //getting main date
            var date = document.getElementById("main-start-date").value;
            $scope.waterlog=parseFloat($scope.waterlog);
            requestHandler.postRequest("user/waterlogInsertorUpdate/",{"date":date,"milliliters":$scope.waterlog,"oz":$scope.waterlogoz}).then(function(response){

            }, function () {
                errorMessage(Flash, "Please try again later!")
            });

        };

        $scope.$watch('addlog', function() {
            if($scope.addlogUnit==1){
                if ($scope.waterlog<=$scope.addlog) {
                    $scope.isReduceEnable=true;
                }else
                    $scope.isReduceEnable=false;
            }
            else{
                if ($scope.waterlogoz<=$scope.addlog) {
                    $scope.isReduceEnable=true;
                }else
                    $scope.isReduceEnable=false;
            }
        });

        //for get wearable vendor list
        $scope.OpenFitbitWindow = function (authorizeurl,vendorid) {
           if(vendorid==4||vendorid==5){
                $scope.connectionDeviceAlert(vendorid);
           }else{
               $scope.connectionDeviceInformationAlert(authorizeurl,vendorid);

              }
        };
   //To open fitbit window
        $scope.proceedOpenFitBitWindow=function (authorizeurl,vendorid){
                $rootScope.vendorid= vendorid;
                $scope.loader=false;
                //$scope.wearableFitbitText="Connecting...";
                $scope.device=true;
                $window.open(authorizeurl+"&state="+requestHandler.domainURL()+"/views/devices/index.html?state="+vendorid,"_self");
        };

        $scope.doGetVendorlist = function(){
            requestHandler.getRequest("getWearableVendorsListByUser/","").then(function(response) {
                $scope.vendorList = response.data.vendorlist;
                $.each($scope.vendorList,function(index,value){
                    if(value.isactive==0)
                        value.connectionStatus="Connect";
                    else
                        value.connectionStatus="Disconnect";
                });
            },function(){
                errorMessage(Flash,"Please try again later!")
            });
        };
        $scope.wearableinit = function(){
            $scope.doGetVendorlist();
        }

        // For show and Hide button
        $scope.isActive = function(isactive) {

            if (isactive == 0)
                return true;
            else
                return false;

        };
        $scope.doGetDisonnectDetails=function(logid){
            $scope.wearableText="Disconnecting...";
            $scope.logid=logid;
            return requestHandler.postRequest("disconnectUserWearable/",{"logid":$scope.logid}).then(function(response) {
                if(response.data.Response=="Success"){
                        //$window.location.href = '../user/#/connectDevice';
                        $scope.doGetVendorlist();
                }
            });
        };

        $scope.connectionDeviceAlert=function(vendorid){
            if(vendorid==4)
                $scope.appDevice="Android";
            else
                $scope.appDevice="ios";
            $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#connect-using-mobile").fadeIn(600);
                $(".common_model").show();

            });
            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#connect-using-mobile").hide();
                $("#lean_overlay").hide();
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#connect-using-mobile").hide();
                $("#lean_overlay").hide();
            });
        };
        $scope.connectionDeviceInformationAlert=function(authorizeurl,vendorid){
            $scope.authorizeurl=authorizeurl;
            $scope.vendorid=vendorid;
             $(function(){
                $("#lean_overlay").fadeTo(1000);
                $("#connect-using-web").fadeIn(600);
                $(".common_model").show();

            });
            $(".modal_close").click(function(){
                $(".common_model").hide();
                $("#connect-using-web").hide();
                $("#lean_overlay").hide();
            });

            $("#lean_overlay").click(function(){
                $(".common_model").hide();
                $("#connect-using-web").hide();
                $("#lean_overlay").hide();
            });
        };


        //To display daily activities 
        $scope.doGetWearableDateByDate = function(date){
            return requestHandler.postRequest("user/getWearableDataForDate/",{"date": date}).then(function(response) {
                console.log(response.data.wearable);
                $scope.wearable=response.data.wearable;
            });
        };

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
        $scope.weightLogDate = selectedDate;
        $scope.todayDate = selectedDate;
        $scope.selectedDate = selectedDate;
        $window.goalStartDate = $window.goalEndDate = selectedDate;

    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    var actions = [{
        onClick: function(args) {
            alert.show('Edited', args.calendarEvent);
        }
    }, {
        onClick: function(args) {
            alert.show('Deleted', args.calendarEvent);
        }
    }];
    $scope.events = [
        {
            title: 'An event',

            startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
            endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            draggable: true,
            resizable: true,
            actions: actions
        }, {
            title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',

            startsAt: moment().subtract(1, 'day').toDate(),
            endsAt: moment().add(5, 'days').toDate(),
            draggable: true,
            resizable: true,
            actions: actions
        }, {
            title: 'This is a really long event title that occurs on every year',
            color: calendarConfig.colorTypes.important,
            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            endsAt: moment().startOf('day').add(19, 'hours').toDate(),
            recursOn: 'year',
            draggable: true,
            resizable: true,
            actions: actions
        }
    ];

    $scope.cellIsOpen = true;

    $scope.addEvent = function() {
        $scope.events.push({
            title: 'New event',
            startsAt: moment().startOf('day').toDate(),
            endsAt: moment().endOf('day').toDate(),
            color: calendarConfig.colorTypes.important,
            draggable: true,
            resizable: true
        });
    };

    $scope.eventClicked = function(event) {
        alert.show('Clicked', event);
    };

    $scope.eventEdited = function(event) {
        alert.show('Edited', event);
    };

    $scope.eventDeleted = function(event) {
        alert.show('Deleted', event);
    };

    $scope.eventTimesChanged = function(event) {
        alert.show('Dropped or resized', event);
    };

    $scope.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    $scope.timespanClicked = function(date, cell) {

        if ($scope.calendarView === 'month') {
            if (($scope.cellIsOpen && moment(date).startOf('day').isSame(moment($scope.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                $scope.cellIsOpen = false;
            } else {
                $scope.cellIsOpen = true;
                $scope.viewDate = date;
            }
        } else if ($scope.calendarView === 'year') {
            if (($scope.cellIsOpen && moment(date).startOf('month').isSame(moment($scope.viewDate).startOf('month'))) || cell.events.length === 0) {
                $scope.cellIsOpen = false;
            } else {
                $scope.cellIsOpen = true;
                $scope.viewDate = date;
            }
        }

    };

        //Initialize
        $scope.initialLoadFoodAndExercise=function(date){
            $scope.loadFoodDiary(date);
            $scope.loadExerciseDiary(date);
           // $scope.doGetIntakeBruntByDate(date);  deprecated
            $scope.goGetDailyIntakeGraph(date);
            $scope.doGetWeightGoal();
            $scope.doGetWeightLog(date);
            $scope.doGetWaterLog(date);
            $scope.goGetSessionGraph($scope.storedSessionId);
            $scope.getUserTimeZone(date);
            $scope.getBudget(date);
            $scope.graphTwo();
            $scope.checkGoalOnLoad(date);
            $scope.doGetWearableDateByDate(date);
            $scope.doGetMedicationListByUser();
            $scope.doCheckUserMedicationDocument();
            $scope.doGetUserDetails();
           // $scope.doSyncDevices(date);
        };

        $scope.initialLoadFoodAndExercise(selectedDate);
    /*    $scope.doGetCoachAdvices();*/
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

        var getPadded = function(val){
            return val < 10 ? ('0' + val) : val;
        };

        //Date Picker
        $scope.prevent=function(){
            event.preventDefault();
        };

        /*$scope.dpOpened = {
         opened: false,
         opened1: false
         };

         $scope.open = function ($event,opened) {
         $event.preventDefault();
         $event.stopPropagation();
         $scope.dpOpened[opened] = true;
         };*/

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        $scope.format = "dd/MM/yyyy";

        var dateFormat = function () {
            var    token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                timezoneClip = /[^-+\dA-Z]/g,
                pad = function (val, len) {
                    val = String(val);
                    len = len || 2;
                    while (val.length < len) val = "0" + val;
                    return val;
                };

            // Regexes and supporting functions are cached through closure
            return function (date, mask, utc) {
                var dF = dateFormat;

                // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
                if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                    mask = date;
                    date = undefined;
                }

                // Passing date through Date applies Date.parse, if necessary
                date = date ? new Date(date) : new Date;
                if (isNaN(date)) throw SyntaxError("invalid date");

                mask = String(dF.masks[mask] || mask || dF.masks["default"]);

                // Allow setting the utc argument via the mask
                if (mask.slice(0, 4) == "UTC:") {
                    mask = mask.slice(4);
                    utc = true;
                }

                var    _ = utc ? "getUTC" : "get",
                    d = date[_ + "Date"](),
                    D = date[_ + "Day"](),
                    m = date[_ + "Month"](),
                    y = date[_ + "FullYear"](),
                    H = date[_ + "Hours"](),
                    M = date[_ + "Minutes"](),
                    s = date[_ + "Seconds"](),
                    L = date[_ + "Milliseconds"](),
                    o = utc ? 0 : date.getTimezoneOffset(),
                    flags = {
                        d:    d,
                        dd:   pad(d),
                        ddd:  dF.i18n.dayNames[D],
                        dddd: dF.i18n.dayNames[D + 7],
                        m:    m + 1,
                        mm:   pad(m + 1),
                        mmm:  dF.i18n.monthNames[m],
                        mmmm: dF.i18n.monthNames[m + 12],
                        yy:   String(y).slice(2),
                        yyyy: y,
                        h:    H % 12 || 12,
                        hh:   pad(H % 12 || 12),
                        H:    H,
                        HH:   pad(H),
                        M:    M,
                        MM:   pad(M),
                        s:    s,
                        ss:   pad(s),
                        l:    pad(L, 3),
                        L:    pad(L > 99 ? Math.round(L / 10) : L),
                        t:    H < 12 ? "a"  : "p",
                        tt:   H < 12 ? "am" : "pm",
                        T:    H < 12 ? "A"  : "P",
                        TT:   H < 12 ? "AM" : "PM",
                        Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                        o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                        S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                    };

                return mask.replace(token, function ($0) {
                    return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
                });
            };
        }();

        // Some common format strings
        dateFormat.masks = {
            "default":      "ddd mmm dd yyyy HH:MM:ss",
            shortDate:      "m/d/yy",
            mediumDate:     "mmm d, yyyy",
            longDate:       "mmmm d, yyyy",
            fullDate:       "dddd, mmmm d, yyyy",
            shortTime:      "h:MM TT",
            mediumTime:     "h:MM:ss TT",
            longTime:       "h:MM:ss TT Z",
            isoDate:        "yyyy-mm-dd",
            isoTime:        "HH:MM:ss",
            isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };

        // Internationalization strings
        dateFormat.i18n = {
            dayNames: [
                "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            monthNames: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ]
        };

        // For convenience...
        Date.prototype.format = function (mask, utc) {
            return dateFormat(this, mask, utc);
        };

    }]).constant('uibdatepickerPopupConfig', {
    datepickerPopup: "dd/MM/yyyy",
    closeOnDateSelection: true,
    appendToBody: true,
    showButtonBar: false
}).constant('uibDatepickerConfig', {
    formatDay: 'dd',
    formatMonth: 'MMMM',
    formatYear: 'yyyy',
    formatDayHeader: 'EEE',
    formatDayTitle: 'MMMM yyyy',
    formatMonthTitle: 'yyyy',
    datepickerMode: 'day',
    minMode: 'day',
    maxMode: 'year',
    showWeeks: false,
    startingDay: 0,
    yearRange: 20,
    minDate: null,// mm/dd/yyyy
    maxDate: new Date()// mm/dd/yyyy
});

// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

/*userApp.filter('reverse', function() {
 return function(items) {
 return items.slice().reverse();
 };
 });*/

/*// Graph chart
 userApp.directive('hcGraph', function () {
 return {
 restrict: 'C',
 replace: true,
 scope: {
 graph: '=graph'
 },
 controller: function ($scope, $element, $attrs) {
 },
 template: '<div id="graph-container" style="margin: 0 auto;height: 300px">not working</div>',
 link: function (scope, element, attrs) {
 console.log(attrs);
 var chart = new Highcharts.Chart({
 chart: {
 renderTo: 'graph-container',
 plotBackgroundColor: null,
 plotBorderWidth: null,
 plotShadow: false
 },
 title: {
 text: 'Goal Graph',
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
 text: 'Weight '
 },
 plotLines: [{
 value: 0,
 width: 1,
 color: '#f8ba01'
 }]
 },
 tooltip: {
 valueSuffix: 'Kgs'
 },

 colors: [
 '#f8ba01'
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
 scope.$watch("graph", function (newValue) {
 //alert(newValue);
 chart.series[0].setData(newValue, true);
 }, true);

 }
 }
 });*/

// Graph chart
userApp.directive('historyGraph', function () {
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

userApp.directive('heightFoodBind', function() {
    return {
        link: function($scope, $element) {
            $scope.$watch(function() {
                setTimeout(function(){
                    var selectclass = $('.food');
                    if ($element.height()>parseInt($('.food_scrollbar').css('height'))) {
                        selectclass.css({"paddingRight":"15px"});
                    } else {
                        selectclass.css({"paddingRight":"3px"});
                    }
                }, 500);
            });
        }
    }
});

userApp.directive('heightExerciseBind', function() {
    return {
        link: function($scope, $element) {
            $scope.$watch(function() {
                setTimeout(function(){
                    var selectclass = $('.exercise');
                    if ($element.height()>parseInt($('.exercise-height').css('height'))) {
                        selectclass.css({"paddingRight":"15px"});
                    } else {
                        selectclass.css({"paddingRight":"3px"});
                    }
                }, 500);
            });
        }
    }
});

userApp.directive('shouldFocus', function(){
    return {
        restrict: 'A',
        link: function(scope,element,attrs){
            scope.$watch(attrs.shouldFocus,function(newVal,oldVal){
                if (newVal) {
                    element[0].scrollIntoView(false);
                }
            });
        }
    };
});

userApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


//File Type Validation Directive
userApp.directive('validateFileType',function(){
    var validFormats=['pdf','jpg','png','png'];
    return {
        require:'ngModel',
        link:function(scope,el,attrs,ngModel){
            el.bind('change',function(){
                var fileSize=el[0].files[0].size;
                var value = el.val(),
                    ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
                ngModel.$validators.validateFileType = function() {
                    return validFormats.indexOf(ext) !== -1;
                };

                ngModel.$validators.validateFileSize=function(){
                    return fileSize;
                };
            });
        }
    };
});

// Validation for file upload
userApp.directive('validFile',function(){
    return {
        require:'ngModel',
        link:function(scope,el,attrs,ngModel){
            //change event is fired when file is selected
            el.bind('change',function(){
            scope.$apply(function(){
                    ngModel.$setViewValue(el.val());
                    ngModel.$render();
                })
            })
        }
    }
});

//for dashboard side menu open functionaliteis
function slidemenu() {
    $('#sidemenu a').on('click', function(e){
        e.preventDefault();

        if($(this).hasClass('open')) {
            // do nothing because the link is already open
        } else {
            var oldcontent = $('#sidemenu a.open').attr('href');
            var newcontent = $(this).attr('href');

            $(oldcontent).fadeOut('fast', function(){
                $(newcontent).fadeIn().removeClass('hidden');
                $(oldcontent).addClass('hidden');
            });


            $('#sidemenu a').removeClass('open');
            $(this).addClass('open');
        }
    });
};
//for food and excersize popup
function modeltrigger() {
    $("#modal_trigger_food").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });
    $(function(){
        $(".common_model").show();
    });

    $("#modal_trigger_exercise").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });

    $(function(){
        $(".common_model").show();
    });

    $("#weight_button").click(function(){
        if($('#weight-form').css('right')=='0px'){
            $("#update-weight-form").slideToggle(800);
            $('#weight-form').animate({right:'-300px'},  500);
        }else{
            $('#weight-form').animate({right:'0px'},  500);
            $("#update-weight-form").slideToggle(300);
        }
    });
};

//for food intake and excersize tab content

function tabcontent() {
    $(".tab_content").show();

    $("ul.session li").click(function() {
        $("ul.session li").removeClass("active");
        $(this).addClass("active");
    });


    $(".tab_content").show();

    $("ul.graphs li").click(function() {
        $("ul.graphs li").removeClass("active");
        $(this).addClass("active");
    });

};

//for adivce tab coach carousel

function mouseover(e){
    e.setAttribute ('scrollamount', 0, 0);e.stop();
}

function mouseout(e){
    e.setAttribute ('scrollamount', 3, 0);e.start();
}

function coachAdviceCarousel(){
    setTimeout(function(){
        $('.advice-carousel').each(function(){

            var owl = jQuery(this),
                itemsNum = $(this).attr('data-appeared-items'),
                sliderNavigation = $(this).attr('data-navigation'),
                returnSliderNavigation,
                deskitemsNum,
                desksmallitemsNum,
                tabletitemsNum;

            if ( sliderNavigation == 'false' || sliderNavigation == '0' ) {
                returnSliderNavigation = false;
            }else {
                returnSliderNavigation = true;
            }
            if( itemsNum == 1) {
                deskitemsNum = 1;
                desksmallitemsNum = 1;
                tabletitemsNum = 1;
            }
            else if (itemsNum >= 2 && itemsNum < 4) {

                deskitemsNum = itemsNum;
                desksmallitemsNum = itemsNum - 1;
                tabletitemsNum = itemsNum - 1;
            }
            else if (itemsNum >= 4 && itemsNum < 8) {
                deskitemsNum = itemsNum -1;
                desksmallitemsNum = itemsNum - 2;
                tabletitemsNum = itemsNum - 3;
            }
            else {
                deskitemsNum = itemsNum -3;
                desksmallitemsNum = itemsNum - 6;
                tabletitemsNum = itemsNum - 8;
            }
            owl.owlCarousel({
                slideSpeed : 300,
                stopOnHover: true,
                autoPlay: false,
                navigation : returnSliderNavigation,
                pagination: false,
                lazyLoad : true,
                items : itemsNum,
                itemsDesktop : [1000,deskitemsNum],
                itemsDesktopSmall : [900,desksmallitemsNum],
                itemsTablet: [600,tabletitemsNum],
                itemsMobile : false,
                transitionStyle : "goDown"
            });
        });

        var controlls=$('.advice-carousel-style');
        controlls.find('.owl-prev').html('<i class="fa fa-angle-left"></i>');
        controlls.find('.owl-next').html('<i class="fa fa-angle-right"></i>');
    },500);
}




// userApp.config(['$compileProvider',
//     function ($compileProvider) {
//         $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|blob):/);
// }]);
// userApp.config(function($sceDelegateProvider) {
//   $sceDelegateProvider.resourceUrlWhitelist([
//     'https://cyberhealthweb.s3.amazonaws.com/**'
//   ]);
// });