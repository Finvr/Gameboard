var Users = require ('../models/userModel.js')

module.exports= {

  createUser: function (req, res){
    var user = req.user;
    Users.create(user)
      .then(function (facebookId){
        res.send(facebookId);
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  }

}
