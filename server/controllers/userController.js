var Users = require ('../models/userModel.js')

module.exports= {

  findOrCreateUser: function (req, res) {
    var user = req.user;
    Users.findOrCreate(user)
      .then(function (facebookId){
        res.redirect('/#/create-game')
      })
      .catch(function(err){
        console.log("err from findOrCreateUser: ",err);
        res.send(err.message);
      })
  },

  checkAuth: function(req, res, next) {
    if (!req.user) {
      res.status(403).send('User is not logged in!')
    }
    Users.find(req.user)
      .then(function(res){
        if (res.length !== 0) {
          next();
        } else {
          res.send("User does not exist!")
        }
      })
      .catch(function(err) {
        console.log("err in checkAuth: ", err);
        res.send("User does not exist!");
      })
  },

  logout: function(req, res) {
    req.logout();
    res.send(200);
  },

  loggedIn: function(req, res) {
    res.send(200);
  }

}
