'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.dropColumn('game_date');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.date('game_date');
    })
  ])
};
