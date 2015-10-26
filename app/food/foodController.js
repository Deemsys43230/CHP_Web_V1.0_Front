/**
 * Created by user on 26-09-2015.
 */

var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ui.select','foodServiceModule']);

adminApp.controller('FoodUploadController', ['$scope', 'FileUploader', function($q,$scope, FileUploader) {
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


adminApp.controller('FoodController',function ($scope,requestHandler,Flash) {


    //sidebar menu active class
    $scope.activeClass = {foodlist:'active'};

    
    //sorting
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    //Get Food List
    $scope.doGetAllFoodItems=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getFoodList/","").then(function(response){
            $scope.foodList=response.data.Food_Data;
            $scope.paginationLoad=true;
            $scope.loaded=false;
        },function(response){
        });
    };
    //End Get Food List

    //Enable Disable Food Items
    $scope.doEnableDisable=function(foodId){
            requestHandler.postRequest("admin/enableordisableFood/",{"foodid":foodId}).then(function(response){
                if(response.data.Response_status==1){
                    successMessage(Flash,"Successfully Updated");
                }
                else if(response.data.Response_status==0){
                    errorMessage(Flash,"Food used by users");
                }
                $scope.doGetAllFoodItems();
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
        $('.search-list-form').fadeIn(300);
        $('.search-list-form input').focus();
    });

    $('.search-list-form input').focusout(function() {
        $('.search-list-form').fadeOut(300);
        $scope.categorysearch="";
    });

});


adminApp.controller("FoodDetailsViewController",function($scope,requestHandler,$routeParams){

    //Get Particular Food Details
    $scope.doGetFoodDetails= function () {
        requestHandler.postRequest("/getFoodDetailByadmin/",{"foodid":$routeParams.id}).then(function(response){
            $scope.foodDetails=response.data.Food_Data;
            $scope.foodDetails.foodImagePath=$scope.foodDetails.foodImagePath.substring($scope.foodDetails.foodImagePath.indexOf("/") + 14, $scope.foodDetails.foodImagePath.length)+"200x200.jpg";
            console.log("ImagePath:"+$scope.foodDetails.foodImagePath);
        },function(response){
            alert("Not able to pull Food Measure List");
        })
    };
    //End Get Particular Food Details
    $scope.doGetFoodDetails();

});

adminApp.controller("FoodDetailsEditController",function($q,$scope,requestHandler,FoodService,$routeParams,Flash,$route,fileReader,$location){

    var original="";
    $scope.title=$route.current.title;
    $scope.type=$route.current.type;
    $scope.isNew=$route.current.isNew;
    $scope.imageUpload=false;

    //For Tag Input
    $scope.tagTransform = function (newTag) {

            var item = {
                "tagid": null,
                "tagname": newTag
            };

            return item;

    };

    //Get Particular Food Details
    $scope.doGetFoodDetails= function () {
        $scope.doingUpdate = false;
        requestHandler.postRequest("/getFoodDetailByadmin/",{"foodid":$routeParams.id}).then(function(response){
            $scope.foodDetails=response.data.Food_Data;

            $scope.foodDetails.foodImagePath=$scope.foodDetails.foodImagePath.substring($scope.foodDetails.foodImagePath.indexOf("/") + 14,$scope.foodDetails.foodImagePath.length)+"200x200.jpg";
            $scope.foodDetails.foodimage=$scope.foodDetails.foodimage.substring($scope.foodDetails.foodimage.indexOf("/") + 14,$scope.foodDetails.foodimage.length);
            //Set session
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
            alert("Not able to pull Food Measure List");
        })
    };
    //End Get

    //Food Image Upload Controller
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
                $scope.foodDetails.foodimage = result;

            });
    };

    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });

    $scope.doRefreshPreview=function(){
        $scope.foodDetails.foodimage=$scope.foodDetails.foodImagePath;
    };

    //Update Food Image
    $scope.doUpdateFoodImage=function(){
        $scope.foodDetails.foodImagePath=$scope.foodDetails.foodimage;
        $scope.imageUpload=true;
        $scope.imageAdded=false;
    };
   //End Food Image Upload Controller


    //Set Food Details Obj for add
    $scope.doSetFoodDetails=function(){
        $scope.imageAdded=true;
        $scope.foodDetails={};
        $scope.foodDetails.measureid=[];
        $scope.foodDetails.sessionid=[];
        $scope.foodDetails.regionid="1";

        $scope.foodDetails.foodImagePath='../../images/No_image_available.jpg';
        $scope.foodDetails.foodimage='../../images/No_image_available.jpg';

        //Set session
        $scope.foodDetails.sessionSet=FoodService.setSessionValues($scope.foodDetails.sessionid);

        //Set Measure Values
        var foodMeasurePromise=FoodService.doGetMeasures($scope.foodDetails.measureid);
        foodMeasurePromise.then(function(result){
            $scope.foodMeasureListAll=result;
        });

    };
    //End Set

    //Do Update Food
    $scope.doUpdateFoodDetails= function () {
//For disabling the update button after one click
        $scope.doingUpdate = true;
    //Get Update Details
    $scope.foodDetails.sessionid=FoodService.getSessionArray($scope.foodDetails.sessionSet);
    $scope.foodDetails.categoryid=FoodService.getCategoryArray($scope.foodDetails.categoryid);

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


    if($scope.imageUpload){//Check for Image Upload
        $q.all([tagPromise]).then(function(){
            requestHandler.putRequest("admin/updateFood/", $scope.foodDetails).then(function (response) {
                if (response.data.Response_status == 1) {
                    successMessage(Flash,"Food Updated Successfully!");
                    $scope.doGetFoodDetails();
                }
            }, function (response) {
                alert("Not able to pull Food Tag");
            });
        });

    }else{
        FoodService.convertImgToBase64($scope.foodDetails.foodImagePath, function(base64Img) {//Convert Image to Base64
            $scope.foodDetails.foodimage=base64Img;
            $q.all([tagPromise]).then(function(){//Only after tagPromise
                requestHandler.putRequest("admin/updateFood/", $scope.foodDetails).then(function (response) {
                    if (response.data.Response_status == 1) {
                        successMessage(Flash,"Food Updated Successfully!");
                        $scope.doGetFoodDetails();
                        $location.path("food");
                    }
                }, function (response) {
                    alert("Not able to pull Food Tag");
                });
            });

        });
    }
    };


    //Do Add Food Details
    $scope.doAddFoodDetails= function () {

        //Get Add Details
        $scope.foodDetails.sessionid=FoodService.getSessionArray($scope.foodDetails.sessionSet);
        $scope.foodDetails.categoryid=FoodService.getCategoryArray($scope.foodDetails.categoryid);

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
                    //$scope.doGetFoodDetails();
                    $location.path("food");
                }
            }, function (response) {
                alert("Not able to pull Food Tag");
            });
        });



    };

    $scope.isClean=function(){

        return angular.equals(original, $scope.foodDetails);
    };

    //Initialize Page
    //Get Food Details
    if($scope.type==1){
        $scope.doSetFoodDetails();
    }else if($scope.type==2){
        $scope.doGetFoodDetails();
    }

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
    var foodTagPromise=FoodService.doGetTags();
    foodTagPromise.then(function(result){
        $scope.foodTagList=result;
    });

    //End Initialize Page

});

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