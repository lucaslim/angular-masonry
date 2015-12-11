(function () {
    'use strict';

    var
        gulp = require('gulp'),
        bs = require('browser-sync').create(),
        rs = require('run-sequence'),
        ngAnnotate = require('gulp-ng-annotate'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        jshint = require('gulp-jshint');

    /*
     *
     * Development
     *
     */
    gulp.task('server:dev', function () {
        bs.init({
            server: './dev/',
            browser: 'google chrome'
        });
    });

    gulp.task('jshint', function () {
        return gulp.src('./app/**/*.js')
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'));
    });

    gulp.task('js:dev', ['jshint'], function () {
        return gulp.src('./app/angular-masonry.js')
            .pipe(gulp.dest('./dev/'));
    });
    gulp.task('html:dev', function () {
        return gulp.src('./app/index.html')
            .pipe(gulp.dest('./dev/'));
    });

    gulp.task('watch', function () {
        gulp.watch('./app/**/*.js', ['js:dev', bs.reload]);
        gulp.watch('./app/index.html', ['html:dev']).on('change', bs.reload);
    });

    /*
     *
     * Build
     *
     */

    gulp.task('js:build:min', ['jshint'], function () {
        return gulp.src('./app/angular-masonry.js')
            .pipe(ngAnnotate({single_node: true}))
            .pipe(uglify({compress: true, mangle: true}))
            .pipe(concat('angular-masonry.min.js'))
            .pipe(gulp.dest('./'));
    });

    gulp.task('js:build', ['jshint'], function () {
        return gulp.src('./app/angular-masonry.js')
            .pipe(ngAnnotate({single_node: true}))
            .pipe(concat('angular-masonry.js'))
            .pipe(gulp.dest('./'));
    });

    gulp.task('serve', function () {
        rs('js:dev', 'html:dev', ['watch', 'server:dev']);
    });

    gulp.task('build', ['js:build', 'js:build:min']);

}());