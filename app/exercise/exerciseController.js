/**
 * Created by user on 26-09-2015.
 */

var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ui.select','exerciseServiceModule']);

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
    }
});

adminApp.controller('ExerciseController',function ($scope,requestHandler,Flash) {
    //sidebar menu active class
    $scope.activeClass = {exerciselist:'active'};


    //Get Exercise List
    $scope.doGetAllExercise=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/listofExercise/","").then(function(response){
            $scope.exerciseList=response.data.listexercises;
            $scope.paginationLoad=true;
            $scope.loaded=false;
        },function(response){
        });
    };
    //End Get Exercise List

    //Enable Disable Exercise
    $scope.doEnableDisable=function(exerciseId){
        $scope.loaded=true;
        requestHandler.postRequest("admin/enableordisableExercise/",{"exerciseid":exerciseId}).then(function(response){
            if(response.data.Response_status==1){
                successMessage(Flash,"Successfully Updated");
            }
            else if(response.data.Response_status==0){
                errorMessage(Flash,"Exercise used by users");
            }
            $scope.doGetAllExercise();
            $scope.loaded=false;
        },function(response){
            errorMessage(Flash,"Please Try Again Later");
        });
    };
    //End Enable Disable

    //Initial Load
    $scope.init = function(){
        $scope.paginationLoad=false;
        $scope.doGetAllExercise();
    };
    //End Initial Load

    $scope.init();

});

adminApp.controller('ExerciseViewController',function($scope,requestHandler,Flash,$routeParams){

    $scope.activeClass = {exerciselist:'active'};

    $scope.doGetExerciseByID=function(){
        $scope.loaded=true;
        requestHandler.postRequest("admin/getExerciseDetailByadmin/",{"exerciseid":$routeParams.id}).then(function(response){
            $scope.exerciseDetail=response.data.ExerciseDetail;
            $scope.exerciseDetail.imageurl=$scope.exerciseDetail.imageurl.substring($scope.exerciseDetail.imageurl.indexOf("/") + 14, $scope.exerciseDetail.imageurl.length-13)+"200x200.jpg";
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //Display FAQ On load
    $scope.doGetExerciseByID();
});


adminApp.controller('ExerciseEditController',function($scope,requestHandler,Flash,$routeParams,$route,ExerciseService,fileReader){

    var original="";
    $scope.title=$route.current.title;
    $scope.type=$route.current.type;
    $scope.isNew=$route.current.isNew;
    $scope.imageUpload=false;
    $scope.tagListArray=[];

    //Get Tags
    var excerciseTagPromise=ExerciseService.doGetTags();
    excerciseTagPromise.then(function(result){
        $scope.exerciseTagList=result;
        $.each($scope.exerciseTagList, function(index,value){
            $scope.tagListArray.push(value.tagname);
        });
    });

    $scope.tagTransform = function (newTag) {
        if($scope.tagListArray.indexOf(newTag)==-1){
            var item = {
                "tagid": null,
                "tagname": newTag
            };
            return item;
        }
    };

    $scope.doGetExcerciseDetails=function(){
        $scope.loaded=true;
        requestHandler.postRequest("admin/getExerciseDetailByadmin/",{"exerciseid":$routeParams.id}).then(function(response){

            $scope.exerciseDetail=response.data.ExerciseDetail;
            $scope.exerciseDetail.imageurl=$scope.exerciseDetail.imageurl.substring($scope.exerciseDetail.imageurl.indexOf("/") + 14, $scope.exerciseDetail.imageurl.length-13)+"200x200.jpg";
            $scope.loaded=false;

            //push corresponding level
            var selectedLevel = ExerciseService.getSelectedLevel($scope.exerciseDetail.type);
            $scope.level = {selected : selectedLevel};

            original=angular.copy($scope.exerciseDetail);

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //get type list for drop down
    $scope.doGetExcerciseTypeList=function(){
        requestHandler.getRequest("admin/listofTypes/","").then(function(response){
            $scope.typeListForDropDown = response.data.Typelist;
            $scope.levelslist=ExerciseService.getTypeList($scope.typeListForDropDown);

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //Change Exercise Type
    $scope.dochangeExerciseType=function(id){
        if(id==original.type.typeid){
            $scope.exerciseDetail.type = original.type;
        }
        else{
            $scope.loaded=true;
            requestHandler.postRequest("admin/gettypeIndividualDetail/",{"typeid":id}).then(function(response){
                $scope.exerciseDetail.type = response.data.IndividualtypeData;
                $scope.loaded=false;
            });
        }
    };

    //Exercise Image Upload Controller
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
            $scope.exerciseDetail.exerciseimage = result;
        });
    };

    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });

    $scope.doRefreshPreview=function(){
        $scope.exerciseDetail.exerciseimage=$scope.exerciseDetail.imageurl;
    };

    //Update Exercise Image
    $scope.doUpdateExerciseImage=function(){
        $scope.exerciseDetail.imageurl=$scope.exerciseDetail.exerciseimage;
        $scope.imageUpload=true;
    };
    //End Exercise Image Upload Controller

    $scope.doUpdateExerciseDetail=function(){
        $scope.loaded=true;
        var updatedExerciseDetails={};
        updatedExerciseDetails.exerciseid=$scope.exerciseDetail.exerciseid;
        updatedExerciseDetails.exercisename=$scope.exerciseDetail.exercisename;

        if($scope.imageUpload){
            updatedExerciseDetails.imageurl=$scope.exerciseDetail.imageurl;
        }
        else{
            ExerciseService.convertImgToBase64(original.imageurl, function(base64Img) {//Convert Image to Base64
                updatedExerciseDetails.imageurl=base64Img;
            });
        }

        updatedExerciseDetails.difficultytype=$scope.exerciseDetail.type.typeid;
        updatedExerciseDetails.tagid = ExerciseService.getTagArray($scope.exerciseDetail.tags);
        updatedExerciseDetails.levels = $scope.exerciseDetail.type.levels;

        console.log(updatedExerciseDetails);

        requestHandler.putRequest("admin/updateExercise/",updatedExerciseDetails).then(function (response) {
            console.log(response);
            if (response.data.Response_status == 1) {
                successMessage(Flash,"Exercise Updated Successfully!");
                $scope.doGetExcerciseDetails();
                $scope.loaded=false;
            }
        }, function (response) {
            errorMessage(Flash,"Please Try Again Later!");
            $scope.loaded=false;
        });
    };

    $scope.isClean=function(){
        return angular.equals(original, $scope.exerciseDetail);
    };

    //Initialize Page
    //Get Exercise Details
    if($scope.type==1){
        $scope.doSetExcerciseDetails();
        $scope.doGetExcerciseTypeList();
    }else if($scope.type==2){
        $scope.doGetExcerciseDetails();
        $scope.doGetExcerciseTypeList();
    }

});


//Image Upload
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

// render image to view in list
adminApp.filter('html', ['$sce', function ($sce) {
    return function(html) {
        return $sce.trustAsHtml(html);
    };
}]);



