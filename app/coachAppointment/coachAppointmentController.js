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
    dayNamesLength: 3, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
    dateClick: function(date){
      $scope.scheduleAppointmentDate(date)
     }
  };

	$scope.scheduleAppointmentDate = function(date){
        $scope.currentDate= moment(date).format('DD/MM/YYYY');
        $scope.calendarOptions.selectedDate=date;
        $scope.previousDate= 0;
        if($scope.currentDate<startDate){
          $scope.previousDate=$scope.currentDate;
        }
        $scope.coachGetAppointmentList();
        $scope.bookingList=false;
        return $scope.currentDate;
   };

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
        $scope.booking.date= $scope.currentDate;
        requestHandler.postRequest("coach/createappointment/", $scope.booking).then(function(response){
            successMessage(Flash,"Successfully Scheduled");
            $scope.coachGetAppointmentList();
            $scope.bookingList=true;
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
   };

  $scope.coachGetAppointmentList=function(){
        $scope.enableAppointment=false;
        $scope.showAppointmentCount=false;
        $scope.getAppointmentsParam={"fromdate":$scope.currentDate,"todate":$scope.currentDate};
        requestHandler.postRequest("coach/coachappointments/",$scope.getAppointmentsParam).then(function(response){
          $scope.appointments= response.data.appointments;

          if($scope.appointments==""){
              $scope.enableAppointment=true;
            }
          $.each($scope.appointments,function(index,value){
            if(value.users.appointmentid==$scope.appointments.id){
              $scope.userAppointmentList= angular.copy(value.users);
              $scope.enableAppointment=false;
              $scope.bookingList=true;
              
              if($scope.userAppointmentList.length>0){
                $scope.showAppointmentCount=true;
                $scope.appointmentsCount=$scope.userAppointmentList.length;
              }
            }
          });

        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
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
      $scope.coachGetAppointmentList();
    };

    $scope.init();

}]);

// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

