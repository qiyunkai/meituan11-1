var gulp = require('gulp');
var sass = require('gulp-sass');
var auto = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var listJson = require('./mork/list.json');
gulp.task('devScss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(auto({
            browsers: ['last 1 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devScss'))
})
gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 3000,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return res.end();
                }
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 0, data: listJson }))
                } else if (pathname === '/api/search') {
                    var val = url.parse(req.url, true).query.key;
                    var arr = [];
                    listJson.forEach(file => {
                        if (file.name.match(val) != null && file.name.match(val)) {
                            arr.push(file)
                        }
                    });

                    res.end(JSON.stringify({ code: 0, data: arr }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task('dev', gulp.parallel('devScss', 'devServer', 'watch'))