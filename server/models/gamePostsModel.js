var db = require('../db.js');

module.exports = {

  getAll: function (userId){
    return fetch(userId)
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

function fetch(userId) {
  if ( userId ) {
    return db.select()
      .from('gameposts')
      .where({
        host_id: userId
      })
  } else {
    return db.select()
      .from('gameposts')
  }
};
