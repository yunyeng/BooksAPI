var express 	= require("express"),
	bodyParser 	= require("body-parser"),
	mongojs 	= require("mongojs"),
	twitter 	= require("./modules/twitter"),
	port 		= 8888,
	app 		= express(),
	db 			= mongojs('googlebooks', ['books', 'users']);

function start(){

	app.use(express.static(__dirname + '../../public'));
	app.use(bodyParser.json());

	app.get('/about', function(req, res){
		res.send('Hello World');
	});

	// Edit API
	app.get('/search/:q', function(req, res){
		var query = req.params.q;
		//console.log(req.params);
		db.books.insert({"name":query}, function(err, doc){
			//res.json(doc);
		});
		app.get('https://www.googleapis.com/books/v1/volumes?q="'+query+'"&maxResults=40', function(req, res){
			res.json(res.items);
		});
	});

	//function(req, res){var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;console.log(res);}

	// Run Twitter API
	twitter.tweetOut(app);

	// Run the Server
	app.listen(port, function() {
	    console.log('Server listening on port: ' + port);
	});
}
exports.start = start;