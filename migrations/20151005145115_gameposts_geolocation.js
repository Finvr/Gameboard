'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.string('business');
      table.string('H');
      table.string('L')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.dropColumn('business');
      table.dropColumn('H');
      table.dropColumn('L')
    })
  ])
};
