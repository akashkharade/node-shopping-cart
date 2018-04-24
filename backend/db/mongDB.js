var mongoose   = require('mongoose');
var config = require('../config/appConfig');
var userModel  =  require('../model/User');
function MongoDB(){
  this.user = null;
}

MongoDB.prototype.init = function(){
    mongoose.connect(config.db.connection);
    this.user =  mongoose.model('user', userModel);
}

module.exports = MongoDB;