# 前端构建工具

## 1、gulp

组件：

~~~
gulp-minify-css: 压缩css
gulp-jshint:     检查js
gulp-uglify:     压缩js
gulp-concat:     合并文件
gulp-rename:     重命名文件
gulp-clean:      清空文件夹
gulp-notify:     提示
~~~

## gulp-autoprefixer的使用

> //编译sass
>
> gulp.task('compile-sass', function(){
>
> ​    gulp.src('sass/*.+(sass|scss)')    //['sass/*.sass', 'sass/*.scss']
>
> ​    .pipe(plugins.autoprefixer({
>
> ​        browsers: browsers,
>
> ​        cascade: true,  
>
> ​        remove: true
>
> ​    }))
>
> ​    .pipe(plugins.sass({outputStyle: 'expanded'}).on('error', plugins.sass.logError))
>
> ​    .pipe(gulp.dest('css'))
>
> ​    .pipe(plugins.notify({message: 'compile sass success!'}))
>
> })

关于autoprefixer参数说明：

>* browsers               选择兼容的浏览器型号
>
>* cascade: true        是否美化属性值 默认：true   ps:
>
>  ​				-webkit-transform: rotate(45deg);
>  					       transform: rotate(45deg);
>
>* remove: true         是否去掉不必要的前缀 默认:true
>
>

关于browsers选项的参考：[https://github.com/browserslist/browserslist#queries](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fbrowserslist%2Fbrowserslist%23queries) 
