/**
 * Created by user on 26-09-2015.
 */

var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ui.select','foodServiceModule','angularUtils.directives.dirPagination','pageModule']);

adminApp.controller('FoodUploadController', ['$q','$scope', 'FileUploader', function($q,$scope, FileUploader) {
    //Start code for uploader//
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php'
    });

    // FILTERS
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);
    //Start code for uploader//

}]);


adminApp.controller('FoodController',['$rootScope','$scope','requestHandler','Flash','pageService',function ($rootScope,$scope,requestHandler,Flash,pageService) {


    //sidebar menu active class
    $scope.activeClass = {foodlist:'active'};


    //sorting
    /*$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };*/


    $scope.sortfoodidicon="fa fa-caret-down";
    $scope.sortfoodnameicon = "fa fa-caret-down";
   /* $scope.sortcategoryicon = "fa fa-caret-down";
    $scope.sortsessionicon = "fa fa-caret-down";
    $scope.sortregionicon = "fa fa-caret-down";*/

    //sorting by food Id
    $scope.sortFoodId = function(){
        $scope.sortKey='foodid';
        $scope.reverse = !$scope.reverse;
        if($scope.sortfoodidicon=="fa fa-caret-down")$scope.sortfoodidicon="fa fa-caret-up";
        else $scope.sortfoodidicon="fa fa-caret-down";
    };

    //sorting by food name
    $scope.sortFoodName = function(){
        $scope.sortKey='foodname';
        $scope.reverse = !$scope.reverse;
        if($scope.sortfoodnameicon=="fa fa-caret-down") $scope.sortfoodnameicon="fa fa-caret-up";
        else $scope.sortfoodnameicon="fa fa-caret-down";
    };

   /* //sorting by category
    $scope.sortCategory = function(){
        $scope.sortKey = 'category.categoryname';
        $scope.reverse = !$scope.reverse;
        if($scope.sortcategoryicon=="fa fa-caret-down")$scope.sortcategoryicon="fa fa-caret-up";
        else $scope.sortcategoryicon="fa fa-caret-down";
    };


    //sorting by session
    $scope.sortSession = function(){
        $scope.sortKey = 'sessionname';
        $scope.reverse = !$scope.reverse;
        if($scope.sortsessionicon=="fa fa-caret-down")$scope.sortsessionicon="fa fa-caret-up";
        else $scope.sortsessionicon="fa fa-caret-down";
    };


    //sorting by region
    $scope.sortRegion = function(){
        $scope.sortKey = 'regionname';
        $scope.reverse = !$scope.reverse;
        if($scope.sortregionicon=="fa fa-caret-down")$scope.sortregionicon="fa fa-caret-up";
        else $scope.sortregionicon="fa fa-caret-down";
    };*/


    //Get Food List
    $scope.doGetAllFoodItems=function(){
       /* var sessionvalue="";
        var sessionname="";
        var categoryvalue="";
        var categoryname="";
        var regionname="";*/
        $scope.loaded=true;
        return requestHandler.getRequest("admin/getFoodList/","").then(function(response){
            $scope.foodList=response.data.Food_Data;
            $scope.paginationLoad=true;
            $scope.loaded=false;
            // Tool tip for session in food list
          /* $.each($scope.foodList,function(index,value){
               value.session="";
                $.each(value.sessionid,function(index,value1){
                    sessionvalue=value1.sessionname;
                    sessionname = sessionname + sessionvalue;
                    if(index!=value.sessionid.length-1)
                        sessionname=sessionname+',';
                });
                value.session = sessionname;
                sessionname="";

            });*/


            // Tool tip for category in food list
            /*$.each($scope.foodList,function(index,value){
                value.category="";
                $.each(value.categoryid,function(index,value1){
                    categoryvalue=value1.categoryname;
                    categoryname = categoryname + categoryvalue;
                    if(index!=value.categoryid.length-1)
                        categoryname=categoryname+',';
                });
                value.category = categoryname;
                categoryname="";

            });
*/
            //For search
            /*$.each($scope.foodList,function(index,value){
                value.region="";
               regionname= value.regionid.regionname;
                value.region = regionname;

            });*/
        },function(response){
        });
    };
    //End Get Food List

    //Enable Disable Food Items
    $scope.doEnableDisable=function(foodId){

        if($('.search-list-form').css('display') != 'none'){
            $(".search-list-form").hide();
            $(".search-list-form").show(3400);
        }

        requestHandler.postRequest("admin/enableordisableFood/",{"foodid":foodId}).then(function(response){

            if(response.data.Response_status==1){
                var foodListPromise=$scope.doGetAllFoodItems();
                foodListPromise.then(function(){
                    successMessage(Flash,"Successfully Updated");
                });

            }
            else if(response.data.Response_status==0){
                var foodListPromise=$scope.doGetAllFoodItems();
                foodListPromise.then(function(){
                errorMessage(Flash,"Food used by users");
                });
            }

        },function(response){
            errorMessage(Flash,"Please Try Again Later");
        });

    };
    //End Enable Disable

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetAllFoodItems();
    };
    //End Initial Load

    // Search Food Type
    $('.show-list-search').click(function() {
        $('.search-list-form').toggle(300);
        $scope.pagenumber="";
        $('.search-list-form input').focus();
    });
    $scope.pagenumber="";
    if($rootScope.previousState=="/food-view/:id"||$rootScope.previousState=="/food-edit/:id"){

        $scope.newPageNumber=pageService.getNewPageNumber();
        $scope.foodsearch =pageService.getSearchFood();
        if($scope.foodsearch!=""){
            $('.show-list-search').click();
        }
    }else{
        pageService.setSearchFood("");
        pageService.setNewPageNumber(1);
        $scope.newPageNumber=1;
        $scope.foodsearch="";
    }


    $scope.goToPage=function(){
        pageService.setNewPageNumber($scope.pagenumber);
        $scope.newPageNumber=pageService.getNewPageNumber();
        $scope.pagenumber="";
    };

    $scope.$watch('[newPageNumber,foodsearch]', function() {
        pageService.setNewPageNumber($scope.newPageNumber);
        pageService.setSearchFood($scope.foodsearch);
    });

}]);


adminApp.controller("FoodDetailsViewController",['$scope','requestHandler','$routeParams',function($scope,requestHandler,$routeParams){

    //Get Particular Food Details
    $scope.doGetFoodDetails= function () {
        requestHandler.postRequest("getFoodDetailByadmin/",{"foodid":$routeParams.id}).then(function(response){
            $scope.foodDetails=response.data.Food_Data;
            $scope.foodDetails.foodImagePath=$scope.foodDetails.foodImagePath+"200x200.jpg"+"?decache="+Math.random();

        },function(response){
            console.log("Not able to pull Food Measure List");
        })
    };
    //End Get Particular Food Details
    $scope.doGetFoodDetails();

}]);

adminApp.controller("FoodDetailsEditController",['$q','$scope','requestHandler','FoodService','$routeParams','Flash','$route','fileReader','$location','$timeout',function($q,$scope,requestHandler,FoodService,$routeParams,Flash,$route,fileReader,$location,$timeout){

    var original="";
    $scope.title=$route.current.title;
    $scope.type=$route.current.type;
    $scope.isNew=$route.current.isNew;
    $scope.imageUpload=false;
    $scope.inputContainsFile = true;
    $scope.doingUpdate=false;

    //For Tag Input
    $scope.tagTransform = function (newTag) {
        if($scope.tagListArray.indexOf(newTag)==-1){
            var item = {
                "tagid": null,
                "tagname": newTag
            };

            return item;
        }
    };

    //Get Particular Food Details
    $scope.doGetFoodDetails= function () {
        requestHandler.postRequest("getFoodDetailByadmin/",{"foodid":$routeParams.id}).then(function(response){

            $scope.foodDetails=response.data.Food_Data;
            $scope.foodDetails.foodImagePath=$scope.foodDetails.foodImagePath+"200x200.jpg"+"?decache="+Math.random();
            $scope.foodDetails.sessionSet=FoodService.setSessionValues($scope.foodDetails.sessionid);

            //Set Measure Values
            var foodMeasurePromise=FoodService.doGetMeasures($scope.foodDetails.measureid);
            foodMeasurePromise.then(function(result){
               $scope.foodMeasureListAll=result;

            });

            //Set Region Values
            $scope.foodDetails.regionid=$scope.foodDetails.regionid.regionid;

            original=angular.copy($scope.foodDetails);

        },function(response){
            console.log("Not able to pull Food Measure List");
        });
    };
    //End Get
     $scope.foTypeError=false;
     $scope.foSizeError=false;

    //Food Image  Controller
    $scope.getFile = function () {
         $scope.foTypeError=false;
     $scope.foSizeError=false;
        $scope.progress = 0;
        var imgfoFile=document.getElementById('imgfofile').files[0];
        var imgfoName=imgfoFile.name;
         var validFormats = ['jpg','jpeg','png'];
        var extn = imgfoName.split(".").pop();       //getting extension of selected file
         if(validFormats.indexOf(extn) == -1){       //checking file extension wih valid file format extesion
            $timeout( function(){ 
            $scope.foTypeError=true;    
           $scope.progress = 0;
           $scope.foodDetails.foodimage ="../../images/No_image_available.jpg";
              $scope.inputContainsFile = true;
       },100);
            
                }
                var _URL = window.URL || window.webkitURL;
        img = new Image();
         img.onload = function () {
        if(this.width < 1000 || this.height < 1000)   //checking the height and width of imagefile while uploading  
            {
                 $timeout( function(){  //timeout for image preview
                $scope.foSizeError=true;       
               $scope.progress = 0;
           $scope.foodDetails.foodimage ="../../images/No_image_available.jpg";
              $scope.inputContainsFile = true;
               
            },100);
                 } 
             }
            
        img.src = _URL.createObjectURL(imgfoFile);    
        fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
            $scope.foodDetails.foodimage = result;
            $scope.inputContainsFile = false;
        });
    };

    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });

    $scope.google=function(item){
        console.log(item);
    }

    $scope.doRefreshPreview=function(){
        $scope.foodDetails.foodimage=$scope.foodDetails.foodImagePath;
        $scope.inputContainsFile = true;
    };

    //Update Food Image
    $scope.doUpdateFoodImage=function(){
        $scope.imageUpload=true;
        $scope.foodDetails.foodImagePath=$scope.foodDetails.foodimage;
    };
   //End Food Image Upload Controller

    //Do Update Food
    $scope.doUpdateFoodDetails= function () {
        alert("update");
        //For disabling the update button after one click
        $scope.doingUpdate=true;
        $scope.spinner=true;
        //Get Update Details
        $scope.foodDetails.sessionid=FoodService.getSessionArray($scope.foodDetails.sessionSet);
        $scope.foodDetails.categoryid=FoodService.getCategoryArray($scope.foodDetails.categoryid);

        if(!$scope.imageUpload){
            delete $scope.foodDetails.foodimage;
        }
        delete $scope.foodDetails.foodImagePath;

        //Tag Array Operation
        var tagArray=[];
        var tagPromise;
        $.each($scope.foodDetails.tagid, function(index,value) {
            if(value.tagid!=null){
                tagArray.push(parseInt(value.tagid));
            }else{
                tagPromise=FoodService.insertTag(value.tagname);
                tagPromise.then(function(result){
                    tagArray.push(result);
                });
            }
        });
        //End Array Operation

        $scope.foodDetails.tagid=tagArray;

        //For Region
        $scope.foodDetails.regionid=$scope.foodDetails.regionid;

        //To Change the name of the obj from measureid to measuredata
        $scope.foodDetails.measuredata=$scope.foodDetails.measureid;

        $q.all([tagPromise]).then(function(){
            console.log($scope.foodDetails);
            requestHandler.putRequest("admin/updateFood/", $scope.foodDetails).then(function (response) {
                if (response.data.Response_status == 1) {
                    successMessage(Flash,"Food Updated Successfully!");
                    $scope.doGetFoodDetails();
                    $location.path("food");
                    $scope.spinner=false;
                    $scope.doingUpdate=false;
                }
            }, function (response) {
                console.log("Not able to pull Food Tag");
                $scope.spinner=false;
                $scope.doingUpdate=false;
            });
        });


    };

    //Set Food Details Obj for add
    $scope.doSetFoodDetails=function(){

        $scope.imageAdded=true;
        $scope.foodDetails={};
        $scope.foodDetails.measureid=[];
        $scope.foodDetails.sessionid=[];
        $scope.foodDetails.regionid="1";

        if($routeParams.id != null){
            $scope.suggestionname = function(){
                requestHandler.postRequest("admin/getFoodSuggestionDetail/",{'suggestionid':$routeParams.id}).then(function(response){
                   $scope.foodDetails.foodname = response.data.Food_Suggestion_Data.foodname;
                },  function () {
                    errorMessage(Flash, "Please try again later!")
                });
            };

            $scope.suggestionname();

        }
        else{
           $scope.foodDetails.foodname = null;
        }

        $scope.foodDetails.foodImagePath='../../images/No_image_available.jpg';

        //Set session
        $scope.foodDetails.sessionSet=FoodService.setSessionValues($scope.foodDetails.sessionid);



        //Set Measure Values
        var foodMeasurePromise=FoodService.doGetMeasures($scope.foodDetails.measureid);
        
        foodMeasurePromise.then(function(result){
            $scope.foodMeasureListAll=result;
        });
    };
    //End Set

    //While Removing Measure from the ui select list
    $scope.removeFoodMeasure=function(item){
        var addMeasureSet=FoodService.getMeasureSet();
        addMeasureSet.measureid=item.measureid;
        addMeasureSet.measurename=item.measurename;
        addMeasureSet.status=item.status;
        //Remove Existing one
        $scope.foodMeasureListAll.splice($scope.foodMeasureListAll.indexOf(item),1);
        //Add Refreshed One
        $scope.foodMeasureListAll.push(addMeasureSet);

    }


    //Do Add Food Details
    $scope.doAddFoodDetails= function () {

        $scope.doingUpdate=true;
        $scope.spinner=true;
        //Get Add Details
        $scope.foodDetails.sessionid=FoodService.getSessionArray($scope.foodDetails.sessionSet);
        $scope.foodDetails.categoryid=FoodService.getCategoryArray($scope.foodDetails.categoryid);

        if(!$scope.imageUpload){
            delete $scope.foodDetails.foodimage;
        }

        //Tag Array Operation
        var tagArray=[];
        var tagPromise;
        $.each($scope.foodDetails.tagid, function(index,value) {
            if(value.tagid!=null){
                tagArray.push(parseInt(value.tagid));
            }else{
                tagPromise=FoodService.insertTag(value.tagname);
                tagPromise.then(function(result){
                    tagArray.push(result);
                });
            }
        });
        $scope.foodDetails.tagid=tagArray;
        //End Tag Array Operation

        $scope.foodDetails.measuredata=$scope.foodDetails.measureid;
        $scope.foodDetails.regionid=$scope.foodDetails.regionid;
        $q.all([tagPromise]).then(function(){//Only after tag array operation
            requestHandler.postRequest("admin/insertFood/", $scope.foodDetails).then(function (response) {
                if (response.data.Response_status == 1) {
                    successMessage(Flash,"Food Added Successfully!");
                    $scope.doingUpdate=false;
                    $scope.spinner=false;
                    $location.path("food");
                }
            }, function (response) {
                $scope.doingUpdate=false;
                $scope.spinner=false;
                errorMessage(Flash,"Try Again Later!");
            });

            if($routeParams.id != null){
                $scope.doApproveFoodSuggestion();
            }
        });
    };

    $scope.doApproveFoodSuggestion=function(){
        $scope.loaded=true;
        requestHandler.postRequest("admin/approveFoodSuggestion/",{'suggestionid':$routeParams.id}).then(function(response){
            $scope.loaded=false;
            $scope.doGetAllFoodSuggestion();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    $scope.isClean=function(){
        return angular.equals(original, $scope.foodDetails);
    };

    //Set measure set
    $scope.doAddNewMeasureMinerals=function(id,name){
        $scope.foodDetails.measureid=FoodService.doAddMeasureMinerals(id,name,$scope.foodDetails.measureid);
    };

    //Get Categories
    var foodCategoryPromise=FoodService.doGetCategories();
    foodCategoryPromise.then(function(result){
        $scope.foodCategoryListAll=result;
    });

    //Get Tags
    $scope.tagListArray=[];
    var foodTagPromise=FoodService.doGetTags();
    foodTagPromise.then(function(result){
        $scope.foodTagList=result;
        $.each($scope.foodTagList, function(index,value){
            $scope.tagListArray.push(value.tagname);
        });
    });

    $q.all([foodCategoryPromise,foodTagPromise]).then(function(){
         if($scope.type==1){
        $scope.doSetFoodDetails();
        }else if($scope.type==2){
          $scope.doGetFoodDetails();
         }
    });
    
    //End Initialize Page

}]);

adminApp.directive("ngFileSelect",function(){

    return {
        link: function($scope,el){
            el.bind("change", function(e){
                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getFile();
            })
        }
    }
});


// render image to view in list
adminApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

adminApp.controller('FoodCateogryController', ['$scope', function($scope) {
    $scope.activeClass = {category:'active'};
}]);


adminApp.filter('propsFilter', function() {

        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });


// Validation for file upload
adminApp.directive('validFile',function(){
    return {
        require:'ngModel',
        link:function(scope,el,attrs,ngModel){
            //change event is fired when file is selected
            el.bind('change',function(){
                scope.$apply(function(){
                    ngModel.$setViewValue(el.val());
                    ngModel.$render();
                })
            })
        }
    }
});

adminApp.filter('startsWithLetterFood', function () {

    return function (items, foodsearch) {
        var filtered = [];
        var letterMatch = new RegExp(foodsearch, 'i');
        if(!items){}
        else{
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (letterMatch.test(item.foodname) || letterMatch.test(item.category) || letterMatch.test(item.session) || letterMatch.test(item.region)) {
                filtered.push(item);
            }
        }
        }
        return filtered;
    };
});

adminApp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9]/g, '');

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits,10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});