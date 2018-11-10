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

    // Get all users in "db"
    getUsers: function(callback) {
        db.collection("users").find().toArray((err, users) => {
          if (err) {
            return callback(err);
          }
          callback(null, users);
        });
    },

    getUser: function(email, callback) {
      console.log("email:",  email);
      db.collection("users").findOne({email: email}).then((user) => {
        console.log("Retrieved user", user);
        callback(user);
      });
    }

  }
}
