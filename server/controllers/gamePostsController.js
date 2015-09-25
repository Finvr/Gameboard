var GamePosts = require ('../models/gamePostsModel.js');

module.exports = {
  
  getAllGameposts: function (req, res){
    GamePosts.getAll()
      .then(function (data){
        res.send(data);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  },

  createGamepost: function (req, res){
    var gamepost = req.body;
    gamepost.host_id = req.user;
    GamePosts.create(gamepost)
      .then(function (data){
        res.send(data);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  },

  getUserGamePosts: function (req, res){
    var userId = req.user;
    GamePosts.getAll(userId)
      .then(function(data){
        res.send(data);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  }

}