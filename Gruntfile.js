
var _ = require('lodash');


module.exports = function (grunt) {

    grunt.initConfig({
        config: {
            url: 'http://fit-grid.localhost/',
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
        ts: {
            default: {
                tsconfig: true,
                src: ['ts/**/*.ts'],
                outDir: ['js'],
                options: {
                    fast: 'never'
                }
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
            livereload: {
                files: [
                    'css/*.css',
                    '*.html',
                    'templates/**/*.html',
                    'js/*.js',
                    'js/**/*.js'
                ],
                options: {
                    livereload: '<%= config.livereload.port%>'
                }
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
                ]
            },
            jade: {
                files: [
                    'jade/**/*.jade',
                    'jade/*.jade'
                ],
                option: {
                    livereload: false
                },
                tasks: ['jade']
            },
            sass: {
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
                        'www/*',
                        'js/*',
                        'ts/**/*.js',
                        'ts/**/*.js.map'
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
                    cwd: 'jade',
                    src: "**/*.jade",
                    dest: "templates/",
                    expand: true,
                    ext: ".html"
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('generate-sources', [
        'ts'
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
        'cssmin',
        //'usemin',
        'htmlmin:dist'
        //'manifest',
        //'file_append'
    ]);

    grunt.registerTask('default', [
        'generate-sources',
        'sass',
        'jade',
        'open',
        // 'build',
        'watch'
    ]);
};