const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yelpApiTokenSchema = new Schema({
  accessToken: String,
  expirationDate: int,
});

module.exports = mongoose.model('yelpApiToken', yelpApiTokenSchema);
