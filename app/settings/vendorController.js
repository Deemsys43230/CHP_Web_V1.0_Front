/**
 * Created by Deemsys on 5/4/17.
 */
var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.controller('VendorSettingsController',['$scope','requestHandler','Flash','siteMenuService','$location',function($scope,requestHandler,Flash,siteMenuService,$location){
    $scope.siteMenuList = siteMenuService;

    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });

    // To display wearable Vendor List admin view
    $scope.doGetWearableVendorList=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getWearableVendorList/", "").then(function(response){
           $scope.vendorlist=response.data.vendorlist;
            $scope.loaded=false;
            $scope.paginationLoad=true;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Search Vendor List
 /*   $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $('.search-list-form input').focus();
    });*/

    //Init function
     $scope.init = function(){

      $scope.paginationLoad=false;
        $scope.doGetWearableVendorList();

    };

}]);

/*//Filter for search

adminApp.filter('startsWithVendorName', function () {

    return function (items, vendorsearch) {
        var filtered = [];
        var letterMatch = new RegExp(vendorsearch, 'i');
        if(!items){}
        else{
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.vendorname)) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});*/

adminApp.controller('VendorEditSettingsController',['$scope','requestHandler','Flash','siteMenuService','$location','$routeParams',function($scope,requestHandler,Flash,siteMenuService,$location,$routeParams){

    $scope.siteMenuList = siteMenuService;
    $.each($scope.siteMenuList,function(index,value){
        if(value.href==$location.path().substr(1)){
            value.active = "active";
        }
        else value.active = ""
    });

    //To display Wearable vendor Details based on vendor id
    $scope.doGetWearableVendor=function(){
     requestHandler.postRequest("admin/getWearableVendordDetail/",{"vendorid":$routeParams.id }).then(function(response){
          $scope.vendor=response.data.vendorlist;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

 //To Update Vendors List
    $scope.doUpdateWearableVendor = function(){
      requestHandler.putRequest("admin/updateWearableVendor/",$scope.vendor).then(function(response){
            successMessage(Flash,"Successfully Updated");
            $location.path("vendor-settings");

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });


    };

    $scope.doGetWearableVendor();


}]);