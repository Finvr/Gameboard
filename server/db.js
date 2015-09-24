var config      = require('../knexfile.js');  
var knex        = require('knex')(config);

module.exports = knex;

if (process.env.NODE_ENV != 'production') {
  console.log("Checking latest migrations...")
  knex.migrate.latest([config]);
}
// knex migrate:latest // bash command line run this;