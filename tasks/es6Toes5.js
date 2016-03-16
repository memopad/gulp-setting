const gulp = require('gulp');
const babel = require('gulp-babel');
const gutil = require('gulp-util');

var logMagenta = function(txt) {
  return gutil.colors.magenta(txt);
}
var logCyan = function(txt) {
  return gutil.colors.cyan(txt);
}

gulp.task('babel', () => {
  return gulp.src(process.cwd() + '/js/es6/**')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(process.cwd() + '/js/'))
    .on('end', function() {
      gutil.log(logMagenta('<----------------- ') + logCyan('[ babel ] ') + logMagenta(new Date().toLocaleTimeString().toString() + ' ---------------->'));
    })
});
