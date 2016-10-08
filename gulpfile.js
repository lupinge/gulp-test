var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
//var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');


//移动HTML
gulp.task('movehtml', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('build/'));
});


//预编译sass
gulp.task('sass', function(){
  return gulp.src('app/css/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('build/css'))
});


//检查JS语法
gulp.task('jshint', function() {
    return gulp.src(['app/js/*.js', '!app/js/*min.js'])// 要检查的js文件
     .pipe(jshint({
        node: true,
        nomen: true,
        sloppy: true,
        plusplus: true,
        unparam: true,
        stupid: true
     }))
});

//压缩js
// gulp.task('uglify', function() {
//     return gulp.src(['app/js/*.js'])// 要压缩的js文件
//         .pipe(uglify()) //使用uglify进行压缩,更多配置请参考：
//         .pipe(gulp.dest('build/js'))//压缩后的路径
// });

//移动JS到build
gulp.task('movejs', function() {
    return gulp.src('app/js/**/*')
        .pipe(gulp.dest('build/js'));
});


//移动图片
gulp.task('moveimg', function() {
    return gulp.src('app/img/*')
        .pipe(gulp.dest('build/img'));
});


gulp.task('browserSync', function() {
    browserSync({
        server: {
            //指定服务器启动根目录
            baseDir: "build/"
        }
    });
});


//watch监听
gulp.task('watch', function(){
    //gulp.watch('app/*.html', ['htmlmin']);
    gulp.watch('app/*.html', ['movehtml']);
    gulp.watch('app/css/*.scss', ['sass']);
    gulp.watch('app/js/*.js', ['jshint']);
    //gulp.watch('app/js/*.js', ['uglify']);
    gulp.watch('app/js/*', ['movejs']);
    //gulp.watch('app/img/*', ['imagemin']);
    gulp.watch('app/img/*', ['moveimg']);

    gulp.watch("build/**/*.*", ['browserSync']).on('change', browserSync.reload);
  // Other watchers
})











