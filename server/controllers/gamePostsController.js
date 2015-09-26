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
        console.log('gamepost: ', data)
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
  },

  deleteGamePost: function (req, res){
    var gamepostId = parseInt(req.url.split('/')[2]) //for "/gameposts/123", gamepostID === 123
    var userId = req.user;
    GamePosts.deleteGamePost(gamepostId, userId)
      .then(function (){
        res.send(200);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  },

  

}