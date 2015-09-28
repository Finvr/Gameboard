var config = require('../knexfile.js');  
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')( config[env] );

module.exports = knex;

// if (process.env.NODE_ENV != 'production') {
//   console.log("Checking latest migrations...")
//   knex.migrate.latest([config]);
// }
// knex migrate:latest // bash command line run this;
// for testing: NODE_ENV=test knex migrate:latest