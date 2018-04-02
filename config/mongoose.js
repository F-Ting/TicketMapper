var mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(process.env.MONGODB_URI);
  require('../model/user_model');
  return db;
};
