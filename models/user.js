const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  userpassword: String,
});

module.exports = mongoose.model('users', userSchema);
