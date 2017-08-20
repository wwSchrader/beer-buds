const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({message: 'Express IS connected.'});
});

module.exports = router;
