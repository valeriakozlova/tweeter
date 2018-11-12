"use strict";

// Defines helper functions for saving and getting tweets and users, using the database `db`
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
      },

    //Saves a user to `db`
    saveUser: function(newUser, callback) {
      db.collection("users").insertOne(newUser, function(err) {
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    },

    // Find a user in "db"
    getUser: function(handle, callback) {
      console.log("handle:",  handle);
      db.collection("users").findOne({handle: handle}).then((user) => {
        console.log("Retrieved user", user);
        callback(user);
      });
    }

  }
}
