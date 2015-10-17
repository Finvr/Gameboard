var db = require('../db.js');

module.exports = {

  create: function (userId, type, otherId) {
    //Create a notification in the database
    if ( type === "game cancelled" || type === "request accepted" || type === "invite" ) {
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
    //get notifications matching userId
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
    //Set notification to viewed by ID
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
    //Delete notifications that have been viewed and more than 2 days old
    return db('notifications')
      .where('viewed', true)
      .andWhere('created_at', '<', db.raw("NOW() - INTERVAL '2 days'"))
      .del()
      .returning('id')
      .catch(function (err) {
        console.log(err);
        return err;
      });
  },

  createInvitationNotes: function (invitations) {
    //Create several invitation notifications at once
    return db('notifications')
      .insert(invitations)
      .catch(function (err) {
        console.log(err);
        return err;
      })
  }

};
