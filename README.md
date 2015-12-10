# basic-twitter-client

## install
`npm install basic-twitter-client --save`

## usage
```
var Twitter = require('basic-twitter-client');

var twitterClient = new Twitter({
	'consumer_key': process.env.TWITTER_CONSUMER_KEY,
	'consumer_secret': process.env.TWITTER_CONSUMER_SECRET
});

twitterClient.tweetsByUser('username', 6).then(function(tweets) {
		console.log(tweets);
});

twitterClient.tweetsByHashtag('hashtag', 5).then(function(tweets) {
		console.log(tweets);
});

```
