var config      = require('./knexfile.js');  
var knex        = require('knex')(config);

module.exports = knex;

knex.migrate.latest([config]); 