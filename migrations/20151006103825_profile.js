
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.string('about_me');
      table.string('games_list');
      table.string('location');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.dropColumn('about_me');
      table.dropColumn('games_list');
      table.dropColumn('location');
    })
  ])
};
