const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose   = require('mongoose');
const User = mongoose.model('User');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser =  await User.findOne({googleId : profile.id});
    if(existingUser){
      done(null,existingUser);
      console.log('User Alreay registered ')
    }else{
      const createdUser = await new User({ googleId : profile.id }).save();
      done(null,createdUser);
    }  
  }
));