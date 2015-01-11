var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var es6ify = require('es6ify');
var source = require('vinyl-source-stream');

var path = {
  js: './src/js/**/*.js',
  jsEntry: './src/js/index.js',
  jsWorkerEntry: './src/js/simrunner.js',
  jade: './src/jade/**/*.jade',
  styl: './src/stylus/**/*.styl',
  stylEntry: './src/stylus/index.styl',
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

gulp.task('stylus', function () {
  gulp.src(path.stylEntry)
    .pipe(stylus({
      use: nib(),
      compress: true
    }))
    .pipe(gulp.dest(path.dist))
    .pipe(connect.reload());
});

var makeBundle = function(entryPoint) {
  return browserify({ debug: true, insertGlobalVars: ['onmessage', 'postMessage'] })
    .add(es6ify.runtime)
    .require(require.resolve(entryPoint), { entry: true })
    .transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
    .bundle()
    .on('error', function(err) {
      console.log(err.message);
      this.end();
    });
};

gulp.task('browserify', function() {
  makeBundle(path.jsEntry)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(path.dist))
    .pipe(connect.reload());

  makeBundle(path.jsWorkerEntry)
    .pipe(source('worker.js'))
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
  gulp.watch([path.styl], ['stylus']);
  gulp.watch([path.js], ['browserify']);
});

gulp.task('default', ['jade', 'browserify', 'copy', 'stylus', 'connect', 'watch']);
