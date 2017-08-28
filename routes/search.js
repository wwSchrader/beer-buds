const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const yelp = require('yelp-fusion');
const Bar = require('../models/bar');


/* GET yelp search listings. */
router.get('/', function(req, res, next) {
  yelp.accessToken(process.env.YELP_ID, process.env.YELP_SECRET)
    .then((response) => {
      const client = yelp.client(response.jsonBody.access_token);

      client.search({
        term: 'bars',
        location: req.query.searchterm,
        limit: 50,
      }).then((response) => {
        let searchResultsArray = response.jsonBody.businesses;
        // reformat array to send only the parts that will be used on the site
        let responseResultsArray = searchResultsArray.map((bar) => {
          let currentUserGoing = false;
          let usersGoing = 0;
          Bar.findOne({barId: req.body.id}, (err, bar) => {
            if (err || !bar) {
              currentUserGoing = false;
              usersGoing = 0;
            } else {
              usersGoing = bar.usersGoing.length;
              if (bar.usersGoing.find(req.body.username)) {
                currentUserGoing = true;
              }
            }
          });
          return {
            category: bar.category,
            id: bar.id,
            name: bar.name,
            price: bar.price,
            image_url: bar.image_url,
            rating: bar.rating,
            url: bar.url,
            usersGoing: usersGoing,
            currentUserGoing: currentUserGoing,
            categories: bar.categories,
          };
        });
        res.json(responseResultsArray);
      });
    }).catch((e) => {
      console.log(e);
    });
});

module.exports = router;
