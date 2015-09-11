var myApp=angular.module("authModule",['ngRoute','ngCookies']);

myApp.factory("authFactory",["$cookieStore","$http",function($cookieStore,$http){
    
    var userObj={};

    userObj.setUserObj=function(userObj){
        $cookieStore.put("userObj",userObj);
    };

    userObj.getUserObj=function(){
        return $cookieStore.get("userObj");        
    };

    userObj.setAuthCookie=function(response){
        userObj=response;
    };

    userObj.alertFunction=function()
    {
        alert("ok");
    };

    userObj.isAuthenticated=function(){
        if($cookieStore.get("userObj")== undefined)//If not available
        {
            return false;
        }
        else
        {
            return true;
        }
    };
    return userObj;

}]);



myApp.factory("oAuthFactory",["$http","authFactory",function($http,authFactory){
    
    var oAuthObj={};

    oAuthObj.requestLogin=function(username,password)
    {
       return $http.get("http://192.168.1.16:8080/Learnterest/oauth/token?grant_type=password&client_id=restapp&client_secret=restapp&username="+username+"&password="+password).success(function (results) {
            console.log(results);     
            authFactory.setUserObj(results);
            return results;
         }).error(function(){
            console.log('failed');
            return false;
         });
    };

    return oAuthObj;

}]);



