var userApp=angular.module("userApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","flash","angularUtils.directives.dirPagination"]);userApp.controller("CourseController",["$scope","requestHandler","Flash","$routeParams","$location",function(a,b,c,d,e){a.entrolling="Enroll course",a.enrollButtonStatus=!1,a.activeClass.myCourses="active",a.mycourselist=function(){a.loaded=!0,b.getRequest("user/getMyCourseList/","").then(function(b){a.myCourseList=b.data.published_Course,a.loaded=!1,a.formatMyCourseByCategory()},function(){errorMessage(c,"Please try again later!")})},a.formatMyCourseByCategory=function(){b.getRequest("getCoursecategory/","").then(function(b){a.allCategory=a.allCategoryCourses=b.data.coursecategory,$.each(a.allCategory,function(b,c){c.courses=[],$.each(a.myCourseList,function(a,b){c.categoryid==b.categoryid&&c.courses.push(b)}),b==a.allCategory.length-1&&(callCarousel(),window.setTimeout(function(){a.$apply(function(){a.loaded=!1})},900))}),console.log(a.allCategory)})},a.courseDetails=function(){a.loaded=!0,b.postRequest("courseDetail/",{courseid:d.id}).then(function(b){a.courseDetails=b.data.coursedetail,a.courseDetails.role="user",a.loaded=!1},function(){errorMessage(c,"Please try again later!")})},a.courseSectionList=function(){b.postRequest("getSectionList/",{courseid:d.id}).then(function(b){a.sectionList=b.data.course},function(){errorMessage(c,"Please try again later!")})},a.courseSectionDetails=function(){b.postRequest("user/sectionDetail/",{sectionid:d.id}).then(function(c){a.sectionDetail=c.data.sectiondetail,b.postRequest("getSectionList/",{courseid:a.sectionDetail.courseid}).then(function(b){a.sectionList=b.data.course,$.each(a.sectionList,function(a,b){b.sequenceno=a+1})})},function(){errorMessage(c,"Please try again later!")})},a.courseSectionDetailsbyId=function(d){$("html, body").animate({scrollTop:0},600),b.postRequest("user/sectionDetail/",{sectionid:d}).then(function(b){a.sectionDetail=b.data.sectiondetail},function(){errorMessage(c,"Please try again later!")})},a.courselist=function(){b.postRequest("getPublishedCourse/",{offset:0,limit:1}).then(function(b){a.showCourseSearch=b.data.published_Course.length},function(){errorMessage(c,"Please try again later!")}),$("#callCarousel").hide(),a.loaded=!0,b.getRequest("getCoursecategory/","").then(function(c){a.allCategory=a.allCategoryCourses=c.data.coursecategory,$.each(a.allCategory,function(c,d){b.postRequest("searchPublishedCourse/",{categoryid:d.categoryid,coursename:"",ownername:""}).then(function(b){a.allCategoryCourses[c].categoryCourses=b.data.published_Course,c==a.allCategory.length-1&&(callCarousel(),window.setTimeout(function(){a.$apply(function(){a.loaded=!1})},900))})})})},a.categoryCourseList=function(){b.postRequest("searchPublishedCourse/",{categoryid:d.id,coursename:"",ownername:""}).then(function(b){a.categoryCourses=b.data.published_Course,a.paginationLoad=!0})},a.MycourseCategory=function(){a.categoryMycourses=[],b.getRequest("user/getMyCourseList/","").then(function(b){a.myCourseList=b.data.published_Course,$.each(a.myCourseList,function(b,c){c.categoryid==d.id&&a.categoryMycourses.push(c)}),console.log("mycar",a.categoryMycourses)})},a.doEnrollCourse=function(d){a.entrolling="Enrolling Please Wait",a.enrollButtonStatus=!0,b.postRequest("user/enrollCourse/",{courseid:d,returnUrl:b.paymentURL()+"/#/thanksEnrollPage/"+d,cancelUrl:b.paymentURL()+"/#/course-detail/"+d}).then(function(a){1==a.data.transactionStatus?window.location=a.data.approveURL:2==a.data.transactionStatus&&(window.location=b.paymentURL()+"/#/thanksEnrollPage/"+d)},function(){errorMessage(c,"Please try again later!")})},a.checkenroll=function(){$(function(){$("#lean_overlay").fadeTo(1e3),$("#enrollmodal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#enrollmodal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#enrollmodal").hide(),$("#lean_overlay").hide()})},a.getNextIndex=function(b){$.each(a.sectionList,function(c,d){d.sequenceno==b+1&&a.courseSectionDetailsbyId(d.sectionid)})},a.getPreviousIndex=function(b){$.each(a.sectionList,function(c,d){d.sequenceno==b-1&&a.courseSectionDetailsbyId(d.sectionid)})},a.courseinit=function(){a.courselist()},a.mycourseinit=function(){a.mycourselist()},a.categorycourseinit=function(){a.paginationLoad=!1,a.categoryCourseList()},a.categorymycourseinit=function(){a.paginationLoad=!1,a.MycourseCategory()},a.viewinit=function(){a.courseDetails(),a.courseSectionList()},$(".show-list-search").click(function(){$(".search-list-form").toggle(300),$(".search-list-form input").focus()})}]),userApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),userApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),userApp.filter("startsWithLetterCourse",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.ownername)||d.test(f.coursename))&&c.push(f)}else;return c}});var adminApp=angular.module("adminApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","flash","angularUtils.directives.dirPagination"]);adminApp.controller("CourseAdminController",["$scope","requestHandler","Flash","$routeParams","$location",function(a,b,c,d,e){a.courselist=function(){b.postRequest("getPublishedCourse/",{offset:0,limit:10}).then(function(b){a.courseList=b.data.published_Course,a.paginationLoad=!0},function(){errorMessage(c,"Please try again later!")})},a.courseDetails=function(){b.postRequest("courseDetail/",{courseid:d.id}).then(function(b){a.courseDetails=b.data.coursedetail,a.courseDetails.role="admin"},function(){errorMessage(c,"Please try again later!")})},a.courseSectionList=function(){b.postRequest("getSectionList/",{courseid:d.id}).then(function(b){a.sectionList=b.data.course},function(){errorMessage(c,"Please try again later!")})},a.courseSectionDetails=function(){b.postRequest("admin/getSectionDetail/",{sectionid:d.id}).then(function(c){a.sectionDetail=c.data["Section Detail"],b.postRequest("getSectionList/",{courseid:a.sectionDetail.courseid}).then(function(b){a.sectionList=b.data.course,a.sectionLength=a.sectionList.length,$.each(a.sectionList,function(a,b){b.sequenceno=a+1})})},function(){errorMessage(c,"Please try again later!")})},a.courseSectionDetailsbyId=function(d){$("html, body").animate({scrollTop:0},600),b.postRequest("admin/getSectionDetail/",{sectionid:d}).then(function(b){a.sectionDetail=b.data["Section Detail"]},function(){errorMessage(c,"Please try again later!")})},a.getNextIndex=function(b){$.each(a.sectionList,function(c,d){d.sequenceno==b+1&&a.courseSectionDetailsbyId(d.sectionid)})},a.getPreviousIndex=function(b){$.each(a.sectionList,function(c,d){d.sequenceno==b-1&&a.courseSectionDetailsbyId(d.sectionid)})},a.pendingcourselist=function(){b.getRequest("admin/listOfPendingCourses/","").then(function(b){a.pendingCourseList=b.data.pendingcourses,a.pendingCount=[a.pendingCourseList.length],a.page="pending",a.paginationLoad=!0},function(){errorMessage(c,"Please try again later!")})},a.doAcceptCourse=function(d){b.postRequest("admin/publishCourse/",{courseid:d}).then(function(b){a.pendingcourselist(),e.path("course-pending"),successMessage(c,"Successfully Published")},function(){errorMessage(c,"Please try again later!")})},a.doRejectCourse=function(d){b.postRequest("admin/rejectCourse/",{courseid:d,comments:a.comments}).then(function(b){a.pendingcourselist(),e.path("course-pending"),successMessage(c,"Successfully Rejected")},function(){errorMessage(c,"Please try again later!")})},a.viewinit=function(){a.courseDetails(),a.courseSectionList()},a.publishedCourses=function(){a.courselist(),a.pendingcourselist()},a.resetrejectdata=function(){a.comments={},a.comments="",a.courseRejectForm.$setPristine()},a.publishedCourses(),$(".show-list-search").click(function(){$(".search-list-form").toggle(300),$(".search-list-form input").focus()}),a.modal=function(b){a.courseid=b,$("html, body").animate({scrollTop:0},600),$(function(){$("#lean_overlay").fadeTo(1e3),$(".modalRejectCourse").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$(".modalRejectCourse").hide(),$("#lean_overlay").hide(),a.resetrejectdata()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$(".modalRejectCourse").hide(),$("#lean_overlay").hide(),a.resetrejectdata()})},a.acceptModal=function(b){a.courseid=b,$("html, body").animate({scrollTop:0},600),$(function(){$("#lean_overlay").fadeTo(1e3),$(".modalAcceptCourse").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$(".modalAcceptCourse").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$(".modalAcceptCourse").hide(),$("#lean_overlay").hide()})}}]),adminApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),adminApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),adminApp.filter("startsWithLetterCourse",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.coursename)||d.test(f.coursesubtitle)||d.test(f.categoryname)||d.test(f.ownername)||d.test(f.price)||d.test(f.enrollcount)||d.test(f.createdon)||d.test(f.publishedon))&&c.push(f)}else;return c}}),adminApp.filter("startsWithLetterPending",function(){return function(a,b){var c=[],d=new RegExp(b,"i");if(a)for(var e=0;e<a.length;e++){var f=a[e];(d.test(f.coursename)||d.test(f.coursesubtitle)||d.test(f.categoryname)||d.test(f.ownername)||d.test(f.price)||d.test(f.createdon)||d.test(f.reviewdate))&&c.push(f)}else;return c}});var coachApp=angular.module("coachApp",["ngRoute","oc.lazyLoad","ngCookies","requestModule","flash","summernote"]);coachApp.controller("CourseController",["$scope","requestHandler","Flash","$routeParams","$location",function(a,b,c,d,e){d.id?(a.loaded=!0,a.getCourseDetails=function(){b.postRequest("coach/getCourseDetail/",{courseid:d.id}).then(function(b){a.courseDetails=b.data["Course details"],a.courseDetails.promoimage=a.courseDetails.promoimage+"?decache="+Math.random(),a.getAllSections(a.courseDetails.courseid)},function(){errorMessage(c,"Please try again later!")})},a.getAllSections=function(d){b.postRequest("coach/getCourseSections/",{courseid:d}).then(function(b){a.courseSections=b.data.CourseSections.sections,a.loaded=!1},function(){errorMessage(c,"Please try again later!")})},a.getCourseDetails(),0!=a.courseSections&&RowSorter("table[attr-sample=thetable]",{handler:"td.sorter",stickFirstRow:!0,stickLastRow:!1,onDragStart:function(a,b,c){log("start index is "+c)},onDrop:function(e,f,g,h){a.loaded=!0,a.sortSectionIdlist=[],a.sortSectionIdUnlist=[];var i=h+1,j=g+1;j>i?$.each(a.courseSections,function(b,c){c.sequenceno<i?a.sortSectionIdlist.push(c.sectionid):i<=c.sequenceno&&c.sequenceno<j?a.sortSectionIdlist.push(a.courseSections[b+1].sectionid):c.sequenceno==j?a.sortSectionIdlist.push(a.courseSections[i-1].sectionid):a.sortSectionIdlist.push(c.sectionid)}):$.each(a.courseSections,function(b,c){a.sortSectionIdUnlist.push(c.sectionid),c.sequenceno<j?a.sortSectionIdlist.push(c.sectionid):j<c.sequenceno&&c.sequenceno<=i?a.sortSectionIdlist.push(a.courseSections[b-1].sectionid):c.sequenceno==j?a.sortSectionIdlist.push(a.courseSections[i-1].sectionid):a.sortSectionIdlist.push(c.sectionid)}),b.postRequest("coach/swapCourseSection/",{sectionidList:a.sortSectionIdlist,courseid:d.id}).then(function(b){successMessage(c,"Sections Sorted Successfully!"),a.getAllSections(d.id)},function(){errorMessage(c,"Please try again later!")})}})):d.sectionId||b.getRequest("coach/getCourseList/","").then(function(b){a.courselength=b.data.course,0===a.courselength.length?a.myCourseList="":a.myCourseList=b.data.course.course_list,$.each(a.myCourseList,function(a,b){b.promoimage=b.promoimage+"?decache="+Math.random()}),a.loaded=!1},function(){errorMessage(c,"Please try again later!")}),d.sectionId&&b.postRequest("coach/detailCourseSection/",{sectionid:d.sectionId}).then(function(c){a.sectionDetails=c.data.CourseSectionDetail,b.postRequest("coach/getCourseSections/",{courseid:a.sectionDetails.courseid}).then(function(b){a.courseSections=b.data.CourseSections.sections,a.sectionLength=a.courseSections.length})},function(){errorMessage(c,"Please try again later!")}),a.changeSection=function(c){b.postRequest("coach/detailCourseSection/",{sectionid:c}).then(function(b){a.sectionDetails=b.data.CourseSectionDetail}),$("body").animate({scrollTop:0},600)},a.nextSection=function(b){$.each(a.courseSections,function(c,d){d.sequenceno==b+1&&a.changeSection(d.sectionid)})},a.prevSection=function(b){$.each(a.courseSections,function(c,d){d.sequenceno==b-1&&a.changeSection(d.sectionid)})},a.doDeleteCourse=function(){b.postRequest("coach/deleteCourse/",{courseid:d.id}).then(function(a){e.path("course")},function(){errorMessage(c,"Please try again later!")})},a.sendCourseToReview=function(f){b.postRequest("coach/sendCourseForReview/",{courseid:f}).then(function(b){successMessage(c,"Course Sent for Review!"),d.id?a.getCourseDetails():e.path("course-view/"+f)},function(){errorMessage(c,"Please try again later!")})},a.deleteSection=function(f){b.deleteRequest("coach/deleteCourseSection/",{sectionid:a.deleteSectionId}).then(function(b){d.sectionId==a.deleteSectionId?e.path("course-view/"+f):d.sectionId!=a.deleteSectionId&&a.getCourseDetails(),successMessage(c,"Section Deleted Successfully!")},function(){errorMessage(c,"Please try again later!")})},a.reviewModel=function(){b.getRequest("getUserId/","").then(function(b){a.response=b.data.Login.status,$(function(){$("#lean_overlay").fadeTo(1e3),$("#review-modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#review-modal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#review-modal").hide(),$("#lean_overlay").hide()})})},a.sectionDeleteModel=function(b){$("html, body").animate({scrollTop:0},600),a.deleteSectionId=b,$(function(){$("#lean_overlay").fadeTo(1e3),$("#section-modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#section-modal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#section-modal").hide(),$("#lean_overlay").hide()})},a.deleteModel=function(){$(function(){$("#lean_overlay").fadeTo(1e3),$("#modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()})}}]),coachApp.controller("CourseEditController",["$scope","requestHandler","Flash","$routeParams","$location",function(a,b,c,d,e){a.courseDetails={};a.isCancel=d.cancelvalue,d.courseId&&(a.SectionTitle="Add Section",a.sectionDetails={},a.isAdd=1,a.sectionDetails.courseid=parseInt(d.courseId),a.options={height:300},a.addSection=function(){a.loaded=!0,b.postRequest("coach/insertCourseSection/",a.sectionDetails).then(function(b){e.path("course-section/"+b.data.CourseSection.sectionid),a.loaded=!1,successMessage(c,"Section Successfully Added!")},function(){errorMessage(c,"Please try again later!")})}),d.id?(a.isAdd=0,a.CourseTitle="Edit Course",a.options={height:200,airMode:!0,toolbar:[["font",["bold","italic","underline","clear"]],["para",["ul","ol","paragraph"]]]},b.postRequest("coach/getCourseDetail/",{courseid:d.id}).then(function(b){a.courseDetails=b.data["Course details"],a.courseDetails.promoimage=a.courseDetails.promoimage+"?decache="+Math.random(),a.originalCourseDetails=angular.copy(a.courseDetails),$(".image-editor").cropit({imageState:{src:a.courseDetails.promoimage+"?decache="+Math.random()}})},function(){errorMessage(c,"Please try again later!")}),b.getRequest("getCoursecategory/","").then(function(b){a.options=b.data.coursecategory},function(){errorMessage(c,"Please try again later!")})):d.courseId||d.sectionId||(a.isAdd=1,a.CourseTitle="Add Course",a.options={height:300},a.courseDetails.categoryid=1,a.courseDetails.promoimage="../../images/no-course.jpg",$(".image-editor").cropit({imageState:{src:"../../images/no-course.jpg"}}),b.getRequest("getCoursecategory/","").then(function(b){a.options=b.data.coursecategory},function(){errorMessage(c,"Please try again later!")})),a.isCleanCourse=function(){return angular.equals(a.originalCourseDetails,a.courseDetails)},a.doUpdateImage=function(){if(0==a.isAdd){var d={};d.coursename=a.originalCourseDetails.coursename,d.coursesubtitle=a.originalCourseDetails.coursesubtitle,d.coursedescription=a.originalCourseDetails.coursedescription,d.price=a.originalCourseDetails.price,d.categoryid=a.originalCourseDetails.categoryid,d.courseid=a.originalCourseDetails.courseid,d.promoimage=$(".image-editor").cropit("export"),b.putRequest("coach/updateCourse/",d).then(function(b){a.imageUpdatedDetails=b.data.Course,a.courseDetails.promoimage=a.imageUpdatedDetails.promoimage+"?decache="+Math.random(),$(".image-editor").cropit({imageState:{src:a.courseDetails.promoimage+"?decache="+Math.random()}})},function(){errorMessage(c,"Please try again later!")})}else a.courseDetails.promoimage=$(".image-editor").cropit("export")},a.doAddCourse=function(){"../../images/no-course.jpg"===a.courseDetails.promoimage?a.convertImgToBase64(a.courseDetails.promoimage,function(d){a.courseDetails.promoimage=d,a.loaded=!0,b.postRequest("coach/insertCourse/",a.courseDetails).then(function(b){a.loaded=!1,e.path("course-view/"+b.data.Course.courseid)},function(){errorMessage(c,"Please try again later!")})}):(a.loaded=!0,b.postRequest("coach/insertCourse/",a.courseDetails).then(function(b){a.loaded=!1,e.path("course-view/"+b.data.Course.courseid)},function(){errorMessage(c,"Please try again later!")}))},a.convertImgToBase64=function(a,b,c){var d=new Image;d.crossOrigin="Anonymous",d.onload=function(){var a=document.createElement("CANVAS"),d=a.getContext("2d");a.height=this.height,a.width=this.width,d.drawImage(this,0,0);var e=a.toDataURL(c||"image/jpg");b(e),a=null},d.src=a},a.doUpdateCourse=function(){var d={};d.coursename=a.courseDetails.coursename,d.coursesubtitle=a.courseDetails.coursesubtitle,d.coursedescription=a.courseDetails.coursedescription,d.price=a.courseDetails.price,d.categoryid=a.courseDetails.categoryid,d.courseid=a.courseDetails.courseid,b.putRequest("coach/updateCourse/",d).then(function(a){e.path("course-view/"+a.data.Course.courseid),successMessage(c,"Course Updated Successfully!")},function(){errorMessage(c,"Please try again later!")})},d.sectionId&&(a.loaded=!0,a.SectionTitle="Edit Section",a.isAdd=0,a.options={height:300},b.postRequest("coach/detailCourseSection/",{sectionid:d.sectionId}).then(function(b){a.sectionDetails=b.data.CourseSectionDetail,a.originalSectionDetails=angular.copy(a.sectionDetails),a.loaded=!1},function(){errorMessage(c,"Please try again later!")})),a.isClean=function(){return angular.equals(a.originalSectionDetails,a.sectionDetails)},a.doUpdateSection=function(){a.loaded=!0;var d={};d.sectionid=a.sectionDetails.sectionid,d.sectiontitle=a.sectionDetails.sectiontitle,d.sectioncontent=a.sectionDetails.sectioncontent,b.putRequest("coach/updateCourseSection/",d).then(function(b){e.path("course-section/"+b.data.CourseSection.sectionid),a.loaded=!1,successMessage(c,"Section Updated Successfully!")},function(){errorMessage(c,"Please try again later!")})},a.openCourseImageModel=function(){$(function(){$("#lean_overlay").fadeTo(1e3),$("#modal").fadeIn(600),$(".common_model").show()}),$(".modal_close").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()}),$("#lean_overlay").click(function(){$(".common_model").hide(),$("#modal").hide(),$("#lean_overlay").hide()})}}]),coachApp.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),coachApp.filter("html",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),coachApp.directive("summernoteRequired",function(){return{require:"ngModel",restrict:"",link:function(a,b,c,d){d.$validators.summernoteRequired=function(a){return""!=a&&"<p><br></p>"!=a&&"<br>"!=a}}}});