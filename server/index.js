"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient} = require("mongodb");
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";
const cookieSession = require('cookie-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: "session",
  keys: ["123"],
  maxAge: 24 * 60 * 60 * 1000
}));

MongoClient.connect(MONGODB_URI, (err, db) => {

  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  const usersRoutes = require("./routes/users")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.use("/users", usersRoutes);

});

app.listen(PORT, () => {
  console.log("Tweeter app listening on port " + PORT);
});
