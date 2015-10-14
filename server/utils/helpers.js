var Promise = require('../../node_modules/knex/node_modules/bluebird/js/main/bluebird.js');

module.exports = {
  
  handleError: function(err, res, code) {
    code = code || 500;
    console.log(err);
    res.send(code, err.message);
  },

  promiseFor: Promise.method(function(condition, action, value) {
    if ( !condition(value) ) {
      return value;
    } else { 
      return action(value)
        .then(module.exports.promiseFor.bind(null, condition, action))
    };
  }),

  calculateRatings: function (reviews) {
    //Reviews have gameposts_id, showed_up and rating properties.
    var userRating = 0;
    var ratingCount = 0; //separate count needed to find average of ratings since rating prop isn't required
    var reliability;
    var gameData = {length: 0}; //need length property for calculateReliability

    // Return default values if not enough reviews
    if ( reviews.length < 5 ) {
      return {
        rating: 5, 
        reliability: 1, 
        reviewCount: reviews.length 
      };
    }

    for ( var i = 0; i < reviews.length; i++ ) {
      //rating is required if showed_up is true
      if ( reviews[i].showed_up ) {
        userRating += reviews[i].rating;
        ratingCount++;
      }
      //rating calculated by individual review, reliabilty by game
      if ( gameData[reviews[i].gameposts_id] ) {
        gameData[reviews[i].gameposts_id].push(reviews[i].showed_up);
      } else {
        gameData[reviews[i].gameposts_id] = [reviews[i].showed_up];
        gameData.length++; 
      }
    }
    //Math.round to limit decimal places
    userRating = Math.round(userRating/ratingCount*10)/10;
    reliability = Math.round(calculateReliability(gameData)*100)/100;
    console.log("Reliability: ", reliability);
    
    return {
      rating: userRating,
      reliability: reliability,
      reviewcounts: reviews.length
    };

  }

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
}
