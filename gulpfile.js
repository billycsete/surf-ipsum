
// Load plugins
var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var jshint       = require('gulp-jshint');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var cache        = require('gulp-cache');
var livereload   = require('gulp-livereload');
var browserify   = require('browserify');
var del          = require('del');
var notifier     = require('node-notifier');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');


// CSS Task
gulp.task('styles', function() {
	return sass('src/scss/steeze.scss', { style: 'expanded' })
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('dist/css/'))
		.pipe(rename({suffix: '-min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css/'))
});


// Lint JS
gulp.task('jshint', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
});


// Build Generator JS
gulp.task('generator', function () {
	var b = browserify({
		entries: 'src/js/generator/main.js',
		debug: true
	});

	return b.bundle()
		.pipe(source('generator.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist/js/'))
		.pipe(rename({suffix: '-min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));
});


// Build Uploader JS
gulp.task('uploader', function () {
	var b = browserify({
		entries: 'src/js/uploader/main.js',
		debug: true
	});

	return b.bundle()
		.pipe(source('uploader.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist/js/'))
		.pipe(rename({suffix: '-min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));
});


// Images
gulp.task('images', function() {
	return gulp.src('src/images/**/*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('dist/images/'))
});


// Copy HTML and font files
gulp.task('copy', function() {
	gulp.src('src/*.html').pipe(gulp.dest('dist/'));
	gulp.src('src/uploader/*.html').pipe(gulp.dest('dist/uploader/'));
	gulp.src('src/fonts/**').pipe(gulp.dest('dist/fonts/'));
});


// Clean out /dist/ directory
gulp.task('clean', function(cb) {
	del(['dist/**/*'], cb)
});


// Default task
gulp.task('scripts', function() {
	gulp.start('generator', 'uploader');
});


// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'jshint', 'scripts', 'images', 'copy');
});


// Watch
gulp.task('watch', function() {
	// Watch .scss files
	gulp.watch('src/scss/**/*.scss', ['styles']);
	// Watch uploader .js files
	gulp.watch('src/js/uploader/*.js', ['uploader']);
	// Watch generator .js files
	gulp.watch('src/js/generator/*.js', ['generator']);
	// Watch image files
	gulp.watch('src/images/**/*', ['images']);
	// Watch .html files
	gulp.watch(['src/*.html', 'src/**/*.html'], ['copy']);
	// Create LiveReload server
	livereload.listen();
	// Watch any files in dist/, reload on change
	gulp.watch(['dist/**']).on('change', function(){
		livereload.changed('Dat website be');
		notifier.notify({ title: 'Yo doooode!', message: 'that website changed.' });
	});
});
