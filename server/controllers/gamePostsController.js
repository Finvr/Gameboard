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
  }

}
