var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
const yelp = require('yelp-fusion');


/* GET yelp search listings. */
router.get('/', function(req, res, next) {
    yelp.accessToken(process.env.YELP_ID, process.env.YELP_SECRET).then(response => {
      const client = yelp.client(response.jsonBody.access_token);

      client.search({
        term:'bars',
        location: 'San Francisco, CA'
      }).then(response => {
        console.log("Received yelp results");
        res.json(response.jsonBody.businesses);
      });
    }).catch(e => {
      console.log(e);
    });
});


module.exports = router;