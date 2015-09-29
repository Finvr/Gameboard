var config = require('../knexfile.js');  
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')( config[env] );

if (process.env.NODE_ENV  === 'test') {

  knex.deleteEverything = function () {
    return knex.table('users_games').truncate()
      .then(function(){
        return knex.table('users_games').select('*');
      })
      .then(function(ug){
        return knex.table('requests').truncate();
      })
      .then(function(){
        return knex.table("gameposts").delete();
      })
      .then(function(){
        return knex.table('users').delete();
      })
      .catch(function(err){
        console.log("db.js knex users ERROR: ", err)
      })
  }

}

knex.migrate.latest([config]);

module.exports = knex;

// if (process.env.NODE_ENV != 'production') {
//   console.log("Checking latest migrations...")
//   knex.migrate.latest([config]);
// }
// knex migrate:latest // bash command line run this;
// for testing: NODE_ENV=test knex migrate:latest