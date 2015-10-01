
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.dropColumn('pending_requests');
      table.dropColumn('accepted_players');
      table.string('post_status').defaultTo('active');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.integer('pending_requests');
      table.integer('accepted_players');
      table.dropColumn('post_status').defaultTo('active');
    })
  ])
};
