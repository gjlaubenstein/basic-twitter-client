var chai = require('chai'),
	expect = chai.expect,
	assert = chai.assert,
	mocha = require('mocha'),
	Twitter = require('../twitter.js');

var consumer_key = process.env.TWITTER_CONSUMER_KEY;
var consumer_secret = process.env.TWITTER_CONSUMER_SECRET;


describe("Twitter Client", function () {
	console.log('key: ', consumer_key);
	describe("building a twitter client", function () {
		it("should return an instance of the library", function () {
			var twitter = new Twitter({
				'consumer_key': consumer_key,
				'consumer_secret': consumer_secret
			});
			assert.typeOf(twitter.tweetsByUser, 'function');
			assert.typeOf(twitter.tweetsByHashtag, 'function');
		});
	});
});