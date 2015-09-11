var requestHandlerApp=angular.module("requestModule",[]);

requestHandlerApp.factory("requestHandler",['$http',function($http,$location){
    
    var requestObj={};

    //*IMPORTANT*//
    var hostedDomain="http://learnterest.com:8089/Learnterest/";

    requestObj.getRequest=function(requestURL,params){
        requestURL=hostedDomain+requestURL;
         return $http.get(requestURL,params).then(function (results) {
            console.log(results);
            return results;   
         });
    };

    requestObj.postRequest=function(requestURL,params){      
         
         requestURL=hostedDomain+requestURL;
    
         return $http.post(requestURL,params).then(function (results) {
            return results;   
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
