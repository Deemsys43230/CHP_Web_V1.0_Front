module.exports=function(grunt){
   grunt.initConfig({
        watch: {
        	options: { nospawn: true },
            scripts: {
                files: ['app/*.js','app/**/*.js','js/*.js','angular/output.js','!app/userDashboard/userDashboardController.js','css/*.css','!css/style.css','views/**/*.html','plugin/**/*.css','images/*.{png,jpg,gif}','images/**/*.{png,jpg,gif}','views/**/*.html','!views/user/views/dashboard.html'],
                tasks: ['newer:uglify','newer:cssmin','newer:imagemin','newer:htmlmin']
            }
        },
        uglify  : {
            build: {
                files: [
                    {
                        expand: true,
                        src: ['app/*.js','app/**/*.js','js/*.js','angular/output.js','!app/userDashboard/userDashboardController.js'],
                        dest: 'CyberHealth/'
                    }
                ]
            }
        },
       concat: {
           options: {
               separator: ';'
           },
           dist: {
              src: ['angular/angular-cookies.js', 'angular/ocLazyLoad.min.js', 'angular/angular-animate-1.4.3.js','angular/angular-flash.min.js','js/jquery.migrate.js','js/jquery.fitvids.js','js/nivo-lightbox.min.js','js/owl.carousel.min.js','js/jquery.isotope.min.js','js/jquery.appear.js','js/count-to.js','js/jquery.textillate.js','js/jquery.lettering.js','js/jquery.easypiechart.min.js','plugin/scroll/jquery.nicescroll.min.js','js/jquery.parallax.js','js/mediaelement-and-player.js','angular/angular-touch.js','plugin/dateRange/moment.js','angular/roundProgress.js','angular/ui-bootstrap-tpls-0.14.0.js','js/prefixfree.min.js','plugin/highchart/highchart.js','plugin/highchart/highchart-more.js','angular/angular-count-to.min.js','angular/angular-nicescroll.js'],
              dest: 'CyberHealth/angular/output.js'
           }
       },
       imagemin: {                         // Task
          dynamic: {                         // Another target
               files: [{
                   expand: true,                  // Enable dynamic expansion
                          // Src matches are relative to this path
                   src: ['images/*.{png,jpg,gif}','images/**/*.{png,jpg,gif}'],   // Actual patterns to match
                   dest: 'CyberHealth/'                  // Destination path prefix
               }]
           }
   },
       htmlmin: {                                     // Task
           dist: {                                      // Target
               options: {                                 // Target options
                   removeComments: true,
                   collapseWhitespace: true
               },
               files: [{
                   expand:true,
                   src: ['views/**/*.html','!views/user/views/dashboard.html'],   // Actual patterns to match
                   dest: 'CyberHealth/'

               }]
           }
       },
       cssmin: {
           target: {
               files: [{
                   expand: true,
                   src: ['css/*.css','plugin/**/*.css','!css/style.css'],
                   dest: 'Cyberhealth/',
                   ext: '.css'
               }]
           }
       }

   });
	  grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.registerTask('default', ['newer:uglify', 'watch']);
};