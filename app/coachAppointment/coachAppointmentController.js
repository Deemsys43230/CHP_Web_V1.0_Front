var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angular-nicescroll','500tech.simple-calendar']);

coachApp.controller('AppointmentController',['$scope','requestHandler','Flash','$routeParams','$location','$filter',function($scope,requestHandler,Flash,$routeParams,$location,$filter) {

	$scope.activeClass.appointments='active';

  var date = new Date();
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
  var startDate = selectedDate;
 
  $scope.calendarOptions = {
    coachappointments:[],
    userappointments:[],
    userbookedappointments:[],
    notAvailableAppointments:[],
    dayNamesLength: 3, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
    dateClick: function(date){
      $scope.coachGetDateDetails(date);
     },
    nextMonth :function(monthIndex){
        var todayDate = new Date();
        $scope.fromDate=moment(new Date(todayDate.getFullYear(), monthIndex+1, 1)).format('DD/MM/YYYY');
        $scope.endDate=moment(new Date(todayDate.getFullYear(), monthIndex+2, 0)).format('DD/MM/YYYY');
        $scope.coachGetAppointmentList($scope.fromDate,$scope.endDate);
     },
    prevMonth :function(monthIndex){
        var todayDate = new Date();
        $scope.fromDate=moment(new Date(todayDate.getFullYear(), monthIndex-1, 1)).format('DD/MM/YYYY');
        $scope.endDate=moment(new Date(todayDate.getFullYear(), monthIndex, 0)).format('DD/MM/YYYY');
        $scope.coachGetAppointmentList($scope.fromDate,$scope.endDate);
     }

  };
  //Get Single Date Appointment Details
  $scope.coachGetDateDetails=function(date){
        var coachSelectedDate=moment(date).format('DD/MM/YYYY');
        $scope.calendarOptions.selectedDate=date;
        $scope.selectedDate= moment($scope.calendarOptions.selectedDate).format('DD/MM/YYYY');
        $scope.previousDate=0;
        $scope.cancelAppointment=true;

        //Convert into date format for comparison
        var startDateParts=startDate.split("/");
        var selectedDateParts=$scope.selectedDate.split("/");
        var startDate_date=new Date(startDateParts[2],startDateParts[1]-1,startDateParts[0]);
        var selectedDate_date=new Date(selectedDateParts[2],selectedDateParts[1]-1,selectedDateParts[0]);
        
        //Now compare the two converted date formats
        if(startDate_date>selectedDate_date){
          $scope.canEnableAppointment=true;
          $scope.cancelAppointment=false;
        }else{
          $scope.canEnableAppointment=false;
          $scope.cancelAppointment=true;
        }
        $scope.getAppointmentsParam={"fromdate":coachSelectedDate,"todate":coachSelectedDate};
        //Get Single date
        requestHandler.postRequest("coach/coachappointments/",$scope.getAppointmentsParam).then(function(response){
          $scope.enableAppointment=false;
          $scope.selectedDateAppointments= response.data.appointments;
          if($scope.selectedDateAppointments.length==0)
            $scope.enableAppointment=true;           
          else{
            $scope.userAppointmentList=$scope.selectedDateAppointments[0].users;
            $scope.appointmentsCount=$scope.selectedDateAppointments[0].count;
          }
            
        });
  };
  //Get Client Count Popup.
  $scope.appointmentPopup=function(){
      $(function(){
          $("#lean_overlay").fadeTo(1000);
          $("#appointmentCount").fadeIn(600);
          $(".common_model").show();
          $scope.reset();
      });

      $(".modal_close").click(function(){
          $(".common_model").hide();
          $("#appointmentCount").hide();
          $("#lean_overlay").hide();
          $scope.reset();
      });

      $("#lean_overlay").click(function(){
          $(".common_model").hide();
          $("#appointmentCount").hide();
          $("#lean_overlay").hide();
          $scope.reset();
      });
  };

  $scope.coachScheduleAppointment= function(){
        var bookingDate=$scope.calendarOptions.selectedDate;
        var formattedBookingDate=moment(bookingDate).format('DD/MM/YYYY');
        $scope.booking.date=formattedBookingDate;
        requestHandler.postRequest("coach/createappointment/", $scope.booking).then(function(response){
            successMessage(Flash,"Successfully Scheduled");
            $scope.coachGetAppointmentList($scope.fromDate,$scope.endDate);
            $scope.coachGetDateDetails($scope.calendarOptions.selectedDate);
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
   };

   $scope.doDeleteAppointment=function(){
     
       requestHandler.postRequest("coach/deleteappointment/",{"appointmentid": $scope.selectedDateAppointments[0].id}).then(function(response){
            successMessage(Flash,"Successfully Cancelled");
            $scope.coachGetAppointmentList($scope.fromDate,$scope.endDate);
            $scope.coachGetDateDetails($scope.calendarOptions.selectedDate);
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
   }

  $scope.coachGetAppointmentList=function(fromDate,endDate){
       
        $scope.getAppointmentsParam={"fromdate":fromDate,"todate":endDate};

        requestHandler.postRequest("coach/coachappointments/",$scope.getAppointmentsParam).then(function(response){
          $scope.appointments= response.data.appointments;
          $scope.coachappointments=[];
          $.each($scope.appointments,function(index,value){
            var processingDate=value.date.split('/');
            $scope.coachappointments.push(parseInt(processingDate[0])+"/"+(parseInt(processingDate[1])-1)+"/"+parseInt(processingDate[2]));
          });
          $scope.calendarOptions.coachappointments=$scope.coachappointments;
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
  };

// Check max clients count
  $scope.maxClientCount=false;
  $scope.maxClientCountCheck=function(value){
    if(value<=999){
        $scope.maxClientCount=false;
    }
    else if(value>999){
        $scope.maxClientCount=true;
    }
  };

   $scope.reset=function(){
      $scope.booking={};
      $scope.booking.count="";
      $scope.bookingForm.$setPristine();
   };

    //Intialization
    $scope.init=function(){
      $scope.currentDate= moment(new Date()).format('DD/MM/YYYY');
      $scope.booking={};

      var todayDate = new Date();
      $scope.fromDate=moment(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1)).format('DD/MM/YYYY');
      $scope.endDate=moment(new Date(todayDate.getFullYear(), todayDate.getMonth()+1, 0)).format('DD/MM/YYYY');
      //Load Whole Month Appointments  
      $scope.coachGetAppointmentList($scope.fromDate,$scope.endDate);
      //Load Single Date Appointments User list
      $scope.coachGetDateDetails($scope.fromdate);
    };

    $scope.init();

}]);

// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

