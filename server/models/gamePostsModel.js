var db       = require('../db.js'),
    Requests = require('./requestsModel.js'),
    helpers   = require('../utils/helpers.js');

module.exports = {

  getAll: function (userId, status) {
    if (!userId) { var userId = null }; 
    return fetchAllOrByUser(userId, status)
      .then(function (gameposts) {
        return gameposts;
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
  },

  getRecentGames: function(userId) {
    var today = new Date();
    var gameposts = [];
    return module.exports.getAll(userId, "active")
      .then(function(hostGames){
        var games = hostGames;
        return Requests.getRequestsByUserId(userId, 'accepted')
          .then(function(requests){
            games = games.concat(requests);
            return games;
          })
      })
      .then(function(games){
        for (var i = 0; i < games.length; i ++) {
          if ((games[i].game_datetime < today) && (!(games[i].user_id) || games[i].host_id !== games[i].user_id)) {
            if (!games[i].gamepost_id) { games[i].gamepost_id = games[i].id }
            gameposts.push(games[i]);
          }
        }
        return helpers.promiseFor(
          function(i){
            return i < gameposts.length;
          },
          function(i){
            return Requests.getRequestersPictures(gameposts[i].gamepost_id)
            .then(function(pictures){
              gameposts[i].playerPics = pictures;
              i ++;
              return i;
            })
          }, 0)
      })
      .then(function(){
        return gameposts;
      })
  },

  create: function (gamepost) {
    return db('gameposts')
      .insert(gamepost)
      .returning("id")
      .then(function (gamepostId) {
        return gamepostId[0];
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

function fetchAllOrByUser (userId, status) {
  var selectColumns = [
    'gameposts.*',
    'users.username',
    'users.picture',
    db.raw("(SUM(CASE requests.status WHEN 'accepted' THEN 1 ELSE 0 END)+1) as accepted_players"),
    db.raw("SUM(CASE requests.status WHEN 'pending' THEN 1 ELSE 0 END) as pending_requests")
  ];
  var match = {post_status: 'active'};
  if (userId) { match.host_id = userId; };
  if (status) { match.post_status = status}
  return db('users').select(selectColumns)
    .groupBy('gameposts.id', 'users.username','users.picture')
    .join('gameposts', 'host_id', 'users.id')
    .leftOuterJoin('requests', 'gamepost_id', 'gameposts.id')
    .where(match)
};
