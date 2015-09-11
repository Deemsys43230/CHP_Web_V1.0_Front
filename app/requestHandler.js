var requestHandlerApp=angular.module("requestModule",[]);

requestHandlerApp.factory("requestHandler",['$http',function($http,$location){
    
    var requestObj={};

    //*IMPORTANT*//
    var hostedDomain="http://192.168.1.71:8081/api/v1/";

    requestObj.getRequest=function(requestURL,params){
        requestURL=hostedDomain+requestURL;
         return $http.get(requestURL,params).then(function (response) {
            console.log(response);
            return response;
         });
    };

    requestObj.postRequest=function(requestURL,params){      
         
         requestURL=hostedDomain+requestURL;
    
         return $http.post(requestURL,params).then(function (response) {
            return response;
         });
    };

    requestObj.loginRequest=function(username,password){
         return $http.post('http://192.168.1.71:8081/api/v1/login/',{"username":username,"password":password}).then(function(response){
            return response;
        },function(response){
             return response;
         });

    };

    requestObj.alerting=function(){
      alert("ok deal");
    };

    return requestObj;

}]);
