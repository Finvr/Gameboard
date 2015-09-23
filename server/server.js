var express = require('express');
var parse = require('body-parser');
var Utils   = require('./utils/helpers.js');
var passport = require('passport');
var FacebookStrategy = require("passport-facebook").Strategy;
var config = require('./oauth.js');

var app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
  console.log('passport serializeUser')
  done(null, user);
})

passport.deserializeUser(function(obj, done){
  console.log('passport deserializeUser')
  done(null, obj);
})

passport.use(new FacebookStrategy ({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: "http://localhost:3000/#/create-game"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("passport use FacebookStr profile: ", profile);
    return done(err, profile)
    }
));

app.use(parse.urlencoded({extended: true}));
app.use(parse.json());
app.use(express.static(__dirname + '/../client'));

//User Routes
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {failureRedirect: '/'}), 
  function (req, res) {
    console.log("hi")
    res.redirect('/create-game')
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
