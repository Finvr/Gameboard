var GamePosts = require('./server/models/gamePostsModel.js'),
    Notes     = require('./server/models/notificationsModel.js'),
    helpers   = require('./server/utils/helpers.js'),
    Requests  = require('./server/models/requestsModel.js');


setInterval(function() {
  var reqIds = [];
  var gameIds;

  GamePosts.checkForExpired()
  .then(function (expiredIds) {
    console.log("Expired Gameposts: ", expiredIds);
    gameIds = expiredIds;
    return helpers.promiseFor(function (i) {
      return i < expiredIds.length;
    }, function (i) {
      return Requests.declineAll(expiredIds[i])
        .then(function (requestIds) {
          reqIds = reqIds.concat(requestIds);
          return ++i;
        });
    }, 0)
  })
  .then(function() {
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
  })
  .then(function () {
    console.log("IDs array:", reqIds);
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
  })
  .then(function () {
    console.log("All done!");
  });
}, 5000);
