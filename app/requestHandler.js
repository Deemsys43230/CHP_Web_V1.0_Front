var requestHandlerApp=angular.module("requestModule",[]);

requestHandlerApp.factory("requestHandler",['$http',function($http,$location){
    
    var requestObj={};

    //*IMPORTANT*//
    /*For deployment*/
  /*  var hostedDomain="http://www.deemsysinc.net/api/v1/";
    var urlLength = 15;
    var exerciselength=13;*/

    var hostedDomain="http://localhost/api/v1/";
    var urlLength = 14;
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
         return $http.post('http://localhost/api/v1/login/',{"username":username,"password":password}).then(function(response){
            return response;
        },function(response){
             return response;
         });

    };

    requestObj.paymentURL=function(){
        var returnurl="http://localhost/cyber/views/user";
        return returnurl;
    };

    requestObj.convertUrl=function(imageurl){
   // alert(imageurl);
        var url = imageurl.substring(imageurl.indexOf("/")+ urlLength, imageurl.length);
        return url;
    };

    requestObj.convertUrlExercise=function(imageurl){
      //  alert(imageurl);
        var exerciseurl = imageurl.substring(imageurl.indexOf("/")+ urlLength, imageurl.length-exerciselength);
        console.log(exerciseurl);
     //   alert(exerciseurl);
        return exerciseurl;


    };
    requestObj.alerting=function(){
      alert("ok deal");
    };

    return requestObj;

}]);
