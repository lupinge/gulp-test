var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');

//压缩html
// gulp.task('htmlmin', function () {
//     var options = {
//         removeComments: true,//清除HTML注释
//         collapseWhitespace: true,//压缩HTML
//         collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
//         removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
//         removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
//         removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
//         minifyJS: true,//压缩页面JS
//         minifyCSS: true//压缩页面CSS
//     };
//     gulp.src('app/*.html')
//         .pipe(htmlmin(options))
//         .pipe(gulp.dest('build'));
// });


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


//压缩图片
// gulp.task('imagemin', function() {
//     return gulp.src('app/img/*.{png,jpg,gif,ico}')
//         .pipe(imagemin(
//             {
//                 optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
//                 progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
//                 interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
//                 multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
//             }
//         ))
//         .pipe(gulp.dest('build/img'))
// });


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











