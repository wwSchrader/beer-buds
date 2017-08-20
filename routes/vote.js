const express = require('express');
const router = express.Router();
const Bar = require('../models/bar');


/* Put bar and vote into listing. */
router.put('/add', function(req, res, next) {
  // add to database here
  let newBar = new Bar({
    barId: req.body.barId,
    usersGoing: [req.body.usersGoing],
  });
  newBar.save(function(err) {
    if (err) {
      res.json({'ERROR': err});
    } else {
      res.json({'SUCCESS': newBar});
    }
  });
});

/* Update bar to remove user from usergoing list */
router.put('/decreasevote', function(req, res, next) {
  // find bar in database first
  Bar.findOne({barId: req.body.barId}, function(err, bar) {
    if (!bar) {
      res.json({'ERROR': err});
    }
    // if found, update list
    let userIndex = bar.usersGoing.indexOf(req.body.usersLeaving);
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
