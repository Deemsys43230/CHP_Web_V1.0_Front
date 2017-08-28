var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll']);

coachApp.controller('EventController',['$scope','requestHandler','Flash','$routeParams','$location',function($scope,requestHandler,Flash,$routeParams,$location) {

	$scope.activeClass.events='active';

	daterangepicker();

	$scope.datePickerGraph = function(){
        $("#history-graph").click();
    };

    //For single date selection
    $scope.datePicker = function(){
            $("#main-date").click();
        };

    /*Do get All Event Deatils By Coach*/

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

        var startDate = selectedDate;
        var endDate = selectedDate;
/*
        if($('#history-start').val()==''){
            alert("okay");
            var enddate = selectedDate;
        }
        else{
           var endDate= document.getElementById("history-end").value;
           alert(endDate);
        }*/

        if($('#history-start').val()==''){
                startDate = startDate;
                endDate = selectedDate;
            }
            else{
                startDate = $('#history-start').val();
                endDate = $('#history-end').val();
            }

    
	$scope.doGetEventsByCoach = function(){
		requestHandler.postRequest("coach/getevents/",{"fromdate":selectedDate,"todate":endDate}).then(function(response){
			$scope.eventList= response.data.events;
		});
	};


    /*Do Delete Event By Coach*/
    $scope.doDeleteEvent = function(){
        requestHandler.postRequest("coach/deleteevent/",{"id":$scope.eventId}).then(function(response){
            $scope.result= response.data.Response;
            if(response.data.Response == "Success"){
                $scope.doGetEventsByCoach();
            }
        },function(){
            successMessage(Flash, "Successfully Event Deleted!");
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

    $scope.doInsertOrUpdateEvents = function(){
        $scope.eventDetails.id=null;
        $scope.eventDetails.datetime=document.getElementById("main-start-date").value;
        console.log($scope.eventDetails);
        requestHandler.postRequest("coach/insertorupdateevent/",$scope.eventDetails).then(function(response){
			$scope.result= response.data.Response;
			if(response.data.Response == "Success"){
				$location.path("events");
				$scope.doGetEventsByCoach();
			}
        },function(){
			successMessage(Flash, "Successfully Event Added!");
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

    daterangepicker();

    //For single date selection
    $scope.datePicker = function(){
            $("#main-date").click();
        };

    /*Do view and Edit event Details By coach*/
    $scope.doGetIndividualEvent = function(eventId){
        requestHandler.postRequest("eventdetail/",{"id":eventId}).then(function(response){
            $scope.eventDetails = response.data.event;
        });
    };

    /*For edit Updation */

    $scope.doUpdateEvent =function(eventId){
        $scope.eventDetails.datetime=document.getElementById("main-start-date").value;
        requestHandler.postRequest("coach/insertorupdateevent/",$scope.eventDetails).then(function(response){
            $scope.result= response.data.Response;
                if(response.data.Response == "Success"){
                    $location.path("events");
                }
            },function(){
                successMessage(Flash, "Successfully Event Updated!");
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

        //For Event Attendees View Event

    $scope.doGetAttendees = function(eventId){
        requestHandler.postRequest("coach/eventattendees/",{"id":eventId}).then(function(response){
            $scope.attendees = response.data.attendees;
        });
    };

     $scope.init = function(){
        
        $scope.doGetIndividualEvent($routeParams.id);
        $scope.doGetAttendees($routeParams.id);
    };


    $scope.init();

}]);
