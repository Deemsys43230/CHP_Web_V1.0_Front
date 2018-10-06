var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angular-nicescroll','angularUtils.directives.dirPagination','ui.bootstrap','500tech.simple-calendar']);

userApp.controller('UserDoctorAppointment',['$scope','requestHandler','Flash','$rootScope',function($scope,requestHandler,Flash,$rootScope) {
    $rootScope.isMenuShow=1;
    $scope.activeClass.doctorAppointment='active';
    $scope.selectedMinutes=0;
    $scope.selectedHours=0;
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    date = dd+'/'+mm+'/'+yyyy;
    var todayDate = date;
    $scope.calendarOptions = {
        coachappointments:[],
        getdoctorappointmentlist:[],
        userappointments:[],
        userbookedappointments:[],
        notAvailableAppointments:[],
        userAppointmentCancelableDate:[],
        dayNamesLength: 3, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
        dateClick: function(date){
            $scope.userGetDateDetails(date);
        },
        nextMonth :function(monthIndex){
            var todayDate = new Date();
            $scope.fromDate=moment(new Date(todayDate.getFullYear(), monthIndex+1, 1)).format('DD/MM/YYYY 00:00:00');
            $scope.endDate=moment(new Date(todayDate.getFullYear(), monthIndex+2, 0)).format('DD/MM/YYYY 23:59:59');
            $scope.doGetDoctorAppointmentList();
        },
        prevMonth :function(monthIndex){
            var todayDate = new Date();
            $scope.fromDate=moment(new Date(todayDate.getFullYear(), monthIndex-1, 1)).format('DD/MM/YYYY 00:00:00');
            $scope.endDate=moment(new Date(todayDate.getFullYear(), monthIndex, 0)).format('DD/MM/YYYY 23:59:59');
            $scope.doGetDoctorAppointmentList();
        }

    };
    $scope.dateClick=function(date){
        $scope.calendarOptions.selectedDate=date;
    };


    //Get Single Date Appointment Details
    $scope.userGetDateDetails=function(date){
        var userSelectedDate=moment(date).format('DD/MM/YYYY 00:00:00');
        var userSelectedEndDate=moment(date).format('DD/MM/YYYY 23:59:59');
        $scope.calendarOptions.selectedDate=date;
        $scope.selectedDate= moment($scope.calendarOptions.selectedDate).format('DD/MM/YYYY');
        $scope.previousDate=0;
        // date comparision to hide book appointment for previous date
        var startDateParts=todayDate.split("/");
        var selectedDateParts=$scope.selectedDate.split("/");
        var startDate_date=new Date(startDateParts[2],startDateParts[1]-1,startDateParts[0]);
        var selectedDate_date=new Date(selectedDateParts[2],selectedDateParts[1]-1,selectedDateParts[0]);
        //Now compare the two converted date formats
        if(startDate_date>selectedDate_date){
            $scope.canEnableAppointment=true;
        }else{
            $scope.canEnableAppointment=false;
        }

        $scope.getAppointmentsParam={"fromdate":userSelectedDate,"todate":userSelectedEndDate};
        //Get Single date
        requestHandler.postRequest("user/getdoctorappointmentlist/",$scope.getAppointmentsParam).then(function(response){
            $scope.appointmentList= response.data.list;
            $scope.selectedDateAppointment= $scope.appointmentList[0].appointments;
         /*   $scope.userGetAllDateDetails($scope.fromDate,$scope.endDate);*/
        });
    };

    //to get current time
    var currentdatetime=new Date();
    var hours=currentdatetime.getHours();
    var minutes=currentdatetime.getMinutes();
    var seconds=currentdatetime.getSeconds();
    currentdatetime = hours+':'+minutes+':'+seconds;
    var options = {
        autoApply: true,
        minDate : new Date,
        singleDatePicker:true,
        autoclose: true,
        todayHighlight: false,
        timePicker:true,
        startDate: moment().startOf('hour'),
        timePicker24Hour:true,
        timePickerSeconds:true,
        locale: {
            format: 'DD/MM/YYYY HH:mm:ss'
        }

    };

    //do get doctor Appointment list
    $scope.userGetAllDateDetails=function(fromDate,endDate){
        var userStartDate=fromDate;
        var userEndDate=endDate;
        $scope.getAppointmentsParam={"fromdate":userStartDate,"todate":userEndDate};
        //Get Single date
        requestHandler.postRequest("user/getdoctorappointmentlist/",$scope.getAppointmentsParam).then(function(response){
            $scope.appointmentList= response.data.list;
            $scope.coachappointments=[];

            $.each($scope.appointmentList,function(index,value){
                if(value.appointments.length!=0) {
                    var processingDate=value.date.split('/');
                    var formattedDate=parseInt(processingDate[0])+"/"+(parseInt(processingDate[1])-1)+"/"+parseInt(processingDate[2]);
                    $scope.coachappointments.push(formattedDate);
                }
            });
            $scope.calendarOptions.coachappointments=$scope.coachappointments;
        });
    };


    $scope.doGetDoctorAppointmentList=function(){
        $scope.previousDate=0;
        $scope.userGetAllDateDetails($scope.fromDate,$scope.endDate);
    };
    // book Appointment modal
    $scope.userBookDoctorAppointment=function(){
        $scope.userAppointments={};
        //to set selected date as date in datepicker
        $scope.selectedMinutes='';
        $scope.selectedHours='';
        $scope.userAppointments.datetime=$scope.selectedDate + ' '+ currentdatetime;
        options.startDate=$scope.userAppointments.datetime;
        $('#set-appointment-date').daterangepicker(options);
        $scope.userDoctorAppointmentForm.$setPristine();
        $scope.isNew = true;
        $scope.title = "Add Appointment";
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#user-doctor-appointment").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#user-doctor-appointment").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#user-doctor-appointment").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

    };
    //user book doctor appointment
    $scope.doBookDoctorAppointment=function(){
        if($scope.isNew==false){
            $scope.userAppointments.logid=$scope.userAppointments.logid;
        }
        else{
            $scope.userAppointments.logid="";
        }
        $scope.userAppointments.datetime=  $scope.selectedDate+' '+$scope.selectedHours+':'+$scope.selectedMinutes+':'+'00';
        if ($scope.userAppointments.clinicname=="") {
            $scope.userAppointments.clinicname=null;
        }
        else{
            $scope.userAppointments.clinicname=$scope.userAppointments.clinicname;
        }
        requestHandler.postRequest("user/insertorupdatedoctorappointment/",$scope.userAppointments).then(function(response){

            $(".common_model").hide();
            $("#user-doctor-appointment").hide();
            $("#lean_overlay").hide();
            $scope.userGetDateDetails($scope.calendarOptions.selectedDate);
            $scope.doGetDoctorAppointmentList();
            if($scope.isNew==false){
                successMessage(Flash,"Successfully Updated");
            }
            else{
                successMessage(Flash,"Successfully Booked");
            }
            $scope.loaded=false;
            $scope.paginationLoad=true;
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });

    };
    $scope.doEditBookedAppointment=function(id){
        $scope.userAppointments={};
        $scope.isNew = false;
        $scope.title = "Edit Appointment";

        //to set selected date as date in datepicker
        $scope.userAppointments.datetime=$scope.selectedDate + ' '+ currentdatetime;
        options.startDate=$scope.userAppointments.datetime;
        $('#set-appointment-date').daterangepicker(options);
        requestHandler.postRequest("user/getdoctorappointmentdetail/",{"logid":id}).then(function(response){
            $scope.userAppointments=response.data.medication;
            var datetime=$scope.userAppointments.datetime;
            var a =  datetime.split(" ");
            var date = a[0];
            var time = a[1];
            var splitime=time.split(":");
            var hours=splitime[0];
            var minutes=splitime[1];
            $scope.selectedHours=hours;
            $scope.selectedMinutes=minutes;
            $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#user-doctor-appointment").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#user-doctor-appointment").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#user-doctor-appointment").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
        });
    };
    $scope.doDeleteDoctorAppointment=function(id){
        if(confirm("Are you sure you want to delete?")){
            requestHandler.postRequest("user/deletedoctorappointment/",{"logid":id}).then(function(response){
                successMessage(Flash,"Successfully Deleted");
                $scope.userGetDateDetails($scope.calendarOptions.selectedDate);
                $scope.doGetDoctorAppointmentList();
            }, function(){
                errorMessage(Flash,"Please try again later!");
            });
        }
    };

    $scope.init=function () {
        $scope.userGetDateDetails($scope.calendarOptions.selectedDate);
        /*For get all date appointments Details*/
        var todayDate = new Date();
        $scope.fromDate=moment(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1)).format('DD/MM/YYYY 00:00:00');
        $scope.endDate=moment(new Date(todayDate.getFullYear(), todayDate.getMonth()+1, 0)).format('DD/MM/YYYY 23:59:59');
        $scope.doGetDoctorAppointmentList();

    };

    $scope.init();

}]);

