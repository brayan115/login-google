const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys=require('./key');

const User = require('../model/user');


passport.serializeUser((user,done)=>{
  done(null,user.id);
}) 
passport.deserializeUser((id,done)=>{
  User. findById(id).then((user)=>{
    done(null,user);
  });
});

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  },(accessToken, refreshToken, profile, done)=>{
    // verificar si un usuario ya existe  en la bd
    console.log(profile);
    User.findOne({googleId:profile.id}).then((currentUser)=>{
      
      if(currentUser){
          //si el usuario es existente
          console.log('user is:',currentUser);
          done(null,currentUser);

      }else{
        new User({
          //name:profile.name,
          username:profile.displayName,
          googleId:profile.id,
          picture:profile.photos[0].value,
        }).save().then((newUser)=>{
          console.log('new user creado:'+newUser);
          done(null,newUser);
        });

      }
    });




  })
);
/*
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
*/ 