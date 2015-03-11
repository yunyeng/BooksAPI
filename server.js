var express = require("express");
var port = 8888;

function start(twitter){
	var express = require('express');
	var app = express();

	app.get('/about', function (req, res) {
	  res.send('Hello World!');
	})

	app.use(express.static(__dirname + '/public'));

	app.get('/search', function(req, res){
		res.send(twitter.gotweet());
    });

	app.listen(port, function() {
	    console.log('server listening on port ' + port);
	});
}
exports.start = start;
