const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = function(passport) {
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.json({message: 'Express IS connected.'});
  });

  /* PUT user into database. */
  router.put('/register', (req, res, next) => {
    User.findOne({username: req.body.username}, (err, user) => {
      // check if user already in the database
      if (user) {
        // if user exist, return message stating it
        res.json({'REGISTERED': 'User is already registered.'});
      } else {
        // create password hash
        bcrypt.hash(req.body.password, saltRounds).then((hash) => {
          let newUser = new User({
            username: req.body.username,
            password: hash,
          });
          newUser.save((err) => {
            if (err) {
              res.json({'ERROR': err});
            } else {
              res.json({'REGISTERED': 'COMPLETE'});
            }
          });
        });
      }
    });
  });

  router.post('/login',
    passport.authenticate('local', {failWithError: true, flashFailure: true}),
    (req, res) => {
      // handle succesful authentication
      return res.json({isLoggedIn: true, userId: req.user._id});
    },
    (err, req, res, next) => {
      // handle failed authentication
      console.log('Something went wrong with auth');
      return res.status(401).json({authError: req.flash('authMessage')[0]});
    }
  );

  router.get('/logout', function(req, res) {
    req.logout();
    res.json({isLoggedIn: false});
  });

  router.get('/checkStatus', function(req, res) {
    if (req.isAuthenticated()) {
      return res.json({isLoggedIn: true, userName: req.user.username});
    } else {
      return res.json({isLoggedIn: false});
    }
  });

  return router;
};

