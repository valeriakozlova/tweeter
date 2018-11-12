"use strict";

//The code below is to enable user registration feature

const userHelper    = require("../lib/util/user-helper")
const express       = require('express');
const usersRoutes   = express.Router();
const bcrypt        = require('bcrypt');
const cookieSession = require('cookie-session');

module.exports = function(DataHelpers) {

  usersRoutes.post('/register', function(req, res) {

    if (!req.body.name || !req.body.handle || !req.body.password) {
      res.status(400).json({ error: 'All fields must be filled in'});
      return;
    }

    DataHelpers.getUser(req.body.handle, (user) => {
      if (user) {
        res.status(400).json({ error:'You already have an account or the handle you have entered is taken by another user'});
        return;
      }
    });

    const user = {
      name: req.body.name,
      avatars: {
        small:   'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png',
        regular: 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png',
        large:   'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png'
      },
      handle: `@${req.body.handle}`,
      password: bcrypt.hashSync(req.body.password, 10)
    }

    DataHelpers.saveUser(user, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        req.session.handle = req.body.handle;
        res.status(201).redirect('/');
      }
    });
  });

  usersRoutes.post('/login', function(req, res) {
    if (!req.body.handle || !req.body.password) {
      res.status(400).json({ error: 'All fields must be filled in'});
      return;
    }
    DataHelpers.getUser(req.body.handle, (user) => {
      if (!user) {
        res.status(500).json({ error:"User not found" });
      } else if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.handle = req.body.handle;
        res.status(201).json(req.body.handle);
      } else {
        res.status(400).json({ error:"Incorrect password"})
      }
    });
  });

  usersRoutes.post('/logout', function(req, res) {
    req.session = null;
    res.status(201).redirect('/');
  });

  return usersRoutes;

}

