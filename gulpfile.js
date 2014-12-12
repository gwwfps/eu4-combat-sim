var gulp = require('gulp');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var es6ify = require('es6ify');
var source = require('vinyl-source-stream');

var path = {
  js: './src/js/**/*.js',
  jsmain: './src/js/index.js',
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

gulp.task('browserify', function() {
  browserify({ debug: true })
    .add(es6ify.runtime)
    .require(require.resolve(path.jsmain), { entry: true })
    .transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(path.dist))
    .pipe(connect.reload());
});

gulp.task('copy', function() {
  gulp.src(path.assets)
    .pipe(gulp.dest(path.dist))
    .pipe(connect.reload());;
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
  gulp.watch([path.js], ['browserify']);
});

gulp.task('default', ['jade', 'browserify', 'copy', 'connect', 'watch']);
