var GamePosts = require('./server/models/gamePostsModel.js'),
    Notes     = require('./server/models/notificationsModel.js'),
    helpers   = require('./server/utils/helpers.js'),
    Requests  = require('./server/models/requestsModel.js');


setInterval(function() {
  GamePosts.checkForExpired()
  .then(function (expiredIds) {
    console.log("Expired Gameposts: ", expiredIds);
    return helpers.promiseFor(function (i) {
      return i < expiredIds.length;
    }, function (i) {
      return Requests.declineAll(expiredIds[i])
        .then(function () {
          return ++i;
        });
    }, 0)
  })
  .then(function () {
    console.log("All done!");
  });
}, 5000);
