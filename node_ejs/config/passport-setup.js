const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys=require('./key');

const User = require('../model/user');

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  },(accessToken, refreshToken, profile, done)=>{
    // verificar si un usuario ya existe  en la bd
    User.findOne({googleId:profile.id}).then((currentUser)=>{
      if(currentUser){
          //si el usuario es existente
          console.log('user is:',currentUser);

      }else{
        new User({
          //name:profile.name,
          username:profile.displayName,
          googleId:profile.id
        }).save().then((newUser)=>{
          console.log('new user creado:'+newUser)
        });

      }
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