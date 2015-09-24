var Users = require ('../models/userModel.js')

module.exports= {

  findOrCreateUser: function (req, res){
    var user = req.user;
    Users.findOrCreate(user)
      .then(function (facebookId){
        res.redirect('/#/create-game')
      })
      .catch(function(err){
        console.log(err);
        res.send(err.message);
      })
  }

}
