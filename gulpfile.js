var gulp = require("gulp");
var connect = require('gulp-connect');
var eslint = require('gulp-eslint');
var exec = require('child_process').execSync;
var replace = require('gulp-replace');
var minifyHtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task("default", ['connect', 'watch']);

gulp.task('build', ['buildjs', 'buildhtml']);

gulp.task('clean', function(next) {
    del(['./dist/**'], next);
});

gulp.task('buildjs', function () {
  exec('npm run buildjs', function (err, stdout, stderr) {
    if (err) {
      throw err;
    }
    else {
      console.log('Build complete!');
    }
  });
});

gulp.task('buildhtml', function () {
  gulp.src('./src/index.html')
    .pipe(replace('css/app.css', 'app.min.css'))
    .pipe(replace('lib/system.js', 'index.js'))
    .pipe(replace('<script src="config.js"></script>', ''))
    .pipe(replace("<script>System.import('./js/index')</script>", ''))
    .pipe(minifyHtml())
    .pipe(gulp.dest('./dist'));
});

gulp.task('lint', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(eslint({
      rules: {
        'no-console': 0
      },
      parser: 'babel-eslint',
      extends: 'eslint:recommended',
      envs: ['commonjs', 'browser']
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('connect', function() {
  connect.server({
    root: 'src',
    port: 3000,
    livereload: true
  });
});

gulp.task('reload', function () {
  gulp.src('./dist/**/*')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./src/**/*'], ['reload']);
});

gulp.task('svg2json', function() {
  require('./tasks/svg2json')(
    __dirname + '/svg/africa-map.svg',
    __dirname + '/dist/africa-map.json');
});
