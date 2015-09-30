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

//User routes
//Logout
router.get('/me/logout', 
  checkAuth, 
  userController.logout
);
//Authenticate
router.get('/me', 
  checkAuth, 
  userController.loggedIn
);
//Get all gameposts hosted by 'me'
router.get('/me/gameposts', 
  checkAuth, 
  gameController.getUserGamePosts
); 
//Get all requests created by 'me'
router.get('/me/requests', 
  checkAuth, 
  requestController.getUserRequests
);

//GamePosts Routes
//Get all gameposts
router.get('/gameposts', 
  gameController.getAllGameposts
);
//Create a new gamepost (host a game)
router.post('/gameposts', 
  checkAuth, 
  gameController.createGamepost
);
//Cancel a gamepost
router.delete('/gameposts/*', 
  checkAuth, 
  gameController.deleteGamePost,
  requestController.declineAll
);

//Get all requests for a gamepost
router.get('/gameposts/*/requests', 
  checkAuth, 
  requestController.getGamePostRequests
);

//Submit a request to join a specific gamepost
router.post('/gameposts/*/requests', 
  checkAuth, 
  gameController.addPendingRequests, 
  requestController.createRequest
);

//Requests routes
//Cancel a request
router.delete('/requests/*', 
  checkAuth, 
  requestController.deleteRequest,
  gameController.removePlayer
);

//Update the status of a request
router.put('/requests/*', 
  checkAuth, 
  requestController.changeStatus, 
  gameController.addPlayer
);

module.exports = router;



