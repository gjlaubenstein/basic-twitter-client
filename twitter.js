var restify = require('restify');
var util = require('util');
var Q = require('q');

var Twitter = function (credentials) {
	var self = this;
	getTwitterClient(credentials.consumer_key, credentials.consumer_secret).then(function (client) {
		self.client = client;
	});
};

Twitter.prototype.tweetsByUser = function (user, count) {
	var deferred = Q.defer();
	this.client.get(util.format('/1.1/statuses/user_timeline.json?screen_name=%s&count=%s', user, count), function (err, req, res, data) {
		deferred.resolve(JSON.parse(res.body));
	});
	return deferred.promise;
}

Twitter.prototype.tweetsByHashtag = function (hashtag, count) {
	var deferred = Q.defer();
	this.client.get(util.format('/1.1/search/tweets.json?q=%s&count=%s', hashtag, count), function (err, req, res, data) {
		deferred.resolve(JSON.parse(res.body));
	});
	return deferred.promise;
}

function getTwitterClient(key, secret) {
	var deferred = Q.defer();
	var tokenCredentials = createTwitterCredentialsToken(key, secret);

	var twitterAuthClient = restify.createStringClient({
		url: 'https://api.twitter.com',
		headers: {
			'Authorization': 'Basic ' + tokenCredentials
		}
	});

	var twitterClient;
	twitterAuthClient.post('/oauth2/token?grant_type=client_credentials', function (err, req, res, data) {
		if (err) { console.error(err); }

		var body = JSON.parse(res.body);
		twitterClient = twitterClientFactory(body.access_token);
		deferred.resolve(twitterClient);
	});
	return deferred.promise;
}

function twitterClientFactory(token) {
	return restify.createStringClient({
		url: 'https://api.twitter.com',
		headers: {
			'Authorization': 'bearer ' + token
		}
	});
}

function createTwitterCredentialsToken(key, secret) {
	var token = new Buffer(key + ':' + secret);
	return token.toString("base64");
}

module.exports = Twitter;