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
    callbackURL: console.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("passport use FacebookStr profile: ", profile);
    return done(err, profile)
    }
));

app.use(parse.urlencoded({extended: true}));
app.use(parse.json());
app.use(express.static(__dirname + '/../client'));

var port = 3000
app.listen(port, function() {
  console.log("Listening to localhost, port #: ", + port);
});