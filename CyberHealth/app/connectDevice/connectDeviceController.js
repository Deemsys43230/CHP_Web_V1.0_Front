userApp.controller("ConnectDeviceController",["$scope","requestHandler","$location","$routeParams","$window","$rootScope",function(a,b,c,d,e,f){function g(a){if(a=new RegExp("[?&]"+encodeURIComponent(a)+"=([^&]*)").exec(location.search))return decodeURIComponent(a[1])}a.init=function(){connectionSuccess=!0,a.code=g("code"),console.log(a.code),a.state=g("state"),alert(a.state),a.doGetConnectDetails=function(c){return b.postRequest("connectUserWearable/",{vendorid:a.state,code:a.code}).then(function(a){console.log(a.data.Response),"Success"==a.data.Response?e.location.href="../user/#/connectDevice":console.log("something went wrong please try later")})}},a.init(),a.doGetConnectDetails()}]);