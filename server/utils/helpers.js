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
        .then(promiseFor.bind(null, condition, action))
    };
  })

};
