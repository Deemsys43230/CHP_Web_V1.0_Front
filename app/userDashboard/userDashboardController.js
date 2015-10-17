var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','ngTouch', 'angucomplete-alt']);

userApp.controller('UserDashboardController',function($scope,requestHandler,Flash) {
    $scope.foodSearchResult = [{
        "status": 1,
        "foodimage": "http://192.168.1.71/CyberHealthMedia/FoodImages/13/1000x1000.jpg",
        "foodImagePath": "http://192.168.1.71/CyberHealthMedia/FoodImages/13/50x50.jpg",
        "foodid": 13,
        "sessionid": [
            {
                "sessionid": 1,
                "sessionname": "Breakfast"
            },
            {
                "sessionid": 2,
                "sessionname": "Brunch"
            },
            {
                "sessionid": 3,
                "sessionname": "Lunch"
            }
        ],
        "foodname": "Delhi poori",
        "categoryid": [
            {
                "categoryid": 4,
                "categoryname": "Sea Food"
            },
            {
                "categoryid": 5,
                "categoryname": "Spicy Fries"
            },
            {
                "categoryid": 8,
                "categoryname": "Roast Spices"
            }
        ]
    }];

    $scope.foodSelected=function(selected){
      alert(selected);
    };

     $scope.inputChanged = function(str) {
        requestHandler.postRequest("searchFoodListByUser/",{"foodname":str}).then(function (response) {
           $scope.searchResponse=response.data.Food_Data;

            $.each($scope.searchResponse, function(index,value){
                value.foodImagePath=value.foodImagePath+"150x150.jpg";
            });

            $scope.foodSearchResult=$scope.searchResponse;



        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    }

});
