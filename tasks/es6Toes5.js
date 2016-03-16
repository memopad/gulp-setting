const gulp = require('gulp');
const babel = require('gulp-babel');
// const gutil = require('gulp-util');

gulp.task('babel', () => {
  return gulp.src(process.cwd() + '/js/es6/**')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(process.cwd() + '/js/'))
    .on('end', function() {
      // gutil.log(gutil.colors.magenta('<---------------- babel ') + gutil.colors.cyan(new Date().toLocaleTimeString().toString()) + gutil.colors.magenta('---------------->'));
      console.log("<----------------- [ babel ] " + new Date().toLocaleTimeString().toString() + " ---------------->");
    })
});
