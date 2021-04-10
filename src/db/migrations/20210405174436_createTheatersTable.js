
exports.up = function(knex) {
  return knex.schema.createTable("theaters", (table) => {
      table.increments("theater_id").primary();
      table.string("name", 1000);
      table.string("address_line_1", 1000);
      table.string("address_line_2", 1000);
      table.string("city", 1000);
      table.string("state", 1000);
      table.string("zip", 1000)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("theaters")
};
