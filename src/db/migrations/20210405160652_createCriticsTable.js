
exports.up = function(knex) {
  return knex.schema.createTable("critics", (table) => {
      table.increments("critic_id").primary().notNullable();
      table.string("preferred_name", 1000);
      table.string("surname", 1000);
      table.string("organization_name", 1000);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("critics");
};
