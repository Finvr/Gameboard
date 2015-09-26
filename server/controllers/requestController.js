var Requests = require ('../models/userModel.js')

module.exports = {
	getAllRequests: function (req, res){
      Requests.getAll()
      .then(function (data){
        res.send(data);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  },

  getUserRequests: function (req, res){
  	var user = {id:1, username:Reagan Schiller, facebook_id:10206230787502131};
  	//var user = req.body

      Requests.getRequestsByUserId(user)
      .then(function (data){
        res.send(data);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  },

  getGamepostRequests: function (req, res){
      Requests.getAll()
      .then(function (data){
        res.send(data);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  },

  createRequest: function (req, res){
  	var userId = req.user;
  	var gamepostId = req.body.gamepost_id;
  	var comments = req.body.comments;


  	var request = {
  		user_id: userId,
  		gamepost_id: gamepostId,
  		comments: comments
    }
  	Requests.create(request)
  	.then(function(data){
  		res.send(data);
  	})
  	.catch(function(err){
  		console.log(err);
  		res.send(err.message);
  	})
  }


}

module.exports.getUserRequests()