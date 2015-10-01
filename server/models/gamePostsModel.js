var db       = require('../db.js'),
    Requests = require('./requestsModel.js');

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

  // addPending: function (gamepostId) {
  //   return db('gameposts')
  //     .where({id: gamepostId})
  //     .update({
  //       pending_requests: db.raw('pending_requests + 1'),
  //       updated_at: db.raw('now()')
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //       return err;
  //     })
  // },

  // reducePending: function (gamepostId) {
  //   return db('gameposts')
  //     .where({id: gamepostId})
  //     .update({
  //       pending_requests: db.raw('pending_requests - 1'),
  //       updated_at: db.raw('now()')
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //       return err;
  //     })
  // },

  // addPlayer: function (gamepostId) {
  //   return db('gameposts')
  //     .where({id: gamepostId})
  //     .update({
  //       accepted_players: db.raw('accepted_players + 1'),
  //       pending_requests: db.raw('pending_requests - 1'),
  //       updated_at: db.raw('now()')
  //     });
  // },

  // removePlayer: function (gamepostId) {
  //   return db('gameposts')
  //     .where({id: gamepostId})
  //     .update({
  //       accepted_players: db.raw('accepted_players - 1'),
  //       updated_at: db.raw('now()')
  //     });
  // }
  
}

function fetchAllOrByUser (userId) {
  if ( userId ) {
    return db('users').select([
        'gameposts.*',
        'users.username',
        db.raw("COUNT(CASE requests.status WHEN 'accepted' THEN 1 END) as accepted_players"),
        db.raw("COUNT(CASE requests.status WHEN 'pending' THEN 1 END) as pending_requests")
      ])
      .groupBy('gameposts.id', 'users.username')
      .join('gameposts', 'host_id', 'users.id')
      .leftOuterJoin('requests', 'gamepost_id', 'gameposts.id')
      .where({
        host_id: userId
      })
  } else {
    return db('users').select([
        'gameposts.*',
        'users.username',
        db.raw("COUNT(CASE requests.status WHEN 'accepted' THEN 1 END) as accepted_players"),
        db.raw("COUNT(CASE requests.status WHEN 'pending' THEN 1 END) as pending_requests")
      ])
      .groupBy('gameposts.id', 'users.username')
      .join('gameposts', 'host_id', 'users.id')
      .leftOuterJoin('requests', 'gamepost_id', 'gameposts.id')
  }
};