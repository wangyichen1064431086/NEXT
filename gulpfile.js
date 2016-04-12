const fs = require('fs');
const http = require('http');
const url = require('url');
const request = require('request');
const cheerio = require('cheerio');

const merge = require('merge-stream');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const browserSync = require('browser-sync').create();
const del = require('del');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const debowerify = require('debowerify');
const babelify = require('babelify');
const cssnext = require('postcss-cssnext');


gulp.task('htmllint', function() {
  gulp.src('app/index.html')
    .pipe($.html5Lint());
});

gulp.task('styles', function styles() {
  const DEST = '.tmp/styles';

  return gulp.src('client/*.scss')
    .pipe($.changed(DEST)) 
    .pipe($.plumber()) 
    .pipe($.sourcemaps.init({loadMaps:true})) 
    .pipe($.sass({ 
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['bower_components']
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      cssnext({ 
        features: {
          colorRgba: false
        }
      })
    ]))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream({once:true})); 
});

gulp.task('lint', function() {
  return gulp.src('client/**/*.js')
    .pipe($.eslint({
        extends: 'eslint:recommended',
        globals: {
          'd3': true,
          'ga': true,
          'fa': true
        },
        rules: {
          semi: [2, "always"]
        },
        envs: [
          'browser'
        ]
    }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());  
});


gulp.task('copyjs', function() {
  return gulp.src(['app/scripts/*.js', 'client/js/*.js'])
  .pipe(gulp.dest('.tmp/scripts'))
  .pipe(browserSync.stream({once:true}));
});

gulp.task('copym', function() {
  return gulp.src('app/m/**')
    .pipe(gulp.dest('.tmp/m'));
});

gulp.task('copyicon', function() {
  return gulp.src('header/icons/*')
    .pipe(gulp.dest('.tmp/icons'));
});

gulp.task('requestdata', function(done) {
  const dateStamp = new Date().getTime();
  const url = 'http://www.ftchinese.com/m/corp/p0.html?' + dateStamp;

  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(body, {
        decodeEntities: false
      });
      $('#roadblock').remove();
      $('.header-container').remove();
      $('.nav-place-holder').remove();
      $('.footer-container').remove();
      $('#overlay-login').remove();
      $('.app-download-container').remove();
      const data = $('body').html();

      fs.writeFile('views/partials/body.html', data, function(err) {
        if (err) {return done(err)}
        done();
      });
    }
  });

});

gulp.task('serve', 
  gulp.parallel(
  /*'mustache', */'styles', /*'scripts',*/ 'copyjs', 'copym',
    function serve() {
    browserSync.init({
      server: {
        baseDir: ['.tmp'/*, 'app'*/],
        routes: { 
          '/bower_components': 'bower_components'
        }
      }
    });

    gulp.watch(['views/**/*.mustache', 'model/*.json'], gulp.parallel('mustache'));
    gulp.watch('app/m/**/*.html', gulp.parallel('copym'));
    gulp.watch(['app/scripts/*.js'], gulp.parallel('copyjs'));
    gulp.watch(['client/**/*.scss'], gulp.parallel('styles'));
  })
);

gulp.task('php', function() {
  $.connectPhp.server({
    base: 'server',
    port: '8010',
    keepalive: true
  });
});


gulp.task('watch', gulp.parallel(
  'styles', /*'scripts',*/ 'copyjs', 'copym', 'copyicon', 'php',
  function() {
  browserSync.init({
    proxy: 'localhost:8010',
    port: 8080,
    open: true,
    notify: true,
    serveStatic: ['bower_components', '.tmp']
  });

  gulp.watch(['views/**/*', 'server/*'], browserSync.reload);
  gulp.watch(['client/**/*.js', 'app/**/*.js'], gulp.parallel('copyjs'));
  gulp.watch('client/**/*.scss', gulp.parallel('styles'));
}));

gulp.task('clean', function() {
  return del(['.tmp/**', 'dist']).then(()=>{
    console.log('Old files deleted');
  });
});

gulp.task('testserver', function() {
  return gulp.src(['views/partials/nav.html'])
    .pipe($.replace('<!-- easyapi -->', '<%easyapi command="11001" assign="datass1" debug=false%><%*$datass1.odatalist|var_dump*%>'))
    .pipe($.smoosher({
      base: '.tmp'
    }))
    .pipe(gulp.dest('../www/frontend/tpl/next/partials'));
});

/*======================*/

gulp.task('html', function() {
  return gulp.src('.tmp/*.html')
    .pipe($.useref({searchPath: ['.', '.tmp']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano())) 
/*    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true
    })))*/
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    '.tmp/**/*.json',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('ad', function () {
  return gulp.src('app/m/marketing/*')
    .pipe(gulp.dest('dist/m/marketing'));
});

gulp.task('build', gulp.series('styles', gulp.parallel('html', 'images',  'extras', 'ad')));

gulp.task('datestamp', function(done) {
  const dateStamp = new Date().getTime();
  const fileName = '../dev_www/frontend/tpl/next/timestamp/timestamp.html';

  fs.writeFile(fileName, dateStamp, function(err) {
      if(err) {
          done(err);
      }
      console.log(dateStamp + ' written to ' + fileName);
      done();
  });
});

gulp.task('copy', gulp.series('build', 'datestamp' ,function () {

  const cssjs = gulp.src(['dist/**/*.css', 'dist/**/*.js'])
    .pipe(gulp.dest('../dev_www/frontend/static/n'))
    .pipe(gulp.dest('../dev_www/frontend/tpl/next'));

  const style = gulp.src('dist/styles/partials/*.css')
    .pipe(gulp.dest('../dev_www/frontend/tpl/next/styles'));

  const market = gulp.src('dist/m/marketing/*')
    .pipe(gulp.dest('../dev_www/frontend/tpl/marketing'));

  const api = gulp.src('app/api/page/*')
    .pipe(gulp.dest('../dev_www/frontend/tpl/next/api/page'));

  const pageMaker = gulp.src('dist/**/*')
    .pipe(gulp.dest('../dev_cms/pagemaker'));

  const pageMaker2 = gulp.src('app/api/**/*')
    .pipe(gulp.dest('../dev_cms/pagemaker/api'));

  const p0 = gulp.src('app/templates/p0.html')
    .pipe($.replace(/([\r\n])[ \t]+/g, '$1'))
    .pipe($.replace(/(\r\n)+/g, '\r\n'))
    .pipe($.replace(/(\n)+/g, '\n'))
    .pipe(gulp.dest('../dev_www/frontend/tpl/corp'));

  const partials = gulp.src('app/templates/partials/**/*')
    .pipe($.replace(/([\r\n])[ \t]+/g, '$1'))
    .pipe($.replace(/(\r\n)+/g, '\r\n'))
    .pipe($.replace(/(\n)+/g, '\n'))
    .pipe(gulp.dest('../dev_www/frontend/tpl/next/partials'));

  const html = gulp.src('app/templates/html/**/*')
    .pipe($.replace(/([\r\n])[ \t]+/g, '$1'))
    .pipe($.replace(/(\r\n)+/g, '\r\n'))
    .pipe($.replace(/(\n)+/g, '\n'))
    .pipe(gulp.dest('../dev_www/frontend/tpl/next/html'));

  return merge(cssjs, style, market, api, pageMaker, pageMaker2, p0, partials, html);
}));
