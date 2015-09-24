var db = require ('../db.js')

module.exports = {

  findOrCreate: function(user) {
    return module.exports.find(user)
      .then(function(result) {
        if ( result.length ) {
          return result[0].facebook_id;
        } else {
          return create(user);
        }
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
  },

  find: function(user) {
    var facebookId = user.facebook_id;
    return db.select()
      .from('users')
      .where({facebook_id: facebookId})      
  }

};

function create(user) {
  return db('users')
    .insert(user)
    .returning("facebook_id")
    .then(function(facebookId){
      console.log(facebookId[0]);
      return facebookId[0]; //returning gives an array, but facebookId is unique
    })
};
