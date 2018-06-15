const mongoose = require('mongoose');
const { Schema } = mongoose ;
const Product = require('./Products');
const User = require('./User');

const orderSchema = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'User'},
    quantity : { type : Number, default : 1},
    total_price : Number,
    product : { type: Schema.Types.ObjectId, ref: 'Product' },
    orderDate : { type: Date ,  default: Date.now}
});

module.exports =  mongoose.model('Order', orderSchema);