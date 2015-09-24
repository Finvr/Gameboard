var userController = require('./controllers/userController.js'),
    gameController = require('./controllers/gamePostsController.js'),
    passport          = require('passport');

var express = require('express');
var router = express.Router();



//Passport routes
router.get('/auth/facebook', 
  passport.authenticate('facebook'));


router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {failureRedirect: '/'}), 
  function (req, res) {
    userController.findOrCreateUser(req, res);
  });

// user routes
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/')
})

router.get('/me', function (req, res) {
  res.send('Authenticate the session');
})

router.get('/me/gameposts', gameController.getUserGamePosts); 

//GamePosts Routes
router.get('/gameposts', gameController.getAllGameposts);

router.post('/gameposts', gameController.createGamepost);

module.exports = router;



