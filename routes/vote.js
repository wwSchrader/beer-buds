const express = require('express');
const router = express.Router();
const Bar = require('../models/bar');
const {ensureAuthenticated} = require('../library');

/* Put bar and vote into listing. */
router.put('/add', ensureAuthenticated, function(req, res, next) {
  // add to database here
  Bar.update(
    {barId: req.body.barId},
    {$push: {usersGoing: req.user.username}},
    {upsert: true},
    function(err, bar) {
      if (err) {
        res.send(500);
      } else {
        res.send(200);
      }
    });
  });

/* Update bar to remove user from usergoing list */
router.put('/decreasevote', ensureAuthenticated, function(req, res, next) {
  // find bar in database first
  Bar.findOne({barId: req.body.barId}, function(err, bar) {
    if (!bar) {
      res.json({'ERROR': err});
    }
    // if found, update list
    let userIndex = bar.usersGoing.indexOf(req.user.username);
    if (userIndex > -1) {
      bar.usersGoing.splice(userIndex, 1);
    }
    bar.save(function(err) {
      if (err) {
        res.json({'ERROR': err});
      } else {
        res.json({'UPDATED': bar});
      }
    });
  });
});

module.exports = router;
