const gulp = require('gulp');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const connect = require('gulp-connect');

var logMagenta = function(txt) {
  return gutil.colors.magenta(txt);
}
var logCyan = function(txt) {
  return gutil.colors.cyan(txt);
}

gulp.task('babel', () => {
  return gulp.src(process.cwd() + '/es6/**')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(process.cwd() + '/js/'))
    .pipe(connect.reload())
    .on('end', function() {
      gutil.log(logMagenta('<----------------- ') + logCyan('[ babel ] ') + logMagenta(new Date().toLocaleTimeString().toString() + ' ---------------->'));
    })
});
