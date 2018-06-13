const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose   = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
    console.log('serializeUser called');
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser called');
    const user = await User.findById(id);
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser =  await User.findOne({googleId : profile.id});
    if(existingUser){
      console.log('User Alreay registered ')
      done(null,existingUser);
    }else{
      const user = new User();
      user.googleId = profile.id;
      user.firstName = profile.name.givenName;
      user.lastname = profile.name.familyName;
      user.wallet_balance = keys.wallet_balance;
      user.email = profile.emails[0].value;
      const createdUser = await user.save();
      done(null,createdUser);
    }  
  }
));