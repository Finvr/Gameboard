var db = require ('../db.js')

module.exports = {

create: function (user){
  return db('users')
    .insert(user)
    .returning("facebook_id")
    .then(function(facebookId){
      console.log(facebookId);
      return facebookId;
    })
    .catch(function(err){
      console.log(err);
      return err;
    })
  },
}
