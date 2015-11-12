/**
 * Created by Deemsys on 9/21/2015.
 */
var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','ui.bootstrap']);


userApp.controller('UserProfileController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {


    // Function to convert image url to base64
    $scope.convertImgToBase64=function(url, callback, outputFormat){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this,0,0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/jpg');
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    };

    $scope.doGetProfile=function(){

        requestHandler.getRequest("getUserId/","").then(function(response){


            $scope.userProfile=response.data.User_Profile;
            if($scope.userProfile.gender == null) {
                $scope.userProfile.gender = "1";
            }

            //alert($scope.userProfile.imageurl);
            $scope.userProfile.imageurl=requestHandler.convertUrl($scope.userProfile.imageurl);
          //  $scope.userProfile.imageurl=$scope.userProfile.imageurl.substring($scope.userProfile.imageurl.indexOf("/") + 14, $scope.userProfile.imageurl.length);

            //Convert Integer to String
            if($scope.userProfile.gender)
            $scope.userProfile.gender=$scope.userProfile.gender.toString();

            $scope.selectedDate = $scope.userProfile.dob;

            //Delete unwanted variables
            delete $scope.userProfile.createdon;
            delete $scope.userProfile.userid;
            delete $scope.userProfile.isProfileUpdated;
            delete $scope.userProfile.status;

            //Copy Original
            $scope.orginalUserProfile=angular.copy($scope.userProfile);

            $('.image-editor').cropit({
                imageState: {
                    src: $scope.userProfile.imageurl+"?decache="+Math.random()
                }
            });
        });

        requestHandler.getRequest("getUserSettings/","").then(function(response){
            $.each(response.data.User_Settings,function(index,value){
                $scope.privacydetail = value.isprivacy;
                if($scope.privacydetail == 1){
                    document.privacyForm.elements['cmn-toggle-7'].checked = true;
                }
                else if($scope.privacydetail == 0){
                    document.privacyForm.elements['cmn-toggle-7'].checked = false;
                }
            });

        });
        };

    $scope.refreshImage=function(){
        requestHandler.getRequest("getUserId/","").then(function(response){
            $scope.userProfile.imageurl=response.data.User_Profile.imageurl;
            $scope.userProfile.imageurl=requestHandler.convertUrl($scope.userProfile.imageurl);
            $scope.userProfile.imageurl=$scope.userProfile.imageurl+"?decache="+Math.random();

            $('.image-editor').cropit({
                imageState: {
                    src: $scope.userProfile.imageurl+"?decache="+Math.random()
                }
            });
        });
    };


    $scope.doUpdateProfile= function () {

        $scope.convertImgToBase64($scope.userProfile.imageurl, function(base64Img){

            //Convert Image to base64
            $scope.userProfile.imageurl=base64Img;

            requestHandler.putRequest("updateProfile/",$scope.userProfile).then(function(){
                successMessage(Flash,"Successfully Updated");
                //Copy Orginal
                $scope.orginalUserProfile=angular.copy($scope.userProfile);

            });
        });


    };


    $scope.doUpdateProfileImage=function(){
        //Convert the image to base 64
        var image = $('.image-editor').cropit('export');

        requestHandler.postRequest("uploadProfileImage/",{'imageurl':image}).then(function(response){
            $scope.refreshImage();
        },function(response){
            errorMessage(Flash,"Please Try again later!");
        });
    };

    $scope.doGetProfile();

    //To Enable the update button if changes occur.
    $scope.isClean = function() {
        return angular.equals ($scope.orginalUserProfile, $scope.userProfile);
    };

    //Change Password
    $scope.doChangePassword=function(){
        requestHandler.postRequest("changePassword/",$scope.changePassword).then(function(response){
            if(response.data.Response_status==0){
                $scope.doGetProfile();
                errorMessage(Flash,"Incorrect&nbsp;current&nbsp;password");
                $scope.changePasswordForm.$setPristine();
            }
            else if(response.data.Response_status==1) {
                $scope.doGetProfile();
                successMessage(Flash, "Password&nbsp;changed&nbsp;successfully");
                $scope.changePasswordForm.$setPristine();
            }
        },function(response){
            errorMessage(Flash,"Please try again later!");
        });
    };

    $scope.reset=function(){
        $scope.changePassword={};
        $scope.changePasswordForm.$setPristine();
    };

        //Enable or Disable Privacy details
    $scope.privacydetails = function(){
        requestHandler.putRequest("updateUserSettingsIsPrivacy/","").then(function(response){
        //$scope.doGetProfile();
        },function(response){
            errorMessage(Flash,"Please Try Again Later");
        });

    };
    //Date Picker
    $scope.prevent=function(){
        event.preventDefault();
    };

    $scope.change=function(){
        $scope.userProfile.dob=$scope.selectedDate.format("dd/mm/yyyy");
    };

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    $scope.format = "dd/MM/yyyy";

    var dateFormat = function () {
        var    token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;

            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date;
            if (isNaN(date)) throw SyntaxError("invalid date");

            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var    _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d:    d,
                    dd:   pad(d),
                    ddd:  dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m:    m + 1,
                    mm:   pad(m + 1),
                    mmm:  dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy:   String(y).slice(2),
                    yyyy: y,
                    h:    H % 12 || 12,
                    hh:   pad(H % 12 || 12),
                    H:    H,
                    HH:   pad(H),
                    M:    M,
                    MM:   pad(M),
                    s:    s,
                    ss:   pad(s),
                    l:    pad(L, 3),
                    L:    pad(L > 99 ? Math.round(L / 10) : L),
                    t:    H < 12 ? "a"  : "p",
                    tt:   H < 12 ? "am" : "pm",
                    T:    H < 12 ? "A"  : "P",
                    TT:   H < 12 ? "AM" : "PM",
                    Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();

    // Some common format strings
    dateFormat.masks = {
        "default":      "ddd mmm dd yyyy HH:MM:ss",
        shortDate:      "m/d/yy",
        mediumDate:     "mmm d, yyyy",
        longDate:       "mmmm d, yyyy",
        fullDate:       "dddd, mmmm d, yyyy",
        shortTime:      "h:MM TT",
        mediumTime:     "h:MM:ss TT",
        longTime:       "h:MM:ss TT Z",
        isoDate:        "yyyy-mm-dd",
        isoTime:        "HH:MM:ss",
        isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };

    // For convenience...
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };


}]).constant('datepickerPopupConfig', {
    datepickerPopup: "dd/MM/yyyy",
    closeOnDateSelection: true,
    appendToBody: false,
    showButtonBar: false
}).constant('datepickerConfig', {
    formatDay: 'dd',
    formatMonth: 'MMMM',
    formatYear: 'yyyy',
    formatDayHeader: 'EEE',
    formatDayTitle: 'MMMM yyyy',
    formatMonthTitle: 'yyyy',
    datepickerMode: 'day',
    minMode: 'day',
    maxMode: 'year',
    showWeeks: false,
    startingDay: 0,
    yearRange: 20,
    minDate: null,// mm/dd/yyyy
    maxDate: new Date()// mm/dd/yyyy
});

// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

userApp.directive('compareTo',function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

/*
userApp.directive('numbersOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                // this next if is necessary for when using ng-required on your input.
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});*/
