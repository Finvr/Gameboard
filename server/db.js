var config      = require('./knexfile.js');  
var knex        = require('knex');

module.exports = knex;

knex.migrate.latest([config]); 