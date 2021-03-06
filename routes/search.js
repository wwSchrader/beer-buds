const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const yelp = require('yelp-fusion');
const Bar = require('../models/bar');

/* GET yelp search listings. */
router.get('/', function(req, res, next) {
  const client = yelp.client(process.env.YELP_SECRET);

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
      // find matching bar in database of users going.
      return Bar.findOne({barId: bar.id}, (err, barFromDatabase) => {
        if (err || !barFromDatabase) {
          currentUserGoing = false;
          usersGoing = 0;
        } else {
          usersGoing = barFromDatabase.usersGoing.length;
          // if user is not logged in
          if (req.user === undefined) {
            currentUserGoing = false;
          } else if (
            barFromDatabase.usersGoing.includes(req.user.username)) {
            currentUserGoing = true;
          }
        }
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
        });
      });
    });

    Promise.all(responseResultsArray).then(() => {
      res.json(barsToSend);
    });
  }).catch((err) => console.log('Error in search api: ' + err));
});

module.exports = router;
