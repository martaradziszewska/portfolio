var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel');

gulp.task('css', ['sass'], function() {
    return gulp.src('app/css/**/*.css')
        .pipe(concat('common.css'))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
})

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
          }))
});

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'app'
      },
    })
  })


gulp.task('js', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(jshint())
        .pipe(concat('common.js'))
        .pipe(gulp.dest('dist/js'))
})  

gulp.task('watch',['browserSync', 'css', 'js'], function() {
    gulp.watch('app/sass/**/*.scss', ['css']);
    gulp.watch('app/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', browserSync.reload); 

})
