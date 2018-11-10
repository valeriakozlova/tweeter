"use strict";

const userHelper    = require("../lib/util/user-helper")
const express       = require('express');
const usersRoutes  = express.Router();

module.exports = function(DataHelpers) {

usersRoutes.post("/register", function(req, res) {

  console.log(req.body);

   if (!req.body.name || !req.body.handle || !req.body.email || !req.body.password) {
      res.status(400).json({ error: 'All fields must be filled in'});
      return;
    }

//need to make sure the user hasn't previously been registered
//need to add encrypted password

  function generateRandomString () {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < 6; i++) {
      randomString += alphabet[Math.floor(Math.random()*36)];
    }
    return randomString;
  }

  const userID = generateRandomString();

    const user = {
      "name": req.body.name,
      "id": userID,
      "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": req.body.handle,
      "email": req.body.email,
      "password": req.body.password
    }

    DataHelpers.saveUser(user, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        req.session.user_id = req.body.name;

        res.status(201).redirect("/");
      }
    });
  });

 usersRoutes.post("/login", function(req, res) {

  if (!req.body.email || !req.body.password) {
    res.status(400).json({ error: 'All fields must be filled in'});
    return;
  }
    DataHelpers.getUsers((err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(users);
      }
    });
  });

  return usersRoutes;

}

