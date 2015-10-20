var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','ngTouch', 'angucomplete-alt','ngPercentDisplay','userDashboardServiceModule']);

userApp.controller('UserDashboardController',function($scope,requestHandler,Flash,UserDashboardService) {
    $scope.foodSearchResult = [];
    $scope.userFood={};
    $scope.userFood.sessionid=1;
    $scope.servings=0;
    $scope.caloriesIntake=0;

    $scope.doUserAddFood=function(){
        $(function(){
            $("#lean_overlay").fadeTo(1000);
            $("#modal-add-food").fadeIn(600);
            $(".user_register").show();
        });
        $(".modal_close").click(function(){
            $(".user_register").hide();
            $("#modal-add-food").hide();
            $("#lean_overlay").hide();
        });

        $("#lean_overlay").click(function(){
            $(".user_register").hide();
            $("#modal-add-food").hide();
            $("#lean_overlay").hide();
        });
    };

    //

    //On Select search function
    $scope.foodSelected=function(selected){
        var getFoodDetailPromise=UserDashboardService.doGetSelectedFoodDetails(selected.description.foodid);
        getFoodDetailPromise.then(function(result){
            $scope.userSelectedFoodDetails=result;
            $scope.doUserAddFood();
        });
    };


    $scope.doCalculateCalories=function(measureid){
        if($scope.userFood.servings==0){
            $scope.caloriesIntake=0;
        }else{
            $scope.caloriesIntake=$scope.userFood.measure.calories*$scope.userFood.servings;
        }

    };

    //Insert User Food
    $scope.doInsertUserFood=function(){
        //Set values according to the api calls
        $scope.userFood.foodid=$scope.userSelectedFoodDetails.foodid;
        $scope.userFood.measureid=$scope.userFood.measure.measureid;
        $scope.userFood.addeddate="17/10/2015";
        $scope.userFood.servings=parseInt($scope.userFood.servings);

        var foodInsertPromise=UserDashboardService.doInsertUserFood($scope.userFood);
        foodInsertPromise.then(function(){
            $scope.loadFoodDiary();
        });



    };

    //Delete User Food
    $scope.doDeleteUserFood= function (userFoodId) {
        var foodDeletePromise=UserDashboardService.doDeleteUserFood(userFoodId);
        foodDeletePromise.then(function(){
            $scope.loadFoodDiary();
        });
    };

    //On load Food Diary
    $scope.loadFoodDiary=function(){
        var userFoodDiaryDetailPromise=UserDashboardService.getFoodDiary("17/10/2015");
        userFoodDiaryDetailPromise.then(function(result){
            $scope.userFoodDiaryDataAll=result;
            $scope.loadSessionDetails();
        });
    };


    //Load Details Based on session
    $scope.loadSessionDetails=function(){
        switch(parseInt($scope.userFood.sessionid)){
            case 1:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.BreakFast;
                break;
            case 2:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Brunch;
                break;
            case 3:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Lunch;
                break;
            case 4:$scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Evening;
                break;
            case 5: $scope.userFoodDiaryData=$scope.userFoodDiaryDataAll.Dinner;
                break;
            default :break;
        }
    };

    //Search Function
     $scope.inputChanged = function(searchStr) {
         var userFoodDiaryDetailPromise=UserDashboardService.searchFood(searchStr);
         userFoodDiaryDetailPromise.then(function(result){
             $scope.foodSearchResult=result;
         });
    };


    //Initialize
    $scope.loadFoodDiary();

});

userApp.directive('ngDatepicker', ['$document', function($scope,$document) {
    'use strict';

    var setScopeValues = function (scope, attrs) {
        scope.format = attrs.format || 'DD/mm/YYYY';
        scope.viewFormat = attrs.viewFormat || 'DD/mm/YYYY';
        scope.locale = attrs.locale || 'en';
        scope.firstWeekDaySunday = scope.$eval(attrs.firstWeekDaySunday) || false;
        scope.placeholder = attrs.placeholder || 'Pick a date';
    };

    return {
        restrict: 'EA',
        require: '?ngModel',
        scope: {},
        link: function (scope, element, attrs, ngModel) {
            setScopeValues(scope, attrs);

            scope.calendarOpened = false;
            scope.days = [];
            scope.dayNames = [];
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            }

            if(mm<10) {
                mm='0'+mm
            }
            scope.viewValue =  dd+'/'+mm+'/'+yyyy;
            scope.dateValue = null;


            moment.locale(scope.locale);
            var date = moment();

            var generateCalendar = function (date) {
                var lastDayOfMonth = date.endOf('month').date(),
                    month = date.month(),
                    year = date.year(),
                    n = 1;

                var firstWeekDay = date.set('date', 1).day();
                if (firstWeekDay !== 1) {
                    n -= firstWeekDay;
                }

                scope.dateValue = date.format('MMMM YYYY');
                scope.days = [];

                for (var i = n; i <= lastDayOfMonth; i += 1) {
                    if (i > 0) {
                        scope.days.push({day: i, month: month + 1, year: year, enabled: true});
                    } else {
                        scope.days.push({day: null, month: null, year: null, enabled: false});
                    }
                }
            };

            var generateDayNames = function () {
                var date = scope.firstWeekDaySunday === true ?  moment('07/06/2015') : moment('01/06/2015');
                for (var i = 0; i < 7; i += 1) {
                    scope.dayNames.push(date.format('ddd'));
                    date.add('1', 'd');
                }
            };

            generateDayNames();

            scope.showCalendar = function () {
                scope.calendarOpened = true;
                generateCalendar(date);
            };

            scope.closeCalendar = function () {
                scope.calendarOpened = false;
            };

            scope.prevYear = function () {
                date.subtract(1, 'Y');
                generateCalendar(date);
            };

            scope.prevMonth = function () {
                date.subtract(1, 'M');
                generateCalendar(date);
            };

            scope.nextMonth = function () {
                date.add(1, 'M');
                generateCalendar(date);
            };

            scope.nextYear = function () {
                date.add(1, 'Y');
                generateCalendar(date);
            };

            scope.selectDate = function (event, date) {
                event.preventDefault();
                var selectedDate = moment(date.day + '/' + date.month + '/' + date.year, 'DD/mm/YYYY');
                ngModel.$setViewValue(selectedDate.format(scope.format));
                scope.viewValue = selectedDate.format(scope.viewFormat);
                alert(scope.viewValue);
                scope.closeCalendar();
            };

            // if clicked outside of calendar
            var classList = ['ng-datepicker', 'ng-datepicker-input'];
            if (attrs.id !== undefined) classList.push(attrs.id);
            $document.on('click', function (e) {
                if (!scope.calendarOpened) return;

                var i = 0,
                    element;

                if (!e.target) return;

                for (element = e.target; element; element = element.parentNode) {
                    var id = element.id;
                    var classNames = element.className;

                    if (id !== undefined) {
                        for (i = 0; i < classList.length; i += 1) {
                            if (id.indexOf(classList[i]) > -1 || classNames.indexOf(classList[i]) > -1) {
                                return;
                            }
                        }
                    }
                }

                scope.closeCalendar();
                scope.$apply();
            });

            ngModel.$render = function () {
                var newValue = ngModel.$viewValue;
                if (newValue !== undefined) {
                    scope.viewValue = moment(newValue).format(attrs.viewFormat);
                    scope.dateValue = newValue;
                }
            };

        },
        template:
            '<div><input type="text" ng-focus="showCalendar()" ng-value="viewValue" class="ng-datepicker-input" placeholder="{{ placeholder }}"></div>' +
                '<div class="ng-datepicker" ng-show="calendarOpened">' +
                '  <div class="controls">' +
                '    <div class="left">' +
                '      <i class="fa fa-backward prev-year-btn" ng-click="prevYear()"></i>' +
                '      <i class="fa fa-caret-left prev-month-btn" ng-click="prevMonth()"></i>' +
                '    </div>' +
                '    <span class="date" ng-bind="dateValue"></span>' +
                '    <div class="right">' +
                '      <i class="fa fa-caret-right next-month-btn" ng-click="nextMonth()"></i>' +
                '      <i class="fa fa-forward next-year-btn" ng-click="nextYear()"></i>' +
                '    </div>' +
                '  </div>' +
                '  <div class="day-names">' +
                '    <span ng-repeat="dn in dayNames">' +
                '      <span>{{ dn }}</span>' +
                '    </span>' +
                '  </div>' +
                '  <div class="calendar">' +
                '    <span ng-repeat="d in days">' +
                '      <span class="day" ng-click="selectDate($event, d)" ng-class="{disabled: !d.enabled}">{{ d.day }}</span>' +
                '    </span>' +
                '  </div>' +
                '</div>'
    };

}]);


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
