var gulp = require('gulp');
var s3 = require("gulp-s3");

var aws = {
  key: process.env.aws_access_key_id,
  secret: process.env.aws_secret_access_key,
  bucket: "shizumae-dokoro",
  region: "ap-northeast-1"
};

gulp.task('s3', () => {
  return gulp.src('./build/**')
    .pipe(s3(aws));
});
