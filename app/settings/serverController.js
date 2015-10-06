/**
 * Created by Deemsys on 9/19/2015.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

adminApp.controller('ServerSettingsController',function($scope,requestHandler,Flash){
    var original="";
    $scope.activeClass = {sever:'active'};

    $scope.copyOrginal_serverSettings=function(serverSettings){
        $scope.serverSettings = serverSettings;
        $scope.serverSettings.port = $scope.serverSettings.port.toString();
        $scope.serverSettings.ssl = $scope.serverSettings.ssl.toString();
        original=angular.copy( $scope.serverSettings);
    }

                /*VIEW ALL*/
    $scope.doGetServerSettings= function () {
        requestHandler.getRequest("admin/getappdetails","").then(function(response){
            $scope.serverSettings=response.data.App_settings[0];
            $scope.copyOrginal_serverSettings($scope.serverSettings);

        },function(response){
            errorMessage(Flash,"Please Try again later");
        });

    };

                /*UPDATE SERVER*/
    $scope.doUpdateServerSettings=function(){
        requestHandler.putRequest("admin/updateEmailDetails",$scope.serverSettings).then(function(response){
            $scope.copyOrginal_serverSettings($scope.serverSettings);
            successMessage(Flash,"Successfully Updated!");
        },function(){
            errorMessage(Flash,"Please try again later");
        });
    };

    $scope.doGetServerSettings_isClean=function(){
        return angular.equals(original, $scope.serverSettings);
    };

    $scope.doGetServerSettings();

});
