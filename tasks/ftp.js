var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var argv = require('minimist')(process.argv.slice(2));
var qrcode = require('qrcode-terminal');

gulp.task('ftp', function() {
  var ftpConfig = require('../ftpConfig.js');
  var ftpServer = ftpConfig.remoteServer;
  var serverUrl = ftpConfig.remoteServerUrl;
  qrcode.generate(ftpConfig.onlineUrl);
  console.log(ftpConfig.onlineUrl);
  var conn = ftp.create(ftpServer);
  var globs = [
    'release/img/**',
    'release/css/**',
    'release/js/**',
    'release/fonts/**',
    'release/*.html'
  ];
  return gulp.src(globs, {
      base: 'release/',
      buffer: false
    })
    .pipe(conn.newer(serverUrl))
    .pipe(conn.dest(serverUrl));
});
