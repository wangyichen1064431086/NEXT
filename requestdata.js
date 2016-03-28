const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

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
    	if (err) {console.log(err)}
    });
  }
});

