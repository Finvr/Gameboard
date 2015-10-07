var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var Server = require('karma').Server;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var input = 'client/styles/*.scss';
var output = 'client/styles/';
var sassOptions = { outputStyle: 'expanded' };
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
var sassdocOptions = { dest: 'dist/sassdoc' };


// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------

gulp.task('sass-single', function () {
 return gulp
   .src(input)
   .pipe(sourcemaps.init())
   .pipe(sass(sassOptions).on('error', sass.logError))
   .pipe(sourcemaps.write())
   .pipe(autoprefixer(autoprefixerOptions))
   .pipe(gulp.dest(output));
});


// -----------------------------------------------------------------------------
// Sass documentation generation
// -----------------------------------------------------------------------------

gulp.task('sassdoc', function () {
 return gulp
   .src(input)
   .pipe(sassdoc(sassdocOptions))
   .resume();
});

//-----------------------------------------------------------------------------
//  Karma Start
//-----------------------------------------------------------------------------

gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

// -----------------------------------------------------------------------------
// Development Server Start
// -----------------------------------------------------------------------------
gulp.task('server', function () {
  nodemon({
    script: 'server/server.js'
  })
});

//------------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('sass', function() {
 return gulp
   // Watch the input folder for change,
   // and run `sass` task when something happens
   .watch(input, ['sass-single'])
   // When there is a change,
   // log a message in the console
   .on('change', function(event) {
     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
   });
});


// -----------------------------------------------------------------------------
// Production build
// -----------------------------------------------------------------------------

gulp.task('prod', ['sassdoc'], function () {
 return gulp
   .src(input)
   .pipe(sass({ outputStyle: 'compressed' }))
   .pipe(autoprefixer(autoprefixerOptions))
   .pipe(gulp.dest(output));
});


// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', ['sass-single', 'karma', 'server', "sass"]);