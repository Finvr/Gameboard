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

  getAll: function (userId) {
    return db.select()
      .from('notifications')
      .where('user_id', userId)
      .catch(function (err) {
        return err;
      });
  },

  update: function (notId) {
    return db('notifications')
      .where('id', notId)
      .update('viewed', true)
      .catch(function (err) {
        return err;
      })
  }

};
