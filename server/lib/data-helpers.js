"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {

      db.collection("tweets").insertOne(newTweet, function(err) {
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    },

    // Get all tweets in `db`
    getTweets: function(callback) {
        db.collection("tweets").find().toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          callback(null, tweets);
        });
      }
    };

}
