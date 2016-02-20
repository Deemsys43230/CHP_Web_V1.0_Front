var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash']);
userApp.controller('DemographyController',['$scope','requestHandler','Flash','$location',function($scope,requestHandler,Flash,$location) {
    var originalDemography="";
    var originalNutrition="";
    $scope.doGetDemographyandNutrition = function () {

        requestHandler.getRequest("user/getDemography/","").then(function(response) {
            $scope.demography = response.data.Demography_Data;
            //Copy Original
            $scope.demography.height=$scope.demography.height.toString();
            $scope.demography.weight=$scope.demography.weight.toString();
            $scope.demography.hip=$scope.demography.hip.toString();
            $scope.demography.waist=$scope.demography.waist.toString();

            originalDemography=angular.copy(response.data.Demography_Data);

        });
        requestHandler.getRequest("user/getNutrition/","").then(function(response) {
            //Copy Original
            $scope.nutrients = response.data.Nutrition;
            $scope.nutritionToString($scope.nutrients);

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.nutritionToString = function(nutrition){
        $scope.nutrients=nutrition;

        if($scope.nutrients.saturatedfat==null) $scope.nutrients.saturatedfat="";
        else $scope.nutrients.saturatedfat= $scope.nutrients.saturatedfat.toString();

        if($scope.nutrients.monounsaturatedfat==null) $scope.nutrients.monounsaturatedfat="";
        else $scope.nutrients.monounsaturatedfat= $scope.nutrients.monounsaturatedfat.toString();

        if($scope.nutrients.polyunsaturatedfat==null) $scope.nutrients.polyunsaturatedfat="";
        else $scope.nutrients.polyunsaturatedfat= $scope.nutrients.polyunsaturatedfat.toString();

        if($scope.nutrients.sugar==null) $scope.nutrients.sugar="";
        else $scope.nutrients.sugar= $scope.nutrients.sugar.toString();

        if($scope.nutrients.calcium==null) $scope.nutrients.calcium="";
        else $scope.nutrients.calcium= $scope.nutrients.calcium.toString();

        if($scope.nutrients.iron==null) $scope.nutrients.iron="";
        else $scope.nutrients.iron= $scope.nutrients.iron.toString();

        if($scope.nutrients.sodium==null) $scope.nutrients.sodium="";
        else $scope.nutrients.sodium= $scope.nutrients.sodium.toString();

        if($scope.nutrients.potassium==null) $scope.nutrients.potassium="";
        else $scope.nutrients.potassium= $scope.nutrients.potassium.toString();

        if($scope.nutrients.vitaminA==null) $scope.nutrients.vitaminA="";
        else $scope.nutrients.vitaminA= $scope.nutrients.vitaminA.toString();

        if($scope.nutrients.vitaminC==null) $scope.nutrients.vitaminC="";
        else $scope.nutrients.vitaminC= $scope.nutrients.vitaminC.toString();

        if($scope.nutrients.phosphorous==null) $scope.nutrients.phosphorous="";
        else $scope.nutrients.phosphorous= $scope.nutrients.phosphorous.toString();

        if($scope.nutrients.vitaminB12==null) $scope.nutrients.vitaminB12="";
        else $scope.nutrients.vitaminB12= $scope.nutrients.vitaminB12.toString();

        if($scope.nutrients.vitaminE==null) $scope.nutrients.vitaminE="";
        else $scope.nutrients.vitaminE= $scope.nutrients.vitaminE.toString();

        if($scope.nutrients.vitaminK==null) $scope.nutrients.vitaminK="";
        else $scope.nutrients.vitaminK= $scope.nutrients.vitaminK.toString();

        if($scope.nutrients.thiamin==null) $scope.nutrients.thiamin="";
        else $scope.nutrients.thiamin= $scope.nutrients.thiamin.toString();

        if($scope.nutrients.riboflavin==null) $scope.nutrients.riboflavin="";
        else $scope.nutrients.riboflavin= $scope.nutrients.riboflavin.toString();

        if($scope.nutrients.niacin==null) $scope.nutrients.niacin="";
        else $scope.nutrients.niacin= $scope.nutrients.niacin.toString();

        if($scope.nutrients.folicacid==null) $scope.nutrients.folicacid="";
        else $scope.nutrients.folicacid= $scope.nutrients.folicacid.toString();

        if($scope.nutrients.vitaminB6==null) $scope.nutrients.vitaminB6="";
        else $scope.nutrients.vitaminB6= $scope.nutrients.vitaminB6.toString();

        originalNutrition=angular.copy($scope.nutrients);
    };

    $scope.doUpdateDemography= function () {
            $scope.demography.height = parseFloat($scope.demography.height);
            $scope.demography.weight = parseFloat($scope.demography.weight);
            $scope.demography.hip = parseFloat($scope.demography.hip);
            $scope.demography.obesity=parseFloat($scope.demography.obesity);
            $scope.demography.diabetes=parseFloat($scope.demography.diabetes);

       if( $scope.demography.obesity == '0'){
           $scope.demography.obesity="";
       }
        if($scope.demography.diabetes == '0'){
            $scope.demography.diabetes="";
        }
            requestHandler.putRequest("user/insertorupdateDemography/",$scope.demography).then(function(response){
                $scope.doGetDemographyandNutrition();
                //$location.path("/demography");
                successMessage(Flash,"Successfully Updated");

            }, function () {
                errorMessage(Flash, "Please try again later!")
            });
    };

    $scope.doUpdateNutrition= function () {
        requestHandler.putRequest("user/updateNutrition/",$scope.nutrients).then(function(response){
            $scope.nutrients = response.data.Nutrition;
            successMessage(Flash,"Successfully Updated");
        },  function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    $scope.isCleanDemography =function(){
            return angular.equals(originalDemography, $scope.demography);
    };

    $scope.isCleanNutrition =function(){
        return angular.equals(originalNutrition, $scope.nutrients);
    };

    $scope.valcheck=function(){
        if($scope.demography.obesity == "true"){
            $scope.demography.obesity ="1";
        }
        else{
            $scope.demography.obesity="";
        }
    };

    $scope.doGetDemographyandNutrition();
}]);


// render image to view in list
userApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);