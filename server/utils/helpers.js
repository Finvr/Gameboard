var GamePosts = require ('../models/gamePostsModel.js');

module.exports = {
  
  getAllGameposts: function (req, res){
    //autentication
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
        res.send(data);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  }

}