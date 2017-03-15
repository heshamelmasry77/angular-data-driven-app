var gulp = require('gulp');
// to out put things to the console plugin
gutil = require('gulp-util');

connect = require('gulp-connect');
// TASK IS THE THINGS WE WANT IT TO GET DONE


gulp.task('js', function() {
    gulp.src('builds/development/js/**/*');
});

gulp.task('html', function() {
    gulp.src('builds/development/*.html');
});

gulp.task('css', function() {
    gulp.src('builds/development/css/*.css');
});

gulp.task('watch', function() {
    gulp.watch('builds/development/js/**/*', ['js']);
    gulp.watch('builds/development/css/*.css', ['css']);
    gulp.watch(['builds/development/*.html',
        'builds/development/views/*.html'
    ], ['html']);
});



gulp.task('connect', function() {
    connect.server({
        root: 'builds/development/',
        livereload: true
    });
});


gulp.task('default', ['connect', 'watch', 'html', 'js', 'css']);
