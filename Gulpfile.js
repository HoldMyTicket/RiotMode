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

gulp.task('compileDemo', function() {
  return gulp.src('./pages/*.tag')
  .pipe(riot({
    compact: true
  }))
  // .pipe(uglify())
  .pipe(concat('demo.js'))
  .pipe(gulp.dest('dist/'));
});

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

gulp.task('ship', function(){

  gulp.start('bump', function(){
    
    gulp.start('commit-version', function() {
      
      var json = JSON.parse(fs.readFileSync('./bower.json', 'utf8'));

      git.tag('v'+json.version, 'Updated version', function (err) {

        if(err) throw(err);
        
        git.push('origin', 'master', {args: " --tags"}, function (err) {
          if (err) throw err;
        });

      });
      
    });

  });

});

gulp.task('bump', function(){
  return gulp.src('./bower.json').pipe(bump()).pipe(gulp.dest('./'));
});

gulp.task('commit-version', function () {
  return gulp.src('./bower.json')
    .pipe(git.add())
    .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('compile', ['compileMixins','compileTags','compileDemo'], function(){
  return gulp.start('minify');
});

gulp.task('webserver', function() {
  return gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('default', function() {

  gulp.start('webserver');
  
  gulp.start('compile', function(){
    
    if(gutil.env.type == 'ship'){
      return gulp.start(['ship']);
    } else {
      return gulp.watch(['./tags/*/src/*.tag', './mixins/*.js', './pages/*.tag', 'index.html'], ['compile']);
    }
    
  })
  
});
