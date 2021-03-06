var express = require('express');
var router = express.Router();
var passport =require('passport')
// auth login
router.get('/login', (req, res, next) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res,next) => {
    // handle with passport
   // res.send('logging out');
   req.logout();
   res.redirect('/');
    
});

// auth with google+
router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

//callback
//A donde te lleva despues de registrarte

router.get('/google/redirect',passport.authenticate('google'), (req,res)=>{
    //res.send('you reached the callback')
    res.redirect('/profile');
});


module.exports = router;