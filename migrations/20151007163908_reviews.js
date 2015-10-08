exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("reviews", function(table) {
      table.increments("id").primary();
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.boolean('showed_up');
      table.integer("rating");
      table.integer("reviewee_id")
           .references("id")
           .inTable("users")
           .onDelete('CASCADE');
      table.integer("reviewer_id")
           .references("id")
           .inTable("users")
           .onDelete('CASCADE');
      table.integer("gameposts_id")
           .references("id")
           .inTable("gameposts")
           .onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
return Promise.all([
knex.schema.dropTable('reviews')
])
  
};
