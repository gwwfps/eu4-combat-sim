var gulp = require('gulp');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');

var path = {
  jsmain: './src/index.js',
  jade: './src/jade/**/*.jade',
  assets: './src/static/**/*',
  dist: './dist/'
};

gulp.task('jade', function() {
  gulp.src(path.jade)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(path.dist))
    .pipe(connect.reload());
});

gulp.task('copy', function() {
  gulp.src(path.assets)
    .pipe(gulp.dest(path.dist));
});

gulp.task('connect', function () {
  connect.server({
    root: path.dist,
    port: 8001,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch([path.jade], ['jade']);
  gulp.watch([path.assets], ['copy']);
});

gulp.task('default', ['jade', 'copy', 'connect', 'watch']);
