exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('reviews', function (table) {
      table.varchar('comments');
    })
  ]) 
};

exports.down = function(knex, Promise) {
  return Promise.all([
		 knex.schema.table('reviews', function (table) {
      table.dropColumn('comments');
    })
	])
};
