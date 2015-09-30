var GamePosts = require ('../models/gamePostsModel.js');
var helpers = require ('../utils/helpers.js');

module.exports = {
  
  getAllGameposts: function (req, res) {
    GamePosts.getAll()
      .then(function (data) {
        res.send(data);
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  createGamepost: function (req, res) {
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
    var userId = req.user;
    GamePosts.getAll(userId)
      .then(function (data) {
        res.send(data);
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  deleteGamePost: function (req, res) {
    var gamepostId = parseInt(req.url.split('/')[2]) //for "/gameposts/123", gamepostID === 123
    var userId = req.user;
    GamePosts.deleteGamePost(gamepostId, userId)
      .then(function () {
        res.send(200);
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  addPendingRequests: function (req, res, next) {
    var gamepostId = parseInt(req.url.split('/')[2])
    GamePosts.addPending(gamepostId)
      .then(function () {
        next();
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  addPlayer: function (req, res) {
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