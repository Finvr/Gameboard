var db = require('../db.js');

module.exports = {

  getAll: function (userId){
    return fetch(userId)
      .then(function (gameposts){
        return gameposts;
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
  },

  create: function (gamepost){
    return db('gameposts')
      .insert(gamepost)
      .returning("id")
      .then(function (gamepost){
        return gamepost;
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
  },

  deleteGamePost: function (gamepostId, userId){
    return db('gameposts')
      .where({
        id: gamepostId,
        host_id: userId
      })
      .del()
      .catch(function(err){
        console.log(err);
        return err;
      })
  },

  setPending: function (gamepostId) {
    return db('gameposts')
      .where({id: gamepostId})
      .update({
        has_pending_requests: true,
        updated_at: db.raw('now()')
      })
      .catch(function(err){
        console.log(err);
        return err
      })
  }
  
}

function fetch (userId) {
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
