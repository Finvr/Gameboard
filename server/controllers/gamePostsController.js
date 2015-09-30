var GamePosts = require ('../models/gamePostsModel.js'),
    helpers   = require ('../utils/helpers.js');

module.exports = {
  
  getAllGameposts: function (req, res) {
    //Return all gameposts
    GamePosts.getAll()
      .then(function (data) {
        res.send(data);
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  createGamepost: function (req, res) {
    //Create a new gamepost
    var gamepost = req.body;
    gamepost.host_id = req.user;
    gamepost.pending_requests = 0;
    gamepost.accepted_players = 1;

    GamePosts.create(gamepost)
      .then(function (data) {
        res.send(data);
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  getUserGamePosts: function (req, res) {
    //Get gameposts created by the logged-in user
    var userId = req.user;

    GamePosts.getAll(userId)
      .then(function (data) {
        res.send(data);
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  deleteGamePost: function (req, res, next) {
    //Cancel a gamepost
    var gamepostId = parseInt(req.url.split('/')[2]); //for "/gameposts/123", gamepostID === 123
    var userId = req.user;

    GamePosts.deleteGamePost(gamepostId, userId)
      .then(function () {
        //Go to requestController.declineAll
        next();
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  addPendingRequests: function (req, res, next) {
    //Called before requestController.createRequest to increment pending_requests property
    var gamepostId = parseInt(req.url.split('/')[2]);

    GamePosts.addPending(gamepostId)
      .then(function () {
        //Go to requestController.createRequest
        next();
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  addPlayer: function (req, res) {
    //Decrement pending_requests and then increase accepted_players if request accepted
    var gamepostId = req.body.gamepost_id;
    
    return GamePosts.reducePending(gamepostId)
      .then(function () {
        if ( req.body.status === "accepted" ) {
          return GamePosts.addPlayer(gamepostId);
        } else { 
          return null ;
        }
      })
      .then(function () {
            res.send(200);         
      })
  },

  removePlayer: function (req, res) {
    //Decrement accepted_players or pending_requests after a request is cancelled
    var gamepostId = req.body.gamepost_id;
    var request = req.body;
    if ( request.status === 'accepted' ) {
      return GamePosts.removePlayer(gamepostId)
        .then(function () {
          res.send(200);
        })
    } else {
      return GamePosts.reducePending(gamepostId)
        .then(function () {
          res.send(200);
        })
    }
  }

}
