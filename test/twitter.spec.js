var chai = require('chai'),
	expect = chai.expect,
	assert = chai.assert,
	mocha = require('mocha'),
	Twitter = require('../twitter.js');

var consumer_key = process.env.TWITTER_CONSUMER_KEY;
var consumer_secret = process.env.TWITTER_CONSUMER_SECRET;


describe("Twitter Client", function () {
	describe("building a twitter client", function () {
		it("should return an instance of the library", function () {
			var twitter = new Twitter({
				'consumer_key': consumer_key,
				'consumer_secret': consumer_secret
			});
			expect(twitter).to.be.an.instanceOf(Twitter);
			assert.typeOf(twitter.tweetsByUser, 'function');
			assert.typeOf(twitter.tweetsByHashtag, 'function');
		});
	});

	describe("api functions", function () {
		var twitter, screenName, hashtag, hashtagValue, numOfTweets;

		before(function () {
			twitter = new Twitter({
				'consumer_key': consumer_key,
				'consumer_secret': consumer_secret
			});
			screenName = 'gjlniu';
			hashtagValue = 'NIU';
			hashtag = '%23NIU';
			numOfTweets = 5;
		});

		describe("get tweets by user", function () {
			it("should return a json object of tweets", function (done) {
				twitter.tweetsByUser(screenName, numOfTweets).then(function (tweets) {
					var actualScreenName = tweets[0].user.screen_name;
					assert.lengthOf(tweets, numOfTweets);
					assert.equal(actualScreenName, screenName);
					done();
				});
			})
		});

		describe("get tweets by hashtag", function () {
			it("should return a json object of tweets", function (done) {
				twitter.tweetsByHashtag(hashtag, numOfTweets).then(function (tweets) {
					console.log(tweets);
					// var hashtags = tweets.statuses[0].entities.hashtags;
					// var hashtagsToTest = [];
					// for (var i = 0; i < hashtags.length; i++) {
					// 	var hashtag = hashtags[i];
					// 	hashtagsToTest.push(hashtag.text);
					// }
					// assert.lengthOf(tweets.statuses.length, numOfTweets);
					// assert.include(hashtagsToTest, hashtagValue);
					done();
				});
			})
		});
	});
});