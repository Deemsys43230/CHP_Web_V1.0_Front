var coachApp= angular.module("coachApp",['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

coachApp.controller('CoachSettingsController',['$scope','requestHandler','Flash','settingsMenuService',function($scope,requestHandler,Flash,settingsMenuService){
 /*coachApp.controller('FoodMeasureController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {*/
// $scope.activeClass = {coachGroup:'active'};
$scope.isNew= true;
$scope.title="Add Group";
$scope.paginationLoad=false;
var original="";

$scope.settingsMenuList = settingsMenuService;
$.each($scope.settingsMenuList,function(index,value){
    if(value.id==1){
        value.active = "active";
    }
    else value.active = ""
});

 //Reset Scope
    $scope.reset=function(){
        $scope.group={};
        $scope.groupForm.$setPristine();
        $scope.group.groupname="";
        $scope.isNew = true;
        $scope.title = "Add Group";

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
        }

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#group").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#group").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#group").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

    };

    $scope.delgroup=function(id)
    {
        $scope.listid=id;
         $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#confirmDelete").fadeIn(600);
            $(".common_model").show();
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#confirmDelete").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#confirmDelete").hide();
            $("#lean_overlay").hide();
        });
    }

$scope.doViewAllCoachGroup= function(){
	$scope.loaded= true;
	requestHandler.getRequest("coach/getGroups/","").then(function(response){
        $scope.groupList= response.data.Groups;
        $scope.loaded= false;
        $scope.paginationLoad= true;
	},	function(){
		errorMessage(Flash,"Please try again later!");
	});
};

$scope.doAddCoachGroup=function(){
    console.log("New",$scope.group);
	requestHandler.postRequest("coach/insertorupdateGroup/",$scope.group).then(function(response){
       	 $scope.doViewAllCoachGroup();
       	 successMessage(Flash,"Successfully Added");
         $scope.loaded=false;
         $scope.paginationLoad=true;  
   }, function(){
   	   errorMessage(Flash, "Please try again later!");
   });
};

$scope.doEditCoachGroup=function(id){
    console.log("View group");
        $scope.isNew = false;
        $scope.title = "Edit Group";

        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#group").fadeIn(600);
            $(".common_model").show();
            $scope.shouldBeOpen = true;
        });

        $scope.loaded=true;
        requestHandler.getRequest("coach/getGroups/","").then(function(response){
            $scope.groupList= response.data.Groups;
            $scope.loaded=false;
        });
        
        $.each($scope.groupList,function(index,value){
           if(value.id==id){
            $scope.group=value;
            $scope.group.groupid=value.id;
            original= angular.copy($scope.group);
           }
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#group").hide();
         
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#group").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
    };

$scope.doUpdateCoachGroup=function(){
  requestHandler.postRequest("coach/insertorupdateGroup/",$scope.group).then(function(response){
        $scope.doViewAllCoachGroup();
        successMessage(Flash,"Successfully Updated");  
        $scope.loaded=false;
        $scope.paginationLoad=true;      
   }, function(){
       errorMessage(Flash, "Please try again later!");
   });
};

$scope.doCoachGroupDelete=function(){
   var id=$scope.listid;
   requestHandler.postRequest("coach/deleteGroups/",{'groupid':id}).then(function(response){
    if(response.data.Response_status==1){
                successMessage(Flash,"Group Removed Successfully");
             }else{
                errorMessage(Flash,"Please try again later!");
             }
        $scope.doViewAllCoachGroup();
      
   }); 
};

$scope.init=function(){
	$scope.paginationLoad=false;
	$scope.doViewAllCoachGroup();
};

$scope.isClean= function(){
    return angular.equals(original, $scope.group);
}
 // Search coach group
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });

}])