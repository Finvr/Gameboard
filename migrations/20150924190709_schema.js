
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.Schema.table('gameposts', function (table) {
      table.date('game_date');
    });
  ])
};

exports.down = function(knex, Promise) {
  
};
