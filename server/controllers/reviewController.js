var Reviews = require('../models/reviewsModel.js');
var helpers  = require ('../utils/helpers.js');

module.exports = {
  getReviewsByReviewerId: function(req, res) {
    var reviewerId = req.user.id;
    Reviews.getReviewsByReviewerId(reviewerId)
      .then(function(reviews){
        res.send(reviews);
      })
  },

  createReviewsByGamePostsId: function(req, res) {
    var reviewerId = req.user.id;
    var reviews = req.body;
    return helpers.promiseFor(
      function(i){
        return i < req.body.length;
      },
      function(i) {
        reviews[i].reviewer_id = reviewerId;
        return Reviews.findOrCreateReview(reviews[i])
          .then(function(){
            i ++;
            return i;            
          })
      }, 0)
    .then(function(counts){
      console.log("Created ", counts, " reviews for gamepost ", reviews[0].gameposts_id);
      res.sendStatus(200);
    });
  }
}