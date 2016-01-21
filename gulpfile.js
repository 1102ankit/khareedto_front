var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    less        = require('gulp-less'),
    cssnano     = require('gulp-cssnano'),
    del         = require('del'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    notify      = require('gulp-notify');


var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');



gulp.task('bower-js', function() {
    gulp.src(
        
        [   'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/ngstorage/ngStorage.min.js',
        ])
        .pipe(concat('vendors.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('public/scripts/'))
        .pipe(notify({ message: 'Bower components compiled' }));
});


gulp.task('scripts', function() {
    gulp.src(['app/src/**/*.js'])
        // .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/scripts/'))
        .pipe(notify({ message: 'All Scripts compiled' }));
});


gulp.task('styles', function() {
    gulp.src([
            'bower_components/bootstrap/less/bootstrap.less',
            'app/less/style.less'
        ])
        .pipe(less())
        .pipe(cssnano())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('public/styles/'))
        .pipe(notify({ message: 'All Styles compiled' }));
});



gulp.task('views', function() {
    gulp.src('app/views/**/*.html')
        .pipe(gulp.dest('public/views/'))
        // .pipe(notify({ message: 'All HTML Files compiled' }));
});


gulp.task('index', function() {
    gulp.src('app/index.html')
        .pipe(gulp.dest('public/'))
        .pipe(notify({ message: 'Index HTML compiled' }));
});



/**
 * **********************************
 * @clean
 * Clean previously complied files to generate new ones
 * **********************************
 */
gulp.task('clean', function() {
  return del(['public/styles', 'public/scripts', 'public/views','public/index.html']);
});


/**
 * **********************************
 * @default
 * Run default commands
 * **********************************
 */
gulp.task('default', ['clean'], function() {
    gulp.start( 'bower-js', 'scripts', 'styles', 'views', 'index');
});


/**
 * **********************************
 * @watch
 * Watch for file changes and recompile as needed
 * **********************************
 */
gulp.task('watch', function() {

    // Watch .js files
    gulp.watch('app/src/**', ['bower-js', 'scripts']);

    // Watch .less files
    gulp.watch('app/less/**', ['styles']);

    // Watch views
    gulp.watch('app/views/**', ['views']);

    // Watch index file
    gulp.watch('app/index.html', ['index']);

});
