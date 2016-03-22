var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","ui.select","exerciseServiceModule","angularUtils.directives.dirPagination"]);adminApp.filter("propsFilter",function(){return function(a,b){var c=[];return angular.isArray(a)?a.forEach(function(a){for(var d=!1,e=Object.keys(b),f=0;f<e.length;f++){var g=e[f],h=b[g].toLowerCase();if(-1!==a[g].toString().toLowerCase().indexOf(h)){d=!0;break}}d&&c.push(a)}):c=a,c}}),adminApp.controller("ExerciseController",["$scope","requestHandler","Flash",function(a,b,c){a.activeClass={exerciselist:"active"},a.doGetAllExercise=function(){a.loaded=!0,b.getRequest("admin/listofExercise/","").then(function(b){a.exerciseList=b.data.listexercises,a.paginationLoad=!0,a.loaded=!1},function(a){})},a.sortexerciseidicon="fa fa-caret-down",a.sortexercisenameicon="fa fa-caret-down",a.sortExerciseId=function(){a.sortKey="exerciseid",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortexerciseidicon?a.sortexerciseidicon="fa fa-caret-up":a.sortexerciseidicon="fa fa-caret-down"},a.sortExerciseName=function(){a.sortKey="exercisename",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortexercisenameicon?a.sortexercisenameicon="fa fa-caret-up":a.sortexercisenameicon="fa fa-caret-down"},a.doEnableDisable=function(d){a.loaded=!0,b.postRequest("admin/enableordisableExercise/",{exerciseid:d}).then(function(b){1==b.data.Response_status?successMessage(c,"Successfully Updated"):0==b.data.Response_status&&errorMessage(c,"Exercise used by users"),a.doGetAllExercise(),a.loaded=!1},function(a){errorMessage(c,"Please Try Again Later")})},a.init=function(){a.paginationLoad=!1,a.doGetAllExercise()},a.init(),a.pagenumber="",a.newPageNumber=1,a.goToPage=function(){a.newPageNumber=a.pagenumber,a.pagenumber=""}}]),adminApp.controller("ExerciseViewController",["$scope","requestHandler","Flash","$routeParams",function(a,b,c,d){a.activeClass={exerciselist:"active"},a.doGetExerciseByID=function(){a.loaded=!0,b.postRequest("admin/getExerciseDetailByadmin/",{exerciseid:d.id}).then(function(c){a.exerciseDetail=c.data.ExerciseDetail.exercise,a.exerciseDetail.imagepath=a.exerciseDetail.imagepath+"200x200.jpg?decache="+Math.random(),a.exerciseDetail.tags=c.data.ExerciseDetail.tags,b.postRequest("admin/getTypeDetail/",{typeid:a.exerciseDetail.exercisetypeid}).then(function(b){a.typename=b.data.ExerciseType_Data,a.exerciseDetail.exercisetypename=a.typename.typename}),a.loaded=!1},function(){errorMessage(c,"Please try again later!")})},a.doGetExerciseByID()}]),adminApp.controller("ExerciseEditController",["$q","$scope","requestHandler","Flash","$routeParams","$route","ExerciseService","fileReader","$location",function(a,b,c,d,e,f,g,h,i){var j="";b.title=f.current.title,b.type=f.current.type,b.isNew=f.current.isNew,b.imageUpload=!1,b.inputContainsFile=!0,b.doingUpdate=!1,b.tagTransform=function(a){if(-1==b.tagListArray.indexOf(a)){var c={tagid:null,tagname:a};return c}},b.doGetExcerciseDetails=function(){b.loaded=!0,c.postRequest("admin/getExerciseDetailByadmin/",{exerciseid:e.id}).then(function(a){b.exerciseDetail=a.data.ExerciseDetail.exercise,b.exerciseDetail.type={typeid:b.exerciseDetail.exercisetypeid,typename:b.exerciseDetail.exercisetypename,status:1},b.originalImage=b.exerciseDetail.imageurl+"?decache="+Math.random(),b.exerciseDetail.imageurl=b.exerciseDetail.imageurl+"?decache="+Math.random(),b.exerciseDetail.imagepath=b.exerciseDetail.imagepath+"200x200.jpg?decache="+Math.random(),b.exerciseDetail.tags=a.data.ExerciseDetail.tags,b.exerciseDetail.met=b.exerciseDetail.MET,j=angular.copy(b.exerciseDetail),b.loaded=!1},function(){errorMessage(d,"Please try again later!")})},b.doGetExcerciseTypeList=function(){c.getRequest("admin/listofTypes/","").then(function(a){b.typeListForDropDown=a.data.ExerciseType_Data},function(){errorMessage(d,"Please try again later!")})},b.getFile=function(){b.progress=0,h.readAsDataUrl(b.file,b).then(function(a){b.exerciseDetail.exerciseimage=a,b.inputContainsFile=!1})},b.$on("fileProgress",function(a,c){b.progress=c.loaded/c.total}),b.doRefreshPreview=function(){b.exerciseDetail.exerciseimage=b.exerciseDetail.imagepath,b.inputContainsFile=!0},b.doUpdateExerciseImage=function(){b.imageUpload=!0,b.exerciseDetail.imagepath=b.exerciseDetail.exerciseimage},b.doUpdateExerciseDetail=function(){b.doingUpdate=!0,b.spinner=!0;var e={};e.exerciseid=b.exerciseDetail.exerciseid,e.exercisename=b.exerciseDetail.exercisename,b.imageUpload&&(e.imageurl=b.exerciseDetail.exerciseimage),e.typeid=b.exerciseDetail.type.typeid,e.MET=b.exerciseDetail.met;var f,h=[];$.each(b.exerciseDetail.tags,function(a,b){null!=b.tagid?h.push(parseInt(b.tagid)):(f=g.insertTag(b.tagname),f.then(function(a){h.push(a)}))}),e.tagid=h,a.all([f]).then(function(){c.putRequest("admin/updateExercise/",e).then(function(a){1==a.data.Response_status&&(successMessage(d,"Exercise Updated Successfully!"),i.path("exercise"),b.doingUpdate=!1,b.spinner=!1)},function(){errorMessage(d,"Please Try Again Later!"),b.doingUpdate=!1,b.spinner=!1})})},b.doAddExerciseDetail=function(){b.doingUpdate=!0,b.spinner=!0;var f={};f.exercisename=b.exerciseDetail.exercisename,b.imageUpload&&(f.imageurl=b.exerciseDetail.exerciseimage),f.typeid=b.exerciseDetail.type.typeid,f.MET=parseInt(b.exerciseDetail.met);var h,j=[];$.each(b.exerciseDetail.tags,function(a,b){null!=b.tagid?j.push(parseInt(b.tagid)):(h=g.insertTag(b.tagname),h.then(function(a){j.push(a)}))}),f.tagid=j,a.all([h]).then(function(){c.postRequest("admin/insertExercise/",f).then(function(a){1==a.data.Response_status&&(successMessage(d,"Exercise Added Successfully!"),i.path("exercise"),b.doingUpdate=!1,b.spinner=!1)},function(){errorMessage(d,"Please Try Again Later!"),b.doingUpdate=!1,b.spinner=!1}),null!=e.id&&b.doApproveExerciseSuggestion()})},b.doApproveExerciseSuggestion=function(){b.loaded=!0,c.postRequest("admin/approveExerciseSuggestion/",{suggestionid:e.id}).then(function(a){b.doGetAllExerciseSuggestion(),successMessage(d,"Successfully Updated")},function(){errorMessage(d,"Please try again later!")})},b.isClean=function(){return angular.equals(j,b.exerciseDetail)},b.doSetExcerciseDetails=function(){b.exerciseDetail={},b.loaded=!0,b.exerciseDetail.imagepath="../../images/No_image_available.jpg",null!=e.id?(b.suggestionname=function(){c.postRequest("admin/getExerciseSuggestionDetail/",{suggestionid:e.id}).then(function(a){b.exerciseDetail.exercisename=a.data.Exercise_Suggestion_Data.exercisename},function(){errorMessage(d,"Please try again later!")})},b.suggestionname()):b.exerciseDetail.exercisename=null,b.loaded=!1},b.tagListArray=[];var k=g.doGetTags();k.then(function(a){b.exerciseTagList=a,$.each(b.exerciseTagList,function(a,c){b.tagListArray.push(c.tagname)})}),a.all([k]).then(function(){1==b.type?(b.doGetExcerciseTypeList(),b.doSetExcerciseDetails()):2==b.type&&(b.doGetExcerciseTypeList(),b.doGetExcerciseDetails())})}]),adminApp.directive("ngFileSelect",function(){return{link:function(a,b){b.bind("change",function(b){a.file=(b.srcElement||b.target).files[0],a.getFile()})}}}),adminApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),adminApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),adminApp.directive("validFile",function(){return{require:"ngModel",link:function(a,b,c,d){b.bind("change",function(){a.$apply(function(){d.$setViewValue(b.val()),d.$render()})})}}}),adminApp.filter("startsWithLetterExercise",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.exercisename)||d.test(f.type))&&c.push(f)}else;return c}});