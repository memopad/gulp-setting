var gulp = require('gulp');
var connect = require('gulp-connect');
var dir = require('./directory.js');
var gulpif = require('gulp-if');
var pxtorem = require('gulp-pxtorem');
var open = require('gulp-open');
var portfinder = require('portfinder');
var currentDirectory = dir.currentDirectory;
var autoprefixer = require('gulp-autoprefixer');
var argv = require('minimist')(process.argv.slice(2));
var os = require('os');
var qrcode = require('qrcode-terminal');
var request = require('request');
var gutil = require('gulp-util');
//-p->Pxtorem
var setPxtorem = argv.p ? true : false;
//-b->open with browser
var setOpen = argv.b ? true : false;
//-q -> get the qrcode;
var setQrcode = argv.q ? true : false;

// var proxyHost = 'http://10.10.10.14';

var logMagenta = function(txt) {
  return gutil.colors.magenta(txt);
}
var logCyan = function(txt) {
  return gutil.colors.cyan(txt);
}

gulp.task('connect', function() {
  portfinder.getPort(function(err, port) {
    if (setQrcode) {
      var page = "";
      if (argv.q && argv.q !== true) {
        page = '/' + argv.q;
      } else {
        page = "/" + argv.b;
      }
      var debug_url = 'http://' + os.networkInterfaces().en0[1].address + ':' + port + page;
      qrcode.generate(debug_url);
      console.log("deubg_url->" + debug_url);
    }
    var serverConfiguration = {};
    serverConfiguration = {
      port: port,
      root: currentDirectory,
      livereload: {
        port: port + 27729,
      },
      middleware: function(connect, opt) {
        return [
          function(req, res, next) {
            if (req.headers.crossdomain === 'true') {
              console.log(req.url);
              var newUrl = proxyHost + req.url;
              gutil.log(logMagenta('<----------------- ') + logCyan('[ 跨域了 ]') + logMagenta(' ---------------->'));
              request({
                method: req.method,
                url: newUrl,
                headers: req.headers
              }).pipe(res);
            } else {
              next();
            }
          }
        ];
      }
    };
    //find the avaliable port;
    connect.server(serverConfiguration);
  });
});

/****************
 * Open Url
 *****************/

gulp.task('open', function() {
  if (setOpen === false) {
    return;
  }
  portfinder.getPort(function(err, port) {
    if (argv.q && argv.q !== true) {
      page = '/' + argv.q;
    } else {
      page = "/index.html";
    }
    var options = {
      url: 'http://' + os.networkInterfaces().en0[1].address + ':' + (port - 1) + page
    };
    gulp.src(currentDirectory + 'index.html')
      .pipe(open('', options));
  });
});

/*******************
 * Sass Livereload
 ********************/
var sass = require('gulp-sass');
var pxtoremOptions = {
  root_value: 32,
  unit_precision:2,
  prop_white_list: [
    'font',
    'font-size',
    'line-height',
    'letter-spacing',
    'background',
    'background-position',
    'background-size',
    'border',
    'width',
    'height',
    'min-height',
    'margin',
    'margin-top',
    'margin-left',
    'margin-right',
    'margin-bottom',
    'padding',
    'padding-left',
    'padding-right',
    'padding-top',
    'padding-bottom',
    'border',
    'border-left',
    'border-right',
    'border-top',
    'border-bottom',
    'box-shadow',
    '-webkit-box-shadow',
    'top',
    'left',
    'right',
    'bottom',
    'text-indent',
    'transform',
    '-webkit-transform',
    'border-radius',
    '-webkit-border-radius'
  ],
  replace: true,
  media_query: false
};
var postcssOptions = {
  map: false
};

gulp.task('livereload-sass', function() {
  gulp.src(process.cwd() + '/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: [
          'last 10 versions',
          'chrome 30',
          'safari 5',
          'ie 7',
          'opera 10',
        ]
      })
    )
    .pipe(gulpif(setPxtorem, pxtorem(pxtoremOptions, postcssOptions)))
    .pipe(gulp.dest(process.cwd() + '/css/'))
    .pipe(connect.reload())
    .on('end', function() {
      gutil.log(logMagenta('<----------------- ') + logCyan('[ sass ] ') + logMagenta(new Date().toLocaleTimeString().toString() + ' ---------------->'));
    })
});

gulp.task('html', function() {
  gulp.src(currentDirectory + '*.html')
    .on('end', function() {
      gutil.log(logMagenta('<----------------- ') + logCyan('[ html ] ') + logMagenta(new Date().toLocaleTimeString().toString() + ' ---------------->'));
    })
    .pipe(connect.reload())
});


gulp.task('livereload-watch', function() {
  gulp.watch([process.cwd() + '/*.html'], ['html']);
  gulp.watch([process.cwd() + '/js/es6/**/*.js'], ['babel']);
  gulp.watch([process.cwd() + '/css/**/*.css']);
  gulp.watch([process.cwd() + '/scss/**/*.scss'], ['livereload-sass']);
  // gulp.watch(['img/**/*'], function(e) {
  //     gulp.start('html');
  // });
});

// gulp.task('livereload', ['livereload-sass', 'connect', 'livereload-watch', 'open', 'babel']);
gulp.task('livereload', ['livereload-sass', 'connect', 'html', 'livereload-watch', 'open', 'babel']);
