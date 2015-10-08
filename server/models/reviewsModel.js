var db = require('../db.js');

module.exports = {
	findOrCreateReview: function (review){
		return db('reviews')
			.where({
				reviewer_id: review.reviewer_id,
				gameposts_id: review.gameposts_id
			})
			.then(function (results){
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

	getRatingByUserId: function (userId){
		return db('reviews').select([
				db.raw("avg(rating) as rating"),
				db.raw("avg(CASE reviews.showed_up WHEN true THEN 1 ELSE 0 END) as reliability")
				])
			.where({reviewee_id: userId})
	 	  .then(function(results){
		 	  console.log("get rating by userId: ", results[0]);
		 	  return results[0];
		  })
		  .catch(function(err){
		 	  console.log("error in getRatingByUserId: ", err);
		  })
	}

}
// module.exports.findOrCreateReview({
// 	reviewee_id:2,
// 	reviewer_id:1,
//  	rating:4,
//  	gameposts_id:22,
//  	showed_up:true
//   });

// module.exports.getRatingByUserId(2);