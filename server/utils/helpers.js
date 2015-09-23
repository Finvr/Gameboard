var Users= require ('../models/userModel.js');
var Gameposts= require ('../models/gamePostsModel.js');

module.exports = {
	getAllGameposts: function (req, res){
		//autentication
		Gameposts.getAll()
		.then(function (data){
			res.send(data);
		})
		.catch(function(err){
			console.log(err);
			res.send(err.message);
		})
	},
	createGameposts: function (req, res){
		var gamepost = req.body;
		Gameposts.create(gamepost)
		.then(function (data){
			res.send(data);
		})
		.catch(function(err){
			console.log(err);
			res.send(err.message);
		})
	},
	createUser: function (req, res){
		//authentication
		var testId = 250;
		var username = req.body.username;

		Users.create(testId, username)
		.then(function (userId){
			res.send(userId);
		})
		.catch(function(err){
			console.log(err);
			res.send(err.message);
		})
	}
}