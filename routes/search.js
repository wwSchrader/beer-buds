const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const yelp = require('yelp-fusion');


/* GET yelp search listings. */
router.get('/', function(req, res, next) {
  yelp.accessToken(process.env.YELP_ID, process.env.YELP_SECRET)
    .then((response) => {
      const client = yelp.client(response.jsonBody.access_token);

      client.search({
        term: 'bars',
        location: req.query.searchterm,
      }).then((response) => {
        let searchResultsArray = response.jsonBody.businesses;
        // reformat array to send only the parts that will be used on the site
        let responseResultsArray = searchResultsArray.map((bar) => {
          return {
            category: bar.category,
            id: bar.id,
            name: bar.name,
            price: bar.price,
            image_url: bar.image_url,
            rating: bar.rating,
            url: bar.url,
            usersGoing: 0,
            currentUserGoing: false,
          };
        });
        res.json(responseResultsArray);
      });
    }).catch((e) => {
      console.log(e);
    });
});

module.exports = router;
