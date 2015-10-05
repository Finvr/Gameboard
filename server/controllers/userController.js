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
    res.send(req.user);

    // return r({
    //   uri: 'https://graph.facebook.com/v2.2/'
    //     + req.user.facebook_id 
    //     + '?access_token='
    //     + req.user.facebook_token
    //     + '&fields=id,name,picture',
    //   method: 'GET'
    // })
    //   .then(function(response) {
    //     response = JSON.parse(response);
    //     var profile = {};
    //     profile.name = response.name;
    //     profile.picture = response.picture.data.url
    //     res.send(profile);
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //     res.send(500, err.message);
    //   })
  } 

}
