var Notes   = require ('../models/notificationsModel.js'),
    helpers = require ('../utils/helpers.js');

module.exports = {

  getNotifications: function (req, res) {
    Notes.getAll(req.user.id)
      .then(function (result) {
        res.send(result);
      })
      .catch(function (err) {
        res.status(500).send(err.message);
      });
  },

  updateNotifications: function (req, res) {
    var updated = req.body;
    helpers.promiseFor(function (i) {
      return i < updated.length;
    }, function (i) {
      return Notes.update(updated[i])
        .then(function () {
          return ++i;
        });
    }, 0).then(function () {
      res.send(200);
    })
  }
    //Figure out how to do this for-loop in async
  //   for ( var i = 0; i < updated.length; i++ ) {
  //     Notes.update(updated[i])
  //   }
  //   res.send(200);
  // }

};
