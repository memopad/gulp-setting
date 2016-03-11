var gulp=require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('jasmine', function() {
  return gulp.src('spec/test.js')
    .pipe(jasmine());
});
