'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var eslint = require('gulp-eslint');
var exorcist = require('exorcist');
var sync = browserSync.create();
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var ifElse = require('gulp-if-else');
var uglify = require('gulp-uglify');

watchify.args.debug = true;
var bundler = browserify('src/js/app.js', watchify.args);

// Babel transform
bundler.transform(babelify.configure({
  sourceMapRelative: 'src/js'
}));

// On updates recompile
bundler.on('update', bundle);
function bundle() {
  return bundler.bundle()
    .on('error', function(error){
      console.error( '\nError: ', error.message, '\n');
      this.emit('end');
    })
    .pipe(exorcist('public/js/app.js.map'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
    .pipe(gulp.dest('public/js'));
}

gulp.task('sass', function () {
  return gulp.src('./src/sass/app.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.sass', ['sass']);
});

gulp.task('js', function() {
  return bundle();
});
gulp.task('lint', function() {
  return gulp.src(['src/**/*.js', 'gulpfile.js'])
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('default', ['serve', 'watch']);
gulp.task('serve', ['sass', 'js'], function() {
  sync.init({ server: 'public' });
});

gulp.task('watch', ['serve'], function() {
  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('public/css/app.css', sync.reload)
  gulp.watch('public/index.html', sync.reload)
})
