var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

gulp.task('init-istanbul', function () {
    return gulp.src(['twitter.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
})

gulp.task('test', ['init-istanbul'], function () {

    return gulp.src(['./test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'nyan' }))
        .pipe(istanbul.writeReports());
});