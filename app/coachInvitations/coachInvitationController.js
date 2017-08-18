/**
 * Created by Deemsys on 9/21/2015.
 */
var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll']);

coachApp.controller('CoachInvitationController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {



    $scope.doGetUserListByCoach=function(loadUserDetail){   

        if(loadUserDetail){
            $scope.coachuserlist=[];
            $scope.scrollnation.scrollEndCount=-1;
        }

       $scope.scrollnation.scrollEndCount= $scope.scrollnation.scrollEndCount+1;
       $scope.coachUserPagination={
							       	"limit":$scope.scrollnation.itemsPerScroll,
									"searchname":$scope.coachsearch,
									"offset":($scope.scrollnation.scrollEndCount)*$scope.scrollnation.itemsPerScroll
							       }	

       if($scope.invitationType==1){
             $scope.request= requestHandler.postRequest("coach/coachreadinvitations/",$scope.coachUserPagination);           
       }else{
             $scope.request=requestHandler.postRequest("coach/searchuser/",$scope.coachUserPagination);      
       }

        $scope.request.then(function(response){

             $scope.coachuserlist=$scope.coachuserlist.concat(response.data.users);
             if(loadUserDetail){
                 if($scope.coachuserlist.length>0){
                     $scope.doGetUserDetailsByCoach($scope.coachuserlist[0].userid);
                    }
            }
           }, function(){
              errorMessage(Flash,"Please try again later!");
           });
       
       
    };

    $scope.$watch("invitationType",function(){
         $scope.doGetUserListByCoach(true);
    });

 
    $scope.doGetUserDetailsByCoach=function(id){
         $scope.coachuserdetails={};        
         $scope.viewload=true;
         requestHandler.getRequest("getUserProfile/"+id,"").then(function(response){
         	$scope.coachuserdetails= response.data.userprofile;
            
            if($scope.coachuserdetails.about=="null"){
            	$scope.coachuserdetails.about="NA";
            }

            if($scope.coachuserdetails.phone=="null"){
            	$scope.coachuserdetails.phone="NA";
            }

            if($scope.coachuserdetails.city=="null"){
            	$scope.coachuserdetails.city="NA";
            }

            if($scope.coachuserdetails.state=="null"){
            	$scope.coachuserdetails.state="NA";
            }

            if($scope.coachuserdetails.country=="null"){
            	$scope.coachuserdetails.country="NA"
            }

            if($scope.coachuserdetails.zipcode=="null"){
            	$scope.coachuserdetails.zipcode="NA";
            }

            $scope.viewload=false;
         });
    };

    
    $scope.doSendInvitationByCoach=function(userid){
        $scope.sendInvitationParam={'userid':userid, 'emailid':null}
          requestHandler.postRequest("coach/sendinvitationtouser/",$scope.sendInvitationParam).then(function(response){
            if(response.data.Response_status==1){
                successMessage(Flash,"Invitation Sent Successfully");
                $scope.invitationSent=true;
                $scope.doGetUserDetailsByCoach(userid);
            }else{
                errorMessage(Flash,"Please try again later!");
            }
          });
    };

    $scope.doSendEmailInvitationByCoach=function(emailid){
        $scope.sendEmailInvitationParam={'userid':null, 'emailid':emailid}
          requestHandler.postRequest("coach/sendinvitationtouser/",$scope.sendEmailInvitationParam).then(function(response){
            if(response.data.Response_status==1){
                successMessage(Flash,"Invitation Sent Successfully");
                $scope.coachUserInit();
            }else{
                errorMessage(Flash,"Please try again later!");
            }
          });
    };

    $scope.doInviteUserPopup=function(){
        $scope.sendEmail={};
        $scope.inviteUserForm.$setPristine();
      $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#coachSendEmail").fadeIn(600);
            $(".common_model").show();
             $scope.shouldBeOpen = true;
        });

        $(".modal_close").click(function(){
            $(".common_model").hide();
            $("#coachSendEmail").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });

        $("#lean_overlay").click(function(){
            $(".common_model").hide();
            $("#coachSendEmail").hide();
            $("#lean_overlay").hide();
            $scope.shouldBeOpen = false;
        });
    };

	$scope.coachUserInit=function(){

		$scope.scrollnation={"itemsPerScroll":4, "scrollEndCount": -1}
		$scope.coachuserlist=[];
		$scope.invitationType=1;
        $scope.coachsearch="";
	};

}]);

coachApp.filter('startsWithLetterSearch', function () {

    return function (items, coachsearch) {
        var filtered = [];
        var letterMatch = new RegExp(coachsearch, 'i');
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

// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);