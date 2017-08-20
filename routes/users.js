const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 12;

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

module.exports = router;
