/**
 * Created by user on 26-09-2015.
 */

var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ui.select','exerciseServiceModule','angularUtils.directives.dirPagination']);

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

adminApp.controller('ExerciseController',['$scope','requestHandler','Flash',function ($scope,requestHandler,Flash) {
	//sidebar menu active class
	$scope.activeClass = {exerciselist:'active'};


	//Get Exercise List
	$scope.doGetAllExercise=function(){

		var typevalue="";
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

}]);

adminApp.controller('ExerciseViewController',['$scope','requestHandler','Flash','$routeParams',function($scope,requestHandler,Flash,$routeParams){

	$scope.activeClass = {exerciselist:'active'};

	$scope.doGetExerciseByID=function(){
		//alert("hi");
		$scope.loaded=true;
		requestHandler.postRequest("admin/getExerciseDetailByadmin/",{"exerciseid":$routeParams.id}).then(function(response){
			$scope.exerciseDetail=response.data.ExerciseDetail.exercise;
		    $scope.exerciseDetail.imagepath=$scope.exerciseDetail.imagepath+"200x200.jpg"+"?decache="+Math.random();
			$scope.exerciseDetail.tags =response.data.ExerciseDetail.tags;
			requestHandler.postRequest("admin/getTypeDetail/",{"typeid":$scope.exerciseDetail.exercisetypeid}).then(function(response){
			$scope.typename = response.data.ExerciseType_Data;
				$scope.exerciseDetail.exercisetypename=$scope.typename.typename;

			});

			$scope.loaded=false;
		},function(){
			errorMessage(Flash,"Please try again later!")
		});
	};

	//Display FAQ On load
	$scope.doGetExerciseByID();
}]);


adminApp.controller('ExerciseEditController',['$q','$scope','requestHandler','Flash','$routeParams','$route','ExerciseService','fileReader','$location',function($q,$scope,requestHandler,Flash,$routeParams,$route,ExerciseService,fileReader,$location){

	var original="";
	$scope.title=$route.current.title;
	$scope.type=$route.current.type;
	$scope.isNew=$route.current.isNew;
	$scope.imageUpload=false;
    $scope.inputContainsFile = true;
    $scope.doingUpdate=false;

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

			$scope.exerciseDetail=response.data.ExerciseDetail.exercise;

			$scope.exerciseDetail.type = {"typeid":$scope.exerciseDetail.exercisetypeid,"typename":$scope.exerciseDetail.exercisetypename,"status":1};

		    $scope.originalImage=$scope.exerciseDetail.imageurl+"?decache="+Math.random();
		    // $scope.originalImage=$scope.exerciseDetail.imageurl.substring($scope.exerciseDetail.imageurl.indexOf("/")+14,$scope.exerciseDetail.imageurl.length)


			$scope.exerciseDetail.imageurl=$scope.exerciseDetail.imageurl+"?decache="+Math.random();
            $scope.exerciseDetail.imagepath=$scope.exerciseDetail.imagepath+"200x200.jpg"+"?decache="+Math.random();
		    $scope.exerciseDetail.tags =response.data.ExerciseDetail.tags;
			$scope.exerciseDetail.met=$scope.exerciseDetail.MET;

			original=angular.copy($scope.exerciseDetail);

		   /* //push corresponding level
			var selectedLevel = ExerciseService.getSelectedLevel($scope.exerciseDetail.type);
			$scope.level = {selected : selectedLevel};*/

			$scope.loaded=false;

		},function(){
			errorMessage(Flash,"Please try again later!")
		});
	};

	//get type list for drop down
	$scope.doGetExcerciseTypeList=function(){
		requestHandler.getRequest("admin/listofTypes/","").then(function(response){
			$scope.typeListForDropDown = response.data.ExerciseType_Data;

		},function(){
			errorMessage(Flash,"Please try again later!")
		});
	};

	/*//Change Exercise Type
	$scope.doChangeExerciseType=function(id){
		if($scope.type==2){
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
		}
		else{
			$scope.loaded=true;
			requestHandler.postRequest("admin/gettypeIndividualDetail/",{"typeid":id}).then(function(response){
				$scope.exerciseDetail.type = response.data.IndividualtypeData;
				$scope.loaded=false;
			});
		}

	};*/

	//Exercise Image Upload Controller
	$scope.getFile = function () {
		$scope.progress = 0;
		fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
			$scope.exerciseDetail.exerciseimage = result;
            $scope.inputContainsFile = false;
		});
	};

	$scope.$on("fileProgress", function(e, progress) {
		$scope.progress = progress.loaded / progress.total;
	});

	$scope.doRefreshPreview=function(){
		$scope.exerciseDetail.exerciseimage=$scope.exerciseDetail.imagepath;
        $scope.inputContainsFile = true;
	};

	//Update Exercise Image
	$scope.doUpdateExerciseImage=function(){
		$scope.imageUpload=true;
        $scope.exerciseDetail.imagepath=$scope.exerciseDetail.exerciseimage;
	};
	//End Exercise Image Upload Controller

	$scope.doUpdateExerciseDetail=function(){
		$scope.doingUpdate=true;
        $scope.spinner=true;
		var updatedExerciseDetails={};
		updatedExerciseDetails.exerciseid=$scope.exerciseDetail.exerciseid;
		updatedExerciseDetails.exercisename=$scope.exerciseDetail.exercisename;

	    if($scope.imageUpload){
			updatedExerciseDetails.imageurl=$scope.exerciseDetail.exerciseimage;
		}

		updatedExerciseDetails.typeid=$scope.exerciseDetail.type.typeid;
		updatedExerciseDetails.MET = $scope.exerciseDetail.met;

		var tagArray=[];
		var tagPromise;
		$.each($scope.exerciseDetail.tags, function(index,value) {
			if(value.tagid!=null){
				tagArray.push(parseInt(value.tagid));
			}else{
				tagPromise=ExerciseService.insertTag(value.tagname);
				tagPromise.then(function(result){
					tagArray.push(result);
				});
			}
		});
		updatedExerciseDetails.tagid = tagArray;

        $q.all([tagPromise]).then(function(){
            requestHandler.putRequest("admin/updateExercise/",updatedExerciseDetails).then(function (response) {
                if (response.data.Response_status == 1) {
                    successMessage(Flash,"Exercise Updated Successfully!");
                    $location.path("exercise");
                    $scope.doingUpdate=false;
                    $scope.spinner=false;
                }
            }, function () {
                errorMessage(Flash,"Please Try Again Later!");
                $scope.doingUpdate=false;
                $scope.spinner=false;
            });
        });

	};

	$scope.doAddExerciseDetail=function(){

        $scope.doingUpdate=true;
        $scope.spinner=true;
        var updatedExerciseDetails={};
        updatedExerciseDetails.exercisename=$scope.exerciseDetail.exercisename;

        if($scope.imageUpload){
            updatedExerciseDetails.imageurl=$scope.exerciseDetail.exerciseimage;
        }

		updatedExerciseDetails.typeid=$scope.exerciseDetail.type.typeid;
		updatedExerciseDetails.MET = parseInt($scope.exerciseDetail.met);

		//Tag Array Operation starts
		var tagArray=[];
		var tagPromise;
		$.each($scope.exerciseDetail.tags, function(index,value) {
			if(value.tagid!=null){
				tagArray.push(parseInt(value.tagid));
			}else{
				tagPromise=ExerciseService.insertTag(value.tagname);
				tagPromise.then(function(result){
					tagArray.push(result);
				});
			}
		});
		updatedExerciseDetails.tagid = tagArray;
		//Tag Array Ends

	    //updatedExerciseDetails.levels = $scope.exerciseDetail.type.levels;
        $q.all([tagPromise]).then(function(){

            console.log(updatedExerciseDetails);
            requestHandler.postRequest("admin/insertExercise/",updatedExerciseDetails).then(function (response) {
                if (response.data.Response_status == 1) {
                    successMessage(Flash,"Exercise Added Successfully!");
                    $location.path("exercise");
                    $scope.doingUpdate=false;
                    $scope.spinner=false;
                }
            }, function () {
                errorMessage(Flash,"Please Try Again Later!");
                $scope.doingUpdate=false;
                $scope.spinner=false;
            });

            if($routeParams.id != null){
                $scope.doApproveExerciseSuggestion();
            }
        });

	};

	$scope.doApproveExerciseSuggestion=function(){

		$scope.loaded=true;
		requestHandler.postRequest("admin/approveExerciseSuggestion/",{'suggestionid':$routeParams.id}).then(function(response){
			$scope.doGetAllExerciseSuggestion();
			successMessage(Flash,"Successfully Updated");

		},function(){
			errorMessage(Flash,"Please try again later!")
		});
	};

	$scope.isClean=function(){
		return angular.equals(original, $scope.exerciseDetail);
	};

	//Add food set values
	$scope.doSetExcerciseDetails=function(){
		$scope.exerciseDetail={};
		$scope.loaded=true;
		$scope.exerciseDetail.imagepath='../../images/No_image_available.jpg';

		//push corresponding level
	   /* requestHandler.postRequest("admin/gettypeIndividualDetail/",{"typeid":1}).then(function(response){
			$scope.exerciseDetail.type = response.data.IndividualtypeData;
			var selectedLevel = ExerciseService.getSelectedLevel($scope.exerciseDetail.type);
			$scope.level = {selected : selectedLevel};
			$scope.loaded=false;
		});*/

		if($routeParams.id != null){
			$scope.suggestionname = function(){
				requestHandler.postRequest("admin/getExerciseSuggestionDetail/",{'suggestionid':$routeParams.id}).then(function(response){
					$scope.exerciseDetail.exercisename = response.data.Exercise_Suggestion_Data.exercisename;
			   },  function () {
					errorMessage(Flash, "Please try again later!")
				});
			};

			$scope.suggestionname();

		}
		else{
			$scope.exerciseDetail.exercisename = null;
		}
		$scope.loaded=false;

	};

	//Get Tags
	$scope.tagListArray=[];
	var excerciseTagPromise=ExerciseService.doGetTags();
	excerciseTagPromise.then(function(result){
		$scope.exerciseTagList=result;
		$.each($scope.exerciseTagList, function(index,value){
			$scope.tagListArray.push(value.tagname);
		});
	});

	//Initialize Page
	//Get Exercise Details
	$q.all([excerciseTagPromise]).then(function(){
        if($scope.type==1){
            $scope.doGetExcerciseTypeList();
            $scope.doSetExcerciseDetails();
        }else if($scope.type==2){
            $scope.doGetExcerciseTypeList();
            $scope.doGetExcerciseDetails();
        }
	});



}]);


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

adminApp.filter('startsWithLetterExercise', function () {

	return function (items, exercisesearch) {
		var filtered = [];
		var letterMatch = new RegExp(exercisesearch, 'i');
		if(!items){}
		else{
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (letterMatch.test(item.exercisename) || letterMatch.test(item.type) ) {
				filtered.push(item);
			}
		}
		}
		return filtered;
	};
});