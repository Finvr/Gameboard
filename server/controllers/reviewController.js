var Reviews = require('../models/reviewsModel.js');
var helpers  = require ('../utils/helpers.js');

module.exports = {
  getReviewsByReviewerId: function(req, res) {
    var reviewerId = req.user;
    Reviews.getReviewsByReviewerId(reviewerId)
      .then(function(reviews){
        res.send(reviews);
      })
  },

  createReviewsByGamePostsId: function(req, res) {
    var reviewerId = req.user;
    var reviews = req.body;
    console.log("createReviewsByGamePostsId: ", reviews)
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
    .then(function(){
      res.sendStatus(200);
    });
  }

}
