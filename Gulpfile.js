// including plugins
var gulp = require('gulp')
, fs = require('fs')
, minifyCss = require("gulp-minify-css")
, uglify = require("gulp-uglify")
, concat = require("gulp-concat")
, riot = require("gulp-riot")
, bump = require('gulp-bump')
, gutil = require("gulp-util")
, git = require('gulp-git')
, webserver = require('gulp-webserver');

gutil.env.type = gutil.env.type || 'development'; // if ship.. then bump version and git tag and git push


gulp.task('compileTags', function() {
  return gulp.src('./tags/*/src/*.tag')
  .pipe(riot({
    compact: true
  }))
  .pipe(uglify())
  .pipe(concat('_tags.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('compileMixins', function() {
	return gulp.src('./mixins/*.js')
		.pipe(riot({compact: true}))
		.pipe(concat('_mixins.js'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('minify', function(){
  return gulp.src(['dist/_tags.js','dist/_mixins.js'])
    .pipe(concat('RiotMode.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('ship', ['bump'], function(){
  gulp.start('deploy');
});

gulp.task('bump', function(){
  return gulp.src('./bower.json').pipe(bump()).pipe(gulp.dest('./'));
});

gulp.task('deploy', function(){
  var json = JSON.parse(fs.readFileSync('./bower.json', 'utf8'));
  return git.tag('v'+json.version, 'Updated version', function (err) {
    if(err) throw(err);
    git.push('origin', 'master', function (err) {
      if (err) throw err;
    });
  });
});


gulp.task('compile', ['compileMixins','compileTags'], function(){
  return gulp.start('minify');
})

gulp.task('default', function() {
  
  gulp.start('compile', function(){
    
    if(gutil.env.type == 'ship'){
      
      gulp.start(['ship']);
      
    } else {
      
      
            
      gulp.watch(['./tags/*/src/*.tag', './mixins/*.js'], function(){
        gulp.start('compile');
      });
      
      gulp.src('./')
        .pipe(webserver({
          livereload: true,
          directoryListing: false,
          open: true,
          fallback: 'index.html'
        }));      
    }
    
  })
  
})
