angular.module('app').controller('AppCtrl', function($scope, $ocLazyLoad) {
  $scope.$on('ocLazyLoad.moduleLoaded', function(e, params) {
    console.log('event module loaded', params);
  });

  $scope.$on('ocLazyLoad.componentLoaded', function(e, params) {
    console.log('event component loaded', params);
  });

  $scope.$on('ocLazyLoad.fileLoaded', function(e, file) {
    console.log('event file loaded', file);
  });
  
  $scope.loadBootstrap = function() {
    // use events to know when the files are loaded
    var unbind = $scope.$on('ocLazyLoad.fileLoaded', function(e, file) {
      if(file === 'bootstrap/dist/css/bootstrap.css') {
        $scope.bootstrapLoaded = true;
        unbind();
      }
    });
    // we could use .then here instead of events
    $ocLazyLoad.load([
      '../../../bootstrap/dist/css/bootstrap.css'
    ]);
  };
});
