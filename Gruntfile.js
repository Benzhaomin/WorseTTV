module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');
  var chrome_manifest = grunt.file.readJSON('code/manifest.json');
  var firefox_package = grunt.file.readJSON('code/manifest.json');

  // build browser-specific lists of in/out paths for js files
  var fileMaps = {
    browserify: {
      chrome: {},
      firefox: {}
    }
  };

  var files = grunt.file.expand({cwd:'code/js'}, ['*.js']);
  var file;

  for (var i = 0; i < files.length; i++) {
    file = files[i];

    // chrome-* files
    if (file.indexOf('chrome-') > -1) {
      fileMaps.browserify.chrome['build/unpacked-dev/js/' + file] = 'code/js/' + file;
    }
    // firefox-* files
    else if (file.indexOf('firefox-') > -1) {
      fileMaps.browserify.firefox['build/unpacked-dev/data/js/' + file] = 'code/js/' + file;
    }
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

      chrome_dev: { files: [ {
          expand: true,
          cwd: 'code/',
          src: ['**', '!js/**', '!**/*.md', '!images/logo-source.png',],
          dest: 'build/unpacked-dev/'
      } ] },

      // exclude chrome's manifest.json and move files to a data/ sub-dir
      firefox_dev: { files: [ {
          expand: true,
          cwd: 'code/',
          src: ['**', '!js/**', '!**/*.md', '!images/logo-source.png', '!images/icon.png'],
          dest: 'build/unpacked-dev/data/'
        }, {
          expand: true,
          cwd: 'code/images/',
          src: ['icon.png'],
          dest: 'build/unpacked-dev/'
      } ] },

      // copy everything except js files (later uglified)
      prod: { files: [ {
        expand: true,
        cwd: 'build/unpacked-dev/',
        src: ['**',],
        dest: 'build/unpacked-prod/'
      } ] },
    },

    browserify: {

      chrome: {
        files: fileMaps.browserify.chrome,
        options: {
          browserifyOptions: {
            debug: true, // for source maps
            standalone: pkg['export-symbol']
          },
        }
      },

      firefox: {
        files: fileMaps.browserify.firefox,
        options: {
          browserifyOptions: {
            debug: true, // for source maps
            standalone: pkg['export-symbol']
          },
          // exclude Firefox's SDK, it'll be there at runtime
          exclude: [
            'sdk/self',
            'sdk/tabs',
            'sdk/page-mod',
            'sdk/util/array',
            'sdk/context-menu'
          ],
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
                "build": ["code"]
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
    'manifest:chrome', 'Extend Chrome\'s manifest.json with extra fields from the root package.json',
    function() {
      var fields = ['author', 'name', 'version', 'description'];
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        chrome_manifest[field] = pkg[field];
      }

      chrome_manifest.name = pkg.title;

      grunt.file.write('build/unpacked-dev/manifest.json', JSON.stringify(chrome_manifest, null, 4) + '\n');
      grunt.log.ok('chrome manifest.json generated');
    }
  );

  grunt.registerTask(
    'manifest:firefox', 'Extend Firefox\'s package.json with extra fields from the root package.json',
    function() {
      var fields = ['title', 'author', 'name', 'license', 'version', 'description'];
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        firefox_package[field] = pkg[field];
      }

      grunt.file.write('build/unpacked-dev/package.json', JSON.stringify(firefox_package, null, 4) + '\n');
      grunt.log.ok('firefox package.json generated');
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

  grunt.registerTask('chrome', ['clean', 'test', 'mkdir:unpacked', 'copy:chrome_dev', 'manifest:chrome',
    'mkdir:js', 'browserify:chrome', 'copy:prod', 'webext_builder:chrome']);


  //
  // Firefox build
  //
  grunt.registerTask('firefox', ['clean', 'test', 'mkdir:unpacked', 'copy:firefox_dev', 'manifest:firefox',
     'mkdir:data_js', 'browserify:firefox', 'copy:prod', 'webext_builder:firefox']);

};
