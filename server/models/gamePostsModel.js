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
      .then(function (gamepostId) {
        return gamepostId;
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
      .update('post_status', 'cancelled')
      .catch(function (err) {
        console.log(err);
        return err;
      })
  },

  checkForExpired: function () {
    return db('gameposts')
      .where('post_status', 'active')
      .andWhere('game_datetime', '<', db.raw('now()'))
      .update('post_status', 'expired')
      .returning('id')
      .catch(function (err) {
        console.log(err);
        return err;
      });
  },

  fetchById: function(gamepostId) {
    return db('gameposts')
      .where('id', gamepostId)
      .then(function (result) {
        if ( result.length === 0 ) {
          return null
        } else {
          return result[0]
        }
      })
      .catch(function (err) {
        return err;
      });
  }

}

function fetchAllOrByUser (userId) {
  if ( userId ) {
    return db('users').select([
        'gameposts.*',
        'users.username',
        'users.picture',
        db.raw("(SUM(CASE requests.status WHEN 'accepted' THEN 1 ELSE 0 END)+1) as accepted_players"),
        db.raw("SUM(CASE requests.status WHEN 'pending' THEN 1 ELSE 0 END) as pending_requests")
      ])
      .groupBy('gameposts.id', 'users.username','users.picture')
      .join('gameposts', 'host_id', 'users.id')
      .leftOuterJoin('requests', 'gamepost_id', 'gameposts.id')
      .where({
        host_id: userId,
        post_status: 'active'
      })
  } else {
    return db('users').select([
        'gameposts.*',
        'users.username',
        'users.picture',
        db.raw("(SUM(CASE requests.status WHEN 'accepted' THEN 1 ELSE 0 END)+1) as accepted_players"),
        db.raw("SUM(CASE requests.status WHEN 'pending' THEN 1 ELSE 0 END) as pending_requests")
      ])
      .groupBy('gameposts.id', 'users.username', 'users.picture')
      .join('gameposts', 'host_id', 'users.id')
      .leftOuterJoin('requests', 'gamepost_id', 'gameposts.id')
      .where({
        post_status: 'active'
      })
  }
};
