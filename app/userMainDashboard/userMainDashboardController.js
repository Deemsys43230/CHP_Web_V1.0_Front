var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','ngAnimate','requestModule','angular-nicescroll','angular-svg-round-progress']);
userApp.controller('UserMainDashboardController',['$scope','requestHandler','$rootScope','$location','roundProgressService','$window','Flash',function($scope,requestHandler,$rootScope,$location,roundProgressService,$window,Flash) {
    $rootScope.isMenuShow=1;
    $scope.isConnectWearable=false;
    $scope.doGetHistoryReport=function(id)  {
        var endDate=selectedDate;
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var diabeticReport = [];
        var graphDates = [];
        var graphTitles = {};
        if(id==1){
            requestHandler.postRequest("user/getWearableDataGraph/", {"startdate": firstDay, "enddate": lastDay}).then(function (response) {
                $scope.diabeticRecord = response.data.wearable;
                $.each($scope.diabeticRecord, function (index, value) {
                    var diabeticHistory = [];
                    var date = value.date.split("/");
                    diabeticHistory.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticHistory.push(parseFloat(value.fastingbloodglucose));
                    graphDates.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticReport.push(diabeticHistory);
                });
                graphTitles.title = "Fasting Blood Glucose Graph( " + firstDay + " - " + lastDay + " )";
                graphTitles.name = "Glucose level";
                graphTitles.yaxis = "Glucose level (mg/dl)";
                graphTitles.xaxis = "Date Range";
                graphTitles.color = '#3366cc';
                graphTitles.suffix =' mm/dl';
                $scope.drawBloodGlucoseGraph(diabeticReport, graphTitles, graphDates);
            });
        }
        else if(id==2){
            requestHandler.postRequest("user/getWearableDataGraph/", {"startdate": firstDay, "enddate": lastDay}).then(function (response) {
                $scope.diabeticRecord = response.data.wearable;
                $.each($scope.diabeticRecord, function (index, value) {
                    var diabeticHistory = [];
                    var date = value.date.split("/");
                    diabeticHistory.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticHistory.push(parseFloat(value.randombloodglucose));
                    graphDates.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticReport.push(diabeticHistory);
                });
                graphTitles.title = "Random Blood Glucose Graph( " + firstDay + " - " + lastDay + " )";
                graphTitles.name = "Glucose level";
                graphTitles.yaxis = "Glucose level (mg/dl)";
                graphTitles.xaxis = "Date Range";
                graphTitles.color = '#339966';
                graphTitles.suffix =' mm/dl';
                $scope.drawBloodGlucoseGraph(diabeticReport, graphTitles, graphDates);
            });
        }
       else if(id==3){
            requestHandler.postRequest("user/getWearableDataGraph/", {"startdate": firstDay, "enddate": lastDay}).then(function (response) {
                $scope.diabeticRecord = response.data.wearable;
                $.each($scope.diabeticRecord, function (index, value) {
                    var diabeticHistory = [];
                    var date = value.date.split("/");
                    diabeticHistory.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticHistory.push(parseFloat(value.postprandialbloodglucose));
                    graphDates.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticReport.push(diabeticHistory);
                });
                graphTitles.title = "Postprandial Blood Glucose Graph( " + firstDay + " - " + lastDay + " )";
                graphTitles.name = "Glucose level";
                graphTitles.yaxis = "Glucose level (mg/dl)";
                graphTitles.xaxis = "Date Range";
                graphTitles.color = '#e67300';
                graphTitles.suffix =' mm/dl';
                $scope.drawBloodGlucoseGraph(diabeticReport, graphTitles, graphDates);
            });
        }
       else if(id==4){
            requestHandler.postRequest("user/getWearableDataGraph/", {"startdate": firstDay, "enddate": lastDay}).then(function (response) {
                $scope.diabeticRecord = response.data.wearable;
                $.each($scope.diabeticRecord, function (index, value) {
                    var diabeticHistory = [];
                    var date = value.date.split("/");
                    diabeticHistory.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticHistory.push(parseFloat(value.HbA1c));
                    graphDates.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticReport.push(diabeticHistory);
                });
                graphTitles.title = "HBA1c Graph( " + firstDay + " - " + lastDay + " )";
                graphTitles.name = "HBA1c value";
                graphTitles.yaxis = "HBA1c value (%)";
                graphTitles.xaxis = "Date Range";
                graphTitles.color = '#ff884d';
                graphTitles.suffix =' %';
                $scope.drawBloodGlucoseGraph(diabeticReport, graphTitles, graphDates);
            });
        }
        };
    $scope.doGetUserKeyDetails=function() {
        $scope.loaded=true;
        requestHandler.getRequest("user/keydetails/", "").then(function (response) {
            $scope.userKeyDetails = response.data;
            $scope.loaded=false;
            if ($scope.userKeyDetails.diabeticstatus == 1) {
                $rootScope.isDiabetic = 1;
                $scope.isDiabeticPerson = 1;
            }
            else {
                $('#user-dashboard-height').css({'height':'945px'});
            }
        });
    };
    // to get user details
    $scope.doGetUserPersonalDetails=function(){
        $scope.isShowOverlayContent=false;
        requestHandler.getRequest("getUserId/","").then(function(response){
            $scope.userPersonalDetails=response.data.User_Profile;
            $scope.userDemographyDetails=response.data.demography;
                if($scope.userDemographyDetails.userPlanType==4){
                    $scope.isShowOverlayContent=true;
                    $('#overlay_content').addClass('user-dashboard-overlay');
                }
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
        var startdatetime= selectedDate +' '+'00' + ':'+ '00'+':'+'00';
    // to get current month strt date and end date
    var date=new Date();
    var firstDay=moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('DD/MM/YYYY');
    var lastDay=moment(new Date(date.getFullYear(), date.getMonth()+1, 0)).format('DD/MM/YYYY');

    //To display next one week
    function geNextWeek(){
        var currrentDay = new Date();
        $scope.firstDate = new Date(currrentDay.getFullYear(), currrentDay.getMonth(), 1);
        $scope.lastDate = new Date(currrentDay.getFullYear(), currrentDay.getMonth() + 1, 0);
        var nextWeek = new Date(currrentDay.getFullYear(), currrentDay.getMonth(), currrentDay.getDate() + 30);
        return nextWeek ;
    }

    var  nextWeek= geNextWeek();
    var nextWeekMonth = nextWeek.getMonth() + 1;
    var nextWeekDay = nextWeek.getDate();
    var nextWeekYear = nextWeek.getFullYear();
    var nextWeekDisplay = nextWeekMonth + "/" + nextWeekDay + "/" + nextWeekYear;
    var nextWeekDisplayPadded = ("00" + nextWeekDay.toString()).slice(-2)+ "/" + ("00" + nextWeekMonth .toString()).slice(-2)+ "/" + ("0000" + nextWeekYear .toString()).slice(-4);
    var nextWeekDate=nextWeekDisplayPadded;
    var enddatetime=nextWeekDate +' ' +'23' + ':'+ '59'+':'+'59';

    // to check wearable devices connected or disconnected
    $scope.doSyncDevices=function(){
        requestHandler.postRequest("user/syncWearableData/",{"date":selectedDate}).then(function(response){
            if(response.data.Response_status==0){
                $scope.isConnectWearable=true;
                $('#overlay_sync_content').addClass('user-dashboard-overlay');
            }
        },function () {
            errorMessage(Flash, "Please try again later!")
        });
    };
    // to redirect dashboard menu
    $scope.menuUrlChange=function(id){
        $rootScope.isMenuClicked=id;
        $location.path('/dashboard');
    };
   //To get vitals activity
    $scope.doGetWearableData = function(){
        return requestHandler.postRequest("user/getWearableDataForDate/",{"date": selectedDate}).then(function(response) {
            $scope.wearable=response.data.wearable;
        });
    };

    //do get doctor Appointment list
    $scope.userGetAllAppointments=function(){
        var userStartDate=startdatetime;
        var userEndDate=enddatetime;
        $scope.getAppointmentsParam={"fromdate":userStartDate,"todate":userEndDate};
        //Get Single date
        requestHandler.postRequest("user/getdoctorappointmentlist/",$scope.getAppointmentsParam).then(function(response){
            $scope.appointmentList= response.data.list;
            $scope.userAppointments=[];
            $.each($scope.appointmentList,function(index,value){
                $.each(value.appointments,function(appointmentindex,appointmentvalue){
                    $scope.userAppointments.push(appointmentvalue)
                });
            });
        });
    };

    // to delete user appointment
    $scope.doDeleteDoctorAppointment=function(id){
        if(confirm("Are you sure you want to delete?")){
            requestHandler.postRequest("user/deletedoctorappointment/",{"logid":id}).then(function(response){
                Flash.create('success', "Successfully Deleted", 'alert');
                $scope.userGetAllAppointments();
            }, function(){
                errorMessage(Flash,"Please try again later!");
            });
        }
    };
    //Budget value
    $scope.getUserBudget=function(){
        requestHandler.postRequest("user/getTotalCalorieDetailForDate/",{"date":selectedDate}).then(function(response){
            $scope.budgetDetails = response.data.BudgetDetail;
            $scope.Budget = $scope.budgetDetails.Budget;
            $scope.Net = $scope.budgetDetails.Net;
            var netvalue=   $scope.Net.toString();
            $window.targetBudget = $scope.Budget;
            $window.currentNet = $scope.Net;
            refreshGraph();
            $scope.actualNet=netvalue.replace(/[\-\^\$\|]/g, '');
            $scope.actualNet=parseFloat($scope.actualNet);
            $scope.userIntake=$scope.budgetDetails.Intake;
            $scope.userBurnt=$scope.budgetDetails.Burnt;
            var burntvalue=  $scope.userBurnt.toString();
            $scope.burnt= burntvalue.replace(/[\-\^\$\|]/g, '');
            $scope.burnt=parseFloat($scope.burnt);
            if($scope.budgetDetails.OverorUnderStatus==1){
                $scope.currentGainColour="red";
            }
            else if($scope.budgetDetails.OverorUnderStatus==2){
                $scope.currentGainColour="limegreen";
            }
        });

    };

    //for water log millilitre unit graph
    $scope.drawBloodGlucoseGraph=function(databg,graphTitles,dataD){
        $('#bloodglucosegraph').highcharts({
            title: {
                text: graphTitles.title
            },
            chart: {
                type: 'column'
            },
            xAxis: {
                title: {
                    text: graphTitles.xaxis
                },
                categories: dataD
            },
            tooltip:{
                enabled:true,
                backgroundColor:'rgba(255, 255, 255, 1)',
                borderWidth:1,
                shadow:true,
                style:{fontSize:'10px',padding:5,zIndex:500},
                formatter:false,
                valueSuffix: graphTitles.suffix
            },
            yAxis: {
                title: {
                    text: graphTitles.yaxis
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color:graphTitles.color
                }]
            },
            colors: [
                graphTitles.color
            ],
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },

            legend:{enabled:false},
            series: [{
                type: graphTitles.graphType,
                name: graphTitles.name,
                data: databg

            }]
        });
    };
    $scope.init=function(){
        $scope.doGetHistoryReport(4);
        $scope.doGetUserKeyDetails();
        $scope.doGetWearableData();
        $scope.userGetAllAppointments();
        $scope.getUserBudget();
        $scope.doGetUserPersonalDetails();
        $scope.doSyncDevices();
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
    $scope.init();
}]);