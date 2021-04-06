
exports.up = function(knex) {
  return knex.schema.createTable("reviews", (table) => {
      table.integer("review_id").primary().notNullable();
      table.text("content");
      table.integer("score");
      table
      .foreign("movie_id")
      .reference("movie_id")
      .inTable("movies")
      .onDelete("cascade");
      table
      .foreign("critic_id")
      .reference("critic_id")
      .inTable("critics")
      .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("reviews")
};
