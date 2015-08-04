module.exports = function(grunt) {

    grunt.initConfig({
        assets_src_dir: 'dash/static/src',
        assets_dist_dir: 'dash/static',

        pkg: grunt.file.readJSON('package.json'),

        bower_concat: {
            all: {
                dest: '<%= assets_dist_dir %>/js/bower.js',
                cssDest: '<%= assets_dist_dir %>/css/bower.css',
                dependencies: {
                    'customSelect': 'jquery-ui'
                },
                mainFiles: {
                    'gridster': ['dist/jquery.gridster.js', 'dist/jquery.gridster.css']
                },
                bowerOptions: {
                    relative: false
                }
            }
        },

        concat_css: {
            options: {},
            dist: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    '<%= assets_dist_dir %>/css/bower.css',
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
                    '<%= assets_dist_dir %>/js/bower.js',
                    '<%= assets_src_dir %>/**/*.js',
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
    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['jshint', 'qunit', 'bower_concat', 'concat', 'concat_css', 'uglify']);

};