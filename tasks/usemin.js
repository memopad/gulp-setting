var gulp = require('gulp');
var gulpusemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var autoprefixer = require('gulp-autoprefixer');
var pxtorem = require('gulp-pxtorem');

var pxtoremOptions = {
  root_value: 32,
  unit_precision: 5,
  prop_white_list: ['font', 'font-size', 'line-height', 'letter-spacing', 'background', 'background-position', 'background-size', 'border', 'width', 'height', 'margin', 'margin-top', 'margin-left', 'margin-right', 'margin-bottom', 'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 'border', 'border-left', 'border-right', 'border-top', 'border-bottom', 'box-shadow', '-webkit-box-shadow', 'top', 'left', 'right', 'bottom', 'text-indent', 'transform', '-webkit-transform', 'border-radius'],
  replace: true,
  media_query: false
};
var postcssOptions = {
  map: false
};

gulp.task('usemin', function() {
  return gulp.src(process.cwd() + '/*.html')
    .pipe(gulpusemin({
      css: [autoprefixer({
          browsers: [
            'last 10 versions',
            'chrome 30',
            'safari 5',
            'ie 7',
            'opera 10',
          ],
          cascade: false
        }),
        minifyCss(),
        'concat',
      ],
      html: [minifyHtml({
        empty: true
      })],
      js: [
        uglify(),
      ],
      inlinejs: [uglify()],
      inlinecss: [minifyCss(), 'concat']
    }))
    .pipe(gulp.dest(process.cwd() + '/release'));
});


gulp.task('usemin-px', function() {
  return gulp.src(currentDirectory + '*.html')
    .pipe(gulpusemin({
      css: [autoprefixer({
          browsers: [
            'last 10 versions',
            'chrome 30',
            'safari 5',
            'ie 7',
            'opera 10',
          ],
          cascade: false
        }),
        pxtorem(pxtoremOptions, postcssOptions),
        minifyCss(),
        'concat',
        rev(),
      ],
      html: [minifyHtml({
        empty: true
      })],
      js: [
        uglify(),
        rev()
      ],
      inlinejs: [uglify()],
      inlinecss: [minifyCss(), 'concat']
    }))
    .pipe(gulp.dest(process.cwd() + '/release'));
});
