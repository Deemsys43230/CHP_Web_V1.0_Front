/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('ContactUsController',['$scope','requestHandler','Flash','siteMenuService','$location','$http',function($scope,requestHandler,Flash,siteMenuService,$location,$http){

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });


/*VIEW ALL*/
    var original="";
/*  $scope.copyOrginal_contactUs=function(contactUs){
        $scope.contactUs=contactUs;
        $scope.contactUs.zipcode = $scope.contactUs.zipcode.toString();
        original=angular.copy( $scope.contactUs);
    };*/

    $scope.doGetContactUs= function () {
        requestHandler.getRequest("admin/getappdetails/","").then(function(response){
            $scope.contactUs = response.data.App_settings[0];
            original=angular.copy( $scope.contactUs);

        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };
                /*UPDATE DETAILS*/
    $scope.doUpdateContactUs=function(){
        requestHandler.putRequest("admin/updateAddressDetails/",$scope.contactUs).then(function(response){
            $scope.doGetContactUs();
            successMessage(Flash,"Successfully Updated!");

        },function(){
            errorMessage(Flash,"Please try again later");
        });
    };

    $scope.doGetContactUs_isClean=function(){
        return angular.equals(original, $scope.contactUs);
    };
    $scope.doGetContactUs();




// To Send User Contact Detail to the Admin
    $scope.doSendEmail=function(){

        requestHandler.postRequest("sendSupportEmail/",$scope.contact).then(function(response){
            $scope.contact=response.data;
            successMessage(Flash,"Thanks For Contacting Us");
        }, function () {

            errorMessage(Flash, "Please try again later!")
        });
        $scope.contactForm.$setPristine();
        $scope.submitted=false;
    };

}]);




adminApp.directive('myMap', function() {
    // directive link function
    /*var link = function(scope, element, attrs) {
     };*/

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: function(scope, element, attr) {
            scope.$watch('contactUs', function() {
                if(!scope.contactUs){
                }else{
                    scope.address = scope.contactUs.streetaddress+', '+scope.contactUs.state+', '+scope.contactUs.city+', '+scope.contactUs.zipcode;
                    $.ajax({
                        url:"http://maps.googleapis.com/maps/api/geocode/json?address="+scope.address+"&sensor=false",
                        type: "POST",
                        success:function(res){
                            scope.latitudeValue = res.results[0].geometry.location.lat;
                            scope.longitudeValue = res.results[0].geometry.location.lng;

                            var map, infoWindow;
                            var markers = [];

                            // map config
                            var mapOptions = {
                                center: new google.maps.LatLng(scope.latitudeValue, scope.longitudeValue),
                                zoom: 12,
                                mapTypeId: google.maps.MapTypeId.ROADMAP,
                                scrollwheel: false
                            };

                            // init the map
                            function initMap() {
                                if (map === void 0) {
                                    map = new google.maps.Map(element[0], mapOptions);
                                }
                            }

                            // place a marker
                            function setMarker(map, position, title, content) {
                                var marker;
                                var markerOptions = {
                                    position: position,
                                    data: 'Deemsys INC',
                                    map: map,
                                    title: title,
                                    icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                                };

                                marker = new google.maps.Marker(markerOptions);
                                markers.push(marker); // add marker to array

                                google.maps.event.addListener(marker, 'click', function () {
                                    // close window if not undefined
                                    if (infoWindow !== void 0) {
                                        infoWindow.close();
                                    }
                                    // create new window
                                    var infoWindowOptions = {
                                        content: content
                                    };
                                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                                    infoWindow.open(map, marker);
                                });
                            }

                            // show the map and place some markers
                            initMap();

                            setMarker(map, new google.maps.LatLng(scope.latitudeValue, scope.longitudeValue), 'Deemsys Inc', scope.address);

                        }
                    });

                }
            });
        }
    };
});

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);
commonApp.controller('ContactUsDetailsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

// To Send User Contact Detail to the Admin
     $scope.doSendEmail=function(){

         requestHandler.postRequest("sendSupportEmail/",$scope.contact).then(function(response){
            $scope.contact=response.data;
            successMessage(Flash,"Thanks For Contacting Us");
        }, function () {

            errorMessage(Flash, "Please try again later!")
        });
           $scope.contactForm.$setPristine();
            $scope.submitted=false;
    };


   /* // To Get the Contact Us details for user
    $scope.doGetContactUsDetails= function () {
        requestHandler.getRequest("contactus/","").then(function(response){
            $scope.contactUsDetails=response.data.Contactus[0];

        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    //Display Contact Us details on load
    $scope.doGetContactUsDetails();*/

}]);

commonApp.directive('myMap', function() {
    // directive link function
    /*var link = function(scope, element, attrs) {
        };*/

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: function(scope, element, attr) {
            scope.$watch('contactUsDetails', function() {
                if(!scope.contactUsDetails){
                }else{
                    scope.address = scope.contactUsDetails.streetaddress+', '+scope.contactUsDetails.state+', '+scope.contactUsDetails.city+', '+scope.contactUsDetails.zipcode;
                    $.ajax({
                        url:"http://maps.googleapis.com/maps/api/geocode/json?address="+scope.address+"&sensor=false",
                        type: "POST",
                        success:function(res){
                            scope.latitudeValue = res.results[0].geometry.location.lat;
                            scope.longitudeValue = res.results[0].geometry.location.lng;

                            var map, infoWindow;
                            var markers = [];

                            // map config
                            var mapOptions = {
                                center: new google.maps.LatLng(scope.latitudeValue, scope.longitudeValue),
                                zoom: 12,
                                mapTypeId: google.maps.MapTypeId.ROADMAP,
                                scrollwheel: false
                            };

                            // init the map
                            function initMap() {
                                if (map === void 0) {
                                    map = new google.maps.Map(element[0], mapOptions);
                                }
                            }

                            // place a marker
                            function setMarker(map, position, title, content) {
                                var marker;
                                var markerOptions = {
                                    position: position,
                                    data: 'Deemsys INC',
                                    map: map,
                                    title: title,
                                    icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                                };

                                marker = new google.maps.Marker(markerOptions);
                                markers.push(marker); // add marker to array

                                google.maps.event.addListener(marker, 'click', function () {
                                    // close window if not undefined
                                    if (infoWindow !== void 0) {
                                        infoWindow.close();
                                    }
                                    // create new window
                                    var infoWindowOptions = {
                                        content: content
                                    };
                                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                                    infoWindow.open(map, marker);
                                });
                            }

                            // show the map and place some markers
                            initMap();

                            setMarker(map, new google.maps.LatLng(scope.latitudeValue, scope.longitudeValue), 'Deemsys Inc', scope.address);

                        }
                    });

                }
            });
        }
    };
});


var userApp = angular.module('userApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);
userApp.controller('ContactUsDetailsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

// To Send User Contact Detail to the Admin
    $scope.doSendEmail=function(){
      requestHandler.postRequest("sendSupportEmail/",$scope.contact).then(function(response){
            $scope.contact=response.data;
            successMessage(Flash,"Thanks For Contacting Us");
        }, function () {

            errorMessage(Flash, "Please try again later!")
        });
        $scope.contactForm.$setPristine();
        $scope.submitted=false;
    };

    // To Get the Contact Us details for user
    $scope.doGetContactUsDetails= function () {
        requestHandler.getRequest("contactus/","").then(function(response){
            $scope.contactUsDetails=response.data.Contactus[0];

        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    //Display Contact Us details on load
    $scope.doGetContactUsDetails();

}]);

userApp.directive('myMap', function() {
    // directive link function
    /*var link = function(scope, element, attrs) {
     };*/

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: function(scope, element, attr) {
            scope.$watch('contactUsDetails', function() {
                if(!scope.contactUsDetails){
                }else{
                    scope.address = scope.contactUsDetails.streetaddress+', '+scope.contactUsDetails.state+', '+scope.contactUsDetails.city+', '+scope.contactUsDetails.zipcode;
                    $.ajax({
                        url:"http://maps.googleapis.com/maps/api/geocode/json?address="+scope.address+"&sensor=false",
                        type: "POST",
                        success:function(res){
                            scope.latitudeValue = res.results[0].geometry.location.lat;
                            scope.longitudeValue = res.results[0].geometry.location.lng;

                            var map, infoWindow;
                            var markers = [];

                            // map config
                            var mapOptions = {
                                center: new google.maps.LatLng(scope.latitudeValue, scope.longitudeValue),
                                zoom: 12,
                                mapTypeId: google.maps.MapTypeId.ROADMAP,
                                scrollwheel: false
                            };

                            // init the map
                            function initMap() {
                                if (map === void 0) {
                                    map = new google.maps.Map(element[0], mapOptions);
                                }
                            }

                            // place a marker
                            function setMarker(map, position, title, content) {
                                var marker;
                                var markerOptions = {
                                    position: position,
                                    data: 'Deemsys INC',
                                    map: map,
                                    title: title,
                                    icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                                };

                                marker = new google.maps.Marker(markerOptions);
                                markers.push(marker); // add marker to array

                                google.maps.event.addListener(marker, 'click', function () {
                                    // close window if not undefined
                                    if (infoWindow !== void 0) {
                                        infoWindow.close();
                                    }
                                    // create new window
                                    var infoWindowOptions = {
                                        content: content
                                    };
                                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                                    infoWindow.open(map, marker);
                                });
                            }

                            // show the map and place some markers
                            initMap();

                            setMarker(map, new google.maps.LatLng(scope.latitudeValue, scope.longitudeValue), 'Deemsys Inc', scope.address);

                        }
                    });

                }
            });
        }
    };
});



var coachApp = angular.module('coachApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);
coachApp.controller('ContactUsDetailsController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {


    // To Send User Contact Detail to the Admin
    $scope.doSendEmail=function(){

        requestHandler.postRequest("sendSupportEmail/",$scope.contact).then(function(response){
            $scope.contact=response.data;
            successMessage(Flash,"Thanks For Contacting Us");
        }, function () {

            errorMessage(Flash, "Please try again later!")
        });
        $scope.contactForm.$setPristine();
        $scope.submitted=false;
    };

    // To Get the Contact Us details for user
    $scope.doGetContactUsDetails= function () {
        requestHandler.getRequest("contactus/","").then(function(response){
            $scope.contactUsDetails=response.data.Contactus[0];

        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

    //Display Contact Us details on load
    $scope.doGetContactUsDetails();

}]);

coachApp.directive('myMap', function() {
    // directive link function
    /*var link = function(scope, element, attrs) {
     };*/

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: function(scope, element, attr) {
            scope.$watch('contactUsDetails', function() {
                if(!scope.contactUsDetails){
                }else{
                    scope.address = scope.contactUsDetails.streetaddress+', '+scope.contactUsDetails.state+', '+scope.contactUsDetails.city+', '+scope.contactUsDetails.zipcode;
                    $.ajax({
                        url:"http://maps.googleapis.com/maps/api/geocode/json?address="+scope.address+"&sensor=false",
                        type: "POST",
                        success:function(res){
                            scope.latitudeValue = res.results[0].geometry.location.lat;
                            scope.longitudeValue = res.results[0].geometry.location.lng;

                            var map, infoWindow;
                            var markers = [];

                            // map config
                            var mapOptions = {
                                center: new google.maps.LatLng(scope.latitudeValue, scope.longitudeValue),
                                zoom: 12,
                                mapTypeId: google.maps.MapTypeId.ROADMAP,
                                scrollwheel: false
                            };

                            // init the map
                            function initMap() {
                                if (map === void 0) {
                                    map = new google.maps.Map(element[0], mapOptions);
                                }
                            }

                            // place a marker
                            function setMarker(map, position, title, content) {
                                var marker;
                                var markerOptions = {
                                    position: position,
                                    data: 'Deemsys INC',
                                    map: map,
                                    title: title,
                                    icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                                };

                                marker = new google.maps.Marker(markerOptions);
                                markers.push(marker); // add marker to array

                                google.maps.event.addListener(marker, 'click', function () {
                                    // close window if not undefined
                                    if (infoWindow !== void 0) {
                                        infoWindow.close();
                                    }
                                    // create new window
                                    var infoWindowOptions = {
                                        content: content
                                    };
                                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                                    infoWindow.open(map, marker);
                                });
                            }

                            // show the map and place some markers
                            initMap();

                            setMarker(map, new google.maps.LatLng(scope.latitudeValue, scope.longitudeValue), 'Deemsys Inc', scope.address);

                        }
                    });

                }
            });
        }
    };
});