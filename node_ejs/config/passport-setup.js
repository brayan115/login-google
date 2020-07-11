const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys=require('./key');

const User = require('../model/user');

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  },(accessToken, refreshToken, profile, done)=>{
    console.log('passport callback function fired');
    console.log(profile);
    new User({
      
      username:profile.dispalyName,
      googleId:profile.id
    }).save().then((newUser)=>{
      console.log('new user creado:'+newUser)
    })
  })
);
/*
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
*/ 