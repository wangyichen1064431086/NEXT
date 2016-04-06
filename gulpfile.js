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

  return gulp.src('header/o-header.scss')
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
      $('.app-download-container').remove();
      const data = $('body').html();

      fs.writeFile('views/frontpage/latest.mustache', data, function(err) {
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

  gulp.watch('header/icons/*', gulp.parallel('copyicon'));
  gulp.watch(['views/**/*', 'server/*']);
  gulp.watch(['header/**/*.js', 'app/**/*.js'], gulp.parallel('copyjs'));
  gulp.watch('header/**/*.scss', gulp.parallel('styles'));
}));

gulp.task('clean', function() {
  return del(['.tmp/**', 'dist']).then(()=>{
    console.log('Old files deleted');
  });
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



gulp.task('home', function(done) {
  const dateStamp = new Date().getTime();
  const url = 'http://www.ftchinese.com/m/corp/p0.html?' + dateStamp;

  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body, {
        decodeEntities: false
      });

      const data = $('body').html();
      const index = fs.readFileSync('app/index.html', 'utf8');
      $ = cheerio.load(index,  {
        decodeEntities: false
      });
      $('body').replaceWith(data);
      fs.writeFile('world.html', $.html(), function(err) {
        if (err) {done(err)}
      });
      done();
    }
  });
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




// const now = new Date();
// const year = now.getFullYear();
// const month = now.getFullYear();
// const date = now.getDate();
// const dateStamp = year + '-' + month + '-' + date;

// gulp.task('story', function () {

//   const urlSource = 'https://backyard.ftchinese.com/falcon.php/cmsusers/login';

//   // var options = {
//   //     host: url.parse(urlSource).hostname,
//   //     path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search || '')
//   // }

//   request.post({
//     url: 'https://backyard.ftchinese.com/falcon.php/cmsusers/login',
//     form: {"username":"", "password":""},
//     headers: {
//       'User-Agent': 'request'
//     }
//   }, function(error, response, body){
//     //var storyapi = 'https://backyard.ftchinese.com/falcon.php/homepage/getstoryapi/' + thedatestamp;
//     //var headers = response.headers;
//     // headers['Content-Length'] = 100000;
//     // headers['User-Agent'] = 'request';
//     // headers['expires'] = 'Fri, 19 Feb 2016 08:52:00 GMT';

//     // console.log (headers);

//   /*
//       headers = {
//         'User-Agent': 'request',
//         'expires': 'Fri, 19 Feb 2016 08:52:00 GMT'
//       };
//   */
//   });
// });

// gulp.src('getapi', function() {
//   const storyapi = 'https://backyard.ftchinese.com/falcon.php/homepage/getstoryapi/' + dateStamp;

//   var headers = {
//   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//   //'Accept-Encoding':'gzip, deflate, sdch',
//   'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
//   'Cache-Control':'max-age=0',
//   'Connection':'keep-alive',
//   'Cookie':'FTSTAT_ok_times=22; _ga=GA1.3.637326541.1424081173; campaign=2015spring5; _gscu_2081532775=0.7.0.5%7C2483082596632ej013%7C1424859625967%7C8%7C3%7C27%7C0; __utma=65529209.637326541.1424081173.1449122460.1454643214.25; __utmz=65529209.1449122460.24.6.utmcsr=EmailNewsletter|utmccn=1D110215|utmcmd=referral; __utmv=65529209.visitor_DailyEmail; __gads=ID=cd878295be28de40:T=1454986613:S=ALNI_MbkpbmkeeFOrhk1DVu05zuKdgqPmw; SIVISITOR=Ni42NzQuOTg3MjQ2MjgyMzk4Ny4xNDU0OTg2NjE0Mzc0Li0xZDZkODE5Ng__*; ccode=1P110215; faid=97e09ef664648f4bcc02a418e06717d3; ftn_cookie_id=1455247531.176777595; PHPSESSID=f8b0d2f63c554af8a5c8ef8a79b4c4bb; _ga=GA1.2.637326541.1424081173; ftcms_uid=13; ftcms_username=oliver.zhang; ftcms_groups=editor',
//   'Host':'backyard.ftchinese.com',
//   'Upgrade-Insecure-Requests':'1',
//   //'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36'
//   }

//   request.get({
//       url: storyapi,
//       headers: headers
//   },function(error, response, body){
//     // The full html of the authenticated page
//     console.log(body);

//     var fileName = './app/api/page/stories.json';

//     fs.writeFile(fileName, body, function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log(storyapi);
//         console.log('writen to');
//         console.log(fileName);
//     });
//   });
// });