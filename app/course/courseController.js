/**
 * Created by user on 14/12/15.
 */

var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash']);

userApp.controller('CourseController',['$scope','requestHandler','Flash',function($scope,requestHandler,Flash) {

    requestHandler.getRequest("user/getMyCourseList/","").then(function(response) {
        $scope.myCourseList = response.data.published_Course;
        console.log($scope.myCourseList);
    },function(){
        errorMessage(Flash,"Please try again later!")
    });

}]);

var coachApp= angular.module('coachApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','summernote']);

coachApp.controller('CourseController',function($scope,requestHandler,Flash,$routeParams) {

    requestHandler.getRequest("coach/getCourseList/","").then(function(response) {
        $scope.myCourseList = response.data.course.course_list;
    },function(){
        errorMessage(Flash,"Please try again later!")
    });

    if(!$routeParams.id){
    }
    else{
        requestHandler.postRequest("coach/getCourseDetail/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.courseDetails = response.data['Course details'];
        },function(){
            errorMessage(Flash,"Please try again later!")
        });

        requestHandler.postRequest("coach/getCourseSections/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.courseSections = response.data.CourseSections.sections;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    }

    if(!$routeParams.sectionId){
    }
    else{
        requestHandler.postRequest("coach/detailCourseSection/",{"sectionid":$routeParams.sectionId}).then(function(response) {
            $scope.sectionDetails = response.data.CourseSectionDetail;
            requestHandler.postRequest("coach/getCourseSections/",{"courseid":$scope.sectionDetails.courseid}).then(function(response) {
                $scope.courseSections = response.data.CourseSections.sections;
                $scope.sectionLength=$scope.courseSections.length;
            });

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    }

    $scope.changeSection=function(sectionId){
        requestHandler.postRequest("coach/detailCourseSection/",{"sectionid":sectionId}).then(function(response) {
            $scope.sectionDetails = response.data.CourseSectionDetail;
        });
    };

    $scope.nextSection=function(sequenceNo){
        $.each($scope.courseSections,function($index,value){
            if(value.sequenceno==(sequenceNo+1)){
                $scope.changeSection(value.sectionid);
            }
        })
    };

    $scope.prevSection=function(sequenceNo){
        $.each($scope.courseSections,function($index,value){
            if(value.sequenceno==(sequenceNo-1)){
                $scope.changeSection(value.sectionid);
            }
        })
    };

});

coachApp.controller('CourseEditController',function($scope,requestHandler,Flash,$routeParams) {

    //summer note
    $scope.options = {
        height: 200,
        focus: true,
        airMode: true,
        toolbar: [
            ["font", ["bold", "italic", "underline", "clear"]],
            ["para", ["ul", "ol", "paragraph"]]
        ]
    };

    if(!$routeParams.id){
    }
    else{
        requestHandler.postRequest("coach/getCourseDetail/",{"courseid":$routeParams.id}).then(function(response) {
            $scope.courseDetails = response.data['Course details'];
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    }

    if(!$routeParams.sectionId){
    }
    else{
        requestHandler.postRequest("coach/detailCourseSection/",{"sectionid":$routeParams.sectionId}).then(function(response) {
            $scope.sectionDetails = response.data.CourseSectionDetail;
            requestHandler.postRequest("coach/getCourseSections/",{"courseid":$scope.sectionDetails.courseid}).then(function(response) {
                $scope.courseSections = response.data.CourseSections.sections;
                $scope.sectionLength=$scope.courseSections.length;
            });

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    }

    $scope.changeSection=function(sectionId){
        requestHandler.postRequest("coach/detailCourseSection/",{"sectionid":sectionId}).then(function(response) {
            $scope.sectionDetails = response.data.CourseSectionDetail;
        });
    };

    $scope.nextSection=function(sequenceNo){
        $.each($scope.courseSections,function($index,value){
            if(value.sequenceno==(sequenceNo+1)){
                $scope.changeSection(value.sectionid);
            }
        })
    };

    $scope.prevSection=function(sequenceNo){
        $.each($scope.courseSections,function($index,value){
            if(value.sequenceno==(sequenceNo-1)){
                $scope.changeSection(value.sectionid);
            }
        })
    };

});

// render image to view in list
coachApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
