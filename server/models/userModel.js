var db = require ('../db.js')

module.exports = {

  findOrCreate: function (user){
    return module.exports.fetch(user)
      .then(function(result) {
        if ( result.length ) {
          console.log('result: ', result[0].facebook_id)
          return result;
        } else {
          return db('users')
            .insert(user)
            .returning("facebook_id")
            .then(function(facebookId){
              console.log(facebookId[0]);
              return facebookId[0]; //returning gives an array, but facebookId is unique
            })
            .catch(function(err){
              console.log(err);
              return err;
            })
        }
      })
  },

  fetch: function (user){
    var facebookId = user.facebook_id;
    return db.select()
      .from('users')
      .where({facebook_id: facebookId})      
  } 

}
