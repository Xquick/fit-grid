/**
 * Created by amrazek on 20/03/16.
 */

var _ = require('lodash');


module.exports = function (grunt) {

    grunt.initConfig({
        config: {
            url: 'http://fitness-grid.localhost/',
            livereload: {
                port: 35788
            }
        },
        sass: {
            dist: {
                files: [
                    {
                        'css/style.css': ['scss/styles.scss', 'scss/components/styles.scss']
                    }
                ]
            }
        },
        open: {
            delayed: {
                path: '<%= config.url %>',
                app: 'Google Chrome'
            }
        },
        typescript: {
            options: {
                target: 'es5',
                sourceMap: false,
                keepDirectoryHierarchy: false,
                declaration: true,
                experimentalDecorators: true
            },
            base: {
                src: [
                    'lib/typings/**/*.ts',
                    'ts/**/*.ts'
                ],
                dest: 'js'
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            }
            ,
            all: {
                src: [
                    'ts/*.ts'
                ]
            }
        },
        watch: {
            options: {
                livereload: '<%= config.livereload.port%>'
            },
            ts: {
                files: [
                    'ts/*.ts',
                    'ts/**/*.ts',
                    'ts/*.d.ts'
                ],
                tasks: ['tslint:all', 'generate-sources']
            },
            html: {
                files: [
                    'index.html'
                ],
                option: {
                    livereload: '<%= config.livereload.port%>'
                }
            },
            jade: {
                files: [
                    'jade/**/*.jade',
                    'jade/*.jade'
                ],
                option: {
                    livereload: '<%= config.livereload.port%>'
                },
                tasks: ['jade']
            },
            css: {
                files: ['scss/*.scss', 'scss/**/*.scss'],
                tasks: ['sass']
            }
        },

        svgstore: {
            options: {
                includeTitleElement: false,
                includedemo: true,
                svg: {
                    viewBox: '10 10 28 28'
                },
                convertNameToId: function (name) {

                    var glyphID = name;
                    var regexp = /\d-(.*?)$/i;
                    var match = name.match(regexp);

                    if (match !== null) {
                        glyphID = match[1];
                    }

                    return glyphID

                }
            },
            default: {
                files: {
                    'images/sprites/glyphicons.svg': ['images/glyphicons/*.svg']
                }
            }
        },
        replace: {
            symbol_open: {
                src: ['images/sprites/*.svg'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: '<symbol',
                    to: "<g"
                }]
            },
            symbol_close: {
                src: ['images/sprites/*.svg'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: 'symbol>',
                    to: "g>"
                }]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'www/*'
                    ]
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'www',
                    src: [
                        '*.html',
                        'templates/*.html',
                        'templates/**/*.html'
                    ],
                    dest: 'www'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    dest: 'www',
                    src: [
                        'imgages/**/*.{png,jpg,jpeg,gif,webp,svg}',
                        '*.html',
                        'applications/**/*',
                        '!applications/**/ts/**',
                        'templates/**/*.html',
                        'fonts/**',
                        '!fonts/**/*.html',
                        'images/**',
                        '!images/**/*.html',
                        '!images/glyphicons/**',
                        'media/**',
                        'js/**/*',
                        '!**/*.d.ts',
                        'css/*',
                        'res/**',
                        '!**/.gitignore'
                    ]
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'www/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'www/css',
                    ext: '.min.css'
                }]
            }
        },
        jade: {
            options: {
                basePath: 'jade/',
                pretty: true
            },
            compile: {
                files: [{
                    cwd:'jade',
                    src: "**/*.jade",
                    dest:"templates/",
                    expand: true,
                    ext: ".html"
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-svgstore');

    grunt.registerTask('generate-sources', [
        'typescript'
    ]);

    grunt.registerTask('sprites', ['svgstore', 'replace']);

    grunt.registerTask('build', [
        'clean:dist',
        'sass',
        'jade',
        //'uglify',
        //'concat',
        //'ngAnnotate',
        'copy:dist',
        //'processhtml',
        'cssmin',
        //'usemin',
        'htmlmin:dist'
        //'manifest',
        //'file_append'
    ]);

    grunt.registerTask('default', [
        'generate-sources',
        'jade',
        'open',
        //'build',
        'watch'
    ]);
};