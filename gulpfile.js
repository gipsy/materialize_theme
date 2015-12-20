var gulp = require('gulp');
var livereload = require('gulp-livereload');
var $ = require('gulp-load-plugins')();
var glob = require('glob');
var fs = require('fs');

var globals = {
    appname: 'martin blank materialize'
};

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

livereload({ start: true });

gulp.task('static', function() {
    gulp.src(['./src/js/**/*', './src/img/**/*'], {base: './src/'})
        .pipe($.watch(['./src/js/**/*', './src/img/**/*']))
        .pipe($.plumber({
            errorHandler: handleError
        }))
        .pipe(gulp.dest('./assets'));
        // .pipe(livereload());
});

gulp.task('styles', function() {
    gulp.src('./src/css/scss/**/*.scss')
        .pipe($.watch('./src/css/scss/**/*.scss'))
        .pipe($.plumber({
            errorHandler: handleError
        }))
        .pipe($.sass())
        .pipe(gulp.dest('./assets/css'));
        // .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen(35729);
  gulp.watch(['./src/js/**/*', './src/img/**/*'], {base: './src/'});
  gulp.watch('./src/css/scss/**/*.scss', ['styles']);
});

gulp.task('default', $.sequence(['styles', 'static']));
