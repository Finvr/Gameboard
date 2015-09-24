var express = require('express');
var parse = require('body-parser');
var Utils   = require('./utils/helpers.js');
var passport = require('passport');
var FacebookStrategy = require("passport-facebook").Strategy;
var config = require('./oauth.js');
var sessions = require('cookie-session');
var logger = require('morgan');
var app = express();

var userController = require('./controllers/userController.js')

app.use(sessions({
  name: 'imgame:session',
  secret: process.env.SESSION_SECRET || 'development',
  secure: (!! process.env.SESSION_SECRET),
  signed: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));

passport.serializeUser(function(user, done){
  console.log('passport serializeUser user: ', user)
  done(null, user);
})

passport.deserializeUser(function(userId, done){
  done(null, userId);
})

passport.use(new FacebookStrategy ({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var user = {username: profile.displayName, facebook_id: profile.id}
    return done(null, user);
    }
));

app.use(parse.urlencoded({extended: true}));
app.use(parse.json());
app
app.use(express.static(__dirname + '/../client'));

//User Routes
app.get('/auth/facebook', 
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {failureRedirect: '/'}), 
  function (req, res) {
    userController.createUser(req, res);
  })

app.get('/users/logout', function(req, res) {
  req.logout();
  res.redirect('/')
})

app.post('/users', function (req, res){
  Utils.createUser(req, res);
})

app.get('/users/*', function (req, res){
  res.send('get one user')
})

app.put('/users/*',function (req, res){
  res.send('update a user')
})

app.delete('/users/*', function (req, res){
  res.send('delete a user')
})

app.get('/users/*/games', function(req, res){
  res.send('get the games for a specific user')
})

//GamePosts Routes
app.get('/gameposts', function(req, res){
  Utils.getAllGameposts(req, res);
})

app.post('/gameposts', function (req, res){
  Utils.createGamepost(req, res);
})



var port = 3000
app.listen(port, function() {
  console.log("Listening to localhost, port #: ", + port);
});
