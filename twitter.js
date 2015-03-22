/*var twit = require('twitter'),
	twitter = new twit({
		consumer_key: 'coCX3Z5mDFNc9Hy39abAZkkHo',
	  	consumer_secret: 'GyZ9OeTbn6zD6r5QzSHkaepzuarPfU9RmxaLrqMha6G74S5meC',
	  	access_token_key: '3033795642-kdbegGJebmMw7TefS7YE4p7FxbYCmd9EED29R47',
	  	access_token_secret: '7XpdSuCZgBQ2iZ9Cf6qjqFN2aqUKPuzztwptHCUFtcADo'
	});

var count = 0,
	util = require('util');

twitter.stream('filter', {track: 'love'}, function(stream){
	stream.on('data', function(data){

		try {
            console.log(JSON.parse(data));
        } catch (err) {
             console.log("JSONANIANINAINAIIAINANAINAIANIANAIANAINAIA parse error:" + err);
        } 

	});
});
*/
/*jslint indent: 4*/
/*jslint node: true */
'use strict';

var Twitter = require('twitter'),
    logger = require('fluent-logger');


var twit = new Twitter({
    consumer_key: 'coCX3Z5mDFNc9Hy39abAZkkHo',
	consumer_secret: 'GyZ9OeTbn6zD6r5QzSHkaepzuarPfU9RmxaLrqMha6G74S5meC',
	access_token_key: '3033795642-kdbegGJebmMw7TefS7YE4p7FxbYCmd9EED29R47',
	access_token_secret: '7XpdSuCZgBQ2iZ9Cf6qjqFN2aqUKPuzztwptHCUFtcADo'
});

// Tracking the keyword 'javascript'
twit.stream('statuses/filter', {'track': 'javascript'}, function (stream) {
    stream.on('data', function (data) {
        console.log(data);
    });
});