var db = require('../db.js');

module.exports = {

	getAll: function (){
		return db.select()
		  .from('gameposts')
		  .then(function (gameposts){
			  console.log(gameposts);
			  return gameposts;
		  })
		  .catch(function(err){
			  console.log(err);
			  return err;
		  })

	},
	create: function(gamepost){
		return db('gameposts').insert(gamepost)
		  .then(function(gamepost){
        console.log(gamepost);
        return gamepost;
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
	},
}
