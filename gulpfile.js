/**
 * gulp
 * $ npm install linco.dir gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-concat-css gulp-uglify gulp-obfuscate gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    stripDebug   = require('gulp-strip-debug'),
    minifycss    = require('gulp-minify-css'),
  
    uglify       = require('gulp-uglify'),
    obfuscate    = require('gulp-obfuscate'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    concatCss    = require('gulp-concat-css'),
    notify       = require('gulp-notify'),
    cache        = require('gulp-cache'),
    livereload   = require('gulp-livereload'),
    del          = require('del'),
    dir          = require('linco.dir'); // https://github.com/gavinning/dir

// linco.dir用于遍历文件夹目录及子目录
// opt参数为可选，不设置将执行默认规则，以下为默认规则
var RootPath = 'www/build/';

var app = [
  RootPath + "main.js"
]

gulp.task('default', [], function() {
    gulp.start(
            'scripts-base',
            'css'
        );
    //gulp.start('styles', 'scripts-base', 'scripts-game');
    //gulp.start('watch');
})

gulp.task('css', function () {
    return gulp.src([RootPath + 'main.css'])
      .pipe(minifycss())
      .pipe(gulp.dest(RootPath))
  })

// gulp.task('styles', function() {
//     var obj = dir('assets/images/', {deep: true, onlyFile: ['*.css']});
//     return gulp.src(obj.files) // assets/images/**/*.css
//         //  .pipe(sass({ style: 'expanded' }))
//         .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//         // .pipe(concatCss('all.css'))
//         .pipe(gulp.dest('dist/assets/css'))
//         .pipe(rename({
//             suffix: '.min'
//         }))
//         .pipe(minifycss())
//         .pipe(gulp.dest('dist/assets/css'));
// });

gulp.task('scripts-base', function() {
    var filelist = [
        'www/build/main.js',
        'www/build/vendor.js'      
    ];
    return gulp.src(filelist)
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('www/build'));
});



