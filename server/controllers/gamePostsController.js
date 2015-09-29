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
    gamepost.has_pending_requests = false;
    gamepost.accepted_players = 0;
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

  setPendingRequests: function (req, res, next) {
    var gamepostId = parseInt(req.url.split('/')[2])
    GamePosts.setPending(gamepostId)
      .then(function () {
        next();
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  addPlayer: function (req, res) {
    var gamepostId = parseInt(req.url.split('/')[2])
    GamePosts.addPlayer(gamepostId)
      .then( function () {
        res.send(200);
      })
  },

  removePlayer: function (req, res) {
    var gamepostId = parseInt(req.url.split('/')[2])
    GamePosts.removePlayer(gamepostId)
      .then( function () {
        res.send(200);
      })
  }

}