var db = require ('../db.js')

module.exports = {

  findOrCreate: function(user) {
    //Create a user or return an existing user
    var facebookToken = user.facebook_token;
    var username = user.username;

    return db.select()
      .from('users')
      .where({facebook_id: user.facebook_id})
      .then(function(result) {
        if ( result.length ) {
          return updateFBInfo(result[0], user);
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
    //Return a user
    return db.select()
      .from('users')
      .where({id: userId})      
  },

  delete: function(userId) {
    //Delete a user from the database
    return db('users')
      .where('id', userId)
      .del();
  },

  getToken: function(userId) {
    //Get a user's facebook token for use in making API calls
    return db.select('facebook_token')
      .from('users')
      .where({id: userId})
      .then(function(result) {
        return result[0];
      })
  },

  updateProfile: function(user) {
    //Update profile fields
    return db('users')
      .where({id: user.id})
      .update({
        about_me: user.about_me,
        games_list: user.games_list,
        location: user.location
      })
      .catch(function (err) {
        console.log("Update profile error: ", err.message);
        return err;
      })
  },

  fetchAll: function() {
    //Get all user id's, usernames and pictures
    return db.select(['id', 'username', 'picture'])
      .from('users')
      .catch(function (err) {
        console.log("Fetch all users error: ", err.message)
        return err;
      })
  }

};

function create(user) {
  //Create a user in the database
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

function updateFBInfo(user, updatedUser) {
  //Update user information to match current data from facebook
  return db('users')
    .where({id: user.id})
    .update({
      facebook_token: updatedUser.facebook_token,
      username: updatedUser.username,
      picture: updatedUser.picture,
      link: updatedUser.link,
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
