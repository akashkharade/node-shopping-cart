var mongoose   = require('mongoose');
var config = require('../config/appConfig');
function MongoDB(){
}

MongoDB.prototype.init = function(){
    var MongoDB = mongoose.connect(config.db.connection).connection;;
  /*  MongoDB.on('error', function(err) { console.log(err.message); });
    MongoDB.once('open', function() {
      console.log("mongodb connection open");
    });*/
  
}

module.exports = MongoDB;