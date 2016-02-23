module.exports=function(grunt){
  grunt.initConfig({
      uglify: {
          min: {
              files: grunt.file.expandMapping('app/**/*.js', 'CyberHealth/', {
                  rename: function(destBase, destPath) {
                      return destBase+destPath.replace('.js', '.js');
                  }
              })
          }
      }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
};