var GamePosts = require('./server/models/gamePostsModel.js'),
    Notes     = require('./server/models/notificationsModel.js'),
    helpers   = require('./server/utils/helpers.js'),
    Requests  = require('./server/models/requestsModel.js');


setInterval(function() {
  var reqIds = [];
  GamePosts.checkForExpired()
  .then(function (expiredIds) {
    console.log("Expired Gameposts: ", expiredIds);
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
  .then(function () {
    console.log("IDs array:", reqIds);
    return helpers.promiseFor(function (i) {
      return i < reqIds.length;
    }, function (i) {
      return Requests.fetchById(reqIds[i])
        .then(function (request) {
          return Notes.create(request.user_id, "game ended", request.id);
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
