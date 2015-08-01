module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');
  var chrome_manifest = grunt.file.readJSON('code/manifest.json');
  var firefox_package = grunt.file.readJSON('code/package.json');

  var fileMaps = { browserify: {}, uglify: {} };
  var file, files = grunt.file.expand({cwd:'code/js'}, ['*.js']);
  for (var i = 0; i < files.length; i++) {
    file = files[i];

    if (file.indexOf('firefox') !== -1) { continue; }
    fileMaps.browserify['build/unpacked-dev/js/' + file] = 'code/js/' + file;
    fileMaps.uglify['build/unpacked-prod/js/' + file] = 'build/unpacked-dev/js/' + file;
  }

  //
  // config
  //

  grunt.initConfig({

    clean: ['build/unpacked-dev', 'build/unpacked-prod', 'build/*.crx', 'build/*.xpi'],

    mkdir: {
      unpacked: { options: { create: ['build/unpacked-dev', 'build/unpacked-prod'] } },
      js: { options: { create: ['build/unpacked-dev/js'] } }
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

      // Chrome: copy everything except JS (which are browserified)
      main_chrome: { files: [ {
          expand: true,
          cwd: 'code/',
          src: ['**', '!js/**', '!**/*.md', '!package.json', '!images/logo-source.png',],
          dest: 'build/unpacked-dev/'
      } ] },
      prod_chrome: { files: [ {
        expand: true,
        cwd: 'build/unpacked-dev/',
        src: ['**', '!js/*.js'],
        dest: 'build/unpacked-prod/'
      } ] },

      // Firefox: copy everything except Chrome files, to a data/ sub-dir
      main_firefox: { files: [ {
          expand: true,
          cwd: 'code/',
          src: ['**', '!images/icon.png', '!images/logo-source.png', '!manifest.json', '!js/chrome**.js', '!**/*.md'],
          dest: 'build/unpacked-dev/data/'
        },
        // move icon.png to the root (jpm bug)
        {
          expand: true,
          cwd: 'code/images/',
          src: ['icon.png'],
          dest: 'build/unpacked-dev/'
        } ]
      },
      prod_firefox: { files: [ {
        expand: true,
        cwd: 'build/unpacked-dev/',
        src: ['**'],
        dest: 'build/unpacked-prod/'
      } ] }
    },

    browserify: {
      build: {
        files: fileMaps.browserify,
        options: { browserifyOptions: {
          debug: true,  // for source maps
          standalone: pkg['export-symbol']
        } }
      }
    },

    exec: {
      crx: {
        cmd: [
          './crxmake.sh build/unpacked-prod ./chrome-key.pem',
          'mv -v ./unpacked-prod.crx build/' + pkg.name + '-' + pkg.version + '.crx'
        ].join(' && ')
      }
    },

    uglify: {
      min: { files: fileMaps.uglify }
    },

    watch: {
      js: {
        files: ['package.json', 'lint-options.json', 'Gruntfile.js', 'code/**/*.js',
                'code/**/*.json', '!code/js/libs/*'],
        tasks: ['test']
      }
    },

    jpm: {
      options: {
        src: "./build/unpacked-prod/",
        xpi: "./build/"
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jpm-modern');

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
      grunt.log.ok('firefox manifest.json generated');
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

  grunt.registerTask('chrome', ['clean', 'test', 'mkdir:unpacked', 'copy:main_chrome', 'manifest:chrome',
    'mkdir:js', 'browserify', 'copy:prod_chrome', 'uglify', 'exec']);


  //
  // Firefox build
  //
  grunt.registerTask('firefox', ['clean', 'test', 'mkdir:unpacked', 'copy:main_firefox', 'manifest:firefox',
     'copy:prod_firefox', 'jpm:xpi']);

};
