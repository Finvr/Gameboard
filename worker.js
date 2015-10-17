var GamePosts = require('./server/models/gamePostsModel.js'),
    Notes     = require('./server/models/notificationsModel.js'),
    helpers   = require('./server/utils/helpers.js'),
    Requests  = require('./server/models/requestsModel.js');

function findExpired () {
  var reqIds = [];
  var gameIds;

  return GamePosts.checkForExpired()
    .then(function (expiredIds) {
      console.log("Expired Gameposts: ", expiredIds);
      gameIds = expiredIds;
      return helpers.promiseFor(function (i) {
        return i < expiredIds.length;
      }, function (i) {
        return Requests.updateByGamepost(expiredIds[i], 'expired', ['accepted'])
          .then(function (requestIds) {
            reqIds = reqIds.concat(requestIds);
          })
          .then(function () {
            return Requests.updateByGamepost(expiredIds[i], 'declined', ['invite', 'pending'])
          })
          .then(function () {
            return ++i;
          });
      }, 0)
    })
    .then(function () {
      return [reqIds, gameIds];
    })
};

function sendHostNotifications (reqIds, gameIds) {
  return helpers.promiseFor(function (i) {
    return i < gameIds.length;
  }, function (i) {
    return GamePosts.fetchById(gameIds[i])
      .then(function (gamepost) {
        return Notes.create(gamepost.host_id, "game ended", gamepost.id);
      })
      .then(function () {
        return ++i;
      });
  }, 0)
    .then(function () {
      return reqIds;
    })
};

function sendUserNotifications (reqIds) {
  return helpers.promiseFor(function (i) {
    return i < reqIds.length;
  }, function (i) {
    return Requests.fetchById(reqIds[i])
      .then(function (request) {
        return Notes.create(request.user_id, "game ended", request.gamepost_id);
      })
      .then(function () {
        return ++i;
      });
  }, 0)
};

setInterval(function () {
  findExpired()
    .then(function (idArrays) {
      return sendHostNotifications (idArrays[0], idArrays[1]);
    })
    .then(function (reqIds) {
      return sendUserNotifications(reqIds);
    })
    .then(function () {
      return Notes.deleteExpired();
    })
}, 5000);
