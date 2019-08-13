const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const plumber = require('gulp-plumber')

function css() {
  return gulp
    .src('./dev/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest('public/stylesheets'))
}

exports.default = gulp.series(css)