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
                // alert("if");
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
        $scope.foodChoices.foodid = $scope.selectedFood.foodid;
    };

    $scope.getSuggestedFood=function(){

        delete $scope.foodChoices.foodid;
        requestHandler.postRequest("admin/getAdminFoodSuggestions/",$scope.foodChoices).then(function(response){

            $scope.foodSuggestedList=response.data.foodSuggestion;

        });
    };

    $scope.addSuggestFood=function(){
        $scope.foodChoices.country=parseInt($scope.foodChoices.country);
        $scope.foodChoices.session=parseInt($scope.foodChoices.session);
        $scope.foodChoices.patienttype=parseInt($scope.foodChoices.patienttype);

        requestHandler.postRequest("admin/addAdminFoodSuggestions/",$scope.foodChoices).then(function(response){
            successMessage(Flash,"Successfully Added!!");
            $scope.getSuggestedFood();
        });
    };

    $scope.removeSuggestFood=function(id){

        /*$scope.loaded=true;
         requestHandler.postRequest("admin/rejectExerciseSuggestion/",{'suggestionid':id}).then(function(response){
         $scope.loaded=false;
         $scope.doGetAllExerciseSuggestion();
         successMessage(Flash,"Successfully Updated");

         },function(){
         errorMessage(Flash,"Please try again later!")
         });*/
    };

    $scope.init=function(){
        $scope.getSuggestedFood();
    };

    $scope.init();
}]);

