var requestHandlerApp=angular.module("requestModule",[]);

requestHandlerApp.factory("requestHandler",['$http',function($http,$location){
    
    var requestObj={};

    //*IMPORTANT*//
    /*For deployment*/
  /*  var hostedDomain="http://www.deemsysinc.net/api/v1/";
    var urlLength = 15;
    var exerciselength=13;*/
    var domain="http://182.75.114.194:8080";
    var hostedDomain="http://182.75.114.194:8080/api/v1/";
    var paymentURL="http://182.75.114.194:8080/views/user";
    var domainURL="http://182.75.114.194:8080";

    var urlLength = 33;
    var exerciselength=13;

    requestObj.getRequest=function(requestURL,params){
        requestURL=hostedDomain+requestURL;
         return $http.get(requestURL,params).then(function (response) {
            console.log(response);
            return response;
         });
    };

    requestObj.putRequest=function(requestURL,params){
        requestURL=hostedDomain+requestURL;
        return $http.put(requestURL,params).then(function (response) {
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

    requestObj.deleteRequest=function(requestURL,params){
        requestURL=hostedDomain+requestURL;
        return $http.delete(requestURL,{data:params}).then(function(response){
            return response;
         },function(response){
            return response;
        });
    };

    requestObj.loginRequest=function(username,password){
         requestURL=hostedDomain+'/login/';
         return $http.post(requestURL,{"username":username,"password":password}).then(function(response){
            return response;
        },function(response){
             return response;
         });

    };

    requestObj.paymentURL=function(){
        return paymentURL;
    };

    requestObj.domainURL=function(){
        return domainURL;
    };

    requestObj.convertUrl=function(imageurl){
        var url = domain+imageurl.substring(imageurl.indexOf("/")+ urlLength, imageurl.length);
        return url;
    };

    requestObj.convertUrlExercise=function(imageurl){
      //  alert(imageurl);
        var exerciseurl = imageurl.substring(imageurl.indexOf("/")+ urlLength, imageurl.length-exerciselength);
        return exerciseurl;


    };
    requestObj.alerting=function(){
      alert("ok deal");
    };

    return requestObj;

}]);
