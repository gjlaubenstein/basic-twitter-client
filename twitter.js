'use strict';

var restify = require('restify');
var util = require('util');
var Q = require('q');

class Twitter {
	constructor(credentials) {
		this.secret = credentials.consumer_secret;
		this.key = credentials.consumer_key;
		this.tokenCredentials;
		this.token;
		this.client;
	}

	tweetsByUser(user, count) {
		var deferred = Q.defer();
		
		this.checkTokenSet().catch(() => {
			return this.getBearerToken().then(() => {
				this.client = this.buildClient();
			});
		}).finally(() => {
			return this.client.get(util.format('/1.1/statuses/user_timeline.json?screen_name=%s&count=%s', user, count), function (err, req, res, data) {
				deferred.resolve(JSON.parse(res.body));
			});
		});

		return deferred.promise;
	}

	tweetsByHashtag(hashtag, count) {
		var deferred = Q.defer();
		this.checkTokenSet().catch(() => {
			return this.getBearerToken().then(() => {
				this.client = this.buildClient();
			});
		}).finally(() => {
			return this.client.get(util.format('/1.1/search/tweets.json?q=%s&count=%s', hashtag, count), function (err, req, res, data) {
				deferred.resolve(JSON.parse(res.body));
			});
		});
		return deferred.promise;
	}

	buildClientToken() {
		var tokenBuffer = new Buffer(this.key + ':' + this.secret);
		this.tokenCredentials = tokenBuffer.toString("base64");
	}

	getBearerToken() {
		var deferred = Q.defer();
		this.buildClientToken();
		var twitterAuthClient = restify.createStringClient({
			url: 'https://api.twitter.com',
			headers: {
				'Authorization': 'Basic ' + this.tokenCredentials
			}
		});

		twitterAuthClient.post('/oauth2/token?grant_type=client_credentials', (err, req, res, data) => {
			var body = JSON.parse(res.body);
			this.token = body.access_token;
			deferred.resolve();
		});
		return deferred.promise;
	}

	buildClient(token) {
		var client = restify.createStringClient({
			url: 'https://api.twitter.com',
			headers: {
				'Authorization': 'bearer ' + this.token
			}
		});
		return client;
	}

	checkTokenSet() {
		var deferred = Q.defer();
		if (typeof (this.token) === 'undefined') {
			deferred.reject(false);
		}
		else {
			deferred.resolve(true);
		}
		return deferred.promise;
	}
}

module.exports = Twitter;