
var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angular-svg-round-progress','angularUtils.directives.dirPagination']);

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
        $scope.title = "Add Medication";

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
        if(confirm("Are you sure want to remove Medication?")){
    	requestHandler.postRequest("user/deletemedication/",{'id':id}).then(function(response){
    		successMessage(Flash,"Successfully Removed");
    		$scope.doGetMedicationListByUser();
    	}, function(){
	 		errorMessage(Flash,"Please try again later!");
	 	});	
        }
    };

    //to check user is having coach or not
    $scope.doCheckUserMedicationDocument=function(){
        $scope.showDocumentList=false;
        $scope.loader=true;
        requestHandler.getRequest("user/checkfolderexist/","").then(function(response){
            $scope.userUploadedDocumentIsExists=response.data.isexist;
            $scope.showDocumentList=true;
            $scope.loader=false;
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
        $scope.doCheckUserMedicationDocument();
    };
}]);
userApp.controller('UserMedicationDocumentUploadController',['$scope','requestHandler','Flash','$location','$routeParams','roundProgressService',function($scope,requestHandler,Flash,$location,$routeParams,roundProgressService) {

    $scope.uploadBtnTxt="Upload File";
    $scope.fileUpload=false;
    $scope.paginationLoad=false;
    $scope.usedSpace=0;



    // Search  Medication
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });

  //to get user id
        $scope.doGetUserDetails=function(){
            $scope.loader=true;
            requestHandler.getRequest("getUserId/").then(function(response){
                $scope.userDetails=response.data.User_Profile;
                $scope.loader=false;
                $scope.doGetUserUploadedDocument($scope.userDetails.userid);
            });

        };


    //To get user uploaded file list
    $scope.doGetUserUploadedDocument=function(userid){
    $scope.loader=true;
        requestHandler.getRequest("readfiles/"+ userid+"/","").then(function(response){
            $scope.userUploadedDocumentList=response.data.files;
            $scope.usedSpace=response.data.usedspace;
            $scope.availableSpace=response.data.availablespace;
            $scope.availableSpaceColor="red";
            $scope.usedSpaceColor="limegreen";
            $scope.loader=false;
            $scope.paginationLoad=true;
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
    };

//to check user is having coach or not
    $scope.doCheckUserMedicationDocument=function(){
        $scope.showDocumentList=false;
        $scope.loader=true;
        requestHandler.getRequest("user/checkfolderexist/","").then(function(response){
          $scope.userUploadedDocumentIsExists=response.data.isexist;
            $scope.showDocumentList=true;
          $scope.loader=false;
        }, function(){
            errorMessage(Flash,"Please try again later!");
        });
    };



//to delete user uploaded document
    $scope.deleteUserUploadedDocument=function(filename){
        if(confirm("Are you sure want to remove Uploaded Document?")){
            requestHandler.postRequest("user/deletefile/",{'filename':filename}).then(function(response){
                successMessage(Flash,"Successfully Removed");
                $scope.doGetUserUploadedDocument($scope.userDetails.userid);
            }, function(){
                errorMessage(Flash,"Please try again later!");
            });
        }
    };

    $scope.doUploadFile = function(){
        $scope.fileUpload=true;
        $scope.uploadBtnTxt="Uploading...";
    requestHandler.directFileUpload("user/uploadfile/",$scope.uploadFile,"document").then(function(){
           successMessage(Flash,"Successfully Uploaded");
           $scope.uploadBtnTxt="Upload File";
           $scope.fileUpload=false;
           $scope.doGetUserUploadedDocument($scope.userDetails.userid);
           $scope.resetDocument();
       });

    };

    //To clear uploaded file
    $scope.resetDocument = function () {
        $scope.uploadFile="";
        angular.element("input[type='file']").val(null);
        $scope.documentUploadForm.$setPristine();
    };

    //init()
    $scope.doGetUserDetails();
   $scope.doCheckUserMedicationDocument();


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
}]);

userApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                console.log(element[0].files[0]);
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


// Validation for file upload
userApp.directive('validFile',function(){
    return {
        require:'ngModel',
        link:function(scope,el,attrs,ngModel){
            //change event is fired when file is selected
            el.bind('change',function(){
            scope.$apply(function(){
                    ngModel.$setViewValue(el.val());
                    ngModel.$render();
                })
            })
        }
    }
});


