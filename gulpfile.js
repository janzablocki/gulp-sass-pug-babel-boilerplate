var gulp = require('gulp')
var plumber = require('gulp-plumber')
var connect = require('gulp-connect')
var pug = require('gulp-pug')
var sass = require('gulp-sass')
var babel = require('gulp-babel')
const minify = require('gulp-minify');

gulp.task('sass', function () {
    return gulp.src('./src/sass/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
});

gulp.task('pug', function () {
    return gulp.src(['src/views/index.pug'])
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('public'))
        .pipe(connect.reload())
})

gulp.task('babel', function () {
    return gulp.src('src/javascript/**/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(minify())
        .pipe(gulp.dest('public/js'))
        .pipe(connect.reload())
})

gulp.task('connect', function () {
    connect.server({
        root: 'public',
        livereload: true
    })
})

gulp.task('watch', function () {
    gulp.watch(['src/sass/**/*.pug'], gulp.series('sass'))
    gulp.watch(['src/views/**/*.pug'], gulp.series('pug'))
    gulp.watch(['src/javascript/**/*.js'], gulp.series('babel'))
})

gulp.task('deploy', gulp.parallel('sass', 'pug', 'babel'))
gulp.task('default', gulp.parallel('sass', 'pug', 'babel', 'watch', 'connect'))
