var requestHandlerApp=angular.module("requestModule",[]);requestHandlerApp.factory("requestHandler",["$http",function(a,b){var c={},d="http://localhost",e="http://localhost/api/v1/",f="http://localhost/cyber/cyberhealth/views/user",g="http://localhost/cyber/cyberhealth/",h=33,i=13;return c.getRequest=function(b,c){return b=e+b,a.get(b,c).then(function(a){return console.log(a),a})},c.putRequest=function(b,c){return b=e+b,a.put(b,c).then(function(a){return console.log(a),a})},c.postRequest=function(b,c){return b=e+b,a.post(b,c).then(function(a){return a})},c.deleteRequest=function(b,c){return b=e+b,a["delete"](b,{data:c}).then(function(a){return a},function(a){return a})},c.loginRequest=function(b,c){return requestURL=e+"/login/",a.post(requestURL,{username:b,password:c}).then(function(a){return a},function(a){return a})},c.paymentURL=function(){return f},c.domainURL=function(){return g},c.convertUrl=function(a){var b=d+a.substring(a.indexOf("/")+h,a.length);return b},c.convertUrlExercise=function(a){var b=a.substring(a.indexOf("/")+h,a.length-i);return b},c.alerting=function(){alert("ok deal")},c}]);