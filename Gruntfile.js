module.exports = function(grunt) {

    grunt.initConfig({
        assets_src_dir: 'dash/static/src',
        assets_dist_dir: 'dash/static',

        pkg: grunt.file.readJSON('package.json'),

        copy: {
            dist: {
                files: [{
                    // for bootstrap fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: '<%= assets_dist_dir %>/'
                }, {
                    // for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/components-font-awesome',
                    src: ['fonts/*.*'],
                    dest: '<%= assets_dist_dir %>/'
                }]
            }
        },

        concat_css: {
            options: {},
            dist: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'bower_components/components-font-awesome/css/font-awesome.css',
                    'bower_components/gridster/dist/jquery.gridster.css',
                    '<%= assets_src_dir %>/css/*.css'
                ],
                dest: '<%= assets_dist_dir %>/css/<%= pkg.name %>.css'
            },
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-css/angular-css.js',
                    'bower_components/gridster/dist/jquery.gridster.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/jquery.easing/js/jquery.easing.js',
                    'bower_components/moment/moment.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/clndr/src/clndr.js',
                    'bower_components/jquery.scrollTo/jquery.scrollTo.js',
                    'bower_components/slimScroll/jquery.slimScroll.js',
                    'bower_components/dcjqaccordion/js/jquery.dcjqaccordion.2.7.js',
                    'bower_components/jquery.cookie/jquery.cookie.js',
                    'bower_components/jquery.nicescroll/jquery.nicescroll.js',
                    'bower_components/jscrollpane/script/jquery.jscrollpane.js',
                    '<%= assets_src_dir %>/**/*.js',
                    'bower_components/customSelect/jquery.customSelect.js'
                ],
                dest: '<%= assets_dist_dir %>/js/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= assets_dist_dir %>/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        qunit: {
            files: ['test/**/*.html']
        },

        jshint: {
            files: ['Gruntfile.js', 'static/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        watch: {
            files: [
                '<%= jshint.files %>',
                '<%= assets_src_dir %>/**/*.js',
                '<%= assets_src_dir %>/**/*.css',
                'bower_components/**/*.js',
                'bower_components/**/*.css'
                ],
            tasks: ['jshint', 'copy', 'concat', 'concat_css']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concat-css');

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['jshint', 'qunit', 'copy', 'concat', 'concat_css', 'uglify']);

};