const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({message: 'Express IS connected.'});
});

router.put('/register', function(req, res, next) {

})

module.exports = router;
