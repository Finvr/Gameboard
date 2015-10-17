var db = require('../db.js');

module.exports = {
	findOrCreateReview: function (review){
		//Create a review if it doesn't exist and return the review
		return db('reviews')
			.where({
				reviewer_id: review.reviewer_id,
				gameposts_id: review.gameposts_id
			})
			.then(function (results) {
				if(!results.length){
					db('reviews')
					.insert(review)
					.returning('id')
					.then(function(id){
						console.log("review created with Id: ", id);
						return id;
					})
				}
				else {
					console.log("review exists");
				}
			}) 
			.catch(function (err){
				console.log("create review error: ",err);
				return err;
			})
	  },

	getRatingByUserId: function (userId) {
		//Get all reviews submitted for a user
		return db('reviews').select([
				'rating',
				'showed_up',
				'gameposts_id',
				])
			.where({reviewee_id: userId})
	 	  .then(function(results){
		 	  console.log("get rating by userId: ", results);
		 	  return results;
		  })
		  .catch(function(err){
		 	  console.log("error in getRatingByUserId: ", err);
		  })
	},

	getReviewsByReviewerId: function(reviewerId) {
		//Get all reviews submitted by a user
		return db('reviews').select([
				'gameposts_id',
				'reviewer_id'
			])
			.where({reviewer_id: reviewerId});
	}

}
