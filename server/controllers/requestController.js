var Requests = require ('../models/requestsModel.js'),
    helpers  = require ('../utils/helpers.js');

module.exports = {

  getUserRequests: function (req, res) {
    //Return all requests created by the logged-in user
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
    //Return all requests for a gamepost
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
    //Create a new request
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

  deleteRequest: function (req, res, next) {
    //Cancel a request
    var request = req.body;
    console.log("request serevr", req.data);
    if ( request.id !== parseInt(req.url.split('/')[2]) ) {
      res.send(400, 'Invalid request object');
    } else {
      Requests.deleteRequest(request)
        .then(function () {
          if ( request.status === 'accepted' || request.status === 'pending' ) {
            //Go to gamePostsController.removePlayer
            next()
          } else {
            res.send(200);    
          }
        })
        .catch(function (err) {
          helpers.handleError(err, res)
        }) 
    }
  },

  changeStatus: function (req, res, next) {
    //Change the status of a request to accepted or declined
    var request = req.body;
    
    if ( request.id !== parseInt(req.url.split('/')[2]) ) {
      res.send(400, 'Invalid request object');
    } else if ( request.status === 'accepted' || request.status === 'declined') {
      Requests.changeStatus(request)
        .then(function () {
          //Go to gamePostsController.addPlayer
          next();
        })
        .catch(function (err) {
          helpers.handleError(err, res)
        })
    } else {
      res.send(400, 'Invalid status');
    }
  },

  declineAll: function (req, res) {
    //After a gamepost is cancelled, set all associated requests to declined
    var gamepostId = parseInt(req.url.split('/')[2]);
    Requests.declineAll(gamepostId)
      .then(function () {
        res.send(200);
      })
      .catch(function (err) {
        helpers.handleError(err, res)
      });
  }

}
