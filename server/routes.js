var userController = require('./controllers/userController.js'),
    gameController = require('./controllers/gamePostsController.js'),
    passport          = require('passport');

var express = require('express');
var router = express.Router();

var checkAuth = userController.checkAuth;

//Passport routes
router.get('/auth/facebook', 
	passport.authenticate('facebook'));

router.get('/auth/facebook/callback', 
	passport.authenticate('facebook', {failureRedirect: '/'}), 
	userController.findOrCreateUser);

// user routes
router.get('/me/logout', checkAuth, userController.logout)

router.get('/me', checkAuth, function(req, res){
  res.send(200);
})

router.get('/me/gameposts', checkAuth, gameController.getUserGamePosts); 

//GamePosts Routes
router.get('/gameposts', checkAuth, gameController.getAllGameposts);

router.post('/gameposts', checkAuth, gameController.createGamepost);

module.exports = router;



