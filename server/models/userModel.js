var db = require ('../db.js')

module.exports = {

  findOrCreate: function(user) {
    return db.select()
      .from('users')
      .where({facebook_id: user.facebook_id})
      .then(function(result) {
        if ( result.length ) {
          return result[0];
        } else {
          return create(user);
        }
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
  },

  find: function(userId) {
    return db.select()
      .from('users')
      .where({id: userId})      
  }

};

function create(user) {
  return db('users')
    .insert(user)
    .returning("id")
    .then(function(userId){
      return module.exports.find(userId[0])
        .then(function(user){
          return user[0]; //returning gives an array, but facebookId is unique
        })
    })
};
