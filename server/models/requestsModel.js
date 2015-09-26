var db = require('../db.js');

module.exports = {

	getRequestsByUserId: function(user) {
     var user = {id: 1};
      return db.select()
       .from('requests')
       .where({user_id: user.id})
       .fullOuterJoin('gameposts', 'gamepost_id', 'gameposts.id')
       .then(function(result) {
        if ( result.length ) {
          return result;
        } else {
          return "request does not exist"
        }
      })
       .catch(function(err){
        console.log(err);
        return err;
       })
    },

    getRequestByGameId: function(gamepost) {
      return db.select()
        .from('requests')
        .where({gamepost_id: gamepost.id})
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

    getAll: function() {
      return db.select()
        .from('requests')
        .then(function(result) {
          if ( result.length ) {
            return result;
          } 
          else {
            return "there are no requests"
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
          return find(requestId[0])
            .then(function(request){
              return request[0];
            })
        })
    }

    // joinTables: function(gamepost){
    //   return db.select()
    //     .from('gameposts')
    //     .where({id: gamepost.id)
    // }

    //  create: function(request) {
    //   return db('requests')
    //     .insert(request)
    //     .returning("id")
    //     .then(function(requestId){
    //       return find(requestId[0])
    //         .then(function(request){
    //           return request[0];
    //         })
    //     })
    // }


    
};

module.exports.getRequestsByUserId();