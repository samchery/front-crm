const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const gulpif = require('gulp-if');
const minifyCSS = require('gulp-csso');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const sync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const pxtorem = require('gulp-pxtorem');

const isProd = process.env.NODE_ENV === 'production';

/**
 * SCSS
 */

function scss() {
  return gulp.src('app/scss/style.scss')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false }))
    .pipe(pxtorem())
    .pipe(gulpif(isProd, minifyCSS()))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest('dist/css'))
    .pipe(sync.stream());
}

/**
 * JS
 */

function js() {
  return browserify({entries: ['app/js/script.js'], debug: true})
    .transform(babelify, {presets: 'es2015'})
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(gulpif(!isProd, sourcemaps.init({loadMaps: true})))
    .pipe(uglify())
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest('dist/js'))
    .pipe(sync.stream());
};

/**
 * IMAGES
 */

function images() {
  return gulp.src('app/img/**/*')
    .pipe(gulpif(isProd, imagemin({verbose: true})))
    .pipe(gulp.dest('dist/img'));
}

/**
 * FONTS
 */

function fonts() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
}

/**
* HTML
*/
function html() {
  return gulp.src('app/*.html')
  .pipe(gulp.dest('dist/'))
  .pipe(sync.stream());
}

/**
 * GLOBAL
 */

function clean() {
  return del(['dist']);
}



gulp.task('build', gulp.series(clean, gulp.parallel(html, scss, js, images, fonts)));

gulp.task('default', gulp.parallel(html, scss, js, images, fonts, function(done) {
  sync.init({
    server: {

      baseDir: './dist'
    }
  });

  gulp.watch('app/**/*.html', html);
  gulp.watch('app/**/*.scss', scss);
  gulp.watch('app/**/*.js', js);
  gulp.watch('app/**/*.html', html);

  done();
}));
