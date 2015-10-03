var Users   = require ('../models/userModel.js'),
    r = require('request-promise');

module.exports = {

  checkAuth: function (req, res, next) {
    console.log("checkAuth req.user: ", req.user)
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

  getFacebookInfo: function (req, res, next) {
    return Users.getToken(req.user.id)
      })
  }

}
