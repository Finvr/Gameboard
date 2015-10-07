var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
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

gulp.task('sass', function () {
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

// -----------------------------------------------------------------------------
// Mocha Tests
// -----------------------------------------------------------------------------

gulp.task('mocha', function() {
    return gulp.src(['test/serverTest/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
});

// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch-sass', function() {
 return gulp
   .watch(input, ['sass'])
});

gulp.task('watch-mocha', function() {
   gulp.watch(['server/**', 'test/serverTest/**.js'], ['mocha']);
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

gulp.task('default', ['sass', 'karma', 'mocha', 'watch-sass', 'watch-mocha', 'server']);