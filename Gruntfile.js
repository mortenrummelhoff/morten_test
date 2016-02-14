module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: ['Gruntfile.js', 'app/*.js', 'app/components/**/*.js', '*.html', 'app/components/**/*.html'],
            tasks: ['clean', 'jshint', 'html2js:dist', 'concat']
        },
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './libs',
                    cleanTargetDir: true
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app/*.js', 'app/**/*.js']
        },
        karma: {
            options: {
                configFile: 'config/karma.conf.js'
            },
            unit: {
                singleRun: true
            },

            continuous: {
                singleRun: false,
                autoWatch: true
            }
        },
        html2js: {
            dist: {
                src: ['app/componentss/**/*.html'],
                dest: 'tmp/templates.js'
            }
        },
        clean: ["dist"],
        concat: {
            dist: {
                src: ['app/*.js', 'app/components/**/*.js', 'tmp/*.js'],
                dest: 'dist/app.js'
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8080,
                    open: true,
                    appName: 'chrome'
                }
            },
            open: {
                target: 'http://localhost:8080',
                appName: ''

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');

    // Default task(s).
    grunt.registerTask('default', []);
    grunt.registerTask('dev', ['bower', 'clean', 'concat', 'connect:server', 'watch']);

};
