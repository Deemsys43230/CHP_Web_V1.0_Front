userApp.controller('ConnectDeviceController',['$scope','requestHandler','$location','$routeParams','$window','$rootScope',function($scope,requestHandler,$location,$routeParams,$window,$rootScope) {


function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}
	$scope.init=function(){
		connectionSuccess=true;
		//alert($rootScope.vendorid);
		$scope.code=(get('code'));
		console.log($scope.code);
		$scope.state=(get('state'));
		alert($scope.state);
		//Connect wearble device
		$scope.doGetConnectDetails=function(code){
 		return requestHandler.postRequest("connectUserWearable/",{"vendorid":$scope.state,"code":$scope.code}).then(function(response) {
 			console.log(response.data.Response);
        	if(response.data.Response=="Success"){	
        		$window.location.href = '../user/#/connectDevice';
        		//$location.path("../users/views/#dashboard");
		}	
		else
			console.log("something went wrong please try later");
        });
 			};
 		}
 		

 		$scope.init();
 		$scope.doGetConnectDetails();
}]);



