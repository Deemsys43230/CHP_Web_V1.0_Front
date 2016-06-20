var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","flash"]);userApp.controller("DemographyController",["$scope","requestHandler","Flash","$location",function(a,b,c,d){var e="",f="";a.doGetDemographyandNutrition=function(){b.getRequest("user/getDemography/","").then(function(b){if(a.demography=b.data.Demography_Data,a.demography.height=a.demography.height.toString(),a.demography.weight=a.demography.weight.toString(),a.demography.hip=a.demography.hip.toString(),a.demography.waist=a.demography.waist.toString(),a.demography.userPlanType=a.demography.userPlanType.toString(),a.demography.userActivityType=a.demography.userActivityType.toString(),2==a.userProfile.unitPreference){a.demography.height=a.demography.height.toString();var c=a.demography.height.split("."),d=new Array;d=c,a.demography.heightFeet=d[0],void 0==d[1]?a.demography.heightInches=0:a.demography.heightInches=d[1]}e=angular.copy(b.data.Demography_Data)}),b.getRequest("user/getNutrition/","").then(function(b){a.nutrients=b.data.Nutrition,a.nutritionToString(a.nutrients)},function(){errorMessage(c,"Please try again later!")})},a.nutritionToString=function(b){a.nutrients=b,null==a.nutrients.saturatedfat?a.nutrients.saturatedfat="":a.nutrients.saturatedfat=a.nutrients.saturatedfat.toString(),null==a.nutrients.monounsaturatedfat?a.nutrients.monounsaturatedfat="":a.nutrients.monounsaturatedfat=a.nutrients.monounsaturatedfat.toString(),null==a.nutrients.polyunsaturatedfat?a.nutrients.polyunsaturatedfat="":a.nutrients.polyunsaturatedfat=a.nutrients.polyunsaturatedfat.toString(),null==a.nutrients.sugar?a.nutrients.sugar="":a.nutrients.sugar=a.nutrients.sugar.toString(),null==a.nutrients.calcium?a.nutrients.calcium="":a.nutrients.calcium=a.nutrients.calcium.toString(),null==a.nutrients.iron?a.nutrients.iron="":a.nutrients.iron=a.nutrients.iron.toString(),null==a.nutrients.sodium?a.nutrients.sodium="":a.nutrients.sodium=a.nutrients.sodium.toString(),null==a.nutrients.potassium?a.nutrients.potassium="":a.nutrients.potassium=a.nutrients.potassium.toString(),null==a.nutrients.vitaminA?a.nutrients.vitaminA="":a.nutrients.vitaminA=a.nutrients.vitaminA.toString(),null==a.nutrients.vitaminC?a.nutrients.vitaminC="":a.nutrients.vitaminC=a.nutrients.vitaminC.toString(),null==a.nutrients.phosphorous?a.nutrients.phosphorous="":a.nutrients.phosphorous=a.nutrients.phosphorous.toString(),null==a.nutrients.vitaminB12?a.nutrients.vitaminB12="":a.nutrients.vitaminB12=a.nutrients.vitaminB12.toString(),null==a.nutrients.vitaminE?a.nutrients.vitaminE="":a.nutrients.vitaminE=a.nutrients.vitaminE.toString(),null==a.nutrients.vitaminK?a.nutrients.vitaminK="":a.nutrients.vitaminK=a.nutrients.vitaminK.toString(),null==a.nutrients.thiamin?a.nutrients.thiamin="":a.nutrients.thiamin=a.nutrients.thiamin.toString(),null==a.nutrients.riboflavin?a.nutrients.riboflavin="":a.nutrients.riboflavin=a.nutrients.riboflavin.toString(),null==a.nutrients.niacin?a.nutrients.niacin="":a.nutrients.niacin=a.nutrients.niacin.toString(),null==a.nutrients.folicacid?a.nutrients.folicacid="":a.nutrients.folicacid=a.nutrients.folicacid.toString(),null==a.nutrients.vitaminB6?a.nutrients.vitaminB6="":a.nutrients.vitaminB6=a.nutrients.vitaminB6.toString(),f=angular.copy(a.nutrients)},a.doUpdateDemography=function(){a.demography.heightFeet&&a.demography.heightInches&&(a.demography.height=a.demography.heightFeet+"."+a.demography.heightInches),a.demography.height=parseFloat(a.demography.height),a.demography.weight=parseFloat(a.demography.weight),a.demography.hip=parseFloat(a.demography.hip),a.demography.obesity=parseFloat(a.demography.obesity),a.demography.diabetes=parseFloat(a.demography.diabetes),"0"==a.demography.obesity&&(a.demography.obesity=""),"0"==a.demography.diabetes&&(a.demography.diabetes=""),b.putRequest("user/insertorupdateDemography/",a.demography).then(function(b){a.doGetDemographyandNutrition(),successMessage(c,"Successfully Updated")},function(){errorMessage(c,"Please try again later!")})},a.doUpdateNutrition=function(){b.putRequest("user/updateNutrition/",a.nutrients).then(function(b){a.nutrients=b.data.Nutrition,successMessage(c,"Successfully Updated")},function(){errorMessage(c,"Please try again later!")})},a.isCleanDemography=function(){return angular.equals(e,a.demography)},a.isCleanNutrition=function(){return angular.equals(f,a.nutrients)},a.valcheck=function(){"true"==a.demography.obesity?a.demography.obesity="1":a.demography.obesity=""},a.getUserId=function(){b.getRequest("getUserId/","").then(function(b){a.userProfile=b.data.User_Profile,a.doGetDemographyandNutrition()})},a.init=function(){a.getUserId()},a.init()}]),userApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]);