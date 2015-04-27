var express 	= require("express"),
	bodyParser 	= require("body-parser"),
	mongojs 	= require("mongojs"),
	request 	= require("request"),
	twitter 	= require("./modules/twitter"),
	analyze 	= require("./modules/analyze"),
	port 		= 8888,
	app 		= express(),
	db 			= mongojs('googlebooks', ['books', 'users']);

function start(){

	app.use(express.static(__dirname + '../../public'));
	app.use(bodyParser.json());


	app.get('/about', function(req, res){
		res.send('Hello World');
	});

	// Core Search API
	app.get('/search/:q/:p?', function(req, res){
		var query 	= req.params.q,
			page	= 1;
		if(req.params.p !== undefined) page = parseInt(req.params.p);
		var maxResults = 40;
		var startIndex = maxResults * (page-1);
		console.log(req.params);
		//console.log(query);
		var url = 'https://www.googleapis.com/books/v1/volumes?q='+query+'&maxResults='+maxResults;
		console.log(startIndex);
		if(page !== undefined) url += '&startIndex='+startIndex;
		request(
			{
				url: url,
				json: true
			}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		        //console.log(body); // Print the json response
		        res.json(body);
		        //////////////////////////////
		        //console.log(analyze.theData(body, query));
		        //////////////////////////////
		        var date = new Date();
		        db.books.insert({"value":query, "time":date.getTime()}, function(err, doc){ /*res.json(doc);*/ });
		    }
		})
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