var Requests = require ('../models/requestsModel.js')

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
  	  var user = req.body

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
  	  var gamepost= req.data

      Requests.getRequestByGameId(gamepost)
      .then(function (data){
        console.log(data);
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

     Requests.create(request)
  	 .then(function(data){
  		 res.send(data);
     })
  	 .catch(function(err){
  		 console.log(err);
  		 res.send(err.message);
  	})
  },

  deleteRequest: function (req, res){
    var request = req.data;//check this
    Requests.deleteRequest(request)
      .then(function (data){
        res.send(data);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  }




}
