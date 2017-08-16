var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var yelpApiTokenSchema = new Schema({
    accessToken: String,
    expirationDate: int
});

module.exports = mongoose.model('yelpApiToken', yelpApiTokenSchema);