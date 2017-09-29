module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');
  var manifest = grunt.file.readJSON('code/manifest.json');

  // build browser-specific lists of in/out paths for js files
  var fileMaps = {
    browserify: {
      webext: {}
    }
  };

  var files = grunt.file.expand({cwd:'code/js'}, ['*.js']);
  var file;

  for (var i = 0; i < files.length; i++) {
    file = files[i];
    fileMaps.browserify.webext['build/unpacked-dev/js/' + file] = 'code/js/' + file;
  }

  //
  // config
  //

  grunt.initConfig({

    clean: ['build/unpacked-dev', 'build/unpacked-prod', 'build/*.crx', 'build/*.xpi'],

    mkdir: {
      unpacked: { options: { create: ['build/unpacked-dev', 'build/unpacked-prod'] } },
      js: { options: { create: ['build/unpacked-dev/js'] } },
      data_js: { options: { create: ['build/unpacked-dev/data/js'] } }
    },

    jshint: {
      options: grunt.file.readJSON('lint-options.json'), // see http://www.jshint.com/docs/options/
      all: { src: ['package.json', 'lint-options.json', 'Gruntfile.js', 'code/**/*.js',
                   'code/**/*.json', '!code/js/libs/*'] }
    },

    mochaTest: {
      options: { colors: true, reporter: 'spec' },
      files: ['code/**/*.spec.js']
    },

    copy: {
      dev: { files: [ {
          expand: true,
          cwd: 'code/',
          src: ['**', '!js/**', '!**/*.md', '!images/logo-source.png',],
          dest: 'build/unpacked-dev/'
      } ] },

      prod: { files: [ {
        expand: true,
        cwd: 'build/unpacked-dev/',
        src: ['**',],
        dest: 'build/unpacked-prod/'
      } ] },
    },

    browserify: {
      webext: {
        files: fileMaps.browserify.webext,
        options: {
          browserifyOptions: {
            debug: true, // for source maps
            standalone: pkg['export-symbol']
          }
        }
      }
    },

    watch: {
      js: {
        files: ['package.json', 'lint-options.json', 'Gruntfile.js', 'code/**/*.js',
                'code/**/*.json', '!code/js/libs/*'],
        tasks: ['test']
      }
    },

    webext_builder: {
        "chrome": {
            "privateKey": "chrome-key.pem",
            "targets": [
                "chrome-crx"
            ],
            "files": {
                "build": ["code"]
            }
        },
        "firefox": {
            "jwtIssuer": process.env.jwtIssuer,
            "jwtSecret": process.env.jwtSecret,
            "targets": [
                "firefox-xpi"
            ],
            "files": {
                "build": ["build/unpacked-dev/"]
            }
        }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webext-builder');

  //
  // custom tasks
  //

  grunt.registerTask(
    'manifest', 'Extend manifest.json with extra fields from the package.json',
    function() {
      var fields = ['title', 'author', 'name', 'license', 'version', 'description'];
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        manifest[field] = pkg[field];
      }

      manifest.name = pkg.title;

      grunt.file.write('build/unpacked-dev/manifest.json', JSON.stringify(manifest, null, 4) + '\n');
      grunt.log.ok('manifest.json generated');
    }
  );

  //
  // testing-related tasks
  //

  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('test-cont', ['test', 'watch']);

  //
  // Chrome build
  //

  grunt.registerTask('chrome', ['clean', 'test', 'mkdir:unpacked', 'copy:dev', 'manifest',
    'mkdir:js', 'browserify:webext', 'copy:prod', 'webext_builder:chrome']);


  //
  // Firefox build
  //
  grunt.registerTask('firefox', ['clean', 'test', 'mkdir:unpacked', 'copy:dev', 'manifest',
     'mkdir:data_js', 'browserify:webext', 'copy:prod', 'webext_builder:firefox']);

};
