
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.dropColumn('has_pending_requests');
      table.integer('pending_requests');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('gameposts', function (table) {
      table.boolean('has_pending_requests');
      table.dropColumn('pending_requests');
    })
  ])
};
