var db = require('../db.js');

module.exports = {

	getRequestsByUserId: function(userId) {
      return db.select([
          'gameposts.*',
          'requests.*',
          'gameposts.id as gamepost_id'
        ])
       .from('requests')
       .where({user_id: userId})
       .join('gameposts', 'gamepost_id', 'gameposts.id')
       .then(function(result) {
        if ( result.length ) {
          return result;
        } else {
          return "request does not exist";
        }
      })
       .catch(function(err){
        console.log(err);
        return err;
       })
  },

  getRequestByGameId: function(gamepostId) {
      return db.select([
          'gameposts.*',
          'requests.*',
          'gameposts.id as gamepost_id'
        ])
        .from('requests')
        .where({gamepost_id: gamepostId})
        .join('gameposts', 'gamepost_id', 'gameposts.id')
        .then(function(result) {
          if ( result.length ) {
            return result;
            } 
          else {
              return "request does not exist"
            }
          })
          .catch(function(err){
            console.log(err);
            return err;
          })
  },

  find: function(requestId) {
    return db.select()
      .from('requests')
      .where({id: requestId})      
  },

  create: function(request) {
      return db('requests')
        .insert(request)
        .returning("id")
        .then(function(requestId){
          return module.exports.find(requestId[0])
            .then(function(request){
              return request[0];
            })
        })
  },

  deleteRequest: function(request){
    return db.select()
      .from('requests')
      .where({
          id:request.id
      })
      .del()
      .catch(function(err){
        console.log(err);
        return err;
      })
  }
};
