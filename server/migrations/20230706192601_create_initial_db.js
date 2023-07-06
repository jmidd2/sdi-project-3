/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // return knex.schema
  return knex.schema.createTable('test', table => {
    table.increments('id');
    table.string('name');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  // return knex.schema
}
