var express = require("express");
var twitter = require("./tw");
var port = 8888;

function start(){
	var express = require('express');
	var app = express();

	console.log(twitter.gotweet('asd'));

	app.get('/about', function (req, res) {
	  res.send('Hello World!');
	})

	app.use(express.static(__dirname + '/public'));

	var t = twitter.gotweet('harry potter');

	app.get('/search', function(req, res){
		console.log(t);
		res.send(t);
		//console.log(twitter.gotweet('harry potter'));
		//res.send(t);
    });

	app.listen(port, function() {
	    console.log('server listening on port ' + port);
	});
}
exports.start = start;
