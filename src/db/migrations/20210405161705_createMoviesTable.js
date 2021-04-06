
exports.up = function(knex) {
  return knex.schema.createTable("movies", (table) => {
      table.integer("movie_id").primary().notNullable();
      table.string("title");
      table.integer("runtime_in_minutes");
      table.string("rating");
      table.string("description");
      table.string("image_url");
  })
};

exports.down = function(knex) {
  return knex.chema.dropTable("movies");
};
