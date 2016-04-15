// including plugins
var gulp = require('gulp')
, minifyCss = require("gulp-minify-css")
, uglify = require("gulp-uglify")
, concat = require("gulp-concat")
, riot = require("gulp-riot")
, gutil = require("gulp-util");

function minifyriot(){
  gutil.log('minify riot', 'Started');
  gulp.src(['tags/*/src/*.tag'])
  .pipe(riot({
    compact: true
  }))
  .pipe(uglify())
  .pipe(concat('RiotMode.js'))
  .pipe(gulp.dest('dist/'));
  gutil.log('minify riot', 'Finished');
}

gulp.task('default', function() {
  // gulp.watch(cssfiles, minifycss)
  // gulp.watch(jsfiles, minifyjs)
  // gulp.watch(['elements/*.html','controllers/*.html','app.html'], minifyriot);
  // minifycss()
  // minifyjs()
  minifyriot()
})
