var db = require ('../db.js')

module.exports = {

  findOrCreate: function(user) {
    var facebookToken = user.facebook_token;
    var username = user.username;

    return db.select()
      .from('users')
      .where({facebook_id: user.facebook_id})
      .then(function(result) {
        if ( result.length ) {
          return updateUser(result[0], facebookToken, username);
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
  },

  delete: function(userId) {
    return db('users')
      .where('id', userId)
      .del();
  }

};

function create(user) {
  return db('users')
    .insert(user)
    .returning("id")
    .then(function(userId){
      return module.exports.find(userId[0])
        .then(function(user){
          return user[0]; //returning gives an array, but id is unique
        })
    })
};

function updateUser(user, facebookToken, username) {
  return db('users')
    .where({id: user.id})
    .update({
      facebook_token: facebookToken,
      username: username,
      updated_at: db.raw('now()')
    })
    .returning('id')
    .then(function(userId) {
      return module.exports.find(userId[0])
    })
    .then(function(user) {
      return user[0]
    })
    .catch(function(err) {
      return err;
    })
};
