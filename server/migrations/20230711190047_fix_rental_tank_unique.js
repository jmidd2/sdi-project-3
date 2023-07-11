/**
 * @param { import("knex").Knex } knex
 */
export async function up(knex) {
  return knex.schema
    .dropTableIfExists('rentals')
    .createTable('rentals', table => {
      table.increments('contract_id');
      table.integer('tank_id').unsigned().references('tank_inventory.tank_id');
      table.integer('customer_id').unsigned().references('users.id');
      table.dateTime('start_date');
      table.datetime('end_date');
      table
        .integer('rental_origin')
        .unsigned()
        .references('locations.location_id')
        .onDelete('CASCADE');
      table.string('location');
    });
}

/**
 * @param { import("knex").Knex } knex
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('rentals');
}
