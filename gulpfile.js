var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// To be added.
const fs = require('fs');
const browserSync = require('browser-sync').create();
const del = require('del');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const debowerify = require('debowerify');
const babelify = require('babelify');
const cssnext = require('postcss-cssnext');
const minify = require('html-minifier').minify;




// Use template file to generate static html
gulp.task(function mustache() {
  const DEST = '.tmp';

  const headerData = JSON.parse(fs.readFileSync('model/header-data2.json'));

  return gulp.src('views/index.mustache')
    .pipe($.changed(DEST))
    .pipe($.mustache(headerData, {
      extension: '.html'
    }))
    .pipe($.sizereport({
      gzip: true,
      minifier: function(contents, filepath) {
        return minify(contents, {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        });
      }
    }))
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream({once: true}));
});

gulp.task('htmllint', function() {
  gulp.src('views/index.mustache')
    .pipe($.html5Lint());
});

gulp.task('styles', function styles() {
  const DEST = '.tmp/styles';

  return gulp.src(['client/main.scss', 'client/scss/ie*.scss'])
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

gulp.task('scripts', function scripts() {
  var b = browserify({
    entries: 'client/main.js',
    debug: true,
    cache: {},
    packageCache: {},
    transform: [babelify, debowerify],
    plugin: [watchify]
  });

  b.on('update', bundle);
  b.on('log', $.util.log);

  bundle();

  function bundle(ids) {
    $.util.log('Compiling JS...');
    if (ids) {
      console.log('Changed Files:\n' + ids);
    }   
    return b.bundle()
      .on('error', function(err) {
        $.util.log(err.message);
        browserSync.notify('Browerify Error!')
        this.emit('end')
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('.tmp/scripts'))
      .pipe(browserSync.stream({once:true}));
  }
});

gulp.task(function js() {
  const DEST = '.tmp/scripts';

  var b = browserify({
    entries: 'client/main.js',
    debug: true,
    cache: {},
    packageCache: {},
    transform: [babelify, debowerify]
  });

  return b.bundle()
    .on('error', function(err) {
      $.util.log(err.message);
      this.emit('end')
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST));
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

gulp.task('data', function() {
  return gulp.src('model/sub-nav.json')
    .pipe(gulp.dest('.tmp/data'))
});

gulp.task('copyjs', function() {
  return gulp.src('client/js/main.js')
  .pipe(gulp.dest('tmp/scripts'));
});


gulp.task('serve', 
  gulp.parallel(
    'mustache', 'styles', 'scripts', 'data', 'copyjs',
    function serve() {
    browserSync.init({
      server: {
        baseDir: ['.tmp'],
        routes: { 
          '/bower_components': 'bower_components'
        }
      }
    });

    gulp.watch(['views/**/*.mustache', 'model/*.json'], gulp.parallel('mustache'));

    gulp.watch(['client/**/*.scss'], gulp.parallel('styles'));
  })
);

gulp.task('clean', function() {
  return del(['.tmp/**']).then(()=>{
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
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('ad', function () {
  return gulp.src('app/m/marketing/*')
    .pipe(gulp.dest('dist/m/marketing'));
});


gulp.task('build', gulp.parallel('html', 'images',  'extras', 'ad'));


function getUrltoFile (urlSource, fileName) {
  var http = require('http');
  var url = require('url');
  var options = {
      host: url.parse(urlSource).hostname,
      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search || '')
  }
  console.log (options.path);
  var request = http.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
          data += chunk;
      });
      //console.log (data);
      res.on('end', function () {
        var fs = require('fs');
        fs.writeFile(fileName, data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(urlSource);
            console.log('writen to');
            console.log(fileName);
        });
      });
  });
  request.on('error', function (e) {
      console.log(e.message);
  });
  request.end();
}


function getBodyFromUrl (urlSource, fileName) {
  var http = require('http');
  var url = require('url');
  var options = {
      host: url.parse(urlSource).hostname,
      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search || '')
  }
  console.log (options.path);
  var request = http.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
          data += chunk;
      });
      //console.log (data);
      res.on('end', function () {
        //data = data.replace(/^[.\r\n]*<body.*\/>([.\r\n]*)<\/body>[.\r\n]*$/g,'$1');
        var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
        var array_matches = pattern.exec(data);

        //console.log(array_matches[0]);
        var fs = require('fs');
        var fileContent = fs.readFileSync('app/index.html', 'utf8');
        fileContent = fileContent.replace(pattern, array_matches[0]);
        //console.log(fileContent);


       
        fs.writeFile(fileName, fileContent, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(urlSource);
            console.log('writen to');
            console.log(fileName);
        });

        //return data;
      });
  });
  request.on('error', function (e) {
      console.log(e.message);
  });
  request.end();
}

gulp.task('home', function () {
  var thedatestamp = new Date().getTime();
  getBodyFromUrl('http://www.ftchinese.com/m/corp/p0.html?' + thedatestamp, 'index.html');
});

gulp.task('copy', gulp.series('build', function () {
  //var replace = require('gulp-replace');
  //var rename = require("gulp-rename");
  var thedatestamp = new Date().getTime();



  gulp.src('dist/styles/*.css')
    .pipe(gulp.dest('../dev_www/frontend/static/n'))
    .pipe(gulp.dest('../dev_www/frontend/tpl/next/styles'));

  gulp.src('dist/styles/partials/*.css')
    .pipe(gulp.dest('../dev_www/frontend/tpl/next/styles'));

  gulp.src('dist/scripts/*.js')
    .pipe(gulp.dest('../dev_www/frontend/static/n'))
    .pipe(gulp.dest('../dev_www/frontend/tpl/next/scripts'));

  gulp.src('dist/m/marketing/*')
    .pipe(gulp.dest('../dev_www/frontend/tpl/marketing'));

  gulp.src('app/api/page/*')
    .pipe(gulp.dest('../dev_www/frontend/tpl/next/api/page'));

  gulp.src('dist/**/*')
    .pipe(gulp.dest('../dev_cms/pagemaker'));

  gulp.src('app/api/**/*')
    .pipe(gulp.dest('../dev_cms/pagemaker/api'));

  gulp.src('app/templates/p0.html')
    .pipe($.replace(/([\r\n])[ \t]+/g, '$1'))
    .pipe($.replace(/(\r\n)+/g, '\r\n'))
    .pipe($.replace(/(\n)+/g, '\n'))
    .pipe(gulp.dest('../dev_www/frontend/tpl/corp'));

  gulp.src('app/templates/partials/**/*')
    .pipe($.replace(/([\r\n])[ \t]+/g, '$1'))
    .pipe($.replace(/(\r\n)+/g, '\r\n'))
    .pipe($.replace(/(\n)+/g, '\n'))
    .pipe(gulp.dest('../dev_www/frontend/tpl/next/partials'));

  gulp.src('app/templates/html/**/*')
    .pipe($.replace(/([\r\n])[ \t]+/g, '$1'))
    .pipe($.replace(/(\r\n)+/g, '\r\n'))
    .pipe($.replace(/(\n)+/g, '\n'))
    .pipe(gulp.dest('../dev_www/frontend/tpl/next/html'));


  var fileName = '../dev_www/frontend/tpl/next/timestamp/timestamp.html';
  var fs = require('fs');
  fs.writeFile(fileName, thedatestamp, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log(thedatestamp);
      console.log('writen to');
      console.log(fileName);
  });

}));

gulp.task('story', function () {
  var thisday = new Date();
  var theyear = thisday.getFullYear();
  var themonth = thisday.getMonth() + 1;
  var theday =  thisday.getDate();
  var thedatestamp = theyear + '-' + themonth + '-' + theday;


  var urlSource = 'https://backyard.ftchinese.com/falcon.php/cmsusers/login';
  var http = require('http');
  var url = require('url');
  var options = {
      host: url.parse(urlSource).hostname,
      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search || '')
  }


var request = require('request');


request.post({
    url: 'https://backyard.ftchinese.com/falcon.php/cmsusers/login',
    form: {"username":"", "password":""},
    headers: {
      'User-Agent': 'request'
    }
}, function(error, response, body){
    var storyapi = 'https://backyard.ftchinese.com/falcon.php/homepage/getstoryapi/' + thedatestamp;
    //var headers = response.headers;
    // headers['Content-Length'] = 100000;
    // headers['User-Agent'] = 'request';
    // headers['expires'] = 'Fri, 19 Feb 2016 08:52:00 GMT';

    // console.log (headers);

    var headers = {
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//'Accept-Encoding':'gzip, deflate, sdch',
'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
'Cache-Control':'max-age=0',
'Connection':'keep-alive',
'Cookie':'FTSTAT_ok_times=22; _ga=GA1.3.637326541.1424081173; campaign=2015spring5; _gscu_2081532775=0.7.0.5%7C2483082596632ej013%7C1424859625967%7C8%7C3%7C27%7C0; __utma=65529209.637326541.1424081173.1449122460.1454643214.25; __utmz=65529209.1449122460.24.6.utmcsr=EmailNewsletter|utmccn=1D110215|utmcmd=referral; __utmv=65529209.visitor_DailyEmail; __gads=ID=cd878295be28de40:T=1454986613:S=ALNI_MbkpbmkeeFOrhk1DVu05zuKdgqPmw; SIVISITOR=Ni42NzQuOTg3MjQ2MjgyMzk4Ny4xNDU0OTg2NjE0Mzc0Li0xZDZkODE5Ng__*; ccode=1P110215; faid=97e09ef664648f4bcc02a418e06717d3; ftn_cookie_id=1455247531.176777595; PHPSESSID=f8b0d2f63c554af8a5c8ef8a79b4c4bb; _ga=GA1.2.637326541.1424081173; ftcms_uid=13; ftcms_username=oliver.zhang; ftcms_groups=editor',
'Host':'backyard.ftchinese.com',
'Upgrade-Insecure-Requests':'1',
//'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36'
    }



/*
    headers = {
      'User-Agent': 'request',
      'expires': 'Fri, 19 Feb 2016 08:52:00 GMT'
    };
*/
    
    request.get({
        url: storyapi,
        headers: headers
    },function(error, response, body){
        // The full html of the authenticated page
        console.log(body);

        var fileName = './app/api/page/stories.json';
        var fs = require('fs');
        fs.writeFile(fileName, body, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(storyapi);
            console.log('writen to');
            console.log(fileName);
        });


    });
    

});


  
});