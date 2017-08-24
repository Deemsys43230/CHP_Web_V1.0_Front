
var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

userApp.controller('UserMedicationController',['$scope','requestHandler','Flash','$location','$routeParams',function($scope,requestHandler,Flash,$location,$routeParams) {
   
   $scope.paginationLoad=false;
   // $scope.isNew= true;
   // $scope.title="Add Group";
   var original="";

    // Search  Medication
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });
    
    //Do Get User Medication List
    $scope.doGetMedicationListByUser=function(){
    	$scope.loader=true;
    	requestHandler.getRequest("user/getmedications/","").then(function(response){
          $scope.userMedicationList= response.data.medications;
          $scope.loader=false;
          $scope.paginationLoad=true;
       }, function(){
       	  errorMessage(Flash,"Please try again later!");
       });
    };

    //Reset Scope
    $scope.reset=function(){
        $scope.medication={};
        $scope.medication.medicinename="";
        $scope.medication.dosage="";
        $scope.medication.notes="";
        $scope.medication.issharable= 0;
        $scope.medicationForm.$setPristine();
        $scope.isNew = true;
        $scope.title = "Add Group";

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
        }

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

    $scope.doAddUserMedication=function(){
         requestHandler.postRequest("user/insertorupdatemedication/",$scope.medication).then(function(response){
             $scope.doGetMedicationListByUser();
             successMessage(Flash,"Successfully Added");
             $scope.loaded=false;
             $scope.paginationLoad=true;  
         }, function(){
         	errorMessage(Flash,"Please try again later!");
         });
    };

    $scope.viewUserMedication=function(id){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#viewMedication").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        requestHandler.postRequest("medicationdetail/",{'id':id}).then(function(response){
            $scope.userMedicationDetails=response.data.medication;
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


    $scope.doEditUserMedication=function(id){
        $scope.isNew = false;
        $scope.title = "Edit Medication";

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#medication").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $scope.loaded=true;
        requestHandler.getRequest("user/getmedications/","").then(function(response){
            $scope.userMedicationList= response.data.medications;
            $scope.loaded=false;
        });
        
        $.each($scope.userMedicationList,function(index,value){
           if(value.id==id){
            $scope.medication=value;
            $scope.medication.id=value.id;
            original= angular.copy($scope.medication);
           }
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

	$scope.doUpdateUserMedication=function(){
	  requestHandler.postRequest("user/insertorupdatemedication/",$scope.medication).then(function(response){
	     	$scope.doGetMedicationListByUser();
	     	successMessage(Flash,"Successfully Added");
	     	$scope.loaded=false;
	     	$scope.paginationLoad=true;  
	 	}, function(){
	 		errorMessage(Flash,"Please try again later!");
	 	});
	};

    $scope.deleteUserMedication=function(id){
    	requestHandler.postRequest("user/deletemedication/",{'id':id}).then(function(response){
    		successMessage(Flash,"Successfully Removed");
    		$scope.doGetMedicationListByUser();
    	}, function(){
	 		errorMessage(Flash,"Please try again later!");
	 	});	
    };
    
    $scope.isClean= function(){
    return angular.equals(original, $scope.medication);
   };


    $scope.userMedicationInit=function(){
    	$scope.paginationLoad=false;
    	$scope.doGetMedicationListByUser();
    };
}]);

