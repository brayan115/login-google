const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "1071108359165-1kph99r0kqhbur2d1fl5shtmr5vh55fc.apps.googleusercontent.com",
    clientSecret: "wgscwNJ2PYkj9cohPb5w1P6C",
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));