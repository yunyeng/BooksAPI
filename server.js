var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var twitter = require("./modules/twitter");
var port = 8888;
var app = express();
var db = mongojs('googlebooks', ['books', 'users']);

function start(){

	app.use(express.static(__dirname + '/public'));
	app.use(bodyParser.json());

	twitter.tweetOut(app);

	app.listen(port, function() {
	    console.log('Server listening on port: ' + port);
	});
}
exports.start = start;