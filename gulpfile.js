var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var del = require('del');
var vinyPaths = require('vinyl-paths');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var cache = require('gulp-cache');
var livereload = require('gulp-livereload');

//检查脚本
gulp.task('jshint', function(){
    gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default')) //打印结果
    console.log('检查脚本完毕！');
})

// 合并压缩
gulp.task("script",function(){
    gulp.src('js/*.js')
    .pipe(concat("all.js")) //合并匹配到的js文件并命名为all.js
    .pipe(gulp.dest('dist'))
    .pipe(uglify()) //使用uglify进行压缩
    .pipe(rename('all.min.js'))//重命名文件
    //.pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("dist")) //压缩后的路径
    console.log("合并压缩完毕！");

    // 排除某些文件
    gulp.src(['js/*.js', 'js/!(*.min.js)'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dest'))
    .pipe(notify({message:'js task is ok!'}))
})

 //JS处理
 gulp.task('minifyjs',function(){
    return gulp.src(['/static/js/juicer-min.js','/static/js/bootstrap.min.js','/static/js/bootstrap-datetimepicker.min.js','/static/js/order_query.js'])  //选择合并的JS
        .pipe(concat('order_query.js'))   //合并js
        .pipe(gulp.dest('dist/js'))   //输出
        .pipe(uglify())       //压缩
        .pipe(rename({suffix:'.min'}))     //重命名
        .pipe(gulp.dest('dist/js'))            //输出 
        .pipe(notify({message:"js task ok"}));    //提示
 });

// 脚本
gulp.task('scripts', function() {  
    return gulp.src('src/scripts/**/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/scripts'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/scripts'))
      .pipe(notify({ message: 'Scripts task complete' }));
  });



//css处理
gulp.task('minifycss',function(){
    return gulp.src('htdocs/kunpeng/static/css/*.css')      //设置css
        .pipe(concat('order_query.css'))      //合并css文件到"order_query"
        .pipe(gulp.dest('dist/styles'))   //设置输出路径
        .pipe(minifycss())     //压缩文件      
        .pipe(rename({suffix:'.min'}))         //修改文件名  
        .pipe(gulp.dest('dist/styles'))            //输出文件目录
        .pipe(notify({message:'css task ok'}));   //提示成功
 });
 
// 样式
gulp.task('styles', function() {  
    return gulp.src('src/styles/main.scss')
      .pipe(sass({ style: 'expanded'}))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('dist/styles'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('dist/styles'))
      .pipe(notify({ message: 'Styles task complete' }));
  });
 
// 图片
gulp.task('images', function() {  
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// 清理
gulp.task('clean', function() {  
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
      .pipe(clean());
  });

//删除文件
//@1 直接删除
gulp.task('clean:build', function (cb) {
    del([
        'build/**/*',
        '!build/**/*.min.js'
    ])
});
//@2 在管道流中删除
gulp.task('clean:tmp', function (cb) {
    return gulp.src('tmp/*')
        .pipe(stripDebug())
        .pipe(gulp.dest('dist'))
        .pipe(vinyPaths(del));
})

gulp.task('watch', function(){
    gulp.watch('js/*.js', ['jshint', 'script']);
})

//监听
gulp.task('watch', function(){
    gulp.watch('src/styles/**/*.scss', ['styles']); //监听所有的.scss文件
    gulp.watch('src/scripts/**/*.js', ['scripts']); //监听所有的.js文件
    gulp.watch('src/images/**/*', ['images']);
     // 建立即时重整伺服器
    var server = livereload();
    // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
    gulp.watch(['dist/**']).on('change', function(file) {
        server.changed(file.path);
    });
})

// 默认任务
gulp.task('default',['jshint','script','watch'], function(){
    gulp.run('jshint', 'script');
    console.log('Starting....');
});

// 预设任务
gulp.task('default', ['clean'], function() {  
    gulp.start('styles', 'scripts', 'images');
});