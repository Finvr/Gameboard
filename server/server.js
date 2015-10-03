var express           = require('express'),
    parse             = require('body-parser'),
    Utils             = require('./utils/helpers.js'),
    passport          = require('passport'),
    FacebookStrategy  = require("passport-facebook").Strategy,
    sessions          = require('cookie-session'),
    //logger            = require('morgan'),
    router            = require('./routes.js'),  
    app               = express(),
    Users             = require ('./models/userModel.js');

if (!process.env.FACEBOOK_APP_ID) {
  var config = require('./oauth.js');
}

//Middleware
app.use(parse.urlencoded({extended: true}));
app.use(parse.json());
//app.use(logger('dev'));
app.use(express.static(__dirname + '/../client'));

//Passport Middleware
app.use(sessions({
  name: 'imgame:session',
  secret: process.env.SESSION_SECRET || 'development',
  secure: (!! process.env.SESSION_SECRET),
  signed: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(userId, done){
  Users.find(userId)
    .then(function(result) {
      var user = result[0];
      done(null, user);
    })
    .catch(function(err) {
      done(null, null);
    })
});

passport.use(new FacebookStrategy ({
    // clientID: config.facebook.FACEBOOK_APP_ID,
    clientID: process.env.FACEBOOK_APP_ID || config.facebook.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET ||config.facebook.FACEBOOK_SECRET,
    callbackURL: process.env.callbackURL ||config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var user = {
      username: profile.displayName, 
      facebook_id: profile.id, 
      facebook_token: accessToken
    }
    Users.findOrCreate(user)
      .then(function(user){
        return done(null, user);
      })
      .catch(function(err){
        console.log("err from findOrCreateUser: ",err);
        res.send(err.message);
      })
    }
));

// Router
app.use('/', router); 

module.exports = app;

// Initialize Server
var port = process.env.PORT || 3000;

if(process.env.NODE_ENV === 'test') {
  port = 8000;
}

app.listen(port, function() {
  console.log("Listening to localhost, port #: ", + port);
});