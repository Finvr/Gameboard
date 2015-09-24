var express           = require('express'),
    parse             = require('body-parser'),
    Utils             = require('./utils/helpers.js'),
    passport          = require('passport'),
    FacebookStrategy  = require("passport-facebook").Strategy,
    config            = require('./oauth.js'),
    sessions          = require('cookie-session'),
    logger            = require('morgan'),
    userController    = require('./controllers/userController.js'),
    router            = require('routes.js'),
    app               = express(),


//Middleware
app.use(parse.urlencoded({extended: true}));
app.use(parse.json());
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
app.use(logger('dev'));

passport.serializeUser(function(user, done){
  console.log('passport serializeUser user: ', user)
  done(null, user);
});

passport.deserializeUser(function(userId, done){
  done(null, userId);
});

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

//Passport routes
app.get('/auth/facebook', 
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {failureRedirect: '/'}), 
  function (req, res) {
    userController.findOrCreateUser(req, res);
  });

//Other routes
app.use('/', router); 

var port = 3000

if(process.env.NODE_ENV === 'test') {
}
  app.listen(port, function() {
    console.log("Listening to localhost, port #: ", + port);
  });