var db = require('../db.js');

module.exports = {

  getAll: function (userId) {
    return fetchAllOrByUser(userId)
      .then(function (gameposts) {
        return gameposts;
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
  },

  create: function (gamepost) {
    return db('gameposts')
      .insert(gamepost)
      .returning("id")
      .then(function (gamepost) {
        return gamepost;
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
  },

  deleteGamePost: function (gamepostId, userId) {
    return db('gameposts')
      .where({
        id: gamepostId,
        host_id: userId
      })
      .del()
      .catch(function (err) {
        console.log(err);
        return err;
      })
  },

  addPending: function (gamepostId) {
    return db('gameposts')
      .where({id: gamepostId})
      .update({
        pending_requests: db.raw('pending_requests + 1'),
        updated_at: db.raw('now()')
      })
      .catch(function (err) {
        console.log(err);
        return err;
      })
  },

  reducePending: function (gamepostId) {
    return db('gameposts')
      .where({id: gamepostId})
      .update({
        pending_requests: db.raw('pending_requests - 1'),
        updated_at: db.raw('now()')
      })
      .catch(function (err) {
        console.log(err);
        return err;
      })
  },

  addPlayer: function (gamepostId) {
    return db('gameposts')
      .where({id: gamepostId})
      .update({
        accepted_players: db.raw('accepted_players + 1'),
        pending_requests: db.raw('pending_requests - 1'),
        updated_at: db.raw('now()')
      });
  },

  removePlayer: function (gamepostId) {
    return db('gameposts')
      .where({id: gamepostId})
      .update({
        accepted_players: db.raw('accepted_players - 1'),
        updated_at: db.raw('now()')
      });
  }
  
}

function fetchAllOrByUser (userId) {
  if ( userId ) {
    return db.select([
        'gameposts.*',
        'username'
      ])
      .from('gameposts')
      .join('users', 'host_id', 'users.id')
      .where({
        host_id: userId
      })
  } else {
    return db.select([
        'gameposts.*',
        'username'
      ])
      .from('gameposts')
      .join('users', 'host_id', 'users.id')
  }
};
