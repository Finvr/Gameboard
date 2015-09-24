var db = require('../db.js');

module.exports = {

  getAll: function (facebookId){
    return fetch(facebookId)
      .then(function (gameposts){
        console.log(gameposts);
        return gameposts;
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
  },

  create: function(gamepost){
    return db('gameposts')
      .insert(gamepost)
      .returning("id")
      .then(function(gamepost){
        console.log(gamepost);
        return gamepost;
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
  },
  
}

function fetch(facebookId) {
  if ( facebookId ) {
    return db.select()
      .from('gameposts')
      .where({
        host_id: facebook_Id
      })
  } else {
    return db.select()
      .from('gameposts')
  }
};
