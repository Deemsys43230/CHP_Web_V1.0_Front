var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll']);

coachApp.controller('EventController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {

	$scope.activeClass.events='active';

	daterangepicker();

    /*Do get All Event Deatils By Coach*/

    //To Display current date
    
     var options = {
            minDate: new Date(),
            singleDatePicker: true,
            opens:'left',
            showDropdowns: true
        };

        $('#event-date').daterangepicker(options, function(start, end, label) {
            document.getElementById("event-start-date").value = start.format('DD/MM/YYYY');
        });
        

	$scope.doGetEventsByCoach = function(){
       if($('#history-end').val()==''){
            //Always Start date for a week
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

            //Always end date for a week
            var toDate=new Date();
                toDate.setDate(toDate.getDate()+6);

            var dd = toDate.getDate();
            var mm = toDate.getMonth()+1; //January is 0!

            var yyyy = toDate.getFullYear();
            if(dd<10){
                dd='0'+dd
            }
            if(mm<10){
                mm='0'+mm
            }
            toDate = dd+'/'+mm+'/'+yyyy;
            var endDate = toDate;
            
                startDate = startDate;
                endDate = endDate;
        }
        else{
            startDate = $('#history-start').val();
            endDate = $('#history-end').val();
        }
		requestHandler.postRequest("coach/getevents/",{"fromdate":startDate,"todate":endDate}).then(function(response){
			$scope.eventList= response.data.events;
            //For Event duration calculation in hrs and min
            $.each($scope.eventList,function(index,value){
                value.durationHours=Math.floor(value.duration/60).toString();
                value.durationMinutes=Math.floor(value.duration%60).toString();

                if(value.durationHours == 0){
                    value.duration=value.durationMinutes +" Mins";
                }
                else if(value.durationMinutes == 0){
                    value.duration = value.durationHours +" Hrs";
                }
                else if( value.durationMinutes != 0 && value.durationHours != 0){
                    value.duration=value.durationHours +" Hrs "+value.durationMinutes +" Mins ";
                }
            });
            $scope.loaded=false;
            $scope.paginationLoad=true;
		});
	};


    /*Do Delete Event By Coach*/
    $scope.doDeleteEvent = function(){
        requestHandler.postRequest("coach/deleteevent/",{"id":$scope.eventId}).then(function(response){
            $scope.result= response.data.Response;
            if(response.data.Response == "Success"){
                $scope.doGetEventsByCoach();
                successMessage(Flash, "Successfully Event Deleted!");
            }
        });
    };

    //Alert Delete Model
    $scope.deleteModel=function(Id){
        $scope.eventId = Id;
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

    /*For do Insert Events*/
    if(!$routeParams.id){
        $scope.isAdd=1;
        $scope.eventTitle="Add Event";
    }
    else{
        $scope.isAdd=0;
        $scope.eventTitle="Edit Event";
    }

    //TO check Maximum digits validation for training plan amount
    $scope.duration=true;

    $scope.durationCheck = function(){
        if($scope.eventDetails.durationHours ==0 && $scope.eventDetails.durationMinutes == 0){
            $scope.duration=true;
        }
        else{
            $scope.duration=false;
        }
        
    }

    $scope.doInsertOrUpdateEvents = function(){
        var datetime = "";
        if($('#event-start-date').val!=''){
            var datetime = $('#event-start-date').val();
        }
        $scope.eventDetails.id=null;
        $scope.eventDetails.datetime=datetime;
        $scope.eventDetails.duration=parseInt($scope.eventDetails.durationHours*60)+ parseInt($scope.eventDetails.durationMinutes);
        requestHandler.postRequest("coach/insertorupdateevent/",$scope.eventDetails).then(function(response){
			// $scope.result= response.data.Response;
			if(response.data.Response == "Success"){
				$location.path("events");
				// $scope.doGetEventsByCoach();
                successMessage(Flash, "Successfully Event Added!");
			}
        });
    };


	
    //Intialization

    $scope.init = function(){
        
    	$scope.doGetEventsByCoach();
    };


    $scope.init();


}]);

coachApp.controller('EventEditController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {


    $scope.activeClass.events='active';
        

    /*Do Edit event Details By coach*/
    $scope.doGetIndividualEvent = function(eventId){
        requestHandler.postRequest("eventdetail/",{"id":eventId}).then(function(response){
            $scope.eventDetails = response.data.event;
            $scope.eventDetails.durationHours=Math.floor(($scope.eventDetails.duration/60)).toString();
            $scope.eventDetails.durationMinutes=Math.floor($scope.eventDetails.duration%60).toString();   
        });
    };

    /*Do view event Details By coach*/
    $scope.doViewIndividualEvent = function(eventId){
        requestHandler.postRequest("eventdetail/",{"id":eventId}).then(function(response){
            $scope.eventDetail = response.data.event;
            $scope.eventDetail.durationHours=Math.floor(($scope.eventDetail.duration/60)).toString();
            $scope.eventDetail.durationMinutes=Math.floor($scope.eventDetail.duration%60).toString();

            if($scope.eventDetail.durationHours == 0){
                $scope.eventDetail.duration=$scope.eventDetail.durationMinutes +" Mins";
            }
            else if($scope.eventDetail.durationMinutes == 0){
                $scope.eventDetail.duration = $scope.eventDetail.durationHours +" Hrs";
            }
            else if( $scope.eventDetail.durationHours != 0 &&  $scope.eventDetail.durationMinutes != 0){
                $scope.eventDetail.duration=$scope.eventDetail.durationHours +" Hrs "+ $scope.eventDetail.durationMinutes +" Mins ";
            }
        });
    };

    /*For edit Updation */

    $scope.doUpdateEvent =function(eventId){
        $scope.eventDetails.duration=parseInt($scope.eventDetails.durationHours*60)+ parseInt($scope.eventDetails.durationMinutes);
        requestHandler.postRequest("coach/insertorupdateevent/",$scope.eventDetails).then(function(response){
        $scope.result= response.data.Response;
            if(response.data.Response == "Success"){
                $location.path("events");
                successMessage(Flash, "Successfully Event Updated!");
            }
        });
    };  

    /*For do Insert Events*/
    if(!$routeParams.id){
        $scope.isAdd=1;
        $scope.eventTitle="Add Event";
    }
    else{
        $scope.isAdd=0;
        $scope.eventTitle="Edit Event";
    }

     //TO check Maximum digits validation for training plan amount
    $scope.duration=false;

    $scope.durationCheck = function(){
        if($scope.eventDetails.durationHours ==0 && $scope.eventDetails.durationMinutes == 0){
            $scope.duration=true;
        }
        else{
            $scope.duration=false;
        }
        
    }
        //For Event Attendees View Event

    $scope.doGetAttendees = function(eventId){
        requestHandler.postRequest("coach/eventattendees/",{"id":eventId}).then(function(response){
            $scope.attendees = response.data.attendees;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        });
    };

     $scope.init = function(){
        
        $scope.doGetIndividualEvent($routeParams.id);
        $scope.doViewIndividualEvent($routeParams.id);
        $scope.doGetAttendees($routeParams.id);
    };


    $scope.init();

}]);
