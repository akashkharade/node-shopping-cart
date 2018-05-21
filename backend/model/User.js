const mongoose = require('mongoose');
const { Schema } = mongoose ;

const productSchema = new Schema({
    name : String,
    description: String,
    imgSrc : String,
    isAvailable : Boolean,
    price : Number
});

const orderSchema = new Schema({
    quntity : { type : Number, default : 0},
    total_price : Number,
    products : [productSchema]
});

const userSchema = new Schema({
    username : String,
    password : String,
    firstName : String,
    lastname : String,
    userImgSrc : String,
    email : String,
    wallet_balance : Number,
    orders : [orderSchema],
    address : String

});

module.exports =  mongoose.model('User', userSchema);
