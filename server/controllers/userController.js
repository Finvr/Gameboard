var Users = require ('../models/userModel.js')
var Reviews = require ('../models/reviewsModel.js')

module.exports = {

  checkAuth: function (req, res, next) {
    if (!req.user) {
      res.status(403).send('User is not logged in!')
    }
    Users.find(req.user)
      .then(function (res) {
        if (res.length !== 0) {
          next();
        } else {
          res.send("User does not exist!")
        }
      })
      .catch(function (err) {
        console.log("err in checkAuth: ", err);
        res.send("User does not exist!");
      })
  },

  logout: function (req, res) {
    req.logout();
    res.sendStatus(200);
  },

  loggedIn: function (req, res) {
    res.sendStatus(200);
  },

  getMyProfile: function (req, res) {
    var profile;
    Users.find(req.user)
      .then(function (result) {
        profile = result[0];
        return module.exports.getRatingByUserId(profile.id)
      })
      .then(function(result){
        profile.reviews = result;
        res.send(profile);
      })
  }, 

  getProfile: function (req, res) {
    var userId = parseInt(req.url.split('/')[2]);
    return Users.find(userId)
      .then(function (result) {
        if ( result.length === 0 ) {
          res.send(404)
        } else {
          delete result[0].facebook_id;
          delete result[0].facebook_token;
          module.exports.getRatingByUserId(userId)
            .then(function(review){
              result[0].reviews = review;
              res.send(result[0]);
            })
        }
      })
      .catch(function (err) {
        console.log("Get profile error: ", err)
        res.status(500).send(err.message);
      })
  },

  getRatingByUserId: function(id) {
    return Reviews.getRatingByUserId(id)
      .then(function(result){
        return result;
      })  
  },

  updateProfile: function (req, res) {
    if ( req.user !== req.body.id ) {
      res.status(403).send("Invalid user object")
    } else {
      Users.updateProfile(req.body)
        .then(function () {
          res.send(200);
        })
        .catch(function (err) {
          res.status(500).send(err.message);
        });
    }
  },

  getAllUsers: function (req, res) {
    Users.fetchAll()
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (err) {
        res.status(500).send(err.message);
      })
  }

}

