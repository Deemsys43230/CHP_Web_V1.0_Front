var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","requestModule","flash","ngAnimate","ui.select","foodServiceModule","angularUtils.directives.dirPagination"]);adminApp.controller("FoodUploadController",["$q","$scope","FileUploader",function(a,b,c){var d=b.uploader=new c({url:"upload.php"});d.filters.push({name:"customFilter",fn:function(a,b){return this.queue.length<10}}),d.onWhenAddingFileFailed=function(a,b,c){console.info("onWhenAddingFileFailed",a,b,c)},d.onAfterAddingFile=function(a){console.info("onAfterAddingFile",a)},d.onAfterAddingAll=function(a){console.info("onAfterAddingAll",a)},d.onBeforeUploadItem=function(a){console.info("onBeforeUploadItem",a)},d.onProgressItem=function(a,b){console.info("onProgressItem",a,b)},d.onProgressAll=function(a){console.info("onProgressAll",a)},d.onSuccessItem=function(a,b,c,d){console.info("onSuccessItem",a,b,c,d)},d.onErrorItem=function(a,b,c,d){console.info("onErrorItem",a,b,c,d)},d.onCancelItem=function(a,b,c,d){console.info("onCancelItem",a,b,c,d)},d.onCompleteItem=function(a,b,c,d){console.info("onCompleteItem",a,b,c,d)},d.onCompleteAll=function(){console.info("onCompleteAll")},console.info("uploader",d)}]),adminApp.controller("FoodController",["$scope","requestHandler","Flash",function(a,b,c){a.activeClass={foodlist:"active"},a.sortfoodidicon="fa fa-caret-down",a.sortfoodnameicon="fa fa-caret-down",a.sortFoodId=function(){a.sortKey="foodid",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortfoodidicon?a.sortfoodidicon="fa fa-caret-up":a.sortfoodidicon="fa fa-caret-down"},a.sortFoodName=function(){a.sortKey="foodname",a.reverse=!a.reverse,"fa fa-caret-down"==a.sortfoodnameicon?a.sortfoodnameicon="fa fa-caret-up":a.sortfoodnameicon="fa fa-caret-down"},a.doGetAllFoodItems=function(){return a.loaded=!0,b.getRequest("admin/getFoodList/","").then(function(b){a.foodList=b.data.Food_Data,a.paginationLoad=!0,a.loaded=!1},function(a){})},a.doEnableDisable=function(d){"none"!=$(".search-list-form").css("display")&&($(".search-list-form").hide(),$(".search-list-form").show(2400)),b.postRequest("admin/enableordisableFood/",{foodid:d}).then(function(b){if(1==b.data.Response_status){var d=a.doGetAllFoodItems();d.then(function(){successMessage(c,"Successfully Updated")})}else if(0==b.data.Response_status){var d=a.doGetAllFoodItems();d.then(function(){errorMessage(c,"Food used by users")})}},function(a){errorMessage(c,"Please Try Again Later")})},a.init=function(){a.paginationLoad=!1,a.doGetAllFoodItems()},$(".show-list-search").click(function(){$(".search-list-form").toggle(300),a.pagenumber="",$(".search-list-form input").focus()}),a.pagenumber="",a.newPageNumber=1,a.goToPage=function(){a.newPageNumber=a.pagenumber,a.pagenumber=""}}]),adminApp.controller("FoodDetailsViewController",["$scope","requestHandler","$routeParams",function(a,b,c){a.doGetFoodDetails=function(){b.postRequest("getFoodDetailByadmin/",{foodid:c.id}).then(function(b){a.foodDetails=b.data.Food_Data,a.foodDetails.foodImagePath=a.foodDetails.foodImagePath+"200x200.jpg?decache="+Math.random(),1==a.foodDetails.notobesity?(a.foodDetails.notSuitableFor="Obesity",1==a.foodDetails.notdiabetes&&(a.foodDetails.notSuitableFor+=", Diabetes")):1==a.foodDetails.notdiabetes?a.foodDetails.notSuitableFor="Diabetes":a.foodDetails.notSuitableFor="-"},function(a){console.log("Not able to pull Food Measure List")})},a.doGetFoodDetails()}]),adminApp.controller("FoodDetailsEditController",["$q","$scope","requestHandler","FoodService","$routeParams","Flash","$route","fileReader","$location",function(a,b,c,d,e,f,g,h,i){var j="";b.title=g.current.title,b.type=g.current.type,b.isNew=g.current.isNew,b.imageUpload=!1,b.inputContainsFile=!0,b.doingUpdate=!1,b.tagTransform=function(a){if(-1==b.tagListArray.indexOf(a)){var c={tagid:null,tagname:a};return c}},b.doGetFoodDetails=function(){c.postRequest("getFoodDetailByadmin/",{foodid:e.id}).then(function(a){b.foodDetails=a.data.Food_Data,b.foodDetails.foodImagePath=b.foodDetails.foodImagePath+"200x200.jpg?decache="+Math.random(),b.foodDetails.sessionSet=d.setSessionValues(b.foodDetails.sessionid);var c=d.doGetMeasures(b.foodDetails.measureid);c.then(function(a){b.foodMeasureListAll=a}),b.foodDetails.regionid=b.foodDetails.regionid.regionid,j=angular.copy(b.foodDetails)},function(a){console.log("Not able to pull Food Measure List")})},b.getFile=function(){b.progress=0,h.readAsDataUrl(b.file,b).then(function(a){b.foodDetails.foodimage=a,b.inputContainsFile=!1})},b.$on("fileProgress",function(a,c){b.progress=c.loaded/c.total}),b.doRefreshPreview=function(){b.foodDetails.foodimage=b.foodDetails.foodImagePath,b.inputContainsFile=!0},b.doUpdateFoodImage=function(){b.imageUpload=!0,b.foodDetails.foodImagePath=b.foodDetails.foodimage},b.doUpdateFoodDetails=function(){b.doingUpdate=!0,b.spinner=!0,b.foodDetails.sessionid=d.getSessionArray(b.foodDetails.sessionSet),b.foodDetails.categoryid=d.getCategoryArray(b.foodDetails.categoryid),b.imageUpload||delete b.foodDetails.foodimage,delete b.foodDetails.foodImagePath;var e,g=[];$.each(b.foodDetails.tagid,function(a,b){null!=b.tagid?g.push(parseInt(b.tagid)):(e=d.insertTag(b.tagname),e.then(function(a){g.push(a)}))}),b.foodDetails.tagid=g,b.foodDetails.regionid=b.foodDetails.regionid,b.foodDetails.measuredata=b.foodDetails.measureid,a.all([e]).then(function(){c.putRequest("admin/updateFood/",b.foodDetails).then(function(a){1==a.data.Response_status&&(successMessage(f,"Food Updated Successfully!"),b.doGetFoodDetails(),i.path("food"),b.spinner=!1,b.doingUpdate=!1)},function(a){console.log("Not able to pull Food Tag"),b.spinner=!1,b.doingUpdate=!1})})},b.doSetFoodDetails=function(){b.imageAdded=!0,b.foodDetails={},b.foodDetails.measureid=[],b.foodDetails.sessionid=[],b.foodDetails.regionid="1",null!=e.id?(b.suggestionname=function(){c.postRequest("admin/getFoodSuggestionDetail/",{suggestionid:e.id}).then(function(a){b.foodDetails.foodname=a.data.Food_Suggestion_Data.foodname},function(){errorMessage(f,"Please try again later!")})},b.suggestionname()):b.foodDetails.foodname=null,b.foodDetails.foodImagePath="../../images/No_image_available.jpg",b.foodDetails.sessionSet=d.setSessionValues(b.foodDetails.sessionid);var a=d.doGetMeasures(b.foodDetails.measureid);a.then(function(a){b.foodMeasureListAll=a})},b.doAddFoodDetails=function(){b.doingUpdate=!0,b.spinner=!0,b.foodDetails.sessionid=d.getSessionArray(b.foodDetails.sessionSet),b.foodDetails.categoryid=d.getCategoryArray(b.foodDetails.categoryid),b.imageUpload||delete b.foodDetails.foodimage;var g,h=[];$.each(b.foodDetails.tagid,function(a,b){null!=b.tagid?h.push(parseInt(b.tagid)):(g=d.insertTag(b.tagname),g.then(function(a){h.push(a)}))}),b.foodDetails.tagid=h,b.foodDetails.measuredata=b.foodDetails.measureid,b.foodDetails.regionid=b.foodDetails.regionid,a.all([g]).then(function(){c.postRequest("admin/insertFood/",b.foodDetails).then(function(a){1==a.data.Response_status&&(successMessage(f,"Food Added Successfully!"),b.doingUpdate=!1,b.spinner=!1,i.path("food"))},function(a){b.doingUpdate=!1,b.spinner=!1,errorMessage(f,"Try Again Later!")}),null!=e.id&&b.doApproveFoodSuggestion()})},b.doApproveFoodSuggestion=function(){b.loaded=!0,c.postRequest("admin/approveFoodSuggestion/",{suggestionid:e.id}).then(function(a){b.loaded=!1,b.doGetAllFoodSuggestion(),successMessage(f,"Successfully Updated")},function(){errorMessage(f,"Please try again later!")})},b.isClean=function(){return angular.equals(j,b.foodDetails)},b.doAddNewMeasureMinerals=function(a,c){b.foodDetails.measureid=d.doAddMeasureMinerals(a,c,b.foodDetails.measureid)};var k=d.doGetCategories();k.then(function(a){b.foodCategoryListAll=a}),b.tagListArray=[];var l=d.doGetTags();l.then(function(a){b.foodTagList=a,$.each(b.foodTagList,function(a,c){b.tagListArray.push(c.tagname)})}),a.all([k,l]).then(function(){1==b.type?b.doSetFoodDetails():2==b.type&&b.doGetFoodDetails()})}]),adminApp.directive("ngFileSelect",function(){return{link:function(a,b){b.bind("change",function(b){a.file=(b.srcElement||b.target).files[0],a.getFile()})}}}),adminApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),adminApp.controller("FoodCateogryController",["$scope",function(a){a.activeClass={category:"active"}}]),adminApp.filter("propsFilter",function(){return function(a,b){var c=[];return angular.isArray(a)?a.forEach(function(a){for(var d=!1,e=Object.keys(b),f=0;f<e.length;f++){var g=e[f],h=b[g].toLowerCase();if(-1!==a[g].toString().toLowerCase().indexOf(h)){d=!0;break}}d&&c.push(a)}):c=a,c}}),adminApp.directive("validFile",function(){return{require:"ngModel",link:function(a,b,c,d){b.bind("change",function(){a.$apply(function(){d.$setViewValue(b.val()),d.$render()})})}}}),adminApp.filter("startsWithLetterFood",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.foodname)||d.test(f.category)||d.test(f.session)||d.test(f.region))&&c.push(f)}else;return c}}),adminApp.directive("onlyDigits",function(){return{require:"ngModel",restrict:"A",link:function(a,b,c,d){function e(a){if(a){var b=a.replace(/[^0-9]/g,"");return b!==a&&(d.$setViewValue(b),d.$render()),parseInt(b,10)}}d.$parsers.push(e)}}});