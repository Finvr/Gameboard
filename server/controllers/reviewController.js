var Reviews = require('../models/reviewsModel.js');

module.exports = {
  getReviewsByReviewerId: function(req, res) {
    var reviewerId = req.user.id;
    Reviews.getReviewsByReviewerId(reviewerId)
      .then(function(reviews){
        res.send(reviews);
      })
  }
}