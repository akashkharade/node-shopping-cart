const mongoose = require('mongoose');
const { Schema } = mongoose ;

const Users = new Schema({
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

module.exports =  mongoose.model('users', Users);
