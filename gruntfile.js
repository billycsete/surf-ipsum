module.exports = function( grunt ) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Clear out old dist folder
    clean: {
      lib : ['lib'],
      dist : ['dist']
    },

    // Install Bower Components
    bower: {
      install: {
        options: {
          cleanBowerDir : true
        }
      }
    },

    // Sass
    sass: {
      dist: {
        options: {
          loadPath: require('node-neat').includePaths
        },
        files: {
          'dist/css/steeze.css' : 'src/scss/steeze.scss'
        }
      }
    },

    // Combine head JS
    concat: {
      options: {
        separator: ';\n'
      },
      head: {
        src: ['lib/modernizr/modernizr.js'],
        dest: 'dist/js/head.js'
      }
    },

    // Combine
    browserify: {
      main: {
        files : {
          'dist/js/generator.js': ['src/js/generator/main.js'],
          'dist/js/uploader.js': ['src/js/uploader/main.js']
        }
      }
    },

    // Minify JS
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/head-min.js': ['dist/js/head.js'],
          'dist/js/uploader-min.js': ['dist/js/uploader.js'],
          'dist/js/generator-min.js': ['dist/js/generator.js']
        }
      }
    },

    // JS Hint
    jshint: {
      files: ['Gruntfile.js', 'src/js/sidebar.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true
        }
      }
    },

    // Copy images and fonts
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            cwd: 'src/',
            src: ['images/*', 'images/*/*', 'videos/*', 'fonts/*', '*.html'],
            dest: 'dist/'
          }
        ]
      }
    },

    // Watch JS and SCSS files
    watch: {
      js : {
        files: ['src/js/**/*.js'],
        tasks: ['jshint', 'concat', 'browserify', 'uglify']
      },
      css: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['src/*.html'],
        tasks: ['copy']
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task
  grunt.registerTask('install', ['clean:lib', 'bower:install']);
  grunt.registerTask('build', ['clean:dist', 'sass', 'jshint', 'concat', 'browserify', 'uglify', 'copy']);
  grunt.registerTask('default', 'build');

};
