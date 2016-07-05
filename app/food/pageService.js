var adminApp=angular.module("pageModule",[]);

adminApp.service('pageService',function(){
    var newPageNumber= 1;
    var searchFood ="";

    this.setNewPageNumber=function(pageNumberInput){
        newPageNumber=pageNumberInput;
    };

    this.getNewPageNumber=function(){
        return newPageNumber;
    };

    this.setSearchFood = function(searchInput){
        searchFood= searchInput;
    }
    this.getSearchFood = function(){
        return searchFood;
    }
});