var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','ngAnimate','requestModule','angular-svg-round-progress']);
userApp.controller('UserMainDashboardController',['$scope','requestHandler','$rootScope','$location','roundProgressService',function($scope,requestHandler,$rootScope,$location,roundProgressService) {
    $rootScope.isMenuShow=1;
    $scope.doGetHistoryReport=function(id)  {
        var endDate=selectedDate;
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var diabeticReport = [];
        var graphDates = [];
        var graphTitles = {};
        if(id==1){
            requestHandler.postRequest("user/getWearableDataGraph/", {"startdate": startDate, "enddate": endDate}).then(function (response) {
                $scope.diabeticRecord = response.data.wearable;
                $.each($scope.diabeticRecord, function (index, value) {
                    var diabeticHistory = [];
                    var date = value.date.split("/");
                    diabeticHistory.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticHistory.push(parseFloat(value.fastingbloodglucose));
                    graphDates.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticReport.push(diabeticHistory);
                });
                graphTitles.title = "Fasting Blood Glucose Graph( " + startDate + " - " + endDate + " )";
                graphTitles.name = "Glucose level";
                graphTitles.yaxis = "Glucose level (mg/dl)";
                graphTitles.xaxis = "Date Range";
                graphTitles.color = '#3366cc';
                graphTitles.suffix =' mm/dl';
                $scope.drawBloodGlucoseGraph(diabeticReport, graphTitles, graphDates);
            });
        }
        else if(id==2){
            requestHandler.postRequest("user/getWearableDataGraph/", {"startdate": startDate, "enddate": endDate}).then(function (response) {
                $scope.diabeticRecord = response.data.wearable;
                $.each($scope.diabeticRecord, function (index, value) {
                    var diabeticHistory = [];
                    var date = value.date.split("/");
                    diabeticHistory.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticHistory.push(parseFloat(value.randombloodglucose));
                    graphDates.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticReport.push(diabeticHistory);
                });
                graphTitles.title = "Random Blood Glucose Graph( " + startDate + " - " + endDate + " )";
                graphTitles.name = "Glucose level";
                graphTitles.yaxis = "Glucose level (mg/dl)";
                graphTitles.xaxis = "Date Range";
                graphTitles.color = '#339966';
                graphTitles.suffix =' mm/dl';
                $scope.drawBloodGlucoseGraph(diabeticReport, graphTitles, graphDates);
            });
        }
       else if(id==3){
            requestHandler.postRequest("user/getWearableDataGraph/", {"startdate": startDate, "enddate": endDate}).then(function (response) {
                $scope.diabeticRecord = response.data.wearable;
                $.each($scope.diabeticRecord, function (index, value) {
                    var diabeticHistory = [];
                    var date = value.date.split("/");
                    diabeticHistory.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticHistory.push(parseFloat(value.postprandialbloodglucose));
                    graphDates.push(monthNames[(date[1] - 1)] + ' ' + date[0]);
                    diabeticReport.push(diabeticHistory);
                });
                graphTitles.title = "Postprandial Blood Glucose Graph( " + startDate + " - " + endDate + " )";
                graphTitles.name = "Glucose level";
                graphTitles.yaxis = "Glucose level (mg/dl)";
                graphTitles.xaxis = "Date Range";
                graphTitles.color = '#e67300';
                graphTitles.suffix =' mm/dl';
                $scope.drawBloodGlucoseGraph(diabeticReport, graphTitles, graphDates);
            });
        }
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
            $scope.firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            $scope.lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
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

    //for water log millilitre unit graph
    $scope.drawBloodGlucoseGraph=function(databg,graphTitles,dataD){
        console.log(databg);
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
        $scope.doGetHistoryReport(1);
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