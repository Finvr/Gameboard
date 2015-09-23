var db = require ('../db.js')

module.exports = {

create: function (facebookId, username){
  return db('users').insert({facebook_id:facebookId, username:username})
  .then(function(user){
    console.log(user);
    return user;
  })
  .catch(function(err){
    console.log(err);
    return err;
  })
}








}

module.exports.create(1005, 'testUser');