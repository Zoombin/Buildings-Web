'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var merge = require('merge-stream');
var path = require('path');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var configFiles = require('./gulpConfig.json');

gulp.task('setup', function(){



    var js = gulp.src(configFiles.jsFiles.map(function(src){
            return path.join(configFiles.root, src);
        }))
        .pipe($.flatten())
        .pipe(gulp.dest('html/js'));

    var css = gulp.src(configFiles.cssFiles.map(function(src){
            return path.join(configFiles.root, src);
        }))
        .pipe($.flatten())
        .pipe(gulp.dest('html/css'));

    var fonts = gulp.src(configFiles.fontsFiles.map(function(src){
            return path.join(configFiles.root, src)
        }))
        .pipe($.flatten())
        .pipe(gulp.dest('html/fonts'));

    return merge(js, css, fonts).pipe($.size({title: 'set files'}));
});

var styleTask = function (stylesPath, srcs) {
  return gulp.src(srcs.map(function(src) {
      return path.join(stylesPath, src);
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.if('*.css', $.cssmin()))
    .pipe(gulp.dest(configFiles.destDir))
    .pipe($.size({title: stylesPath}));
};

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
  return styleTask('html', ['**/*.css']);
});

gulp.task('scripts', function(){
  return gulp.src(['html/**/*.js'])
    .pipe($.uglify())
    .pipe(gulp.dest(configFiles.destDir))
    .pipe($.size({title: 'scripts'}));
});

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src([
      'html/*.js',
      'html/**/*.js',
      'html/*.html',
      'html/**/*.html'
    ])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint.extract()) // Extract JS from .html files
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src(['html/img/*'])
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))

    .pipe(gulp.dest(path.join(configFiles.destDir, '/img/')))
    .pipe($.size({title: 'images'}));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
  var app = gulp.src([
    'html/*'
  ], {
    dot: true
  }).pipe(gulp.dest(configFiles.destDir));




  return merge(app).pipe($.size({title: 'copy'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {

  return gulp.src(['bower_components/bootstrap/fonts/**'])
    .pipe(gulp.dest(path.join(configFiles.destDir , 'fonts')))
    .pipe($.size({title: 'fonts'}));

});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: ['.tmp', 'html', configFiles.destDir]});

  return gulp.src(['html/**/*.html', '!html/{elements,test}/**/*.html'])

    .pipe(assets)
    // Concatenate And Minify JavaScript
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Concatenate And Minify Styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.cssmin()))
    .pipe(assets.restore())
    .pipe($.useref())
    // Minify Any HTML
    .pipe($.if('*.html', $.minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    })))
    // Output Files
    .pipe(gulp.dest(configFiles.destDir))
    .pipe($.size({title: 'html'}));
});


// Clean Output Directory
gulp.task('clean', function(){

    del( 'dist/', function(error, paths){
        console.log('Deleted dist/');
    });
});

// Watch Files For Changes & Reload
gulp.task('devel', ['styles'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'html',

  });

  gulp.watch(['html/**/*.html'], reload);
  gulp.watch(['html/**/*.css'], ['styles', reload]);
  gulp.watch(['html/**/*.js'], reload);
  gulp.watch(['html/*/img/**/*', 'html/*/images/**/*'], reload);
});

// Build and serve the output from the production build
gulp.task('product', ['default'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: configFiles.destDir
  });
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence(
    ['copy', 'styles'],
    [ 'images', 'html'],
    'fonts',
    'scripts',
    cb);
});
// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}
