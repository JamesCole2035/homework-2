const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
    return gulp.src(['./src/sass/**/*.sass', './src/sass/**/*.scss'])
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer(['last 6 versions', '> 1%'], { cascade: true }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
    return gulp.src('./src/html/*.html')
        .pipe(gulp.dest('./dist/html/'))
});

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/js/'))
});

gulp.task('images', function() {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('./dist/img/'))
});

gulp.task('watch', function () {
	watch('./src/html/*.js', gulp.parallel('js', browserSync.reload)); 
    watch('./src/html/*.html', gulp.parallel('html', browserSync.reload)); 
    watch('./src/sass/*.sass', gulp.parallel('sass', browserSync.reload));
    watch('./dist/css/*.css', gulp.parallel(browserSync.reload));
});

gulp.task('browser', function() {
    browserSync({
        proxy: "localhost:8888",
        notify: false
    });
});



