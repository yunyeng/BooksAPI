function gotweet(){
	var Twitter = require('twitter');
	 
	process.env.TWITTER_CONSUMER_KEY = 'KDXwph4YPppLenMs8ILv53M0E';
	process.env.TWITTER_CONSUMER_SECRET = '6i3Qdjm8LSmJiwu0uTxU49rYD1qHz7ViWuwjAo51WhcCpCaEXK';
	process.env.TWITTER_ACCESS_TOKEN_KEY = '3033795642-kdbegGJebmMw7TefS7YE4p7FxbYCmd9EED29R47';
	process.env.TWITTER_ACCESS_TOKEN_SECRET = '7XpdSuCZgBQ2iZ9Cf6qjqFN2aqUKPuzztwptHCUFtcADo';

	var client = new Twitter({
	  consumer_key: process.env.TWITTER_CONSUMER_KEY,
	  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	var tweet = "";
	 
	var params = {screen_name: 'onahippietrail'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	    console.log(tweets[0].user.name);
	    tweet += tweets[0].user.name;
	  }
	});
	return tweet;
}
exports.gotweet = gotweet;
