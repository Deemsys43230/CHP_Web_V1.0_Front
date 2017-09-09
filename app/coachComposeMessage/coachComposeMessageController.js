var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll','angular-svg-round-progress']);

coachApp.controller('CoachComposeMessageController',['$scope','requestHandler',"$filter","Flash","$location","$rootScope",function($scope,requestHandler,$filter,Flash,$location,$rootScope,roundProgressService) {

	$scope.activeClass.my='active';
	
	//Get All Client List and group list with send message type
    $scope.doGetAllClients = function(){
        $scope.groupsList=[];
        $scope.coachClients={};
    	if($scope.sendToType==1){
    		$scope.selectText="Select Members";
            $scope.selectGroup="Select All Members";
            requestHandler.getRequest("/coach/myclients/","").then(function(response){
		        $scope.coachClients = response.data.clients;
                $scope.resetSelectedCheckBox();
		      });        
       	}else{
	       	$scope.selectText="Select Groups";
            $scope.selectGroup="Select All Groups";
	            requestHandler.getRequest("coach/getGroups/").then(function(response){
	            $scope.groupsList=[];
	            $scope.groupsList=response.data.Groups;
                $scope.resetSelectedCheckBox();
	        });
	        $scope.loaded=false;
       	}       
   	};

   	// always watch Switch send message type
   	$scope.$watch("sendToType",function(){
         $scope.doGetAllClients(true);
    });

   	//get message & userid, groupid while initialize 
   	$scope.sendMessage={
    		message:"",
    		targetid:{
    			userid:[],
    			groupid:[]
    		}
    	};

    $scope.doSendGroupMessage = function(){
        $scope.sendMessage.targetid.groupid =[];
        $scope.sendMessage.targetid.userid =[];
        //while switch push id to array
    	if($scope.sendToType==2){
	    	$.each($scope.groupsList,function(index,value){
	    	 	if(value.isSelected==true){
	    	 		$scope.sendMessage.targetid.groupid.push(value.id);
	    	 	}
	    	});
	    }
	    else{
	    	$.each($scope.coachClients,function(index,value){
		    	if(value.isSelected==true){
	    	 		$scope.sendMessage.targetid.userid.push(value.userid);
	    	 	}
	    	 });
	    }

        //for post message to user and group with condition checking

        if($scope.sendMessage.targetid.userid.length > 0 || $scope.sendMessage.targetid.groupid.length > 0 ){
            requestHandler.postRequest("coach/sendGroupMessage/",$scope.sendMessage).then(function(response){
                if(response.data.Response == "Success"){
                    successMessage(Flash,"Successfully Sent message!");
                    $scope.sendMessage.message="";
                    $scope.messageForm.$setPristine();
                    $scope.resetSelectedCheckBox();
                }
            });
        }
        else{
            errorMessage(Flash,"Please Select Atleast one!");
        }
    }

    //for select all button push id to dosendgroupmessage
    $scope.doSelectAll = function(){
        if($scope.sendToType==2){
            $.each($scope.groupsList,function(index,value){
                if(value.isSelected=true){
                    $scope.sendMessage.targetid.groupid.push(value.id);
                }
            });
        }
        else{
            $.each($scope.coachClients,function(index,value){
               if(value.isSelected=true){
                    $scope.sendMessage.targetid.userid.push(value.userid);
                }
             });
        }
    };

    //for Deselect all button push id to dosendgroupmessage
    $scope.doDeselectAll = function(){
        if($scope.sendToType==2){
            $.each($scope.groupsList,function(index,value){
                if(value.isSelected=false){
                    $scope.sendMessage.targetid.groupid.push(value.id);
                }
            });
        }
        else{
            $.each($scope.coachClients,function(index,value){
               if(value.isSelected=false){
                    $scope.sendMessage.targetid.userid.push(value.userid);
                }
             });
        }
    };

    //for reset
    $scope.resetSelectedCheckBox = function(){
    	$.each($scope.groupsList,function(index,value){
    	 	value.isSelected=false;
    	});
    	$.each($scope.coachClients,function(index,value){
    	 	value.isSelected=false;
    	});
    };

    //Intialaize
    $scope.init= function(){
    	$scope.sendToType=1;
    	$scope.doGetAllClients();
    };

    $scope.init();
}]);

// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

// user search by coach
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