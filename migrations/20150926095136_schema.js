
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.dropColumn('game_time');
      table.integer('accepted_players');
      table.boolean('has_pending_requests');
    }),
    knex.schema.table('requests', function (table) {
      table.string('status');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.time('game_time');
      table.dropColumn('accepted_players');
      table.dropColumn('has_pending_requests');
    }),

    knex.schema.table('requests', function (table) {
      table.dropColumn('status');
    })

  ])
};
