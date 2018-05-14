var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Products   = new Schema({
    name: String,
    imgName:String,
	category:String,
    describtion:String,
    price:Number
});

module.exports = mongoose.model('Product', Products);