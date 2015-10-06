
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("notifications", function(table) {
      table.increments("id").primary();
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at');
      table.integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete('CASCADE');
      table.integer("gamepost_id")
        .references("id")
        .inTable("gameposts")
        .onDelete('CASCADE');
      table.integer("request_id")
        .references("id")
        .inTable("requests")
        .onDelete('CASCADE');
      table.string('type');
      table.boolean('viewed').defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("notifications")
  ]);
};
