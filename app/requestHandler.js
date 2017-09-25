var requestHandlerApp=angular.module("requestModule",[]);

requestHandlerApp.factory("requestHandler",['$http',function($http,$location){

    var requestObj={};

    //*IMPORTANT*////
    /*For deployment*/
    /*  var hostedDomain="http://www.deemsysinc.net/api/v1/";
     var urlLength = 15;
     var exerciselength=13;*///

    var domain=window.location.origin;
    var hostedDomain=domain+"/v1/";
    var paymentURL=domain+"/CH852/CyberHealth/views/user";
    var domainURL=domain+"/CH852/CyberHealth/";


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

//For direct File Upload
    requestObj.directFileUpload=function(requestURL,data,params){
        requestURL=hostedDomain+requestURL;

        var fd = new FormData();
        fd.append(params, data);
        return $http.post(requestURL, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
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
