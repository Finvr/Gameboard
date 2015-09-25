var db = require('../db.js');

module.exports = {

	getRequestsByUser: function(user) {
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
  }

};