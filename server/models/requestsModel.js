var db = require('../db.js');

module.exports = {

	getRequestsByUserId: function(user) {
      return db.select()
       .from('requests')
       .where({user_id: user.id})
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
    }



};

module.exports.getAllRequests()