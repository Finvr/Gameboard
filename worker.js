var GamePosts = require('./server/models/gamePostsModel.js'),
    Requests  = require('./server/models/requestsModel.js');


setInterval(function() {
  GamePosts.checkForExpired()
  .then(function (expiredIds) {
    console.log("Expired Gameposts: ", expiredIds);
    for ( var i = 0; i < expiredIds.length; i++ ) {
      Requests.declineAll(expiredIds[i]);
    }
  });
}, 5000);
