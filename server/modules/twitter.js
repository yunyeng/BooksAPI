module.exports = function(app){
	var Twitter = require('twitter'),
		shuffle = require('knuth-shuffle').knuthShuffle;
	 
	process.env.TWITTER_CONSUMER_KEY = 'pqSYmWBT8VZFB0cQpQJYjPxhU';
	process.env.TWITTER_CONSUMER_SECRET = 'mJt8LSuxuW9Fc9N2YCMzOeqVffkdPl6vlnHmV4Gouc7V4C6AMK';
	process.env.TWITTER_ACCESS_TOKEN_KEY = '4626286757-AT5pfFHBL0iqd0WxLvd86bcFK7SFlkPUIytqYwt';
	process.env.TWITTER_ACCESS_TOKEN_SECRET = 'kbjyApBblxkr5Mbl0d6fjdBGV2mssBa4eGT6OUx8imJmX';

	var client = new Twitter({
	  consumer_key: process.env.TWITTER_CONSUMER_KEY,
	  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	var tweet = "";
	app.get('/tweets', function(req, res){
		client.get('search/tweets', {q: encodeURIComponent(req.query.q)}, function(error, tweets, response){
			if(tweets.statuses != undefined) tweet = (shuffle(tweets.statuses)).slice(0, 5);
	    });
	    res.json(tweet);
	});

	/*
	client.stream('statuses/filter', {track: word}, function(stream){
		stream.on('data', function(data){
			tweet += util.inspect(data.text);
			stream.destroy();
			//process.exit(0);
		});
	});	 
	var params = {screen_name: 'onahippietrail'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	    tweet += tweets[1];
	  }
	});
	return tweet;
	*/
}