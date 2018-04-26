var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Walets   = new Schema({
    userid: String,
    amount:Number,
    
});

module.exports = mongoose.model('Walet', Walets);