const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('babel', () => {
  return gulp.src(process.cwd() + '/js/es6/**')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(process.cwd() + '/js/'));
});
