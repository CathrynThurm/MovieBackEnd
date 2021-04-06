
exports.up = function(knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
      table
        .foreign("movie_id")
        .reference("movie_id")
        .inTable("movies")
        .onDelete("cascade");
    table
    .foreign("theater_id")
    .reference("theater_id")
    .inTable("theaters")
    .onDelete("cascade");
    table.boolean("is_showing");
      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters");
};
