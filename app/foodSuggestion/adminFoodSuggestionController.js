var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination','ui.bootstrap','userDashboardServiceModule']);

adminApp.controller('AdminFoodSuggestionController',['$scope','requestHandler','Flash','UserDashboardService',function($scope,requestHandler,Flash,UserDashboardService) {
    $scope.activeClass = {adminfoodsuggestion: 'active'};
    $scope.foodSearchResult = [];
    $scope.userFood={};
    $scope.userFood.sessionid=1;
    //Search Function for food
    $scope.inputChanged = function(searchStr) {

        if(searchStr.length >=3){
            $scope.loadingFoods=true;
            if($scope.foodSearchResult.length==0){
                $scope.loadingFoods=true;
            }
            var userFoodDiaryDetailPromise=UserDashboardService.searchFoodByAdmin(searchStr,$scope.userFood.sessionid);
            return userFoodDiaryDetailPromise.then(function(result){
                var foods = [];
                $scope.foodSearchResult=result;
                $scope.loadingFoods=false;
                return $scope.foodSearchResult;
            });
        }
        else{
            $('.dropdown-menu').animate({
                scrollTop: 0
            }, 0);
            return {};
        }

    };
    $scope.foodChoices={};
    $scope.foodSelected=function(){
        $scope.isAddFood=false;
        //$scope.foodChoices.foodid = $scope.selectedFood.foodid;
    };

    $scope.getSuggestedFood=function(){

        delete $scope.foodChoices.foodid;
        requestHandler.postRequest("admin/getAdminFoodSuggestions/",$scope.foodChoices).then(function(response){

            $scope.foodSuggestedList=response.data.foodSuggestion;

        });
    };

    $scope.addSuggestFood=function(){
        requestHandler.postRequest("admin/getAdminFoodSuggestions/",$scope.foodChoices).then(function(response){

            $scope.foodSuggestedList=response.data.foodSuggestion;

            $.each($scope.foodSuggestedList, function(index,value) {
                if(value.foodId == $scope.selectedFood.foodid){
                    $scope.foodExists =true;
                }
                else{
                    $scope.foodExists =false;
                }
            });

            if($scope.foodExists){
                errorMessage(Flash,"Food already exists!!");
                $scope.selectedFood="";
                $scope.isAddFood=true;
                $scope.getSuggestedFood();
                $scope.foodChoices.country=$scope.foodChoices.country.toString();
                $scope.foodChoices.session=$scope.foodChoices.session.toString();
                $scope.foodChoices.patienttype=$scope.foodChoices.patienttype.toString();
            }
            else{
                $scope.foodChoices.foodid = $scope.selectedFood.foodid;
                $scope.foodChoices.country=parseInt($scope.foodChoices.country);
                $scope.foodChoices.session=parseInt($scope.foodChoices.session);
                $scope.foodChoices.patienttype=parseInt($scope.foodChoices.patienttype);

                requestHandler.postRequest("admin/addAdminFoodSuggestions/",$scope.foodChoices).then(function(response){
                    successMessage(Flash,"Successfully Added!!");
                    $scope.selectedFood="";
                    $scope.isAddFood=true;
                    $scope.getSuggestedFood();
                    $scope.foodChoices.country=$scope.foodChoices.country.toString();
                    $scope.foodChoices.session=$scope.foodChoices.session.toString();
                    $scope.foodChoices.patienttype=$scope.foodChoices.patienttype.toString();
                });
            }


        });



    };

    $scope.removeSuggestFood=function(id){

        $scope.foodChoices.country=parseInt($scope.foodChoices.country);
        $scope.foodChoices.session=parseInt($scope.foodChoices.session);
        $scope.foodChoices.patienttype=parseInt($scope.foodChoices.patienttype);
        $scope.foodChoices.foodid = id;
        requestHandler.postRequest("admin/deleteAdminFoodSuggestions/",$scope.foodChoices).then(function(response){
            successMessage(Flash,"Successfully Removed!!");
            $scope.getSuggestedFood();
            $scope.foodChoices.country=$scope.foodChoices.country.toString();
            $scope.foodChoices.session=$scope.foodChoices.session.toString();
            $scope.foodChoices.patienttype=$scope.foodChoices.patienttype.toString();
        });
    };

    $scope.init=function(){
        $scope.getSuggestedFood();
        $scope.isAddFood=true;
    };

    $scope.init();
}]);

