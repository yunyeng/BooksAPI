function gotweet(word){
	var Twitter = require('twitter');
	var util = require('util');
	 
	process.env.TWITTER_CONSUMER_KEY = 'coCX3Z5mDFNc9Hy39abAZkkHo';
	process.env.TWITTER_CONSUMER_SECRET = 'GyZ9OeTbn6zD6r5QzSHkaepzuarPfU9RmxaLrqMha6G74S5meC';
	process.env.TWITTER_ACCESS_TOKEN_KEY = '3033795642-kdbegGJebmMw7TefS7YE4p7FxbYCmd9EED29R47';
	process.env.TWITTER_ACCESS_TOKEN_SECRET = '7XpdSuCZgBQ2iZ9Cf6qjqFN2aqUKPuzztwptHCUFtcADo';

	var client = new Twitter({
	  consumer_key: process.env.TWITTER_CONSUMER_KEY,
	  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	var tweet = "";

	client.get('search/tweets', {q: word}, function(error, tweets, response){
		tweet += tweets.statuses[0].text + '\n' +
				tweets.statuses[1].text + '\n' +
				tweets.statuses[2].text;
		//console.log(tweet);
		return tweet;
	});


	//return tweet;

	/*client.stream('statuses/filter', {track: word}, function(stream){
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
exports.gotweet = gotweet;
