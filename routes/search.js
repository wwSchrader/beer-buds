const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const yelp = require('yelp-fusion');
const Bar = require('../models/bar');
const asyncLibrary = require('asyncawait/async');

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
        let barsToSend = [];
        let searchResultsArray = response.jsonBody.businesses;
        // reformat array to send only the parts that will be used on the site
        let responseResultsArray = searchResultsArray.map((bar) => {
          let currentUserGoing = false;
          let usersGoing = 0;
          console.log("bar id:" + bar.id);
          return Bar.findOne({barId: bar.id}, (err, barFromDatabase) => {
            if (err || !barFromDatabase) {
              console.log("user not going");
              currentUserGoing = false;
              usersGoing = 0;
            } else {
              console.log("user going");
              usersGoing = barFromDatabase.usersGoing.length;
              if (barFromDatabase.usersGoing.includes(req.body.username)) {
                currentUserGoing = true;
              }
            }
            console.log(bar);
            console.log(barFromDatabase);
            barsToSend.push({
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
              isThisWorking: true,
            });
          });
        });

        Promise.all(responseResultsArray).then(() => {
          res.json(barsToSend);
        });
      });
    }).catch((e) => {
      console.log(e);
    });
});

module.exports = router;
