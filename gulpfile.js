var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    less        = require('gulp-less'),
    cssnano     = require('gulp-cssnano'),
    del         = require('del'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    notify      = require('gulp-notify'),
    rename      = require('gulp-rename');


var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');


// MAIN PATHS
var paths = {
  public:  'public/',
  markup:  'master/views/html',
  styles:  'master/less/',
  scripts: 'master/js/'
}


// SOURCES CONFIG 
var source = {
  scripts: {

    app : [paths.scripts + 'app.module.js',
  // core and routes
            paths.scripts + 'core/*.module.js',
            paths.scripts + 'core/*.js',
            paths.scripts + 'routes/*.module.js',
            paths.scripts + 'routes/*.js',
            // template modules
            paths.scripts + 'modules/**/*.module.js',
            paths.scripts + 'modules/**/*.js',

        ],

    bower:   
        [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/ngstorage/ngStorage.min.js',
            "bower_components/angular-loading-bar/build/loading-bar.js"
        ]
    },
    
    templates: {
        index: ['master/index.*'],
        views: [paths.markup + '**/*.*']
    },

    styles: [ 
                paths.styles + 'app.less' 
            ]

};


// Build the base script to start the application from vendor assets
gulp.task('vendor:base', function() {

        gulp.src(source.scripts.bower)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('public/scripts'))
        ;


});

gulp.task('scripts', function() {
    gulp.src(source.scripts.app)
        // .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/scripts/'))
        .pipe(notify({ message: 'All Scripts compiled' }));
});



gulp.task('styles', function() {
    gulp.src(source.styles)
        .pipe(less())
        .pipe(cssnano())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('public/styles/'))
        .pipe(notify({ message: 'All Styles compiled' }));
});




gulp.task('views', function() {
    gulp.src(['master/views/html/**/*.*'])
        .pipe(gulp.dest('public/views'))
        .pipe(notify({ message: 'All HTML Files compiled' }));
});


gulp.task('index', function() {
    gulp.src(source.templates.index)
    .pipe(rename('index.php'))
        .pipe(gulp.dest('resources/views'))
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
    gulp.start( 'vendor:base', 'scripts', 'styles', 'views', 'index', 'watch');
});


/**
 * **********************************
 * @watch
 * Watch for file changes and recompile as needed
 * **********************************
 */
gulp.task('watch', function() {

    // Watch .js files
    gulp.watch('master/src/**', ['vendor:base', 'scripts']);

    // Watch .less files
    gulp.watch('master/less/**', ['styles']);

    // Watch views
    gulp.watch('master/views/**', ['views']);

    // Watch index file
    gulp.watch('master/index.html', ['index']);

});
