var express 	= require("express"),
	path 		= require('path'),
	port 		= Number(process.env.PORT || 8080),
	app 		= express(),
	bodyParser 	= require("body-parser");
	
	app.use(bodyParser.json());

var twitter 	= require("./modules/twitter")(app),
	api         = require("./api")(app);

function start(){

	var folder = __dirname + '../../public';
	app.use("/", express.static(folder));

	app.get('/book/*', function(req,res){
	 res.sendFile(path.resolve(folder + '/views/book.html'));
	});

	app.get('/mobile', function(req,res){
	 res.sendFile(path.resolve(folder + '/views/mobile.html'));
	});

	function guid() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	//function(req, res){var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;console.log(res);}

	// Run the Server
	app.listen(port, function() {
	    console.log('Server listening on port: ' + port);
	});
}
exports.start = start;