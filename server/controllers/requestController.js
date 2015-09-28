var Requests = require ('../models/requestsModel.js')

module.exports = {

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

  getGamePostRequests: function (req, res){
  	  var gamepostId = parseInt(req.url.split('/')[2])

      Requests.getRequestByGameId(gamepostId)
      .then(function (data){
        res.send(data);
       })
      .catch(function(err){
        console.log(err);
           res.send(err.message);
      })
  },

  createRequest: function (req, res){
  	 var request = req.body;
     request.user_id = req.user;
     request.gamepost_id = parseInt(req.url.split('/')[2]);
     request.status = "pending";

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
