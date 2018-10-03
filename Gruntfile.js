// Loading Node Sass plugin
var sass = require('node-sass');
var jshintStylish = require('jshint-stylish');

// The "wrapper" function
module.exports = function (grunt) { 

    // Project and task configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Define the pathes
         */
        paths: {
            styles: {
                src: 'src/scss/styles.scss',
                dest: 'dist/assets/main.css',
                allScss: 'src/scss/**/*.scss',                
                allDestCss: 'dist/assets/*.css'                
            },
            scripts: {
                src: 'src/scripts/index.js',
                anySrc: 'src/scripts/**/*.js',                       
                dest: 'dist/assets/bundle.js',
                minify: 'dist/assets/bundle.min.js',              
                allDestJs: 'dist/assets/*.js'
            },
            map: {
                all: 'dist/assets/*.map'
            },
            test: {
                allJs: 'test/**/*.js',
                allCss: 'test/**/*.css',
                allHtml: 'test/**/*.html'
            },
            html: {
                root: 'dist/index.html'
            },
            lib: {
                jquery: 'node_modules/jquery/dist/jquery.js'
            }
        },

        /**
         * Grunt Contrib Clean
         * Clean or delete the distribute files
         * https://www.npmjs.com/package/grunt-contrib-clean
         */
        clean: [
            '<%= paths.styles.allDestCss %>',
            '<%= paths.scripts.allDestJs %>',
            '<%= paths.map.all %>'            
        ],        

        /**
         * Grunt Sass
         * Compile Sass to CSS using node-sass
         * https://www.npmjs.com/package/grunt-sass
         */
        sass: {
            options: {
                implementation: sass,
                outputStyle: 'compressed',
                sourceMap: true
            },
            dist: {
                files: {
                    '<%= paths.styles.dest %>': '<%= paths.styles.src %>'
                }
            }
        },

        /**
         * Grunt Browserify
         * Grunt task for node-browserify
         * https://www.npmjs.com/package/grunt-browserify
         */
        browserify: {
            dist: {                
                src: '<%= paths.scripts.src %>',
                dest: '<%= paths.scripts.dest %>'
            }
        },

        /**
         * Grunt Contrib Uglify
         * Minify JavaScript files
         * https://www.npmjs.com/package/grunt-contrib-uglify
         */
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    compress: true,
                    mangle: true,
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    '<%= paths.scripts.minify %>' : '<%= paths.scripts.dest %>'
                }
            }
        },

        /**
         * Grunt Contrib Qunit
         * Run QUnit unit tests in a headless Chrome instance
         * https://www.npmjs.com/package/grunt-contrib-qunit
         */
        qunit: {
            files: [
                '<%= paths.test.allHtml %>'
            ]
        },

        /**
         * Grunt Contrib Jshint
         * Validate files with JsHint
         * https://www.npmjs.com/package/grunt-contrib-jshint
         */
        jshint: {
            files: [
                'gruntfile.js',
                '<%= paths.scripts.anySrc %>'
            ],
            options: { 
                jshintrc: true,
                reporter: jshintStylish
            }
        },

        /**
         * Grunt Contrib Connect
         * Start a connect web server
         * https://www.npmjs.com/package/grunt-contrib-connect
         */
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9001,
                    base: 'dist',
                    livereload: true
                }
            }
        },

        /**
         * Grunt Contrib Watch
         * Monitor files and excute tasks
         * https://www.npmjs.com/package/grunt-contrib-watch
         */
        watch: {
            sass: {
                files: [
                    '<%= paths.styles.allScss %>'
                ],
                tasks: [
                    'sass'
                ]
            },
            scripts: {
                files: [
                    '<%= paths.scripts.anySrc %>',
                    '<%= paths.scripts.dest %>'
                ],
                tasks: [
                    'browserify',
                    'uglify'
                ],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'dist/**/*'
                ]
            },
            jshint: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            }
        }
    });

    // Loading Grunt plugins and tasks
    require('load-grunt-tasks')(grunt);

    // Build tasks
    grunt.registerTask('build', [
        'clean',
        'sass',
        'browserify',
        'uglify',
    ]);

    // Default tasks
    grunt.registerTask('default', [
        'build',
        'connect',
        'watch'
    ]);
};
