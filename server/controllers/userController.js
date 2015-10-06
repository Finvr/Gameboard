var Users = require ('../models/userModel.js')

module.exports = {

  checkAuth: function (req, res, next) {
    if (!req.user.id) {
      res.status(403).send('User is not logged in!')
    }
    Users.find(req.user.id)
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
    delete req.user.facebook_id;
    delete req.user.facebook_token;
    res.send(req.user);
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
          res.send(result[0]);
        }
      })
      .catch(function (err) {
        console.log("Get profile error: ", err)
        res.send(500, err.message);
      })
  },

  updateProfile: function (req, res) {
    if ( req.user.id !== req.body.id ) {
      res.send(403)
    } else {
      Users.updateProfile(req.body)
        .then(function () {
          res.send(200);
        })
        .catch(function (err) {
          res.send(500, err);
        });
    }
  }

}
