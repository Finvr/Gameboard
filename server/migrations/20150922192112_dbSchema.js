'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", function(table) {
      table.increments("id").primary(); // id
      table.timestamps();
      table.string("username");
      table.string("facebook_id");
    }),

    // knex.schema.createTable("games", function(table) {
    //   table.increments("id").primary(); // id
    //   table.timestamps();
    //   table.string("game_name");
    //   table.string("game_description");
    //   table.integer("game_count");
    // }),

    knex.schema.createTable("gameposts", function(table) {
      table.increments("id").primary(); // id
      table.timestamps();
      table.integer("host_id")
            .references("id")
            .inTable("users");
      table.string("game_location");
      // table.integer("game_id")
      //       .references("id")
      //       .inTable("games");
      table.string('game');//for mvp only
      table.integer("player_count");
      table.string("gamepost_description");
      table.time("game_time");
    }),

    knex.schema.createTable("users_games", function(table) {
      table.increments("id").primary(); // id
      table.timestamps();
      table.integer("user_id")
            .references("id")
            .inTable("users");
      table.integer("gamepost_id")
            .references("id")
            .inTable("gameposts");
    }),

    knex.schema.createTable("requests", function(table) {
      table.increments("id").primary(); // id
      table.timestamps();
      table.integer("user_id")
            .references("id")
            .inTable("users");
      table.integer("gamepost_id")
            .references("id")
            .inTable("gameposts");
      table.string("comments");
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("users"),
    knex.schema.dropTable("games"),
    knex.schema.dropTable("gameposts"),
    knex.schema.dropTable("users_games"),
    knex.schema.dropTable("requests")
  ])
};
