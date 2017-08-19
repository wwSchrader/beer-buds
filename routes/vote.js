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

module.exports = router;
