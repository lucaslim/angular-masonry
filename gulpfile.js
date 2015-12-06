(function () {
    'use strict';

    var
        gulp = require('gulp'),
        bs = require('browser-sync').create(),
        rs = require('run-sequence'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        ngAnnotate = require('gulp-ng-annotate'),
        uglify = require('gulp-uglify'),
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
        var b = browserify({
            entries: './app/angular-masonry.js',
            paths: ['./node_modules', './app/'],
            debug: true
        });

        return b
            .external('angular')
            .bundle()
            .pipe(source('angular-masonry.js'))
            .pipe(buffer())
            .pipe(gulp.dest('./dev/'));
    });

    gulp.task('html:dev', function () {
        return gulp.src('./app/index.html')
            .pipe(gulp.dest('./dev/'));
    });

    gulp.task('watch', function () {
        //gulp.watch('./test/**/*.js', ['test:unit']);
        gulp.watch('./app/**/*.js', ['js:dev', bs.reload]);
        gulp.watch('./app/index.html', ['html:dev']).on('change', bs.reload);
    });

    /*
     *
     * Build
     *
     */
    gulp.task('js:build:min', ['jshint'], function () {
        var b = browserify({
            entries: './app/angular-masonry.js',
            paths: ['./node_modules', './app/']
        });

        return b
            .external('angular')
            .bundle()
            .pipe(source('angular-masonry.min.js'))
            .pipe(buffer())
            .pipe(ngAnnotate({single_quotes: true}))
            .pipe(uglify({compress: true, mangle: true}))
            .pipe(gulp.dest('./build/'));
    });

    gulp.task('js:build', ['jshint'], function () {
        var b = browserify({
            entries: './app/angular-masonry.js',
            paths: ['./node_modules', './app/']
        });

        return b
            .external('angular')
            .bundle()
            .pipe(source('angular-masonry.js'))
            .pipe(buffer())
            .pipe(ngAnnotate({single_quotes: true}))
            //.pipe(uglify({compress: false, mangle: false}))
            .pipe(gulp.dest('./build/'));
    });

    gulp.task('serve', function () {
        rs('js:dev', 'html:dev', ['watch', 'server:dev']);
    });

    gulp.task('build', ['js:build', 'js:build:min']);

}());