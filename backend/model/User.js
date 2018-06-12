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
    quantity : { type : Number, default : 1},
    total_price : Number,
    productId : String
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
    address : String,
    googleId : String
});

module.exports =  mongoose.model('User', userSchema);
