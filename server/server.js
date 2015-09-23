var express = require('express'),
    parse   = require('body-parser'),
    Utils   = require('./utils/helpers.js');
var express = require('express');
var parse = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require("passport-facebook").Strategy;
var config = require('./oauth.js');

var app = express();

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
    callbackURL: config.facebook.callbackURL
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
