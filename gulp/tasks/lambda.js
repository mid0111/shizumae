var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('lambda', () => {
  return gulp.src(['lambda/**/*', '!lambda/*.zip'])
    .pipe(zip('queryLocation.zip'))
    .pipe(gulp.dest('lambda'));
});
