const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/Keys');
require('./model/User');
const User = mongoose.model('users');

mongoose.connect(keys.mongoURI);

const app = express();


const PORT = process.env.PORT || 5000 ;
app.listen(PORT);