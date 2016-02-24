module.exports=function(grunt){
   grunt.initConfig({
        watch: {
        	options: { nospawn: true },
            scripts: {
                files: ['app/*.js','app/**/*.js'],
                tasks: ['newer:uglify']
            }
        },
        uglify  : {
            build: {
                files: [
                    {
                        expand: true,
                        src: ['app/*.js','app/**/*.js'],
                        dest: 'CyberHealth/',
                        ext: '.js'
                    }
                ]
            }
        }
    });
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-newer');
    grunt.registerTask('default', ['newer:uglify', 'watch']);
};