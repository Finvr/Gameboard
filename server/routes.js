var userController    = require('./controllers/userController.js'),
    gameController    = require('./controllers/gamePostsController.js'),
    requestController = require('./controllers/requestController.js'),
    passport          = require('passport');

var express = require('express');
var router = express.Router();

var checkAuth = userController.checkAuth;

//Passport routes
router.get('/auth/facebook', 
	passport.authenticate('facebook'));

router.get('/auth/facebook/callback', 
	passport.authenticate('facebook', {failureRedirect: '/'}), 
	function(req, res) {
    res.redirect('/#/create-game')
  });

// user routes
router.get('/me/logout', checkAuth, userController.logout)

router.get('/me', checkAuth, userController.loggedIn);

router.get('/me/gameposts', checkAuth, gameController.getUserGamePosts); 

router.get('/me/requests', checkAuth, requestController.getUserRequests);

//GamePosts Routes
router.get('/gameposts', checkAuth, gameController.getAllGameposts);

router.post('/gameposts', checkAuth, gameController.createGamepost);

router.delete('/gameposts/*', checkAuth, gameController.deleteGamePost);

//requests routes
//get all requests for a user
router.get('/requests', checkAuth, requestController.getAll);
//get all requests for a gamepost
router.get('/requests/*', checkAuth, requestController.getGamePostRequests);
//generate a request
router.post('/requests', checkAuth, requestController.createRequest);
//delete a request
router.delete('/requests/*', checkAuth, requestController.deleteRequest)

module.exports = router;



