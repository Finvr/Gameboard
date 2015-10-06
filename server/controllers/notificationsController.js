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
  }
};
