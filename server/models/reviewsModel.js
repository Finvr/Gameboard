var db = require('../db.js');

module.exports = {
	findOrCreateReview: function (review){

		return db('reviews')
					.where({reviewer_id: review.reviewer_id, gameposts_id: review.gameposts_id})
					.then(function (results){
						if(!results.length){
							db('reviews')
							.insert(review)
							.returning('id')
							.then(function(id){
								console.log("review created with Id: ", id)})
						}
						else {console.log("review exists")}
					}) 
					.catch(function (err){
						console.log("create review error: ",err)
						return err
					})

	  },



	getRatingByUserId: function (userId){
		console.log('hi')
		return db.avg('rating')
					 .from('reviews')
					 .where({reviewee_id: userId})
					 .then(function(results){
					 	 console.log("get rating by userId: ", results)
					 })
					 .catch(function(err){
					 	console.log("error in getRatingByUserId: ", err)
					 })
	}
}


// module.exports.findOrCreateReview({reviewee_id:1,
// 			reviewer_id:1,
// 		 	rating:4,
// 		 	gameposts_id:4,
// 		 	showed_up:true});

module.exports.getRatingByUserId(1);