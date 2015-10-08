'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.renameColumn('H', 'lat');
      table.renameColumn('L', 'lng')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.renameColumn('lat', 'H');
      table.renameColumn('lng', 'L')
    })
  ])
};
