var superagent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var path = require('path');

fs.exists('./images', function(exists) {
	if (!exists) {
		fs.mkdir('./images', function(err) {
			if (err) throw err;
			console.log('创建目录成功');
		});
	}
});

superagent.get('http://xw.qq.com/games/20160930001566/GAM2016093000156600').end(function(err, sres) {
	if (err) { console.log(err) }
	
	var $ = cheerio.load(sres.text), imageSrc = '';
	
	$('.image').each(function(i, ele) {
		imageSrc = $(ele).find('img').attr('src');
		
		var filename = imageSrc.split('/').splice(-2,1) + '.jpg';

		request(imageSrc).pipe(fs.createWriteStream('./images/'+filename)).on('close', function(err){
			if (err) { console.log(err) }
			
			console.log(filename + ' done');
		})
	});
	
});