var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var request = require('request');
// Static server
var currentDirectory = process.cwd();
gulp.task('browserSync', function() {
  // browser init
  browserSync.init({
    server: {
      baseDir: currentDirectory
    },
    middleware: function(req, res, next) {
      if (!!req.headers.crossdomain) {
        request({
          method: req.method,
          url: req.headers.proxyhost,
        }).pipe(res);
      } else {
        next();
      }
    }
  });

  /*
  {"history":["/Users/lichunyi/workspace/taqu_codebase/taqu_mobile_html_project/trunk/touch/subject/double-eleven-2015/index-master.html"],
    "cwd":"/Users/lichunyi/workspace/taqu_codebase/taqu_mobile_html_project/trunk/touch/subject/double-eleven-2015",
    "base":"/Users/lichunyi/workspace/taqu_codebase/taqu_mobile_html_project/trunk/touch/subject/double-eleven-2015/",
    "stat":{
            "dev":16777220,
            "mode":33188,
            "nlink":1,
            "uid":501,
            "gid":20,
            "rdev":0,
            "blksize":4096,
            "ino":44787653,
            "size":6743,
            "blocks":16,
            "atime":"2015-10-24T08:54:25.000Z",
            "mtime":"2015-10-24T08:54:25.000Z",
            "ctime":"2015-10-24T08:54:25.000Z",
            "birthtime":"2015-10-21T08:32:28.000Z"},
            "_contents":{
                          "type":"Buffer",
                          "data":[......data-long.....]
                          "_isVinyl":true,
                          "event":"change"
                        }
    }


  */
  //watch the sass - scss directory
  watch(currentDirectory + '/sass/**/*.scss', function(file) {
    gulp.src(currentDirectory + '/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulpif("*.css", gulp.dest(currentDirectory + '/css')));
    browserSync.reload();
  });

  // watch the html change
  watch(currentDirectory + '/*.html', function(a, b, c, d) {
    browserSync.reload();
  });


  // watch the new picture add
  // watch(currentDirectory + '/imgs_raw/*.png', function(file, b) {
  //   gulp.src(file.path)
  //     .pipe(imagemin({
  //       progressive: true,
  //       svgoPlugins: [{
  //         removeViewBox: false
  //       }],
  //       use: [pngquant()]
  //     }))
  //     .pipe(gulp.dest(currentDirectory + '/imgs'));
  //
  //   browserSync.reload();
  // });
});
