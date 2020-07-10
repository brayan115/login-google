const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys=require('./key')

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  },(accessToken, refreshToken, profile, done)=>{
    console.log('passport callback function fired');
    console.log(profile);
  })
);
/*
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
*/ 