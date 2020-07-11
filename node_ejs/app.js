var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose =require('mongoose');
var bodyparser = require('body-parser');
var passport = require('passport')
var passportGoogleOauth20=require('passport-google-oauth20')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authsRouter = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/key');
var app = express();


//Conexion a la BD
//var mongoDB ='mongodb://localhost/newgymflex'

/*
mongoose.connect(mongoDB,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});*/
/*
mongoose.connect(keys.mongodb.dbURL,()=>{
  
  console.log('conectado a mongo db');

});*/
 
mongoose.connect(keys.mongodb.dbURL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console,'Error de conexion MongoDB'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



//Google

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
