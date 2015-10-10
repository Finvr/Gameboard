// Karma configuration
// Generated on Thu Sep 24 2015 15:12:45 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      //library files
      'client/lib/jquery/dist/jquery.min.js',
      'client/lib/angular/angular.js',
      'client/lib/angular-route/angular-route.min.js',
      'client/lib/angular-ui-router/release/angular-ui-router.min.js',
      'client/lib/Materialize/dist/js/materialize.min.js',
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyB5eGAZmqMYgOJRvbrFNAujmSr8nFCEBnA"',
      'client/lib/angular-materialize/src/angular-materialize.js',
      'client/lib/moment/min/moment.min.js',
      'client/lib/angular-ui-calendar/src/calendar.js',
      'client/lib/fullcalendar/dist/fullcalendar.min.js',
      'client/lib/fullcalendar/dist/gcal.js',
      'client/lib/allmighty-autocomplete/script/autocomplete.js',
      'client/lib/checklist-model/checklist-model.js',
      'client/lib/angular-mocks/angular-mocks.js',

      // our app code
      'client/app/services/serviceAuth.js',
      'client/app/**/*.js',
      'client/app/app.js',

      //our spec files
      'test/clientTest/*.js',
      'test/clientTest/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','nyan','unicorn'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
