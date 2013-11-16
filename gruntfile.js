module.exports = function(grunt) {

    // Load all of our NPM tasks...
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-responsive-images');

    stylOptions = {
        'compress': false,
        'linenos': false, // set to 'true' with quotes to turn line numbers on
        'firebug': false,
        'include css': true
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            name: 'Project Name',
            banner: '/*! <%= meta.name %> - v<%= pkg.version %> - <%= template.today("m/d/yyyy") %> */',
            app: 'app'
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= meta.app %>/stylesheets/screen.css': '<%= meta.app %>/sass/screen.scss',
                    '<%= meta.app %>/stylesheets/ie.css': '<%= meta.app %>/sass/ie.scss'
                }
            }
        },

        csslint: {
            options: {
                "adjoining-classes": false,
                "box-model": true,
                "box-sizing": "warning",
                "compatible-vendor-prefixes": "warning",
                "display-property-grouping": true,
                "duplicate-background-images": "warning",
                "duplicate-properties": true,
                "empty-rules": true,
                "errors": true,
                "fallback-colors": "warning",
                "floats": "warning",
                "font-faces": "warning",
                "font-sizes": "warning",
                "gradients": "warning",
                "ids": false,
                "import": "warning",
                "important": "warning",
                "known-properties": true,
                "outline-none": "warning",
                "overqualified-elements": "warning",
                "qualified-headings": "warning",
                "regex-selectors": "warning",
                "rules-count": "warning",
                "shorthand": "warning",
                "star-property-hack": "warning",
                "text-indent": "warning",
                "underscore-property-hack": "warning",
                "unique-headings": "warning",
                "universal-selector": "warning",
                "vendor-prefix": true,
                "zero-units": "warning"
            },
            src: ['stylesheets/screen.css']
        },

        jshint: {
            options: {
                "evil": true,
                "regexdash": true,
                "browser": true,
                "wsh": true,
                "trailing": true,
                "sub": true,
                "multistr": true,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "undef": false,
                "boss": true,
                "eqnull": true,
                "node": true,
                "strict": false,
                "globals": {
                    "jQuery": true
                }
            },
            files: [
                'gruntfile.js',
                '<%= meta.app %>/js/app/**'
            ]
        },

        concat: {
            js: {
                src: ['<%= meta.app %>/js/vendor/**/*.js'],
                dest: '<%= meta.app %>/js/vendor/vendor.concat.js'
            }
        },

        uglify: {
            options: {
                preserveComments: false
            },
            my_target: {
                src: ['<%= meta.app %>/js/vendor/vendor.concat.js'],
                dest: '<%= meta.app %>/js/vendor/vendor.min.js'
            }
        },

        compass: {
            dist: {
                options: {
                    config: 'config.rb',
                    require: 'susy'
                }
            }
        },

        watch: {
            sassdev: {
                files: ['<%= meta.app %>/sass/*'],
                tasks: ['compass', 'jshint'],
                options: {
                    livereload: true,
                    interrupt: true
                }
            }
        },

        // Empty out our common/src/temp directory to be prepared for the next time.
        clean: {
            kill: ['<%= meta.app %>/common/js/libs/libs.concat.js']
        },
        responsive_images: {
            myTask: {
                options: {},

                files: [{
                    expand: true,
                    src: ['<%= meta.app %>/images/*.{jpg,gif,png}'],
                    dest: 'assets'
                }]
            }
        }


    });

    grunt.registerTask('images', ['responsive_images']);

    grunt.registerTask('sassdev', function () {
        console.log('This task will watch sass changes, run csslint and jslint');
        grunt.task.run(['watch:sassdev']);
    });
};
