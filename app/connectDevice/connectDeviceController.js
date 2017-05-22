userApp.controller('ConnectDeviceController',['$scope','requestHandler','$location','$routeParams',function($scope,requestHandler,$location,$routeParams) {

	/*$scope.init=function(){

		connectionSuccess=true;

		//Get Code
		$scope.code="";

		//Use Request Handler and send request to api with code
		//connectUserWearable/

		if(Success)
			location.path(../dashboard)
		else
			something went wron please try later

	}

	//Initialize
	$scope.init();
*/

function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

	
	$scope.init=function(){

		connectionSuccess=true;

		$scope.code=(get('code'));

		//Connect wearble device
		$scope.doGetConnectDetails=function(code){
        return requestHandler.postRequest("connectUserWearable/",{"vendorid":3,"code":$scope.code}).then(function(response) {
        	console.log(response.data.Response);
        	if(response.data.Response=="Success"){	
        		$location.path("../users/views/dashboard");
		}	
		else
			console.log("something went wrong please try later");
        });
 			};
 		}
 		$scope.init();
 		$scope.doGetConnectDetails();
}]);



