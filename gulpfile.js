var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var rimraf = require('gulp-rimraf');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');

////////////
// General Tasks

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('build', ['js', 'css', 'html']);

gulp.task('watch', ['watch:js', 'watch:css', 'watch:html'])

gulp.task('serve', function() {
  nodemon({
    ext: 'js css ejs html',
    ignore: ['public/*', 'client/*', 'node_modules/*']
  });
});

////////////
// Javascript Tasks

gulp.task('js', ['clean:js'], function() {
  return gulp.src('client/js/**/*.js') // input files
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    // .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js')); // output files
});

gulp.task('watch:js', function() {
  return gulp.watch('client/js/**/*.js', ['js']);
});

gulp.task('clean:js', function() {
  return gulp.src('public/js', { read: false })
    .pipe(rimraf());
});

////////////
// CSS Tasks

gulp.task('css', ['clean:css'], function() {
  return gulp.src(['client/scss/**/*.scss', 'client/scss/**/*.sass'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch:css', function() {
  return gulp.watch(['client/scss/**/*.scss', 'client/scss/**/*.sass'], ['css']);
});

gulp.task('clean:css', function() {
  return gulp.src('public/css', { read: false })
    .pipe(rimraf());
});

////////////
// HTML Tasks

gulp.task('html', ['clean:html'], function() {
  return gulp.src('client/html/**/*.html')
    .pipe(gulp.dest('public/html'));
});

gulp.task('watch:html', function() {
  return gulp.watch('client/html/**/*.html', ['html']);
});

gulp.task('clean:html', function() {
  return gulp.src('public/html', { read: false })
    .pipe(rimraf());
});
