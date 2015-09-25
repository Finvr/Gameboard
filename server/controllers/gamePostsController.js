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
    
    GamePosts.create(gamepost)
    
      .then(function (data){
        console.log('gamepost: ', gamepost)
        res.send(data);

      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  },

  getUserGamePosts: function (req, res){
    var facebookId = req.user.facebook_id;
    GamePosts.getAll(facebookId)
      .then(function(data){
        res.send(data);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  },

  deleteGamepost: function (req, res){
    
    GamePosts.deleteGamePost(gamepost)
      .then(function (data){
        res.send(data);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  }

}