'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var useref = require('gulp-useref');

gulp.task('default', function() {  
    gulp.run('imgemin', 'sprite', 'sass', 'autoprefx', 'js', 'html');
});

// compile sass
gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('./dist/css'))
  .pipe(livereload());
});

gulp.task('sass:watch', function () {
    livereload.listen();
    gulp.watch('./src/sass/**/*.scss', ['sass', 'autoprefx']);
});

gulp.task('js', function () {
  return gulp.src('./src/js/**/*.js')
  .pipe(useref())
  .pipe(gulp.dest('./dist/js/'));
});

gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
  .pipe(useref())
  .pipe(gulp.dest('./dist/'));
}); 

// get sprites
gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/img/icons/*.png')
    .pipe(spritesmith({
        /* this whole image path is used in css background declarations */
        imgName: '../img/sprite.png',
        cssName: '_icons.scss', 
    }));
    spriteData.img.pipe(gulp.dest('./dist/img'));
    spriteData.css.pipe(gulp.dest('./src/sass/'));
});

// css autoprefixer
gulp.task('autoprefx', function () {
    gulp.src('./dist/css/css.css')
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css'));
});

// image optimization
gulp.task('imgemin', () => {
    gulp.src('./src/img/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
        ],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./dist/img'));
});
