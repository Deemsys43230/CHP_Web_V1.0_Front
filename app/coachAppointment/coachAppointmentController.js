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
    defaultDate: new Date(),
    dayNamesLength: 3, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
    dateClick: function(date){
      $scope.scheduleAppointmentDate(date)
  }
  };


	$scope.scheduleAppointmentDate = function(date){
        $scope.currentDate= moment(date).format('DD/MM/YYYY');
         console.log("Start Date",startDate);
        $scope.previousDate= 0;
        if($scope.currentDate<startDate){
          $scope.previousDate=$scope.currentDate;
          console.log($scope.previousDate);
        }
        
        $scope.enableAppointment=true;
        $scope.bookingList=false;
        return $scope.currentDate;
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
        $scope.getAppointmentsParam={"fromdate":$scope.currentDate,"todate":$scope.currentDate};
        requestHandler.postRequest("coach/coachappointments/",$scope.getAppointmentsParam).then(function(response){
          $scope.appointments= response.data.appointments;
          $.each($scope.appointments,function(index,value){
            if(value.users.appointmentid==$scope.appointments.id){
              $scope.userAppointmentList= angular.copy(value.users);
            }
          });

          $scope.bookingList=true;
          $scope.enableAppointment=false;
          $scope.scheduleAppointment=false;
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
      $scope.enableAppointment=true;
      $scope.scheduleAppointment=false;
      $scope.booking={};
    }
    $scope.init();

}]);

// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

