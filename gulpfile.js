'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');

gulp.task('build', function(){

    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src('src/sgb-screen-login.js')
        .pipe(browserified)
        .pipe(gulp.dest('./dist/'));
});