module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    watch: {
      // If any .less file changes in directory "less/" run the "less"-task.
      files: ["less/*.less", "dist/js/admin.space.js"],
      tasks: ["less", "uglify"]
    },
    // "less"-task configuration
    // This task will compile all less files upon saving to create both AdminLTE.css and AdminLTE.min.css
    less: {
      // Development not compressed
      development: {
        options: {
          // Whether to compress or not
          compress: false
        },
        files: {
          // compilation.css  :  source.less
          "dist/css/admin-space.css": "less/admin-space.less"
        }
      },
      // Production compresses version
      production: {
        options: {
          // Whether to compress or not
          compress: true
        },
        files: {
          // compilation.css  :  source.less
          "dist/css/admin-space.min.css": "less/admin-space.less"
        }
      }
    },
    // Uglify task info. Compress the js files.
    uglify: {
      options: {
        mangle: true,
        preserveComments: 'some'
      },
      my_target: {
        files: {
          'dist/js/admin.space.min.js': ['js/admin.space.js'],
          'dist/js/jquery.treemenu.min.js': ['js/jquery.treemenu.js'],
        }
      }
    },
    // Build the documentation files
    includes: {
      src: {
        src: ['*.html'], // Source files
        dest: 'reference/', // Destination directory
        flatten: true,
        cwd: 'reference/src',
        options: {
          silent: true,
          includePath: 'reference/src/include'
        }
      }
    },

    // Optimize images
    image: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif,svg,jpeg}'],
          dest: 'dist/img/'
        }]
      }
    },

    // Validate JS code
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      core: {
        src: 'dist/js/admin-space.js'
      },
      pages: {
        src: 'dist/js/pages/*.js'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      dist: [
        'dist/css/admin-space.css',
      ]
    },

    // Delete images in src directory
    // After compressing the images in the src/img dir, there is no need
    // for them
    clean: {
      src: ["img/*"]
    }
  });

  // Load all grunt tasks

  // LESS Compiler
  grunt.loadNpmTasks('grunt-contrib-less');
  // Watch File Changes
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Compress JS Files
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Include Files Within HTML
  grunt.loadNpmTasks('grunt-includes');
  // Optimize images
  grunt.loadNpmTasks('grunt-image');
  // Validate JS code
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Delete not needed files
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Lint CSS
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // The default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
};
