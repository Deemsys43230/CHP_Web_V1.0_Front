var adminApp = angular.module('adminApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','summernote','angularUtils.directives.dirPagination']);
adminApp.controller('LatestNewsController',function($scope,requestHandler,Flash,$location) {

    $scope.isNew = true;
    $scope.title = "Add Latest News";
    $scope.activeClass = {news:'active'};

    // To display Latest news
    $scope.doGetLatestNews=function(){
        $scope.loaded=true;
        requestHandler.getRequest("admin/getLatestNews/", "").then(function(response){
            $scope.news=response.data.News;
            $scope.loaded=false;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    //To add Latest News
    $scope.doAddLatestNews=function(){
        alert($scope.latest.description);
        alert($('#summernote-news').html());

        /*$('#summernote-news').code().find('*').css('font-family','inherit');
              alert($scope.latest.description);*/
        requestHandler.postRequest("admin/insertorupdateLatestNews/",$scope.latest).then(function(response){

            successMessage(Flash,"Successfully Added");
            $location.path("latestNews");
        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };


    //To Enable or Disable Latest News

    $scope.doEnableDisableLatestNews=function(id){
        requestHandler.postRequest("admin/disableLatestNews/",{'newsid':id}).then(function(response){

            $scope.doGetLatestNews();
            successMessage(Flash,"Successfully Updated");

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

    // Display Latest News On Page Load
    $scope.doGetLatestNews();

});

adminApp.controller('LatestNewsEditController',function($scope,requestHandler,Flash,$location,$routeParams) {

    $scope.activeClass = {news:'active'};

    var originalnews ="";
    //To display Latest News based on newsid
    $scope.doGetLatestNewsByID=function(){
        $scope.isNew = false;
        $scope.title = "Edit Latest News";

        requestHandler.getRequest("admin/getLatestNewsById/"+$routeParams.id,"").then(function(response){
            originalnews=angular.copy(response.data.News);
            $scope.latest=response.data.News;
        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };


    //To update Latest News
    $scope.doUpdateLatestNews = function(){
        requestHandler.putRequest("admin/insertorupdateLatestNews/",$scope.latest).then(function(response){
            successMessage(Flash,"Successfully Updated");
            $location.path("latestNews");

        }, function () {
            errorMessage(Flash, "Please try again later!")
        });
    };

    //To Enable the update button if changes occur.
    $scope.isClean = function() {
        console.log(originalnews);
        console.log($scope.latest);
        return angular.equals (originalnews, $scope.latest);
    }

    //Display Edit Page with date On load
    $scope.doGetLatestNewsByID();

});

// html filter (render text as html)
adminApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('NewsUserController',function($scope,requestHandler,Flash,$sce,$routeParams){



    // To display Testimonials as user
    $scope.doGetNewsByUser=function(){

        requestHandler.getRequest("getLatestNewsByUser/", "").then(function(response){

            $scope.usernewslist=response.data.News;
/*var date = new Date($scope.usernewslist.datetime);
            $scope.dateformat = date.getDate();
            alert($scope.dateformat);*/
          //  $scope.usertestimonialdetails = response.data.Testimonials[0];

        },function(){
            errorMessage(Flash,"Please try again later!")
        });
    };

   /* $scope.doGetNewsDetailsByUser= function (id) {
        //  alert("hi");
        requestHandler.getRequest("getTestimonialDetail/"+id, "").then(function(response){

            //View the image in ng-src for view testimonials
            $scope.myImgSrc = $sce.trustAsResourceUrl(response.data.Testimonials.imageurl+"?decache="+Math.random());

            $scope.usertestimonialdetails=response.data.Testimonials

        },function(){
            errorMessage(Flash,"Please try again later!")
        });

    };*/

    // To display the user Testimonial list on load
    $scope.doGetNewsByUser();
   // $scope.doGetTestimonialDetailsByUser($routeParams.id);


});

// html filter (render text as html)
commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);



commonApp.filter('toSec', function($filter) {

    return function(input) {
       // alert("i");
       /* alert(new Date());
        alert("input"+input);
        var dateformat = $filter('date')(input, 'MM/dd/yyyy hh:mm:ss');*/
       /* alert(dateformat);*/
        var result = new Date(input).getTime();
       // alert(result);
        return result || '';
    };
});