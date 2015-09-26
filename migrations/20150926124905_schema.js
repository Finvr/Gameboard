
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.timestamp('game_datetime');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.dropColumn('game_datetime');
    })
  ])
};
