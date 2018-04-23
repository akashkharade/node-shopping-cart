const mongoose = require('mongoose');
const { Schema } = mongoose ;

const userSchema = new Schema({
    username : String,
    password : String,
    firstName : String,
    lastname : String,
    userImgSrc : String,
    email : String,
    wallet_balance : Number,
    orders : [],
    address : []

});

mongoose.model('users', userSchema);