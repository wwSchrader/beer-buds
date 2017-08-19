var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var barSchema = new Schema({
  barId: String,
  usersGoing: []
});

module.exports = mongoose.model('bars', barSchema);