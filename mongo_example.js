"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Refactored and wrapped as new, tweet-specific function:

function getTweets(callback) {
  db.collection("tweets").find().toArray((err, tweets) => {
    if (err) {
      return callback(err);
    }
    callback(null, tweets);
  });
}

  // ==> Later it can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay!

  getTweets((err, tweets) => {
    if (err) throw err;
    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });

});


// you'd define getTweets in one place and call it somewhere else entirely
//(probably a different file).
// What's important is that the connected db is in scope when getTweets is defined
// it doesn't matter about when it's called, because it's a closure.

// Using the Cursor rather than slurping data into an array would be better in some cases if
// you had a ton of data. For our purposes right now, it's not worth the bother.

// It's better to let the "end user" code deal with errors unless you are able to do something
// useful to recover from it.
// This callback is entirely pointless if you think about it: