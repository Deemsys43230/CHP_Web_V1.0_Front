/**
 * Created by Deemsys on 9/21/2015.
 */
var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','angular-nicescroll']);

coachApp.controller('CoachInvitationController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    $scope.doGetUserListByCoach=function(){
       $scope.scrollnation.scrollEndCount= $scope.scrollnation.scrollEndCount+1;
       $scope.coachUserPagination={
							       	"limit":$scope.scrollnation.itemsPerScroll,
									"searchname":"",
									"offset":($scope.scrollnation.scrollEndCount)*$scope.scrollnation.itemsPerScroll
							       }	
       requestHandler.postRequest("coach/coachreadinvitations/",$scope.coachUserPagination).then(function(response){
         $scope.coachuserlist=$scope.coachuserlist.concat(response.data.users);
         if($scope.coachuserlist.length>0){
       		 $scope.doGetUserDetailsByCoach($scope.coachuserlist[0].userid);
    		}
       }, function(){
       	  errorMessage(Flash,"Please try again later!");
       });

    };

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

	$scope.coachUserInit=function(){
		$scope.scrollnation={"itemsPerScroll":4, "scrollEndCount": -1}
		$scope.coachuserlist=[];
		$scope.doGetUserListByCoach(true);
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