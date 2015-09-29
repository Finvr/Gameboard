var Requests = require ('../models/requestsModel.js')
var helpers = require ('../utils/helpers.js');

module.exports = {

  getUserRequests: function (req, res) {
  	  var userId = req.user

      Requests.getRequestsByUserId(userId)
      .then(function (data) {
        res.send(data);
      })
      .catch(helpers.handleError(err, res));
    },

  getGamePostRequests: function (req, res) {
  	  var gamepostId = parseInt(req.url.split('/')[2])

      Requests.getRequestByGameId(gamepostId)
      .then(function (data) {
        res.send(data);
       })
      .catch(helpers.handleError(err, res))
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
  	 .catch(helpers.handleError(err, res))
  },

  deleteRequest: function (req, res) {
    var request = req.data;//check this
    Requests.deleteRequest(request)
      .then(function (data) {
        res.send(data);
      })
      .catch(helpers.handleError(err, res))
  }
}
