var gulp = require('gulp');
var del = require('del');
gulp.task('clean', function() {
  del([process.cwd() + '/release/*'], function(err, paths) {})
});
