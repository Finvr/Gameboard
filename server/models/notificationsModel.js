var db = require('../db.js');

module.exports = {

  create: function (userId, type, otherId) {
    if ( type === "game cancelled" || type === "request accepted" ) {
      return db('notifications')
        .insert({
          type: type,
          user_id: userId,
          request_id: otherId
        })
        .returning('id')
        .catch(function (err) {
          return err;
        });
    } else if ( type === "pending request" || type === "game ended" ) {
      return db('notifications')
        .insert({
          type: type,
          user_id: userId,
          gamepost_id: otherId
        })
        .returning('id')
        .catch(function (err) {
          return err;
        });
    }
  },

  fetchByUserId: function (userId) {
    return db('notifications')
      .select([
        'notifications.*',
        'requests.gamepost_id as reqgame_id',
        'gameposts.game'
      ])
      .leftOuterJoin('requests', 'request_id', 'requests.id')
      .leftOuterJoin('gameposts', function () {
        this.on('notifications.gamepost_id', '=', 'gameposts.id').orOn('requests.gamepost_id', '=', 'gameposts.id')
      })
      .where('notifications.user_id', userId)
      .orderBy('notifications.created_at', 'DESC')
      .catch(function (err) {
        return err;
      });
  },

  update: function (noteId) {
    return db('notifications')
      .where('id', noteId)
      .update({
        'viewed': true,
        'updated_at': db.raw('now()')
      })
      .catch(function (err) {
        return err;
      })
  },

  deleteExpired: function () {
    return db('notifications')
      .where('viewed', true)
      .andWhere('created_at', '<', db.raw("NOW() - INTERVAL '3 days'"))
      .del()
      .returning('id')
      .catch(function (err) {
        console.log(err);
        return err;
      });
  }

};
