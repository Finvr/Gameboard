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

function calculateRatings (reviews) {
  var userRating = 0;
  var ratingCount = 0;
  var reliability;
  var gameData = {length: 0};
  // Return default values if not enough reviews
  if ( reviews.length < 5 ) {
    return {
      rating: 5, 
      reliability: 1, 
      reviewCount: reviews.length 
    };
  }

  rating, showed_up, gameposts_id
  for ( var i = 0; i < reviews.length; i++ ) {
    if ( reviews[i].showed_up ) {
      userRating += reviews[i].rating;
      ratingCount++;
    }
    if ( gameData[reviews[i].gameposts_id] ) {
      gameData[reviews[i].gameposts_id].push(reviews[i].showed_up);
    } else {
      gameData[reviews[i].gameposts_id] = [reviews[i].showed_up];
      gameData.length++; 
    }
  }
  userRating = userRating/ratingCount;
  reliability = calulateReliability(gameData);
  
  return {
    rating: userRating,
    reliability: reliability,
    reviewCount: reviews.length
  };

};

function calculateReliability (gameData) {
  var reliability = 0;
  var played = gameData.length;

  for ( game in gameData ) {
    if ( game === 'length' ) continue;
    if ( gameData[game].length === 1 ) {
      if ( gameData[game][0] ) {
        reliability += 1/played;
      }
    } else {
      var trueCount = 0;
      for ( var i = 0; i < gameData[game].length; i++ ) {
        if ( gameData[game][i] ) { trueCount++; }
      }
      if ( trueCount/gameData[game].length >= 0.5 ) {
        reliability += 1/played;
      }
    }
  }

  return reliability;
};
