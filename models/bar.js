const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barSchema = new Schema({
  barId: String,
  usersGoing: [],
});

module.exports = mongoose.model('bars', barSchema);
