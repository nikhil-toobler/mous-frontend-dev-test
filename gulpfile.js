// Requires the gulp and installed plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano'); //npm install gulp-cssnano
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('sass', function() {
    return gulp.src('app/scss/screen.scss') // Get source files with gulp.src
    .pipe(sass()) // Sends it through a gulp plugin
    .pipe(gulp.dest('app/css')) // Outputs the file in the destination folder
    .pipe(browserSync.stream());
});

gulp.task('images', function(){ 
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

//To clear the caches off your local system, you can create a separate task that's named `cache:clear`
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('videos', function() {
  return gulp.src('app/videos/**/*')
  .pipe(gulp.dest('dist/videos'))
});
 
gulp.task('clean:dist', function() {
  return del.sync('dist'); //Gulp will delete the `dist` folder for you whenever gulp clean:dist is run.
});

//gulp.task('default', ['serve']);

//watch changes
gulp.task('serve', function(){
    browserSync.init({
        server: "app"
    });
    
    gulp.watch('app/scss/**/*.scss', ['sass']); 
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload); 
});

//Combining Gulp tasks

//before creating production all task should run step by step
//Run Sequence also allows you to run tasks simultaneously if you place them in an array:
//So we can now create a task that ensures that clean:dist runs first
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts', 'videos'],
    callback
  )
});