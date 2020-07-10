var express = require('express');
var router = express.Router();

// auth login
router.get('/login', (req, res, next) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res,next) => {
    // handle with passport
    res.send('logging out');
    
});

// auth with google+
router.get('/google', (req, res,next) => {
    // handle with passport
    res.send('logging in with Google');
});

module.exports = router;