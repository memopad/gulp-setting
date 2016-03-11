var gulp = require('gulp');
var ejs = require("gulp-ejs");
/*
Redirect to the  spetific shop
*/

var configuration = {
  product: {
    type: "product",
    data: [{
      "productId": 123,
      "imageName": 'a_03.jpg',
    }, {
      "productId": 2312,
      "imageName": 'a_04.jpg',
    }]
  },
  banner: {
    imageName: 'a_01.jpg',
  },
  title: "hello-world"
}

/*
Redirect to the app category~
*/
// var configuration = {
//   product: {
//     type: "class",//or type:"class"
//     data: [{
//       "productId": 123,
//       "imageName": 'a_03.jpg',
//       "categoryName":'情趣内衣'
//     }, {
//       "productId": 2312,
//       "imageName": 'a_04.jpg',
//       "categoryName":'情趣内衣'
//     }]
//   },
//   banner: {
//     imageName: 'a_01.jpg',
//   },
//   title: "hello-world"
// }
gulp.task('ejs', function() {
  gulp.src("/Users/lichunyi/workspace/componment/gulpjs/components/shop-simple-crop-template/index.ejs")
    .pipe(ejs(configuration))
    .pipe(gulp.dest("/Users/lichunyi/workspace/componment/gulpjs/components/shop-simple-crop-template/dist/"));
});
