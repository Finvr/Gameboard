var Notifications = require ('../models/notificationsModel.js'),
    helpers  = require ('../utils/helpers.js');

module.exports = {

  getNotifications: function (req, res) {
    Notifications.getAll(req.user.id)
      .then(function (result) {
        res.send(result);
      })
      .catch(function (err) {
        res.status(500).send(err.message);
      });
  },

  updateNotifications: function (req, res) {
    var updated = req.body;
    //Figure out how to do this for-loop in async
    for ( var i = 0; i < updated.length; i++ ) {
      Notifications.update(updated[i])
    }
    res.send(200);
  }
  
};
