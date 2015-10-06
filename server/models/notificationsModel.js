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
  }

};
