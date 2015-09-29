var Requests = require ('../models/requestsModel.js')
var helpers = require ('../utils/helpers.js');

module.exports = {

  getUserRequests: function (req, res) {
  	  var userId = req.user

      Requests.getRequestsByUserId(userId)
      .then(function (data) {
        res.send(data);
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
    },

  getGamePostRequests: function (req, res) {
  	  var gamepostId = parseInt(req.url.split('/')[2])

      Requests.getRequestByGameId(gamepostId)
      .then(function (data) {
        res.send(data);
       })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  createRequest: function (req, res) {
  	 var request = req.body;
     request.user_id = req.user;
     request.gamepost_id = parseInt(req.url.split('/')[2]);
     request.status = "pending";

     Requests.create(request)
  	 .then(function (data) {
       res.send(data);
     })
  	 .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  deleteRequest: function (req, res) {
    var request = req.data;//check this
    Requests.deleteRequest(request)
      .then(function (data) {
        res.send(data);
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      })
  },

  changeStatus: function (req, res, next) {
    var request = req.data;
    request.id = parseInt(req.url.split('/')[2]);
    if ( request.status === 'accepted' ) {
      Requests.changeStatus(request)
        .then(function() {
          //if request is accepted, we need to also modify the accepted_players
          //attribute in gameposts.
          next();
        })
        .catch(function(err) {
          console.log(err);
          res.send(err.message);
        })
    } else if ( request.status === 'declined' ) {
      Requests.changeStatus(request)
        .then(function() {
          res.send(200);
        })
        .catch(function (err) {
          helpers.handleError(err, res)
      })
    } else {
      res.send(400, 'Invalid status');
    }
  }

}
