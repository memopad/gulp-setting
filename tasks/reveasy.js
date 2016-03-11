var gulp = require('gulp');
var reveasy = require('gulp-rev-easy');

gulp.task("reveasy", function(argument) {
  return gulp.src(process.cwd() + '/release/*.html')
    .pipe(reveasy({
      fileTypes: ['js', 'css', 'img'],
      elementAttributes: {
        js: {
          name: 'script',
          src: 'src'
        },
        css: {
          name: 'link[rel="stylesheet"]',
          src: 'href'
        },
        img: {
          name: 'img',
          src: 'src'
        }
      }
    }))
    .pipe(gulp.dest(process.cwd() + '/release/'));
});
gulp.task("imgrev", function(argument) {
  return gulp.src(process.cwd() + '/release/*.html')
    .pipe(reveasy({
      fileTypes: ['img'],
      elementAttributes: {
        img: {
          name: 'img',
          src: 'src'
        }
      }
    }))
    .pipe(gulp.dest(process.cwd() + '/release/'));
});
