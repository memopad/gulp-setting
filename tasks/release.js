var gulp = require('gulp');
var runSequence = require('run-sequence');
var argv = require('minimist')(process.argv.slice(2));

var px = argv.p ? true : false;
var i = argv.i ? true : false;

gulp.task('release', function(cb) {
  if (px) {
    //for the mobile
    runSequence('clean', 'livereload-sass', 'imagemin', 'useref-rem', 'imgrev', 'reveasy');
  } else if (i) {
    //
    console.log('此功能在实验性质阶段');
    // inline resouce
    runSequence('clean', 'livereload-sass', 'imagemin', 'useref-rem', 'inline');
  } else {
    //for the pc
    runSequence('clean', 'livereload-sass', 'imagemin', 'useref', 'reveasy');
  }
});
